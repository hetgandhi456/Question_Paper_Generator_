// Global state
let questionsDatabase = {
    MCQ: [],
    Brief: [],
    Short: [],
    Long: []
};

let generatedPaper = null;

// Sample questions for demonstration
const sampleQuestions = [
    // MCQ Questions
    { text: "What is the time complexity of binary search?", type: "MCQ", marks: 1, options: ["O(n)", "O(log n)", "O(n²)", "O(n!)"], correct: 2 },
    { text: "Which data structure is LIFO?", type: "MCQ", marks: 1, options: ["Queue", "Stack", "Array", "Linked List"], correct: 2 },
    { text: "What does FIFO stand for?", type: "MCQ", marks: 1, options: ["First In First Out", "First In For Out", "Final Input Final Output", "Fast Input Final Output"], correct: 1 },
    { text: "Which algorithm has the best average case time complexity for sorting?", type: "MCQ", marks: 1, options: ["Bubble Sort", "Quick Sort", "Insertion Sort", "Selection Sort"], correct: 2 },
    { text: "What is the size of an int in Java?", type: "MCQ", marks: 1, options: ["2 bytes", "4 bytes", "8 bytes", "1 byte"], correct: 2 },
    { text: "Which of the following is not a linear data structure?", type: "MCQ", marks: 1, options: ["Array", "Stack", "Queue", "Tree"], correct: 4 },
    { text: "What is the space complexity of recursion?", type: "MCQ", marks: 1, options: ["O(1)", "O(n)", "O(n²)", "O(log n)"], correct: 2 },
    { text: "Which sorting algorithm has O(n²) complexity in all cases?", type: "MCQ", marks: 1, options: ["Merge Sort", "Quick Sort", "Selection Sort", "Radix Sort"], correct: 3 },
    { text: "What is a collision in hashing?", type: "MCQ", marks: 1, options: ["When two keys hash to same value", "When hash function fails", "When memory is full", "When insertion fails"], correct: 1 },
    { text: "Which data structure allows O(1) insertion and deletion?", type: "MCQ", marks: 1, options: ["Array", "Binary Tree", "Hash Table", "Linked List"], correct: 3 },
    { text: "What is the minimum number of comparisons required to find both the max and min elements?", type: "MCQ", marks: 1, options: ["n", "2n", "3n/2", "n-1"], correct: 3 },
    { text: "In a binary search tree, what is the property?", type: "MCQ", marks: 1, options: ["Left > Right", "Left < Right", "All equal", "Random order"], correct: 2 },
    { text: "What is the time complexity of linear search?", type: "MCQ", marks: 1, options: ["O(log n)", "O(1)", "O(n)", "O(n²)"], correct: 3 },
    { text: "How many edges does a complete graph with 5 vertices have?", type: "MCQ", marks: 1, options: ["5", "10", "15", "20"], correct: 2 },
    
    // Brief Answer Questions (4 marks)
    { text: "Explain the difference between stack and queue with examples.", type: "Brief", marks: 4 },
    { text: "What are the advantages and disadvantages of linked lists over arrays?", type: "Brief", marks: 4 },
    { text: "Describe the working of binary search algorithm.", type: "Brief", marks: 4 },
    { text: "What is recursion? Explain with one example.", type: "Brief", marks: 4 },
    
    // Short Answer Questions (3 marks)
    { text: "Define a hash function.", type: "Short", marks: 3 },
    { text: "What is a tree? What are its basic terminologies?", type: "Short", marks: 3 },
    { text: "Explain depth-first search (DFS).", type: "Short", marks: 3 },
    { text: "What is a balanced binary tree?", type: "Short", marks: 3 },
    { text: "Define dynamic programming.", type: "Short", marks: 3 },
    
    // Long Answer Questions (5 marks)
    { text: "Explain the bubble sort algorithm. Write pseudocode and analyze its time and space complexity.", type: "Long", marks: 5 },
    { text: "Describe the implementation of a stack using arrays. Include the operations push, pop, and peek with their complexities.", type: "Long", marks: 5 },
    { text: "Explain the concept of inheritance in Object-Oriented Programming with a practical example.", type: "Long", marks: 5 }
];

// DOM Elements
const uploadArea = document.getElementById('uploadArea');
const pdfInput = document.getElementById('pdfInput');
const uploadStatus = document.getElementById('uploadStatus');
const addManualBtn = document.getElementById('addManualBtn');
const sampleBtn = document.getElementById('sampleBtn');
const manualInput = document.getElementById('manualInput');
const questionText = document.getElementById('questionText');
const questionType = document.getElementById('questionType');
const questionMarks = document.getElementById('questionMarks');
const mcqOptions = document.getElementById('mcqOptions');
const mcqOptionsText = document.getElementById('mcqOptionsText');
const correctAnswer = document.getElementById('correctAnswer');
const addQuestionBtn = document.getElementById('addQuestionBtn');
const questionsContainer = document.getElementById('questionsContainer');
const questionCount = document.getElementById('questionCount');
const generateBtn = document.getElementById('generateBtn');
const previewSection = document.getElementById('previewSection');
const paperPreview = document.getElementById('paperPreview');
const printBtn = document.getElementById('printBtn');
const editBtn = document.getElementById('editBtn');

// File Upload Handlers
uploadArea.addEventListener('click', () => pdfInput.click());
uploadArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadArea.style.background = 'linear-gradient(135deg, rgba(52, 152, 219, 0.2) 0%, rgba(52, 152, 219, 0.25) 100%)';
});

uploadArea.addEventListener('dragleave', () => {
    uploadArea.style.background = 'linear-gradient(135deg, rgba(52, 152, 219, 0.05) 0%, rgba(52, 152, 219, 0.1) 100%)';
});

uploadArea.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadArea.style.background = 'linear-gradient(135deg, rgba(52, 152, 219, 0.05) 0%, rgba(52, 152, 219, 0.1) 100%)';
    const files = e.dataTransfer.files;
    if (files.length > 0) {
        pdfInput.files = files;
        handleFileUpload();
    }
});

pdfInput.addEventListener('change', handleFileUpload);

function handleFileUpload() {
    const file = pdfInput.files[0];
    if (!file) return;

    if (!file.type.includes('pdf')) {
        showUploadStatus('Please upload a valid PDF file', 'error');
        return;
    }

    showUploadStatus(`PDF "${file.name}" uploaded successfully! (Backend PDF extraction not configured. Please add questions manually.)`, 'success');
}

function showUploadStatus(message, type) {
    uploadStatus.textContent = message;
    uploadStatus.className = `upload-status ${type}`;
    uploadStatus.style.display = 'block';
}

// Manual Question Input Toggle
addManualBtn.addEventListener('click', () => {
    manualInput.style.display = manualInput.style.display === 'none' ? 'block' : 'none';
});

sampleBtn.addEventListener('click', () => {
    sampleQuestions.forEach(q => {
        const question = {
            id: Date.now() + Math.random(),
            text: q.text,
            type: q.type,
            marks: q.marks,
            options: q.options || null,
            correct: q.correct || null
        };
        questionsDatabase[q.type].push(question);
        displayQuestion(question);
    });
    questionCount.textContent = getTotalQuestions();
    showUploadStatus('Sample questions loaded! You can now generate a question paper.', 'success');
});

// Question Type Change Handler
questionType.addEventListener('change', (e) => {
    const type = e.target.value;
    mcqOptions.style.display = type === 'MCQ' ? 'block' : 'none';
    correctAnswer.style.display = type === 'MCQ' ? 'block' : 'none';

    // Auto-set marks based on type
    if (type === 'MCQ') questionMarks.value = 1;
    else if (type === 'Brief') questionMarks.value = 4;
    else if (type === 'Short') questionMarks.value = 3;
    else if (type === 'Long') questionMarks.value = 5;
});

// Add Question Handler
addQuestionBtn.addEventListener('click', () => {
    const text = questionText.value.trim();
    const type = questionType.value;
    const marks = parseInt(questionMarks.value);

    if (!text || !marks) {
        alert('Please fill in all required fields');
        return;
    }

    const question = {
        id: Date.now(),
        text: text,
        type: type,
        marks: marks,
        options: type === 'MCQ' ? mcqOptionsText.value.split('\n').filter(o => o.trim()) : null,
        correct: type === 'MCQ' ? parseInt(correctAnswer.value) : null
    };

    questionsDatabase[type].push(question);
    displayQuestion(question);

    // Reset form
    questionText.value = '';
    questionMarks.value = 1;
    mcqOptionsText.value = '';
    correctAnswer.value = '';
    questionCount.textContent = getTotalQuestions();
});

function getTotalQuestions() {
    return Object.values(questionsDatabase).reduce((sum, arr) => sum + arr.length, 0);
}

function displayQuestion(question) {
    const card = document.createElement('div');
    card.className = 'question-card';
    card.innerHTML = `
        <span class="question-type">${question.type}</span>
        <button class="delete-btn" onclick="deleteQuestion(${question.id}, '${question.type}')">×</button>
        <div class="question-text">${question.text}</div>
        <div class="question-marks">Marks: ${question.marks}</div>
    `;
    questionsContainer.appendChild(card);
}

function deleteQuestion(id, type) {
    questionsDatabase[type] = questionsDatabase[type].filter(q => q.id !== id);
    questionsContainer.innerHTML = '';
    Object.values(questionsDatabase).forEach(arr => {
        arr.forEach(q => displayQuestion(q));
    });
    questionCount.textContent = getTotalQuestions();
}

// Generate Question Paper
generateBtn.addEventListener('click', generatePaper);

function generatePaper() {
    const sectionACount = parseInt(document.getElementById('sectionACount').value);
    const sectionBCount = parseInt(document.getElementById('sectionBCount').value);
    const sectionCCount = parseInt(document.getElementById('sectionCCount').value);
    const sectionDCount = parseInt(document.getElementById('sectionDCount').value);
    const subjectName = document.getElementById('subjectName').value;
    const unitName = document.getElementById('unitName').value;

    // Check if enough questions available
    if (questionsDatabase.MCQ.length < sectionACount) {
        alert(`Not enough MCQ questions. You have ${questionsDatabase.MCQ.length}, need ${sectionACount}`);
        return;
    }
    if (questionsDatabase.Brief.length < sectionBCount) {
        alert(`Not enough Brief Answer questions. You have ${questionsDatabase.Brief.length}, need ${sectionBCount}`);
        return;
    }
    if (questionsDatabase.Short.length < sectionCCount) {
        alert(`Not enough Short Answer questions. You have ${questionsDatabase.Short.length}, need ${sectionCCount}`);
        return;
    }
    if (questionsDatabase.Long.length < sectionDCount) {
        alert(`Not enough Long Answer questions. You have ${questionsDatabase.Long.length}, need ${sectionDCount}`);
        return;
    }

    // Randomly select questions
    const sectionA = getRandomQuestions(questionsDatabase.MCQ, sectionACount);
    const sectionB = getRandomQuestions(questionsDatabase.Brief, sectionBCount);
    const sectionC = getRandomQuestions(questionsDatabase.Short, sectionCCount);
    const sectionD = getRandomQuestions(questionsDatabase.Long, sectionDCount);

    generatedPaper = {
        subject: subjectName,
        unit: unitName,
        sectionA,
        sectionB,
        sectionC,
        sectionD
    };

    displayPaper();
    previewSection.style.display = 'block';
    window.scrollTo({ top: previewSection.offsetTop, behavior: 'smooth' });
}

function getRandomQuestions(array, count) {
    const shuffled = [...array].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

function displayPaper() {
    let html = `
        <div class="paper-header">
            <h1>GOVERNMENT POLYTECHNIC AHMEDABAD</h1>
            <p class="subtitle">Question Paper</p>
            <p><strong>${generatedPaper.subject}</strong> | ${generatedPaper.unit}</p>
            <p style="margin-top: 10px;">Total Marks: 60 | Time: 2 Hours</p>
        </div>
    `;

    // Section A - MCQ
    html += `<div class="section-title">SECTION A - Multiple Choice Questions (1 Mark Each) - Total 14 Marks</div>`;
    generatedPaper.sectionA.forEach((q, i) => {
        html += `
            <div class="question-item">
                <span class="question-number">A${i + 1}.</span>
                ${q.text}
                <span class="question-marks-label">[1 mark]</span>
                ${q.options ? `<br/><div style="margin-left: 20px; margin-top: 8px; font-size: 0.9em;">
                    ${q.options.map((opt, idx) => `<div>    ${String.fromCharCode(65 + idx)}. ${opt}</div>`).join('')}
                </div>` : ''}
            </div>
        `;
    });

    // Section B - Brief Answer
    html += `<div class="section-title">SECTION B - Brief Answer Questions (4 Marks Each) - Total 16 Marks</div>`;
    generatedPaper.sectionB.forEach((q, i) => {
        html += `
            <div class="question-item">
                <span class="question-number">B${i + 1}.</span>
                ${q.text}
                <span class="question-marks-label">[4 marks]</span>
            </div>
        `;
    });

    // Section C - Short Answer
    html += `<div class="section-title">SECTION C - Short Answer Questions (3 Marks Each) - Total 15 Marks</div>`;
    generatedPaper.sectionC.forEach((q, i) => {
        html += `
            <div class="question-item">
                <span class="question-number">C${i + 1}.</span>
                ${q.text}
                <span class="question-marks-label">[3 marks]</span>
            </div>
        `;
    });

    // Section D - Long Answer
    html += `<div class="section-title">SECTION D - Long Answer Questions (5 Marks Each) - Total 15 Marks</div>`;
    generatedPaper.sectionD.forEach((q, i) => {
        html += `
            <div class="question-item">
                <span class="question-number">D${i + 1}.</span>
                ${q.text}
                <span class="question-marks-label">[5 marks]</span>
            </div>
        `;
    });

    paperPreview.innerHTML = html;
}

// Print Handler
printBtn.addEventListener('click', () => {
    window.print();
});

// Edit Handler
editBtn.addEventListener('click', () => {
    previewSection.style.display = 'none';
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Initialize
questionType.dispatchEvent(new Event('change'));
