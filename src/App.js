import { useState, useEffect } from 'react'
import './App.css'
import Home from './components/Home'
import Sidebar from './components/Sidebar'
import Header from './components/Header'

// Assuming the data is fetched from a file or an API endpoint


function App() {

  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  return (
    <div className='grid-container'>
      <Header OpenSidebar={OpenSidebar}/>
      <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
      <Home />
    </div>
  );
}

export default App;
