document.addEventListener("DOMContentLoaded", () => {
  const hospitalForm = document.getElementById("hospital-form");
  const collectorForm = document.getElementById("collector-form");
  const userTypeInputs = document.querySelectorAll('input[name="user-type"]');

  // Toggle forms based on user selection
  userTypeInputs.forEach(input => {
    input.addEventListener("change", (e) => {
      if (e.target.value === "hospital") {
        hospitalForm.style.display = "block";
        collectorForm.style.display = "none";
      } else {
        hospitalForm.style.display = "none";
        collectorForm.style.display = "block";
      }
    });
  });

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

  // Signup Form Submission
  document.getElementById("signup-form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const userType = document.querySelector('input[name="user-type"]:checked').value;
    let userData = {};

    if (userType === "hospital") {
      userData = {
        name: document.getElementById("hospital-name").value,
        address: document.getElementById("hospital-address").value,
        email: document.getElementById("hospital-email").value,
        password: document.getElementById("hospital-password").value,
        role: "provider",
      };
    } else {
      userData = {
        name: document.getElementById("collector-name").value,
        companyName: document.getElementById("company-name").value,
        licenseNumber: document.getElementById("license-number").value,
        email: document.getElementById("collector-email").value,
        password: document.getElementById("collector-password").value,
        role: "taker",
      };
    }

    try {
      const response = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Signup successful! Redirecting to login...");
        window.location.href = "login.html";
      } else {
        alert(data.message || "Signup failed");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error signing up. Try again.");
    }
  });
});
