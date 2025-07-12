// changing sections
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
// username validation
function isValidUsername(username) {
  const usernameRegex = /^[A-Za-z0-9]{3,15}$/;
  return usernameRegex.test(username);
}

function isValidPassword(password) {
  const upper = /[A-Z]/.test(password);
  const lower = /[a-z]/.test(password);
  const digit = /[0-9]/.test(password);
  const special = /[^A-Za-z0-9]/.test(password);
  return password.length >= 8 && upper && lower && digit && special;
}
// register
function register() {
  const username = document.getElementById("regUname").value;
  const password = document.getElementById("regPass").value;
    if (!username || !password) {
      alert(" Please enter your username and password");
      return;
    }
     // تحقق من الفراغ
    if (!username || !password) {
    alert("يجب إدخال اسم المستخدم وكلمة المرور");
    return;
    }
    if (!isValidUsername(username)) {
    alert("اسم المستخدم يجب أن يكون من 3 إلى 15 حرفًا/رقمًا بدون رموز أو مسافات");
    return;
    }

    if (!isValidPassword(password)) {
    alert("كلمة المرور يجب أن تكون 8 أحرف على الأقل وتحتوي على حرف كبير وصغير ورقم ورمز خاص");
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
  // updateCartCount(); // تحديث رقم السلة إلى 0
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

