import { useState } from "react";


interface ClienFormData {
    apellido: string;
    nombre: string;
    dni: string;
    email: string;
    fechaIngreso: Date | string;
    domicilio: Domicilio;
}
interface Domicilio {
    calle: string;
    numero: string;
    localidad: string;
    provincia: string;
}

const ClientForm = () => {
    const [formData, setFormData] = useState<ClienFormData>({ 
        apellido: '', nombre: '', dni: '', email: '', fechaIngreso: Date(), domicilio: {calle: '', numero: '', localidad: '', provincia: ''}})

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
        console.log(formData)
        fetch("http://localhost:8082/pacientes/registrar", {
            method: "POST",
            body: JSON.stringify(formData),
            headers: {
                "Content-Type": "application/json",
            }
        })
        .then((response) => response.json())
        .then((data) => {
            console.log('---------data---------');
            console.log(data);
            
        })
        setFormData({
            apellido: '', nombre: '', dni: '', email: '', fechaIngreso: '', domicilio: {calle: '', numero: '', localidad: '', provincia: ''}
        })
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
            <input 
                type="text" 
                placeholder="Last Name" 
                name="apellido"
                value={formData.apellido}
                onChange={handleChangeClient}
            />
            <input 
                type="text" 
                placeholder="DNI" 
                name="dni"
                value={formData.dni}
                onChange={handleChangeClient}
            />
            <input 
                type="text" 
                placeholder="Email" 
                name="email"
                value={formData.email}
                onChange={handleChangeClient}
            />
            <input 
                type="date" 
                placeholder="Check in date" 
                name="fechaIngreso"
                value={formData.fechaIngreso.toString()}
                onChange={handleChangeClient}
            />
            <label>Adress</label>
            <input 
                type="text" 
                placeholder="Street" 
                name="calle"
                value={formData.domicilio.calle}
                onChange={handleChangeAdress}
            />
            <input 
                type="text" 
                placeholder="Number" 
                name="numero"
                value={formData.domicilio.numero || ''}
                onChange={handleChangeAdress}
            />
            <input 
                type="text" 
                placeholder="City" 
                name="localidad"
                value={formData.domicilio.localidad || ''}
                onChange={handleChangeAdress}
            />
            <input 
                type="text" 
                placeholder="State" 
                name="provincia"
                value={formData.domicilio.provincia || ''}
                onChange={handleChangeAdress}
            />
            <button type="submit">Enrrol client</button>
        </form>
    )
}
export default ClientForm