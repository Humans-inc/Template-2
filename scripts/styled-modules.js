/**
 * add module's number
 */
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('#styled-modules .stream-table tr td a').forEach((item, index) => {
    let number = document.createElement('span');
    number.classList.add('new-module__number');
    number.innerText = `Модуль ${index + 1}`;
    item.prepend(number);
  });
});
