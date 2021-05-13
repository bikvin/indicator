const urlParams = new URLSearchParams(window.location.search);
//console.log(urlParams)

const roomName = window.location.pathname.split('/')[2]



//createErrorMessage('message')

console.log('Join room', roomName)




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





// socket.on('userJoined', (user) => {
//     console.log('Someone joined the room. Its ', user.username)
// } )

// socket.on('updateUsersList', (data) => {
//     console.log(data)
// })