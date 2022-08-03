
const levelConfig = [
{ // 1
    number: 1,
    time: 3*60*1000,
    prompt: "Let's start",
    targetText: 'Destroy 5 asteroids',

    asteroids: {
        maxAlive: 10,
        createDelay: 2000,
    },
    win: {
        item: 'asteroid',
        qty: 5
    },

},

{ // 2
    number: 2,
    time: 3*60*1000,
    prompt: "You can do it",
    targetText: 'Destroy 10 asteroids',

    asteroids: {
        maxAlive: 10,
        createDelay: 2000,
    },
    win: {
        item: 'asteroid',
        qty: 10
    },

},

{ //3
    number: 3,
    time: 3*60*1000,
    prompt: "First treasure",
    targetText: 'Collect 2 diamonds',

    asteroids: {
        maxAlive: 10,
        createDelay: 2000,
    },
    collectables:{
        types: ['diamond'],


    },
    win: {
        item: 'diamond',
        qty: 2
    },

},

{ //4
    number: 4,
    time: 3*60*1000,
    prompt: "Go on",
    targetText: 'Destroy 10 asteroids',

    asteroids: {
        maxAlive: 10,
        createDelay: 2000,
    },
    win: {
        item: 'asteroid',
        qty: 10
    },

},

{ //5
    number: 5,
    time: 3*60*1000,
    prompt: "Get more",
    targetText: 'Collect 3 diamonds',

    asteroids: {
        maxAlive: 10,
        createDelay: 2000,
    },
    collectables:{
        types: ['diamond'],

    },
    win: {
        item: 'diamond',
        qty: 3
    },

},

{//6
    number: 6,
    //time: 3*60*1000,
    prompt: "Run!",
    targetText: 'Escape all asteroids',

    asteroids: {
        maxAlive: 10,
        createDelay: 2000,
        totalMax: 50,
    },
    win: {
        item: 'asteroid',
        qty: 'all'
    },

},

{//7
    number: 7,
    time: 3*60*1000,
    prompt: "First contact",
    targetText: 'Destroy 10 asteroids',

    asteroids: {
        maxAlive: 10,
        createDelay: 2000,
    },
    saucers: {
        maxAlive: 2,
        shootDelay: 10000,
        totalMax: 10,
        createDelay: 2000,
        saucerLives: 1,
        
    },
    win: {
        item: 'asteroid',
        qty: 10
    },

},

{//8
    number: 8,
    time: 3*60*1000,
    prompt: "They protect their diamonds",
    targetText: 'Collect 3 diamonds',

    asteroids: {
        maxAlive: 10,
        createDelay: 2000,
    },
    collectables:{
        types: ['diamond'],
        minDelay: 1000,
        maxDelay: 5000,

    },
    saucers: {
        maxAlive: 1,
        shootDelay: 10000,
        totalMax: 10,
        createDelay: 2000,
        saucerLives: 1,
        
    },
    win: {
        item: 'diamond',
        qty: 3
    },

},

{//9
    number: 9,
    time: 3*60*1000,
    prompt: "Time to clean up",
    targetText: 'Destroy 10 asteroids',

    asteroids: {
        maxAlive: 10,
        createDelay: 2000,
    },
    win: {
        item: 'asteroid',
        qty: 10
    },

},

{//10
    number: 10,
    time: 3*60*1000,
    prompt: "It’s a trap!",
    targetText: 'Destroy all saucers',

    saucers: {
        maxAlive: 3,
        shootDelay: 10000,
        totalMax: 10,
        createDelay: 2000,
        saucerLives: 1,
        
    },
    win: {
        item: 'saucer',
        qty: 'all'
    },

},

{ // 11
    number: 11,
    time: 3*60*1000,
    prompt: "Such a mess here",
    targetText: 'Destroy 15 asteroids',

    asteroids: {
        maxAlive: 15,
        createDelay: 1500,
    },
    win: {
        item: 'asteroid',
        qty: 15
    },

},

{ // 12
    number: 12,
    time: 3*60*1000,
    prompt: "Space rocks",
    targetText: 'Destroy 15 asteroids',

    asteroids: {
        maxAlive: 15,
        createDelay: 1500,
        minVelocity: 1,
        maxVelocity: 3,
    },
    win: {
        item: 'asteroid',
        qty: 15
    },

},

{ //13
    number: 13,
    time: 3*60*1000,
    prompt: "Mission diamond",
    targetText: 'Collect 3 diamonds',

    asteroids: {
        maxAlive: 10,
        createDelay: 2000,
    },
    collectables:{
        types: ['diamond'],

    },
    saucers: {
        maxAlive: 1,
        shootDelay: 10000,
        createDelay: 2000,
        saucerLives: 1,
        
    },
    win: {
        item: 'diamond',
        qty: 3
    },

},

{ //14
    number: 14,
    time: 3*60*1000,
    prompt: "Сherry picking",
    targetText: 'Collect 3 diamonds',

    asteroids: {
        maxAlive: 10,
        createDelay: 2000,
    },
    collectables:{
        types: ['diamond'],

    },
    saucers: {
        maxAlive: 2,
        shootDelay: 10000,
        createDelay: 2000,
        saucerLives: 1,
        
    },
    win: {
        item: 'diamond',
        qty: 3
    },

},

{ // 15
    number: 15,
    time: 3*60*1000,
    prompt: "Enough bullets for all?",
    targetText: 'Destroy 15 asteroids. Don’t run out of ammo.',
    ammo: 100,

    asteroids: {
        maxAlive: 15,
        createDelay: 1500,
        // minVelocity: 1,
        // maxVelocity: 3,
    },
    win: {
        item: 'asteroid',
        qty: 15
    },
    lose:{
        item: 'ammo',
        qty: 0
    },

},

{ //16
    number: 16,
    time: 3*60*1000,
    prompt: "Asteroid madness",
    targetText: 'Destroy 30 asteroids',

    asteroids: {
        maxAlive: 20,
        createDelay: 1000,
    },
    collectables:{
        types: ['triple'],

    },
    saucers: {
        maxAlive: 2,
        shootDelay: 10000,
        createDelay: 2000,
        saucerLives: 1,
        
    },
    win: {
        item: 'asteroid',
        qty: 30
    },

},

{ // 17
    number: 17,
    time: 3*60*1000,
    prompt: "Please reload",
    targetText: 'Destroy 15 asteroids.',
    ammo: 10,

    asteroids: {
        maxAlive: 15,
        createDelay: 2000,

    },
    collectables:{
        types: ['ammo'],

    },
    win: {
        item: 'asteroid',
        qty: 15
    },


},

{ //18
    number: 18,
    time: 3*60*1000,
    prompt: "Are you the boss?",
    targetText: 'Destroy 5 saucers',

    asteroids: {
        maxAlive: 10,
        createDelay: 2000,
    },

    saucers: {
        maxAlive: 2,
        shootDelay: 10000,
        createDelay: 2000,
        saucerLives: 1,
        
    },
    win: {
        item: 'saucer',
        qty: 5
    },

},

{ //19
    number: 19,
    time: 3*60*1000,
    prompt: "Get your reward",
    targetText: 'Collect 5 diamonds',

    asteroids: {
        maxAlive: 10,
        createDelay: 2000,
    },
    collectables:{
        types: ['diamond'],

    },
    saucers: {
        maxAlive: 1,
        shootDelay: 10000,
        createDelay: 2000,
        saucerLives: 1,
        
    },
    win: {
        item: 'diamond',
        qty: 5
    },

},

{//20
    number: 20,
    time: 3*60*1000,
    prompt: "Fight!",
    targetText: 'Destroy all saucers',

    saucers: {
        maxAlive: 4,
        shootDelay: 8000,
        totalMax: 15,
        createDelay: 2000,
        saucerLives: 1,
        
    },
    win: {
        item: 'saucer',
        qty: 'all'
    },

},

{ // 21
    number: 21,
    time: 3*60*1000,
    prompt: "Asteroid rain",
    targetText: 'Destroy 40 asteroids.',
    //ammo: 10,

    asteroids: {
        maxAlive: 15,
        createDelay: 2000,

    },
    collectables:{
        types: ['triple'],

    },
    win: {
        item: 'asteroid',
        qty: 40
    },


},

{ // 22
    number: 22,
    time: 3*60*1000,
    prompt: "Too many",
    targetText: 'Escape all asteroids',
    //ammo: 10,

    asteroids: {
        maxAlive: 15,
        createDelay: 1000,
        totalMax: 100

    },
    collectables:{
        types: ['triple'],

    },
    win: {
        item: 'asteroid',
        qty: 'all'
    },


},

{ //23
    number: 23,
    time: 3*60*1000,
    prompt: "Diamonds are your best friends",
    targetText: 'Collect 7 diamonds',

    asteroids: {
        maxAlive: 10,
        createDelay: 1500,
    },
    collectables:{
        types: ['diamond'],
        maxTtl: 15000,
        minTtl: 10000,
        //maxAlive: 0

    },
    saucers: {
        maxAlive: 2,
        shootDelay: 10000,
        createDelay: 2000,
        saucerLives: 1,
        
    },
    win: {
        item: 'diamond',
        qty: 7
    },

},

{ //24
    number: 24,
    time: 1.5*60*1000,
    prompt: "The salt of the earth",
    targetText: 'Collect 7 diamonds. Watch for time.',

    asteroids: {
        maxAlive: 10,
        createDelay: 1500,
    },
    collectables:{
        types: ['diamond'],
        minDelay: 5000,
        maxDelay: 10000,

    },
    // saucers: {
    //     maxAlive: 2,
    //     shootDelay: 10000,
    //     createDelay: 2000,
    //     saucerLives: 1,
        
    // },
    win: {
        item: 'diamond',
        qty: 7
    },

},
{ // 25
    number: 25,
    time: 3*60*1000,
    prompt: "These are fast",
    targetText: 'Destroy 20 asteroids',

    asteroids: {
        maxAlive: 20,
        createDelay: 1000,
        minVelocity: 1,
        maxVelocity: 3,
    },
    collectables:{
        types: ['triple'],

    },
    win: {
        item: 'asteroid',
        qty: 20
    },

},
{ // 26
    number: 26,
    time: 1*60*1000,
    prompt: "The time is ripe",
    targetText: 'Destroy 20 asteroids. Watch for time.',
    ammo:100,

    asteroids: {
        maxAlive: 15,
        createDelay: 1500,

    },
    collectables:{
        types: ['ammo'],
        minDelay: 5000,
        maxDelay: 10000,

    },
    win: {
        item: 'asteroid',
        qty: 20
    },

},

{ // 27
    number: 27,
    time: 3*60*1000,
    //time: 0.1*60*1000,
    prompt: "Piece of cake",
    targetText: 'Destroy 30 asteroids.',
    //ammo:0,
    //ammo: 10,

    asteroids: {
        maxAlive: 15,
        createDelay: 1500,

    },

    saucers: {
        maxAlive: 3,
        shootDelay: 10000,
        createDelay: 2000,
        saucerLives: 1,
        
    },
  
    win: {
        item: 'asteroid',
        qty: 30
    },

},

{ // 28
    number: 28,
    time: 3*60*1000,
    prompt: "Please cleat it here",
    targetText: 'Destroy 20 asteroids.',
    //ammo:0,
    ammo: 10,

    asteroids: {
        maxAlive: 10,
        createDelay: 2000,
        minVelocity: 1,
        maxVelocity: 3,

    },
    collectables:{
        types: ['ammo', 'triple'],
        minDelay: 2000,
        maxDelay: 5000,
        maxAlive: 3,

    },
  
    win: {
        item: 'asteroid',
        qty: 20
    },

},

{ // 29
    number: 29,
    time: 1*60*1000,
    prompt: "Kill ‘em. Kill ‘em fast.",
    targetText: 'Destroy 5 saucers. Watch for time.',
    ammo:0,

    asteroids: {
        maxAlive: 15,
        createDelay: 1500,


    },

    collectables:{
        types: ['ammo'],
        minDelay: 2000,
        maxDelay: 5000,

    },

    saucers: {
        maxAlive: 2,
        shootDelay: 10000,
        createDelay: 2000,
        saucerLives: 1,
        
    },
  
    win: {
        item: 'saucer',
        qty: 5
    },

},

{//30
    number: 30,
    time: 3*60*1000,
    prompt: "You are not welcome here",
    targetText: 'Destroy all saucers',

    saucers: {
        maxAlive: 5,
        shootDelay: 7000,
        totalMax: 20,
        createDelay: 2000,
        saucerLives: 1,
        
    },
    win: {
        item: 'saucer',
        qty: 'all'
    },

},

{ // 31
    number: 31,
    time: 3*60*1000,
    prompt: "Eager beaver.",
    targetText: 'Destroy 20 asteroids.',
    //ammo: 10,

    asteroids: {
        maxAlive: 20,
        createDelay: 1000,

    },

    win: {
        item: 'asteroid',
        qty: 20
    },


},

{ // 32
    number: 32,
    time: 3*60*1000,
    prompt: "Make space great again",
    targetText: 'Destroy 40 asteroids.',
    

    asteroids: {
        maxAlive: 15,
        createDelay: 1000,

    },
    collectables:{
        types: ['triple'],
        minDelay: 2000,
        maxDelay: 5000,

    },

    saucers: {
        maxAlive: 2,
        shootDelay: 7000,
        createDelay: 2000,
        saucerLives: 1,
        
    },
    win: {
        item: 'asteroid',
        qty: 40
    },

},

{ //33
    number: 33,
    time: 3*60*1000,
    prompt: "Looks like a million dollars.",
    targetText: 'Collect 7 diamonds',

    asteroids: {
        maxAlive: 10,
        createDelay: 1500,
    },
    collectables:{
        types: ['diamond'],

    },
    saucers: {
        maxAlive: 2,
        shootDelay: 10000,
        createDelay: 2000,
        saucerLives: 1,
        
    },
    win: {
        item: 'diamond',
        qty: 7
    },

},

{ //34
    number: 34,
    time: 3*60*1000,
    prompt: "Hit the jackpot.",
    targetText: 'Collect 10 diamonds. Watch for ammo.',
    ammo: 100,

    asteroids: {
        maxAlive: 10,
        createDelay: 1500,
    },
    collectables:{
        types: ['diamond'],

    },
    saucers: {
        maxAlive: 1,
        shootDelay: 10000,
        createDelay: 2000,
        saucerLives: 1,
        
    },
    win: {
        item: 'diamond',
        qty: 10
    },

    lose:{
        item: 'ammo',
        qty: 0
    },


},

{ // 35
    number: 35,
    time: 3*60*1000,
    prompt: "Aliens are so angry.",
    targetText: 'Destroy 5 saucers.',
    ammo:0,

    asteroids: {
        maxAlive: 15,
        createDelay: 1500,


    },

    collectables:{
        types: ['ammo'],

    },

    saucers: {
        maxAlive: 2,
        shootDelay: 5000,
        createDelay: 2000,
        saucerLives: 1,
        
    },

    win: {
        item: 'saucer',
        qty: 5
    },

},

{ //36
    number: 36,
    time: 1.5*60*1000,
    prompt: "Time is money.",
    targetText: 'Collect 5 diamonds. Watch for time.',
    //ammo: 100,

    asteroids: {
        maxAlive: 10,
        createDelay: 1500,
    },
    collectables:{
        types: ['diamond'],
        minDelay: 5000,
        maxDelay: 10000,

    },
    saucers: {
        maxAlive: 1,
        shootDelay: 10000,
        createDelay: 2000,
        saucerLives: 1,
        
    },
    win: {
        item: 'diamond',
        qty: 5
    },



},

{ // 37
    number: 37,
    time: 3*60*1000,
    prompt: "Rain again",
    targetText: 'Escape all asteroids.',
    //ammo: 10,

    asteroids: {
        maxAlive: 15,
        createDelay: 1000,
        totalMax: 60

    },
    collectables:{
        types: ['triple'],

    },
    saucers: {
        maxAlive: 1,
        shootDelay: 10000,
        createDelay: 2000,
        saucerLives: 1,
        
    },
    win: {
        item: 'asteroid',
        qty: 'all'
    },


},

{ // 38
    number: 38,
    time: 1*60*1000,
    prompt: "Wrong place, wrong time .",
    targetText: 'Survive 60 seconds.',
    ammo:0,

    asteroids: {
        maxAlive: 20,
        createDelay: 1500,
        minVelocity: 1,
        maxVelocity: 3,

    },

    collectables:{
        types: ['ammo'],

    },

    saucers: {
        maxAlive: 2,
        shootDelay: 5000,
        createDelay: 2000,
        saucerLives: 1,
        
    },

    win: {
        item: 'time',

    },

},

{ //39
    number: 39,
    time: 3*60*1000,
    prompt: "Treasure collection contest.",
    targetText: 'Collect 5 diamonds.',
    //ammo: 100,

    asteroids: {
        maxAlive: 10,
        createDelay: 1500,
    },
    collectables:{
        types: ['diamond'],
        minDelay: 5000,
        maxDelay: 10000,

    },
    saucers: {
        maxAlive: 2,
        shootDelay: 10000,
        createDelay: 2000,
        saucerLives: 1,
        
    },
    win: {
        item: 'diamond',
        qty: 5
    },



},

{//40
    number: 40,
    time: 3*60*1000,
    prompt: "Eat them for breakfast?",
    targetText: 'Destroy all saucers',

    asteroids: {
        maxAlive: 2,
        createDelay: 1500,
    },
    saucers: {
        maxAlive: 4,
        shootDelay: 7000,
        totalMax: 20,
        createDelay: 2000,
        saucerLives: 1,
        
    },
    win: {
        item: 'saucer',
        qty: 'all'
    },

},

{ // 41
    number: 41,
    time: 3*60*1000,
    prompt: "In the interim",
    targetText: 'Destroy 30 asteroids.',
    ammo: 0,

    asteroids: {
        maxAlive: 25,
        createDelay: 1500,

    },
    collectables:{
        types: ['ammo'],
        minDelay: 2000,
        maxDelay: 5000,
        maxAlive: 3

    }, 

    saucers: {
        maxAlive: 1,
        shootDelay: 7000,
        createDelay: 2000,
        saucerLives: 1,
        
    },
    win: {
        item: 'asteroid',
        qty: 30
    },

},

{ // 42
    number: 42,
    time: 3*60*1000,
    prompt: "It's an order",
    targetText: 'Destroy 30 asteroids.',


    asteroids: {
        maxAlive: 25,
        createDelay: 1000,
        minVelocity: 1,
        maxVelocity: 3,

    },


    saucers: {
        maxAlive: 1,
        shootDelay: 7000,
        createDelay: 2000,
        saucerLives: 1,
        
    },
    win: {
        item: 'asteroid',
        qty: 30
    },

},

{ // 43
    number: 43,
    time: 1*60*1000,
    prompt: "May the luck be with you.",
    targetText: 'Survive 60 seconds.',
    ammo:0,

    asteroids: {
        maxAlive: 25,
        createDelay: 1500,
        minVelocity: 1,
        maxVelocity: 3,

    },

    collectables:{
        types: ['ammo'],
        minDelay: 2000,
        maxDelay: 5000,
        maxAlive: 3
    },

    saucers: {
        maxAlive: 2,
        shootDelay: 10000,
        createDelay: 2000,
        saucerLives: 1,
        
    },

    win: {
        item: 'time',

    },

},

{ // 44
    number: 44,
    //time: 3*60*1000,
    prompt: "Chase rainbows.",
    targetText: 'Collect 5 diamonds.',
    ammo:0,

    asteroids: {
        maxAlive: 25,
        createDelay: 1500,
        // minVelocity: 1,
        // maxVelocity: 3,

    },

    collectables:{
        types: ['ammo', 'diamond'],
        minDelay: 1000,
        maxDelay: 3000,
        maxAlive: 3

    },

    saucers: {
        maxAlive: 2,
        shootDelay: 10000,
        createDelay: 2000,
        saucerLives: 1,
        
    },

    win: {
        item: 'diamond',
        qty: 5

    },

},

{ // 45
    number: 45,
    time: 1*60*1000,
    prompt: "Storm in a teacup.",
    targetText: 'Survive 60 seconds.',
    ammo:0,

    asteroids: {
        maxAlive: 25,
        createDelay: 1500,
        minVelocity: 1,
        maxVelocity: 2.5,

    },

    collectables:{
        types: ['ammo'],
        minDelay: 2000,
        maxDelay: 5000,
        maxAlive: 3
    },

    saucers: {
        maxAlive: 2,
        shootDelay: 10000,
        createDelay: 5000,
        saucerLives: 1,
        
    },

    win: {
        item: 'time',

    },

},

{ // 46
    number: 46,
    //time: 3*60*1000,
    prompt: "Huff and puff",
    targetText: 'Escape all asteroids.',
    ammo: 100,

    asteroids: {
        maxAlive: 15,
        createDelay: 1000,
        totalMax: 100

    },
    collectables:{
        types: ['triple', 'ammo'],
        minDelay: 2000,
        maxDelay: 5000,
        maxAlive: 3
    },
    saucers: {
        maxAlive: 1,
        shootDelay: 10000,
        createDelay: 2000,
        saucerLives: 1,
        
    },
    win: {
        item: 'asteroid',
        qty: 'all'
    },


},
{ // 47
    number: 47,
    time: 3*60*1000,
    prompt: "From rags to riches.",
    targetText: 'Collect 10 diamonds.',
    //ammo:0,

    asteroids: {
        maxAlive: 25,
        createDelay: 1500,
        // minVelocity: 1,
        // maxVelocity: 3,

    },

    collectables:{
        types: ['diamond', 'triple'],
        minDelay: 2000,
        maxDelay: 5000,
        maxAlive: 3

    },

    saucers: {
        maxAlive: 3,
        shootDelay: 5000,
        createDelay: 5000,
        saucerLives: 1,
        
    },

    win: {
        item: 'diamond',
        qty: 10

    },

},

{ // 48
    number: 48,
    time: 3*60*1000,
    prompt: "Don’t chicken out.",
    targetText: 'Destroy 10 saucers. Watch for ammo.',
    ammo:100,

    asteroids: {
        maxAlive: 25,
        createDelay: 1500,
        minVelocity: 1,
        maxVelocity: 2.5,

    },


    saucers: {
        maxAlive: 4,
        shootDelay: 10000,
        createDelay: 2000,
        saucerLives: 1,
        
    },

    win: {
        item: 'saucer',
        qty: 10

    },

    lose: {
        item: 'ammo',
        qty: 0
    }

},

{ // 49
    number: 49,
    time: 1.5*60*1000,
    prompt: "Against the clock.",
    targetText: 'Survive 90 seconds.',
    ammo:0,

    asteroids: {
        maxAlive: 5,
        createDelay: 1000,
        minVelocity: 1,
        maxVelocity: 2.5,

    },

    collectables:{
        types: ['ammo'],
        minDelay: 2000,
        maxDelay: 5000,
        maxAlive: 3

    },

    saucers: {
        maxAlive: 5,
        shootDelay: 10000,
        createDelay: 5000,
        saucerLives: 1,
        
    },

    win: {
        item: 'time',

    },

},


{//50
    number: 50,
    //time: 3*60*1000,
    prompt: "Final countdown",
    targetText: 'Destroy all saucers',

    asteroids: {
        maxAlive: 5,
        createDelay: 1500,
    },
    saucers: {
        maxAlive: 6,
        shootDelay: 10000,
        totalMax: 25,
        createDelay: 3000,
        saucerLives: 1,
        
    },
    win: {
        item: 'saucer',
        qty: 'all'
    },

},

]


export default levelConfig;