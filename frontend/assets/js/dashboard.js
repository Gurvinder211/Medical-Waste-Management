const socket = io("http://localhost:5000");

socket.on("locationUpdate", (data) => {
  console.log("Live tracking update:", data);
  updateMap(data.lat, data.lon);
});
