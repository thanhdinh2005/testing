import React from "react";
import { render, screen, fireEvent, waitFor, act } from "@testing-library/react";
import ProductList from "../components/ProductList";
import * as productService from "../services/productService";
import ProductForm from "../components/ProductForm";

jest.mock("../services/productService");

describe("Product  Mock Tests", () => {
  const onSave = jest.fn();
  const onCancel = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("TC1: Hiển thị danh sách sản phẩm khi API trả về thành công", async () => {
    productService.getProducts.mockResolvedValue([
      { id: 1, name: "Đồi gió hú", price: 20000, quantity: 5, category: "Tiểu thuyết" },
      { id: 2, name: "Naruto", price: 500, quantity: 10, category: "Truyện tranh" },
    ]);

    render(<ProductList />);

    await waitFor(() => {
      expect(screen.getByText("Đồi gió hú")).toBeInTheDocument();
      expect(screen.getByText("Naruto")).toBeInTheDocument();
    });

    expect(productService.getProducts).toHaveBeenCalledTimes(1);
  });

  test("TC2: Hiển thị lỗi khi tải danh sách thất bại", async () => {
    productService.getProducts.mockRejectedValue(new Error("Network Error"));

    render(<ProductList />);

    await waitFor(() => {
      expect(screen.getByText(/Không có sản phẩm/i)).toBeInTheDocument();
    });

    expect(productService.getProducts).toHaveBeenCalledTimes(1);
  });

  test("TC3: Thêm sản phẩm mới thành công", async () => {
    productService.createProduct.mockResolvedValueOnce({
      id: 1,
      name: "Toán lớp 5",
    });

    render(<ProductForm onSave={jest.fn()} onCancel={jest.fn()} />);

    fireEvent.change(screen.getByTestId("product-name"), {
      target: { name: "name", value: "Toán lớp 5" },
    });
    fireEvent.change(screen.getByTestId("product-price"), {
      target: { name: "price", value: "1200" },
    });
    fireEvent.change(screen.getByTestId("product-quantity"), {
      target: { name: "quantity", value: "3" },
    });
    fireEvent.change(screen.getByTestId("product-categoryName"), {
      target: { name: "categoryName", value: "Sách giáo khoa" },
    });
    fireEvent.change(screen.getByTestId("product-description"), {
      target: { name: "description", value: "Dùng để giảng giải kiến thức toán lớp 5 cũng như học tập" },
    });

    fireEvent.click(screen.getByTestId("product-save"));

    await waitFor(() => {
      expect(productService.createProduct).toHaveBeenCalledTimes(1);
      expect(productService.createProduct).toHaveBeenCalledWith({
        name: "Toán lớp 5",
        price: "1200",
        quantity: "3",
        categoryName: "Sách giáo khoa",
        description: "Dùng để giảng giải kiến thức toán lớp 5 cũng như học tập",
      });
    });

    expect(screen.getByText(/Lưu sản phẩm thành công!/i)).toBeInTheDocument();
  });

  test("TC4: Cập nhật sản phẩm thành công", async () => {
    productService.updateProduct = jest.fn().mockResolvedValueOnce({
    id: 1,
    name: "Onepiece (Bản mới)",
    });

    const existingProduct = {
      id: 1,
      name: "Onepiece",
      price: "1200",
      quantity: "3",
      categoryName: "Truyện tranh",
      description: "Hành trình của Luffy và các thành viên của mình",
    };

    render(
      <ProductForm
        product={existingProduct}
        onSave={jest.fn()}
        onCancel={jest.fn()}
      />
    );

    fireEvent.change(screen.getByTestId("product-name"), {
      target: { name: "name", value: "Onepiece (Bản mới)" },
    });

    fireEvent.click(screen.getByTestId("product-save"));

    await waitFor(() => {
      expect(productService.updateProduct).toHaveBeenCalledTimes(1);
      expect(productService.updateProduct).toHaveBeenCalledWith({
        id: 1,
        name: "Onepiece (Bản mới)",
        price: "1200",
        quantity: "3",
        categoryName: "Truyện tranh",
        description: "Hành trình của Luffy và các thành viên của mình",
      });
    });

    expect(
      screen.getByText(/Cập nhật sản phẩm thành công!/i)
    ).toBeInTheDocument();
  });

  test("TC5: Xóa sản phẩm thành công", async () => {
    window.confirm = jest.fn(() => true);

    const mockProducts = [
      { id: 1, name: "Onepiece", price: 20000, quantity: 5, categoryName: "Truyện tranh" },
      { id: 2, name: "Boruto", price: 500, quantity: 10, categoryName: "Truyện tranh" },
    ];

    productService.getProducts.mockResolvedValueOnce(mockProducts);
    productService.deleteProduct.mockResolvedValueOnce({ success: true });
    productService.getProducts.mockResolvedValueOnce([
      { id: 2, name: "Boruto", price: 500, quantity: 10, categoryName: "Truyện tranh" },
    ]);

    await act(async () => render(<ProductList/>));

    await waitFor(() => {
      expect(screen.getByText("Onepiece")).toBeInTheDocument();
      expect(screen.getByText("Boruto")).toBeInTheDocument();
    });

    const deleteBtn = screen.getByTestId("product-Delete1");

    await act(async () => {
      fireEvent.click(deleteBtn);
      await Promise.resolve();
      await new Promise((r) => setTimeout(r, 0));
    });

    await waitFor(() => {
      expect(productService.deleteProduct).toHaveBeenCalledWith(1);
      expect(screen.queryByText("Onepiece")).not.toBeInTheDocument();
      expect(screen.getByText("Boruto")).toBeInTheDocument();
    });
  });


  test("TC6: Hiển thị lỗi khi xóa thất bại", async () => {
    window.confirm = jest.fn(() => true);
    productService.getProducts.mockResolvedValue([
      { id: 1, name: "Đồi gió hú", price: 20000, quantity: 5, category: "Tiểu thuyết" },
    ]);
    productService.deleteProduct.mockRejectedValue(new Error("Xóa thất bại"));

    render(<ProductList/>);

    await waitFor(() => {
      expect(screen.getByText("Đồi gió hú")).toBeInTheDocument();
    });

    const deleteBtn = screen.getByTestId("product-Delete1");
    fireEvent.click(deleteBtn);

    await waitFor(() => {
      expect(productService.deleteProduct).toHaveBeenCalledTimes(1);
      expect(productService.deleteProduct).toHaveBeenCalledWith(1);
    });

    await waitFor(() => {
      expect(screen.getByTestId("error-message")).toHaveTextContent(/Xóa thất bại/i);
    });

    expect(screen.getByText("Đồi gió hú")).toBeInTheDocument();
  });
});
