let arr = ["Battlefield 4", "DICE Game"];
let berjalan = document.querySelector("#berjalan");
let munculDelay = 80; // Delay muncul dalam milidetik
let hilangDelay = 100; // Delay menghilang dalam milidetik
let currentIndex = 0;
let karakterIndex = 0;
let btn_loading = document.querySelector(".btn-loading");
let btn_submit = document.querySelector(".btn-submit");
let contact_message = document.querySelector(".contact-message");
let success_message = document.querySelector(".success-message");
let failed_message = document.querySelector(".failed-message");
let navbar = document.querySelector(".navbar");
let li = document.querySelectorAll("li");
const form = document.forms["galihap-contact-form"];
const scriptURL =
  "https://script.google.com/macros/s/AKfycbz_sB8gb_4w7mcsZ0SJSh18QXQyA0zSyf_Eei1jRSpHJwfrxlQtDhURqiTBXyPG3EFT/exec";
const burger = document.querySelector(".burger");
const navLinks = document.querySelector(".nav-links");

AOS.init();

gsap.from(".gsap-web", { duration: 1, y: -100, opacity: 0 });

let owl = $(".owl-carousel");
owl.owlCarousel({
  items: 4,
  loop: true,
  autoplay: true,
  autoplayTimeout: 3000,
  autoplayHoverPause: true,
  responsiveClass: true,
  responsive: {
    0: {
      items: 1,
      nav: true,
    },
    600: {
      items: 2,
      nav: false,
    },
    1000: {
      items: 3,
      nav: true,
      loop: true,
    },
  },
});

// Kode di bawah ini buat kirim pesan ke saya.
// Jadi, jika ada orang yang kontak saya ke form kontak, maka masuk ke google spreadsheet saya sendiri.
form.addEventListener("submit", (e) => {
  e.preventDefault();

  btn_submit.style.display = "none";
  btn_loading.style.display = "block";

  // Kirim data contact ke google spreadsheet saya
  fetch(scriptURL, {
    method: "POST",
    body: new FormData(form),
    mode: "no-cors",
  })
    .then((response) => {
      contact_message.style.display = "none";
      success_message.style.display = "block";
      btn_loading.style.display = "none";
      btn_submit.style.display = "block";

      form.reset();

      setTimeout(function () {
        contact_message.style.display = "block";
        success_message.style.display = "none";
      }, 3000);
    })
    .catch((error) => {
      contact_message.style.display = "none";
      failed_message.style.display = "block";
      btn_loading.style.display = "none";
      btn_submit.style.display = "block";

      form.reset();
      setTimeout(function () {
        contact_message.style.display = "block";
        failed_message.style.display = "none";
      }, 3000);
    });
});

burger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

li.forEach((item, index) =>
  item.addEventListener("click", function () {
    navLinks.classList.toggle("active");
  })
);

function teksBerjalan() {
  if (karakterIndex < arr[currentIndex].length) {
    berjalan.innerHTML += arr[currentIndex].charAt(karakterIndex);
    karakterIndex++;
    setTimeout(teksBerjalan, munculDelay);
  } else {
    if (arr[currentIndex] == arr[0] || arr[currentIndex] == arr[1]) {
      setTimeout(hapusTeks, 300);
    }
  }
}

function hapusTeks() {
  if (karakterIndex >= 0) {
    let teks = arr[currentIndex].substring(0, karakterIndex);
    berjalan.innerHTML = teks;
    karakterIndex--;
    setTimeout(hapusTeks, 50);
  } else {
    currentIndex = (currentIndex + 1) % arr.length;
    setTimeout(teksBerjalan, munculDelay);
  }
}

teksBerjalan();
