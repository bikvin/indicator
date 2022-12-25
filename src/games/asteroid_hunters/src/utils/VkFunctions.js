export default class VkFunctions{

    constructor(scene){
        //console.log('topOpenLevelManager constructor');
        this.scene = scene;
        this.config = this.scene.config;
      
    }

    showVkAd(){
        
        //console.log('showVkAd')
        const vkBridge = this.config.vkBridge;

        vkBridge.send('VKWebAppShowNativeAds', { ad_format: 'interstitial' })
        .then((data) => {
          if (data.result){
            console.log('Реклама показана');
            // this.scene.debugArray.push('Реклама показана');
            // this.scene.debugText.text = this.scene.debugArray;
        }
          else{
            console.log('Ошибка при показе');
            // this.scene.debugArray.push('Ошибка при показе');
            // this.scene.debugText.text = this.scene.debugArray;
        }
        })
        .catch((error) => { console.log(error); /* Ошибка */ });
        
    }

    downloadVKAd(){

        console.log('downloadVkAd');
        // this.scene.debugArray.push('downloadVkAd');
        // this.scene.debugText.text = this.scene.debugArray;


        const vkBridge = this.config.vkBridge;

    

            vkBridge.send('VKWebAppCheckNativeAds', {
                ad_format: 'interstitial' /* Тип рекламы */ 
                })
                .then((data) => { 
                  if (data.result) { 
                    // Предзагруженные материалы есть
                    console.log('Предзагруженные материалы есть');
                    // this.scene.debugArray.push('Материалов нет');
                    // this.scene.debugText.text = this.scene.debugArray;
                  } else {
                    // Материалов нет
                    console.log('Материалов нет');
                  }    
                })
                .catch((error) => { 
                    console.log(error);
                    // this.scene.debugArray.push('error'); 
                    // this.scene.debugArray.push(error);
                    // this.scene.debugText.text = this.scene.debugArray;
                 });
    }

    addToFavorites() {

      const vkBridge = this.config.vkBridge;

      vkBridge.send('VKWebAppAddToFavorites')
      .then((data) => { 
        if (data.result) {
          // Мини-приложение или игра добавлены в избранное
          console.log('Мини-приложение или игра добавлены в избранное');
          console.log(data.result);
        }
      })
      .catch((error) => {
        // Ошибка
        console.log('Ошибка', error);
      });
    }

    share(message = 'Играю в Asteroid Hunters'){
      this.config.vkBridge.send('VKWebAppShowWallPostBox', {
        message: message,
        attachments: 'https://vk.com/app51396350_145581'
        })
        .then((data) => { 
          if (data.post_id) {
            // Запись размещена
            console.log('Запись размещена', data.post_id);
          }
        })
        .catch((error) => { 
          // Ошибка
          console.log('Ошибка размещения записи', error);
        
        });
    }

    inviteFriends(){


      this.config.vkBridge.send('VKWebAppGetAuthToken', { 
        app_id: 51396350, 
        scope: 'friends,notify'
        })
        .then((data) => { 
          if (data.access_token) {
            // Ключ доступа пользователя получен
            this.config.vkBridge.send('VKWebAppCheckAllowedScopes', {
              scopes: 'friends,notify'
              })
              .then((data) => { 
                if (data.result) {
                  // Права доступа получены
                  this.config.vkBridge.send("VKWebAppShowInviteBox", {})
                  .then(data => console.log(data.success))  
                  .catch(error => console.log(error));
                }
              })
              .catch((error) => {
                // Ошибка
                console.log(error);
              });
          }
        })
        .catch((error) => {
          // Ошибка
          console.log(error);
        });

      

      // this.config.vkBridge.send("VKWebAppShowInviteBox", {})
      //    .then(data => console.log(data.success))  
      //   .catch(error => console.log(error));
    }


    // addToHomeScreen() {
    //   // bridge.send('VKWebAppAddToHomeScreenInfo')
    //   // .then((data) => { 
    //   //   if (data.is_added_to_home_screen) {
    //   //     // Информация получена
    //   //   }
    //   // })
    //   // .catch((error) => {
    //   //   // Ошибка
    //   //   console.log(error);
    //   // });
    // }
}