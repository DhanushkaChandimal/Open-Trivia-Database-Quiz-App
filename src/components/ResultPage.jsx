import { useEffect } from 'react';
import { Card, Button, Container } from 'react-bootstrap';

const ResultPage = ({ questions, formData }) => {
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
    
    useEffect(() => {
        console.log(questions);
    }, [questions]);

    return (
        <Container className="d-flex vh-100 justify-content-center align-items-center bg-light">
            <Card className="text-center shadow p-4 w-100" style={{ maxWidth: '600px'}}>
                <Card.Body>
                    <Card.Title as="h2" className="mb-3">🎉 {formData.name}, here is your result</Card.Title>
                    <Card.Text className="fs-4 mb-4">
                        You scored <strong>{questions.filter(q => q.is_correct === true).length}</strong> out of <strong>{questions.length}</strong>
                    </Card.Text>
                    <Card.Text className="fs-5 text-muted mb-1">{getMessage(questions.filter(q => q.is_correct === true).length, questions.length)}</Card.Text>
                    <Card.Text className="fs-5 mb-4">
                        {questions.map(q => (
                            <span key={q.question_number} style={{display: 'inline-block', marginRight: 8}}>
                                {q.question_number}: <span>{q.is_correct ? '✅' : '❌'} | </span>
                            </span>
                        ))}
                    </Card.Text>

                    <Button variant="primary" size="lg" className='mx-3'>🔁 Try Again</Button>
                    <Button variant="primary" size="lg" href='/'>Home</Button>
                </Card.Body>
            </Card>
        </Container>
    );
}

export default ResultPage;