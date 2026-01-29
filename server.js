const express = require('express');
const multer = require('multer');
const pdfParse = require('pdf-parse');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Upload configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = path.join(__dirname, 'uploads');
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage });

// Routes

// Serve index page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// PDF Upload and Extract endpoint
app.post('/api/upload-pdf', upload.single('pdf'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        const filePath = req.file.path;
        const fileBuffer = fs.readFileSync(filePath);
        
        // Parse PDF
        const data = await pdfParse(fileBuffer);
        
        // Extract text from PDF
        const extractedText = data.text;
        
        // Simple question extraction - can be enhanced with AI/NLP
        const questions = extractQuestionsFromText(extractedText);

        // Clean up uploaded file
        fs.unlinkSync(filePath);

        res.json({
            success: true,
            questionsCount: questions.length,
            questions: questions,
            fileName: req.file.originalname
        });

    } catch (error) {
        console.error('Error processing PDF:', error);
        res.status(500).json({ 
            error: 'Error processing PDF file',
            details: error.message 
        });
    }
});

// Helper function to extract questions from text
function extractQuestionsFromText(text) {
    const questions = [];
    
    // Simple extraction logic - looks for numbered questions
    // In a real application, you'd use more sophisticated NLP techniques
    const lines = text.split('\n');
    let currentQuestion = '';
    
    lines.forEach(line => {
        // Match patterns like "1.", "Q1.", "Question 1", etc.
        if (/^(Q?uestion\s+)?\d+[\.\):]/.test(line.trim())) {
            if (currentQuestion.trim()) {
                questions.push({
                    text: currentQuestion.trim(),
                    type: 'Short' // Default type - can be improved
                });
            }
            currentQuestion = line.replace(/^(Q?uestion\s+)?\d+[\.\):]/, '').trim();
        } else if (currentQuestion) {
            currentQuestion += ' ' + line.trim();
        }
    });
    
    // Add last question
    if (currentQuestion.trim()) {
        questions.push({
            text: currentQuestion.trim(),
            type: 'Short'
        });
    }
    
    return questions.filter(q => q.text.length > 10); // Filter out very short items
}

// Generate Question Paper endpoint
app.post('/api/generate-paper', (req, res) => {
    try {
        const { sections, subject, unit } = req.body;
        
        // Validation
        if (!sections || !subject) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        // Here you would typically query a database for questions
        // For now, returning a success message
        res.json({
            success: true,
            message: 'Question paper generated successfully',
            paper: {
                subject,
                unit,
                totalMarks: 60,
                sections: sections
            }
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'Server is running successfully' });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

// Error handler
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).json({ 
        error: 'Internal Server Error',
        message: err.message 
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`
    ╔════════════════════════════════════════════╗
    ║   Question Paper Generator Server          ║
    ║   Government Polytechnic Ahmedabad         ║
    ╚════════════════════════════════════════════╝
    
    🚀 Server running at http://localhost:${PORT}
    📝 Open your browser and navigate to the above URL
    
    Features:
    ✓ Beautiful UI for question paper generation
    ✓ PDF upload and question extraction
    ✓ Automatic question distribution by sections
    ✓ Print-friendly question paper format
    
    API Endpoints:
    POST /api/upload-pdf - Upload and extract questions from PDF
    POST /api/generate-paper - Generate question paper
    GET /api/health - Health check
    `);
});

module.exports = app;
