let {random,Matrix, randomMatrix, grassArr, grazerArr, predatorArr, fairyArr, mushroomArr}=require("./Allgemeines")
module.exports= class Gras {
    constructor(x, y) {
        this.x = x
        this.y = y
        this.colorValue = 1
        this.multiply = 0
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

    chooseCell(type) {
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