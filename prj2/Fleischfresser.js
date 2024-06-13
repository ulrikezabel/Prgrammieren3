// Erweiterung Geschlechter: 
// Fleischfresser haben ein Geschlecht (männlich oder weiblich). 
// Weibliche Fleischfresser sind orange, männliche rot.
// Fleischfresser vermehren sich nur noch, wenn sie auf einen anderen Fleischfresser des anderen Geschlechts treffen.
// nachdem sich ein Fleischfresser vermehrt hat, kann er sich für 3 Runden nicht mehr vermehren

// Durch die Betätigung des Knopfes Event werden 4 Fleischfresser mit einer Krankheit infeziert.
// Kranke Fleischfresser sind schwarz
// Kranke Fleischfresser wandeln 5 Runden lang jeweils einen Grasfresser in ihrer nahen Umgebung in einen ebenfalls infizierten Fleischresser um

let {random,Matrix, randomMatrix, grassArr, grazerArr, predatorArr, fairyArr, mushroomArr}=require("./Allgemeines")
const Grasfresser= require("./Grasfresser")
const Wesen= require ("./Wesen")
module.exports=class Fleischfresser extends Wesen{
    constructor(x, y) {
        super(x,y)
        this.colorValue = 3
        this.wartezeit=0
        this.krankCount=0
        let rn=random(0,1)
        if (rn===0){
            this.gender="w"
        }
        else if (rn===1){
            this.gender="m"
        }
        if (this.gender==="w"){
            this.colorValue=7
        }
        this.krank=false


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
                let neuerFresser = new Fleischfresser(r[0], r[1])
                predatorArr.push(neuerFresser)
                Matrix[r[1]][r[0]] = this.colorValue


            }
        this.foundFood=0

    }
    infect(){
        let nachbarn = this.chooseCell(2)
        
        if (nachbarn.length > 0) {
            
            let r = random(nachbarn)
            Matrix[r[1]][r[0]] = this.colorValue
            
            for (let i = 0; i < grazerArr.length; i++) {
                let grazObj = grazerArr[i];
                if (grazObj.x === r[0] && grazObj.y === r[1]) {
                    grazerArr.splice(i, 1)
                    break
                }

            }
            let neuerFresser= new Fleischfresser(this.x, this.y)
            neuerFresser.colorValue=8
            predatorArr.push(neuerFresser)
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
        
        
        if(this.hungry>=8){
            this.die()
        }
    }

    eat() {
        this.wartezeit++
        
        
        if (this.krank===true){
            
            if(this.krankCount<5){
                
                this.infect()
                this.krankCount++

            }
            else{
                this.krank=false
                this.colorValue=3
            }

        }
        else{
            let fress

            let fresser= this.chooseCell(3)
            
            if (fresser.length>0){
                
                let fr=random(fresser)
                for (let i = 0; i < predatorArr.length; i++) {
                    let preObj = predatorArr[i];
                    if (preObj.x === fr[0] && preObj.y === fr[1]) {
                        fress=preObj
                    }

                }
                
                
                if (fress.gender!=this.gender){
                    
                    if (this.gender==="w"){
                        if (this.wartezeit>=4){
                            this.mul()
                            
                            this.wartezeit=0

                        }
                        
                    }
                }
                        

            }

                
        
            

            


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
            
            
            if(this.hungry>=8){
                this.die()
            }

            }
            

    }

    

}