import { useState, useEffect } from 'react';
import axios from 'axios';

const QuestionForm = ({formData}) => {
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        console.log(formData.category);
        console.log(formData.difficulty);
        axios.get(`https://opentdb.com/api.php?amount=10&category=${formData.category}&difficulty=${formData.difficulty}&type=multiple`)
        .then(response => {
            // console.log(response);
            // console.log(response.data);
            // console.log(response.data.results);
            setQuestions(response.data.results);
            
            console.log(questions);
        })
        .catch(error => {
            console.log("Error fetching form data. Please contact an admin. " + error)
        });
    }, []);

    return (
        <h1>Question Form</h1>
    );
}

export default QuestionForm;