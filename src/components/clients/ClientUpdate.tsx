import { useContext } from "react";
import { ClientContext } from "../../hooks/useClient";

interface ClientUpdate {
    nombre: string;
    apellido: string;
    dni: string;
    email: string;
    fechaIngreso: string;
    domicilio: {
        calle: string;
        numero: string;
        localidad: string;
        provincia: string;
    }
}

const ClientUpdate = () => {
    const { cliente, setClient }:any = useContext(ClientContext);
    
    
    // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     setDentistFound({ ...clientFound, [e.target.name]: e.target.value })
    // }

    // const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    //     e.preventDefault()
    //     fetch(`http://localhost:8082/clientes/actualizar`, {
    //         method: 'PUT',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify(clientFound)
    //     })
    //         .then(response => response.json())
    //         .then(data => {
    //             console.log(data)
    //             setDentistFound(data)
    //         })
    // }

    return (
        <form >
            <input 
                type="text" 
                placeholder="First Name"
                name="nombre"
                
            />
                
            <input 
                type="text" 
                placeholder="Last Name" 
                name="apellido"
               
            />
            <input 
                type="text" 
                placeholder="DNI" 
                name="dni"
               
            />
            <input 
                type="text" 
                placeholder="Email" 
                name="email"
               
            />
            <input 
                type="date" 
                placeholder="Check in date" 
                name="fechaIngreso"
       
            />
            <label>Adress</label>
            <input 
                type="text" 
                placeholder="Street" 
                name="calle"
                
            />
            <input 
                type="text" 
                placeholder="Number" 
                name="numero"
                
            />
            <input 
                type="text" 
                placeholder="City" 
                name="localidad"
                
            />
            <input 
                type="text" 
                placeholder="State" 
                name="provincia"
              
            />
            <button type="submit">Update</button>
        </form>
    )
};
export default ClientUpdate;