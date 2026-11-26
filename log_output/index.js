const crypto = require("crypto");

const randomString = crypto.randomUUID();

const printLog = () => {
  console.log(`${new Date().toISOString()}: ${randomString}`);
};

printLog();
setInterval(printLog, 5000);
