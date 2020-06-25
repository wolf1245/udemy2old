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
});