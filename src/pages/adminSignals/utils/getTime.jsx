export function getTimeInMoscowTimeZone(creationDate) {
  const dateTime = new Date(creationDate);
  const moscowDateTime = new Date(dateTime.toLocaleString('en-US', { timeZone: 'Europe/Moscow' }));

  const hours = moscowDateTime.getHours().toString().padStart(2, '0');
  const minutes = moscowDateTime.getMinutes().toString().padStart(2, '0');

  return `${hours}:${minutes}`;
}
