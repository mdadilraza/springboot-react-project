import React, { useEffect, useState } from 'react'
import { deleteEmployee, listOfEmployess } from '../services/EmployeeService'
import { useNavigate } from 'react-router-dom'

const ListOfEmployee = () => {
    
   const [employees ,setEmployees] =useState([])

   const navigator =useNavigate();
   useEffect(()=>{
         getAllEmployees();
   },[])
   
   const getAllEmployees =() =>{
    listOfEmployess().then(response =>{
      setEmployees(response.data);
     }) .catch(error => console.error(error))
   }
   const addNewEmployee =() =>{
      navigator('/add-employee')
   }

   const updateEmployee =(id)=>{
    navigator(`/edit-employee/${id}`);
    
   }

   const removeEmployee =(id) =>{
       console.log(id);

       deleteEmployee(id).then(response =>{
        console.log(response.data)
        getAllEmployees();
       }).catch(error => console.error(error));

       
   }
  return (

    <div className='container' style={{margin: '90px'}}>
      <h2 className='text-center'>List Of Employess</h2>
      <button className='btn btn-primary mb-2' onClick={addNewEmployee}>Add Employee</button>
      <table className='table table-striped table-bordered'>
        <thead>
            <tr>
                
                    <th>Employee Id</th>
                    <th>Employee FirstName</th>
                    <th>Employee LastName</th>
                    <th>Employee Email</th>
                    <th>Actions</th>
                
            </tr>
        </thead>
        <tbody>
           {
            employees.map(employee =>
                  {
                 return    <tr key={employee.id}>
                       <td>{employee.id}</td>
                       <td>{employee.firstName}</td>
                       <td>{employee.lastName}</td>
                       <td>{employee.email}</td>
                       <td><button className='btn btn-info' onClick={() => updateEmployee(employee.id)}>Update</button>
                       <button className='btn btn-danger' onClick={() => removeEmployee(employee.id)} style={{marginLeft:'10px'}}>Delete</button></td>

                    </tr>
                  }
            )
           }
        </tbody>
      </table>

    </div>
  )
}

export default ListOfEmployee