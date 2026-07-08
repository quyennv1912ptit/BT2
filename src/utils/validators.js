export const validateFullName = (fullName) => {
    if (fullName.length === 0)
        return "Tên không được để trống";
    if (fullName.length < 2)
        return "Tên phải có ít nhất 2 ký tự";
    return "";
};

export const validateEmail = (email) => {
    if (email.length === 0)
        return "Email không được để trống";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email))
        return "Email không đúng định dạng (VD:  example@email.com)";

    return "";
};

export const validatePassword = (password) => {
    if (password.length === 0) return "Mật khẩu không được để trống";
    if (password.length < 8) return "Mật khẩu phải có ít nhất 8 ký tự";
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@*%$#])[A-Za-z\d@*%$#]+$/;
    if (!passwordRegex.test(password))
        return "Mật khẩu phải gồm ít nhất 1 chữ hoa, 1 chữ thường, 1 số và 1 ký tự đặc biệt (@, *, %, $, #)";
    return "";
};

export const validatePhoneNumber = (phoneNumber) => {
    if (phoneNumber.length === 0) return "Số điện thoại không được để trống";
    const phoneNumberRegex = /^0[35789][0-9]{8}$/;
    if (!phoneNumberRegex.test(phoneNumber)) return "Chưa đúng định dạng số điện thoại";
    return "";
};