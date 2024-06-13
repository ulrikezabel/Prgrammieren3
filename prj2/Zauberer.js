// Sind mehr als drei Viertel der Felder mit Gras belegt, erscheint ein Zauberer.
// Er verteilt zufällig 4 Grasfresser und 4 Fleischfresser auf dem Spielfeld.
// Anschließend verschwindet er wieder.
// Der Zauberer erscheint, nachdem er seine "Geschenke" verteilt hat, erst nach 10 Runden wieder.
const Grasfresser= require("./Grasfresser")
const Fleischfresser= require("./Fleischfresser")
let {random,Matrix, randomMatrix, grassArr, grazerArr, predatorArr, fairyArr, mushroomArr}=require("./Allgemeines")
const Wesen= require ("./Wesen")
module.exports=class Zauberer extends Wesen{
    constructor(x,y){
        super(x,y)
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
            let neux=Math.floor(random(0,Matrix[0].length-1))
            let neuy=Math.floor(random(0,Matrix.length-1))
            grazerArr.push(new Grasfresser(neux,neuy))
            Matrix[neuy][neux]=2

        }
        for (let i=0; i<4;i++){
            let neux=Math.floor(random(0,Matrix[0].length-1))
            let neuy=Math.floor(random(0,Matrix.length-1))
            predatorArr.push(new Fleischfresser(neux,neuy))
            Matrix[neuy][neux]=3

        }
        
    }

}