import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:9393",
  headers: {
    "Content-type": "application/json"
  }
});