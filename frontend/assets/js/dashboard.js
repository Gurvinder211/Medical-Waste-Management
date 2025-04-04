// const socket = io("https://medical-waste-management.onrender.com");

// socket.on("locationUpdate", (data) => {
//   console.log("Live tracking update:", data);
//   updateMap(data.lat, data.lon);
// });

async function checkAccess() {
  const token = sessionStorage.getItem("token");
  console.log("Token from localStorage:", token);  // Debug

  if (!token) {
    alert("Unauthorized! Please log in.");
    window.location.href = "login.html"; // Redirect if not logged in
    return;
  }

  try {
    const response = await fetch("https://medical-waste-management.onrender.com/api/auth", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin" : "*", 
      "Access-Control-Allow-Credentials" : true,
       },
      credentials: "include"
  
    }).then(response => response.json())
    .then(data => console.log("Response:", data))
    .catch(error => console.error("Fetch Error:", error));

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
window.onload = checkAccess;


// Run check when page loads


