// register
function registerUser() {
    const username = document.getElementById("regUsername").value;
    const password = document.getElementById("regPassword").value;
  
    if (!username || !password) {
      alert(" Please enter your username and password");
      return;
    }
  
    let users = JSON.parse(localStorage.getItem("users")) || [];
    if (users.find(u => u.username === username)) {
      alert("User name is already used");
      return;
    }
  
    users.push({ username, password });
    localStorage.setItem("users", JSON.stringify(users));
    alert("You have registered successfully, you can log in now.");
    showPage("login");
  }
  
  // login
  function loginUser() {
    const username = document.getElementById("loginUsername").value;
    const password = document.getElementById("loginPassword").value;
  
    let users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(u => u.username === username && u.password === password);
  
    if (!user) {
      alert(" The login information is incorrect ");
      return;
    }
  
    localStorage.setItem("loggedInUser", JSON.stringify(user));
    alert("Logged in successfully");
    showPage("home");
    const welcome = document.getElementById("loginNav");
    if (welcome) welcome.innerText = `${"hello, "+user.username}`;
  }
  
  // logout
  function logoutUser() {
    localStorage.removeItem("loggedInUser");
    alert("You are logged out");
    showPage("login");
  }
  