const minimizeButton = document.querySelector('.minimize-chat-icon')
const chatWindow = document.querySelector('.chat')
let screenMedia = window.matchMedia('(max-width: 40rem)');

minimizeButton.addEventListener('click', () => {
    console.log(screenMedia.matches);
    if(screenMedia.matches){
        chatWindow.classList.remove('chat-hidden')
        chatWindow.classList.toggle("chat-open");
        
    }else{
        chatWindow.classList.remove('chat-open')
        chatWindow.classList.toggle("chat-hidden");
    }
    
})



