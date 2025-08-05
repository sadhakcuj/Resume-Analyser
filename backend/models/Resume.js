import mongoose from 'mongoose';

const resumeSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    filename: {
        type: String,
        required: true
    },
    originalname: {
        type: String,
        required: true
    },
    mimetype: {
        type: String,
        required: true
    },
    size: {
        type: Number,
        required: true
    },
    uploadDate: {
        type: Date,
        default: Date.now
    },
    analysisResults: {
        atsScore: {
            type: Number,
            required: true
        },
        issues: [{
            title: String,
            description: String,
            suggestion: String
        }],
        strengths: [{
            title: String,
            description: String
        }],
        questions: [String],
        analyzedDate: {
            type: Date,
            default: Date.now
        }
    }
});

const Resume = mongoose.model('Resume', resumeSchema);

export default Resume;