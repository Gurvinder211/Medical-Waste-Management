// Toggle Password Visibility
const toggleHospitalPassword = document.getElementById('toggle-hospital-password');
const hospitalPasswordInput = document.getElementById('hospital-password');
const toggleCollectorPassword = document.getElementById('toggle-collector-password');
const collectorPasswordInput = document.getElementById('collector-password');

toggleHospitalPassword.addEventListener('click', () => {
  if (hospitalPasswordInput.type === 'password') {
    hospitalPasswordInput.type = 'text';
    toggleHospitalPassword.classList.remove('fa-eye');
    toggleHospitalPassword.classList.add('fa-eye-slash');
  } else {
    hospitalPasswordInput.type = 'password';
    toggleHospitalPassword.classList.remove('fa-eye-slash');
    toggleHospitalPassword.classList.add('fa-eye');
  }
});

toggleCollectorPassword.addEventListener('click', () => {
  if (collectorPasswordInput.type === 'password') {
    collectorPasswordInput.type = 'text';
    toggleCollectorPassword.classList.remove('fa-eye');
    toggleCollectorPassword.classList.add('fa-eye-slash');
  } else {
    collectorPasswordInput.type = 'password';
    toggleCollectorPassword.classList.remove('fa-eye-slash');
    toggleCollectorPassword.classList.add('fa-eye');
  }
});

// Toggle Forms Based on User Selection
const userTypeRadios = document.querySelectorAll('input[name="user-type"]');
const hospitalForm = document.getElementById('hospital-form');
const collectorForm = document.getElementById('collector-form');

userTypeRadios.forEach(radio => {
  radio.addEventListener('change', () => {
    if (radio.value === 'hospital') {
      hospitalForm.style.display = 'block';
      collectorForm.style.display = 'none';
    } else {
      hospitalForm.style.display = 'none';
      collectorForm.style.display = 'block';
    }
  });
});

// Form Validation
const signupForm = document.getElementById('signup-form');

signupForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const userType = document.querySelector('input[name="user-type"]:checked').value;

  if (userType === 'hospital') {
    const name = document.getElementById('hospital-name').value;
    const address = document.getElementById('hospital-address').value;
    const email = document.getElementById('hospital-email').value;
    const password = document.getElementById('hospital-password').value;

    if (!name || !address || !email || !password) {
      alert('Please fill in all fields.');
    } else {
      alert('Signup successful! Redirecting to login...');
      window.location.href = 'login.html'; // Redirect to login page
    }
  } else {
    const name = document.getElementById('collector-name').value;
    const companyName = document.getElementById('company-name').value;
    const licenseNumber = document.getElementById('license-number').value;
    const email = document.getElementById('collector-email').value;
    const password = document.getElementById('collector-password').value;

    if (!name || !companyName || !licenseNumber || !email || !password) {
      alert('Please fill in all fields.');
    } else {
      alert('Signup successful! Redirecting to login...');
      window.location.href = 'login.html'; // Redirect to login page
    }
  }
});