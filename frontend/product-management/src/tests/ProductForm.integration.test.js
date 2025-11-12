// import React from "react";
// import { render, screen, fireEvent, waitFor } from "@testing-library/react";
// import ProductForm from "../components/ProductForm";

// describe("Test ProductForm component (create/edit)", () => {
//   test("TC1: Thêm sản phẩm mới thành công", async () => {
//     render(<ProductForm />);

//     fireEvent.change(screen.getByLabelText("Tên sản phẩm"), {
//       target: { value: "Bút chì Kim Long" },
//     });
//     fireEvent.change(screen.getByLabelText("Giá"), {
//       target: { value: "2500" },
//     });
//     fireEvent.change(screen.getByLabelText("Số lượng"), {
//       target: { value: "10" },
//     });
//     fireEvent.change(screen.getByLabelText("Danh mục"), {
//       target: { value: "Văn phòng phẩm" },
//     });
//     fireEvent.change(screen.getByLabelText("Mô tả"), {
//       target: { value: "Sản phẩm test thêm mới" },
//     });

//     fireEvent.click(screen.getByText("Lưu"));

//     await waitFor(
//       () =>
//         expect(screen.getByTestId("form-message")).toHaveTextContent(
//           "Thêm sản phẩm thành công!"
//         ),
//       { timeout: 5000 }
//     );
//   });

//   test("TC2: Cập nhật sản phẩm thành công", async () => {
//     const existingProduct = {
//       id: 1,
//       name: "Bút bi Thiên Long",
//       price: 5000,
//       quantity: 20,
//       categoryName: "Văn phòng phẩm",
//       description: "Sản phẩm cập nhật test",
//     };

//     render(<ProductForm product={existingProduct} />);

//     fireEvent.change(screen.getByLabelText("Giá"), {
//       target: { value: "6000" },
//     });
//     fireEvent.click(screen.getByLabelText("Lưu"));

//     await waitFor(
//       () =>
//         expect(screen.getByTestId("form-message")).toHaveTextContent(
//           "Cập nhật sản phẩm thành công!"
//         ),
//       { timeout: 5000 }
//     );
//   });
// });
