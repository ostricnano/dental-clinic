import { useContext } from "react";
import { ClientContext } from "../../hooks/useClient";
import './ClientUpdate.css'

interface ClientUpdate {
    nombre: string;
    apellido: string;
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

type Props = {
    setShowUpdateForm: (value: boolean) => void;
}

const ClientUpdate: React.FC<Props> = ({ setShowUpdateForm }) => {

    const { clientFound, setClientFound, updateClient }:any = useContext(ClientContext);
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setClientFound({ ...clientFound, [e.target.name]: e.target.value })
    }
    const handleChangeAdress = (e: React.ChangeEvent<HTMLInputElement>) => {
        setClientFound({
            ...clientFound,
            domicilio: {
                ...clientFound.domicilio,
                [e.target.name]: e.target.value,
            }   
        })
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        updateClient(clientFound)
        setShowUpdateForm(false)
    }

    return (
        <form className="client-update" onSubmit={handleSubmit}>
            <input 
                type="text" 
                placeholder="ID"
                name="id"
                value={clientFound.id || ''}
                readOnly
            />
            <input 
                type="text" 
                placeholder="First Name"
                name="nombre"
                value={clientFound.nombre || ''}
                onChange={handleChange}
            />
                
            <input 
                type="text" 
                placeholder="Last Name" 
                name="apellido"
               value={clientFound.apellido || ''}
                onChange={handleChange}
            />
            <input 
                type="text" 
                placeholder="DNI" 
                name="dni"
                value={clientFound.dni || ''}
                onChange={handleChange}
               
            />
            <input 
                type="text" 
                placeholder="Email" 
                name="email"
                value={clientFound.email || ''}
                onChange={handleChange}
            />
            <input 
                type="date" 
                placeholder="Check in date" 
                name="fechaIngreso"
                value={clientFound.fechaIngreso || ''}
                onChange={handleChange}
            />
            <label>Adress</label>
            <input 
                type="text" 
                placeholder="Street" 
                name="calle"
                value={clientFound.domicilio?.calle || ''}
                onChange={handleChangeAdress}
            />
            <input 
                type="text" 
                placeholder="Number" 
                name="numero"
                value={clientFound.domicilio?.numero || ''}
                onChange={handleChangeAdress}
            />
            <input 
                type="text" 
                placeholder="City" 
                name="localidad"
                value={clientFound.domicilio?.localidad || ''}
                onChange={handleChangeAdress}
            />
            <input 
                type="text" 
                placeholder="State" 
                name="provincia"
                value={clientFound.domicilio?.provincia || ''}
                onChange={handleChangeAdress}
            />
            <button type="submit">Update</button>
        </form>
    )
};
export default ClientUpdate;