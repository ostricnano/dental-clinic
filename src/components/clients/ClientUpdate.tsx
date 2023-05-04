import { useContext, useState } from "react";
import { ClientContext } from "../../hooks/useClient";
import onValidate from "./validateClient";
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

type Props = {
    setShowUpdateForm: (value: boolean) => void;
}

const ClientUpdate: React.FC<Props> = ({ setShowUpdateForm }) => {

    const [ errors, setErrors ] = useState<InputErrors>({} as InputErrors)
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
        const err : InputErrors | any = onValidate(clientFound);
        setErrors(err)
        if (Object.keys(err).length === 0){
            updateClient(clientFound)
            setShowUpdateForm(false)
        };
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
                {errors.nombre && <div className="errors"><p>{errors.nombre}</p></div>}
            <input 
                type="text" 
                placeholder="Last Name" 
                name="apellido"
                value={clientFound.apellido || ''}
                onChange={handleChange}
                />
                { errors.apellido && <div className="errors"><p>{errors.apellido}</p></div> }
            <input 
                type="text" 
                placeholder="DNI" 
                name="dni"
                value={clientFound.dni || ''}
                onChange={handleChange}
                />
                { errors.dni && <div className="errors"><p>{errors.dni}</p></div> }
            <input 
                type="text" 
                placeholder="Email" 
                name="email"
                value={clientFound.email || ''}
                onChange={handleChange}
                />
                { errors.email && <div className="errors"><p>{errors.email}</p></div> }
            <input 
                type="date" 
                placeholder="Check in date" 
                name="fechaIngreso"
                value={clientFound.fechaIngreso || ''}
                onChange={handleChange}
                />
                { errors.fechaIngreso && <div className="errors"><p>{errors.fechaIngreso}</p></div> }
            <label>Adress</label>
            <input 
                type="text" 
                placeholder="Street" 
                name="calle"
                value={clientFound.domicilio?.calle || ''}
                onChange={handleChangeAdress}
                />
                { errors.domicilio?.calle && <div className="errors"><p>{errors.domicilio?.calle}</p></div> }
            <input 
                type="text" 
                placeholder="Number" 
                name="numero"
                value={clientFound.domicilio?.numero || ''}
                onChange={handleChangeAdress}
                />
                { errors.domicilio?.numero && <div className="errors"><p>{errors.domicilio?.numero}</p></div> }
            <input 
                type="text" 
                placeholder="City" 
                name="localidad"
                value={clientFound.domicilio?.localidad || ''}
                onChange={handleChangeAdress}
                />
                { errors.domicilio?.localidad && <div className="errors"><p>{errors.domicilio?.localidad}</p></div> }
            <input 
                type="text" 
                placeholder="State" 
                name="provincia"
                value={clientFound.domicilio?.provincia || ''}
                onChange={handleChangeAdress}
                />
                { errors.domicilio?.provincia && <div className="errors"><p>{errors.domicilio?.provincia}</p></div> }
            <button type="submit">Update</button>
        </form>
    )
};
export default ClientUpdate;