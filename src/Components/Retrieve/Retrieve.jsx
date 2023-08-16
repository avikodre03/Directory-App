import React, { useState } from 'react'
import './Retrieve.css'
import { getDataFromLs } from '../../Utils/helper'
const Retrieve = () => {
  const [inputValue, setInputValue] = useState("")
  const [personData, setPersonData] = useState([])
  const [inputAlert, setinputAlert] = useState(false)
  const [nodata, setNoData] = useState(false)


  const handleFindUser = () => {
    const data = getDataFromLs()
    if (inputValue === "") {
      setinputAlert(true)
    } else {

      const updateData = data.filter((ele) => ele["Aadhar Number"] === inputValue)
      setPersonData(updateData)
      setInputValue("")
      setinputAlert(false)
      setNoData(true)
    }
  }

  return (
    <div>
      <h2>Retrieve Information</h2>
      <div className="find-wrapper">

        <input type="text" placeholder='Enter Adhar Number' maxLength={12}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />

        <button className="button" onClick={handleFindUser}>Find</button>
      </div>
      {inputAlert && <div className="alert">
        <p>Please enter adhar No !!!</p>
      </div>}
      {nodata ?
        (personData.length > 0 ? personData.map((ele) => {
          return <>
            <div className="user-Card">
              <div className="user-Card-left">

                <p>Name : </p>
                <p>DOB : </p>
                <p>Adhar NO : </p>
                <p>Mobile NO : </p>
                <p>Age : </p>
              </div>
              <div className="user-Card-right">
                <span>{ele.Name}</span>
                <span>{ele["Date of Birth"]}</span>
                <span>{ele["Aadhar Number"]}</span>
                <span>{ele["Mobile Number"]}</span>
                <span>{ele.Age}</span>
              </div>
            </div>
          </>
        }) : <div className='data-found'>
          <h1>No Data Found</h1>
          <img src="data:image/jpeg;base64,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" alt="img data not found" /></div >)
        : <div className='data-found'>
          <h1>No Data</h1></div >
      }
    </div>
  )
}

export default Retrieve