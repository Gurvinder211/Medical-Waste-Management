// const socket = io("https://medical-waste-management.onrender.com");

// socket.on("locationUpdate", (data) => {
//   console.log("Live tracking update:", data);
//   updateMap(data.lat, data.lon);
// });

async function checkAccess() {
  const token = sessionStorage.getItem("token");
  console.log("Token from sessionStorage:", token); // Confirm the token exists

  if (!token) {
    alert("Unauthorized! Please log in.");
    window.location.href = "login.html";
    return;
  }

  try {
    const response = await fetch("https://medical-waste-management.onrender.com/api/auth", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      credentials: "include"
    });

    console.log("Raw Response:", response.status); // Debug

    if (!response.ok) {
      alert("Access Denied!");
      window.location.href = "login.html";
      return;
    }

    const data = await response.json();
    console.log("User Data:", data);

    const user = data.user;

    // Show/hide sections based on role
    if (user.role === "hospital") {
      document.getElementById("collector-section").style.display = "none";
      document.getElementById("admin-section").style.display = "none";
    } else if (user.role === "collector") {
      document.getElementById("hospital-section").style.display = "none";
      document.getElementById("admin-section").style.display = "none";
    } else if (user.role === "admin") {
      // Admin sees everything
    }

  } catch (error) {
    console.error("Access check failed:", error);
    window.location.href = "login.html";
  }
}

window.onload = checkAccess;
