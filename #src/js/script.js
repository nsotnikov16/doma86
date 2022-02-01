
// Меню шапка
const header = document.querySelector('.header')
const headerContainer = header.querySelector('.header__container')
const headerMenu = header.querySelector('.header__menu')
const headerMenuList = header.querySelector('.header__menu ul')
const headerMenuMobile = header.querySelector('.header__mobile-menu')
const headerMenuMobileContainer = header.querySelector('.header__mobile-menu-container')
const headerInfo = header.querySelector('.header__info')
const headerSocial = header.querySelector('.header .social')
const burger = header.querySelector('.burger')

let view = { type: window.innerWidth <= 1000 ? 'mobile' : 'desktop', changeMobile: true, changeDesktop: true }

function mobileView() {
    if (view.changeMobile) {
        headerMenuMobileContainer.append(headerMenuList)
        headerMenuMobileContainer.append(headerInfo)
        headerMenuMobileContainer.append(headerSocial)
    }
    view.changeDesktop = true
}

function desktopView() {
    if (view.changeDesktop) {
        headerMenu.append(headerMenuList)
        headerContainer.append(headerInfo)
        headerContainer.append(headerSocial)
    }
    view.changeMobile = true
}
view.type === 'mobile' ? mobileView() : desktopView()
window.addEventListener('resize', () => {
    if (window.innerWidth <= 1000) {
        mobileView()
        view.changeMobile = false
    } else {
        desktopView()
        view.changeDesktop = false
    }
})

burger.addEventListener('click', () => headerMenuMobile.classList.toggle('open'))

// Анимация
/* const sectionTitle = document.querySelectorAll('.section__title')
const sectionSubtitle = document.querySelectorAll('.section__subtitle')
const sectionDescription = document.querySelectorAll('.section__description')

sectionTitle.forEach(item => item.classList.add('_anim-items', '_anim-no-hide'))
sectionSubtitle.forEach(item => item.classList.add('_anim-items', '_anim-no-hide'))
sectionDescription.forEach(item => item.classList.add('_anim-items', '_anim-no-hide'))

const animItems = document.querySelectorAll('._anim-items');

if (animItems.length > 0) {
    window.addEventListener('scroll', animOnScroll);

    function animOnScroll() {
        for (let index = 0; index < animItems.length; index++) {
            const animItem = animItems[index];
            const animItemHeight = animItem.offsetHeight;
            const animItemOffset = offset(animItem).top;
            const animStart = 4;

            let animItemPoint = window.innerHeight - animItemHeight / animStart;
            if (animItemHeight > window.innerHeight) {
                animItemPoint = window.innerHeight - window.innerHeight / animStart;
            }

            if ((pageYOffset > animItemOffset - animItemPoint) && pageYOffset < (animItemOffset + animItemHeight)) {
                animItem.classList.add('_animate');
            } else {
                if (!animItem.classList.contains('_anim-no-hide')) {
                    animItem.classList.remove('_animate');
                }
            }
        }
    }
    function offset(el) {
        const rect = el.getBoundingClientRect(),
            scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
            scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
    }

    setTimeout(() => {
        animOnScroll();
    }, 10);
} */


// Scroll To
$('.scroll-to').on('click', function () {
    let href = $(this).attr('href');

    $('html, body').animate({
        scrollTop: $(href).offset().top
    }, {
        duration: 400,   // по умолчанию «400» 
        easing: "linear" // по умолчанию «swing» 
    });

    return false;
});


// Popups
class Popup {
    constructor(popupElement) {
        this._popupElement = popupElement;
        this._closeButton = this._popupElement.querySelector('.popup__close');
        this._img = this._popupElement.id === "photo" ? this._popupElement.querySelector('.popup__img') : null;
        this._source = this._img ? this._img.previousElementSibling : null;
        this._handleEscClose = this._handleEscClose.bind(this)
        this._openingLinks = document.querySelectorAll(`[data-pointer="${this._popupElement.id}"]`)
        this.setEventListeners()
    }

    open(el) {
        if (this._img) this._img.src = el.src
        if (this._source) this._source.srcset = el.src
        document.body.style.overflow = "hidden";
        this._popupElement.classList.add('popup_opened')
        document.addEventListener('keydown', this._handleEscClose);
    }

    close() {
        if (this._img) this._img.src = ""
        this._popupElement.classList.remove('popup_opened');
        document.body.style.overflow = "visible";
        document.removeEventListener('keydown', this._handleEscClose);
    }

    _handleEscClose(evt) {
        if (evt.keyCode === 27) {
            this.close();
        }
    }

    _handleOverlayClick(evt) {
        if (evt.target === evt.currentTarget) {
            this.close();
        }
    }

    setEventListeners() {
        this._openingLinks.forEach(link => link.addEventListener('click', (e) => { e.preventDefault(); this.open(e.target) }))
        this._closeButton.addEventListener('click', () => this.close());
        this._popupElement.addEventListener('click', this._handleOverlayClick.bind(this));
    }
}

const popups = document.querySelectorAll('.popup')

if (popups.length > 0) popups.forEach(item => new Popup(item))


// Filter
const labelsFilter = document.querySelectorAll('.filter__label')
const selectFilter = document.querySelector('.filter__select')
const containerFilter = document.querySelector('.filter__container')
if (labelsFilter.length > 0) {
    labelsFilter.forEach(label => {
        const forLabel = label.getAttribute('for')
        const input = document.querySelector(`#${forLabel}`)
        input.checked ? label.classList.add('active') : ''
        input.addEventListener('click', () => {
            const inputs = input.closest('.filter__variants').querySelectorAll('input')
            if (input.type === 'radio') {
                inputs.forEach(el => {
                    const parent = el.parentNode
                    parent.classList.remove('active')
                    el === input && el.checked ? parent.classList.add('active') : ''
                })
            }
            if (input.type === 'checkbox') input.checked ? label.classList.add('active') : label.classList.remove('active')

        })
    })
}

if (selectFilter) selectFilter.addEventListener('click', () => {
    selectFilter.classList.toggle('open')
    containerFilter.classList.toggle('open')
})


const swipersCatalog = document.querySelectorAll('.swiper-catalog')
if (swipersCatalog.length > 0) {
    swipersCatalog.forEach((swiper, ind) => {
        swiper.classList.add(`swiper-catalog-${ind + 1}`)
        var swiperCatalog = new Swiper(`.swiper-catalog-${ind + 1}`, {
            loop: true,
            pagination: {
                el: `.swiper-catalog-${ind + 1} .swiper-pagination`,
                clickable: true,
            },
        })
        if (window.innerWidth > 1150) {
            const bullets = swiper.querySelectorAll('.swiper-pagination-bullet')
            if (bullets.length > 0) bullets.forEach(bullet => {
                const aria = bullet.getAttribute('aria-label')
                const nextSlide = aria[aria.length - 1]
                bullet.addEventListener('mouseenter', () => { swiperCatalog.slideTo(nextSlide) })
            })
        }

    })


}

/* Либо через бэкенд сокращать строку наименования дома */
/* setHeight('.catalog_ready .catalog__name', true)
setHeight('.catalog_catalog .catalog__name', true) */

document.querySelector('.compare #dis').textContent = document.querySelector('.compare #dis').textContent.replace('“МАГАЗИН ДОМОВ”', '')

// FAQ

const faqBlocks = document.querySelectorAll('.faq__block')
if (faqBlocks.length > 0) {

    const questions = document.querySelectorAll('.faq__question')
    const faqBlocksHeight = setHeight('.faq__question')

    if (window.innerWidth > 900) questions.forEach(q => q.style.height = `${faqBlocksHeight + 20}px`)

    window.addEventListener('resize', () => window.innerWidth <= 900 ? questions.forEach(q => q.style.height = `auto`) : questions.forEach(q => q.style.height = `${faqBlocksHeight + 20}px`))

    faqBlocks.forEach((block, ind, arr) => {
        const question = block.querySelector('.faq__question')
        question.addEventListener('click', () => {
            /* arr.forEach(el => el.classList.remove('open')) */
            /* block.classList.add('open') */
            block.classList.toggle('open')
        })
    })
}



function setHeight(selector, set) {
    let column = 0
    const elements = document.querySelectorAll(selector)
    elements.forEach(q => {
        let h = q.offsetHeight
        if (h > column) {
            column = h;
        }
    })

    if (set === true) elements.forEach(q => q.style.height = `${column}px`)

    return column
}


// YMaps
ymaps.ready(init);

function init() {
    var myMap = new ymaps.Map(
        "map",
        {
            center: [/* 61.247076, 73.377429 */61.247076, 73.376189],
            zoom: 17,
            controls: ['zoomControl', 'geolocationControl'],
        },
        {
            searchControlProvider: "yandex#search",
            zoomControlPosition: { right: 10, top: 250 },
            zoomControlSize: 'small',
            geolocationControlPosition: { right: 10, top: 330 }
        }
    )

    var Balloon = ymaps.templateLayoutFactory.createClass(
        `<div style="display: flex; align-items: center;"><img style="width: 20px; height: 20px; margin-right: 10px;" src="./img/logo.png"/><p style="font-weight: 500; font-size: 16px;">Магазин Домов</p></div>`
    )

    var myPlacemarkWithContent = new ymaps.Placemark(
        [61.247076, 73.376189],
        {},
        {
            iconImageHref: "./img/logo.png",
            iconImageSize: [25, 25],
            iconLayout: "default#imageWithContent",
            iconContentOffset: [12.5, 10],
            iconImageOffset: [-15, -10],
            balloonContentLayout: Balloon,
            balloonPanelMaxMapArea: 0,
            hideIconOnBalloonOpen: false,
        }
    );

    myMap.geoObjects.add(myPlacemarkWithContent);
}