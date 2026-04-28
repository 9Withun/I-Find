const phones = [
    {
        name: 'Samsung Galaxy A55 5G',
        price: 13999,
        display: 6.6,
        entertainment: 4.6,
        news: 4.5,
        gaming: 4.0,
        battery: '5,000 mAh',
        chipset: 'Exynos 1480',
        store: 'https://www.samsung.com/th/smartphones/galaxy-a55-5g/'
    },
    {
        name: 'POCO X6 Pro 5G',
        price: 11990,
        display: 6.67,
        entertainment: 4.4,
        news: 4.2,
        gaming: 4.8,
        battery: '5,000 mAh',
        chipset: 'Dimensity 8300-Ultra',
        store: 'https://www.mi.com/global/product/poco-x6-pro/'
    },
    {
        name: 'iPhone 15',
        price: 32900,
        display: 6.1,
        entertainment: 4.8,
        news: 4.8,
        gaming: 4.5,
        battery: 'All-day battery',
        chipset: 'A16 Bionic',
        store: 'https://www.apple.com/th/iphone-15/'
    },
    {
        name: 'OnePlus Nord 4',
        price: 17990,
        display: 6.74,
        entertainment: 4.5,
        news: 4.2,
        gaming: 4.6,
        battery: '5,500 mAh',
        chipset: 'Snapdragon 7+ Gen 3',
        store: 'https://www.oneplus.com/global/nord-4'
    },
    {
        name: 'Google Pixel 8a',
        price: 18900,
        display: 6.1,
        entertainment: 4.2,
        news: 4.9,
        gaming: 3.9,
        battery: '4,492 mAh',
        chipset: 'Google Tensor G3',
        store: 'https://store.google.com/product/pixel_8a'
    },
    {
        name: 'ASUS ROG Phone 8',
        price: 35990,
        display: 6.78,
        entertainment: 4.7,
        news: 4.0,
        gaming: 5.0,
        battery: '5,500 mAh',
        chipset: 'Snapdragon 8 Gen 3',
        store: 'https://rog.asus.com/phones/rog-phone-8/'
    }
];

document.addEventListener('DOMContentLoaded', () => {
    const langTH = document.getElementById('langTH');
    const langEN = document.getElementById('langEN');
    const matchBtn = document.getElementById('matchBtn');
    const resultsEl = document.getElementById('results');

    const entertainment = document.getElementById('entertainment');
    const news = document.getElementById('news');
    const gaming = document.getElementById('gaming');
    const entValue = document.getElementById('entValue');
    const newsValue = document.getElementById('newsValue');
    const gameValue = document.getElementById('gameValue');

    const translatableElements = document.querySelectorAll('[data-th][data-en]');
    const placeholders = document.querySelectorAll('[data-th-placeholder][data-en-placeholder]');

    const updateScoreLabels = () => {
        entValue.textContent = entertainment.value;
        newsValue.textContent = news.value;
        gameValue.textContent = gaming.value;
    };

    [entertainment, news, gaming].forEach(slider => {
        slider.addEventListener('input', updateScoreLabels);
    });

    const setLanguage = (lang) => {
        translatableElements.forEach(el => {
            el.innerHTML = lang === 'th' ? el.getAttribute('data-th') : el.getAttribute('data-en');
        });

        placeholders.forEach(el => {
            el.placeholder = lang === 'th'
                ? el.getAttribute('data-th-placeholder')
                : el.getAttribute('data-en-placeholder');
        });

        langTH.classList.toggle('active', lang === 'th');
        langEN.classList.toggle('active', lang === 'en');
        localStorage.setItem('lang', lang);
        renderMatches();
    };

    const getScreenBonus = (phoneDisplay, preference) => {
        if (preference === 'any') return 1;
        if (preference === 'small') return phoneDisplay < 6.4 ? 1.15 : 0.95;
        if (preference === 'large') return phoneDisplay >= 6.4 ? 1.15 : 0.95;
        return 1;
    };

    const scorePhone = (phone, prefs) => {
        const budgetPenalty = phone.price > prefs.budget ? 0.75 : 1;
        const screenBonus = getScreenBonus(phone.display, prefs.screenPreference);

        const weightedScore =
            (phone.entertainment * prefs.entWeight) +
            (phone.news * prefs.newsWeight) +
            (phone.gaming * prefs.gameWeight);

        return weightedScore * budgetPenalty * screenBonus;
    };

    const renderMatches = () => {
        const lang = localStorage.getItem('lang') || 'th';
        const budget = Number(document.getElementById('budget').value || 0);
        const screenPreference = document.getElementById('screenPreference').value;

        const prefs = {
            budget,
            screenPreference,
            entWeight: Number(entertainment.value),
            newsWeight: Number(news.value),
            gameWeight: Number(gaming.value)
        };

        const ranked = [...phones]
            .map(phone => ({ phone, score: scorePhone(phone, prefs) }))
            .sort((a, b) => b.score - a.score)
            .slice(0, 3);

        resultsEl.innerHTML = ranked.map((item, index) => {
            const matchPercent = Math.min(99, Math.round((item.score / 15) * 100));
            const badgeText = lang === 'th' ? `อันดับ #${index + 1}` : `Rank #${index + 1}`;
            const matchLabel = lang === 'th' ? 'ความเหมาะสม' : 'Match score';
            const priceLabel = lang === 'th' ? 'ราคาโดยประมาณ' : 'Estimated price';
            const reasonLabel = lang === 'th' ? 'จุดเด่น' : 'Highlights';
            const goShop = lang === 'th' ? 'ไปยังร้านค้า' : 'Go to store';

            return `
            <article class="result-card">
                <div class="rank-badge">${badgeText}</div>
                <h3>${item.phone.name}</h3>
                <p class="match-line">${matchLabel}: <strong>${matchPercent}%</strong></p>
                <p>${priceLabel}: ${item.phone.price.toLocaleString()} ฿</p>
                <ul>
                    <li>${reasonLabel}: ${item.phone.chipset}</li>
                    <li>Display: ${item.phone.display}"</li>
                    <li>Battery: ${item.phone.battery}</li>
                </ul>
                <a href="${item.phone.store}" target="_blank" rel="noopener noreferrer">${goShop} <i class="fa-solid fa-arrow-up-right-from-square"></i></a>
            </article>`;
        }).join('');
    };

    langTH.addEventListener('click', () => setLanguage('th'));
    langEN.addEventListener('click', () => setLanguage('en'));
    matchBtn.addEventListener('click', renderMatches);

    updateScoreLabels();
    setLanguage(localStorage.getItem('lang') || 'th');
});
