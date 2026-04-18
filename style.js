document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".card");
  const searchInput = document.getElementById("searchInput");

  // 1. Khi bấm vào thẻ: Mở Google Tìm kiếm về tỉnh đó
  cards.forEach((card) => {
    card.addEventListener("click", () => {
      const name = card.getAttribute("data-name");
      const query = encodeURIComponent(`Khám phá ${name}`);
      window.open(`https://www.google.com/search?q=${query}`, "_blank");
    });
  });

  // 2. Chức năng tìm kiếm tỉnh thành
  searchInput.addEventListener("input", (e) => {
    const searchTerm = e.target.value.toLowerCase().trim();

    cards.forEach((card) => {
      const provinceName = card.getAttribute("data-name").toLowerCase();

      // Nếu tên tỉnh chứa từ khóa tìm kiếm thì hiện, không thì ẩn
      if (provinceName.includes(searchTerm)) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  });
});
