# Resume Analyzer

A web application that analyzes resumes using AI to provide ATS scores, identify areas for improvement, highlight strengths, and generate potential interview questions.

## Features

- Resume upload and analysis
- ATS score calculation
- Identification of resume issues with actionable suggestions
- Highlighting of resume strengths
- Generation of potential interview questions based on resume content
- Authentication system to protect user data

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd project
```

2. Install backend dependencies:
```bash
npm install
```

3. Install frontend dependencies:
```bash
cd src
npm install
```

## Running the Application

### Development Mode

1. Start the backend server:
```bash
cd project
npm run dev
```

2. Start the frontend development server:
```bash
cd project/src
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

### Production Mode

1. Build the frontend:
```bash
cd project/src
npm run build
```

2. Start the production server:
```bash
cd project
npm start
```

## API Endpoints

- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `POST /api/resume-upload` - Upload and analyze resume (requires authentication)

## Authentication

The application uses a token-based authentication system. To access protected routes like the Analytics page, users must be logged in.

## Technologies Used

- **Frontend**: React, React Router, Tailwind CSS
- **Backend**: Express.js, Node.js
- **AI Analysis**: Google Gemini API
- **File Processing**: Multer, pdf-parse

## How It Works

1. User uploads a resume (PDF, DOC, or DOCX format)
2. The server extracts text from the resume
3. The text is sent to the Gemini API for analysis
4. The API returns a structured analysis including:
   - ATS score
   - Areas for improvement
   - Resume strengths
   - Potential interview questions
5. The results are displayed to the user in a user-friendly format

## License

MIT 