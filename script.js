// Game state
let score = 0;
let streak = 0;
let totalAttempts = 0;
let correctAnswers = 0;
let currentNum1 = 0;
let currentNum2 = 0;
let currentAnswer = 0;
let history = [];

// DOM elements
const num1Element = document.getElementById('num1');
const num2Element = document.getElementById('num2');
const answerInput = document.getElementById('answer');
const submitBtn = document.getElementById('submitBtn');
const feedbackElement = document.getElementById('feedback');
const scoreElement = document.getElementById('score');
const streakElement = document.getElementById('streak');
const totalElement = document.getElementById('total');
const correctElement = document.getElementById('correct');
const attemptedElement = document.getElementById('attempted');
const percentageElement = document.getElementById('percentage');
const progressFillElement = document.getElementById('progressFill');
const historyElement = document.getElementById('history');
const resetBtn = document.getElementById('resetBtn');

// Initialize the game
function init() {
    loadLanguage();
    loadProgress();
    updateUIText();
    generateNewQuestion();
    updateStats();
    renderHistory();
    
    // Event listeners
    submitBtn.addEventListener('click', checkAnswer);
    answerInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            checkAnswer();
        }
    });
    resetBtn.addEventListener('click', resetProgress);
}

// Generate a new math question
function generateNewQuestion() {
    // Generate two random numbers that sum to 20 or less
    currentNum1 = Math.floor(Math.random() * 20) + 1;
    const maxNum2 = 20 - currentNum1;
    currentNum2 = Math.floor(Math.random() * maxNum2) + 1;
    currentAnswer = currentNum1 + currentNum2;
    
    // Update UI
    num1Element.textContent = currentNum1;
    num2Element.textContent = currentNum2;
    answerInput.value = '';
    answerInput.focus();
    updateQuestionText();
    
    // Hide feedback
    feedbackElement.classList.add('hidden');
    feedbackElement.classList.remove('correct', 'incorrect');
}

// Check the user's answer
function checkAnswer() {
    const userAnswer = parseInt(answerInput.value);
    
    if (isNaN(userAnswer)) {
        showFeedback(t('enterNumber'), false);
        return;
    }
    
    totalAttempts++;
    const isCorrect = userAnswer === currentAnswer;
    
    if (isCorrect) {
        correctAnswers++;
        score += 10;
        streak++;
        
        // Bonus points for streak
        if (streak >= 3) {
            score += 5;
        }
        
        const messages = [
            t('excellent'),
            t('perfect'),
            t('amazing'),
            t('greatJob'),
            t('wonderful'),
            t('youreAStar')
        ];
        const randomMessage = messages[Math.floor(Math.random() * messages.length)];
        showFeedback(`${randomMessage} ${currentNum1} + ${currentNum2} = ${currentAnswer}`, true);
    } else {
        streak = 0;
        const encouragements = [
            t('tryAgain'),
            t('keepPracticing'),
            t('nextTime'),
            t('dontGiveUp')
        ];
        const randomEncouragement = encouragements[Math.floor(Math.random() * encouragements.length)];
        showFeedback(`${randomEncouragement} ${t('theAnswerIs')} ${currentAnswer}`, false);
    }
    
    // Add to history
    history.unshift({
        question: `${currentNum1} + ${currentNum2}`,
        userAnswer: userAnswer,
        correctAnswer: currentAnswer,
        isCorrect: isCorrect,
        timestamp: new Date().toLocaleTimeString()
    });
    
    // Keep only last 10 items in history
    if (history.length > 10) {
        history = history.slice(0, 10);
    }
    
    // Update everything
    updateStats();
    renderHistory();
    saveProgress();
    
    // Generate new question after a delay
    setTimeout(() => {
        generateNewQuestion();
    }, 2000);
}

// Show feedback message
function showFeedback(message, isCorrect) {
    feedbackElement.textContent = message;
    feedbackElement.classList.remove('hidden');
    
    if (isCorrect) {
        feedbackElement.classList.add('correct');
        feedbackElement.classList.remove('incorrect');
    } else {
        feedbackElement.classList.add('incorrect');
        feedbackElement.classList.remove('correct');
    }
}

// Update statistics display
function updateStats() {
    scoreElement.textContent = score;
    streakElement.textContent = streak;
    totalElement.textContent = totalAttempts;
    correctElement.textContent = correctAnswers;
    attemptedElement.textContent = totalAttempts;
    
    // Calculate percentage
    const percentage = totalAttempts > 0 ? Math.round((correctAnswers / totalAttempts) * 100) : 0;
    percentageElement.textContent = `(${percentage}%)`;
    
    // Update progress bar
    progressFillElement.style.width = `${percentage}%`;
    
    // Update progress text with translations
    updateProgressText();
}

// Render history
function renderHistory() {
    if (history.length === 0) {
        historyElement.innerHTML = `<p style="text-align: center; color: #b2bec3;">${t('noAttemptsYet')}</p>`;
        return;
    }
    
    historyElement.innerHTML = history.map(item => `
        <div class="history-item ${item.isCorrect ? 'correct' : 'incorrect'}">
            <span class="history-question">${item.question} = ${item.userAnswer}</span>
            <span class="history-result">${item.isCorrect ? '✓' : '✗'}</span>
        </div>
    `).join('');
}

// Save progress to localStorage
function saveProgress() {
    const progress = {
        score,
        streak,
        totalAttempts,
        correctAnswers,
        history
    };
    localStorage.setItem('mathFunProgress', JSON.stringify(progress));
}

// Load progress from localStorage
function loadProgress() {
    const saved = localStorage.getItem('mathFunProgress');
    if (saved) {
        try {
            const progress = JSON.parse(saved);
            score = progress.score || 0;
            streak = progress.streak || 0;
            totalAttempts = progress.totalAttempts || 0;
            correctAnswers = progress.correctAnswers || 0;
            history = progress.history || [];
        } catch (e) {
            console.error('Error loading progress:', e);
        }
    }
}

// Reset all progress
function resetProgress() {
    if (confirm(t('resetConfirm'))) {
        score = 0;
        streak = 0;
        totalAttempts = 0;
        correctAnswers = 0;
        history = [];
        
        localStorage.removeItem('mathFunProgress');
        updateStats();
        renderHistory();
        generateNewQuestion();
        
        alert(t('resetComplete'));
    }
}

// Start the game when page loads
init();
