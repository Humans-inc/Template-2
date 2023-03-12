document.addEventListener('DOMContentLoaded', () => {
  const lessonsGC = document.querySelectorAll('.lesson-list li:not(.divider)');
  const lessonsCustom = document.querySelector('#new-lessons');
  let dataLessons = Array.from(lessonsGC).map((item, index) => {
    return {
      title: item.querySelector('.link.title').innerText.replace('просмотрено', ''),
      number: index + 1,
      href: item.querySelector('a').href.replace(`https://${window.location.hostname}`, ''),
      state: item.classList[0],
      descr: item.querySelector('.description') ? item.querySelector('.description').innerText : '',
      date: item.querySelector('.has-start-at')
        ? item.querySelector('.has-start-at').innerText.replace('Недоступен до', 'Откроется')
        : '',
    };
  });
  for (let lesson of dataLessons) {
    switch (lesson.state) {
      case 'user-state-accomplished':
        lessonStateText = 'Принят';
        break;
      case 'user-state-reached':
        lessonStateText = 'Доступен';
        break;
      case 'user-state-need_accomplish':
        lessonStateText = 'Есть задание';
        break;
      case 'user-state-answered':
        lessonStateText = 'На проверке';
        break;
      case 'user-state-has_mission':
        lessonStateText = 'Есть задание';
        break;
      case 'user-state-not_reached':
        lessonStateText = 'Закрыт';
        break;
    }
    let newLesson = document.createElement('a');
    newLesson.href = lesson.href;
    newLesson.classList.add('new-lesson', lesson.state);
    newLesson.innerHTML = `
        <span class="new-lesson__number">Урок ${lesson.number}</span>
        <span class="new-lesson__state">${lessonStateText}</span>
        <span class="new-lesson__title">${lesson.title}</span>
        <span class="new-lesson__descr">${lesson.descr}</span>
        <span class="new-lesson__button">${
          lesson.state === 'user-state-not_reached' ? 'Недоступен' : 'Смотреть урок'
        }</span>
      `;

    if (lesson.state === 'user-state-not_reached' && lesson.date.length) {
      newLesson
        .querySelector('.new-lesson__button')
        .insertAdjacentHTML(
          'beforeend',
          `<span class="new-lesson__button-time">${lesson.date}</span>`
        );
    }
    lessonsCustom.append(newLesson);
  }
});
