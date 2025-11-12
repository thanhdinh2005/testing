// import React from "react";
// import { render, screen, waitFor, fireEvent } from "@testing-library/react";
// import ProductList from "../components/ProductList";

// describe("Test ProductList component với API", () => {
//   test("TC1: Hiển thị danh sách sản phẩm", async () => {
//     render(<ProductList />);

//     await waitFor(
//       () =>
//         expect(screen.getByText(/Danh sách sản phẩm/i)).toBeInTheDocument(),
//       { timeout: 5000 }
//     );

//     const rows = screen.getAllByRole("row");
//     expect(rows.length).toBeGreaterThan(1);
//   });

//   test("TC2: Xóa sản phẩm đầu tiên và cập nhật lại danh sách", async () => {
//     render(<ProductList />);

//     await waitFor(() => screen.getAllByRole("row"), { timeout: 5000 });

//     const firstRow = screen.getAllByRole("row")[1];
//     const firstProductName = firstRow.querySelector("td")?.textContent;
//     const deleteBtn = firstRow.querySelector("button");

//     expect(deleteBtn).toBeInTheDocument();
//     fireEvent.click(deleteBtn);

//     await waitFor(
//       () => {
//         const allNames = screen.getAllByRole("row").map((r) => r.textContent);
//         expect(allNames).not.toContain(firstProductName);
//       },
//       { timeout: 5000 }
//     );
//   });
// });
