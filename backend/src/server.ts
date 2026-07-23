// import "dotenv/config";
import "dotenv/config";
import server from "./app";
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log("project runnint on port 5000");
});
