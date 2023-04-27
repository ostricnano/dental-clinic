import { useState } from 'react'
import DentistForm from '../components/dentists/DentistForm'
import NavBar from '../components/navbar/NavBar'
import DentistsList from '../components/dentists/DentistsList'
import './Dentists.css'

const Dentists = () => {

    const [showForm, setShowForm] = useState(false);
    const [showList, setShowList] = useState(false);

    return (
        <>
            <NavBar />
            <div className='dentist'>
                <p onClick={() => setShowForm(!showForm)}>Dentists registration</p>
                <p>|</p>
                <p onClick={() => setShowList(!showList)}>Dentists List</p>
            </div>
            { showForm && <DentistForm /> }
            { showList && <DentistsList />}
        </>
    )
}
export default Dentists