import { io } from "socket.io-client";

const userData = JSON.parse(localStorage.getItem("user") || "{}");
const socket = io("http://localhost:5000", {
  auth: userData,
});
export default socket;
