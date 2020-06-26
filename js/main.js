document.addEventListener('DOMContentLoaded', () => {
    // получаем табы навигации
    let tabs = document.querySelectorAll('.info-header-tab');
    // получаем табы с контентом
    let tabsContent = document.querySelectorAll('.info-tabcontent');
    // получаем родителя где лежат табы переключения
    let tabsParent = document.querySelector('.info-header');

    // скрываем табы с контент
    function hideTabsContent() 
    {
        tabsContent.forEach(val => {
            val.classList.add('hide');
            val.classList.remove('show', 'fade');
        });
    }

    // показываем табы по ключу
    function showTabsContent(i = 0)
    {
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
    }

    //запуск ф-й, сначало скрываем
    hideTabsContent();
    // показываем по умолчанию
    showTabsContent();

    // при клике пользователя на элемент сверяем по классу с классом навигации табов
    tabsParent.addEventListener('click', (event) => {
        if(event.target && event.target.classList.contains('info-header-tab'))
        {
            // вытаскиваем ключи с псевдомасива навигации
            tabs.forEach((val, i) => {
                // если клик пользвателя равен диву навигации
                if(event.target == val)
                {
                    // скрываем все остальные
                    hideTabsContent();
                    // показываем с темкоторый равен нажатому пользователем диву
                    showTabsContent(i);
                }
            });
        }
    });

    // Tabs end

    // Timer start
    // дата окончания
    let expirationDate = '2020-06-26';
    differenceTime(expirationDate);
    // ф-я разницы времени до окончания даты и ненешним
    function differenceTime(endDate)
    {
        // вся разница времени
        let alldifferenceTime = Date.parse(endDate) - Date.parse(new Date());
        // часы,минуты,секунды округленные до целого числа
        let hours = Math.floor((alldifferenceTime / (1000 * 60 * 60)) % 24),
            minutes = Math.floor((alldifferenceTime / (1000 * 60)) % 60),
            seconds = Math.floor((alldifferenceTime / 1000) % 60);

        // возращаем обьект
        return {
            'allTime': alldifferenceTime,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }
    
    // ф-я проверки и подстаки нуля
    function helperZero(num)
    {
        if(num >= 0 && num < 10)
        {
            return `0${num}`;
        }
        else if(num < 0)
        {
            return '00';
        }
        else
        {
            return num;
        }
    }

    // ф-я вывода где селектор это элемент
    function getTime(selector, endDate)
    {
        // получаем родительский элемент
        let timer = document.querySelector(selector);
        // получаем его элементы
        let timerAll = timer.querySelectorAll('span');
        // вывод счетчика
        let counter = setInterval(setTime, 1000);

        // запуск ф-и для норм отображения при перезагрузки страницы
        setTime();

        // выводим на страницу
        function setTime()
        {
            timerAll[0].innerHTML = helperZero(differenceTime(endDate).hours);
            timerAll[2].innerHTML = helperZero(differenceTime(endDate).minutes);
            timerAll[4].innerHTML = helperZero(differenceTime(endDate).seconds);
        }

        //  проверяем если закончилось время
        if((differenceTime(endDate).allTime) <= 0)
        {
            clearInterval(counter);
        }
    }

    // запуск  и передача элемента поиска и дата окончания
    getTime('#timer', expirationDate);
    // Timer end

    // modal display start

    // получаем кнопки вызова окна табо
    let discripcionBtnAll = document.querySelectorAll('[data-open]');
    // получаем класс самого окна
    let overlay = document.querySelector('.overlay');
    //получаем класс закрытия окна
    let overlayCloseBtn = document.querySelector('[data-close]');

    // ф-я скрытия окна
    function closeOverlay()
    {
        overlay.style.display = 'none';
    }

    // ф-я показа окна
    function openOverlay()
    {
        overlay.style.display = 'flex';
    }

    // ф-я возращения скролла
    function scrollOn()
    {
        // пустая так как браузер сам решит что подставить
        document.body.style.overflow = '';
    }

    // показываем окно при клике
    discripcionBtnAll.forEach(btn => {
        // вешаем события клика на кнокпи
        btn.addEventListener('click', () => {
            openOverlay();
            // убираем скролл
            document.body.style.overflow = 'hidden';
        });
    });

    // закрываем при нажатии на крест
    overlayCloseBtn.addEventListener('click', () => {
        closeOverlay();
        scrollOn();
    });

    // закрываем при нажатии на подложку
    overlay.addEventListener('click', (event) => {
        // проверка куда нажал пользователь c переменной
        console.log(event.target);
        if(event.target == overlay)
        {
            closeOverlay();
            scrollOn();
        }
    });

    // делаем вывод окна при входе на сайт через 5 сек
    const timerOverlay = setTimeout(openOverlay, 5000);

    // ф-я проверки сколько проскролили пользователь
    function showScrollOverlay()
    {
        // проверяем прошел ли он до конца страницы
        if(window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight)
        {
            openOverlay();
            // убираем бесконечный вывод при скролле
            window.removeEventListener('scroll', showScrollOverlay);
        }
    }

    // выводим окно при скроле когда пользователь дошел до саиого низа
    window.addEventListener('scroll', showScrollOverlay);
    // modal display end
});