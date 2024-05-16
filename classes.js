class Gras {
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

class Grasfresser {
    constructor(x, y) {
        this.x = x
        this.y = y
        this.colorValue = 2
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

class Fleischfresser{
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
        if (this.foundFood>=3){
            this.mul()
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
// Sind mehr als drei Viertel der Felder mit Gras belegt, erscheint ein Zauberer.
// Er verteilt zufällig 4 Grasfresser und 4 Fleischfresser auf dem Spielfeld.
// Anschließend verschwindet er wieder.
// Der Zauberer erscheint, nachdem er seine "Geschenke" verteilt hat, erst nach 10 Runden wieder.


class Zauberer{
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

// Die Naturfee fliegt durch das Spielfeld und bewegt sich dabei immer über zwei Felder gleichzeitig
// Ist sie komplett von Grasobjekten umgeben sammelt sie Samen.
// Sammelt sie von einem Grasobjekt dreimal hintereinander Samen, verschwinden diese.
// 8 Samen ergeben ein neues Grasfeld
// Ist die Fee komplett von leeren Feldern umgeben, streut sie ihre Samen. 
// Sie kann maximal 64 Samen tragen.
// Befindet sich ein Pilz in ihrer Umgebung sammelt sie 24 Samen von ihm und der verschwindet.


class Naturfee{
    constructor(x,y){
        this.x=x
        this.y=y
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

// Ist der Pilz fünf Runden lang von Grasfeldern umgeben explodiert er und vernichtet alle Objekte in seiner Umgebung.
// Ist eine Fee in der Umgebung des Pilzes sammelt sie 24 Samen von ihm und er verschwindet

class Pilz{

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