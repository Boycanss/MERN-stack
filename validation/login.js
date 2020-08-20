const Validator = require("validator");
const isEmpty = require("is-empty");


module.exports = function validateLoginInput(data) {
    let errors = {};

    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";

    // Cek Email
    if (Validator.isEmpty(data.email)) {
        errors.email = "Email harus diisi";
    } else if (!Validator.isEmail(data.email)) { //cek ini valid email atau tidak
        errors.email = "Email tidak valid";
    }

    //Cek Password
    if (Validator.isEmpty(data.password)) {
        errors.password = "Password harus diisi";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};