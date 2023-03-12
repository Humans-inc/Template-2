document.addEventListener('DOMContentLoaded', () => {
  const SCALE_LINK = '/teach/control/stream/view/id/713086798';
  const scalesContainer = document.querySelector('.user-progress__content');
  fetch(SCALE_LINK)
    .then((res) => res.text())
    .then((data) => {
      let html = document.createElement('div');
      html.innerHTML = data;
      let scales = html.querySelectorAll('.xdget-trainingAchievements tbody tr');
      let scalesData = Array.from(scales).map((item) => {
        return {
          name: item.querySelector('a').innerText.split('/')[0].trim(),
          points: item.querySelector('.badge').innerText,
          maxValue: item.querySelector('a').innerText.split('/')[1].trim(),
        };
      });
      console.log(scalesData);
      scalesData.forEach((item, index) => {
        let scale = document.createElement('div');
        scale.classList.add('user-progress__course');
        scale.innerHTML = `
          <div class="user-progress__scale">
            <svg viewBox="0 0 200 200" width="52">
              <circle r="80" cx="100" cy="100" fill="none" stroke-width="12" stroke="#ffffff"></circle>
              <circle id="progress-${index}" r="80" cx="100" cy="100" fill="none" stroke-width="12" stroke="#ffffff" stroke-linecap="round" stroke-dasharray="0 502.4"></circle>
            </svg>
            <div class="user-progress__scale-text">0%</div>
          </div>
          <div class="user-progress__course-name">${item.name}
            <div class="user-progress__course-points">${item.points}</div>
          </div>
        `;
        scalesContainer.append(scale);

        let userProgress = Math.round((+item.points.split(' ')[0] / +item.maxValue) * 100);
        scale.querySelector('.user-progress__scale-text').innerText = `${userProgress}%`;
        const radius = 80;

        const circleLength = 2 * 3.14 * radius;
        let dash = (circleLength / 100) * userProgress;

        const progress = scale.querySelector(`#progress-${index}`);
        progress.setAttribute('stroke-dasharray', `${dash} ${circleLength}`);
      });
    });
});
