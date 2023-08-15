const formatHM = (date) => {
  var normDate = new Date(date);
  return normDate.toLocaleTimeString(undefined, {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
};

export default formatHM;
