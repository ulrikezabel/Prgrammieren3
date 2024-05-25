let {random,Matrix, randomMatrix, grassArr, grazerArr, predatorArr, fairyArr, mushroomArr}=require("./Allgemeines")
module.exports=class Zauberer{
    constructor(x,y){
        this.x=x
        this.y=y
        this.colorValue=4
        this.giftCount=10

    }
    appear(){
        Matrix[this.y][this.x]=0
        let grasCount=0
        for (let y = 0; y < Matrix.length; y++) {
            for (let x = 0; x < Matrix[y].length; x++) {
                if (Matrix[y][x] === 1) {
                    grasCount++
                    
                }
            }
        }
        
        this.giftCount++
        if((grasCount/(Matrix.length*Matrix[0].length))>0.75){
            
            if (this.giftCount>=10){
                Matrix[this.y][this.x]=this.colorValue
                this.giftCount=0
                this.sendGifts()
                

            }
            
            
        }

    }

    sendGifts(){
        
        for (let i=0; i<4;i++){
            let neux=Math.floor(random(0,Matrix[0].length))
            let neuy=Math.floor(random(0,Matrix.length))
            grazerArr.push(new Grasfresser(neux,neuy))
            Matrix[neuy][neux]=2

        }
        for (let i=0; i<4;i++){
            let neux=Math.floor(random(0,Matrix[0].length))
            let neuy=Math.floor(random(0,Matrix.length))
            grazerArr.push(new Fleischfresser(neux,neuy))
            Matrix[neuy][neux]=3

        }
        
    }

}