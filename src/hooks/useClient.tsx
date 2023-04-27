import { createContext, useState, useEffect, ReactNode } from "react";
import axios from "axios";

interface Client {
    id: number;
    nombre: string;
    apellido: string;
    dni: string;
    fechaIngreso: string;
    domicilio: Domicilio;
}
interface Domicilio {
    calle: string;
    numero: string;
    localidad: string;
    provincia: string;
}
interface NewClient {
    nombre: string;
    apellido: string;
    dni: string;
    fechaIngreso: string;
    domicilio: Domicilio;
}
interface ClientContextValue {
    client: Client[];
    clientFound: Client;
    setClient: (client: Client[]) => void;
    setClientFound: (clientFound: Client) => void;
    addClient: (client: NewClient) => void;
    getClientList: () => void;
    findClient: (id: number) => void;
    updateClient: (client: Client) => void;
    deleteClient: (id: number) => void;
}
interface ClientProviderProps {
    children: ReactNode;
}

export const ClientContext = createContext<ClientContextValue>({} as ClientContextValue);

const ClientProvider = ({ children }: ClientProviderProps) => {

    const [client, setClient] = useState<Client[]>([]);
    const [clientFound, setClientFound] = useState<Client>({} as Client);
    const [newClient, setNewClient] = useState<NewClient>({} as NewClient);

    const addClient = (newClient: NewClient) => {
        setNewClient(newClient);
        axios.post("http://localhost:8082/pacientes/registrar", newClient)
            .then((response) => {
                console.log(response);
                getClientList();
            })
            .catch((error) => {
                console.log(error);
            });
    };
    
    const getClientList = () => {
        axios.get("http://localhost:8082/pacientes/listar")
            .then((response) => {
                console.log("--------client list--------");
                console.log(response);
                setClient(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };
    
    const updateClient = (client: Client) => {
        axios.put("http://localhost:8082/pacientes/actualizar", client)
            .then((response) => {
                console.log(response);
                getClientList();
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const findClient = (id: number) => {
        axios.get(`http://localhost:8082/pacientes/${id}`)
            .then((response) => {
                console.log("--------client found--------");
                console.log(response);
                setClientFound(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const deleteClient = (id: number) => {
        axios.delete(`http://localhost:8082/pacientes/eliminar/${id}`)
            .then((response) => {
                console.log(response);
                getClientList();
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        getClientList();
    }, []);

    return (
        <ClientContext.Provider value={{ client, setClient, deleteClient, findClient,clientFound,setClientFound, addClient, updateClient, getClientList }}>
            {children}
        </ClientContext.Provider>
    )
}
export default ClientProvider;
