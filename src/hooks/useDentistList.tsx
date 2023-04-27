import {createContext, useState, useEffect, ReactNode} from 'react';
import axios from 'axios';
 
interface Dentist {
    id: number;
    numeroDeMatricula: string;
    nombre: string;
    apellido: string;
}
interface NewDentist {
    numeroDeMatricula: string;
    nombre: string;
    apellido: string;
}

interface DentistContextValue {
    dentist: Dentist[];
    dentistFound: Dentist;
    setDentist: (dentist: Dentist[]) => void;
    setDentistFound: (dentistFound: Dentist) => void;
    findDentist: (id: number) => void;
    deleteDentist: (id: number) => void;
    addDentist: (dentist: NewDentist) => void;
    updateDentist: (dentist: Dentist) => void;
    getDentistList: () => void;
}

interface DentistProviderProps {
    children: ReactNode;
}

export const DentistContext = createContext<DentistContextValue>({} as DentistContextValue);

const DentistProvider = ({ children }: DentistProviderProps) => {

    const [dentist, setDentist] = useState<Dentist[]>([]);
    const [dentistFound, setDentistFound] = useState<Dentist>({} as Dentist);
    const [newDentist, setNewDentist] = useState<NewDentist>({} as NewDentist);

    const addDentist = (newDentist: NewDentist) => {
        setNewDentist(newDentist);
        axios.post("http://localhost:8082/odontologos/registrar", newDentist)
        .then(response => {
            console.log(response);
            getDentistList();
        })
        .catch(error => {
            console.log(error);
        })
    }

    const getDentistList = () => {
        axios.get("http://localhost:8082/odontologos/listar")
        .then(response => {
            console.log('--------dentist list--------')
            console.log(response);
            setDentist(response.data);
        })
        .catch(error => {
            console.log(error);
        })
    }
    
    const updateDentist = (dentist: Dentist) => {
        axios.put("http://localhost:8082/odontologos/actualizar", dentist)
        .then(response => {
            console.log(response);
            getDentistList();
        })
        .catch(error => {
            console.log(error);
        })
        setDentistFound({} as Dentist);
    }
    
    const findDentist = (id: number) => {
        axios.get(`http://localhost:8082/odontologos/${id}`)
        .then(response => {
            console.log('--------dentist found--------')
            console.log(response);
            setDentistFound(response.data);
        })
    }
    
    const deleteDentist  = (id:number) => {
        axios.delete(`http://localhost:8082/odontologos/eliminar/${id}`)
        .then(response => {
            console.log(response);
            getDentistList();
        })
    }
    
    useEffect(() => {
        getDentistList();
    }, [])

    return (
        <DentistContext.Provider value={{getDentistList, updateDentist, addDentist, dentist, setDentist, findDentist, dentistFound, setDentistFound, deleteDentist}}>
            {children}
        </DentistContext.Provider>
    )
}
export default DentistProvider;
