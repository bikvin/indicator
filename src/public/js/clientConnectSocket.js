const JWToken = getTokenFromCookie()


const socket = io({
  auth: {
    token: JWToken
  }
}).connect();



//console.log('check 1', socket.connected);



socket.on('connected', () => {
  console.log('You are now connected to socket and joined your own group')
  //console.log('check 2', socket.connected);

  

})





socket.on("connect_error", (err) => {
  //console.log(err instanceof Error); // true
  alert(err.message); // not authorized
  //console.log(err.data); // { content: "Please retry later" }
});

socket.on('custom_error', (err) => {
  alert(err)
  
})


function getTokenFromCookie() {

  const tokenString = document.cookie
  .split('; ')
  .find(row => row.startsWith('jwt='))

  if(tokenString){
      //console.log('tokenString ', tokenString)
      const token = tokenString.split('=')[1]
      
      if(typeof(token) != 'undefined'){
        //console.log('token ', token)

        return token
        //socket.emit('setup', JWToken)
      }else{
        console.log('no token')
        return false
      }
  }else{
    console.log('no token string')
    return false
  }
}




  

