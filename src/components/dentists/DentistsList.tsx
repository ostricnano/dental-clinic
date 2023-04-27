import { useContext, useState } from 'react'
import {DentistContext} from '../../hooks/useDentistList'
import DentistUpdate from './DentistUpdate';
import './DentistList.css'

interface Dentist {
   id: number;
   numeroDeMatricula: string;
   nombre: string;
   apellido: string;
}

const DentistsList = () => {

   const [ showUpdateForm, setShowUpdateForm ] = useState(false);
   const { dentist, findDentist, deleteDentist } = useContext(DentistContext);

   const handleDelete = (id: number) => {
      deleteDentist(id)
   }
   const handleUpdate = (id:number) => {
      findDentist(id)
      setShowUpdateForm(true)
   }


    return (
      <div>
         <table>
            <thead>
               <tr>
                  <th>id</th>
                  <th>Register number</th>
                  <th>First name</th>
                  <th>Last name</th>
                  <th>Delete</th>
               </tr>
            </thead>
            <tbody>
               {
                  dentist.map((dentist: Dentist) => {
                     return(
                        <tr key={dentist.id}>
                           <td><button onClick={() => handleUpdate(dentist.id)} className='button-update'>{dentist.id}</button></td>
                           <td>{dentist.numeroDeMatricula}</td>
                           <td>{dentist.nombre}</td>
                           <td>{dentist.apellido}</td>
                           <td><button onClick={()=> handleDelete(dentist.id)} className='button-delete'>X</button></td>
                        </tr>
                     )
                  })
               }
            </tbody>
         </table>
         {showUpdateForm ? <DentistUpdate  setShowUpdateForm={setShowUpdateForm} /> : ''}
      </div>
    )
}
export default DentistsList