# 🧠 React Quiz App

A responsive and user-friendly quiz application built with **React** and **React Bootstrap**. The app fetches trivia questions from an API and allows users to test their knowledge across various categories and difficulty levels.

---

## 🚀 Features

* 🎯 Select quiz category and difficulty
* ✍️ Enter your name to personalize results
* 📦 Fetches questions dynamically from an external API
* ✅ Interactive multiple-choice questions
* 🔄 Navigate through questions one by one
* 🯞 Real-time score calculation
* 📊 Result summary with detailed feedback
* ❌ Error handling for failed API requests
* 📱 Fully responsive design using React Bootstrap

---

## 📁 Project Structure

```
react-quiz-app/
├── public/
├── src/
│   ├── components/
│   │   ├── HomePage.jsx
│   │   ├── QuestionForm.jsx
│   │   └── ResultPage.jsx
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── package.json
└── README.md
```

---

## 🛠️ Tech Stack

* [React](https://reactjs.org/)
* [React Bootstrap](https://react-bootstrap.github.io/)
* [Bootstrap 5](https://getbootstrap.com/)
* [Open Trivia DB API](https://opentdb.com/api_config.php)

---

## 🧪 Getting Started

### Prerequisites

* Node.js & npm installed
* Basic knowledge of React

### Installation

```bash
git clone https://github.com/DhanushkaChandimal/Open-Trivia-Database-Quiz-App.git
cd Open-Trivia-Database-Quiz-App
npm install
```

### Running the App

```bash
npm start
```

The app will open at `http://localhost:<number>` in your browser.

---

## 📊 API Reference

The app uses the [Open Trivia Database API](https://opentdb.com/) to fetch quiz questions. Supported parameters include:

* `amount`: number of questions
* `category`: category ID
* `difficulty`: `easy`, `medium`, `hard`
* `type`: `multiple`

---

## 🙌 Acknowledgements

* [Open Trivia DB](https://opentdb.com/)
* [React Bootstrap](https://react-bootstrap.github.io/)
* [Bootstrap Icons](https://icons.getbootstrap.com/)

---

## 👤 Author

**Dhanushka Chandimal**
