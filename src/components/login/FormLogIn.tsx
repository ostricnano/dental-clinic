import React, { useEffect } from "react";
import useFormLogIn from "../../hooks/useFormLogIn"
import { Link } from "react-router-dom"
import './FormLogIn.css'



const FormLogIn = () => {
    
    const [inputValues, dispatch] = useFormLogIn();
    const [ token, setToken ] = React.useState<string | null>(null);
    
    
    const usuarioEnviado = {
        userName: inputValues.userName,
        password: inputValues.password
    }
    
    const handleSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
        evt.preventDefault();
        fetch('http://localhost:8082/authenticate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
                },
            body: JSON.stringify(usuarioEnviado)
        })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            setToken(data)
            localStorage.setItem('token', data.jwt)
        }) 
        if(token && token !== undefined){
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
                /> <br />
                <input 
                    type="password" 
                    name="password" 
                    placeholder="password" 
                    onChange={handleChange}
                    value={inputValues.password}
                /> <br />
                <button type="submit">Iniciar sesion</button>
            </form>
            <Link className="link" to='/signin'>Ingrese aqui para crear una cuenta</Link>
        </div>
    )
}
export default FormLogIn