const app = require("./app");
const { serverPort } = require("./secrets");
const log = require("./log/timelog");
const port = serverPort || 3000;

app.listen(port, () => {
  log(`Server is running at http://localhost:${port}`, true);
});
