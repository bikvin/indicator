

export default class topOpenLevelManager{

    constructor(config){
        console.log('topOpenLevelManager constructor');
        this.config = config;
      
    }

    async getTopOpenLevel(target){

        let topOpenLevel
        console.log('target: ' + target);
        if(target === 'vk'){
            // if we play from vk
            console.log('Playing from vk');
            topOpenLevel = 13;


        }
        
        else if(target === 'indicator'){
            topOpenLevel = await this.getTopOpenLevelFromDb(target, this.config.userId);
        }
        else{
            // if the user is on indicator and is not logged in, get the topOpenLevel from localstorage (or zero)
            console.log('No target. ');

        }
        


        return topOpenLevel;
    }

    /// sets topOpenLevel to localstorage
    async setTopOpenLevel(level, target){
        console.log('setTopOpenLevel', 'level=', level, 'target=',target, 'user', user);

        if(!this.config.userId) throw new Error('Error. No userId is set.'); // userId must be set in config

        
        if(target === 'vk'){

        }
        else if(target === 'indicator'){
            try{
                const res = await this.setTopOpenLevelToDb(level, target, this.config.userId);
                return res;
            }
            catch(err){
                console.log(err);
            }
        }
        else{
            console.log('Error. No target is set');
        }

        
    }

    async setTopOpenLevelToDb(level, target, userIdLocalStorage){
        console.log('setTopOpenLevelToDb');
        console.log(level);
        try{
            const res = await fetch('/asteroid_hunters/set_top_level', {
                credentials: 'same-origin',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    //'CSRF-Token': token // <-- is the csrf token as a header
                },
                body: JSON.stringify({                   
                        level: level,
                        target: target,
                        userId: userIdLocalStorage                   
                })
            })
            const data = await res.json()
            
            console.log('data ',data)

            if(data.errors) {
                console.log(data.errors);
            }
            if(data.topOpenLevel){
                console.log(' setTopOpenLevelToDb data.topOpenLevel', data.topOpenLevel);
                return data.topOpenLevel;
            }
        }
        catch (err) {
            console.log(err) 
        }
    }

    async getTopOpenLevelFromDb(target, userIdLocalStorage){

        console.log('getTopLevelFromDB');
        const query = 'target='+target+'&userId='+userIdLocalStorage;
        try{
            const res = await fetch('/asteroid_hunters/get_top_level?'+query, {
                credentials: 'same-origin',
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    //'CSRF-Token': token // <-- is the csrf token as a header
                }
               


            })
            const data = await res.json();

            
            console.log('getTopLevelFromDB data', data);

            
            if(typeof data.topOpenLevel != 'undefined') {
                console.log('data.topOpenLevel2', data.topOpenLevel);
                return data.topOpenLevel;
            }
            else if(data.errors) {
                console.log(data.errors);
                throw new Error(data.errors);
            }
            else{
                throw new Error('Error with data from topOpenLevel server');
            }
        }
        catch (err) {
            console.log(err) 
        }
    }

   
}