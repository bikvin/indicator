//#region [ rgba(0,205,30, 0.2)]
//#endregion

const minimizeButton = document.querySelector('.minimize-chat-icon')
const chatWindow = document.querySelector('.chat')
let screenMedia = window.matchMedia('(max-width: 40rem)');
const playerList = document.querySelector('#chat-users')
const token = document.querySelector('meta[name="csrf-token"]').getAttribute('content')

const url = window.location.pathname
const roomId = url.substring(url.lastIndexOf('/')+1);

const sendMessageButton = document.querySelector('#send-message-button')
const messageInput = document.querySelector('#message-input') 
const messageForm = document.querySelector('#message-form') 
const messagesWindow = document.querySelector('.chat-messages') 

updateChatMessages(messages) // set initial messages
messagesWindow.scrollTop = messagesWindow.scrollHeight // scroll messages to the bottom





minimizeButton.addEventListener('click', () => {
    //console.log(screenMedia.matches);
    if(screenMedia.matches){
        chatWindow.classList.remove('chat-hidden')
        chatWindow.classList.toggle("chat-open");
        
    }else{
        chatWindow.classList.remove('chat-open')
        chatWindow.classList.toggle("chat-hidden");
    }
    
})

messageForm.addEventListener('submit',  (e) => {
    e.preventDefault()
    console.log('Submit')

    const message = messageInput.value
    if(message != ''){
        socket.emit('newMessage', message)
        messageInput.value = ''
    }
    
  })

socket.on('messageReceived', (messages) => {
    console.log('Message received')
    console.log(messages)
    updateChatMessages(messages)
    autoscroll()
})

socket.onAny((eventName, ...args) => {
    console.log('Any event: ' + eventName)
    
  });


function autoscroll() {
    const newMessage = messagesWindow.lastElementChild

    /// height of the new message
    const newMessageStyles = getComputedStyle(newMessage)
    const newMessageMargin = parseInt(newMessageStyles.marginBottom)
    const newMessageHeight = newMessage.offsetHeight + newMessageMargin
    console.log(newMessageHeight)

    /// visible height
    const visibleHeight = messagesWindow.offsetHeight

    // height of messages container
    const containerHeight = messagesWindow.scrollHeight

    //how far have i scrolled?
    const scrollOfset = messagesWindow.scrollTop + visibleHeight

    if(containerHeight - newMessageHeight <= scrollOfset){
        messagesWindow.scrollTop = messagesWindow.scrollHeight
    }


}




function updateUserList(players){
    
    let names = ''
    players.forEach((player) => {
        names += `${player.username} `
    })
    playerList.innerHTML = names
}

function updateChatMessages(messages){
    let messageHtml = ''
   

    messages.forEach((message) => {
        const time = luxon.DateTime.fromISO(message.date).setLocale('ru').toLocaleString(luxon.DateTime.TIME_SIMPLE);

        messageHtml += `<div class='chat-message'>
        <a class="chat-messages__name" href="#">${message.user.username}</a>  <span class="chat-messages__time"> - ${time} </span>
        <p>${message.text}</p>
        </div>`
    })

    messagesWindow.innerHTML = messageHtml

}
