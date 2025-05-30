// Firebase Config (ganti dengan milikmu)
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBXnXCSXhy06eqWBPzYmzxCo_LBzl51DO4",
  authDomain: "wibawamulianetwork.firebaseapp.com",
  databaseURL: "https://wibawamulianetwork-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "wibawamulianetwork",
  storageBucket: "wibawamulianetwork.firebasestorage.app",
  messagingSenderId: "605020393823",
  appId: "1:605020393823:web:6ba8afe7e250bc004da6ea",
  measurementId: "G-9EWJE8F5FG"
};

// Inisialisasi Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// Register User
const registerForm = document.getElementById('register-form');
if (registerForm) {
  registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    auth.createUserWithEmailAndPassword(email, password)
      .then((cred) => {
        return db.collection('users').doc(cred.user.uid).set({
          uid: cred.user.uid,
          name: name,
          email: email
        });
      })
      .then(() => {
        alert(`Registrasi berhasil dengan email: ${email}\nSilakan login di halaman Login.`);
        window.location.href = "login.html";
      })
      .catch(err => {
        let message = "Gagal Registrasi: ";
        switch (err.code) {
          case 'auth/email-already-in-use':
            message += "Email sudah terdaftar. Silakan login atau gunakan email lain.";
            break;
          case 'auth/invalid-email':
            message += "Format email tidak valid. Gunakan email yang benar.";
            break;
          case 'auth/weak-password':
            message += "Password terlalu lemah. Gunakan minimal 6 karakter.";
            break;
          default:
            message += err.message;
        }
        alert(message);
      });
  });
}

// Login User
const loginForm = document.getElementById('login-form');
if (loginForm) {
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const uidField = document.getElementById('id');

    auth.signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        if (uidField) uidField.value = user.uid;
        alert(`Halo, Anda berhasil login dengan akun: ${email}`);
        window.location.href = "dashboard.html"; // Bisa diarahkan ke dashboard
      })
      .catch((error) => {
        let message = "Gagal Login: ";
        switch (error.code) {
          case 'auth/user-not-found':
            message += "Email tidak ditemukan. Silakan daftar terlebih dahulu.";
            break;
          case 'auth/wrong-password':
            message += "Password salah. Silakan periksa dan coba lagi.";
            break;
          case 'auth/invalid-email':
            message += "Format email tidak valid. Gunakan email yang benar.";
            break;
          case 'auth/too-many-requests':
            message += "Terlalu banyak percobaan login. Coba lagi beberapa saat.";
            break;
          default:
            message += error.message;
        }
        alert(message);
      });
  });
}

const passwordInput = document.getElementById('password');
const togglePassword = document.getElementById('togglePassword');

togglePassword.addEventListener('click', function () {
  const isPassword = passwordInput.getAttribute('type') === 'password';
  passwordInput.setAttribute('type', isPassword ? 'text' : 'password');

  // Ganti icon eye/eye-off
  togglePassword.innerHTML = isPassword
    ? `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-eye-off">
        <path d="M17.94 17.94A10.1 10.1 0 0112 20c-7 0-11-8-11-8a16.3 16.3 0 015.17-5.83M2 2l20 20"></path>
        <path d="M9.88 9.88a3 3 0 014.24 4.24"></path>
      </svg>`
    : `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-eye">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
        <circle cx="12" cy="12" r="3"></circle>
      </svg>`;
});
