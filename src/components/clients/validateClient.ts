interface InputErrors {
    apellido: string;
    nombre: string;
    dni: string;
    email: string;
    fechaIngreso: string;
    domicilio:{
        calle: string;
        numero: string;
        localidad: string;
        provincia: string;
    };
}


const onValidate = (inputValues: InputErrors) => {
    let errors  = {};
    
    let regexName = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;
    let regexDni = /^[0-9]{8}$/;
    let regexEmail = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

    if (!inputValues.apellido) {
        errors = { apellido: 'The last name field cannot be empty' };
    } else if (!regexName.test(inputValues.apellido)) {
        errors = { apellido: 'the last name field can only contain letters and spaces' };
    }
    if (!inputValues.nombre) {
        errors = { ...errors, nombre: 'The name field cannot be empty' };
    } else if (!regexName.test(inputValues.nombre)) {
        errors = { ...errors, nombre: 'The name field can only contain letters and spaces' };
    }
    if (!inputValues.dni) {
        errors = { ...errors, dni: 'The dni field cannot be empty' };
    }
    else if (!regexDni.test(inputValues.dni)) {
        errors = { ...errors, dni: 'The dni field must be 8 digits' };
    }
    if (!inputValues.email) {
        errors = { ...errors, email: 'The email field cannot be empty' };
    } else if (!regexEmail.test(inputValues.email)) {
        errors = { ...errors, email: 'The email field must be a valid email' };
    }
    if (!inputValues.fechaIngreso) {
        errors = { ...errors, fechaIngreso: 'The date field cannot be empty' };
    } else if (new Date(inputValues.fechaIngreso) < new Date()) {
        errors = { ...errors, fechaIngreso: 'The date cannot be lower than the current date' };
    }
    if (!inputValues.domicilio.calle) {
        errors = { ...errors, domicilio: { calle: 'The street field cannot be empty' } };
    }
    if (!inputValues.domicilio.numero) {
        errors = { ...errors, domicilio: { numero: 'The number field cannot be empty' } };
    }
    if (!inputValues.domicilio.localidad) {
        errors = { ...errors, domicilio: { localidad: 'The locality field cannot be empty' } };
    }
    if (!inputValues.domicilio.provincia) {
        errors = { ...errors, domicilio: { provincia: 'The province field cannot be empty' } };
    } 
    return errors;
};
export default onValidate;

