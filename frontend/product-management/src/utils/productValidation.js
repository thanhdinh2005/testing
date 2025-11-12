export const validateProduct = (product) => {
  const errors = {};

  
    
  if (!product.name || product.name.trim().length < 3){
    if (!product.name){
        errors.name = "Tên sản phẩm không được để trống";
    } else {
        errors.name = "Tên sản phẩm phải có ít nhất 3 ký tự";
    }
  }
  if (product.name && product.name.length > 100)
    errors.name = "Tên sản phẩm không được quá 100 ký tự";

  if (product.price <= 0)
    errors.price = "Giá sản phẩm phải lớn hơn 0";
  if (product.price > 999999999)
    errors.price = "Giá sản phẩm quá lớn";

  if (product.quantity === "" || product.quantity === null || product.quantity === undefined)
    errors.quantity = "Số lượng không được để trống";
  if (product.quantity < 0)
    errors.quantity = "Số lượng không được âm";
  if (product.quantity > 99999)
    errors.quantity = "Số lượng quá lớn";

  if (product.description && product.description.length > 500)
    errors.description = "Mô tả không được vượt quá 500 ký tự";

  if (!product.categoryName)
    errors.categoryName = "Danh mục không được để trống";

  return errors;
};
