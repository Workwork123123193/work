export function getTime(postTime) {
  const currentTime = new Date();
  const publishedTime = new Date(postTime);

  currentTime.setMonth(currentTime.getMonth() + 1);

  const timeDiff = Math.abs(currentTime.getTime() - publishedTime.getTime());
  const hoursDiff = Math.floor(timeDiff / (1000 * 60 * 60));

  if (hoursDiff >= 24) {
    const daysDiff = Math.floor(hoursDiff / 24);
    return `${daysDiff}д`;
  } else {
    return `${hoursDiff}ч`;
  }
}
