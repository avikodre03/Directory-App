import logo from './logo.svg';
import './App.css';
import Header from './Components/Haeder/Header';
import { useState } from 'react';
import Add from './Components/Add/Add';
import Retrieve from './Components/Retrieve/Retrieve';
import Tabs from './Components/Tabs/Tabs';
const TABS = {
  Add: "Add",
  Retrieve: "Retrieve"
}
function App() {
  const [currentTab, setCurrentTab] = useState(TABS.Add)
  const [active, setActive] = useState("Add")

  const changeTab = (value) => {
    setCurrentTab(value)
    setActive(value)
  }
  
  return (
    <div className="App">
      <Header />
      <Tabs changeTab={changeTab} active={active} />
      <div className='wrapper-tabs'>

        {currentTab === TABS.Add ? <Add /> : <Retrieve />}
      </div>
    </div>
  );
}

export default App;
