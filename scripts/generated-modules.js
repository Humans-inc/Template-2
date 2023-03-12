document.addEventListener('DOMContentLoaded', () => {
  const modulesGC = document.querySelectorAll('.stream-table tr');
  const modulesCustom = document.querySelector('#generated-modules');
  let dataModules = Array.from(modulesGC).map((item, index) => {
    return {
      title: item.querySelector('.stream-title').innerText,
      descr: item.querySelector('a div').innerText,
      number: index + 1,
      href: item.querySelector('a').href,
      id: item.dataset.trainingId,
    };
  });

  console.log(dataModules);

  for (let module of dataModules) {
    let newModule = document.createElement('a');
    newModule.href = module.href;
    newModule.classList.add('new-module');
    newModule.dataset.trainingId = module.id;
    newModule.innerHTML = `
        <span class="new-module__number">Модуль ${module.number}</span>
        <span class="new-module__title">${module.title}</span>
        <span class="new-module__descr">${module.descr}</span>
      `;

    modulesCustom.append(newModule);
  }
});
