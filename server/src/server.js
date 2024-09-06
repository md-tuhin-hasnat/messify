const app = require("./app");
const { serverPort } = require("./secrets");
const log = require("./log/timelog");
const connectDb = require("./config/db");
const port = serverPort || 3000;

app.listen(port, async () => {
  log(`Server is running at http://localhost:${port}`, true);
  await connectDb();
});
