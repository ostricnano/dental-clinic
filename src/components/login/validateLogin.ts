interface InputErrorsLogin {
    userName: string
    password: string
}
const onValidate = (inputValues: InputErrorsLogin) => {
    let errors = {};
    let regexEmail = /^(\w+[/./-]?){1,}@[a-z]+[/.]\w{2,}$/;
    if(!inputValues.userName){
        errors = {userName: 'The email field cannot be empty'}
    }else if(!regexEmail.test(inputValues.userName)){
        errors = {userName: 'The email field is not valid'}
    }
    if(!inputValues.password){
        errors = {...errors, password: 'The password field cannot be empty'}    
    }else if(inputValues.password.length < 6){
        errors = {...errors, password: 'The password must be at least 6 characters long'}
    }
    return errors;
}
export default onValidate;
