import { useState } from 'react'
import DentistForm from '../components/dentists/DentistForm'
import DentistsList from '../components/dentists/DentistsList'
import Layout from '../utils/Layout'
import './Dentists.css'

const Dentists = () => {

    const [showForm, setShowForm] = useState(false);
    const [showList, setShowList] = useState(false);

    return (
        <Layout>
            <div className='dentist'>
                <p onClick={() => setShowForm(!showForm)}>Dentists registration</p>
                <p>|</p>
                <p onClick={() => setShowList(!showList)}>Dentists List</p>
            </div>
            { showForm && <DentistForm /> }
            { showList && <DentistsList />}
        </Layout>
    )
}
export default Dentists