const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateRegisterInput(data) {
    let errors = {};

    //replace field yang kosong menjadi string kosong agar bisa menggunakan function validator
    data.name = !isEmpty(data.name) ? data.name : "";
    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";
    data.password2 = !isEmpty(data.password2) ? data.password2 : "";

    //Cek name
    if (Validator.isEmpty(data.name)) {
        errors.name = "Nama harus diisi"
    };

    //Cek Email
    if (Validator.isEmpty(data.email)) {
        errors.email = "Email harus diisi"
    } else if (!Validator.isEmail(data.email)) { //cek ini valid email atau tidak
        errors.email = "Email tidak valid"
    }

    //Cek Password 
    if (Validator.isEmpty(data.password)) {
        errors.password = "Password harus diisi"
    }

    if (Validator.isEmpty(data.password2)) {
        errors.password2 = "Konfirmasi Password harus diisi"
    }

    if (!Validator.isLength(data.password, { min: 8, max: 30 })) {
        errors.password = "tidak boleh kurang dari 8 karakter"
    }

    if (!Validator.equals(data.password, data.password2)) {
        errors.password2 = "Passwords tidak sama";
    }
    return {
        errors,
        isValid: isEmpty(errors)
    }

}