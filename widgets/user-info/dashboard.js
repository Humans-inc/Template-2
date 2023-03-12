/**
 * Все виджеты нужно поместить в контейнер с id="hide-mobile"
 */

document.addEventListener('DOMContentLoaded', () => {
  const events = ['load', 'resize'];
  events.forEach((item) => {
    window.addEventListener(item, () => {
      if (document.documentElement.clientWidth <= 1100) {
        document.querySelector('#hide-mobile').classList.add('hide');
      } else {
        document.querySelector('#hide-mobile').classList.remove('hide');
      }
      if (document.querySelector('#hide-mobile').classList.contains('hide')) {
        document.querySelector('#open-dashboard').innerText = 'Открыть дашборд';
      } else {
        document.querySelector('#open-dashboard').innerText = 'Закрыть дашборд';
      }
    });
  });
});
document.querySelector('#open-dashboard').addEventListener('click', (event) => {
  const { target } = event;
  document.querySelector('#hide-mobile').classList.toggle('hide');
  if (document.querySelector('#hide-mobile').classList.contains('hide')) {
    target.innerText = 'Открыть дашборд';
  } else {
    target.innerText = 'Закрыть дашборд';
  }
});
