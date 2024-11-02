// Array of objects yang menyimpan daftar pertanyaan dan jawaban yang akan ditampilkan di div faq-container
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

// Fungsi untuk membuat elemen FaQ
function createFaqItem(faq) {
  const item = document.createElement("div"); // Membuat elemen div baru untuk setiap item FAQ
  item.classList.add("faq-item"); // Menambahkan class faq-item ke div yang baru saja dibuat

  const question = document.createElement("h3"); // Membuat elemen h3 untuk menampilkan pertanyaan
  question.classList.add("faq-question"); // Menambahkan class faq-question pada elemen h3
  question.innerHTML = faq.question; // Mengisi teks pertanyaan dari faq.question (menggunakan innerHTML agar tag <sup> berfungsi)

  const separator = document.createElement("hr"); // Membuat elemen hr sebagai garis pemisah
  separator.classList.add("faq-separator"); // Menambahkan class 'faq-separator' untuk styling di file CSS
  separator.style.display = "none"; // Garis pemisah diberikan style display none agar elemen disembunyikan di awal

  const answer = document.createElement("p"); // Membuat elemen p untuk jawaban
  answer.classList.add("faq-answer"); // Menambahkan class 'faq-answer' ke elemen p
  answer.textContent = faq.answer; // Mengisi teks jawaban dari faq.answer
  answer.style.display = "none"; // Jawaban diberikan style display none agar elemen disembunyikan di awal

  // Event listener untuk toggle answer dan hr ketika question diklik
  question.addEventListener("click", () => {
    // Menambahkan fungsi yang akan dijalankan setiap kali elemen question di klik
    const isActive = item.classList.toggle("active"); // menambahkan class active pada elemen item jika sebelumnya belum ada, dan menghapusnya jika sudah ada.

    // Toggle display hr dan answer
    separator.style.display = isActive ? "block" : "none"; // Jika item aktif, tampilkan garis pembatas (hr)
    answer.style.display = isActive ? "block" : "none"; // Jika item aktif, tampilkan jawaban (p)
  });

  item.appendChild(question); // Memasukkan elemen pertanyaan (h3) ke dalam div item
  item.appendChild(separator); // Memasukkan elemen hr setelah pertanyaan
  item.appendChild(answer); // Memasukkan elemen jawaban (p) setelah hr

  return item; // Mengembalikan elemen item (div berisi pertanyaan, garis pembatas, dan jawaban)
}

// Render FAQ ke dalam container
// Fungsi renderFaqs digunakan untuk menampilkan semua FAQ di halaman.
// Menggunakan forEach untuk mengambil setiap item dalam faqData, lalu memanggil createFaqItem untuk membuat elemen-elemen HTML yang akan ditampilkan,
// dan memasukkannya ke dalam div faqContainer.
function renderFaqs() {
  const faqContainer = document.getElementById("faq-container"); // Mengambil elemen dengan id 'faq-container' sebagai tempat menampilkan FAQ

  faqData.forEach((faq) => {
    // Looping melalui setiap item dalam array faqData
    const faqItem = createFaqItem(faq); // Membuat elemen FAQ untuk setiap pertanyaan dan jawaban
    faqContainer.appendChild(faqItem); // Menambahkan elemen FAQ ke dalam container di halaman
  });
}

// Panggil fungsi renderFaqs setelah DOM siap
// Event listener digunakan untuk menjalankan renderFaqs ketika halaman (DOM) selesai dimuat
// Dimana hal ini untuk memastikan bahwa script hanya berjalan setelah halaman siap di-render
document.addEventListener("DOMContentLoaded", renderFaqs);

//  Fungsi untuk menampilkan atau menyembunyikan password pada form sign-in
function togglePassword() {
  const passwordInput = document.getElementById("input-password");
  const togglePassword = document.getElementById("toggle-password");

  if (passwordInput.type === "password") {
    // Tampilkan password
    passwordInput.type = "text";
    // Ubah icon toggle menjadi eye
    togglePassword.classList.remove("bi-eye-slash");
    togglePassword.classList.add("bi-eye");
  } else {
    // Sembunyikan password
    passwordInput.type = "password";
    // Ubah icon toggle menjadi eye-slash
    togglePassword.classList.remove("bi-eye");
    togglePassword.classList.add("bi-eye-slash");
  }
}

// Fungsi untuk menampilkan atau menyembunyikan password pada form sign-up
function toggleConfirmPassword(event) {
  const passwordInput = document.getElementById("input-confirm-password");
  const toggleConfirmPassword = document.getElementById(
    "toggle-confirm-password"
  );

  if (passwordInput.type === "password") {
    // Tampilkan password
    passwordInput.type = "text";
    // Ubah icon toggle menjadi eye
    toggleConfirmPassword.classList.remove("bi-eye-slash");
    toggleConfirmPassword.classList.add("bi-eye");
  } else {
    // Sembunyikan password
    passwordInput.type = "password";
    // Ubah icon toggle menjadi eye-slash
    toggleConfirmPassword.classList.remove("bi-eye");
    toggleConfirmPassword.classList.add("bi-eye-slash");
  }
}

// Fungsi untuk memvalidasi apakah email memiliki format yang valid
function validateEmail(email) {
  if (email.trim() === "") {
    // Memeriksa apakah email tidak kosong
    alert("Email tidak boleh kosong.");
    return false; // Mengembalikan false jika email kosong
  }

  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regex untuk memvalidasi email
  if (!re.test(email)) {
    // Memeriksa apakah email valid menggunakan regex
    alert("Email tidak valid.");
    return false; // Mengembalikan false jika email tidak valid
  }

  return true; // Mengembalikan true jika email valid
}

// Variabel email dan password yang valid
const validEmail = "user@example.com"; //Contoh variabel email
const validPassword = "password123"; //Contoh variabel password

// Fungsi untuk login
function login() {
  // Mengambil nilai dari input email dan password
  const emailInput = document.getElementById("input-email-in").value;
  const passwordInput = document.getElementById("input-password").value;

  // Memeriksa apakah email valid menggunakan fungsi validateEmail
  if (!validateEmail(emailInput)) {
    return; // Jika email tidak valid, hentikan eksekusi fungsi login
  }

  // Cek apakah email dan password sesuai
  if (emailInput === validEmail && passwordInput === validPassword) {
    // Jika benar, arahkan ke halaman index.html
    window.location.href = "../index.html";
  } else if (emailInput === validEmail && passwordInput !== validPassword) {
    // Jika password salah, tampilkan alert
    alert("Password salah. Silakan coba lagi.");
  } else if (emailInput !== validEmail && passwordInput === validPassword) {
    // Jika email salah, tampilkan alert
    alert("Email salah. Silakan coba lagi.");
  } else {
    // Jika email dan password salah, tampilkan alert
    alert("Email atau password salah. Silakan coba lagi.");
  }
}

// Event listener untuk tombol Sign In
document
  .querySelector(".btn-primary")
  .addEventListener("click", function (event) {
    event.preventDefault(); // Mencegah perilaku default dari tombol submit yang biasanya akan merefresh halaman
    login(); // Memanggil function login
  });
