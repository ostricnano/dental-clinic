import { createContext, useState, useEffect, ReactNode } from "react";
import axios from "axios";

interface Appointment {
    id: number;
    odontologo_id: number;
    paciente_id: number;
    fecha: string;
    nombre_paciente: string;
    nombre_odontologo: string;
}
interface AppointmentFound {
    id: number;
    odontologo_id: number;
    paciente_id: number;
    fecha: string;
    nombre_paciente: string;
    nombre_odontologo: string;
}
interface NewAppointment {
    odontologo_id: number;
    paciente_id: number;
    fecha: string;
}
interface AppointmentContextValue {
    appointment: Appointment[];
    appointmentFound: AppointmentFound;
    setAppointment: (appointment: Appointment[]) => void;
    setAppointmentFound: (appointmentFound: AppointmentFound) => void;
    addAppointment: (appointment: NewAppointment) => void;
    getAppointmentList: () => void;
    findAppointment: (id: number) => void;
    updateAppointment: (appointment: Appointment) => void;
    deleteAppointment: (id: number) => void;
}
interface AppointmentProviderProps {
    children: ReactNode;
}
export const AppointmentContext = createContext<AppointmentContextValue>({} as AppointmentContextValue);

const AppointmentProvider = ({ children }: AppointmentProviderProps) => {

    const [appointment, setAppointment] = useState<Appointment[]>([]);
    const [appointmentFound, setAppointmentFound] = useState<AppointmentFound>({} as AppointmentFound);
    const [newAppointment, setNewAppointment] = useState<NewAppointment>({} as NewAppointment);

    const addAppointment = (newAppointment: NewAppointment) => {
        setNewAppointment(newAppointment);
        axios.post("http://localhost:8082/turnos/registrar", newAppointment)
            .then(response => {
                console.log(response);
                getAppointmentList();
            })
            .catch(error => {
                console.log(error);
            })
    }

    const getAppointmentList = () => {
        axios.get("http://localhost:8082/turnos/listar")
            .then(response => {
                console.log('--------appointment list--------')
                console.log(response);
                setAppointment(response.data);
            })
            .catch(error => {
                console.log(error);
            })
    }

    const updateAppointment = (appointment: Appointment) => {
        axios.put("http://localhost:8082/turnos/actualizar", appointment)
            .then(response => {
                console.log(response);
                getAppointmentList();
            })
            .catch(error => {
                console.log(error);
            })
    }

    const findAppointment = (id: number) => {
        axios.get(`http://localhost:8082/turnos/${id}`)
            .then(response => {
                console.log('--------dentist found--------')
                console.log(response);
                setAppointmentFound(response.data);
            })
            .catch(error => {
                console.log(error);
            })
    }

    const deleteAppointment = (id: number) => {
        axios.delete(`http://localhost:8082/turnos/eliminar/${id}`)
            .then(response => {
                console.log(response);
                getAppointmentList();
            })
            .catch(error => {
                console.log(error);
            })
    }

    useEffect(() => {
        getAppointmentList();
    }, [])

    return (
        <AppointmentContext.Provider value={{appointment, appointmentFound, setAppointment, setAppointmentFound, addAppointment, getAppointmentList, findAppointment, updateAppointment, deleteAppointment}} >
            {children}
        </AppointmentContext.Provider>
    )
}
export default AppointmentProvider;