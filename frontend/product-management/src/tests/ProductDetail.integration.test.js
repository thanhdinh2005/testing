// import React from "react";
// import { render, screen, waitFor } from "@testing-library/react";
// import ProductDetail from "../components/ProductDetail";

// describe("Test ProductDetail component", () => {
//   test("TC1: Hiển thị thông tin chi tiết sản phẩm đúng", async () => {
//     render(<ProductDetail productId={1} />);
//     expect(screen.getByTestId("loading-msg")).toBeInTheDocument();

//     await waitFor(() => screen.getByTestId("product-detail"), { timeout: 5000 });

//     expect(screen.getByText(/Tên:/i)).toBeInTheDocument();
//     expect(screen.getByText(/Giá:/i)).toBeInTheDocument();
//     expect(screen.getByText(/Số lượng:/i)).toBeInTheDocument();
//     expect(screen.getByText(/Danh mục:/i)).toBeInTheDocument();
//     expect(screen.getByText(/Mô tả:/i)).toBeInTheDocument();

//   });
// });
