import React, { useState, useContext } from "react";
import useFormLogIn from "../../hooks/useFormLogIn"
import { Link } from "react-router-dom"
import  onValidate  from './validateLogin'
import { AuthContext } from "../../utils/authContext"
import './FormLogIn.css'

interface InputErrorsLogin {
    userName: string    
    password: string
}

const FormLogIn = () => {

    const { signIn } = useContext(AuthContext);
    const [inputValues, dispatch] = useFormLogIn();
    const [ errors, setErrors ] = React.useState<InputErrorsLogin>({} as InputErrorsLogin);
    
    
    
    const usuarioEnviado = {
        userName: inputValues.userName,
        password: inputValues.password
    }
    
    const handleSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
        evt.preventDefault();
        const err : InputErrorsLogin | any = onValidate(inputValues);
        setErrors(err);
        if (Object.keys(err).length === 0) {
           await signIn(usuarioEnviado.userName, usuarioEnviado.password);  
        }
        if(!localStorage.getItem('token')){
            alert('Usuario o contraseña incorrectos')
        } else {
            window.location.href = '/home'
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        dispatch({
            type: 'change_value',
            payload:{
                inputName: name,
                inputValue: value
            }
        })
    }

    return(
        <div className="form-logIn">
            <h3>Log in</h3>
            <form action="" onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    name="userName" 
                    placeholder="Username" 
                    onChange={handleChange}
                    value={inputValues.userName}
                />
                {errors && <div className="errors"><p>{errors.userName}</p></div>}
                <input 
                    type="password" 
                    name="password" 
                    placeholder="password" 
                    onChange={handleChange}
                    value={inputValues.password}
                />
                {errors && <div className="errors"><p>{errors.password}</p></div>}
                <button type="submit" >Iniciar sesion</button>
            </form>
            <Link className="link" to='/signin'>Don't have an account yet? Enter here to have one</Link>
        </div>
    )
}
export default FormLogIn