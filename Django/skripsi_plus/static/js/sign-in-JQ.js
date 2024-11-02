// contoh akun untuk login
validEmail = "user@example.com";
validPassword = "password123";

// fungsi toggle show password
function togglePasswordIn() {
  const passwordInput = $("#input-password-sign-in"); // elemen input
  const togglePassword = $("#toggle-password-sign-in"); // elemen tombol

  if (passwordInput.attr("type") === "password") {
    // tampilkan password
    passwordInput.attr("type", "text");
    // ubah icon toggle menjadi eye
    togglePassword.removeClass("ri-eye-off-line").addClass("ri-eye-line");
  } else {
    // sembunyikan password
    passwordInput.attr("type", "password");
    // ubah icon toggle menjadi eye-slash
    togglePassword.removeClass("ri-eye-line").addClass("ri-eye-off-line");
  }
}

// fungsi utama validasi form sign in
function initSignInForm() {
  $(document).ready(function () {
    const emailInput = $("#input-email-sign-in");
    const passwordInput = $("#input-password-sign-in");
    const signInButton = $("#btn-sign-in");

    // fungsi validasi tiap input
    function validateInput(input) {
      clearErrors(input); // menghapus pesan kesalahan sebelumnya

      let isValid = true; // menyimpan status validasi input
      let errorMessage = ""; // menyimpan pesan kesalahan jika ada

      // validasi email
      if (input.is(emailInput)) {
        if (input.val().trim() === "" || !validateEmail(input.val())) {
          errorMessage = "Valid email is required"; // pesan kesalahan email
          isValid = false; // menandai input tidak valid
        }
      }
      // validasi password
      else if (input.is(passwordInput)) {
        if (input.val().trim() === "") {
          errorMessage = "Password is required"; // pesan kesalahan password
          isValid = false; // menandai input tidak valid
        }
      }

      // jika input tidak valid, tampilkan pesan kesalahan
      if (!isValid) {
        showError(input, errorMessage);
      }

      // cek apakah seluruh input valid untuk mengaktifkan tombol sign in
      checkFormValidity();
    }

    // fungsi cek apakah seluruh input valid
    function checkFormValidity() {
      const isFormValid =
        emailInput.val().trim() !== "" && // cek email apakah terisi
        validateEmail(emailInput.val()) && // cek email apakah valid
        passwordInput.val().trim() !== ""; // cek password apakah terisi

      // mengaktifkan atau menonaktifkan sign in btn berdasarkan validitas form
      signInButton.prop("disabled", !isFormValid);
    }

    // fungsi validasi email menggunakan regex
    function validateEmail(email) {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // pola regex untuk validasi email
      return regex.test(email); // mengembalikan true jika email valid, false jika tidak
    }

    // fumhso menampilkan pesan kesalahan
    function showError(input, message) {
      const errorDiv = $("<div></div>"); // membuat elemen div untuk pesan kesalahan
      errorDiv.addClass("text-danger small"); // menambahkan kelas untuk styling
      errorDiv.text(message); // mengatur teks pesan kesalahan

      // jika email dan password salah
      if (input.is(signInButton)) {
        const container = $("#container-btn-sign-in");
        if (!container.find(".text-danger").length) {
          container.append(errorDiv); // menambahkan elemen kesalahan ke container
        }
      } else {
        input.addClass("is-invalid"); // menandai input tidak valid
        input.parent().append(errorDiv); // menambahkan elemen kesalahan ke parent input
      }
    }

    // fungsi menghapus pesan kesalahan
    function clearErrors(input) {
      input.parent().find(".text-danger").remove(); // menghapus elemen kesalahan
      input.removeClass("is-invalid"); // menghapus kelas tidak valid
    }

    // event listener tiap input
    emailInput.on("input", () => validateInput(emailInput));
    passwordInput.on("input", () => validateInput(passwordInput));

    // event listener tombol sign in
    signInButton.on("click", function (e) {
      e.preventDefault();

      const email = emailInput.val().trim();
      const password = passwordInput.val().trim();

      if (email === validEmail && password === validPassword) {
        alert("Sign in successful!");
        window.location.href = "../index.html";
      } else {
        showError(signInButton, "Invalid email or password");
      }
    });
  });
}

// inisialisasi fungsi validasi form sign in
initSignInForm();
