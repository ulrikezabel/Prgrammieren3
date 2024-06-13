let {random,Matrix, randomMatrix, grassArr, grazerArr, predatorArr, fairyArr, mushroomArr}=require("./Allgemeines")
const Wesen= require ("./Wesen")
module.exports=class Grasfresser extends Wesen{
    constructor(x, y) {
        super(x,y)
        this.colorValue = 2

    }



    die(){
        //Matrix aktualisieren
        Matrix[this.y][this.x]=0
        //Objekt löschen
        for (let i = 0; i < grazerArr.length; i++) {
            let grazObj= grazerArr[i];
            if(grazObj.x===this.x && grazObj.y===this.y){
                grazerArr.splice(i,1)
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
        


        let nachbarn = this.chooseCell(1)
        if (nachbarn.length > 0) {
            let r = random(nachbarn)
            Matrix[r[1]][r[0]] = this.colorValue
            Matrix[this.y][this.x] = 0
            for (let i = 0; i < grassArr.length; i++) {
                let grasObj = grassArr[i];
                if (grasObj.x === r[0] && grasObj.y === r[1]) {
                    
                    grassArr.splice(i, 1)
                    
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
        if (this.foundFood>=5){
            this.mul()
        }
        else if(this.hungry>=5){
            this.die()
        }

    }

    


}