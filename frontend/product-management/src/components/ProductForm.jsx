import React, { useState, useEffect } from "react";
import * as productService from "../services/productService";
import { validateProduct } from "../utils/productValidation";

export default function ProductForm({ product, onSave, onCancel }) {
  const [productData, setProduct] = useState({
    name: "",
    price: "",
    quantity: "",
    categoryName: "",
    description: "",
  });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (product) setProduct(product);
  }, [product]);

  const handleChange = (e) => {
    setProduct({ ...productData, [e.target.name]: e.target.value });
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   console.log("Submitting product data:", productData);
  //   const validateData = {
  //     ...productData,
  //     categoryName: productData.categoryName,
  //   };
    
  //   const errs = validateProduct(validateData);
  //   setErrors(errs);
  //   console.log("Validation errors:", errs);
  //   if (Object.keys(errs).length > 0) return;

  //   onSave(productData);
  //   alert("Lưu sản phẩm thành công!");
  //   setMessage("Lưu sản phẩm thành công!");
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting product data:", productData);

    const validateData = {
      ...productData,
      categoryName: productData.categoryName,
    };
    const errs = validateProduct(validateData);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    try {
      if (product && product.id) {
        await productService.updateProduct(productData);
        setMessage("Cập nhật sản phẩm thành công!");
      } else {
        await productService.createProduct(productData);
        setMessage("Lưu sản phẩm thành công!");
      }
      onSave(productData);
    } catch (error) {
      console.error("Lỗi khi thêm/cập nhật sản phẩm:", error);
      setMessage("Lưu sản phẩm thất bại!");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="product-form">
      <h2>{product ? "Sửa sản phẩm" : "Thêm sản phẩm mới"}</h2>

      <div>
        <label>Tên sản phẩm</label>
        <input
          name="name"
          data-testid="product-name"
          value={productData.name}
          onChange={handleChange}
        />
        {errors.name && <p className="error">{errors.name}</p>}
      </div>

      <div>
        <label>Giá</label>
        <input
          name="price"
          data-testid="product-price"
          type="number"
          value={productData.price}
          onChange={handleChange}
        />
        {errors.price && <p className="error">{errors.price}</p>}
      </div>

      <div>
        <label>Số lượng</label>
        <input
          name="quantity"
          data-testid="product-quantity"
          type="number"
          value={productData.quantity}
          onChange={handleChange}
        />
        {errors.quantity && <p className="error">{errors.quantity}</p>}
      </div>

      <div>
        <label>Danh mục</label>
        <select
          name="categoryName"
          data-testid="product-categoryName"
          value={productData.categoryName}
          onChange={handleChange}
        >
          <option value="">-- Chọn --</option>
          <option value="Truyện tranh">Truyện tranh</option>
          <option value="Tiểu thuyết">Tiểu thuyết</option>
          <option value="Sách giáo khoa">Sách giáo khoa</option>
        </select>
        {errors.categoryName && <p className="error">{errors.categoryName}</p>}
      </div>

      <div>
        <label>Mô tả</label>
        <textarea
          name="description"
          data-testid="product-description"
          value={productData.description}
          onChange={handleChange}
        />
        {errors.description && <p className="error">{errors.description}</p>}
      </div>

      <button type="submit" data-testid="product-save">Lưu</button>
      <button type="button" onClick={onCancel}>Hủy</button>
      {message && <p className="success">{message}</p>}
    </form>
  );
}
