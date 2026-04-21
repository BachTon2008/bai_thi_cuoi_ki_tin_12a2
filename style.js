document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".card");
  const searchInput = document.getElementById("searchInput");
  const regionButtons = document.querySelectorAll(".nav-menu li");

  let currentRegion = "all"; // Biến lưu trạng thái miền đang chọn

  // 1. Khi bấm vào thẻ: Mở Google Tìm kiếm về tỉnh đó
  cards.forEach((card) => {
    card.addEventListener("click", () => {
      const name = card.getAttribute("data-name");
      const query = encodeURIComponent(`Du lịch ${name}`); // Đổi nhẹ thành "Du lịch" để kết quả ra chuẩn hơn
      window.open(`https://www.google.com/search?q=${query}`, "_blank");
    });
  });

  // 2. Hàm lọc danh sách hiển thị dựa trên cả miền và ô tìm kiếm
  const filterCards = () => {
    const searchTerm = searchInput.value.toLowerCase().trim();

    cards.forEach((card) => {
      const provinceName = card.getAttribute("data-name").toLowerCase();
      const provinceRegion = card.getAttribute("data-region");

      // Kiểm tra xem tỉnh này có khớp với từ khóa không
      const matchesSearch = provinceName.includes(searchTerm);
      // Kiểm tra xem tỉnh này có thuộc miền đang chọn không
      const matchesRegion =
        currentRegion === "all" || provinceRegion === currentRegion;

      // Nếu thỏa mãn cả 2 điều kiện thì hiển thị, ngược lại thì ẩn
      if (matchesSearch && matchesRegion) {
        card.style.display = "block";
        // Thêm một chút hiệu ứng hiện lại mượt mà
        card.style.animation = "fadeInDown 0.5s ease";
      } else {
        card.style.display = "none";
      }
    });
  };

  // 3. Xử lý khi gõ vào ô tìm kiếm
  searchInput.addEventListener("input", filterCards);

  // 4. Xử lý khi bấm vào các nút chọn miền trên Navbar
  regionButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Gỡ class 'active' khỏi tất cả các nút
      regionButtons.forEach((b) => b.classList.remove("active"));
      // Thêm class 'active' cho nút vừa bấm
      btn.classList.add("active");

      // Cập nhật biến trạng thái miền
      currentRegion = btn.getAttribute("data-region");

      // Chạy lại hàm lọc
      filterCards();

      // Cuộn trang xuống phần danh sách 1 chút để trải nghiệm tốt hơn (Option)
      window.scrollTo({
        top: document.getElementById("galleryGrid").offsetTop - 100,
        behavior: "smooth",
      });
    });
  });
});
