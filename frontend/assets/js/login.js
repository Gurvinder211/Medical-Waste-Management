document.addEventListener("DOMContentLoaded", () => {
  // Password visibility toggle
  document.querySelectorAll(".toggle-password").forEach(icon => {
    icon.addEventListener("click", () => {
      const targetId = icon.getAttribute("data-target");
      const passwordInput = document.getElementById(targetId);
      if (passwordInput.type === "password") {
        passwordInput.type = "text";
        icon.classList.add("fa-eye-slash");
      } else {
        passwordInput.type = "password";
        icon.classList.remove("fa-eye-slash");
      }
    });
  });

  // Handle Login Form Submission
  document.getElementById("login-form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;

    try {
      const response = await fetch("https://medical-waste-management.onrender.com/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });
      
      const data = await response.json();
      
      if (response.ok) {
        alert("Login successful!");
        // Save JWT token to localStorage and redirect to dashboard
        sessionStorage.setItem("token", data.token); 
        console.log("Token saved:", data.token);
        window.location.href = "dashboard.html";
      } else {
        alert(data.message || "Login failed!");
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("An error occurred. Please try again.");
    }
  });
});
