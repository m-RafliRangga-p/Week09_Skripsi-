// JQuerry FOR FAQ PAGE
// Data FAQ tetap sama
const faqData = [
  {
    question: "Apa itu Skripsi<sup>+</sup>?",
    answer:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero iste delectus quos dolores deserunt atque ullam eos, quo debitis maxime voluptatibus aut adipisci odit fuga",
  },
  {
    question: "Bagaimana cara mendaftar di Skripsi<sup>+</sup>?",
    answer:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero iste delectus quos dolores deserunt atque ullam eos, quo debitis maxime voluptatibus aut adipisci odit fuga",
  },
  {
    question: "Apa keunggulan Skripsi<sup>+</sup>?",
    answer:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero iste delectus quos dolores deserunt atque ullam eos, quo debitis maxime voluptatibus aut adipisci odit fuga",
  },
  {
    question: "Bimbingan online menggunaka platform apa?",
    answer:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero iste delectus quos dolores deserunt atque ullam eos, quo debitis maxime voluptatibus aut adipisci odit fuga",
  },
];

// Fungsi untuk membuat elemen FAQ menggunakan jQuery
function createFaqItem(faq) {
  // Membuat elemen div baru untuk setiap item FAQ
  const $item = $("<div>").addClass("faq-item");

  // Membuat elemen h3 untuk pertanyaan
  const $question = $("<h3>").addClass("faq-question").html(faq.question); // Menggunakan .html agar tag <sup> berfungsi

  // Membuat elemen hr sebagai garis pemisah
  const $separator = $("<hr>").addClass("faq-separator").hide(); // Menyembunyikan separator di awal

  // Membuat elemen p untuk jawaban
  const $answer = $("<p>").addClass("faq-answer").text(faq.answer).hide(); // Menyembunyikan jawaban di awal

  // Event listener untuk toggle dengan animasi slide
  $question.on("click", function () {
    const isActive = $item.toggleClass("active").hasClass("active");
    // Menggunakan slideToggle untuk animasi yang mulus
    $separator.slideToggle(isActive ? 300 : 200); // Durasi animasi bisa disesuaikan
    $answer.slideToggle(isActive ? 300 : 200); // Menggunakan slideToggle untuk jawaban
  });

  // Memasukkan pertanyaan, separator, dan jawaban ke dalam div item
  $item.append($question, $separator, $answer);

  return $item;
}

// Fungsi untuk render FAQ ke dalam container menggunakan jQuery
function renderFaqs() {
  const $faqContainer = $("#faq-container"); // Mengambil elemen container dengan jQuery

  faqData.forEach((faq) => {
    const $faqItem = createFaqItem(faq); // Membuat item FAQ menggunakan jQuery
    $faqContainer.append($faqItem); // Menambahkannya ke container
  });
}

// Memastikan DOM siap, lalu render FAQ
$(document).ready(renderFaqs);

/* Owl Carousel
  -----------------------------------------------*/
$(document).ready(function () {
  $("#owl-speakers").owlCarousel({
    autoPlay: 6000,
    items: 4,
    itemsDesktop: [1199, 2],
    itemsDesktopSmall: [979, 1],
    itemsTablet: [768, 1],
    itemsTabletSmall: [985, 2],
    itemsMobile: [479, 1],
  });
});

// Toggle Pasword
$(document).ready(function () {
  $("#togglePassword").click(function () {
    const passwordInput = $("#password");
    const eyeIcon = $("#eyeIcon");

    // Toggle the type attribute
    if (passwordInput.attr("type") === "password") {
      passwordInput.attr("type", "text");
      eyeIcon.removeClass("ri-eye-line").addClass("ri-eye-off-line");
    } else {
      passwordInput.attr("type", "password");
      eyeIcon.removeClass("ri-eye-off-line").addClass("ri-eye-line");
    }
  });

  $("#toggleConfirmPassword").click(function () {
    const confirmPasswordInput = $("#confirm_password");
    const confirmEyeIcon = $("#confirmEyeIcon");

    if (confirmPasswordInput.attr("type") === "password") {
      confirmPasswordInput.attr("type", "text");
      confirmEyeIcon.removeClass("ri-eye-line").addClass("ri-eye-off-line");
    } else {
      confirmPasswordInput.attr("type", "password");
      confirmEyeIcon.removeClass("ri-eye-off-line").addClass("ri-eye-line");
    }
  });
});





