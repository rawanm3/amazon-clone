let filteredProducts = [];      // بعد تطبيق الفلاتر
let activeCategory = "";        // الفئة المختارة
let activeColor    = "";        // اللون المختار
let activePrice    = "";        // نطاق السعر المختار "min-max"

const filterContainer   = document.getElementById("filteredProductsContainer");
const noMsg = document.getElementById("noResultsMsg");

// products card in search
function createCard(product) {
  const card = document.createElement("div");
  card.className = "card col-12 col-sm-5 col-md-4 p-2";
  card.style.maxWidth = "200px";
  card.innerHTML = `
    <img src="${product.images[0]}" class="card-img-top" style="height:130px;object-fit:cover">
    <div class="card-body p-2">
      <h6 class="card-title">${product.title}</h6>
      <p class="card-text small text-muted">${product.description}</p>
      <p class="fw-bold text-success">${product.price}</p>
    </div>`;
  filterContainer.appendChild(card);
  card.onclick = () => {
    localStorage.setItem("selectedProduct", JSON.stringify(product));
    showPage("product");
    renderProductPage(product);
  };
}

//
function renderProductPage(product) {
    document.getElementById("mainImage").src = product.images[0];
    document.getElementById("Title").textContent = product.title;
    document.getElementById("Price").textContent = product.price;
    document.getElementById("Desc").textContent = product.description;
    document.getElementById("category").textContent = product.category;

    const thumbContainer = document.getElementById("thumbContainer");
    thumbContainer.innerHTML = ""; 
    // fetching images
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
        updateCartCount();
        localStorage.setItem("cart", JSON.stringify(cart));
        alert("تمت الإضافة إلى السلة بنجاح");
      } else {
        alert("هذا المنتج موجود بالفعل في السلة");
      }
      //اضافة العداد الارقام 
      document.getElementById("nav-cart-count").textContent = cart.length;

    };
    
  }

//render products

  function render(list) {
  filterContainer.innerHTML = "";
  if (!list.length) {
    noMsg.style.display = "block";
    return;
  }
  noMsg.style.display = "none";
  list.forEach(createCard);
}

//filtered products

function applyFilters() {
  filteredProducts = allProducts.filter(p => {
    const catOK  = !activeCategory || p.category === activeCategory;
    const colorOK= !activeColor || (p.colors && p.colors.includes(activeColor));
    const priceOK= (() => {
      if (!activePrice) return true;
      const [min,max] = activePrice.split("-").map(Number);
      const num = typeof p.price === "number"
                  ? p.price
                  : parseFloat(String(p.price).replace(/[^\d.]/g,""));
      return num >= min && num <= max;
    })();
    return catOK && colorOK && priceOK;
  });
  render(filteredProducts);
}

// linking buttons
// category
document.querySelectorAll(".category-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    activeCategory = btn.dataset.category;   // "" تعني الكل
    applyFilters();
  });
});
// color
document.querySelectorAll(".color-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    activeColor = btn.dataset.color;         // "" = لا فلتر
    applyFilters();
  });
});
// price
document.querySelectorAll(".price-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    activePrice = btn.dataset.price;         // "" = لا فلتر
    applyFilters();
  });
});

//clear filter button
const clear = document.getElementById("clearFilters");
if (clear) clear.addEventListener("click", () => {
  activeCategory = activeColor = activePrice = "";
  applyFilters();
});

// fetching data
fetch("js/products.json")
  .then(r => r.json())
  .then(data => {
    allProducts = data;
    render(allProducts);           // render products
  })
  .catch(err => console.error(err));

// searchByDescription
function searchByDescription() {
  const q = document.getElementById("homeSearch").value.toLowerCase();
  showMoreBtn.style.display = "none";              // hide view more btn
  
  const result = allProducts.filter(p =>          //  all products
    p.description.toLowerCase().includes(q)
    || p.title.toLowerCase().includes(q)       // by title
  );
  
  container.innerHTML = "";
  result.forEach(createProductCard);           // show only filtered products
  showMoreBtn.style.display = "none";          // hide view more btn
}
document.getElementById("homeSearch").addEventListener("input", searchByDescription);
  