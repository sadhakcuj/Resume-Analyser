// routes/resume.js
import express from 'express';
import multer from 'multer';
import { auth } from '../middleware/auth.js';
import Resume from '../models/Resume.js';
import fs from 'fs';
import path from 'path';

const router = express.Router();

// Configure multer for file upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

// Upload resume (protected route)
router.post('/resume-upload', auth, upload.single('resume'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        // Read and analyze the file
        const fileContent = fs.readFileSync(path.join('uploads', req.file.filename), 'utf8');
        const analysisResults = analyzeResume(fileContent);

        // Create new resume document
        const resume = new Resume({
            userId: req.user.userId,
            filename: req.file.filename,
            originalname: req.file.originalname,
            mimetype: req.file.mimetype,
            size: req.file.size,
            analysisResults
        });

        await resume.save();

        res.json({
            message: 'Resume uploaded successfully!',
            resume: {
                id: resume._id,
                filename: resume.filename,
                originalname: resume.originalname,
                uploadDate: resume.uploadDate
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Upload failed' });
    }
});

// Get user's resumes (protected route)
router.get('/resumes', auth, async (req, res) => {
    try {
        const resumes = await Resume.find({ userId: req.user.userId })
            .sort({ uploadDate: -1 });
        res.json(resumes);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch resumes' });
    }
});

// Get specific resume's analysis results (protected route)
router.get('/resumes/:id/analysis', auth, async (req, res) => {
    try {
        const resume = await Resume.findOne({ 
            _id: req.params.id,
            userId: req.user.userId 
        });
        
        if (!resume) {
            return res.status(404).json({ error: 'Resume not found' });
        }

        res.json(resume.analysisResults);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch analysis results' });
    }
});

// Helper function to analyze resume
function analyzeResume(text) {
    // Common keywords for different sections
    const keywords = {
        skills: ['skills', 'technical', 'proficient', 'expertise', 'abilities', 'competencies'],
        experience: ['experience', 'work history', 'employment', 'career', 'professional'],
        education: ['education', 'degree', 'university', 'college', 'school', 'graduated'],
        achievements: ['achievements', 'accomplishments', 'awards', 'certifications', 'projects']
    };

    let score = 0;
    const issues = [];
    const strengths = [];
    const questions = [];

    // Check for section presence
    Object.entries(keywords).forEach(([section, words]) => {
        const hasSection = words.some(word => text.toLowerCase().includes(word));
        if (hasSection) {
            score += 20;
            strengths.push({
                title: `Strong ${section} section`,
                description: `Your resume includes a well-defined ${section} section.`
            });
        } else {
            issues.push({
                title: `Missing ${section} section`,
                description: `Your resume appears to be missing a dedicated ${section} section.`,
                suggestion: `Add a clear ${section} section to improve your ATS score.`
            });
        }
    });

    // Check for formatting and other criteria
    const hasBulletPoints = text.includes('•') || text.includes('-') || text.includes('*');
    if (hasBulletPoints) {
        score += 10;
        strengths.push({
            title: 'Good formatting',
            description: 'Your resume uses bullet points effectively for better readability.'
        });
    }

    // Generate potential interview questions
    if (text.toLowerCase().includes('project')) {
        questions.push('Can you tell me about a challenging project you worked on?');
    }
    if (text.toLowerCase().includes('team')) {
        questions.push('How do you work in a team environment?');
    }
    if (text.toLowerCase().includes('lead')) {
        questions.push('Can you describe your leadership style?');
    }

    return {
        atsScore: Math.min(score, 100),
        issues,
        strengths,
        questions
    };
}

export default router;
