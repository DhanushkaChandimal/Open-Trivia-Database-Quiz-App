import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import FloatingLabel from 'react-bootstrap/FloatingLabel';

const HomePage = () => {
    const [formData, setFormData] = useState({
        name: '',
        category: '',
        difficulty: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };
    
    return (
        <Container className="d-flex vh-100 justify-content-center align-items-center bg-light">
            <Card className="shadow p-4 w-100" style={{ maxWidth: '600px' }}>
                <Card.Body>
                    <Card.Title as="h1" className="text-center mb-3">Welcome to QuizApp!</Card.Title>
                    <Card.Text className="text-muted text-center mb-4">🎯 Get ready to test your knowledge!<br />Just fill out the details below to get started.</Card.Text>

                    <Alert variant="danger">Error Message</Alert>

                    <Form noValidate validated>
                        <Form.Group className="mb-3" controlId="formName">
                            <FloatingLabel controlId="floatingName" label="First Name" className="mb-3">
                                <Form.Control
                                    type="text"
                                    placeholder="First Name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />

                                <Form.Control.Feedback type="invalid">
                                    Please provide a Name
                                </Form.Control.Feedback>
                            </FloatingLabel>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formCategory">
                            <Form.Label>Question Category</Form.Label>
                            <Form.Select
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                required
                            >
                                <option hidden value="">Select a category...</option>
                                <option>General Knowledge</option>
                                <option>Sports</option>
                                <option>History</option>
                                <option>Science & Nature</option>
                            </Form.Select>

                            <Form.Control.Feedback type="invalid">
                                Please select a question category
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-4" controlId="formDifficulty">
                            <Form.Label>Difficulty</Form.Label>
                            <Form.Select
                                name="difficulty"
                                value={formData.difficulty}
                                onChange={handleChange}
                                required
                            >
                                <option hidden value="">Select a difficulty level</option>
                                <option>Easy</option>
                                <option>Medium</option>
                                <option>Hard</option>
                            </Form.Select>

                            <Form.Control.Feedback type="invalid">
                                Please select a difficulty level
                            </Form.Control.Feedback>
                        </Form.Group>

                        <div className="d-grid">
                            <Button type="submit" variant="primary" size="lg">Start Quiz</Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
}

export default HomePage;