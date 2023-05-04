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
        errors = {firstName: 'The name field cannot be empty'}
    }else if(!regexName.test(inputValues.firstName)){
        errors = {firstName: 'The name field can only contain letters and spaces'}
    }
    if(!inputValues.lastName){
        errors = {...errors, lastName: 'The last name field cannot be empty'}
    }else if(!regexName.test(inputValues.lastName)){
        errors = {...errors, lastName: 'the last name field can only contain letters and spaces'}
    }
    if(!inputValues.email){
        errors = {...errors, email: 'The email field cannot be empty'}
    }else if(!regexEmail.test(inputValues.email)){
        errors = {...errors, email: 'The email field is not valid'}
    }
    if(!inputValues.password){
        errors = {...errors, password: 'The password field cannot be empty'}
    }else if(inputValues.password.length < 6){
        errors = {...errors, password: 'The password must be at least 6 characters long'}
    }
    return errors;
}
export default onValidate;