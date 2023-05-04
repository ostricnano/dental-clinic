import { useState, useContext } from "react";
import { ClientContext } from "../../hooks/useClient";
import onValidate from "./validateClient";


interface ClienFormData {
    apellido: string;
    nombre: string;
    dni: string;
    email: string;
    fechaIngreso: string;
    domicilio: Domicilio;
}
interface Domicilio {
    calle: string;
    numero: string;
    localidad: string;
    provincia: string;
}
interface InputErrors {
    apellido: string;
    nombre: string;
    dni: string;
    email: string;
    fechaIngreso: string;
    domicilio: DomicilioErrors;
}
interface DomicilioErrors {
    calle: string;
    numero: string;
    localidad: string;
    provincia: string;
}

const ClientForm = () => {
    const [formData, setFormData] = useState<ClienFormData>({ 
        apellido: '', nombre: '', dni: '', email: '', fechaIngreso: Date(), domicilio: {calle: '', numero: '', localidad: '', provincia: ''}})
    const [errors, setErrors] = useState<InputErrors>({} as InputErrors)

    const { addClient } = useContext(ClientContext);    
        
    const handleChangeClient = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({...formData, [name]: value})
    }
    const handleChangeAdress = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            domicilio: {
                ...formData.domicilio,
                [e.target.name]: e.target.value,

            }
        })
    }
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const err : InputErrors | any = onValidate(formData);
        console.log(err.domicilio)
        
        setErrors(err);
        if (Object.keys(err).length === 0) {
            addClient(formData);
            setFormData({
                apellido: '', nombre: '', dni: '', email: '', fechaIngreso: '', domicilio: {calle: '', numero: '', localidad: '', provincia: ''}
            })
        }
    }

    return(
        <form onSubmit={handleSubmit}>
            <input 
                type="text" 
                placeholder="First Name" 
                name="nombre"
                value={formData.nombre}
                onChange={handleChangeClient}
            />
            { errors && <div className="errors"><p>{errors.nombre}</p></div> }
            <input 
                type="text" 
                placeholder="Last Name" 
                name="apellido"
                value={formData.apellido}
                onChange={handleChangeClient}
            />
            { errors && <div className="errors"><p>{errors.apellido}</p></div> }
            <input 
                type="text" 
                placeholder="DNI" 
                name="dni"
                value={formData.dni}
                onChange={handleChangeClient}
            />
            { errors && <div className="errors"><p>{errors.dni}</p></div> }
            <input 
                type="text" 
                placeholder="Email" 
                name="email"
                value={formData.email}
                onChange={handleChangeClient}
            />
            { errors && <div className="errors"><p>{errors.email}</p></div> }
            <input 
                type="date" 
                placeholder="Check in date" 
                name="fechaIngreso"
                value={formData.fechaIngreso.toString()}
                onChange={handleChangeClient}
            />
            { errors && <div className="errors"><p>{errors.fechaIngreso}</p></div> }
            <label>Adress</label>
            <input 
                type="text" 
                placeholder="Street" 
                name="calle"
                value={formData.domicilio.calle}
                onChange={handleChangeAdress}
            />
            { errors.domicilio && <div className="errors"><p>{errors.domicilio?.calle}</p></div> }
            <input 
                type="text" 
                placeholder="Number" 
                name="numero"
                value={formData.domicilio.numero || ''}
                onChange={handleChangeAdress}
            />
            { errors.domicilio && <div className="errors"><p>{errors.domicilio.numero}</p></div> }
            <input 
                type="text" 
                placeholder="City" 
                name="localidad"
                value={formData.domicilio.localidad || ''}
                onChange={handleChangeAdress}
            />
            { errors.domicilio && <div className="errors"><p>{errors.domicilio.localidad}</p></div> }
            <input 
                type="text" 
                placeholder="State" 
                name="provincia"
                value={formData.domicilio.provincia || ''}
                onChange={handleChangeAdress}
            />
            { errors.domicilio && <div className="errors"><p>{errors.domicilio.provincia}</p></div> }
            <button type="submit">Enrrol client</button>
        </form>
    )
}
export default ClientForm