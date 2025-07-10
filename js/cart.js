// fetch("js/products.json")
//   .then(response => response.json())
//   .then(products => {
//     allProducts = products;
//     renderProducts(products);

//     // البحث أثناء الكتابة
//     document.getElementById("searchInput").addEventListener("input", filterProducts);

//     // البحث عند الضغط على العدسة
//     document.getElementById("searchBtn").addEventListener("click", filterProducts);

//     // تغيير التصنيف
//     document.getElementById("categoryFilter").addEventListener("change", filterProducts);
//   })
//   .catch(error => {
//     console.error("Error fetching products:", error);
//   });
//   console.log(products);
//   function filterProducts() {
//     const searchTerm = document.getElementById("searchInput").value.toLowerCase();
//     const selectedCategory = document.getElementById("categoryFilter").value;
  
//     let filteredProducts = allProducts;
  
//     if (searchTerm) {
//       filteredProducts = filteredProducts.filter(product =>
//         product.title.toLowerCase().includes(searchTerm) ||
//         product.description.toLowerCase().includes(searchTerm)
//       );
//     }
  
//     if (selectedCategory) {
//       filteredProducts = filteredProducts.filter(product =>
//         product.category === selectedCategory
//       );
//     }
  
//     renderProducts(filteredProducts);
//   }
// let allProducts = [];

// const container = document.getElementById("products-container");

// function renderProducts(products) {
//   container.innerHTML = "";

//   products.forEach(product => {
//     const card = document.createElement("div");
//     card.className = "product-card";

//     const img = document.createElement("img");
//     img.src = product.images[0];
//     img.alt = product.title;

//     const title = document.createElement("div");
//     title.textContent = product.title;
//     title.style.fontWeight = "bold";
//     title.style.margin = "10px 0";

//     const desc = document.createElement("div");
//     desc.textContent = product.description;
//     desc.style.fontSize = "14px";
//     desc.style.color = "#666";

//     const cat = document.createElement("div");
//     cat.textContent = product.category;
//     cat.style.fontSize = "13px";
//     cat.style.color = "red";

//     const price = document.createElement("div");
//     price.textContent = product.price;
//     price.style.color = "green";
//     price.style.fontWeight = "bold";
//     price.style.marginTop = "5px";

//     card.appendChild(img);
//     card.appendChild(title);
//     card.appendChild(desc);
//     card.appendChild(cat);
//     card.appendChild(price);

//     container.appendChild(card);
//   });
// }

// function filterProducts() {
//   const searchTerm = document.getElementById("searchInput").value.toLowerCase();
//   const selectedCategory = document.getElementById("categoryFilter").value;

//   let filtered = allProducts;

//   if (searchTerm) {
//     filtered = filtered.filter(p =>
//       p.title.toLowerCase().includes(searchTerm) ||
//       p.description.toLowerCase().includes(searchTerm)
//     );
//   }

//   if (selectedCategory) {
//     filtered = filtered.filter(p => p.category === selectedCategory);
//   }

//   renderProducts(filtered);
// }

// fetch("js/products.json")
//   .then(response => response.json())
//   .then(products => {
//     allProducts = products;
//     renderProducts(products);

//     document.getElementById("searchInput").addEventListener("input", filterProducts);
//     document.getElementById("categoryFilter").addEventListener("change", filterProducts);
//     document.getElementById("searchBtn").addEventListener("click", filterProducts);
//   })
//   .catch(error => console.error("Error fetching products:", error));
