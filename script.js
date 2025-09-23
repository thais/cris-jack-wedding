let currentLanguage = 'pt';

function getLanguageFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    const lang = urlParams.get('lang');
    
    if (lang === 'en' || lang === 'pt') {
        return lang;
    }
    
    const browserLang = navigator.language || navigator.userLanguage;
    
    if (browserLang.toLowerCase().startsWith('pt')) {
        return 'pt';
    }
    
    return 'en';
}

function updateURLLanguage(lang) {
    const url = new URL(window.location);
    url.searchParams.set('lang', lang);
    window.history.replaceState({}, '', url);
}

function switchLanguage(lang) {
    currentLanguage = lang;
    
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`.lang-btn[data-lang="${lang}"]`).classList.add('active');
    
    document.querySelectorAll('[data-pt][data-en]').forEach(element => {
        const text = element.getAttribute(`data-${lang}`);
        if (text) {
            element.textContent = text;
        }
    });
    
    document.documentElement.lang = lang;
    updateURLLanguage(lang);
}

function createLeaf() {
    const leaf = document.createElement('div');
    leaf.className = 'leaf';
    
    const leafType = Math.floor(Math.random() * 3) + 1;
    leaf.classList.add(`leaf-${leafType}`);
    
    const startX = Math.random() * window.innerWidth;
    leaf.style.left = startX + 'px';
    
    const duration = Math.random() * 10 + 10;
    leaf.style.animationDuration = duration + 's';
    
    const delay = Math.random() * 5;
    leaf.style.animationDelay = delay + 's';
    
    const size = Math.random() * 20 + 30;
    leaf.style.width = size + 'px';
    leaf.style.height = size + 'px';
    
    document.getElementById('leaves-container').appendChild(leaf);
    
    setTimeout(() => {
        leaf.remove();
    }, (duration + delay) * 1000);
}

setInterval(createLeaf, 2000);

for (let i = 0; i < 5; i++) {
    setTimeout(createLeaf, i * 500);
}

function createFox() {
    const fox = document.createElement('div');
    fox.className = 'fox';
    
    const svgFox = `
        <svg viewBox="0 0 100 60" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="40" cy="35" rx="25" ry="15" fill="#CC5500"/>
            <polygon points="15,35 5,25 10,35" fill="#CC5500"/>
            <circle cx="50" cy="30" r="12" fill="#CC5500"/>
            <polygon points="45,25 48,15 51,25" fill="#CC5500"/>
            <polygon points="50,25 53,15 56,25" fill="#CC5500"/>
            <ellipse cx="65" cy="40" rx="18" ry="8" fill="#FFFFFF" opacity="0.7"/>
            <ellipse cx="68" cy="40" rx="15" ry="6" fill="#CC5500"/>
            <circle cx="48" cy="30" r="2" fill="#000000"/>
            <circle cx="35" cy="40" r="3" fill="#1a1a1a"/>
            <circle cx="45" cy="40" r="3" fill="#1a1a1a"/>
            <circle cx="30" cy="42" r="3" fill="#1a1a1a"/>
            <circle cx="40" cy="42" r="3" fill="#1a1a1a"/>
        </svg>
    `;
    
    fox.innerHTML = svgFox;
    
    const delay = Math.random() * 10;
    fox.style.animationDelay = delay + 's';
    
    const speed = Math.random() * 10 + 15;
    fox.style.animationDuration = speed + 's';
    
    const bottomOffset = Math.random() * 20;
    fox.style.bottom = bottomOffset + 'px';
    
    document.getElementById('fox-container').appendChild(fox);
    
    setTimeout(() => {
        fox.remove();
    }, (speed + delay) * 1000);
}

function updateFoxCount(donorCount) {
    const foxContainer = document.getElementById('fox-container');
    foxContainer.innerHTML = '';
    
    const foxCount = Math.min(Math.floor(donorCount / 3) + 1, 10);
    
    for (let i = 0; i < foxCount; i++) {
        setTimeout(() => createFox(), i * 2000);
    }
}

function initializeFoxes() {
    setInterval(() => {
        const donorCount = document.querySelectorAll('.donor-card').length;
        if (Math.random() > 0.5) {
            createFox();
        }
    }, 5000);
}

document.addEventListener('DOMContentLoaded', function() {
    const initialLang = getLanguageFromURL();
    switchLanguage(initialLang);
    
    initializeFoxes();
    
    if (typeof donations !== 'undefined') {
        updateDonationDisplay();
        displayDonors();
    }
});

function updateDonationDisplay() {
    if (typeof donations === 'undefined') return;
    
    let totalBRL = 0;
    let totalEUR = 0;
    
    donations.forEach(donation => {
        if (donation.currency === 'BRL') {
            totalBRL += donation.amount;
        } else if (donation.currency === 'EUR') {
            totalEUR += donation.amount;
        }
    });
    
    document.getElementById('brl-amount').textContent = 
        `R$ ${totalBRL.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    document.getElementById('eur-amount').textContent = 
        `€ ${totalEUR.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function displayDonors() {
    if (typeof donations === 'undefined') return;
    
    const donorsList = document.getElementById('donors-list');
    donorsList.innerHTML = '';
    
    donations.forEach(donation => {
        const donorCard = document.createElement('div');
        donorCard.className = 'donor-card';
        
        const donorName = document.createElement('div');
        donorName.className = 'donor-name';
        donorName.textContent = donation.pseudonym;
        
        const donorAmount = document.createElement('div');
        donorAmount.className = 'donor-amount';
        const formattedAmount = donation.currency === 'EUR' 
            ? `€ ${donation.amount.toFixed(2)}`
            : `R$ ${donation.amount.toFixed(2).replace('.', ',')}`;
        donorAmount.textContent = formattedAmount;
        
        donorCard.appendChild(donorName);
        donorCard.appendChild(donorAmount);
        donorsList.appendChild(donorCard);
    });
    
    updateFoxCount(donations.length);
}