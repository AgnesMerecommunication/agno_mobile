export function formateTime(date: Date) {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const hoursFinish = hours <= 9 ? `0${hours}` : hours;
  const minutesFinish = minutes <= 9 ? `0${minutes}` : minutes;
  const timeFinish = `${hoursFinish}:${minutesFinish}`;
  return timeFinish;
}
