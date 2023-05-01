import { useState } from "react";
import useFormSingIn from "../../hooks/useSingInForm";
import  onValidate  from './validate'

interface InputErrors {
    firstName: string
    lastName: string
    email: string
    password: string
    userRole: string
}

const FormSignIn = () => {
    const [inputValues, dispatch] = useFormSingIn();
    const [ errors, setErrors ] = useState<InputErrors>({} as InputErrors);

    const usuarioEnviado = {
        nombre: inputValues.firstName,
        apellido: inputValues.lastName,
        email: inputValues.email,
        password: inputValues.password,
        usuarioRol: inputValues.userRole
    }

    const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
        evt.preventDefault();
        console.log(inputValues);
        const err : InputErrors | any = onValidate(inputValues);
        setErrors(err);
        if (Object.keys(err).length === 0) {
        fetch("http://localhost:8082/usuarios/registrar", {
            method: "POST",
            body: JSON.stringify(usuarioEnviado),
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
        })
        .catch((error) => console.log(error));
        }
    };
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        dispatch({
            type: "change_value",
            payload: {
                inputName: name,
                inputValue: value,
            },
        });
    }
    console.log(errors);
    
    return(
        <form className="form-logIn" onSubmit={handleSubmit}>
            <input 
                type="text" 
                name="firstName" 
                placeholder="FirstName"
                onChange={handleChange}
                value={inputValues.firstName}
            />
            {errors ? <div className="errors"><p>{errors.firstName}</p></div> : null}
            <input 
                type="text" 
                name="lastName" 
                placeholder="LastName" 
                onChange={handleChange}
                value={inputValues.lastName}
            />
            {errors && <div className="errors"><p>{errors.lastName}</p></div>}
            <input 
                type="text" 
                name="email" 
                placeholder="Email"
                onChange={handleChange}
                value={inputValues.email}
            />
            {errors && <div className="errors"><p>{errors.email}</p></div>}
            <input 
                type="password" 
                name="password" 
                placeholder="Password" 
                onChange={handleChange}
                value={inputValues.password}
            />
            {errors && <div className="errors"><p>{errors.password}</p></div>}
            <input 
                type="text" 
                name="userRole"
                placeholder="User" 
                onChange={handleChange}
                value={inputValues.userRole}
            />
            {errors && <div className="errors"><p>{errors.userRole}</p></div>}
            <button type="submit" >Registrar</button>
        </form>
    )
}
export default FormSignIn
