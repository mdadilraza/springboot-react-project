import React, { useEffect, useState } from 'react'
import { createEmployee, getEmployee, updateEmployee } from '../services/EmployeeService';
import { useNavigate, useParams } from 'react-router-dom';

const EmployeeComponent = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password ,setPassword] =useState('');
    const navigator = useNavigate();
    let { id } = useParams();
    let [errors, setErrors] = useState({
        firstName: '',
        lastName: '',
        email: '' ,
        password:''
    })

    //for update show the data which is present in data base to input box then user can easily  update the data
    useEffect(() => {
        if (id) {
            getEmployee(id).then((response) => {
                setFirstName(response.data.firstName);
                setLastName(response.data.lastName);
                setEmail(response.data.email);
                setPassword(response.data.password)
            }).catch(error => {
                console.log(error);
            })
        }
    }, [id])

    //this method is used save the data or update the data in database
    const saveOrUpdateEmployee = (e) => {
        e.preventDefault();
        const employee = { firstName, lastName, email ,password};
        console.log(employee);
        if (validateForm()) {
            if (id) {

                updateEmployee(id, employee).then(response => {
                    console.log(response.data);

                    navigator('/employees')
                }).catch(error => console.error(error));
            } else {
                createEmployee(employee).then((response) => {
                    console.log(response.data);
                    navigator('/employees')
                }).catch(error => {
                    console.log(error.response.data);
                });
            }
        }

    }

    let validateForm = () => {
        let valid = true;
        const errorCopy = { ...errors };

        if (firstName.trim()) {
            errorCopy.firstName = '';
        } else {
            errorCopy.firstName = 'First Name is Required '
            valid = false;
        }

        if (lastName.trim()) {
            errorCopy.lastName = '';
        } else {
            errorCopy.lastName = 'Last Name is Required '
            valid = false;
        }
        if (email.trim()) {
            errorCopy.email = '';
        } else {
            errorCopy.email = 'Email is Required '
            valid = false;
        }
        if (password.trim()) {
            errorCopy.password = '';
        } else {
            errorCopy.password = 'Password is Required '
            valid = false;
        }

        setErrors(errorCopy)
        return valid;
    }

    const pageTitle = () => {
        if (id) {
            <h2 className="text-center">Update Employee</h2>
        } else {
            <h2 className="text-center">Add Employee</h2>
        }
    }
    return (
        <>
            <div className='container'>
                <br /><br /><br />
                <div className='row'>
                    <div className='card col-md-6 offset-md-3 offset-md-3'>
                        {
                            pageTitle()
                        }
                        <div className="card-body">
                            <form >
                                <div className="form-group mb-2">
                                    <label htmlFor="first-Name" className="form-label">First Name:</label>
                                    <input type="text" name="firstName"
                                        value={firstName}
                                        className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                                        onChange={(e) => setFirstName(e.target.value)}
                                        placeholder='ENTER EMPLOYEE FIRST NAME'
                                        id='first-Name' />
                                    {
                                        errors.firstName && <div className='invalid-feedback'>{errors.firstName}</div>
                                    }
                                </div>

                                <div className="form-group mb-2">
                                    <label htmlFor="last-Name" className="form-label">Last Name:</label>
                                    <input type="text" name="lastName"
                                        value={lastName}
                                        className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
                                        onChange={(e) => setLastName(e.target.value)}
                                        placeholder='ENTER EMPLOYEE LAST NAME'
                                        id='last-Name' />
                                    {
                                        errors.lastName && <div className='invalid-feedback'>{errors.lastName}</div>
                                    }
                                </div>
                                <div className="form-group mb-2">
                                    <label htmlFor="emails" className="form-label">Email:</label>
                                    <input type="" name="email"
                                        value={email}
                                        className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder='ENTER EMPLOYEE EMAIL'
                                        id='emails' />
                                    {
                                        errors.email && <div className='invalid-feedback'>{errors.email}</div>
                                    }
                                </div>
                                <div className="form-group mb-2">
                                    <label htmlFor="password" className="form-label">Password:</label>
                                    <input type="" name="password"
                                        value={password}
                                        className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder='ENTER EMPLOYEE PASSWORD'
                                        id='password' />
                                    {
                                        errors.password && <div className='invalid-feedback'>{errors.password}</div>
                                    }
                                </div>
                                <button className='btn btn-success' onClick={saveOrUpdateEmployee}>Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EmployeeComponent