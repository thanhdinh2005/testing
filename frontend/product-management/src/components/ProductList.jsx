import React, { useState, useEffect } from "react";
import { getProducts, deleteProduct } from "../services/productService";
import ProductForm from "./ProductForm";
import ProductDetail from "./ProductDetail";

const STORAGE_KEY = "products";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const fetchData = async () => {
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (err) {
      console.error("Lỗi khi tải danh sách:", err);
    }
  };

  // useEffect(() => {
  //   const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  //   if (stored.length === 0) {
  //     const sampleData = [
  //       { id: 1, name: "Laptop Dell Inspiron 15", price: 18000000, quantity: 5, categoryName: "Electronics", description: "Laptop Dell màn hình 15.6 inch, Core i5, RAM 8GB, SSD 512GB" },
  //       { id: 2, name: "Sách Clean Code", price: 250000, quantity: 30, categoryName: "Books", description: "Cuốn sách nổi tiếng về lập trình sạch" },
  //       { id: 3, name: "Tai nghe Sony WH-1000XM4", price: 6990000, quantity: 12, categoryName: "Electronics", description: "Tai nghe chống ồn cao cấp" },
  //       { id: 4, name: "Áo Hoodie Đen", price: 350000, quantity: 20, categoryName: "Clothing", description: "Áo cotton unisex, giữ ấm tốt" },
  //     ];
  //     localStorage.setItem(STORAGE_KEY, JSON.stringify(sampleData));
  //     setProducts(sampleData);
  //   } else {
  //     setProducts(stored);
  //   }
  // }, []);

  useEffect(() => {
    fetchData();
  }, []);

  // useEffect(() => {
  //   localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
  // }, [products]);

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc muốn xóa sản phẩm này?")) {
      try {
        await deleteProduct(id);
        await fetchData();
        setErrorMessage("");
      } catch (error) {
        console.error("Lỗi khi xóa sản phẩm:", error);
        setErrorMessage("Xóa thất bại");
      }
    }
  };

  // const handleDelete = (id) => {
  //   if (window.confirm("Bạn có chắc muốn xóa sản phẩm này?")) {
  //     setProducts(products.filter((p) => p.id !== id));
  //   }
  // };

  const handleSave = (data) => {
    console.log("Saving data:", data);

    if (isEdit) {
      setProducts(products.map((p) => (p.id === data.id ? data : p)));
    } else {
      const newProduct = { ...data, id: Date.now() };
      setProducts([...products, newProduct]);
    }

    setShowForm(false);
    setShowDetail(false);
    setIsEdit(false);
  };

  const handleCreate = () => {
    setSelectedProduct(null);
    setIsEdit(false);
    setShowForm(true);
    setShowDetail(false);
  };

  const handleEdit = (product) => {
    console.log("Editing product:", product);
    setSelectedProduct(product);
    setIsEdit(true);
    setShowForm(true);
    setShowDetail(false);
  };

  const handleDetail = (product) => {
    setSelectedProduct(product);
    setShowDetail(true);
    setShowForm(false);
  };


  return (
    <div className="container">
      {!showForm && !showDetail && (
      <>
        <h1>Danh sách sản phẩm</h1>
        <button onClick={handleCreate}>Thêm sản phẩm</button>

        <table border="1" cellPadding="6" cellSpacing="0">
          <thead>
            <tr>
              <th>ID</th>
              <th>Tên sản phẩm</th>
              <th>Giá</th>
              <th>Số lượng</th>
              <th>Danh mục</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {products.length === 0 ? (
              <tr>
                <td colSpan="6" align="center">Không có sản phẩm</td>
              </tr>
            ) : (
              products.map((p) => (
                <tr key={p.id}>
                  <td>{p.id}</td>
                  <td>{p.name}</td>
                  <td>{p.price}</td>
                  <td>{p.quantity}</td>
                  <td>{p.categoryName}</td>
                  <td>
                    <button onClick={() => handleDetail(p)}>Chi tiết</button>
                    <button onClick={() => handleEdit(p)}>Sửa</button>
                    <button onClick={() => handleDelete(p.id)} data-testid={`product-Delete${p.id}`}>Xóa</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        {errorMessage && (
          <p data-testid="error-message">
            {errorMessage}
          </p>
        )}
      </>
      )}

      {showForm && (
        <ProductForm
          product={selectedProduct}
          onSave={handleSave}
          onCancel={() => setShowForm(false)}
        />
      )}

      {showDetail && (
        <ProductDetail
          product={selectedProduct}
          onClose={() => setShowDetail(false)}
        />
      )}
    </div>
  );
}
