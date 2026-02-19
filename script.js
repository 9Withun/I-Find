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
                brand: 'Samsung',
                model: { th: 'Galaxy A55', en: 'Galaxy A55' },
                reason: {
                    th: 'ใช้งานทั่วไปลื่น กล้องดี และแบตเตอรี่ใช้งานได้นานตลอดวัน.',
                    en: 'Smooth daily performance, reliable camera, and long battery life.'
                },
                score: '95%',
                stores: [
                    { name: 'Lazada', url: 'https://www.lazada.co.th' },
                    { name: 'Shopee', url: 'https://shopee.co.th' },
                    { name: 'BaNANA', url: 'https://www.bnn.in.th' }
                ]
            },
            {
                brand: 'Xiaomi',
                model: { th: 'Redmi Note 13', en: 'Redmi Note 13' },
                reason: {
                    th: 'คุ้มค่าสเปกต่อราคา เหมาะกับการใช้งานแอปโซเชียลและความบันเทิง.',
                    en: 'Strong value for money for social apps and daily entertainment.'
                },
                score: '93%',
                stores: [
                    { name: 'JD Central', url: 'https://www.jd.co.th' },
                    { name: 'NocNoc', url: 'https://www.nocnoc.com' },
                    { name: 'Power Buy', url: 'https://www.powerbuy.co.th' }
                ]
            },
            {
                brand: 'Apple',
                model: { th: 'iPhone 15', en: 'iPhone 15' },
                reason: {
                    th: 'ประสบการณ์ใช้งานเสถียร ใช้งานง่าย และกล้องดีในทุกสถานการณ์.',
                    en: 'Stable experience, easy to use, and consistently strong camera quality.'
                },
                score: '94%',
                stores: [
                    { name: 'Apple Store', url: 'https://www.apple.com/th/store' },
                    { name: 'Studio7', url: 'https://www.studio7thailand.com' },
                    { name: 'Power Buy', url: 'https://www.powerbuy.co.th' }
                ]
            }
        ],
        gaming: [
            {
                brand: 'ASUS',
                model: { th: 'ROG Strix G16', en: 'ROG Strix G16' },
                reason: {
                    th: 'เฟรมเรตสูง ระบบระบายความร้อนดี เหมาะกับเกมแข่งขัน.',
                    en: 'High frame rates and strong cooling for competitive gaming.'
                },
                score: '96%',
                stores: [
                    { name: 'JIB', url: 'https://www.jib.co.th' },
                    { name: 'Advice', url: 'https://www.advice.co.th' },
                    { name: 'IT City', url: 'https://www.itcity.in.th' }
                ]
            },
            {
                brand: 'Lenovo',
                model: { th: 'Legion 5', en: 'Legion 5' },
                reason: {
                    th: 'สมดุลเรื่องพลังประมวลผลและอุณหภูมิ เหมาะทั้งเล่นเกมและทำงาน.',
                    en: 'Balanced performance and thermals for gaming and productivity.'
                },
                score: '94%',
                stores: [
                    { name: 'Lazada', url: 'https://www.lazada.co.th' },
                    { name: 'Shopee', url: 'https://shopee.co.th' },
                    { name: 'Mercular', url: 'https://www.mercular.com' }
                ]
            },
            {
                brand: 'Razer',
                model: { th: 'DeathAdder V3', en: 'DeathAdder V3' },
                reason: {
                    th: 'เมาส์น้ำหนักเบาและตอบสนองไว เหมาะกับเกม FPS.',
                    en: 'Lightweight and fast response, ideal for FPS titles.'
                },
                score: '92%',
                stores: [
                    { name: 'Advice', url: 'https://www.advice.co.th' },
                    { name: 'Shopee', url: 'https://shopee.co.th' },
                    { name: 'Lazada', url: 'https://www.lazada.co.th' }
                ]
            }
        ],
        creative: [
            {
                brand: 'Apple',
                model: { th: 'iPad Air + Pencil', en: 'iPad Air + Pencil' },
                reason: {
                    th: 'เหมาะกับงานวาดภาพ สเก็ตช์ และตัดต่อคอนเทนต์แบบพกพา.',
                    en: 'Great for drawing, sketching, and portable content editing.'
                },
                score: '95%',
                stores: [
                    { name: 'Apple Store', url: 'https://www.apple.com/th/store' },
                    { name: 'Studio7', url: 'https://www.studio7thailand.com' },
                    { name: 'Power Buy', url: 'https://www.powerbuy.co.th' }
                ]
            },
            {
                brand: 'Sony',
                model: { th: 'Sony ZV-E10', en: 'Sony ZV-E10' },
                reason: {
                    th: 'กล้องคมชัด โฟกัสไว เหมาะกับวิดีโอคอนเทนต์และ Vlog.',
                    en: 'Sharp footage and fast autofocus for video content and vlogs.'
                },
                score: '93%',
                stores: [
                    { name: 'Big Camera', url: 'https://www.bigcamera.co.th' },
                    { name: 'EC Mall', url: 'https://www.ec-mall.com' },
                    { name: 'Lazada', url: 'https://www.lazada.co.th' }
                ]
            },
            {
                brand: 'Canon',
                model: { th: 'EOS R50', en: 'EOS R50' },
                reason: {
                    th: 'โทนสีสวย ใช้งานง่าย เหมาะกับครีเอเตอร์ที่เริ่มจริงจัง.',
                    en: 'Natural color and easy controls, great for growing creators.'
                },
                score: '91%',
                stores: [
                    { name: 'Big Camera', url: 'https://www.bigcamera.co.th' },
                    { name: 'Shopee', url: 'https://shopee.co.th' },
                    { name: 'Lazada', url: 'https://www.lazada.co.th' }
                ]
            }
        ],
        outdoor: [
            {
                brand: 'Garmin',
                model: { th: 'Forerunner 165', en: 'Forerunner 165' },
                reason: {
                    th: 'ติดตามสุขภาพและเส้นทางได้ละเอียด เหมาะกับกิจกรรมกลางแจ้ง.',
                    en: 'Detailed health and route tracking for outdoor activities.'
                },
                score: '90%',
                stores: [
                    { name: 'Supersports', url: 'https://www.supersports.co.th' },
                    { name: 'Lazada', url: 'https://www.lazada.co.th' },
                    { name: 'Shopee', url: 'https://shopee.co.th' }
                ]
            },
            {
                brand: 'Decathlon',
                model: { th: 'Trek 100 Waterproof', en: 'Trek 100 Waterproof' },
                reason: {
                    th: 'รองเท้ากันน้ำและเกาะพื้นดี เหมาะกับเดินป่าและทริปยาว.',
                    en: 'Waterproof and high-grip hiking shoes for long trekking trips.'
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
                brand: 'Dell',
                model: { th: 'XPS 13', en: 'XPS 13' },
                reason: {
                    th: 'เครื่องบางเบา แบตอึด เหมาะกับการทำงานและประชุมทั้งวัน.',
                    en: 'Lightweight design and long battery for full-day work and meetings.'
                },
                score: '94%',
                stores: [
                    { name: 'OfficeMate', url: 'https://www.officemate.co.th' },
                    { name: 'Advice', url: 'https://www.advice.co.th' },
                    { name: 'Power Buy', url: 'https://www.powerbuy.co.th' }
                ]
            },
            {
                brand: 'LG',
                model: { th: 'LG Ergo 27"', en: 'LG Ergo 27"' },
                reason: {
                    th: 'จอถนอมสายตาและปรับสรีระง่าย เหมาะกับงานหน้าจอนาน.',
                    en: 'Eye-care display with ergonomic adjustments for long work sessions.'
                },
                score: '90%',
                stores: [
                    { name: 'JIB', url: 'https://www.jib.co.th' },
                    { name: 'IT City', url: 'https://www.itcity.in.th' },
                    { name: 'BaNANA', url: 'https://www.bnn.in.th' }
                ]
            },
            {
                brand: 'Logitech',
                model: { th: 'MX Keys S', en: 'MX Keys S' },
                reason: {
                    th: 'คีย์บอร์ดทำงานที่พิมพ์สบายและเชื่อมต่อหลายอุปกรณ์ได้.',
                    en: 'Comfortable productivity keyboard with multi-device connectivity.'
                },
                score: '88%',
                stores: [
                    { name: 'Mercular', url: 'https://www.mercular.com' },
                    { name: 'Shopee', url: 'https://shopee.co.th' },
                    { name: 'Lazada', url: 'https://www.lazada.co.th' }
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
        showSuggestions(queryInput.value.trim(), true);
    }

    function getBudgetLabel(budget) {
        const labels = {
            entry: { th: 'เหมาะกับงบประหยัด', en: 'Entry budget friendly' },
            mid: { th: 'เหมาะกับงบคุ้มค่า', en: 'Great value budget' },
            premium: { th: 'เหมาะกับงบพรีเมียม', en: 'Premium budget pick' }
        };

        return labels[budget] || labels.mid;
    }

    function getDomain(url) {
        return url.replace('https://', '').replace('http://', '').replace('www.', '');
    }

    function hideSuggestions() {
        querySuggestions.style.display = 'none';
        querySuggestions.innerHTML = '';
    }

    function selectSuggestion(text) {
        queryInput.value = text;
        hideSuggestions();
        queryInput.focus();
    }

    function renderSuggestionPanel(items, isFiltering) {
        const lang = localStorage.getItem('lang') || 'th';
        const title = isFiltering
            ? (lang === 'th' ? 'คำค้นที่ตรงกับที่พิมพ์' : 'Matching suggestions')
            : (lang === 'th' ? 'คำค้นแนะนำยอดนิยม' : 'Popular suggestions');

        const chipButtons = items.map(item => (
            `<button type="button" class="suggestion-item" data-value="${item}">` +
            `<i class="fa-solid fa-magnifying-glass"></i><span>${item}</span></button>`
        )).join('');

        querySuggestions.innerHTML = `
            <p class="suggestion-title">${title}</p>
            <div class="suggestion-chips">${chipButtons}</div>
        `;

        querySuggestions.querySelectorAll('.suggestion-item').forEach(button => {
            button.addEventListener('click', () => selectSuggestion(button.dataset.value || ''));
        });

        querySuggestions.style.display = 'block';
    }

    function showSuggestions(keyword, forceShowPopular = false) {
        const lang = localStorage.getItem('lang') || 'th';
        const source = searchSuggestions[lang] || searchSuggestions.th;
        const trimmedKeyword = keyword.trim();

        if (!trimmedKeyword) {
            if (!forceShowPopular) {
                hideSuggestions();
                return;
            }

            renderSuggestionPanel(source.slice(0, 8), false);
            return;
        }

        const normalizedKeyword = trimmedKeyword.toLowerCase();
        const matches = source
            .filter(item => item.toLowerCase().includes(normalizedKeyword))
            .slice(0, 8);

        if (!matches.length) {
            hideSuggestions();
            return;
        }

        renderSuggestionPanel(matches, true);
    }

    function renderResults(lifestyle, budget, query) {
        const lang = localStorage.getItem('lang') || 'th';
        const picks = recommendationMap[lifestyle] || recommendationMap.everyday;
        const budgetLabel = getBudgetLabel(budget);
        const groupedByBrand = {};

        picks.forEach(item => {
            if (!groupedByBrand[item.brand]) {
                groupedByBrand[item.brand] = [];
            }
            groupedByBrand[item.brand].push(item);
        });

        resultsGrid.innerHTML = '';
        emptyText.style.display = 'none';

        Object.entries(groupedByBrand).forEach(([brand, items]) => {
            const brandBlock = document.createElement('section');
            brandBlock.className = 'brand-block';

            const heading = document.createElement('h3');
            heading.className = 'brand-title';
            heading.textContent = `${lang === 'th' ? 'ยี่ห้อ' : 'Brand'}: ${brand}`;

            const brandCards = document.createElement('div');
            brandCards.className = 'results-grid';

            items.forEach(item => {
                const card = document.createElement('article');
                card.className = 'result-card result-card-compact';

                const primaryStore = item.stores[0];
                const extraStores = item.stores.slice(1).map(store => (
                    `<a class="store-link" href="${store.url}" target="_blank" rel="noopener noreferrer">` +
                    `<span>${store.name}</span><i class="fa-solid fa-arrow-up-right-from-square"></i></a>`
                )).join('');

                card.innerHTML = `
                    <a class="hero-offer" href="${primaryStore.url}" target="_blank" rel="noopener noreferrer">
                        <span class="hero-score">${item.score}</span>
                        <h4>${item.model[lang]}</h4>
                        <p class="hero-domain">${getDomain(primaryStore.url)}</p>
                    </a>
                    <p class="mini-hint">${item.reason[lang]}</p>
                    <p class="mini-hint">${lang === 'th' ? 'คำค้น:' : 'Query:'} <strong>${query}</strong> • ${budgetLabel[lang]}</p>
                    <div class="store-list">${extraStores}</div>
                `;

                brandCards.appendChild(card);
            });

            brandBlock.appendChild(heading);
            brandBlock.appendChild(brandCards);
            resultsGrid.appendChild(brandBlock);
        });
    }

    queryInput.addEventListener('input', event => {
        showSuggestions(event.target.value, true);
    });

    queryInput.addEventListener('focus', () => {
        showSuggestions(queryInput.value, true);
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
            showSuggestions('', true);
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
