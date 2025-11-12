import { validateUsername, validatePassword } from "../utils/validation";

describe("Login Validation Tests", () => {
  test("TC1: Username rong - nen tra ve loi", () => {
    expect(validateUsername("")).toBe("Tên đăng nhập không được để trống");
  });

  test("TC2: Username qua ngan - nen tra ve loi", () => {
    expect(validateUsername("ab")).toBe("Tên đăng nhập phải có ít nhất 3 ký tự");
  });

  test("TC3: Username qua dai - nen tra ve loi", () => {
    const longUsername = "c".repeat(51);
    expect(validateUsername(longUsername)).toBe("Tên đăng nhập không được vượt quá 50 ký tự");
  });

  test("TC4: Username chua ky tu dac biet khong hop le - nen tra ve loi", () => {
    expect(validateUsername("abc@")).toBe("Tên đăng nhập chỉ được chứa chữ, số và ._-");
  });

  test("TC5: Username hop le - khong co loi", () => {
    expect(validateUsername("user_123")).toBe("");
  });

  test("TC6: Password rong - nen tra ve loi", () => {
    expect(validatePassword("")).toBe("Mật khẩu không được để trống");
  });

  test("TC7: Password qua ngan - nen tra ve loi", () => {
    expect(validatePassword("123")).toBe("Mật khẩu phải có ít nhất 6 ký tự");
  });

  test("TC8: Password qua dai - nen tra ve loi", () => {
    const longPassword = "a".repeat(101);
    expect(validatePassword(longPassword)).toBe("Mật khẩu không được vượt quá 100 ký tự");
  });

  test("TC9: Password khong co chu hoac so - nen tra ve loi", () => {
    expect(validatePassword("abcdef")).toBe("Mật khẩu phải có cả chữ và số");
  });

  test("TC10: Password hop le - khong co loi", () => {
    expect(validatePassword("Test123")).toBe("");
  });
});
