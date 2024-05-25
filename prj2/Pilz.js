let {random, Matrix,randomMatrix, grassArr, grazerArr, predatorArr, fairyArr, mushroomArr}=require("./Allgemeines")
module.exports=class Pilz{

    constructor(x,y){
        this.x=x
        this.y=y
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

    chooseCell(type) {
        this.updateNeighbours()
        //Liste aller leeren Nachbarsfelder
        let found = []
        for (let i = 0; i < this.neighbours.length; i++) {
            let pos = this.neighbours[i]
            if (pos[0] >= 0 && pos[0] < Matrix[0].length && pos[1] >= 0 && pos[1] < Matrix.length) {
                //y-Wert zuerst
                if (Matrix[pos[1]][pos[0]] === type) {
                    found.push(pos)

                }
            }


        }

        return found

    }
}