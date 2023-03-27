const setAlarmButton = document.getElementById('setAlarmButton');
const stopAlarmButton = document.getElementById('stopAlarmButton');
const alarmSound = document.getElementById('alarmSound');
let alarmTimeout;

setInterval(() => {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();
  const timeString = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  document.getElementById('currentTime').textContent = timeString;
}, 1000);

setAlarmButton.addEventListener('click', (event) => {
  event.preventDefault();

  const hoursInput = document.getElementById('hours');
  const minutesInput = document.getElementById('minutes');
  const alarmTime = new Date();
  alarmTime.setHours(hoursInput.value);
  alarmTime.setMinutes(minutesInput.value);
  alarmTime.setSeconds(0);

  const currentTime = new Date();
  const timeDifference = alarmTime.getTime() - currentTime.getTime();

  if (timeDifference < 0) {
    alert('Please set a valid alarm time in the future.');
    return;
  }

  alarmTimeout = setTimeout(() => {
    alarmSound.play();
    stopAlarmButton.disabled = false;
  }, timeDifference);

  setAlarmButton.disabled = true;
  hoursInput.disabled = true;
  minutesInput.disabled = true;
});

stopAlarmButton.addEventListener('click', () => {
	clearTimeout(alarmTimeout);
	alarmSound.pause();
	alarmSound.currentTime = 0;
	stopAlarmButton.disabled = true;
	setAlarmButton.disabled = false;
	document.getElementById('hours').disabled = false;
	document.getElementById('minutes').disabled = false;
	});
