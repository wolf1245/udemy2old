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
});