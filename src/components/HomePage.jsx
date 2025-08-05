import { useState, useEffect } from 'react';
import axios from 'axios';
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
    const [difficulties, setDifficulties] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        axios.get('https://opentdb.com/api_category.php')
        .then(response => {
            // console.log(response);
            // console.log(response.data);
            // console.log(response.data.trivia_categories);
            // console.log(response.data.trivia_categories[0]);
            setDifficulties(response.data.trivia_categories);
        })
        .catch(error => {
            setError("Error fetching form data. Please contact an admin. " + error)
        });
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const categories = [
        { value: '1', label: 'General Knowledge' },
        { value: '2', label: 'Sports' },
        { value: '3', label: 'History' },
        { value: '4', label: 'Science & Nature' }
    ];
    
    return (
        <Container className="d-flex vh-100 justify-content-center align-items-center bg-light">
            <Card className="shadow p-4 w-100" style={{ maxWidth: '600px' }}>
                <Card.Body>
                    <Card.Title as="h1" className="text-center mb-3">Welcome to QuizApp!</Card.Title>
                    <Card.Text className="text-muted text-center mb-4">🎯 Get ready to test your knowledge!<br />Just fill out the details below to get started.</Card.Text>

                    {error && <Alert variant="danger">{error}</Alert>}

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
                                <option hidden value="">Select a category</option>
                                {categories.map((cat) => (
                                    <option key={cat.value} value={cat.value}>{cat.label}</option>
                                ))}
                                
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
                                {difficulties.map((level) => (
                                    <option key={level.id} value={level.id}>{level.name}</option>
                                ))}
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