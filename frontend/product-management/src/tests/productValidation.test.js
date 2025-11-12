import { validateProduct } from "../utils/productValidation";

describe("validateProduct()", () => {

  test("TC1: Product name rong - nen bao loi", () => {
    const errors = validateProduct({ name: "", price: 10000, quantity: 5, categoryName: "Văn phòng phẩm" });
    expect(errors.name).toBe("Tên sản phẩm không được để trống");
  });

  test("TC2: Product name khong hop le - nen bao loi", () => {
    const errors = validateProduct({ name: "   ", price: 10000, quantity: 5, categoryName: "Văn phòng phẩm" });
    expect(errors.name).toBe("Tên sản phẩm phải có ít nhất 3 ký tự");
  });

  test("TC3: Product name < 3 ky tu - nen bao loi", () => {
    const errors = validateProduct({ name: "ab", price: 10000, quantity: 5, categoryName: "Văn phòng phẩm" });
    expect(errors.name).toBe("Tên sản phẩm phải có ít nhất 3 ký tự");
  });

  test("TC4: Product name >> 100 ky tu - nen bao loi", () => {
    const longName = "A".repeat(101);
    const errors = validateProduct({ name: longName, price: 10000, quantity: 5, categoryName: "Văn phòng phẩm" });
    expect(errors.name).toBe("Tên sản phẩm không được quá 100 ký tự");
  });

  test("TC5: Product name hop le - khong co loi", () => {
    const errors = validateProduct({ name: "Bút bi Thiên Long", price: 10000, quantity: 5, categoryName: "Văn phòng phẩm" });
    expect(errors.name).toBeUndefined();
  });

  test("TC6: Product price rong - nen bao loi", () => {
    const errors = validateProduct({ name: "Bút bi", price: "", quantity: 10, categoryName: "Văn phòng phẩm" });
    expect(errors.price).toBe("Giá sản phẩm phải lớn hơn 0");
  });

  test("TC7: Product price <= 0 - nen bao loi", () => {
    const errors = validateProduct({ name: "Bút bi", price: 0, quantity: 10, categoryName: "Văn phòng phẩm" });
    expect(errors.price).toBe("Giá sản phẩm phải lớn hơn 0");
  });

  test("TC8: Product price <= 0 - nen bao loi", () => {
    const errors = validateProduct({ name: "Bút bi", price: -100, quantity: 10, categoryName: "Văn phòng phẩm" });
    expect(errors.price).toBe("Giá sản phẩm phải lớn hơn 0");
  });

  test("TC9: Product price hop le - khong co loi", () => {
    const errors = validateProduct({ name: "Bút bi", price: 15000, quantity: 10, categoryName: "Văn phòng phẩm" });
    expect(errors.price).toBeUndefined();
  });

  test("TC10: Product quatity rong - nen bao loi", () => {
    const errors = validateProduct({ name: "Bút bi", price: 10000, quantity: "", categoryName: "Văn phòng phẩm" });
    expect(errors.quantity).toBe("Số lượng không được để trống");
  });

  test("TC11: Product quatity <= 0 - nen bao loi", () => {
    const errors = validateProduct({ name: "Bút bi", price: 10000, quantity: -2, categoryName: "Văn phòng phẩm" });
    expect(errors.quantity).toBe("Số lượng không được âm");
  });

  test("TC12: Product quatity hop le - nen bao loi", () => {
    const errors = validateProduct({ name: "Bút bi", price: 10000, quantity: 10, categoryName: "Văn phòng phẩm" });
    expect(errors.quantity).toBeUndefined();
  });

  test("TC13: Product category rong - nen bao loi", () => {
    const errors = validateProduct({ name: "Bút bi", price: 10000, quantity: 10, categoryName: "" });
    expect(errors.categoryName).toBe("Danh mục không được để trống");
  });

  test("TC14: Product category hop le - khong co loi", () => {
    const errors = validateProduct({ name: "Bút bi", price: 10000, quantity: 10, categoryName: "Học tập" });
    expect(errors.categoryName).toBeUndefined();
  });

  test("TC15: Product decription > 500 ky tu - nen bao loi", () => {
    const longDesc = "A".repeat(501);
    const errors = validateProduct({ name: "Sách", price: 12000, quantity: 5, categoryName: "Văn học", description: longDesc });
    expect(errors.description).toBe("Mô tả không được vượt quá 500 ký tự");
  });

  test("TC16: Product decription hop le - khong co loi", () => {
    const validDesc = "A".repeat(500);
    const errors = validateProduct({ name: "Sách", price: 12000, quantity: 5, categoryName: "Văn học", description: validDesc });
    expect(errors.description).toBeUndefined();
  });

});
