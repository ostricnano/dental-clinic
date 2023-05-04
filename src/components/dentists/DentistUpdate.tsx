import { useContext, useState } from "react";
import {DentistContext} from '../../hooks/useDentistList'
import onValidate from './validateDentist'
import './DentistUpdate.css'

interface DentistUpdate {
    id: number;
    numeroDeMatricula: string;
    nombre: string;
    apellido: string;
}
interface InputErrorsDentist {
    numeroDeMatricula: string;
    nombre: string;
    apellido: string;
}
type Props = {
    setShowUpdateForm: (showUpdateForm: boolean) => void;
 }

const DentistUpdate: React.FC<Props> = ({ setShowUpdateForm }) => {
    const [ errors, setErrors ] = useState<InputErrorsDentist>({} as InputErrorsDentist)
    const { dentistFound, setDentistFound, updateDentist }:any= useContext(DentistContext);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDentistFound({ ...dentistFound, [e.target.name]: e.target.value })
    }
    
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const err : InputErrorsDentist | any = onValidate(dentistFound);
        setErrors(err);
        if (Object.keys(err).length === 0) {
            updateDentist(dentistFound)
            setShowUpdateForm(false)
        }
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
            { errors && <div className="errors"><p>{errors.numeroDeMatricula}</p></div> }
            <input 
                type="text" 
                placeholder="First Name" 
                name="nombre"
                value={dentistFound.nombre || '' }
                onChange={handleChange}
            />
            { errors && <div className="errors"><p>{errors.nombre}</p></div> }
            <input 
                type="text" 
                placeholder="Last Name" 
                name="apellido"
                value={dentistFound.apellido || '' } 
                onChange={handleChange}
            />
            { errors && <div className="errors"><p>{errors.apellido}</p></div> }
            <button type="submit">Update</button>
        </form>
    )
};
export default DentistUpdate