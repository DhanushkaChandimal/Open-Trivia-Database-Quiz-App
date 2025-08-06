import { Routes, Route } from "react-router-dom"
import { useState } from 'react';
import HomePage from "./components/HomePage"
import QuestionForm from "./components/QuestionForm"

function App() {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    difficulty: ''
  });

  const updateFormData = (name, cat, diff) => setFormData({
    name: name,
    category: cat,
    difficulty: diff
  });

  return (
    <>
      <Routes>
        <Route path = "/" element = {<HomePage formData={formData} setFormData={setFormData}/>}/>
        <Route path = "/questions" element = {<QuestionForm formData={formData} updateFormData={updateFormData}/>}/>
      </Routes>
    </>
  )
}

export default App
