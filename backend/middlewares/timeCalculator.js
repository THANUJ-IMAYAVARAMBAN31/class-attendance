const calculateTime = (timeIn, timeOut) => {
  const diff = timeOut - timeIn;
  return Math.floor(diff / 60000); // NUMBER ONLY
};
module.exports ={calculateTime};