import { useContext, useState } from "react"
import { AppointmentContext } from "../../hooks/useAppointment"
import AppointmentUpdate  from "./AppointmentUpdate"  

const AppointmentList = () => {

    const {appointment, findAppointment, deleteAppointment } = useContext(AppointmentContext);
    const [ showUpdateForm, setShowUpdateForm ] = useState<boolean>(false)

    const handleDelete = (id: number) => {
        deleteAppointment(id)
    }
    const handleUpdate = (id:number) => {
        findAppointment(id)
        setShowUpdateForm(true)
    }

    return(
        <div>
            <table>
                <thead>
                    <tr>
                        <th>id</th>
                        <th>Dentist_id</th>
                        <th>Dentist name</th>
                        <th>Patient id</th>
                        <th>Patient name</th>
                        <th>Date</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        appointment.map((appointment: any) => {
                            return(
                                <tr key={appointment.id}>
                                    <td><button onClick={() => handleUpdate(appointment.id)} className='button-update'>{appointment.id}</button></td>
                                    <td>{appointment.odontologo_id}</td>
                                    <td>{appointment.nombre_odontologo}</td>
                                    <td>{appointment.paciente_id}</td>
                                    <td>{appointment.nombre_paciente}</td>
                                    <td>{appointment.fecha}</td>
                                    <td><button onClick={() => handleDelete(appointment.id)} className='button-delete'>X</button></td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
            {showUpdateForm ? <AppointmentUpdate setShowUpdateForm={setShowUpdateForm} /> : ''}
        </div>
    )
} 
export default AppointmentList