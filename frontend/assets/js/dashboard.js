const socket = io("http://localhost:5000");

socket.on("locationUpdate", (data) => {
  console.log("Live tracking update:", data);
  updateMap(data.lat, data.lon);
});

async function checkAccess() {
  const token = localStorage.getItem("token");

  if (!token) {
    alert("Unauthorized! Please log in.");
    window.location.href = "login.html"; // Redirect if not logged in
    return;
  }

  try {
    const response = await fetch("http://localhost:5000/api/auth", {
      method: "GET",
      headers: { Authorization: "Bearer " + token },
    });

    if (response.status === 401 || response.status === 403) {
      alert("Access Denied!");
      window.location.href = "login.html"; // Redirect unauthorized users
    } else if (response.ok) {
      const user = await response.json();
      console.log("User Data:", user);

      // Redirect users based on role
      if (user.role === "hospital") {
        document.getElementById("collector-section").style.display = "none";
        document.getElementById("admin-section").style.display = "none";
      } else if (user.role === "collector") {
        document.getElementById("hospital-section").style.display = "none";
        document.getElementById("admin-section").style.display = "none";
      } else if (user.role === "admin") {
        // Admin has access to all sections
      }
    }
  } catch (error) {
    console.error("Error:", error);
    window.location.href = "login.html"; // Redirect on failure
  }
}

// Run check when page loads
window.onload = checkAccess;

