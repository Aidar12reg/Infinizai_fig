'use strict'


const body = document.querySelector('body');
const widthBodyElement = body.clientWidth;


// скрытое меню в мобилке

const menuOpenBtn = document.getElementById('open-menu');
const menuCloseBtn = document.getElementById('close-menu');
const menuBody = document.querySelector('.menu-header');


menuOpenBtn.addEventListener("click", function (e) {
   menuBody.classList.add('open');
   body.classList.add('lock');
})

menuCloseBtn.addEventListener("click", function (e) {
   menuBody.classList.remove('open');
   body.classList.remove('lock');
})
// скрытое меню в мобилке


// -------------------------- БЛОКИ --------------------------->>

// блок header

// блок needs
//  убираем отступы у нижних колонок
const needsColumns = document.querySelector('.columns-needs');
const needsColumnLast = needsColumns.lastElementChild;
const needsColumnPrevLast = needsColumnLast.previousElementSibling;

if (widthBodyElement > 767.98) {
   needsColumnLast.style.marginBottom = "0";
   needsColumnPrevLast.style.marginBottom = "0";
}
// блок needs


// блок latest 
// убираем отступы у нижних колонок
const multiColumnItem = document.querySelectorAll('.multi-column__item');
const multiColumn = document.querySelector('.multi-column');
const lastColumnOfMultiColumn = multiColumn.lastElementChild;
const prevLastColumnOfMultiColumn = lastColumnOfMultiColumn.previousElementSibling;


if (widthBodyElement > 767.98) {
   lastColumnOfMultiColumn.style.marginBottom = "0";
   prevLastColumnOfMultiColumn.style.marginBottom = "0";
}
// блок latest





// блок footer
// flexWrap у блока если больше 4 элементов wrap и у последнего marginBottom = 0, если меньше 4 nowrap
const socialFooterList = document.querySelector('.social-footer__list');
const socialFooterItem = document.querySelectorAll('.social-footer__item');
if (socialFooterItem.length <= 4) {
   socialFooterList.style.flexWrap = "nowrap";
   for (let index = 0; index < socialFooterItem.length; index++) {
      const socialFooterItemElement = socialFooterItem[index];
      socialFooterItemElement.style.marginBottom = "0";
   }
}
if (socialFooterItem.length > 4) {
   socialFooterList.style.flexWrap = "wrap";
   for (let index = 0; index < socialFooterItem.length; index++) {
      const socialFooterItemElement = socialFooterItem[index];
      socialFooterItemElement.style.marginBottom = "20px";
   }
}


// блок footer

// -------------------------- БЛОКИ --------------------------//



// -------------------------- POPUPS --------------------------//
// popups


const popupLinks = document.querySelectorAll('.popupLink');
const lockPadding = document.querySelectorAll('.lock-padding');

let unlock = true;
const timeout = 400;

// получаем константы ссылок на попапы из popupLinks и меняем их атрибут в href на чистое имя,
// на которое ссылается эта сслыка(id у попапа).
// popupOpen(curentPopup) - создаем функцию открытия попапа
// e.preventDefault() - запрет перезагрузки страницы при открытии попапа(потому-что мы жмем на ссылку,
// а при этом происходит перезагрузка)------------->>
if (popupLinks.length > 0) {
   for (let index = 0; index < popupLinks.length; index++) {
      const popupLink = popupLinks[index];
      popupLink.addEventListener("click", function (e) {
         const popupName = popupLink.getAttribute('href').replace('#', '');
         const curentPopup = document.getElementById(popupName);
         popupOpen(curentPopup);
         e.preventDefault();
      });

   };
};
// --------------------------------------------------//

// кнопка закрытия (обьект с класом .close-popup) >>>>>>>>>
const popupCloseIcon = document.querySelectorAll('.close-popup');
if (popupCloseIcon.length > 0) {
   for (let index = 0; index < popupCloseIcon.length; index++) {
      const el = popupCloseIcon[index];
      el.addEventListener("click", function (e) {
         popupClose(el.closest('.popup'));
         e.preventDefault();
      });
   };
};
// кнопка закрытия-----------------------------------------------------------------------------//


// открытие попапа  >>>>>>>>>
function popupOpen(curentPopup) {
   if (curentPopup && unlock) {
      const popupActive = document.querySelector('.popup.open');
      if (popupActive) {
         popupClose(popupActive, false);
      } else {
         bodyLock();
      }
      curentPopup.classList.add('open');
      curentPopup.addEventListener("click", function (e) {
         if (!e.target.closest('.popup__content')) {
            popupClose(e.target.closest('.popup'))
         }
      });
   }
}
// открытие попапа-----------------------------------------------------------------------------//

// закрытие попапа  >>>>>>>>>
function popupClose(popupActive, doUnlock = true) {
   if (unlock) {
      popupActive.classList.remove('open');
      if (doUnlock) {
         bodyUnLock();
      }
   }
}
// закрытие попапа-----------------------------------------------------------------------------//

// функция фикса сдвига контента после открытия попапа  >>>>>>>>>

function bodyLock() {
   const lockPaddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';

   if (lockPadding.length > 0) {
      for (let index = 0; index < lockPadding.length; index++) {
         const el = lockPadding[index];
         el.style.paddingRight = lockPaddingValue;
      }
   }

   body.style.paddingRight = lockPaddingValue;
   body.classList.add('lock');

   unlock = false;
   setTimeout(function () {
      unlock = true;
   }, timeout);

}
// функция фикса сдвига контента после открытия попапа---------------------------------------//


// функция фикса сдвига контента после закрытия попапа, убираем паддинги и снимаем с боди класс lock  >>>>>>>>>
function bodyUnLock() {
   setTimeout(function () {

      if (lockPadding.length > 0) {
         for (let index = 0; index < lockPadding.length; index++) {
            const el = lockPadding[index];
            el.style.paddingRight = '0px';
         }
      }
      body.style.paddingRight = '0px';
      body.classList.remove('lock');
   }, timeout);

   unlock = false;

   setTimeout(function () {
      unlock = true;
   }, timeout);

}
// функция фикса сдвига контента после закрытия попапа, убираем паддинги и снимаем с боди класс lock-----------------//
;
// -------------------------- POPUPS --------------------------//


// -------------------------- SLIDERS --------------------------//
const sliderCustomize = new Swiper('.slider-customize__body', {
   direction: 'horizontal',
   loop: true,
   slidesPerScroll: 1,
   grabCursor: true,


   breakpoints: {
      768: {

         slidesPerView: 3,
         spaceBetween: 11,
      },
      320: {

         slidesPerView: 1.6,
         spaceBetween: 8,
      }
   },
   navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
   },


});

const sliderGallery = new Swiper('.gallery__body', {
   direction: 'horizontal',
   loop: true,
   slidesPerScroll: 1,
   grabCursor: true,
   // autoplay: {
   //    delay: 2000,
   //    disableOnInteraction: false,
   // },

   breakpoints: {
      768: {

         slidesPerView: 3,

      },
      320: {

         slidesPerView: 1.6,

      }
   },



});

;
// -------------------------- SLIDERS --------------------------//







