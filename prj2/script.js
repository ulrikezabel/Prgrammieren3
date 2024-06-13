const {setup, draw, explodiere}=require("./main")
var {Matrix,machKrank}=require("./Allgemeines")

const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

// wir speichern das Ergebnis von der setInterval Funktion in einer Variable,
// damit wir es später stoppen können
let intetval;

// wir sagen Express, dass die Dateien im Ordner client statisch sind
// das bedeutet, dass sie direkt an der Browser geschickt werden können
// Der Code für den Client muss also im Ordner client liegen
app.use(express.static('client'));

// wenn ein Benutzer die Seite öffnet, wird er auf die index.html Datei weitergeleitet
app.get('/', (req, res) => {
    res.redirect('/index.html');
});

// wir starten den Server auf dem Port 3000
server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});

// wenn ein Benutzer eine Verbindung zum Server herstellt, wird diese Funktion ausgeführt
io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');

        // wir stoppen das Spiel, wenn der Benutzer die Verbindung trennt
        clearInterval(intetval);
    });


    socket.on('krank', () => {
        
        machKrank()
        
        
    });

    setup();
    intetval = setInterval(() => {
        draw();
        socket.emit('matrix', transformMatrix(Matrix));
    }, 1000);
});


// Diese Funktion sorgt dafür, dass die Matrix nur noch Strings mit Farben enthält
function transformMatrix(matrix) {
    newMatrix=[]
    let col
    for (let i = 0; i < matrix.length; i++) {
        newMatrix[i]=[]
        for (let g = 0; g < matrix[i].length; g++) {
            if (matrix[i][g] === 0) {
                col="white"
            }
            else if (matrix[i][g] === 1) {
                col="green"
            }
            else if (matrix[i][g] === 2) {
                col= "yellow"
            }
            else if (matrix[i][g] === 3) {
                col="red"
            }
            else if (matrix[i][g] === 4) {
                col="purple"
            }
            else if (matrix[i][g] === 5) {
                col="pink"
            }
            else if (matrix[i][g] === 6) {
                col="blue"
            }
            else if (matrix[i][g] === 7) {
                col="orange"
            }
            else if (matrix[i][g] === 8) {
                col="black"
            }
            newMatrix[i][g]= col
        }
    }
    return newMatrix
}