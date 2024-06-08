var Gras=require("./Gras")
var Grasfresser=require("./Grasfresser")
var Fleischfresser=require("./Fleischfresser")
var Zauberer=require("./Zauberer")
var Naturfee=require("./Naturfee")
var Pilz=require("./Pilz")

let {random,Matrix, randomMatrix, grassArr, grazerArr, predatorArr, fairyArr, mushroomArr}=require("./Allgemeines")
let fr = 1
let side = 20
let zaubererObj= new Zauberer(14,14)
// function randomMatrix(x,y){
//     Mat=[]
//     for (let i=0; i<x; i++){
//         Mat[i]=[]
//         for(let j=0; j<y; j++){
//             let a=Math.floor(random(0,2))
//             Mat[i][j]=a



//         }

//     }
//     console.log(Mat)
//     return Mat
// }




function setup() {

    Matrix[5][3]=2
    Matrix[2][20]=2
    Matrix[5][5]=3
    Matrix[6][5]=3
    Matrix[25][10]=3
    Matrix[13][15]=3
    Matrix[22][8]=3
    Matrix[23][8]=3
    Matrix[10][10]=5
    Matrix[13][2]=6
    Matrix[9][22]=6
    // Matrix[3][3]=5

    //createCanvas(Matrix[0].length * side, Matrix.length * side);
    //background("#acacac")
    //noStroke()
    //frameRate(fr)
    
    //  let gr= new Gras(2,3)
    //  console.log(gr.chooseCell())
    for (let y = 0; y < Matrix.length; y++) {
        for (let x = 0; x < Matrix[y].length; x++) {
            if (Matrix[y][x] === 1) {
                let grasObj = new Gras(x, y)
                grassArr.push(grasObj)

            }
            else if(Matrix[y][x]===2){
                grazerArr.push(new Grasfresser(x,y))

            }
            else if(Matrix[y][x]===3){
                predatorArr.push(new Fleischfresser(x,y))

            }
            else if(Matrix[y][x]===5){
                fairyArr.push(new Naturfee(x,y))

            }
            else if(Matrix[y][x]===6){
                mushroomArr.push(new Pilz(x,y))

            }
            

        }

    }



}


function drawMatrix(matrix) {
    //strokeWeight(2)
    //stroke("black")
    for (let i = 0; i < matrix.length; i++) {
        for (let g = 0; g < matrix[0].length; g++) {
            if (matrix[i][g] === 0) {
                //fill("white")
            }
            else if (matrix[i][g] === 1) {
                //fill("green")
            }
            else if (matrix[i][g] === 2) {
                //fill("yellow")
            }
            else if (matrix[i][g] === 3) {
                //fill("red")
            }
            else if (matrix[i][g] === 4) {
                //fill("purple")
            }
            else if (matrix[i][g] === 5) {
                //fill("pink")
            }
            else if (matrix[i][g] === 6) {
                //fill("blue")
            }
            //rect(side * g, side * i, side, side)

        }
    }
    for (let zeile = 0; zeile < matrix.length; zeile++) {
        for (let spalte = 0; spalte < matrix[zeile].length; spalte++) {
            element = matrix[zeile][spalte]
            
            // process.stdout.write(element.toString())
    



            // ...
          
        }
        // Wenn der erste Durchlauf von der Äußerden Schleife (Zeile) fertig
        // ist, wollen wir eine neue Zeile auf der Konsole anfangen
        // process.stdout.write("\n")
    }
    // process.stdout.write("\x1b[" + matrix.length + "A")


}


function draw() {
    //console.log("Test")
    let myArr=[...mushroomArr]
    //console.log(mushroomArr)
    for (let i = 0; i < mushroomArr.length; i++) {
        let mushroomObj = myArr[i];
        mushroomObj.explode()
        
    }
    myArr=[... grazerArr]
    //console.log(myArr)
    for (let i = 0; i < myArr.length; i++) {
        let grazerObj= myArr[i];
        grazerObj.eat()
        
    }
    
   
    myArr=[... predatorArr]
    for (let i = 0; i < myArr.length; i++) {
        let predatorObj= myArr[i];
        predatorObj.eat()
        
    }
    myArr=[...fairyArr]
    for (let i = 0; i < myArr.length; i++) {
        let fairyObj = myArr[i];
        fairyObj.fly()
        
    }
    myArr=[... grassArr]
    
    for (let i = 0; i < grassArr.length; i++) {
        let grasObject = grassArr[i];
        grasObject.mul()


    }
    zaubererObj.appear()
    

    drawMatrix(Matrix)

}
function explodiere(){
    
    Matrix[15][15]=0
    Matrix[15][16]=0
    Matrix[15][17]=0
    Matrix[15][18]=0
}

module.exports={
    setup:setup,
    draw:draw,
    explodiere:explodiere
}



