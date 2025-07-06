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



