// Die Naturfee fliegt durch das Spielfeld und bewegt sich dabei immer über zwei Felder gleichzeitig
// Ist sie komplett von Grasobjekten umgeben sammelt sie Samen.
// Sammelt sie von einem Grasobjekt dreimal hintereinander Samen, verschwinden diese.
// 8 Samen ergeben ein neues Grasfeld
// Ist die Fee komplett von leeren Feldern umgeben, streut sie ihre Samen. 
// Sie kann maximal 64 Samen tragen.
// Befindet sich ein Pilz in ihrer Umgebung sammelt sie 24 Samen von ihm und der verschwindet.
let {random, Matrix,randomMatrix, grassArr, grazerArr, predatorArr, fairyArr, mushroomArr}=require("./Allgemeines")
const Gras= require("./Gras")
const Wesen= require ("./Wesen")
module.exports=class Naturfee extends Wesen{
    constructor(x,y){
        super(x,y)
        this.seedCount=0
        this.takeCount=0
        this.colorValue=5
        this.spreadCount=0
    }
    fly(){
        this.updateNeighbours()
        let nachbarn = this.chooseCell(1)
        if (nachbarn.length === 8) {
            this.collect()
            
        }
        let nachbarPilze=this.chooseCell(6)
        if(nachbarPilze.length>0){
            let r= random(nachbarPilze)
            Matrix[r[1]][r[0]]=0
            this.seedCount+=24

        }
        else{
            let leereNachbarn= this.chooseCell(0)
            
            if(leereNachbarn.length===8){
                
                this.distribute()
            }
            this.move()

        }



    }
    move(){
        let weiteNachbarn = this.chooseFurtherCell(0)
        if (weiteNachbarn.length > 0) {
            let r = random(weiteNachbarn)
            Matrix[r[1]][r[0]] = this.colorValue
            Matrix[this.y][this.x] = 0
            this.x = r[0]
            this.y = r[1]
            this.takeCount=0

        }
        
    }
    collect(){
        this.seedCount+=8
        this.takeCount+=1
        
        if(this.takeCount===3){
            
            for(let i=0; i<this.neighbours.length;i++){
                let pos=this.neighbours[i]
                Matrix[pos[1]][pos[0]]=0
            }
            this.takeCount=0
            

        
            

        }

    }
    distribute(){
        
        if(this.seedCount/8>=1){
            if(this.seedCount>64){
                this.spreadCount=64
            }
            else{
                this.seedCount=this.seedCount
            }
            for(let i=0; i<(Math.floor(this.spreadCount/8));i++){
                let emptyCells= this.chooseCell(0)
                
                if (emptyCells.length > 0) {
                    let r = random(emptyCells)
                    let neuesGras = new Gras(r[0], r[1])
                    grassArr.push(neuesGras)
                    Matrix[r[1]][r[0]] = 1
    
    
                }

            }
            this.seedCount=this.seedCount-Math.floor(this.spreadCount/8)

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
            [this.x - 2, this.y - 2],
            [this.x-1, this.y - 2],
            [this.x , this.y -2],
            [this.x +1, this.y-2],
            [this.x + 2, this.y - 2],
            [this.x - 2, this.y - 1],
            [this.x + 2, this.y - 1],
            [this.x - 2, this.y],
            [this.x + 2, this.y],
            [this.x + 2, this.y+1],
            [this.x - 2, this.y+1],
            [this.x + 2, this.y+2],
            [this.x - 2, this.y+2],
            [this.x + 1, this.y+2],
            [this.x - 1, this.y+2],
            [this.x, this.y+2]
            



        ]
    }

    
    chooseFurtherCell(type) {
        this.updateNeighbours()
        //Liste aller leeren Nachbarsfelder
        let found = []
        for (let i = 0; i < this.furtherNeighbours.length; i++) {
            let pos = this.furtherNeighbours[i]
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