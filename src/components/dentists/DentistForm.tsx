import { useState, useRef, useContext } from 'react'
import { DentistContext } from '../../hooks/useDentistList';
import axios from 'axios'
import './DentistForm.css'


interface DentistFormData {
    numeroDeMatricula: string;
    nombre: string;
    apellido: string;
}

const DentistForm = () => {
    const [formData, setFormData] = useState<DentistFormData>({ numeroDeMatricula: '', nombre: '', apellido: ''})
    const formRef = useRef<HTMLFormElement>(null);
    const { addDentist } = useContext(DentistContext);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ 
            ...formData, 
            [e.target.name]: e.target.value 
        })
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        addDentist(formData);
        setFormData({ numeroDeMatricula: '', nombre: '', apellido: ''})
    }
    

    return (
        <form className='dentist-form' onSubmit={handleSubmit} ref={formRef}>
            <input 
                type="text" 
                placeholder='Registration Number'
                name="numeroDeMatricula" 
                value={formData.numeroDeMatricula}
                onChange={handleChange} 
            />
            <input 
                type="text" 
                placeholder='First Name'
                name="nombre" 
                value={formData.nombre}
                onChange={handleChange} 
            />
            <input 
                type="text" 
                placeholder='Last Name'
                name="apellido" 
                value={formData.apellido}
                onChange={handleChange} 
            />
            <button type='submit'>Enrrol dentist</button>
        </form>
    )
}
export default DentistForm