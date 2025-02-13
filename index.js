document.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => {
        document.querySelector(".loading-screen").style.display = "none";
        document.querySelector(".container").style.display = "flex";
    }, 5000);
});

function updateTimer() {
    const startDate = new Date("March 19, 2024 00:00:00");
    const currentDate = new Date();
    const timeDifference = currentDate - startDate;

    const years = Math.floor(timeDifference / (1000 * 60 * 60 * 24 * 365.25));
    const days = Math.floor((timeDifference % (1000 * 60 * 60 * 24 * 365.25)) / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

    if (years == 0)
        document.getElementById('timer').innerHTML = `${days} Дней, ${hours} Часов, ${minutes} Минут, ${seconds} Секунд`;
    else if (years == 1)
        document.getElementById('timer').innerHTML = `1 Год ${days} Дней, ${hours} Часов, ${minutes} Минут, ${seconds} Секунд`;
    else if (years < 5)
        document.getElementById('timer').innerHTML = `${years} Года ${days} Дней, ${hours} Часов, ${minutes} Минут, ${seconds} Секунд`;
    else
        document.getElementById('timer').innerHTML = `${years} Лет ${days} Дней, ${hours} Часов, ${minutes} Минут, ${seconds} Секунд`;
}

setInterval(updateTimer, 1000);

let currentSlide = 0;
        const slides = document.querySelectorAll('.slide');

        slides[currentSlide].classList.add('show');
        function showNextSlide() {
            slides[currentSlide].classList.remove('show');
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add('show');
        }
setInterval(showNextSlide, 5000);
