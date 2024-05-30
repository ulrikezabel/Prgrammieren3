let {random,Matrix, randomMatrix, grassArr, grazerArr, predatorArr, fairyArr, mushroomArr}=require("./Allgemeines")
const Grasfresser= require("./Grasfresser")
module.exports=class Fleischfresser{
    constructor(x, y) {
        this.x = x
        this.y = y
        this.colorValue = 3
        this.hungry = 0
        this.foundFood=0
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
        rn=random(0,1)
        if (rn===0){
            this.gender="w"
        }
        else if (rn===1){
            this.gender="m"
        }


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

    die(){
        //Matrix aktualisieren
        Matrix[this.y][this.x]=0
        //Objekt löschen
        for (let i = 0; i < predatorArr.length; i++) {
            let preObj= predatorArr[i];
            if(preObj.x===this.x && preObj.y===this.y){
                predatorArr.splice(i,1)
            }
            
        }

    }

    mul(){
        let nachbarn = this.chooseCell(0)
            if (nachbarn.length > 0) {
                let r = random(nachbarn)
                let neuerFresser = new Grasfresser(r[0], r[1])
                grazerArr.push(neuerFresser)
                Matrix[r[1]][r[0]] = this.colorValue


            }
        this.foundFood=0

    }

    eat() {
        


        let nachbarn = this.chooseCell(2)
        if (nachbarn.length > 0) {
            let r = random(nachbarn)
            Matrix[r[1]][r[0]] = this.colorValue
            Matrix[this.y][this.x] = 0
            for (let i = 0; i < grazerArr.length; i++) {
                let grazObj = grazerArr[i];
                if (grazObj.x === r[0] && grazObj.y === r[1]) {
                    grazerArr.splice(i, 1)
                    break
                }

            }
            this.x = r[0]
            this.y = r[1]
            
            this.foundFood++
            this.hungry=0



        }
        else {
            this.move()
            this.hungry++
            
            this.foundFood=0
        }
        if (this.gender==="w"){

            let fresser= this.chooseCell(3)
            if (fresser>0){
                let fr=random(fresser)
                if (fr.gender!=this.gender){
                    this.mul()}
                

            }

        }
        
        else if(this.hungry>=8){
            this.die()
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
    }

    move() {
        this.updateNeighbours()
        let nachbarn = this.chooseCell(0)
        if (nachbarn.length > 0) {
            let r = random(nachbarn)
            Matrix[r[1]][r[0]] = this.colorValue
            Matrix[this.y][this.x] = 0
            this.x = r[0]
            this.y = r[1]
        }

    }
}