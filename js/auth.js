// Check if user is already logged in
if (window.location.pathname.includes("login.html") && localStorage.getItem("loggedInUser")) {
    window.location.href = "index.html";
  }
  
  // Signup logic
  function signup() {
    const username = document.getElementById("signup-username").value.trim();
    const password = document.getElementById("signup-password").value.trim();
  
    if (!username || !password) {
      alert("Please enter both username and password.");
      return;
    }
  
    // Dummy email format check
    if (!username.includes("@") || !username.includes(".")) {
      alert("Please enter a valid email address.");
      return;
    }
  
    // Store user in localStorage
    localStorage.setItem("user", JSON.stringify({ username, password }));
    alert("Signup successful! Please log in.");
    window.location.href = "login.html";
  }
  
  // Login logic
  function login() {
    const username = document.getElementById("login-username").value.trim();
    const password = document.getElementById("login-password").value.trim();
  
    const storedUser = JSON.parse(localStorage.getItem("user"));
  
    if (!storedUser) {
      alert("No user found. Please sign up first.");
      return;
    }
  
    if (username === storedUser.username && password === storedUser.password) {
      localStorage.setItem("loggedInUser", username);
      alert("Login successful!");
      window.location.href = "index.html";
    } else {
      alert("Invalid credentials.");
    }
  }
  
  // Optional: Logout utility (add in other pages if needed)
  function logout() {
    localStorage.removeItem("loggedInUser");
    window.location.href = "login.html";
  }
  