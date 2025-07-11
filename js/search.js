// let allProducts = [];
// let activeCategory = "";
// let activeColor = "";
// let activePrice = "";

// const filteredContainer = document.getElementById("filteredProductsContainer");
// const noResultsMsg = document.getElementById("noResultsMsg");

// // تحميل المنتجات من ملف JSON
// fetch("js/products.json")
//   .then(response => response.json())
//   .then(data => {
//     allProducts = data.slice(0, 50); // لو عايز أول 50 منتج فقط
//     renderFilteredProducts(allProducts);
//   })
//   .catch(error => console.error("فشل تحميل المنتجات", error));

// // دالة عرض المنتجات
// function renderFilteredProducts(products) {
//   filteredContainer.innerHTML = "";
//   if (products.length === 0) {
//     noResultsMsg.style.display = "block";
//     return;
//   } else {
//     noResultsMsg.style.display = "none";
//   }

//   products.forEach(product => {
//     const card = document.createElement("div");
//     card.className = "product-card";
//     card.style.border = "1px solid #ccc";
//     card.style.borderRadius = "10px";
//     card.style.padding = "10px";
//     card.style.width = "100%";
//     card.style.maxWidth = "250px";
//     card.style.background = "#fff";
//     card.style.cursor = "pointer";

//     const img = document.createElement("img");
//     img.src = product.images[0];
//     img.style.width = "100%";
//     img.style.height = "180px";
//     img.style.objectFit = "cover";

//     const title = document.createElement("h6");
//     title.textContent = product.title;
//     title.style.fontWeight = "bold";
//     title.style.margin = "10px 0";

//     const price = document.createElement("p");
//     price.textContent = product.price + " جنيه";
//     price.style.color = "green";

//     card.appendChild(img);
//     card.appendChild(title);
//     card.appendChild(price);
//     card.addEventListener("click", () => {
//       localStorage.setItem("selectedProduct", JSON.stringify(product));
//       showPage("product");
//       renderProductPage(product);
//     });

//     filteredContainer.appendChild(card);
//   });
// }

// // تطبيق الفلتر
// function applyFilters() {
//   let filtered = allProducts;

//   if (activeCategory) {
//     filtered = filtered.filter(p => p.category === activeCategory);
//   }

//   if (activeColor) {
//     filtered = filtered.filter(p => p.colors && p.colors.includes(activeColor));
//   }

//   if (activePrice) {
//     const [min, max] = activePrice.split("-").map(Number);
//     filtered = filtered.filter(p => p.price >= min && p.price <= max);
//   }

//   renderFilteredProducts(filtered);
// }

// // فلترة حسب الفئة
// document.querySelectorAll(".category-btn").forEach(btn => {
//   btn.addEventListener("click", () => {
//     activeCategory = btn.dataset.category;
//     applyFilters();
//   });
// });

// // فلترة حسب اللون
// document.querySelectorAll(".color-btn").forEach(btn => {
//   btn.addEventListener("click", () => {
//     activeColor = btn.dataset.color;
//     applyFilters();
//   });
// });

// // فلترة حسب السعر
// document.querySelectorAll(".price-btn").forEach(btn => {
//   btn.addEventListener("click", () => {
//     activePrice = btn.dataset.price;
//     applyFilters();
//   });
// });

// // زر مسح الفلاتر
// document.getElementById("clearFilters").addEventListener("click", () => {
//   activeCategory = "";
//   activeColor = "";
//   activePrice = "";
//   renderFilteredProducts(allProducts);
// });
/* ------------ تحميل البيانات من products.json ------------ */
/* ====== متغيّرات عامّة ====== */

/* ============= متغيرات عامة ============= */
let filteredProducts = [];      // بعد تطبيق الفلاتر

let activeCategory = "";        // الفئة المختارة
let activeColor    = "";        // اللون المختار
let activePrice    = "";        // نطاق السعر المختار "min-max"

const box   = document.getElementById("filteredProductsContainer");
const noMsg = document.getElementById("noResultsMsg");

/* ============= كارت منتج ============= */
function createCard(p) {
  const card = document.createElement("div");
  card.className = "card col-12 col-sm-5 col-md-4 p-2";
  card.style.maxWidth = "200px";
  card.innerHTML = `
    <img src="${p.images[0]}" class="card-img-top" style="height:130px;object-fit:cover">
    <div class="card-body p-2">
      <h6 class="card-title">${p.title}</h6>
      <p class="card-text small text-muted">${p.description}</p>
      <p class="fw-bold text-success">${p.price}</p>
    </div>`;
  box.appendChild(card);
}

/* ============= عرض القائمة ============= */
function render(list) {
  box.innerHTML = "";
  if (!list.length) {
    noMsg.style.display = "block";
    return;
  }
  noMsg.style.display = "none";
  list.forEach(createCard);
}

/* ============= فلترة حسب المتغيرات النشطة ============= */
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

/* ============= أربط الأزرار ============= */
// فئة
document.querySelectorAll(".category-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    activeCategory = btn.dataset.category;   // "" تعني الكل
    applyFilters();
  });
});
// لون
document.querySelectorAll(".color-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    activeColor = btn.dataset.color;         // "" = لا فلتر
    applyFilters();
  });
});
// سعر
document.querySelectorAll(".price-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    activePrice = btn.dataset.price;         // "" = لا فلتر
    applyFilters();
  });
});

/* زر مسح الفلاتر */
const clear = document.getElementById("clearFilters");
if (clear) clear.addEventListener("click", () => {
  activeCategory = activeColor = activePrice = "";
  applyFilters();
});

/* ============= تحميل البيانات ثم العرض الأولي ============= */
fetch("js/products.json")
  .then(r => r.json())
  .then(data => {
    allProducts = data;
    render(allProducts);              // المنتجات تظهر قبل أي فلترة
  })
  .catch(err => console.error(err));

  
  function searchByDescription() {
    const q = document.getElementById("homeSearch").value.toLowerCase();
    showMoreBtn.style.display = "none";              // أخفِ زر View More أثناء البحث
  
    const result = allProducts.filter(p =>          // ← استعمل allProducts
      p.description.toLowerCase().includes(q)
      // || p.title.toLowerCase().includes(q)       // لو عايزة تبحث بالعنوان
    );
  
    // أعِد رسم الشبكة:
    container.innerHTML = "";
    result.forEach(createProductCard);               // ← استخدم createProductCard الموجودة
    showMoreBtn.style.display = "none";              // أخفِ زر View More أثناء البحث
  }
  
  /*********** event listener ***********/
  document.getElementById("homeSearch")
          .addEventListener("input", searchByDescription);
  