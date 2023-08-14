export const getTimes = (dateTime) => {
  const options = { timeZone: 'UTC', hour12: false };
  const day = dateTime.getDate() - 1;
  const year = dateTime.getFullYear();
  const time = dateTime.toLocaleTimeString('en-US', options).substring(0, 5);

  return {
    day,
    year,
    time,
  };
};
