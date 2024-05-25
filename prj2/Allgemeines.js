
function random(...args) {
    if (args.length === 0) {
        return Math.random();
    } else if (args.length === 1 && Array.isArray(args[0])) {
        return args[0][Math.floor(Math.random() * args[0].length)];
    } else if (args.length === 1 && typeof args[0] === 'number') {
        return Math.floor(Math.random() * args[0]);
    } else if (args.length === 2 && typeof args[0] === 'number' && typeof args[1] === 'number') {
        return Math.floor(Math.random() * (args[1] - args[0] + 1) - args[0]);
    } else {
        console.log(args);
        throw new Error('Invalid arguments');
    }
}
function randomMatrix(x,y){
    Mat=[]
    for (let i=0; i<x; i++){
        Mat[i]=[]
        for(let j=0; j<y; j++){
            let a=Math.floor(random(0,2))
            Mat[i][j]=a



        }

    }
    
    return Mat
}
let grassArr = []
let grazerArr= []
let predatorArr=[]

let fairyArr=[]
let mushroomArr=[]
let Matrix= randomMatrix(30,30)
module.exports={
    random:random,
    Matrix:Matrix,
    randomMatrix: randomMatrix,
    grassArr:grassArr,
    grazerArr:grazerArr,
    predatorArr:predatorArr,
    fairyArr:fairyArr,
    mushroomArr:mushroomArr
}