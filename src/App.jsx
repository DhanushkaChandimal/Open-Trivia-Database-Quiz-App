import { Routes, Route } from "react-router-dom"
import { useState } from 'react';
import HomePage from "./components/HomePage"
import QuestionForm from "./components/QuestionForm"
import ResultPage from "./components/ResultPage"

function App() {
  // Need to use session storage for avoid errors while site refresh.
  // <But there should be at least two separate components that pass props with the sections> Developed according to assignment requirement
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    difficulty: ''
  });
  const [questions, setQuestions] = useState([]);

  return (
    <>
      <Routes>
        <Route path = "/" element = {<HomePage formData={formData} setFormData={setFormData}/>}/>
        <Route path = "/questions" element = {<QuestionForm formData={formData} questions={questions} setQuestions={setQuestions}/>}/>
        <Route path = "/results" element = {<ResultPage questions={questions} formData={formData} setQuestions={setQuestions}/>}/>
      </Routes>
    </>
  )
}

export default App
