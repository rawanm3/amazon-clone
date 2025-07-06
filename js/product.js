    // Change Main Image on Thumbnail Click
    document.querySelectorAll('.thumb-img').forEach(img => {
      img.addEventListener('click', () => {
        document.querySelectorAll('.thumb-img').forEach(t => t.classList.remove('active'));
        img.classList.add('active');
        document.getElementById('mainImage').src = img.dataset.large;
      });
    });

    // Handle Color Selection
    document.querySelectorAll('.color-swatch').forEach(color => {
      color.addEventListener('click', () => {
        document.querySelectorAll('.color-swatch').forEach(c => c.classList.remove('active'));
        color.classList.add('active');
      });
    });

    // Handle Size Selection
    document.querySelectorAll('.size-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.size-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
      });
    });

    // Handle Add to Cart
    document.getElementById('addToCart').addEventListener('click', () => {
      const selectedColor = document.querySelector('.color-swatch.active')?.dataset.color;
      const selectedSize = document.querySelector('.size-btn.active')?.dataset.size;

      if (!selectedColor || !selectedSize) {
        alert("Please select color and size!");
        return;
      }

      alert(`Added to Cart:\nColor: ${selectedColor}\nSize: ${selectedSize}`);
    });