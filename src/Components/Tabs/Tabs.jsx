
import './Tabs.css'
const TABS={
    Add:"Add",
    Retrieve:"Retrieve"
  }

const Tabs = ({changeTab,active}) => {
  

  return (
    <div className='wrapper-buttons'>
        <button 
         className={`button ${active === "Add" ? "buttonActive" : null}`} onClick={()=>changeTab(TABS.Add)}>Add New Person</button>
        <button
        className={`button ${active === "Retrieve" ? "buttonActive" : null}`}onClick={()=>changeTab(TABS.Retrieve)}>Retrieve Information</button>
    </div>
  )
}

export default Tabs