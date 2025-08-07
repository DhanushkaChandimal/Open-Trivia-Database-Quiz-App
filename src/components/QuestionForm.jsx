import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Alert from 'react-bootstrap/Alert';

const QuestionForm = ({ formData, questions, setQuestions }) => {
    const [currentQuestion, setCurrentQuestion] = useState([]);
    const [selectedAnswer, setSelectedAnswer] = useState();
    const [allSelectedAnswers, setAllSelectedAnswers] = useState([]);
    const [validated, setValidated] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const NUMBER_OF_QUESTIONS = 10;

    const shuffleArray = (arr) => [...arr].sort(() => Math.random() - 0.5);

    useEffect(() => {
        // console.log(formData.category);
        // console.log(formData.difficulty);
        if(!formData.category || !formData.difficulty || questions.length > 0) return;
        // console.log("Passed if");
        axios.get(`https://opentdb.com/api.php?amount=${NUMBER_OF_QUESTIONS}&category=${formData.category}&difficulty=${formData.difficulty}&type=multiple`)
        .then(response => {
            // console.log(response);
            // console.log(response.data);
            // console.log(response.data.results);
            setQuestions(response.data.results.map((question, index) => {
                return {
                    ...question,
                    all_answers: shuffleArray([...question.incorrect_answers, question.correct_answer]),
                    question_number: index + 1
                };
            }));
            setError("");
        })
        .catch(error => {
            setError("Error fetching questions. Please try again later. " + error.message);
            console.log(error.message);
        });
    }, [formData.category, formData.difficulty, questions.length, setQuestions]);

    useEffect(() => {
        setCurrentQuestion(questions[0]);
        // console.log(questions);
    }, [questions]);

    const handleSubmit = (e) => {
        setValidated(true);
        e.preventDefault();

        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.stopPropagation();
        } else {
            setAllSelectedAnswers([...allSelectedAnswers, selectedAnswer]);
            setValidated(false);
            setSelectedAnswer(null);
            setError("");
            if(currentQuestion.question_number >= NUMBER_OF_QUESTIONS){
                setQuestions(questions.map((question) => {
                    return {
                        ...question,
                        selected_answer: allSelectedAnswers[question.question_number-1],
                        is_correct: allSelectedAnswers[question.question_number-1] === question.correct_answer
                    };
                }));
                navigate('/results');
            }
            setCurrentQuestion(questions[currentQuestion?.question_number]);
        }
    };

    if (error){
        return (
            <Container className="d-flex vh-100 justify-content-center align-items-center bg-light">
                <Card className="shadow p-4 w-100" style={{ maxWidth: '600px' }}>
                    <Card.Body>
                        <Card.Title as="h2" className="text-danger mb-3">⚠️ Error</Card.Title>
                        <Card.Text className="mb-4">
                            {error}
                        </Card.Text>

                        <Button variant="primary" href="/">Home Page</Button>
                    </Card.Body>
                </Card>
            </Container>
        );
    }

    return (
        <Container className="d-flex vh-100 justify-content-center align-items-center bg-light">
            <Card className="shadow p-4 w-100" style={{ maxWidth: '600px' }}>
                <Card.Body>
                    
                    <Card.Title as="h4" className="mb-3">
                        Question {currentQuestion?.question_number} : Category: {formData.category} | Difficulty: {formData.difficulty}
                    </Card.Title>
                    <Card.Text className="mb-4" dangerouslySetInnerHTML={{ __html: currentQuestion?.question }} />

                    {error && <Alert variant="warning">{error}</Alert>}

                    <Form onSubmit={handleSubmit} noValidate validated={validated}>
                        {currentQuestion?.all_answers?.map((answer, idx) => (
                            <Form.Check
                                key={idx}
                                type="radio"
                                id={`answer-${idx}`}
                                label={answer}
                                name="quiz-answer"
                                value={answer}
                                className="mb-2"
                                checked={selectedAnswer === answer}
                                onChange={(e) => setSelectedAnswer(e.target.value)}
                                required
                            />
                        ))}

                        {validated && !selectedAnswer && (
                            <Form.Control.Feedback type="invalid" className="d-block">
                                Please select an answer
                            </Form.Control.Feedback>
                        )}

                        <div className="d-grid mt-3">
                            <Button type="submit" variant="primary">{currentQuestion?.question_number < NUMBER_OF_QUESTIONS || !selectedAnswer ? "Submit Answer" : "Check Results"}</Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
}

export default QuestionForm;