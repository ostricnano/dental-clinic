import {useState} from 'react'
import NavBar from '../components/navbar/NavBar'
import ClientForm from '../components/clients/ClientForm'
import ClientList from '../components/clients/ClientList'
import './Dentists.css'
import ClientProvider from '../hooks/useClient'
import Layout from '../utils/Layout'

const Clients = () => {

    const [showForm, setShowForm] = useState(false);
    const [showList, setShowList] = useState(false);

    return (
        <Layout>
            <div className='dentist'>
                <p onClick={() => setShowForm(!showForm)}>Clients registration</p>
                <p>|</p>
                <p onClick={() => setShowList(!showList)}>Clients List</p>
            </div>
            <ClientProvider>    
                { showForm && <ClientForm />}
                { showList && <ClientList />}
            </ClientProvider>
        </Layout>
    )
}
export default Clients