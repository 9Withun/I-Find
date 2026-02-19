document.addEventListener('DOMContentLoaded', function () {
    const langTH = document.getElementById('langTH');
    const langEN = document.getElementById('langEN');
    const finderForm = document.getElementById('finderForm');
    const resultsGrid = document.getElementById('resultsGrid');
    const emptyText = document.getElementById('emptyText');
    const queryInput = document.getElementById('queryInput');
    const querySuggestions = document.getElementById('querySuggestions');

    const recommendationMap = {
        everyday: [
            {
                name: { th: 'สมาร์ตโฟนแบตอึด', en: 'Long-battery smartphone' },
                reason: {
                    th: 'เหมาะกับการใช้งานทั่วไปทั้งวัน เน้นความลื่นไหล กล้องดี และแบตเตอรี่ทน.',
                    en: 'Best for all-day use with smooth performance, good camera, and strong battery.'
                },
                score: '95%',
                stores: [
                    { name: 'Lazada', url: 'https://www.lazada.co.th' },
                    { name: 'Shopee', url: 'https://shopee.co.th' },
                    { name: 'BaNANA', url: 'https://www.bnn.in.th' }
                ]
            },
            {
                name: { th: 'หูฟังไร้สายตัดเสียง', en: 'Noise-cancelling earbuds' },
                reason: {
                    th: 'เหมาะกับการเดินทางและใช้งานประจำวัน ฟังเพลงหรือประชุมออนไลน์ได้ชัดเจน.',
                    en: 'Great for commuting and daily use with clear music and online meetings.'
                },
                score: '91%',
                stores: [
                    { name: 'NocNoc', url: 'https://www.nocnoc.com' },
                    { name: 'JD Central', url: 'https://www.jd.co.th' },
                    { name: 'Power Buy', url: 'https://www.powerbuy.co.th' }
                ]
            }
        ],
        gaming: [
            {
                name: { th: 'โน้ตบุ๊กเกมมิ่ง 144Hz', en: '144Hz gaming laptop' },
                reason: {
                    th: 'เฟรมเรตสูง ระบายความร้อนดี เหมาะกับเกมแข่งขันและสตรีมมิ่ง.',
                    en: 'High frame rate and strong cooling for competitive gaming and streaming.'
                },
                score: '96%',
                stores: [
                    { name: 'JIB', url: 'https://www.jib.co.th' },
                    { name: 'Advice', url: 'https://www.advice.co.th' },
                    { name: 'Mercular', url: 'https://www.mercular.com' }
                ]
            },
            {
                name: { th: 'เมาส์เกมมิ่งน้ำหนักเบา', en: 'Lightweight gaming mouse' },
                reason: {
                    th: 'ตอบสนองไว ควบคุมง่าย เหมาะกับเกม FPS และการเล่นยาวนาน.',
                    en: 'Fast response and easy control, ideal for FPS and long sessions.'
                },
                score: '93%',
                stores: [
                    { name: 'Shopee', url: 'https://shopee.co.th' },
                    { name: 'Lazada', url: 'https://www.lazada.co.th' },
                    { name: 'IT City', url: 'https://www.itcity.in.th' }
                ]
            }
        ],
        creative: [
            {
                name: { th: 'แท็บเล็ตพร้อมปากกา', en: 'Tablet with stylus support' },
                reason: {
                    th: 'เหมาะกับงานวาดภาพ ตัดต่อคอนเทนต์ และงานครีเอทีฟนอกสถานที่.',
                    en: 'Perfect for drawing, content editing, and mobile creative workflows.'
                },
                score: '94%',
                stores: [
                    { name: 'Apple Store', url: 'https://www.apple.com/th/store' },
                    { name: 'Studio7', url: 'https://www.studio7thailand.com' },
                    { name: 'Power Buy', url: 'https://www.powerbuy.co.th' }
                ]
            },
            {
                name: { th: 'กล้องมิเรอร์เลส', en: 'Mirrorless camera' },
                reason: {
                    th: 'ภาพคม โฟกัสไว เหมาะกับคอนเทนต์วิดีโอและถ่ายงานจริงจัง.',
                    en: 'Sharp image and fast autofocus for creators and serious content production.'
                },
                score: '92%',
                stores: [
                    { name: 'Big Camera', url: 'https://www.bigcamera.co.th' },
                    { name: 'EC Mall', url: 'https://www.ec-mall.com' },
                    { name: 'Lazada', url: 'https://www.lazada.co.th' }
                ]
            }
        ],
        outdoor: [
            {
                name: { th: 'นาฬิกา GPS ออกกำลังกาย', en: 'GPS fitness smartwatch' },
                reason: {
                    th: 'ติดตามสุขภาพและเส้นทางได้ละเอียด เหมาะกับกิจกรรมกลางแจ้ง.',
                    en: 'Tracks health and routes accurately for active outdoor lifestyles.'
                },
                score: '90%',
                stores: [
                    { name: 'Supersports', url: 'https://www.supersports.co.th' },
                    { name: 'Lazada', url: 'https://www.lazada.co.th' },
                    { name: 'Shopee', url: 'https://shopee.co.th' }
                ]
            },
            {
                name: { th: 'รองเท้าเดินป่ากันน้ำ', en: 'Waterproof hiking shoes' },
                reason: {
                    th: 'ยึดเกาะดี ลดการลื่น เหมาะกับเดินทางธรรมชาติและทริปยาว.',
                    en: 'Strong grip and comfort for trails, trekking, and long trips.'
                },
                score: '89%',
                stores: [
                    { name: 'Decathlon', url: 'https://www.decathlon.co.th' },
                    { name: 'NocNoc', url: 'https://www.nocnoc.com' },
                    { name: 'Central Online', url: 'https://www.central.co.th' }
                ]
            }
        ],
        work: [
            {
                name: { th: 'โน้ตบุ๊กบางเบาแบตยาว', en: 'Lightweight productivity laptop' },
                reason: {
                    th: 'เหมาะกับงานเอกสาร ประชุม และพกพาระหว่างวันได้สะดวก.',
                    en: 'Excellent for office tasks, meetings, and all-day portability.'
                },
                score: '94%',
                stores: [
                    { name: 'OfficeMate', url: 'https://www.officemate.co.th' },
                    { name: 'Advice', url: 'https://www.advice.co.th' },
                    { name: 'Power Buy', url: 'https://www.powerbuy.co.th' }
                ]
            },
            {
                name: { th: 'จอมอนิเตอร์ถนอมสายตา', en: 'Eye-care monitor' },
                reason: {
                    th: 'ลดแสงสีฟ้าและปรับสรีระง่าย เพิ่มความสบายเมื่อต้องทำงานนาน.',
                    en: 'Reduces eye strain with ergonomic setup for long work sessions.'
                },
                score: '88%',
                stores: [
                    { name: 'JIB', url: 'https://www.jib.co.th' },
                    { name: 'IT City', url: 'https://www.itcity.in.th' },
                    { name: 'Banana', url: 'https://www.bnn.in.th' }
                ]
            }
        ]
    };

    const searchSuggestions = {
        th: [
            'โทรศัพท์เล่นเกม', 'โทรศัพท์ถ่ายรูปสวย', 'หูฟังไร้สาย', 'หูฟังเกมมิ่ง', 'โน้ตบุ๊กทำงาน', 'โน้ตบุ๊กเกมมิ่ง',
            'แท็บเล็ตจดงาน', 'กล้องมิเรอร์เลส', 'สมาร์ทวอทช์ออกกำลังกาย', 'รองเท้าเดินป่า', 'จอมอนิเตอร์ทำงาน', 'ไมค์สตรีมมิ่ง'
        ],
        en: [
            'gaming phone', 'camera phone', 'wireless earbuds', 'gaming headset', 'work laptop', 'gaming laptop',
            'tablet for note taking', 'mirrorless camera', 'fitness smartwatch', 'hiking shoes', 'office monitor', 'streaming microphone'
        ]
    };

    const translatableElements = document.querySelectorAll('[data-th][data-en]');
    const translatablePlaceholders = document.querySelectorAll('[data-th-placeholder][data-en-placeholder]');

    function setLanguage(lang) {
        translatableElements.forEach(el => {
            el.innerHTML = lang === 'th' ? el.getAttribute('data-th') : el.getAttribute('data-en');
        });

        translatablePlaceholders.forEach(el => {
            const placeholder = lang === 'th' ? el.getAttribute('data-th-placeholder') : el.getAttribute('data-en-placeholder');
            el.setAttribute('placeholder', placeholder);
        });

        langTH.classList.toggle('active', lang === 'th');
        langEN.classList.toggle('active', lang === 'en');
        localStorage.setItem('lang', lang);
        showSuggestions(queryInput.value.trim());
    }

    function getBudgetLabel(budget) {
        const labels = {
            entry: { th: 'เหมาะกับงบประหยัด', en: 'Entry budget friendly' },
            mid: { th: 'เหมาะกับงบคุ้มค่า', en: 'Great value budget' },
            premium: { th: 'เหมาะกับงบพรีเมียม', en: 'Premium budget pick' }
        };

        return labels[budget] || labels.mid;
    }

    function hideSuggestions() {
        querySuggestions.style.display = 'none';
        querySuggestions.innerHTML = '';
    }

    function selectSuggestion(text) {
        queryInput.value = text;
        hideSuggestions();
    }

    function showSuggestions(keyword) {
        const lang = localStorage.getItem('lang') || 'th';
        const source = searchSuggestions[lang] || searchSuggestions.th;
        const normalizedKeyword = keyword.toLowerCase();
        const matches = source
            .filter(item => item.toLowerCase().includes(normalizedKeyword))
            .slice(0, 6);

        if (!matches.length || !keyword) {
            hideSuggestions();
            return;
        }

        querySuggestions.innerHTML = '';
        matches.forEach(item => {
            const option = document.createElement('button');
            option.type = 'button';
            option.className = 'suggestion-item';
            option.textContent = item;
            option.addEventListener('click', () => selectSuggestion(item));
            querySuggestions.appendChild(option);
        });

        querySuggestions.style.display = 'block';
    }

    function renderResults(lifestyle, budget, query) {
        const lang = localStorage.getItem('lang') || 'th';
        const picks = recommendationMap[lifestyle] || recommendationMap.everyday;
        resultsGrid.innerHTML = '';
        emptyText.style.display = 'none';

        picks.forEach(item => {
            const budgetLabel = getBudgetLabel(budget);
            const card = document.createElement('article');
            card.className = 'result-card';

            const stores = item.stores.map(store => (
                `<a class="store-link" href="${store.url}" target="_blank" rel="noopener noreferrer">` +
                `<span>${store.name}</span><i class="fa-solid fa-arrow-up-right-from-square"></i></a>`
            )).join('');

            card.innerHTML = `
                <div class="result-head">
                    <h3>${item.name[lang]}</h3>
                    <span class="tag">${item.score}</span>
                </div>
                <p>${item.reason[lang]} ${lang === 'th' ? 'คำค้นของคุณ:' : 'Your query:'} <strong>${query}</strong></p>
                <p class="hint">${budgetLabel[lang]}</p>
                <div class="store-list">${stores}</div>
            `;

            resultsGrid.appendChild(card);
        });
    }

    queryInput.addEventListener('input', event => {
        showSuggestions(event.target.value.trim());
    });

    queryInput.addEventListener('focus', () => {
        showSuggestions(queryInput.value.trim());
    });

    document.addEventListener('click', event => {
        if (!event.target.closest('.autocomplete-field')) {
            hideSuggestions();
        }
    });

    finderForm.addEventListener('submit', event => {
        event.preventDefault();
        const lifestyle = document.getElementById('lifestyleSelect').value;
        const budget = document.getElementById('budgetSelect').value;
        const query = queryInput.value.trim();

        if (!query) {
            queryInput.focus();
            return;
        }

        hideSuggestions();
        renderResults(lifestyle, budget, query);
    });

    langTH.addEventListener('click', () => setLanguage('th'));
    langEN.addEventListener('click', () => setLanguage('en'));

    const savedLang = localStorage.getItem('lang') || 'th';
    setLanguage(savedLang);
});
