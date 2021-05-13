const backdrop = document.querySelector(".backdrop");
const mobileNav = document.querySelector(".mobile-nav");
const mobileMenuButton = document.querySelector(".mobile-menu__toggle-button");
const errorMessageHolder = document.querySelector('.room-error-message-holder')


mobileMenuButton.addEventListener("click", function() {

    mobileNav.classList.add("open");
    backdrop.classList.add("open");
});

backdrop.addEventListener("click", function() {
    mobileNav.classList.remove("open");
    backdrop.classList.remove("open");
});


function createErrorMessage(message) {
    console.log('create error message')
    //document.querySelector('.main').innerHTML = `<div class="card room-error-message"><p>Упс. Ошибочка вышла. Попробуйте перезагрузить страницу.</p><p>${message}</p><a class="btn btn-green"> Ok</a></div>`
    //console.log(documentMain)
    //document.querySelector('.main').innerHtml += '<div class="card room-error-message"><p>Упс. Ошибочка вышла</p><p>Текст ошибочки</p><a class="btn btn-green btn-error-message"> Ok</a></div>'

    document.querySelector('.main').insertAdjacentHTML("afterbegin", `<div class="card room-error-message"><p>Упс. Ошибочка вышла. Попробуйте перезагрузить страницу.</p><p>${message}</p><a class="btn btn-green btn-error-message"> Ok</a></div>`);
}

document.querySelector('.main').addEventListener('click', (event) => {
    if(event.target.classList.contains('btn-error-message')){
        //console.log('click')

        const error_message = document.querySelector('.room-error-message');
        error_message.parentNode.removeChild(error_message);
    }
    
})