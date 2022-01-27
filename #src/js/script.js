
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
function mobileView() {
    headerMenuMobileContainer.append(headerMenuList)
    headerMenuMobileContainer.append(headerInfo)
    headerMenuMobileContainer.append(headerSocial)
}

function desktopView() {
    headerMenu.append(headerMenuList)
    headerContainer.append(headerInfo)
    headerContainer.append(headerSocial)
}
window.innerWidth <= 1000 ? mobileView() : desktopView()
window.addEventListener('resize', () => window.innerWidth <= 1000 ? mobileView() : desktopView())

burger.addEventListener('click', () => headerMenuMobile.classList.toggle('open'))

// Анимация
const sectionTitle = document.querySelectorAll('.section__title')
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
}


// Scroll To
/* $('.scroll-to').on('click', function () {
    headerMobile.classList.remove('open-menu')
    let href = $(this).attr('href');

    $('html, body').animate({
        scrollTop: $(href).offset().top
    }, {
        duration: 400,   // по умолчанию «400» 
        easing: "linear" // по умолчанию «swing» 
    });

    return false;
}); */


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

if (selectFilter) selectFilter.addEventListener('click', () => containerFilter.classList.toggle('open'))
