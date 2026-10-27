const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });
}

const filterButtons = document.querySelectorAll('.filter-btn');
const animalCards = document.querySelectorAll('.animal-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        const filterValue = button.getAttribute('data-filter');

        animalCards.forEach(card => {
            const category = card.getAttribute('data-category');
            if (filterValue === 'all' || category === filterValue) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

const sections = document.querySelectorAll('.full-screen-section');

const observerOptions = {
    root: null,
    threshold: 0.15
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

sections.forEach(section => {
    observer.observe(section);
});

const images = [
    "katyazaych-cat-5088743_1920.jpg",
    "mordilla-net-cute-3162219_1920.jpg",
    "27058054-puppy-7162203_1920.jpg"
];

let currentIndex = 0;
let isChanging = false;
let autoTimer = null;

const img1 = document.getElementById('sliderImage1');
const img2 = document.getElementById('sliderImage2');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

if (img1 && img2) {
    images.forEach(src => { new Image().src = src; });

    img1.src = images[0];

    function showImage(index) {
        if (isChanging) return;
        isChanging = true;

        const activeImg = img1.classList.contains('active') ? img1 : img2;
        const nextImg = activeImg === img1 ? img2 : img1;

        nextImg.src = images[index];

        const runFade = () => {
            nextImg.classList.add('active');
            activeImg.classList.remove('active');

            setTimeout(() => {
                isChanging = false;
            }, 800);
        };

        if (nextImg.complete) {
            runFade();
        } else {
            nextImg.onload = runFade;
        }
    }

    function nextImage() {
        currentIndex = (currentIndex + 1) % images.length;
        showImage(currentIndex);
    }

    function prevImage() {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        showImage(currentIndex);
    }

    function startAuto() {
        clearInterval(autoTimer);
        autoTimer = setInterval(nextImage, 5000);
    }

    if (nextBtn && prevBtn) {
        nextBtn.addEventListener('click', () => {
            nextImage();
            startAuto();
        });

        prevBtn.addEventListener('click', () => {
            prevImage();
            startAuto();
        });

        startAuto();
    }
}

(function () {
    const slides = [
        "katyazaych-cat-5088743_1920.jpg",
        "mordilla-net-cute-3162219_1920.jpg",
        "27058054-puppy-7162203_1920.jpg"
    ];

    const layers = [
        document.getElementById('heroBg1'),
        document.getElementById('heroBg2')
    ];

    if (!layers[0] || !layers[1]) return;

    slides.forEach(src => { new Image().src = src; });

    layers[0].style.backgroundImage = `url('${slides[0]}')`;

    let index = 0;
    let current = 0;

    setInterval(() => {
        index = (index + 1) % slides.length;

        const outgoing = layers[current];
        const incoming = layers[1 - current];

        incoming.classList.remove('active', 'leaving', 'zoom');
        incoming.style.backgroundImage = `url('${slides[index]}')`;
        void incoming.offsetWidth;

        incoming.classList.add('active', 'zoom');

        outgoing.classList.remove('active');
        outgoing.classList.add('leaving');

        setTimeout(() => {
            outgoing.classList.remove('leaving', 'zoom');
        }, 1600);

        current = 1 - current;
    }, 6000);
})();