import { useContext } from "react";
import { ClientContext } from "../../hooks/useClient";
import ClientUpdate from "./ClientUpdate";
import './ClientList.css'


const ClientList = () => {

    const { client, deleteClient, findClient } = useContext(ClientContext);

    return (
        <div>
            <table className="client-table">
                <thead>
                    <tr>
                        <th>id</th>
                        <th>First name</th>
                        <th>Last name</th>
                        <th>DNI</th>
                        <th>Email</th>
                        <th>Check in date</th>
                        <th>Street</th>
                        <th>Number</th>
                        <th>City</th>
                        <th>State</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        client.map((client: any) => {
                            return (
                                <tr key={client.id}>
                                    <td><button onClick={()=>findClient(client.id)} className='button-update'>{client.id}</button></td>
                                    <td>{client.nombre}</td>
                                    <td>{client.apellido}</td>
                                    <td>{client.dni}</td>
                                    <td>{client.email}</td>
                                    <td>{client.fechaIngreso}</td>
                                    <td>{client.domicilio.calle}</td>
                                    <td>{client.domicilio.numero}</td>
                                    <td>{client.domicilio.localidad}</td>
                                    <td>{client.domicilio.provincia}</td>
                                    <td><button onClick={()=>deleteClient(client.id)} className='button-delete'>X</button></td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
            <ClientUpdate />
        </div>
    )
};
export default ClientList;