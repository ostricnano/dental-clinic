import { useContext } from "react";
import { AppointmentContext } from "../../hooks/useAppointment";
import './AppointmentUpdate.css'

interface AppointmentUpdate {
    id: number;
    odontologo_id: number;
    nombre_odontologo: string;
    paciente_id: number;
    nombre_paciente: string;
    fecha: string;
}
type Props = {
    setShowUpdateForm: (value: boolean) => void;
}
const AppointmentUpdate = ({ setShowUpdateForm }: Props) => {
    const { appointmentFound, setAppointmentFound, updateAppointment } = useContext(AppointmentContext);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAppointmentFound({ ...appointmentFound, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        updateAppointment(appointmentFound)
        setShowUpdateForm(false)
    }

    return (
        <form className="appointment-update" action="" onSubmit={handleSubmit}>
            <input 
                type="number" 
                placeholder="id" 
                readOnly
                value={appointmentFound.id || ''}
            />
            <input 
                type="number" 
                placeholder="Dentist ID" 
                name="odontologo_id"
                value={appointmentFound.odontologo_id || '' }
                onChange={handleChange}
            />
            <input 
                type="text" 
                placeholder="Dentist Name" 
                readOnly
                name="nombre_odontologo"
                value={appointmentFound.nombre_odontologo || ''}
            />
            <input 
                type="number" 
                placeholder="Patient ID" 
                name="paciente_id"
                value={appointmentFound.paciente_id || '' }
                onChange={handleChange}
            />
            <input 
                type="text" 
                placeholder="Patient Name" 
                readOnly
                name="nombre_paciente"
                value={appointmentFound.nombre_paciente || '' }
            />
            <input 
                type="date" 
                placeholder="Date" 
                name="fecha"
                value={appointmentFound.fecha || '' }
                onChange={handleChange}
            />
            <button type="submit">Update</button>
        </form>
    )
}
export default AppointmentUpdate