interface InputErrors {
    numeroDeMatricula: string ;
    nombre: string;
    apellido: string;
}
const onValidate = (inputValues: InputErrors) => {
    let errors = {};
    let regexName = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;
    if (!inputValues.numeroDeMatricula) {
        errors = { numeroDeMatricula: 'The registration number cannot be empty' };
    } else if (inputValues.numeroDeMatricula.length < 3) {
        errors = { numeroDeMatricula: 'The registration number must be at least 6 characters long' };
    }
    if (!inputValues.nombre) {
        errors = { ...errors, nombre: 'The name field cannot be empty' };
    } else if (!regexName.test(inputValues.nombre)) {
        errors = { ...errors, nombre: 'The name field can only contain letters and spaces' };
    }
    if (!inputValues.apellido) {
        errors = { ...errors, apellido: 'The last name field cannot be empty' };
    } else if (!regexName.test(inputValues.apellido)) {
        errors = { ...errors, apellido: 'the last name field can only contain letters and spaces' };
    }
    return errors;
};
export default onValidate;
