function showPage(pageId) {
  const sections = document.querySelectorAll("section");
  sections.forEach(section => {
    section.style.display = "none";
  });
  const target = document.getElementById(pageId);
  if (target) {
    target.style.display = "block";
  }

}
// register
function register() {
    const username = document.getElementById("regUname").value;
    const password = document.getElementById("regPass").value;
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
  
  // log in
  function login() {
    const username = document.getElementById("loginUname").value;
    const password = document.getElementById("loginPass").value;
  
    let users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(u => u.username === username && u.password === password);
  
    if (!user) {
      alert(" The login information is incorrect ");
      return;
    }
  
    localStorage.setItem("loggedInUser", JSON.stringify(user));
    alert("Logged in successfully");
    const welcome = document.getElementById("loginNav");
    if (welcome) welcome.innerText = `${"hello, "+user.username}`;
    sign();
    showPage("home");
    updateCartCount(); // ← بعد تسجيل الدخول

  }
  
// Logout
// function logoutUser() {
//   localStorage.removeItem("loggedInUser");
//   alert("You are logged out");
//   sign();
//   showPage("home");
//   document.getElementById("loginNav").style.display = "inline-block";
//   document.getElementById("logoutNav").style.display = "none";
// }
function logoutUser() {
  const user = JSON.parse(localStorage.getItem("loggedInUser"));

  // امسح سلة المستخدم الحالي إن وُجد
  if (user) {
    localStorage.removeItem(`cart_${user.username}`);
  }

  // امسح تسجيل الدخول
  localStorage.removeItem("loggedInUser");

  alert("You are logged out");
  sign(); // تحديث الـ nav
  updateCartCount(); // تحديث رقم السلة إلى 0
  showPage("home");

  // تحديث الأزرار
  document.getElementById("loginNav").style.display = "inline-block";
  document.getElementById("logoutNav").style.display = "none";
}

function sign() {
  const user = JSON.parse(localStorage.getItem("loggedInUser"));
  const loginBtn = document.getElementById("loginNav");
  const logoutBtn = document.getElementById("logoutNav");

  if (user) {
    if (loginBtn) {
      loginBtn.innerText = `Hello, ${user.username}`; // ← النص بيتغير هنا
      loginBtn.style.display = "inline-block";
    }
    if (logoutBtn) logoutBtn.style.display = "inline-block";
  } else {
    if (loginBtn) {
      loginBtn.innerText = "Hello, Sign in"; // ← يرجع زي ما كان
      loginBtn.style.display = "inline-block";
    }
    if (logoutBtn) logoutBtn.style.display = "none";
  }
}


window.onload = function () {
  sign();
  showPage("home");
};

