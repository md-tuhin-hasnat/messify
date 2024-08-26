const timeLog = (message, isHeadLine = false, error = false) => {
  if (isHeadLine) {
    const time = new Date().toLocaleString();
    console.log(`${time} : `);
  }
  if (error) {
    console.log(`\tError : ${message}`);
  } else {
    console.log(`\t${message}`);
  }
};

module.exports = timeLog;
