// Translations for the Math Fun app
const translations = {
    en: {
        // Header
        title: "🎯 Math Fun - Add to 20! 🎯",
        scoreLabel: "Score:",
        streakLabel: "Streak:",
        totalLabel: "Total:",
        
        // Question
        whatIs: "What is",
        plus: "+",
        questionMark: "?",
        
        // Input
        inputPlaceholder: "Type your answer",
        submitButton: "Check Answer",
        
        // Progress
        progressTitle: "Your Progress 📊",
        correctText: "correct out of",
        attemptsText: "attempts",
        
        // History
        historyTitle: "Recent Answers 📝",
        noAttemptsYet: "No attempts yet. Start solving!",
        
        // Footer
        resetButton: "Reset Progress",
        
        // Feedback messages
        enterNumber: "Please enter a number! 🤔",
        excellent: "Excellent! 🌟",
        perfect: "Perfect! 🎉",
        amazing: "Amazing! 🎊",
        greatJob: "Great job! 👏",
        wonderful: "Wonderful! 🎯",
        youreAStar: "You're a star! ⭐",
        tryAgain: "Try again! 💪",
        keepPracticing: "Keep practicing! 🎈",
        nextTime: "You'll get it next time! 🌈",
        dontGiveUp: "Don't give up! 🚀",
        theAnswerIs: "The answer is",
        
        // Alerts
        resetConfirm: "Are you sure you want to reset all progress? This cannot be undone!",
        resetComplete: "Progress reset! Start fresh! 🎈"
    },
    bg: {
        // Header
        title: "🎯 Забавна математика - Събиране до 20! 🎯",
        scoreLabel: "Точки:",
        streakLabel: "Поредица:",
        totalLabel: "Общо:",
        
        // Question
        whatIs: "Колко е",
        plus: "+",
        questionMark: "?",
        
        // Input
        inputPlaceholder: "Напиши отговора",
        submitButton: "Провери отговора",
        
        // Progress
        progressTitle: "Твоят прогрес 📊",
        correctText: "верни от",
        attemptsText: "опита",
        
        // History
        historyTitle: "Последни отговори 📝",
        noAttemptsYet: "Все още няма опити. Започни да решаваш!",
        
        // Footer
        resetButton: "Нулирай прогреса",
        
        // Feedback messages
        enterNumber: "Моля, въведи число! 🤔",
        excellent: "Отлично! 🌟",
        perfect: "Перфектно! 🎉",
        amazing: "Невероятно! 🎊",
        greatJob: "Страхотна работа! 👏",
        wonderful: "Чудесно! 🎯",
        youreAStar: "Ти си звезда! ⭐",
        tryAgain: "Опитай пак! 💪",
        keepPracticing: "Продължавай да практикуваш! 🎈",
        nextTime: "Следващият път ще успееш! 🌈",
        dontGiveUp: "Не се отказвай! 🚀",
        theAnswerIs: "Отговорът е",
        
        // Alerts
        resetConfirm: "Сигурен ли си, че искаш да нулираш целия прогрес? Това не може да бъде отменено!",
        resetComplete: "Прогресът е нулиран! Започни отначало! 🎈"
    }
};

// Default language
let currentLanguage = 'en';

// Function to get translation
function t(key) {
    return translations[currentLanguage][key] || translations.en[key] || key;
}

// Function to set language
function setLanguage(lang) {
    currentLanguage = lang;
    localStorage.setItem('mathFunLanguage', lang);
    updateUIText();
}

// Function to load saved language
function loadLanguage() {
    const saved = localStorage.getItem('mathFunLanguage');
    if (saved && translations[saved]) {
        currentLanguage = saved;
    }
}

// Function to update UI text
function updateUIText() {
    // Update HTML lang attribute
    document.documentElement.lang = currentLanguage;
    
    // Update title
    document.title = t('title').replace(/🎯/g, '').trim();
    
    // Update header
    document.querySelector('h1').textContent = t('title');
    document.querySelectorAll('.stat-label')[0].textContent = t('scoreLabel');
    document.querySelectorAll('.stat-label')[1].textContent = t('streakLabel');
    document.querySelectorAll('.stat-label')[2].textContent = t('totalLabel');
    
    // Update input placeholder
    document.getElementById('answer').placeholder = t('inputPlaceholder');
    document.getElementById('submitBtn').textContent = t('submitButton');
    
    // Update progress section
    document.querySelector('.progress-section h3').textContent = t('progressTitle');
    
    // Update history section
    document.querySelector('.history-section h3').textContent = t('historyTitle');
    
    // Update reset button
    document.getElementById('resetBtn').textContent = t('resetButton');
    
    // Update question text
    updateQuestionText();
    
    // Update progress text
    updateProgressText();
    
    // Re-render history with new language
    renderHistory();
    
    // Update active language button
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === currentLanguage);
    });
}

// Function to update question text
function updateQuestionText() {
    const num1 = document.getElementById('num1').textContent;
    const num2 = document.getElementById('num2').textContent;
    const questionElement = document.querySelector('.question');
    questionElement.innerHTML = `${t('whatIs')} <span id="num1">${num1}</span> ${t('plus')} <span id="num2">${num2}</span>${t('questionMark')}`;
}

// Function to update progress text
function updateProgressText() {
    const correct = document.getElementById('correct').textContent;
    const attempted = document.getElementById('attempted').textContent;
    const percentage = document.getElementById('percentage').textContent;
    const progressText = document.querySelector('.progress-text');
    progressText.innerHTML = `<span id="correct">${correct}</span> ${t('correctText')} <span id="attempted">${attempted}</span> ${t('attemptsText')} <span id="percentage">${percentage}</span>`;
}
