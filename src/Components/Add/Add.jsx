import React, { useState } from 'react'
import './Add.css'
import Swal from 'sweetalert2'
import { getAgeFromDOB, getDataFromLs } from '../../Utils/helper'
const initialData = {
    name: "",
    dateOfBirth: "",
    adharNumber: null,
    mobileNumber: null,
    age: null
}
const Add = () => {
    const [isAdding, setIsAdding] = useState(false)
    const [personData, setPersonData] = useState(initialData)
    const [lsPersonData, setLsPersonData] = useState(() => {
        return getDataFromLs()
    })
    const [invalidField, setInvalidField] = useState([])

    const checkValidation = () => {
        const res = []
        if (personData.name === "") {
            res.push('name')
        }
        if (personData.dateOfBirth === "") {
            res.push("dateOfBirth")
        }
        if (personData.adharNumber === null || personData.adharNumber.length !== 12) {
            res.push("adharNumber")
        }
        if (personData.mobileNumber === null || personData.mobileNumber.length !== 10) {
            res.push("mobileNumber")
        }
        setInvalidField(res)
        return res.length === 0 ? true : false;
    }

    // important localstorage setup

    const handleSave = () => {

        const isAllDatavalid = checkValidation()

        if (!isAllDatavalid) {
            return;
        }
        const persondDataFromLS = localStorage.getItem("person-data")

        const person = {
            Name: personData.name,
            "Date of Birth": personData.dateOfBirth,
            "Aadhar Number": personData.adharNumber,
            "Mobile Number": personData.mobileNumber,
            "Age": personData.age
        }
        if (persondDataFromLS) {
            const parsedData = JSON.parse(persondDataFromLS)
            const personArr = [...parsedData, person]
            localStorage.setItem("person-data", JSON.stringify(personArr))
            setLsPersonData(personArr)
        } else {
            const newArr = [person]
            localStorage.setItem("person-data", JSON.stringify(newArr))
            setLsPersonData(newArr)
        }
        setIsAdding(false)
        setPersonData(initialData)
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Information has been saved',
            showConfirmButton: false,
            customClass: {

                popup: 'custom-swal-popup',
                content: 'custom-swal-content',
            },
            timer: 1500
        })

    }

    const deleteDataFromls = (adharNumber) => {
        const data = getDataFromLs()

        const updateData = data.filter((ele) => ele["Aadhar Number"] !== adharNumber)
        localStorage.setItem("person-data", JSON.stringify(updateData))
        setLsPersonData(updateData)
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Information Deleted!',
            showConfirmButton: false,
            customClass: {

                popup: 'custom-swal-popup',
                content: 'custom-swal-content',
            },
            timer: 1500
        })
    }


    const handleDelete = () => {
        setIsAdding(false)
    }
    const handleDataInput = (e, feild) => {
        const updatePersonData = {
            ...personData
        }
        updatePersonData[feild] = e.target.value

        if (feild === "dateOfBirth") {
            const age = getAgeFromDOB(e.target.value)
            console.log(age);
            updatePersonData.age = age
        }

        setPersonData(updatePersonData)
        // console.log(updatePersonData)
        // console.log(personData)
    }
    return (
        <>
            <h2>Add New Person</h2>
            <div className="table-wrapper">

                <table >
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Date of Birth</th>
                            <th>Aadhar Number</th>
                            <th>Mobile Number </th>
                            <th>Age</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {lsPersonData.map((ele) => {
                            return <>
                                <tr>
                                    <td> {ele.Name}</td>
                                    <td>{ele["Date of Birth"]}</td>
                                    <td> {ele["Aadhar Number"]} </td>
                                    <td> {ele["Mobile Number"]}</td>
                                    <td>{ele.Age}</td>

                                    <td className='action'>
                                        <button>
                                            <svg xmlns="http://www.w3.org/2000/svg"
                                                class="icon icon-tabler icon-tabler-trash" width="35" height="35"
                                                viewBox="0 0 24 24" stroke-width="1" stroke="red" fill="none"
                                                stroke-linecap="round" stroke-linejoin="round"
                                                onClick={() => deleteDataFromls(ele["Aadhar Number"])}>
                                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                                <path d="M4 7l16 0" />
                                                <path d="M10 11l0 6" />
                                                <path d="M14 11l0 6" />
                                                <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                                                <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                                            </svg></button>
                                    </td>
                                </tr>
                            </>
                        })}
                        {isAdding &&
                            <tr>
                                <td>
                                    <input type="text"
                                        value={personData.name}
                                        name='name'
                                        onChange={(e) => handleDataInput(e, "name")} />
                                    {invalidField.includes("name") &&
                                        <div className='validation'>Please Enter Name</div>}

                                </td>
                                <td>
                                    <input type="date"
                                        value={personData.dateOfBirth}
                                        name='dateOfBirth'
                                        onChange={(e) => handleDataInput(e, "dateOfBirth")} />
                                    {invalidField.includes("dateOfBirth") &&
                                        <div className='validation'>Please enter DOB</div>}
                                </td>
                                <td>
                                    <input type="text" maxLength={12}
                                        value={personData.adharNumber}
                                        name='adharNumber'
                                        onChange={(e) => handleDataInput(e, "adharNumber")} />
                                    {invalidField.includes("adharNumber") &&
                                        <div className='validation'>Please Enter Adhar No.</div>}
                                </td>
                                <td>
                                    <input type="text" maxLength={10}
                                        value={personData.mobileNumber}
                                        name='mobileNumber'
                                        onChange={(e) => handleDataInput(e, "mobileNumber")} />
                                    {invalidField.includes("mobileNumber") &&
                                        <div className='validation'>Please Enter Mobile No.</div>}
                                </td>
                                <td>{personData.age ? personData.age : 0}</td>

                                <td className='action'>
                                    <button><svg xmlns="http://www.w3.org/2000/svg"
                                        class="icon icon-tabler icon-tabler-device-floppy"
                                        width="35" height="35" viewBox="0 0 24 24"
                                        stroke-width="1.5" stroke="orange" fill="none" stroke-linecap="round" stroke-linejoin="round"
                                        onClick={handleSave}>
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                        <path d="M6 4h10l4 4v10a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2" />
                                        <path d="M12 14m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                                        <path d="M14 4l0 4l-6 0l0 -4" />
                                    </svg></button>
                                    <button>
                                        <svg xmlns="http://www.w3.org/2000/svg"
                                            class="icon icon-tabler icon-tabler-trash" width="35" height="35"
                                            viewBox="0 0 24 24" stroke-width="1" stroke="red" fill="none"
                                            stroke-linecap="round" stroke-linejoin="round"
                                            onClick={handleDelete}>
                                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                            <path d="M4 7l16 0" />
                                            <path d="M10 11l0 6" />
                                            <path d="M14 11l0 6" />
                                            <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                                            <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                                        </svg></button>
                                </td>
                            </tr>
                        }



                    </tbody>
                </table>
            </div>
            <div className="add-btn-wrapper">

                <button className='button' onClick={() => setIsAdding(true)} disabled={isAdding}>Add new person</button>
            </div>
        </>
    )
}

export default Add