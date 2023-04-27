import {useState, useContext} from 'react'
import { AppointmentContext } from '../../hooks/useAppointment'

interface AppointmentFormData {
    odontologo_id: number;
    paciente_id: number;
    fecha: string;
}

const AppointmentForm = () => {
    const [formData, setFormData] = useState<AppointmentFormData>({ odontologo_id: 0, paciente_id: 0, fecha: Date()})
    const { addAppointment } = useContext(AppointmentContext);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        addAppointment(formData);
        setFormData({ odontologo_id: 0, paciente_id: 0, fecha: ''})
    }

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="">Dentist id</label>
            <input 
                type="number" 
                placeholder="Dentist ID"
                name='odontologo_id'
                value={formData.odontologo_id}
                onChange={handleChange}
            />
            <label htmlFor="">Patient id</label>
            <input 
                type="number" 
                placeholder="Patient ID"
                name='paciente_id'
                value={formData.paciente_id}
                onChange={handleChange}
            />
            <label htmlFor="">Date</label>
            <input 
                type="date" 
                placeholder="Date"
                name='fecha'
                value={formData.fecha.toString()}
                onChange={handleChange}
            />
            <button type="submit">Confirm appointment</button>
        </form>
    )
}
export default AppointmentForm