import { useContext, useEffect } from "react";
import {DentistContext} from '../../hooks/useDentistList'
import './DentistUpdate.css'

interface DentistUpdate {
    id: number;
    numeroDeMatricula: string;
    nombre: string;
    apellido: string;
}

const DentistUpdate = () => {
    
    const { dentistFound, setDentistFound, updateDentist, getDentistList }:any= useContext(DentistContext);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDentistFound({ ...dentistFound, [e.target.name]: e.target.value })
    }
    
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        updateDentist(dentistFound)
        getDentistList()
    }
    

    return (
        <form action="" className="dentist-update" onSubmit={handleSubmit}>
            <input 
                type="number" 
                placeholder="id" 
                value={dentistFound.id || ''}    
                readOnly
            />
            <input 
                type="text" 
                placeholder="Registration number" 
                name="numeroDeMatricula"
                value={dentistFound.numeroDeMatricula || '' }
                onChange={handleChange}
            />
            <input 
                type="text" 
                placeholder="First Name" 
                name="nombre"
                value={dentistFound.nombre || '' }
                onChange={handleChange}
            />
            <input 
                type="text" 
                placeholder="Last Name" 
                name="apellido"
                value={dentistFound.apellido || '' } 
                onChange={handleChange}
            />
            <button type="submit">Update</button>
        </form>
    )
};
export default DentistUpdate