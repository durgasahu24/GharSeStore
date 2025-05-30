import React from 'react'
import CustomRouters from './Customer/Components/Router/CustomerRouter'
import { Route, Routes } from 'react-router-dom'
import AdminRouter from './Customer/Components/Router/AdminRouter'


function App() {
  return (
    <div>
      <Routes>
        <Route path='/*' element={<CustomRouters />} ></Route>
        <Route path='/admin/*' element={<AdminRouter />} ></Route>
      </Routes>
    </div>
  )
}



export default App
