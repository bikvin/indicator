//#region [ rgba(0,205,30, 0.2)]
//#endregion

const urlParams = new URLSearchParams(window.location.search);


const roomName = window.location.pathname.split('/')[2]



console.log('Join room', roomName)

// document.addEventListener('DOMContentLoaded', (event) => {
//   console.log('Dom Content Loaded')
// })



socket.emit('joinRoom', roomName, JWToken)

socket.on('userJoined', (players) => {
    console.log('User Joined')
    //console.log(players)
    updateUserList(players)
  })
  
socket.on('userLeft', (players) => {
    console.log('User Left')
    //console.log(players)
    updateUserList(players)
  })  


