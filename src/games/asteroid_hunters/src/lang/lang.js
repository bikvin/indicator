const lang = {
    start: {
        en: "Start",
        ru: "Старт"
    },

    instructions: {
        en: 'use arrows to move, space to shoot',
        ru: 'стрелки для движения, пробел для стрельбы'
    },

    level: {
        en: "Level",
        ru: "Уровень"
    },

    pause: {
        en: "pause",
        ru: "пауза"
    },

    asteroids: {
        en: "Asteroids",
        ru: "Астероиды"
    },

    ammo: {
        en: "Ammo",
        ru: "Патроны"
    },

    saucers: {
        en: "Sausers",
        ru: "Тарелки"
    },

    diamonds:{
        en: "Diamonds",
        ru: "Кристаллы"
    },

    missionAccomplished: {
        en: "Mission accomplished !",
        ru: "Миссия выполнена !"
    },

    missionFailed: {
        en: "Mission failed !",
        ru: "Миссия провалена !"
    },

    time: {
        en: "Time",
        ru: "Время"
    },

    all: {
        en: "all",
        ru: "все"
    },

    levelTexts: [
        { //1
            prompt:{
                en: "Let's start",
                ru: "Начнем"
            },
            targetText: {
                en: 'Destroy 5 asteroids',
                ru: 'Уничтожь 5 астероидов'
            }
        },
        { //2
            prompt:{
                en: "You can do it",
                ru: "Ты сможешь!"
            },
            targetText: {
                en: 'Destroy 10 asteroids',
                ru: 'Уничтожь 10 астероидов'
            }
        },
        { //3
            prompt:{
                en: "First treasure",
                ru: "Первые сокровища"
            },
            targetText: {
                en: 'Collect 2 diamonds',
                ru: 'Собери 2 кристалла'
            }
        },
        { //4
            prompt:{
                en: "Go on",
                ru: "Продолжаем"
            },
            targetText: {
                en: 'Destroy 10 asteroids',
                ru: 'Уничтожь 10 астероидов'
            }
        },
        { //5
            prompt:{
                en: "Get more",
                ru: "Еще!"
            },
            targetText: {
                en: 'Collect 3 diamonds',
                ru: 'Собери 3 кристалла'
            }
        },
        { //6
            prompt:{
                en: "Run!",
                ru: "Бежим!"
            },
            targetText: {
                en: 'Escape all asteroids',
                ru: 'Увернись от всех астероидов'
            }
        },
        { //7
            prompt:{
                en: "First contact",
                ru: "Первый контакт"
            },
            targetText: {
                en: 'Destroy 10 asteroids',
                ru: 'Уничтожь 10 астероидов'
            }
        },
        { //8
            prompt:{
                en: "They protect their diamonds",
                ru: "Они стерегут свои кристаллы"
            },
            targetText: {
                en: 'Collect 3 diamonds',
                ru: 'Собери 3 кристалла'
            }
        },
        { //9
            prompt:{
                en: "Time to clean up",
                ru: "Время уборки"
            },
            targetText: {
                en: 'Destroy 10 asteroids',
                ru: 'Уничтожь 10 астероидов'
            }
        },
        { //10
            prompt:{
                en: "It’s a trap!",
                ru: "Это ловушка!"
            },
            targetText: {
                en: 'Destroy all saucers',
                ru: 'Уничтожь все тарелки'
            }
        },
        { //11
            prompt:{
                en: "Such a mess here",
                ru: "Тут такой бардак"
            },
            targetText: {
                en: 'Destroy 15 asteroids',
                ru: 'Уничтожь 15 астероидов'
            }
        },
        { //12
            prompt:{
                en: "Space rocks",
                ru: "Звездные камни"
            },
            targetText: {
                en: 'Destroy 15 asteroids',
                ru: 'Уничтожь 15 астероидов'
            }
        },
        { //13
            prompt:{
                en: "Mission diamond",
                ru: "Миссия кристалл"
            },
            targetText: {
                en: 'Collect 3 diamonds',
                ru: 'Собери 3 кристалла'
            }
        },
        { //14
            prompt:{
                en: "Сherry picking",
                ru: "Сбор урожая"
            },
            targetText: {
                en: 'Collect 3 diamonds',
                ru: 'Собери 3 кристалла'
            }
        },
        { //15
            prompt:{
                en: "Enough bullets for all?",
                ru: "Пуль хватит на всех?"
            },
            targetText: {
                en: 'Destroy 15 asteroids. Don’t run out of ammo.',
                ru: 'Уничтожь 15 астероидов. Не истрать все патроны.'
            }
        },
        { //16
            prompt:{
                en: "Asteroid madness",
                ru: "Космическое безумие"
            },
            targetText: {
                en: 'Destroy 30 asteroids',
                ru: 'Уничтожь 30 астероидов'
            }
        },
        { //17
            prompt:{
                en: "Please reload",
                ru: "Перезарядка"
            },
            targetText: {
                en: 'Destroy 15 asteroids.',
                ru: 'Уничтожь 15 астероидов'
            }
        },
        { //18
            prompt:{
                en: "Are you the boss?",
                ru: "Кто тут хозяин?"
            },
            targetText: {
                en: 'Destroy 5 saucers',
                ru: 'Уничтожь 5 тарелок'
            }
        },
        { //19
            prompt:{
                en: "Get your reward",
                ru: "Заберите ваш приз"
            },
            targetText: {
                en: 'Collect 5 diamonds',
                ru: 'Собери 5 кристаллов'
            }
        },
        { //20
            prompt:{
                en: "Fight!",
                ru: "Сражайся!"
            },
            targetText: {
                en: 'Destroy all saucers',
                ru: 'Уничтожь все тарелки'
            }
        },
        { //21
            prompt:{
                en: "Asteroid rain",
                ru: "Метеоритный дождь"
            },
            targetText: {
                en: 'Destroy 40 asteroids.',
                ru: 'Уничтожь 40 астероидов'
            }
        },
        { //22
            prompt:{
                en: "Too many",
                ru: "Это слишком"
            },
            targetText: {
                en: 'Escape all asteroids',
                ru: 'Увернись от всех астероидов'
            }
        },
        { //23
            prompt:{
                en: "Diamonds are your best friends",
                ru: "Бриллианты - твои лучшие друзья"
            },
            targetText: {
                en: 'Collect 7 diamonds',
                ru: 'Собери 7 кристаллов'
            }
        },
        { //24
            prompt:{
                en: "The salt of the earth",
                ru: "Соль земли"
            },
            targetText: {
                en: 'Collect 7 diamonds. Watch for time.',
                ru: 'Собери 7 кристаллов. Следи за временем.'
            }
        },
        { //25
            prompt:{
                en: "These are fast",
                ru: "А они быстрые"
            },
            targetText: {
                en: 'Destroy 20 asteroids',
                ru: 'Уничтожь 20 астероидов'
            }
        },
        { //26
            prompt:{
                en: "The time is ripe",
                ru: "Куй железо пока горячо"
            },
            targetText: {
                en: 'Destroy 20 asteroids. Watch for time.',
                ru: 'Уничтожь 20 астероидов. Следи за временем.'
            }
        },
        { //27
            prompt:{
                en: "Piece of cake",
                ru: "Пара пустяков"
            },
            targetText: {
                en: 'Destroy 30 asteroids.',
                ru: 'Уничтожь 30 астероидов'
            }
        },
        { //28
            prompt:{
                en: "Please clean it here",
                ru: "Пожалуйста приберись здесь"
            },
            targetText: {
                en: 'Destroy 20 asteroids.',
                ru: 'Уничтожь 20 астероидов'
            }
        },
        { //29
            prompt:{
                en: "Kill ‘em. Kill ‘em fast.",
                ru: "Убей их. Убей их немедленно."
            },
            targetText: {
                en: 'Destroy 5 saucers. Watch for time.',
                ru: 'Уничтожь 5 тарелок. Следи за временем.'
            }
        },
        { //30
            prompt:{
                en: "You are not welcome here",
                ru: "Тебе тут не рады"
            },
            targetText: {
                en: 'Destroy all saucers',
                ru: 'Уничтожь все тарелки'
            }
        },
        { //31
            prompt:{
                en: "Eager beaver",
                ru: "Трудяга"
            },
            targetText: {
                en: 'Destroy 20 asteroids.',
                ru: 'Уничтожь 20 астероидов'
            }
        },
        { //32
            prompt:{
                en: "Make space great again",
                ru: "Сделаем космос снова великим"
            },
            targetText: {
                en: 'Destroy 40 asteroids.',
                ru: 'Уничтожь 40 астероидов'
            }
        },
        { //33
            prompt:{
                en: "Looks like a million dollars.",
                ru: "Большой куш"
            },
            targetText: {
                en: 'Collect 7 diamonds',
                ru: 'Собери 7 кристаллов'
            }
        },
        { //34
            prompt:{
                en: "Hit the jackpot.",
                ru: "Джекпот"
            },
            targetText: {
                en: 'Collect 10 diamonds. Watch for ammo.',
                ru: 'Собери 10 кристаллов. Следи за патронами.'
            }
        },
        { //35
            prompt:{
                en: "Aliens are so angry",
                ru: "Пришельцы очень злы"
            },
            targetText: {
                en: 'Destroy 5 saucers.',
                ru: 'Уничтожь 5 тарелок'
            }
        },
        { //36
            prompt:{
                en: "Time is money.",
                ru: "Время - деньги"
            },
            targetText: {
                en: 'Collect 5 diamonds. Watch for time.',
                ru: 'Собери 5 кристаллов. Следи за временем.'
            }
        },
        { //37
            prompt:{
                en: "Rain again",
                ru: "Снова дождь"
            },
            targetText: {
                en: 'Escape all asteroids',
                ru: 'Увернись от всех астероидов'
            }
        },
        { //38
            prompt:{
                en: "Wrong place, wrong time .",
                ru: "В неправильном месте"
            },
            targetText: {
                en: 'Survive 60 seconds.',
                ru: 'Выживи 60 секунд'
            }
        },
        { //39
            prompt:{
                en: "Treasure collection contest",
                ru: "Конкурс по сборке сокровищ"
            },
            targetText: {
                en: 'Collect 5 diamonds.',
                ru: 'Собери 5 кристаллов'
            }
        },
        { //40
            prompt:{
                en: "Eat them for breakfast?",
                ru: "Ешь их на завтрак?"
            },
            targetText: {
                en: 'Destroy all saucers',
                ru: 'Уничтожь все тарелки'
            }
        },
        { //41
            prompt:{
                en: "In the interim",
                ru: "Между делом"
            },
            targetText: {
                en: 'Destroy 30 asteroids.',
                ru: 'Уничтожь 30 астероидов'
            }
        },
        { //42
            prompt:{
                en: "It's an order",
                ru: "Это приказ"
            },
            targetText: {
                en: 'Destroy 30 asteroids.',
                ru: 'Уничтожь 30 астероидов'
            }
        },
        { //43
            prompt:{
                en: "May the luck be with you.",
                ru: "Да пребудет с тобой удача"
            },
            targetText: {
                en: 'Survive 60 seconds.',
                ru: 'Выживи 60 секунд'
            }
        },
        { //44
            prompt:{
                en: "Chase rainbows",
                ru: "За двумя зайцами"
            },
            targetText: {
                en: 'Collect 5 diamonds.',
                ru: 'Собери 5 кристаллов'
            }
        },
        { //45
            prompt:{
                en: "Storm in a teacup.",
                ru: "Буря в стакане"
            },
            targetText: {
                en: 'Survive 60 seconds.',
                ru: 'Выживи 60 секунд'
            }
        },
        { //46
            prompt:{
                en: "Huff and puff",
                ru: "Пот и слезы"
            },
            targetText: {
                en: 'Escape all asteroids.',
                ru: 'Увернись от всех астероидов'
            }
        },
        { //47
            prompt:{
                en: "From rags to riches.",
                ru: "Через тернии к звездам"
            },
            targetText: {
                en: 'Collect 10 diamonds.',
                ru: 'Собери 10 кристаллов'
            }
        },
        { //48
            prompt:{
                en: "Don’t chicken out",
                ru: "Не бзди"
            },
            targetText: {
                en: 'Destroy 10 saucers. Watch for ammo.',
                ru: 'Уничтожь 10 тарелок. Следи за патронами.'
            }
        },
        { //49
            prompt:{
                en: "Against the clock",
                ru: "Против времени"
            },
            targetText: {
                en: 'Survive 90 seconds.',
                ru: 'Выживи 90 секунд'
            }
        },
        { //50
            prompt:{
                en: "Final countdown",
                ru: "Последний отсчет"
            },
            targetText: {
                en: 'Destroy all saucers',
                ru: 'Уничтожь все тарелки'
            }
        },
    ],
    creditsData: [
        {
            title: {
                en: 'Indicator Games',
                ru: 'Indicator Games'
            }
        },
        {
            title: {
                en: 'Created by:',
                ru: 'Автор:'
            },
            names: ['Ivan Kraev'],
            contact: 'ivan.a.kraev@gmail.com'
        },
        {
            title: {
                en: 'Images by:',
                ru: 'Авторы иллюстраций'
            },
            names: ['Kenney', 'iimages', 'VectorShowStudi', 'WinWin_artlab', 'lilu330', 'In-Finity', 'ararat_art', 'klyaksun', 'vikivector', 'ezagatin']
        },
        {
            title: {
                en: 'Sounds by:',
                ru: 'Авторы звуковых эффектов:'
        },
            names: ['Kenney', 'yd', ]
        },
        {
            title: {
                en:'Inspired by original Asteroids by Atari and Asteroids game by Minimal',
                ru: 'Основано на оригинальной игре Asteroids от Atari и игре Asteroids от Minimal'
            }
        },
        {
            title: {
                en: 'Made with Phaser 3',
                ru:'Сделано на Phaser 3'
            }
        }
    ]
    
}

export default lang