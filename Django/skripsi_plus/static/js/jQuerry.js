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

// JQuerry FOR MENTORS PAGE
$(document).ready(function () {
  // Memastikan bahwa script berjalan setelah halaman selesai dimuat.
  // Array object berisi informasi mentor
  const mentors = [
    {
      src: "../assets/img/William-John.png",
      title: "William John",
      rating: "4.9",
    },
    {
      src: "../assets/img/Monica-Sephani.png",
      title: "Monica Sephani",
      rating: "4.8",
    },
    {
      src: "../assets/img/River-Scott.png",
      title: "River Scott",
      rating: "5.0",
    },
    {
      src: "../assets/img/William-John.png",
      title: "William John",
      rating: "4.9",
    },
    {
      src: "../assets/img/Monica-Sephani.png",
      title: "Monica Sephani",
      rating: "4.8",
    },
    {
      src: "../assets/img/River-Scott.png",
      title: "River Scott",
      rating: "5.0",
    },
    {
      src: "../assets/img/Monica-Sephani.png",
      title: "Monica Sephani",
      rating: "4.8",
    },
    {
      src: "../assets/img/River-Scott.png",
      title: "River Scott",
      rating: "5.0",
    },
  ];

  // Fungsi untuk render card mentor
  function renderMentors(mentorsList) {
    $("#mentor-cards").empty(); // Mengosongkan div dengan id 'mentor-cards' sebelum melakukan render ulang.

    mentorsList.forEach(function (mentor) {
      //Loop untuk setiap mentor
      const card = `
        <div class="col-lg-3 col-md-6 mt-3">
          <div class="card h-100" style="width: 100%">
            <div class="image-zoom">
              <div class="image-zoom-wrapper">
                <img src="${mentor.src}" class="card-img-top" alt="${mentor.title}" />
              </div>
            </div>
            <div class="card-body d-flex flex-column text-center">
              <h5 class="card-title mb-3">${mentor.title}</h5>
              <div class="mt-auto d-flex justify-content-between align-items-center">
                <div class="rating d-flex align-items-center">
                  <i class="bi bi-star-fill"></i>
                  <span class="ms-1">${mentor.rating}</span>
                </div>
                <a href="#" class="btn btn-brand" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Detail</a>
              </div>
            </div>
          </div>
        </div>
      `;

      $("#mentor-cards").append(card); // Menambahkan card ke dalam div dengan id 'mentor-cards'.
    });
  }

  // Render semua mentor saat halaman pertama kali dimuat
  renderMentors(mentors); // Memanggil fungsi renderMentors untuk menampilkan semua mentor di awal

  // Fungsi pencarian berdasarkan nama atau rating
  $("#searchBtn").on("click", function () {
    const searchQuery = $("#searchInput").val().toLowerCase();
    // Mengambil nilai dari input search, mengubahnya menjadi huruf kecil agar pencarian tidak case-sensitive.

    const filteredMentors = mentors.filter(function (mentor) {
      // Melakukan filter pada array 'mentors' berdasarkan input pencarian.
      // Jika nama mentor atau rating mengandung kata yang diinput, mentor tersebut akan dimasukkan dalam hasil pencarian.
      return (
        mentor.title.toLowerCase().includes(searchQuery) ||
        mentor.rating.includes(searchQuery)
      );
    });

    // Render ulang mentor berdasarkan hasil pencarian.
    renderMentors(filteredMentors);
  });
});

// JQuerry FOR COURSES PAGE
$(document).ready(function () {
  // Array object berisi informasi course
  const courses = [
    {
      src: "../assets/img/programming.png",
      title: "Web Programming",
      text: "Course ini memberikan pengenalan komprehensif tentang pemrograman web, mencakup pengembangan front-end dan back-end.",
      price: "IDR 500,000",
    },
    {
      src: "../assets/img/skripsi.png",
      title: "Penyusunan Skripsi",
      text: "Course ini memberikan pengenalan komprehensif tentang cara menyusun skripsi yang baik, mencakup tata cara penulisan skripsi.",
      price: "IDR 500,000",
    },
    {
      src: "../assets/img/jaringan.png",
      title: "Komputer & Jaringan",
      text: "Course ini memberikan pengenalan komprehensif tentang proyek dalam bidang komputer dan jaringan yang dapat menjadi bahan skripsi.",
      price: "IDR 500,000",
    },
    {
      src: "../assets/img/programming.png",
      title: "Web Programming",
      text: "Course ini memberikan pengenalan komprehensif tentang pemrograman web, mencakup pengembangan front-end dan back-end.",
      price: "IDR 500,000",
    },
    {
      src: "../assets/img/skripsi.png",
      title: "Penyusunan Skripsi",
      text: "Course ini memberikan pengenalan komprehensif tentang cara menyusun skripsi yang baik, mencakup tata cara penulisan skripsi.",
      price: "IDR 500,000",
    },
    {
      src: "../assets/img/jaringan.png",
      title: "Komputer & Jaringan",
      text: "Course ini memberikan pengenalan komprehensif tentang proyek dalam bidang komputer dan jaringan yang dapat menjadi bahan skripsi.",
      price: "IDR 500,000",
    },
    {
      src: "../assets/img/skripsi.png",
      title: "Penyusunan Skripsi",
      text: "Course ini memberikan pengenalan komprehensif tentang cara menyusun skripsi yang baik, mencakup tata cara penulisan skripsi.",
      price: "IDR 500,000",
    },
    {
      src: "../assets/img/jaringan.png",
      title: "Komputer & Jaringan",
      text: "Course ini memberikan pengenalan komprehensif tentang proyek dalam bidang komputer dan jaringan yang dapat menjadi bahan skripsi.",
      price: "IDR 500,000",
    },
    {
      src: "../assets/img/skripsi.png",
      title: "Penyusunan Skripsi",
      text: "Course ini memberikan pengenalan komprehensif tentang cara menyusun skripsi yang baik, mencakup tata cara penulisan skripsi.",
      price: "IDR 500,000",
    }
  ];

  // Fungsi untuk render card course
  function renderCourses(courseList) {
    $("#course-cards").empty(); // Kosongkan konten sebelum render
    courseList.forEach(function (course) {
      const card = `
        <div class="col-lg-3 col-md-6 mt-3">
          <div class="card h-100" style="width: 100%">
            <div class="image-zoom">
              <div class="image-zoom-wrapper">
                <img src="${course.src}" class="card-img-top" alt="${course.title}" />
              </div>
            </div>
            <div class="card-body d-flex flex-column">
              <h5 class="card-title">${course.title}</h5>
              <p class="card-text flex-grow-1">${course.text}</p>
              <div class="mt-auto d-flex justify-content-between align-items-center">
                <div class="price">
                  <span class="ml-2">${course.price}</span>
                </div>
                <a href="detail-courses.html" class="btn btn-brand">Detail</a>
              </div>
            </div>
          </div>
        </div>
      `;

      $("#course-cards").append(card);
    });
  }

  // Render all courses on page load
  renderCourses(courses);

  // Fungsi pencarian berdasarkan nama atau harga
  $("#searchBtn").on("click", function () {
    const searchQuery = $("#searchInput").val().toLowerCase();
    const filteredCourses = courses.filter(function (course) {
      return (
        course.title.toLowerCase().includes(searchQuery) ||
        course.price.includes(searchQuery)
      );
    });
    renderCourses(filteredCourses);
  });
});

  /* Owl Carousel
  -----------------------------------------------*/
  $(document).ready(function() {
    $("#owl-speakers").owlCarousel({
      autoPlay: 6000,
      items : 4,
      itemsDesktop : [1199,2],
      itemsDesktopSmall : [979,1],
      itemsTablet: [768,1],
      itemsTabletSmall: [985,2],
      itemsMobile : [479,1],
    });
  });
