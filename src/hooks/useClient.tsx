import { createContext, useState, useEffect, ReactNode } from "react";

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
interface ClientContextValue {
    client: Client[];
    setClient: (client: Client[]) => void;
    deleteClient: (id: number) => void;
    findClient: (id: number) => void;
    clientFound: Client;
    setClientFound: (clientFound: Client) => void;
}
interface ClientProviderProps {
    children: ReactNode;
}

export const ClientContext = createContext<ClientContextValue>({} as ClientContextValue);

const ClientProvider = ({ children }: ClientProviderProps) => {

    const [client, setClient] = useState<Client[]>([]);
    const [clientFound, setClientFound] = useState<Client>({} as Client);

    useEffect(() => {
        const listClient = () => {
            fetch("http://localhost:8082/pacientes/listar")
                .then((response) => response.json())
                .then((data) => {
                    setClient(data);
                });
        };
        listClient();
    }, []);

    const findClient = (id: number) => {
        fetch(`http://localhost:8082/pacientes/${id}`)
            .then((response) => response.json())
            .then((data) => {
                console.log("--------clientFound--------");
                console.log(data);
                setClientFound(data);
            });
    };

    const deleteClient = (id: number) => {
        fetch(`http://localhost:8082/pacientes/eliminar/${id}`, {
            method: "DELETE",
        })
            .then((response) => response.json())
            .then(() => {
                setClient(client.filter((client: any) => client.id !== id));
            });
    };

    return (
        <ClientContext.Provider value={{ client, setClient, deleteClient, findClient,clientFound,setClientFound }}>
            {children}
        </ClientContext.Provider>
    )
}
export default ClientProvider;
