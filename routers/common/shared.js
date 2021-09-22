module.exports = getUniqueName = () => {
  const dt = new Date();
  return (
    String(
      dt.getFullYear() +
        dt.getMonth() +
        dt.getDay() +
        dt.getHours() * 3600 +
        dt.getMinutes() * 60 +
        dt.getSeconds()
    ) + (Math.random() * 100).toFixed()
  );
};
