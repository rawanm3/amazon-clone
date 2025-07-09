//////////////////////products///////////////////////////
const container = document.getElementById("products-container");
container.style.display = "grid";
container.style.gridTemplateColumns = "repeat(5, 1fr)";
container.style.gap = "20px";
container.style.padding = "20px";
container.style.direction = "rtl";

fetch("js/products.json")
  .then(response => response.json())
  .then(products => {
    products.forEach(product => {
      const card = document.createElement("div");
      card.className="product-card"
      card.style.border = "0.0625rem solid #ccc";
      card.style.borderRadius = "0.625rem";
      card.style.overflow = "hidden";
      card.style.boxShadow = "0 0 0.625rem rgba(0,0,0,0.1)";
      card.style.textAlign = "center";
      card.style.padding = "0.625rem";
      card.style.fontFamily = "Arial,sans-serif";
      card.style.backgroundColor = "white";
      card.style.cursor = "pointer";
      

      const img = document.createElement("img");
      img.src = product.images[0]; 
      img.alt = product.title;
      img.style.width = "100%";
      img.style.height = "9.375rem"; 
      img.style.objectFit = "cover";
      img.style.borderBottom = "0.0625rem solid #eee";

      const title = document.createElement("div");
      title.textContent = product.title;
      title.style.fontWeight = "bold";
      title.style.margin = "0.625rem 0 0.3125rem 0";

      const desc = document.createElement("div");
      desc.textContent = product.description;
      desc.style.fontSize = "0.875rem";
      desc.style.color = "#666";
      desc.style.marginBottom = "0.625rem";

      const cat = document.createElement("div");
      cat.textContent = product.category;
      cat.style.fontSize = "0.875rem";
      cat.style.color = "red";
      cat.style.marginBottom = "0.625rem";

      const price = document.createElement("div");
      price.textContent = product.price;
      price.style.color = "green";
      price.style.fontWeight = "bold";
      price.style.fontSize = "1.125rem";

      card.appendChild(img);
      card.appendChild(title);
      card.appendChild(desc);
      card.appendChild(cat);
      card.appendChild(price);
      container.appendChild(card);
      card.addEventListener("click", () => {
        localStorage.setItem("selectedProduct", JSON.stringify(product));
        showPage("product");
        renderProductPage(product);
      });
    });
      document.getElementById("searchInput").addEventListener("input", filterProducts);
      document.getElementById("searchBtn").addEventListener("click", filterProducts);
      document.getElementById("categoryFilter").addEventListener("change", filterProducts);
  })
  
  .catch(error => {
    console.error("error", error);
  });
  //////////////////////////////////footer//////////
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
      document.getElementById("addToCart").onclick = function () {
        const user = JSON.parse(localStorage.getItem("loggedInUser"));
        const product = JSON.parse(localStorage.getItem("selectedProduct"));
      
        if (!user) {
          alert("يجب تسجيل الدخول أولاً");
          showPage("login");
          return;
        }
      
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
      
        const exists = cart.find(item => item.id === product.id);
        if (!exists) {
          cart.push(product);
          localStorage.setItem("cart", JSON.stringify(cart));
          alert("تمت الإضافة إلى السلة بنجاح");
        } else {
          alert("هذا المنتج موجود بالفعل في السلة");
        }
      };
      
    }
card.addEventListener("click", () => {
  localStorage.setItem("selectedProduct", JSON.stringify(product));
  showPage("product");
  renderProductPage(product);
});

function renderCart() {
  const cartItemsContainer = document.getElementById("cartItems");
  cartItemsContainer.innerHTML = "";
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let total = 0;

  cart.forEach(product => {
    const item = document.createElement("div");
    item.className = "card mb-3";

    const priceNumber = parseFloat(product.price.replace(/[^\d.]/g, "")) || 0;
    total += priceNumber;

    item.innerHTML = `
      <div class="row g-0 align-items-center">
        <div class="col-md-2 text-center">
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
function removeFromCart(id) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart = cart.filter(item => item.id !== id);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

function goToCart() {
  showPage("cart");
  renderCart();
}


