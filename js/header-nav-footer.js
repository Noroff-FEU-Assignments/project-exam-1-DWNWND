import { fetchAllCategories, key } from "./api-call.js";
import { generalErrorMessage } from "./error-handling.js";

const navModal = document.querySelector(".nav-modal");
const footer = document.querySelector("footer");

navModal.innerHTML += `
<a href="#" class="hamburger-toggle closeBtn">
  <i class="fa-solid fa-xmark"></i>
</a>
<div class="logo-mobile">
  <a href="/./index.html"><img src="/img/logo-black.png" alt="small Microtic logo - Home button"/></a>
</div>
<div class="navbar-standard">
  <ul class="navbar-standard-alignment">
    <div class="standard-links">
      <li class="nav-item-stand"><a href="/./index.html">Home</a></li>
      <li class="nav-item-stand"><a href="/html/about.html">About</a></li>
      <li class="nav-item-stand"><a href="/html/contact.html">Contact</a></li>
   </div>
   <li class="newsletter-signup"><a href="#">newsletter signup</a></li>
   <div class="icon-links">
      <li class="nav-icon-stand">
        <a href="#"><i class="fa-brands fa-pinterest"></i></a>
      </li>
      <li class="nav-icon-stand">
        <a href="#"><i class="fa-brands fa-amazon"></i></a>
      </li>
      <li class="nav-icon-stand">
        <a href="#"><i class="fa-brands fa-youtube"></i></a>
      </li>
    </div>
  </ul>
</div>
<div class="header-general-wrapper">
  <img src="/img/header-img_unsplash.jpg" class="header-img" alt="header - image of a girl in the back of a van with the doors open to a snowey landscape"/>
  <a href="/./index.html"><img src="/img/logo-white-big.png" class="logo-big" alt="bit Microtic logo"/></a>
</div>
<div class="navbar-categories">
  <ul class="navbar-categories-alignment">
  </ul>
</div>`;

async function renderCategories() {
  try {
    const allCategories = await fetchAllCategories();
    const categoriesUl = document.querySelector(".navbar-categories-alignment");

    for (let i = 0; i < allCategories.length; i++) {
      if (allCategories[i].id === 1 || allCategories[i].id === 18 || allCategories[i].id === 19) {
        continue;
      }
      categoriesUl.innerHTML += `
    <li class="nav-item-cat ${allCategories[i].slug}"><a href="/html/archive.html?key=${allCategories[i].slug}&id=${allCategories[i].id}" class="cat-anchor ${allCategories[i].slug}" >${allCategories[i].name}</a></li>`;
    }

    const category = document.querySelectorAll(".nav-item-cat");
    const categoryAnchorTag = document.querySelectorAll(".cat-anchor");
    for (let i = 0; i < category.length; i++) {
      if (category[i].className === "nav-item-cat " + key) {
        category[i].classList.toggle("active");
      }
    }
    for (let i = 0; i < categoryAnchorTag.length; i++) {
      if (categoryAnchorTag[i].className === "cat-anchor " + key) {
        categoryAnchorTag[i].classList.toggle("active");
      }
    }
  } catch (error) {
    generalErrorMessage(error);
    console.log(error);
  }
}
renderCategories();

// open hamburger menu
const openBtn = document.querySelector(".openBtn");
openBtn.addEventListener("click", () => {
  navModal.showModal();
});

// close hamburger menu by clicking X
const closeBtn = document.querySelector(".closeBtn");
closeBtn.addEventListener("click", () => {
  navModal.close();
});

//close modal by clicking outside
function onClick(event) {
  if (event.target === navModal) {
    navModal.close();
  }
}
navModal.addEventListener("click", onClick);

// render footer
footer.innerHTML += `
<div class="some-footer-wrapper">
<div class="some-cta">follow us for more inspiration</div>
<div class="some-icons">
  <a href="#"><i class="fa-brands fa-pinterest"></i></a>
  <a href="#"><i class="fa-brands fa-amazon"></i></a>
  <a href="#"><i class="fa-brands fa-youtube"></i></a>
</div>
</div>
<div class="logo-footer-wrapper">
<a href="/./index.html" class="logo-gray-footer"><img src="/img/logo-big-3.png" alt="big Microtic logo"/></a>
</div>`;

// scroll to top btn
let scrollBtn = document.querySelector(".back-to-top");

window.onscroll = function () {
  showBtnOnScroll();
};

function showBtnOnScroll() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    scrollBtn.style.display = "flex";
  } else {
    scrollBtn.style.display = "none";
  }
}

function scrollToTop() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

scrollBtn.addEventListener("click", () => {
  scrollToTop();
});
