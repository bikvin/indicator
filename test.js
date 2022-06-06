// const str = '125.12.233.211';

// const regex = new RegExp('[0-255].[0-255].[0-255].[0-255]');

// console.log(regex.test(str));


console.log('test.js')


//const BattleShipGame = require('../models/BattleshipGame')
// const Room = require('./src/models/Room')

// const roomName = '609ebc3fa99a9cd5140a2ed6'

// getRoom(roomName)

// async function getRoom(roomName) {
//     try{
//         const room = await Room.findOne({_id: roomName}).populate('players', 'username email')
//         console.log('Room: ', room)
//     }
//     catch{
//         console.log('aaa')
//     }
    
// }


const arr = [
    [0,1,2,3,4,5,6,7,8,9],
    [9,8,7,6,5,4,3,2,1,0],
    [0,1,2,3,4,5,6,7,8,9],
    [9,8,7,6,5,4,3,2,1,0],
    [0,1,2,3,4,5,6,7,8,9],
    [9,8,7,6,5,4,3,2,1,0],
    [0,1,2,3,4,5,6,7,8,9],
    [9,8,7,6,5,4,3,2,1,0],
    [0,1,2,3,4,5,6,7,8,9],
    [9,8,7,6,5,4,3,2,1,0]
]

console.log('arr', arr)

const str = JSON.stringify(arr)

console.log('str', str)

const arr2 = JSON.parse(str)

console.log('arr2', arr2)

console.log(arr2[3][2])