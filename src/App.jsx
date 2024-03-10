import React from 'react'
import Board from './component/Board'
import CardDetailsPage from "./component/CardDetailsPage"
import {Routes,Route} from "react-router-dom"

const App = () => {
  return (
    <div>
      {/* <Board /> */}

      <Routes>
        
          <Route path="/" element={<Board/>} />
          <Route path="/details/:status/:index" element={<CardDetailsPage />} />
       
      </Routes>
    </div>
  )
}

export default App
