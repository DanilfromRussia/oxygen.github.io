document.addEventListener('DOMContentLoaded', function () {
    const myButton = document.getElementById('footer__btn');
    const myElement = document.getElementById('hidden__id');

    myButton.addEventListener('click', function () {
        if (myElement.style.display == 'none') {
            myElement.style.display = 'flex';
        } else {
            myElement.style.display = 'none';
        }
    });

    const playBtn = document.querySelector('#achivement__play');
    const playElement = document.querySelector('#__video');
    let playFlag = false;

    playBtn.addEventListener('click', function () {
        if (playFlag == false) {
            playElement.play();
            playBtn.style.opacity = 0;
            playFlag = true;
        } else {
            playElement.pause();
            playBtn.style.opacity = 1;
            playFlag = false;
        }
    });

    playBtn.addEventListener('mouseenter', function () {
        // Действия при наведении курсора на элемент
        playBtn.style.opacity = 1;
    });

    playBtn.addEventListener('mouseleave', function () {
        // Действия при уходе курсора с элемента
        playBtn.style.opacity = 0;
    });

    // Обработка событий клавиатуры

    const blocks = document.getElementsByClassName("catch-on-js"); // получили массив из видео, слайдеров и поля
    // let block = blocks[0]; // видео попало в область видимости

    document.addEventListener('keydown', function (event) {

        if (isInViewport(blocks[0]) === true) {
            if (event.key === 'ArrowRight') {
                playElement.currentTime += 5;
            }

            if (event.key === 'ArrowLeft') {
                playElement.currentTime -= 5;
            }

            if (event.code === 'Space') {

                event.preventDefault();

                if (playFlag == false) {
                    playElement.play();
                    playBtn.style.opacity = 0;
                    playFlag = true;
                } else {
                    playElement.pause();
                    playBtn.style.opacity = 1;
                    playFlag = false;
                }
            }
        }

    });

    // слайдер код

    const leftBtn = document.querySelector("#__btn-left");
    const rightBtn = document.querySelector("#__btn-right");

    const slideElem = document.querySelector("#__slider");

    let slides = slideElem.querySelectorAll('.slider__slide');
    let slidesCount = slides.length;

    let dotesElem = document.querySelector("#__pegination");
    let dotes = dotesElem.querySelectorAll('.slider__dot');


    // Избегаем наслоения слайдов разного размера друг на друга
    for (let i = 1; i < slidesCount; i++) {
        slides[i].style.display = 'none';
    }

    let currentSlideIndex = 0;

    leftBtn.addEventListener('click', function () {
        oldIndex = currentSlideIndex;
        showSlide(currentSlideIndex - 1);
    });

    rightBtn.addEventListener('click', function () {
        oldIndex = currentSlideIndex;
        showSlide(currentSlideIndex + 1);
    });

    let oldIndex = 0;

    document.addEventListener('keydown', function (event) {

        if (isInViewport(blocks[1]) === true) {

            if (event.key === 'ArrowRight') {
                oldIndex = currentSlideIndex;
                showSlide(currentSlideIndex + 1);
            }

            if (event.key === 'ArrowLeft') {
                oldIndex = currentSlideIndex;
                showSlide(currentSlideIndex - 1);
            }
        }

    });

    function showSlide(index) {

        // Обрабатываем переполнение индекса
        if (index < 0) {
            index = slidesCount - 1;
        } else if (index >= slidesCount) {
            index = 0;
        }

        // Скрываем все слайды
        for (let i = 0; i < slidesCount; i++) {
            slides[i].style.display = 'none';
        }

        // Показываем нужный слайд
        slides[index].style.display = 'inline-block';

        // pegination смена активного слайда

        dotes[index].style.width = '18px';
        dotes[index].style.height = '18px';
        dotes[index].style.backgroundColor = '#ffa500';

        dotes[oldIndex].style.width = '9px';
        dotes[oldIndex].style.height = '9px';
        dotes[oldIndex].style.backgroundColor = '#000';

        // Обновляем текущий индекс слайда
        currentSlideIndex = index;
    }

    // НАЧАЛО ИСПОЛЬЗОВАНИЯ LEAFLET:

    const map = L.map('map').setView([44.779301, 17.182301], 17);

    const marker = L.marker([44.77964296520983, 17.182005957003472]).addTo(map);

    const circle = L.circle([44.77964296520983, 17.182005957003472], {
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.3,
        radius: 50
    }).addTo(map);

    marker.bindPopup("<b>Oxygen company</b><br><br>Monsday-Friday<br>8.00-15:00").openPopup();


    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    // НАЧАЛО ИСПОЛЬЗОВАНИЯ ОБЛАСТИ ВИДИМОСТИ

    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
});
