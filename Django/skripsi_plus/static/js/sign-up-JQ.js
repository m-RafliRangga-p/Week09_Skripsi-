// ----------JQuery FOR SIGN UP PAGE----------
// fungsi toggle show password
function togglePasswordUp() {
  const passwordInput = $("#input-password-sign-up"); // elemen input
  const togglePassword = $("#toggle-password-sign-up"); // elemen tombol

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

// fungsi toggle show confirm password
function toggleConfirmPasswordUp() {
  const passwordInput = $("#input-confirm-password-sign-up"); // elemen input
  const togglePassword = $("#toggle-confirm-password-sign-up"); // elemen tombol

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

// fungsi utama validasi form sign up
function initSignUpForm() {
  $(document).ready(function () {
    // mendapatkan referensi ke elemen input
    const usernameInput = $("#input-username-sign-up");
    const emailInput = $("#input-email-sign-up");
    const passwordInput = $("#input-password-sign-up");
    const confirmPasswordInput = $("#input-confirm-password-sign-up");
    const acceptTermsInput = $("#accept-terms");
    const signUpButton = $("#btn-sign-up");

    // fungsi validasi tiap input
    function validateInput(input) {
      clearErrors(input); // menghapus pesan kesalahan sebelumnya

      let isValid = true; // menyimpan status validasi input
      let errorMessage = ""; // menyimpan pesan kesalahan jika ada

      // validasi username
      if (input.is(usernameInput)) {
        if (input.val().trim() === "") {
          errorMessage = "Username is required"; // pesan kesalahan username
          isValid = false; // menandai input tidak valid
        }
      }
      // validasi email
      else if (input.is(emailInput)) {
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
      // validasi confirm password
      else if (input.is(confirmPasswordInput)) {
        if (input.val().trim() === "" || input.val() !== passwordInput.val()) {
          errorMessage = "Passwords must match"; // pesan kesalahan jika password tidak cocok
          isValid = false; // menandai input tidak valid
        }
      }
      // validasi checkbox
      else if (input.is(acceptTermsInput)) {
        if (!input.is(":checked")) {
          errorMessage = "You must accept the terms and conditions"; // pesan kesalahan jika tidak menyetujui syarat dan ketentuan
          isValid = false; // menandai input tidak valid
        }
      }

      //jika input tidak valid, tampilkan pesan kesalahan
      if (!isValid) {
        showError(input, errorMessage);
      }

      // cek apakah semua input valid untuk mengaktifkan sign up btn
      checkFormValidity();
    }

    // fungsi cek apakah seluruh input valid
    function checkFormValidity() {
      const isFormValid =
        usernameInput.val().trim() !== "" && // cek username apakah terisi
        emailInput.val().trim() !== "" && // cek email apakah terisi
        validateEmail(emailInput.val()) && // cek email apakah valid
        passwordInput.val().trim() !== "" && // cek password apakah terisi
        confirmPasswordInput.val().trim() !== "" && // cek confirm password apakah terisi
        confirmPasswordInput.val() === passwordInput.val() && // cek confirm password apakah cocok
        acceptTermsInput.is(":checked"); // cek apakah checkbox diterima

      // mengaktifkan atau menonaktifkan sign up btn berdasarkan validitas form
      signUpButton.prop("disabled", !isFormValid);
    }

    // fungsi validasi email menggunakan regex
    function validateEmail(email) {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // pola regex untuk validasi email
      return regex.test(email); // mengembalikan true jika email valid, false jika tidak
    }

    // fungsi menampilkan pesan kesalahan
    function showError(input, message) {
      const errorDiv = $("<div></div>"); // membuat elemen div untuk pesan kesalahan
      errorDiv.addClass("text-danger small"); // menambahkan kelas untuk styling
      errorDiv.text(message); // mengatur teks pesan kesalahan

      // jika input adalah checkbox, tambahkan pesan kesalahan di bawahnya
      if (input.is(acceptTermsInput)) {
        const termsContainer = $(".form-check");
        if (!termsContainer.find(".text-danger").length) {
          termsContainer.append(errorDiv); // menambahkan elemen kesalahan ke container
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

    // menambahkan event listener pada setiap input
    [usernameInput, emailInput, passwordInput, confirmPasswordInput].forEach(
      (item) => {
        item.on("input", () => validateInput(item));
      }
    );
    acceptTermsInput.on("change", () => validateInput(acceptTermsInput));
  });
}

// inisialisasi fungsi validasi form sign up
initSignUpForm();
