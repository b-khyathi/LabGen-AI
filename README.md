# 🧪 LabGen AI

**LabGen AI** is an AI-powered laboratory learning assistant that helps university students generate structured lab manuals, organize study notes, interact with an AI academic assistant, and manage laboratory resources—all from a single platform.

Built using **IBM watsonx.ai**, **IBM BOB** and the **Meta Llama 3.3 70B Instruct** foundation model, LabGen AI simplifies laboratory preparation and enhances the learning experience through AI-powered content generation and assistance.

---

## 🚀 Features

### 📘 AI Lab Manual Generator
Generate complete laboratory manuals by providing:
- Course
- Subject
- Experiment Name
- Difficulty Level
- Equipment (optional)

Each generated manual includes:
- Title
- Objective
- Theory
- Apparatus Required
- Software Required
- Procedure

---

### 🤖 AI Academic Assistant

Ask questions related to:
- Programming
- Database Management Systems (DBMS)
- Operating Systems
- Computer Networks
- Laboratory Experiments
- Viva Questions
- General Academic Concepts

The chatbot maintains recent conversation context for more meaningful responses.

---

### 📝 Smart Notes

Create and manage notes using a rich text editor.

AI-powered features include:
- Rewrite Notes
- Summarize Notes

Notes are automatically stored in MongoDB.

---

### 📚 Manual History

- Save generated laboratory manuals
- View previous manuals
- Delete manuals
- Reopen any saved manual for review

---

### 📂 Resource Manager (not yet implemented)

Upload and organize study resources including:
- PDF files
- Word documents
- Presentations
- Other study materials

---

### 📊 Dashboard

View:
- Total Manuals Generated
- AI Conversations
- Notes Created
- Resources Uploaded
- Recent Manual Activity

---

## 🛠️ Technology Stack

### Frontend
- React.js
- Vite
- Tailwind CSS
- React Router
- Axios
- React Markdown
- Quill Rich Text Editor
- Lucide React Icons
- sonner Toaster

### Backend
- Flask
- Python

### Database
- MongoDB Atlas

### AI
- IBM watsonx.ai
- IBM Bob
- Meta Llama 3.3 70B Instruct Foundation Model

Model Used:

```
meta-llama/llama-3-3-70b-instruct
```

### IBM Technologies
- IBM Cloud
- IBM watsonx.ai
- IBM watsonx.ai Python SDK

---

## 📂 Project Structure

```
LabGenAI
│
├── frontend
│   ├── src
│   │   ├── app
│   │   ├── components
│   │   ├── layouts
│   │   ├── pages
│   │   ├── services
│   │   └── assets
│   └── package.json
│
├── backend
│   ├── config
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── services
│   ├── app.py
│   └── requirements.txt
│
└── README.md
```

---

## ⚡ Installation

### 1. Clone the repository

```bash
git clone https://github.com/b-khyathi/LabGenAI.git

cd LabGenAI
```

---

### 2. Backend Setup

```bash
cd backend
```

Create a virtual environment

```bash
python -m venv venv
```

Activate the environment

Windows

```bash
venv\Scripts\activate
```

Install dependencies

```bash
pip install -r requirements.txt
```

Create a `.env` file

```env
IBM_API_KEY=YOUR_API_KEY
PROJECT_ID=YOUR_PROJECT_ID
IBM_URL=https://au-syd.ml.cloud.ibm.com

MONGO_URI=YOUR_MONGODB_URI
DATABASE_NAME=LabGenAI
```

Run the backend

```bash
python app.py
```

---

### 3. Frontend Setup

```bash
cd frontend
```

Install dependencies

```bash
npm install
```

Run the frontend

```bash
npm run dev
```

---

## 📡 API Endpoints

### AI

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/generate` | Generate Lab Manual |
| POST | `/chat` | AI Chat |
| POST | `/improve` | Rewrite Notes |
| POST | `/summarize` | Summarize Notes |

---

### Manuals

| Method | Endpoint |
|---------|----------|
| GET | `/manuals` |
| POST | `/manuals` |
| GET | `/manuals/<id>` |
| DELETE | `/manuals/<id>` |

---

### Notes

| Method | Endpoint |
|---------|----------|
| GET | `/notes` |
| POST | `/notes` |
| PUT | `/notes/<id>` |
| DELETE | `/notes/<id>` |

---

### Resources

| Method | Endpoint |
|---------|----------|
| GET | `/resources` |
| POST | `/resources` |
| DELETE | `/resources/<id>` |

---

## 💡 Future Enhancements

- AI-powered PDF analysis
- Resource question answering
- Voice-enabled AI assistant
- Export manuals as PDF/DOCX
- Institution-specific laboratory templates
- Multi-language support
- Personalized learning recommendations

---

## 🎯 Problem Statement

Students often spend considerable time preparing laboratory manuals, organizing notes, and searching for study materials across multiple platforms. Existing solutions typically address only one aspect of the laboratory learning process.

LabGen AI integrates AI-powered manual generation, academic assistance, note management, and resource organization into a single platform, improving productivity and enhancing laboratory learning.

---

## 📸 Screenshots

<img width="1865" height="857" alt="image" src="https://github.com/user-attachments/assets/837a42ce-8748-4663-ac5e-c7a13c156851" />

<img width="1844" height="848" alt="image" src="https://github.com/user-attachments/assets/49485e78-acab-4ffc-b40e-2e51ce7104c1" />

<img width="1946" height="880" alt="image" src="https://github.com/user-attachments/assets/c6437046-9e67-4a81-86f8-9dee293853b6" />

<img width="1952" height="885" alt="image" src="https://github.com/user-attachments/assets/b411a490-d0bb-4149-8169-e110e2cc4332" />

<img width="1952" height="877" alt="image" src="https://github.com/user-attachments/assets/1bbb35ff-5648-45ca-93b5-4917ae1962a8" />

<img width="1976" height="893" alt="image" src="https://github.com/user-attachments/assets/c9ce1fb8-9bbb-4b12-aa88-787ece322bd9" />

<img width="1976" height="893" alt="image" src="https://github.com/user-attachments/assets/c4dde03a-32ef-4131-8783-0b90570e1340" />








---

## 👨‍💻 Developed By

**Biruduganti Khyathi**

AI-Powered Laboratory Learning Assistant

Built using **IBM watsonx.ai** , **IBM BOB** and **Meta Llama 3.3 70B Instruct** Foundation Model.

---

## 📄 License

This project is developed for educational and demonstration purposes.
