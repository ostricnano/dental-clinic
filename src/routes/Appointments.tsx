import { useState } from "react"
import AppointmentForm from "../components/appointments/AppointmentForm"
import AppointmentList from "../components/appointments/AppointmentList"
import Layout from "../utils/Layout"
import './Dentists.css'
import AppointmentProvider from "../hooks/useAppointment"

const Appointments = () => {

    const [ showForm, setShowForm ] = useState(false);
    const [ showList, setShowList ] = useState(false);

    return (
        <Layout>
            <div className="dentist">
                <p onClick={() => setShowForm(!showForm)}>Set an appointment</p>
                <p>|</p>
                <p onClick={() => {setShowList(!showList)}}>Appointments list</p>
            </div>
            <AppointmentProvider>
                { showForm && <AppointmentForm /> }
                { showList && <AppointmentList /> }
            </AppointmentProvider>
        </Layout>
    )
}
export default Appointments