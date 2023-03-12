document.addEventListener('DOMContentLoaded', () => {
  /* Функция для получения оставшегося
  количества дней и общего количества дней доступа
  на GetCourse
  
  1) Запрос на страницу покупок пользователя
  2) Нахождение нужной подписки
  3) Разбор строки с датами
  4) Подсчет процента
   */

  let courseName = 'Онлайн-курс экстремального вождения (демо-данные)';

  fetch('/sales/control/userProduct/my') // запрос на страницу покупок
    .then((resp) => resp.text())
    .then((data) => {
      const html = document.createElement('div'); // создаем html из ответа  со страницы покупок
      html.innerHTML = data;
      const tableTrCollection = html.querySelectorAll('.table-notitle tbody tr'); // находим все действующие покупки с доступом
      let currentIndex; //
      let datesString; //
      let daysLeft;
      tableTrCollection.forEach((el, index) => {
        const trName = el.querySelectorAll('td')[0].textContent.split('.')[1].trim();
        if (trName.includes(courseName)) {
          currentIndex = index;
          datesString = el
            .querySelectorAll('td')[1]
            .textContent.replace(/[\\n\\t]/g, '')
            .trim();
          daysLeft = el
            .querySelectorAll('td')[3]
            .textContent.replace(/[\\n\\t]/g, '')
            .trim();
        }
      });
      stringToDate(daysLeft, datesString);

      document.querySelector('.new-access__time').innerText = daysLeft.replace('через ', '');

      console.log(daysLeft, datesString);
    })
    .catch((e) => console.log(e.message));

  function stringToDate(left, all) {
    // Переменные
    let daysLeft, daysAll;
    const daysArr = left.split(' ');
    const dateArr = all.split(' ');
    const months = {
      Янв: '01',
      Фев: '02',
      Мар: '03',
      Апр: '04',
      Май: '05',
      Июн: '06',
      Июл: '07',
      Авг: '08',
      Сен: '09',
      Окт: '10',
      Ноя: '11',
      Дек: '12',
    };

    //Сначала узнаем сколько осталось

    if (daysArr[2].includes('дней' || 'день' || 'дня') && daysArr.length === 3) {
      daysLeft = daysArr[1];
    } else if (daysArr[2].includes('дней' || 'день' || 'дня') && daysArr.length === 5) {
      daysLeft = daysArr[1];
    } else if (daysArr[2].includes('минут' || 'минуты' || 'минуту') && daysArr.length === 3) {
      daysLeft = 1;
    } else {
      daysLeft = 0;
    }

    // конец
    daysLeft = daysLeft - 0;

    // Теперь узнаем сколько всего

    const fromDate = new Date(`${months[dateArr[2]]}/${dateArr[1]}/${dateArr[3]}`);
    const toDate = new Date(`${months[dateArr[6]]}/${dateArr[5]}/${dateArr[7]}`);

    daysAll = Math.abs(toDate - fromDate) / 86400000;

    let scale = Math.floor((daysLeft / daysAll) * 100);
    document.querySelector('.user-progress__scale-text').innerText = `${scale}%`;
    const radius = 25;

    const circleLength = 2 * 3.14 * radius;
    let dash = (circleLength / 100) * scale;

    const progress = document.querySelector('#progress-access');
    progress.setAttribute('stroke-dasharray', `${dash} ${circleLength}`);
  }
});
