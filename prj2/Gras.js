let {random,Matrix, randomMatrix, grassArr, grazerArr, predatorArr, fairyArr, mushroomArr}=require("./Allgemeines")
const Wesen= require ("./Wesen")
module.exports= class Gras extends Wesen{
    constructor(x, y) {
        super(x,y)
        this.colorValue = 1
        this.multiply = 0

    }


    mul() {
        this.multiply++

        if (this.multiply >= 6) {
            
            let nachbarn = this.chooseCell(0)
            if (nachbarn.length > 0) {
                let r = random(nachbarn)
                let neuesGras = new Gras(r[0], r[1])
                grassArr.push(neuesGras)
                Matrix[r[1]][r[0]] = this.colorValue


            }
            this.multiply = 0;


        }

    }

}