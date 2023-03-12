function declOfNum(n, text_forms) {
  n = Math.abs(n) % 100;
  var n1 = n % 10;
  if (n > 10 && n < 20) {
    return text_forms[2];
  }
  if (n1 > 1 && n1 < 5) {
    return text_forms[1];
  }
  if (n1 == 1) {
    return text_forms[0];
  }
  return text_forms[2];
}
const textForms = ['задание', 'задания', 'заданий'];
document.addEventListener('DOMContentLoaded', () => {
  let userPoint = 0;
  let allPoint = 0;
  let scale = 0;
  const scaleName = '1 курс';
  let scales = document.querySelectorAll('#user-progress tbody tr');
  scales.forEach((item) => {
    if (item.querySelector('a').innerText.includes(scaleName)) {
      userPoint = +item.querySelector('.badge').innerText.split(' ')[0];
      let scaleNameArr = item.querySelector('a').innerText.split('/');
      allPoint = +scaleNameArr[scaleNameArr.length - 1];
      scale = Math.round((userPoint / allPoint) * 100);
    } else if (item.querySelector('a').innerText.includes('Задания')) {
      document.querySelector('.new-progress__done-points').innerText = `${
        item.querySelector('.badge').innerText.split(' ')[0]
      } ${declOfNum(+item.querySelector('.badge').innerText.split(' ')[0], textForms)}`;

      document.querySelector('.new-progress__left-points').innerText = `${
        item.querySelector('a').innerText.split('/')[1]
      } ${declOfNum(+item.querySelector('a').innerText.split('/')[1], textForms)}`;
    }
  });

  document.querySelector('.new-progress__scale-text').innerText = `${scale}%`;
  const radius = 59;

  const progressSVG = document.querySelector('#progress');

  const circleLength = 2 * 3.14 * radius;
  let dash = (circleLength / 100) * scale;

  progressSVG.setAttribute('stroke-dasharray', `${dash} ${circleLength}`);
});
