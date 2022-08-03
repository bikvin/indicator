import lang from "../lang/lang"

export default class BottomLabel{
    constructor(scene){
        this.scene = scene;
        this.init();
    }

    init(){
       
        this.data = [];

        const string = this.buildString(this.data);
        this.label = this.scene.add.text(290, this.scene.config.height-40, string, { font: '27px Comfortaa' }).setOrigin(0).setDepth(3);
    }



    buildString(data){
        let string = '';
        data.forEach((item) => {
            if(item.name != 'time'){ // dont show time word
                //string += `${item.name}: ${item.value}  `;
                string += `${lang[item.name][this.scene.config.lang]}: ${item.value}  `;
            }else{
                string += `${item.value}  `
            }
           
        })

        return string;
    }

    updateLabel(){
        const string = this.buildString(this.data);
        this.label.text = string;
    }

    addItem(item){
        this.data.push(item);

        this.data.sort((a,b) => {
          
            if ( a.order < b.order ){
                
                return -1;
              }
            if ( a.order > b.order ){
            return 1;
            }
            return 0;
        })


        this.updateLabel();

    }

    updateData(item, value){
        const itemObj = this.data.find(obj => obj.name == item);
        itemObj.value = value;
        this.updateLabel();
    }
}