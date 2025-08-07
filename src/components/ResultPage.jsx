import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const ResultPage = ({ questions, formData, setQuestions }) => {
    const [isExpand, setIsExpand] = useState(false);
    const navigate = useNavigate();

    const getMessage = (correct, total) => {

        let percentage = correct / total * 100;

        if (percentage >= 90) {
            return "🏆 Amazing! You're a quiz master!";
        } else if (percentage >= 70) {
            return "🎉 Great job! You really know your stuff!";
        } else if (percentage >= 40) {
            return "👍 Not bad! Keep practicing.";
        } else {
            return "😅 It’s okay! Try again and do better next time!";
        }
    };

    const btnTryAgainOnClick = () => {
        setQuestions([]);
        navigate("/questions");
    };
    
    useEffect(() => {
        console.log(questions);
    }, [questions]);

    return (
        <Container className="py-5 bg-light d-flex justify-content-center">
            <Card className="text-center shadow p-4 w-100" style={{ maxWidth: '600px'}}>
                <Card.Body>
                    <Card.Title as="h2" className="mb-3">🎉 {formData.name}, here is your result</Card.Title>
                    <Card.Text className="fs-4 mb-4">
                        You scored <strong>{questions.filter(q => q.is_correct === true).length}</strong> out of <strong>{questions.length}</strong>
                    </Card.Text>
                    <Card.Text className="fs-5 text-muted mb-4">{getMessage(questions.filter(q => q.is_correct === true).length, questions.length)}</Card.Text>
                    {!isExpand && (<Card.Text className="fs-5 mb-4">
                        {questions.map(q => (
                            <span className='d-inline-block me-2' key={q.question_number}>
                                {q.question_number}: {q.is_correct ? '✅' : '❌'} |
                            </span>
                        ))}
                    </Card.Text>)}

                    {isExpand && (<div className="fs-5 mb-4 text-start"> 
                        <ol>
                            {questions.map((q, index) => {
                                return (
                                <li key={index} className="mb-3">
                                    <div dangerouslySetInnerHTML={{ __html: q.question }} />
                                    {q.selected_answer === q.correct_answer ? (
                                    <div className="text-success mt-1">
                                        ✅ Your answer is correct: <strong>{q.selected_answer}</strong>
                                    </div>
                                    ) : (
                                    <div className="text-danger mt-1">
                                        ❌ Your answer: <strong>{q.selected_answer}</strong><br />
                                        ✅ Correct answer: <strong>{q.correct_answer}</strong>
                                    </div>
                                    )}
                                </li>
                                );
                            })}
                        </ol>
                    </div>)}

                    <Button variant="primary" size="lg" onClick={() => setIsExpand(!isExpand)}>{!isExpand ? "Show More" : "Show Less"}</Button>
                    <Button variant="primary" size="lg" className='mx-3' onClick={btnTryAgainOnClick}>🔁 Try Again</Button>
                    <Button variant="primary" size="lg" href='/'>Home</Button>
                </Card.Body>
            </Card>
        </Container>
    );
}

export default ResultPage;