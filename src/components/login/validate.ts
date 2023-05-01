interface InputErrors {
    firstName: string
    lastName: string
    email: string
    password: string
    userRole: string
}
const onValidate = (inputValues: InputErrors) => {
    let errors = {};
    let regexEmail = /^(\w+[/./-]?){1,}@[a-z]+[/.]\w{2,}$/;
    let regexName = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;
    if(!inputValues.firstName){
        errors = {firstName: 'El campo nombre no puede estar vacío'}
    }else if(!regexName.test(inputValues.firstName)){
        errors = {firstName: 'El campo nombre solo puede contener letras y espacios'}
    }
    if(!inputValues.lastName){
        errors = {...errors, lastName: 'El campo apellido no puede estar vacío'}
    }else if(!regexName.test(inputValues.lastName)){
        errors = {...errors, lastName: 'El campo apellido solo puede contener letras y espacios'}
    }
    if(!inputValues.email){
        errors = {...errors, email: 'El campo email no puede estar vacío'}
    }else if(!regexEmail.test(inputValues.email)){
        errors = {...errors, email: 'El campo email no es válido'}
    }
    if(!inputValues.password){
        errors = {...errors, password: 'El campo contraseña no puede estar vacío'}
    }else if(inputValues.password.length < 6){
        errors = {...errors, password: 'El campo contraseña debe tener al menos 6 caracteres'}
    }
    return errors;
}
export default onValidate;