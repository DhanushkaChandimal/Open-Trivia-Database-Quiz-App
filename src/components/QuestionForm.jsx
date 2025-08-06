import { useState, useEffect } from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

const QuestionForm = ({ formData }) => {
    const [questions, setQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        // console.log(formData.category);
        // console.log(formData.difficulty);
        if(!formData.category || !formData.difficulty || questions.length > 0) return;
        // console.log("Passed if");
        axios.get(`https://opentdb.com/api.php?amount=10&category=${formData.category}&difficulty=${formData.difficulty}&type=multiple`)
        .then(response => {
            // console.log(response);
            // console.log(response.data);
            // console.log(response.data.results);
            setQuestions(response.data.results.map((question, index) => {
                return {
                    ...question,
                    all_answers: [...question.incorrect_answers, question.correct_answer],
                    question_number: index + 1
                };
            }));
            setError("");
        })
        .catch(error => {
            setError("Error fetching questions. Please try again later. " + error.message);
        });
    }, [formData.category, formData.difficulty]);

    useEffect(() => {
        setCurrentQuestion(questions[0]);
        console.log(questions);
    }, [questions]);

    return (
        <Container className="d-flex vh-100 justify-content-center align-items-center bg-light">
            <Card className="shadow p-4 w-100" style={{ maxWidth: '600px' }}>
            {/* <Card className="shadow p-4 mb-4"> */}
                <Card.Body>
                    <Card.Title as="h4" className="mb-3">
                        Question {currentQuestion?.question_number} : Category: {formData.category} | Difficulty: {formData.difficulty}
                    </Card.Title>
                    <Card.Text className="mb-4" dangerouslySetInnerHTML={{ __html: currentQuestion?.question }} />

                    <Form>
                        {currentQuestion?.all_answers?.map((answer, idx) => (
                            <Form.Check
                                key={idx}
                                type="radio"
                                id={`answer-${idx}`}
                                label={answer}
                                name="quiz-answer"
                                value={answer}
                                className="mb-2"
                            />
                        ))}

                        <div className="d-grid mt-3">
                            <Button type="submit" variant="primary">Submit Answer</Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
}

export default QuestionForm;