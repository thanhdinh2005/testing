export function validateUsername(username) {
  if (!username) return "Tên đăng nhập không được để trống";
  if (username.length < 3) return "Tên đăng nhập phải có ít nhất 3 ký tự";
  if (username.length > 50) return "Tên đăng nhập không được vượt quá 50 ký tự";
  const regex = /^[a-zA-Z0-9._-]+$/;
  if (!regex.test(username)) return "Tên đăng nhập chỉ được chứa chữ, số và ._-";
  return "";
}

export function validatePassword(password) {
  if (!password) return "Mật khẩu không được để trống";
  if (password.length < 6) return "Mật khẩu phải có ít nhất 6 ký tự";
  if (password.length > 100) return "Mật khẩu không được vượt quá 100 ký tự";
  const regex = /^(?=.*[A-Za-z])(?=.*\d).+$/;
  if (!regex.test(password)) return "Mật khẩu phải có cả chữ và số";
  return "";
}
