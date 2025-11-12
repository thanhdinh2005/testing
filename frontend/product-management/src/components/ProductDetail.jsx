import React from "react";

export default function ProductDetail({ product, onClose }) {
  if (!product) return null;

  return (
    <div className="detail-box">
      <h2>Chi tiết sản phẩm</h2>
      <p><strong>ID:</strong> {product.id}</p>
      <p><strong>Tên sản phẩm:</strong> {product.name}</p>
      <p><strong>Giá:</strong> {product.price}</p>
      <p><strong>Số lượng:</strong> {product.quantity}</p>
      <p><strong>Danh mục:</strong> {product.category}</p>
      {product.description && (
        <p><strong>Mô tả:</strong> {product.description}</p>
      )}
      <button onClick={onClose}>Đóng</button>
    </div>
  );
}
