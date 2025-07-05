function showPage(pageId) {
    const sections = document.querySelectorAll("section");
    sections.forEach(section => {
      section.style.display = "none";
    });
  
    const target = document.getElementById(pageId);
    if (target) {
      target.style.display = "block";
    }
  

window.onload = function () {
    const user = JSON.parse(localStorage.getItem("loggedInUser"));
  
    const welcome = document.getElementById("welcomeMsg");
    const loginBtn = document.getElementById("loginNav");
    const logoutBtn = document.getElementById("logoutNav");
  
    if (user) {
      if (welcome) welcome.innerText = `${user.username}`;
      if (loginBtn) loginBtn.style.display = "none";
      if (logoutBtn) logoutBtn.style.display = "inline-block";
    } else {
      if (welcome) welcome.innerText = "home";
      if (loginBtn) loginBtn.style.display = "inline-block";
      if (logoutBtn) logoutBtn.style.display = "none";
    }
  
    showPage("home"); 
  };
}