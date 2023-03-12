document.addEventListener('DOMContentLoaded', () => {
  let trainingsGC = document.querySelectorAll('.stream-table tr');
  let trainingsCustomContainer = document.querySelector('#new-trainings');

  let trainingsData = [];
  trainingsGC.forEach((item, index) => {
    let obj = {
      title: item.querySelector('.stream-title').innerText,
      descr: item.querySelector('a div').innerText,
      link: item.querySelector('a').href.replace(`https://${window.location.hostname}`, ''),
    };
    trainingsData.push(obj);
  });
  trainingsData.forEach((item) => {
    let training = document.createElement('a');
    training.classList.add('new-training');
    training.href = item.link;
    training.innerHTML = `
      <span class="new-training__title">${item.title}</span>
      <span class="new-training__state">Доступен</span>
    `;
    trainingsCustomContainer.append(training);
  });
});
