// Ist der Pilz fünf Runden lang von Grasfeldern umgeben explodiert er und vernichtet alle Objekte in seiner Umgebung.
// Ist eine Fee in der Umgebung des Pilzes sammelt sie 24 Samen von ihm und er verschwindet
let {random, Matrix,randomMatrix, grassArr, grazerArr, predatorArr, fairyArr, mushroomArr}=require("./Allgemeines")
const Wesen= require ("./Wesen")
module.exports=class Pilz extends Wesen{

    constructor(x,y){
        super(x,y)
        this.explodeCount=0
        this.colorValue=6
    }

    explode(){
        let nachbarn=this.chooseCell(1)
        if(nachbarn.length>=8){
            this.explodeCount++
            if(this.explodeCount>=5){
                this.updateNeighbours()

                for (let i = 0; i < this.neighbours.length; i++) {
                    let pos=this.neighbours[i]
                    Matrix[pos[1]][pos[0]]=0
                }
                for (let i = 0; i < this.furtherNeighbours.length; i++) {
                    
                    let pos=this.furtherNeighbours[i]
                    
                    Matrix[pos[1]][pos[0]]=0
                    
                }
                this.explodeCount=0
            }
            
        }
        else{
            this.explodeCount=0
        }

    }
    updateNeighbours() {
        this.neighbours = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x - 1, this.y + 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y - 1],
            [this.x + 1, this.y + 1],
            [this.x + 1, this.y],
            [this.x, this.y + 1]

        ]
        this.furtherNeighbours=[
            [this.x-1, this.y - 2],
            [this.x , this.y -2],
            [this.x +1, this.y-2],
            [this.x - 2, this.y - 1],
            [this.x + 2, this.y - 1],
            [this.x - 2, this.y],
            [this.x + 2, this.y],
            [this.x + 2, this.y+1],
            [this.x - 2, this.y+1],
            [this.x + 1, this.y+2],
            [this.x - 1, this.y+2],
            [this.x, this.y+2]
            



        ]
        
    }

    
}