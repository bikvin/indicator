import { v4 as uuidv4 } from 'uuid';

export default class topOpenLevelManager{

    static async getTopOpenLevel(target){

        let topOpenLevel
        console.log('target: ' + target);
        if(target === 'vk'){
            // if we play from vk
            console.log('Playing from vk');
            topOpenLevel = 13;


        }
        else if(target === 'indicator' && user){
            // if the user plays from indicator and is logged in
            console.log('Playing from indicator.games and logged in')

            console.log('Userr', user)

            topOpenLevel = await this.getTopOpenLevelFromDb(target);
            //console.log('topOpenLevel2', topOpenLevel);
        }
        else if(target === 'indicator' && !user){
            console.log('Indicator.games. Not logged in. Found userId localstorage.')
            const userId = this.getUserIdLocalStorage();
            topOpenLevel = await this.getTopOpenLevelFromDb(target, userId);
        }
        else{
            // if the user is on indicator and is not logged in, get the topOpenLevel from localstorage (or zero)
            console.log('No target. ');

        }
        


        return topOpenLevel;
    }

    /// sets topOpenLevel to localstorage
    static async setTopOpenLevel(level, target){
        console.log('setTopOpenLevel', 'level=', level, 'target=',target, 'user', user);
        
        if(target === 'vk'){

        }
        else if(target === 'indicator' && user){// if the user plays from indicator and is logged in
            console.log('Indicator. User logged in');
            try{
                const res = await this.setTopOpenLevelToDb(level, target);
                return res;
            }
            catch(err){
                console.log(err);
            }
        }
        else if(target === 'indicator'){// if the user is on indicator and is not logged in
            //localStorage.setItem('topOpenLevel',level);
            //return level;
            console.log('Indicator. No user');
            let userIdLocalStorage = this.getUserIdLocalStorage();
            console.log('userIdLocalStorage',userIdLocalStorage);
            if(!userIdLocalStorage){
                userIdLocalStorage = this.createNewUserIdLocalStorage();               
            }

            const res = await this.setTopOpenLevelToDb(level, target, userIdLocalStorage);
            return res;
        }
        else{
            console.log('Error. No target is set');
        }

        
    }

    static async setTopOpenLevelToDb(level, target, userIdLocalStorage){
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

    static async getTopOpenLevelFromDb(target, userIdLocalStorage){

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

    static getUserIdLocalStorage(){
        const userId = localStorage.getItem('asteroidsUserId');
        return (userId);
    }

    static createNewUserIdLocalStorage(){
        const newUserId = uuidv4(); 
        localStorage.setItem('asteroidsUserId',newUserId);
        return newUserId;
    }
}