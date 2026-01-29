# Question Paper Generator

A beautiful, fully-featured web application for generating question papers with automatic section-wise distribution. Designed specifically for **Government Polytechnic Ahmedabad**.

## Features

✨ **Beautiful UI** - Modern, responsive design with smooth animations  
📄 **PDF Upload** - Upload unit PDFs (with backend setup)  
📋 **Smart Distribution** - Auto-generates question papers with proper section distribution  
🎨 **Professional Format** - Institutional header and well-formatted output  
🖨️ **Print-Friendly** - Generate downloadable question papers as PDF  
🔧 **Flexible Configuration** - Customize marks and question distribution  

## Quick Start

### Option 1: Open Directly in Browser (Easiest)
1. Navigate to the folder: `c:\Users\KALPESH\Downloads\New folder`
2. Double-click on **`index.html`** to open in your browser
3. Start adding questions and generating papers!

### Option 2: Use Python Simple Server
If you have Python installed:

```bash
# Navigate to the folder
cd "c:\Users\KALPESH\Downloads\New folder"

# Start Python server
python -m http.server 8000

# Open browser and go to: http://localhost:8000
```

### Option 3: Use Node.js Server (After Installing Node.js)
```bash
# Navigate to the folder
cd "c:\Users\KALPESH\Downloads\New folder"

# Install dependencies
npm install

# Start server
npm start

# Open browser and go to: http://localhost:3000
```

## Question Paper Structure

The application generates question papers with 4 sections as per your requirements:

### Section A - Multiple Choice Questions (MCQ)
- **Marks**: 14 (1 mark each)
- **Questions**: 14
- **Total**: 14 marks

### Section B - Brief Answer Questions
- **Marks**: 16 (4 marks each)
- **Questions**: 4
- **Total**: 16 marks

### Section C - Short Answer Questions
- **Marks**: 15 (3 marks each)
- **Questions**: 5
- **Total**: 15 marks

### Section D - Long Answer Questions
- **Marks**: 15 (5 marks each)
- **Questions**: 3
- **Total**: 15 marks

**Grand Total: 60 marks**

## Usage Guide

### Step 1: Load Questions
Click **"Load Sample Questions"** to start with pre-loaded questions, or manually add your own:
- Click **"Add Question Manually"**
- Enter question text
- Select question type (MCQ, Brief, Short, Long)
- For MCQ: Add options and mark correct answer
- Click **"Add Question"**

### Step 2: Configure Settings
- Adjust number of questions for each section
- Enter subject name and unit/chapter
- Review the mark distribution

### Step 3: Generate Question Paper
- Click **"Generate Question Paper"**
- Review the preview
- Click **"Print/Download as PDF"** to save as PDF
- Click **"Edit & Regenerate"** to make changes

## File Structure

```
New folder/
├── index.html                  # Main application (Open this file!)
├── public/                     # Public files (for server mode)
│   ├── index.html
│   ├── styles.css
│   └── script.js
├── server.js                   # Express server (requires Node.js)
├── package.json                # Dependencies
├── README.md                   # This file
└── uploads/                    # PDF storage (server mode)
```

## Requirements

**Browser**: Any modern browser (Chrome, Firefox, Edge, Safari)  
**No Installation Needed** - Just open `index.html` in your browser!

### Optional: For Backend PDF Extraction
- Node.js 14+
- npm

## Features

### ✅ Fully Working
- Beautiful, responsive UI
- Manual question entry
- 4 section generation (A, B, C, D)
- Professional question paper format
- Print to PDF functionality
- Sample questions loader
- Question management (add/delete)

### 📝 Frontend Features
- Drag & drop PDF upload
- Beautiful gradient design
- Mobile responsive
- Smooth animations
- Real-time preview

## PDF Export

To save the question paper as PDF:
1. Click **"Print/Download as PDF"**
2. Choose **"Save as PDF"** as printer
3. Click **"Save"**

The question paper will be downloaded with proper formatting!

## Customization

### Change College Name
Open `index.html` and find this line:
```html
<h1>GOVERNMENT POLYTECHNIC AHMEDABAD</h1>
```

### Change Default Subject
Look for:
```html
<input type="text" id="subjectName" value="Data Structures">
```

### Add More Sample Questions
Edit the `sampleQuestions` array in the script section of `index.html`

## Sample Questions Included

The app includes 22 sample questions:
- 14 MCQ questions
- 4 Brief answer questions
- 5 Short answer questions
- 3 Long answer questions

Perfect for testing and demonstration!

## Troubleshooting

### File doesn't open
- Make sure you're double-clicking `index.html`
- Try right-click → Open with → Chrome/Firefox

### Styles not loading when opened as file
- Use a local server (Python or Node.js method above)
- Browser security prevents some features when opening as `file://`

### Can't save as PDF
- Use the browser's Print function (Ctrl+P)
- Choose "Save as PDF" option

## Advanced Setup (Backend)

For production use with PDF extraction:

1. **Install Node.js** from https://nodejs.org
2. **Navigate to folder** and run:
   ```bash
   npm install
   npm start
   ```
3. **Visit**: http://localhost:3000

This enables:
- PDF upload and question extraction
- API endpoints for question management
- Database integration ready
- Advanced PDF processing

## Technologies Used

**Frontend:**
- HTML5
- CSS3 (with animations & responsive design)
- Vanilla JavaScript
- No dependencies!

**Backend (Optional):**
- Node.js & Express.js
- Multer (file upload)
- pdf-parse (PDF processing)

## Browser Compatibility

✅ Chrome 90+  
✅ Firefox 88+  
✅ Edge 90+  
✅ Safari 14+

## Performance Tips

1. For best performance, keep question database under 100 questions
2. Use modern browsers for smooth animations
3. Ensure sufficient disk space for PDF exports

## Print Tips

- Use **Print Preview** to check formatting before saving
- Set margins to **Minimum** for more content per page
- Choose **Standard** quality for faster printing

## Support & Issues

1. Clear browser cache (Ctrl+Shift+Del)
2. Try a different browser
3. Check browser console (F12) for errors
4. Ensure pop-ups are not blocked

## License

MIT License - Free to use and modify

## Version

**v1.0.0** - January 2024

---

**Questions Paper Generator for Government Polytechnic Ahmedabad**

Developed to make examination question paper generation fast, beautiful, and easy! 🎓

**Happy Generating!** 📝✨

