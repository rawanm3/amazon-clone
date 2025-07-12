function cartKey() {
  const user = JSON.parse(localStorage.getItem("loggedInUser"));
  return user ? `cart_${user.username}` : "cart_guest";
}
/* === ترحيل سلة cart القديمة إلى cart_<username> === */
(function migrateOldCart() {
  const old = localStorage.getItem("cart");        // السلة القديمة
  if (!old) return;                                // لا توجد بيانات قديمة
  const user = JSON.parse(localStorage.getItem("loggedInUser"));
  if (!user) return;                               // يجب أن يكون المستخدم مسجَّلاً
  const newKey = `cart_${user.username}`;
  if (!localStorage.getItem(newKey)) {             // لا تنقل لو المفتاح الجديد موجود
    localStorage.setItem(newKey, old);             // نسخ البيانات
  }
  localStorage.removeItem("cart");                 // احذف المفتاح العام
})();


const container = document.getElementById("products-container");
container.className="products-container"
const showMoreBtn = document.getElementById("showMoreBtn");

window.addEventListener("DOMContentLoaded", () => {
  updateCartCount();
});

let allProducts = [];        // all products from JSON
let productsNum = 8;           // number of products to show every time 
let numOfProducts = 0;             // current numder products shown after  view more clicked

function createProductCard(product) {
  const card = document.createElement("div");
  card.className="product-card"
  card.style.border = "0.0625rem solid #ccc";
  card.style.borderRadius = "0.625rem";
  card.style.overflow = "hidden";
  card.style.boxShadow = "0 0 0.625rem rgba(0,0,0,0.1)";
  card.style.textAlign = "center";
  // card.style.padding = "0.625rem";
  card.style.fontFamily = "Arial,sans-serif";
  card.style.backgroundColor = "white";
  card.style.cursor = "pointer";

  const img = document.createElement("img");
  img.src = product.images[0]; 
  img.alt = product.title;
  img.style.width = "100%";
  img.style.height = "20rem"; 
  img.style.objectFit = "cover";
  img.style.borderBottom = "0.0625rem solid #eee";
  
  const title = document.createElement("div");
  title.style.textAlign = "left";
  title.textContent = product.title;
  title.style.fontWeight = "bold";
  title.style.margin = "0.625rem 0 0.3125rem 0";
  
  const desc = document.createElement("div");
  desc.style.textAlign = "left";
  desc.textContent = product.description;
  desc.style.fontSize = "0.875rem";
  desc.style.color = "#666";
  desc.style.marginBottom = "0.625rem";
  
  const cat = document.createElement("div");
  cat.textContent = product.category;
  cat.style.textAlign = "left";
  cat.style.fontSize = "0.875rem";
  cat.style.color = "#666";
  cat.style.marginBottom = "0.625rem";
  
  const price = document.createElement("div");
  price.textContent = product.price;
  price.style.textAlign = "left";
  price.style.color = "#c45500";
  price.style.fontWeight = "bold";
  price.style.fontSize = "1.125rem";
  
  const infoContainer = document.createElement("div");
  infoContainer.style.padding = "1.125rem";
  
  card.appendChild(img);
  card.appendChild(infoContainer)
  infoContainer.appendChild(title);
  infoContainer.appendChild(desc);
  infoContainer.appendChild(cat);
  infoContainer.appendChild(price);
  container.appendChild(card); 
  card.onclick = () => {
      localStorage.setItem("selectedProduct", JSON.stringify(product));
      showPage("product");
      renderProductPage(product);
    };
}

// show more btn  

function renderProductNum() {
  const viewMore = allProducts.slice(numOfProducts,numOfProducts + productsNum);
  viewMore.forEach(createProductCard);
  numOfProducts += viewMore.length;
  if (numOfProducts >= allProducts.length) {
    showMoreBtn.style.display = "none";  
  }
}
showMoreBtn.addEventListener("click", renderProductNum);
  fetch("js/products.json")
  .then(res => res.json())
  .then(products => {
    allProducts = products;
    renderProductNum();  // show first 8 products
})
// footer
const link = document.getElementById("a1");
link.addEventListener("mouseover",function(){
  link.style.textDecoration="underline";
})
link.addEventListener("mouseout",function(){
  link.style.textDecoration="none";
})
const link1 = document.getElementById("a2");
  link1.addEventListener("mouseover",function(){
  link1.style.textDecoration="underline";
})
link1.addEventListener("mouseout",function(){
  link1.style.textDecoration="none";
})
const link2 = document.getElementById("a3");
  link2.addEventListener("mouseover",function(){
  link2.style.textDecoration="underline";
})
link2.addEventListener("mouseout",function(){
  link2.style.textDecoration="none";
})

// render products to cart when clicked
function renderProductPage(product) {
  document.getElementById("mainImage").src = product.images[0];
  document.getElementById("Title").textContent = product.title;
  document.getElementById("Price").textContent = product.price;
  document.getElementById("Desc").textContent = product.description;
  document.getElementById("category").textContent = product.category;
  const thumbContainer = document.getElementById("thumbContainer");
  thumbContainer.innerHTML = ""; 

  product.images.forEach((imgSrc, index) => {
   const thumb = document.createElement("img");
   thumb.src = imgSrc;
   thumb.className = "thumb-img";
    
   if (index === 0) {
    thumb.classList.add("active");
   }
   thumb.addEventListener("click", () => {
   document.getElementById("mainImage").src = imgSrc;
   // active
   const allThumbs = document.querySelectorAll(".thumb-img");
    allThumbs.forEach(t => t.classList.remove("active"));
    thumb.classList.add("active");
   });
    thumbContainer.appendChild(thumb);
  });
  const colorsDiv = document.getElementById("colors");
  colorsDiv.innerHTML = ""; 
    product.colors.forEach(color => {
      const span = document.createElement("span");
      span.className = "color-bg";
      span.setAttribute("data-color", color);
      span.style.backgroundColor = color;
      colorsDiv.appendChild(span);
    });
    document.getElementById("addToCart").onclick = () => {
      const user = JSON.parse(localStorage.getItem("loggedInUser"));
      if (!user) { alert("سجِّل الدخول"); return; }
    
      const product = JSON.parse(localStorage.getItem("selectedProduct"));
      let cart = JSON.parse(localStorage.getItem(cartKey())) || [];
    
      if (!cart.find(item => item.id === product.id)) {
        cart.push(product);
        localStorage.setItem(cartKey(), JSON.stringify(cart));
        updateCartCount();          // ← بعد التخزين
        alert("تمت الإضافة");
      } else {
        alert("موجود مسبقاً");
      }
    };
        
}

//

// card.addEventListener("click", () => {
//   localStorage.setItem("selectedProduct", JSON.stringify(product));
//   showPage("product");
//   renderProductPage(product);
// });

//





//

function renderCart() {
  const cartItemsContainer = document.getElementById("cartItems");
  cartItemsContainer.innerHTML = "";
  let cart = JSON.parse(localStorage.getItem(cartKey())) || [];
  let total = 0;

  cart.forEach(product => {
    const item = document.createElement("div");
    item.className = "card mb-3";

    const priceNumber = parseFloat(product.price.replace(/[^\d.]/g, "")) || 0;
    total += priceNumber;

    item.innerHTML = `
      <div class="row g-0 align-items-center">
        <div class="col-md-2 ">
          <img src="${product.thumbnail}" class="product-img" alt="Product Image" style="width:80px;">
        </div>
        <div class="col-md-6">
          <div class="card-body">
            <h5 class="card-title">${product.title}</h5>
            <p class="card-text text-muted">${product.price}</p>
          </div>
        </div>
        <div class="col-md-4 text-end pe-3">
          <p class="fw-bold">${product.price}</p>
          <button class="btn btn-danger btn-sm" onclick="removeFromCart('${product.id}')">Remove</button>
        </div>
      </div>
    `;
    cartItemsContainer.appendChild(item);

  });

  document.getElementById("totalPrice").textContent = `Total: EGP ${total.toLocaleString()}`;
}
//

function removeFromCart(id) {
  let cart = JSON.parse(localStorage.getItem(cartKey())) || [];
  cart = cart.filter(item => item.id !== id);
  localStorage.setItem(cartKey(), JSON.stringify(cart));  
  renderCart();
  updateCartCount();
}

//

function goToCart() {
  showPage("cart");
  renderCart();
  updateCartCount();
}

//كود ال checkout 

function showPage(pageId) {
  const sections = document.querySelectorAll("section");
  sections.forEach(section => {
    section.style.display = "none";
  });
  document.getElementById(pageId).style.display = "block";
}

//

function renderCheckout() {
  const checkoutItemsContainer = document.getElementById("checkoutItems");
  checkoutItemsContainer.innerHTML = "";

  let cart = JSON.parse(localStorage.getItem(cartKey())) || [];
  let total = 0;

  if (cart.length === 0) {
    checkoutItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
    document.getElementById("checkoutTotal").textContent = "Total: EGP 0.00";
    return;
  }

  cart.forEach(product => {
    const priceNumber = parseFloat(product.price.replace(/[^\d.]/g, "")) || 0;
    total += priceNumber;

    const item = document.createElement("div");
    item.className = "card mb-3";

    item.innerHTML = `
      <div class="row g-0 align-items-center">
        <div class="col-md-2">
          <img src="${product.thumbnail}" class="img-fluid rounded-start" alt="Product Image">
        </div>
        <div class="col-md-10">
          <div class="card-body">
            <h5 class="card-title">${product.title}</h5>
            <p class="card-text">${product.price}</p>
          </div>
        </div>
      </div>
    `;

    checkoutItemsContainer.appendChild(item);
  });

  document.getElementById("checkoutTotal").textContent = `Total: EGP ${total.toLocaleString()}`;
}

//

function checkout() {
  let cart = JSON.parse(localStorage.getItem(cartKey())) || [];

  if (cart.length === 0) {
    alert("السلة فارغة!");
    return;
  }

  const address = document.getElementById("address").value;
  const phone = document.getElementById("phone").value;
  const date = document.getElementById("date").value;

  if (!address || !phone || !date) {
    alert("من فضلك املأ جميع بيانات الشحن قبل إتمام الشراء.");
    return;
  }

  let message = `✅ تمت عملية الشراء بنجاح!\n\n`;
  message += `📦 Shipping Address: ${address}\n`;
  message += `📞 Phone Number: ${phone}\n`;
  message += `🗓 Shopping Date: ${date}\n\n`;
  message += `شكرا لتسوقك معنا!`;

  alert(message);

  // فضي السلة بعد الشراء
  localStorage.removeItem(cartKey());
  document.getElementById("nav-cart-count").textContent = "0";

  // رجعي المستخدم للـ home
  showPage("home");
  renderCart();
}
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem(cartKey())) || [];
  document.getElementById("nav-cart-count").textContent = selectedProduct.length;
}