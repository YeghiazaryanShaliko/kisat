var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.use(express.static("."));
app.get('/', function (req, res) {
    res.redirect('index.html');
});
server.listen(3000);    


function getMatrix(m, n) {
    var n = 50, m = 50;
    matrix = [];
    for (var y = 0; y < m; ++y) {
        matrix.push([]);
        for (var x = 0; x < n; x += 1) {
            matrix[y].push(Math.round(Math.random() * 4.6))
        }
    }
        return matrix;

}





var Grass = require("./Grass.js");
var Xotaker = require("./Xotaker.js");
var Gishatich = require("./Gishatich.js");
var Drakon = require("./Drakon.js");
var Ararich = require("./Ararich.js");
var fs = require("fs");


grassArr = [];
xotakerArr = [];
gishatichArr = [];
drakonArr = [];
ararichArr = [];

gishatichEaten = 0;
drakonMult = 0;
gishatichMult = 0;

matrix = getMatrix();
for (var y = 0; y < matrix.length; y++) {
    for (var x = 0; x < matrix[y].length; x++) {
        if (matrix[y][x] == 1) {
            var gr = new Grass(x, y, 1);
            grassArr.push(gr);
        }
        else if (matrix[y][x] == 2) {
            var kt = new Xotaker(x, y)
            xotakerArr.push(kt)
        }
        else if (matrix[y][x] == 3) {
            var gt = new Gishatich(x, y)
            gishatichArr.push(gt)
        }
        else if (matrix[y][x] == 4) {
            var dr = new Drakon(x, y)
            drakonArr.push(dr)
        }
        else if (matrix[y][x] == 5) {
            var ar = new Ararich(x, y)
            ararichArr.push(ar)

        }
    }
}

weather = "winter"

function exanak()
{
    if(weather=="winter")
    {
        weather="spring"
    }
    else if(weather=="spring")
    {
        weather="summer"
    }   
    else if(weather=="summer")
    {
        weather="autumn"
    }
    else if(weather=="autumn")
    {
        weather="winter"
    }
    io.sockets.emit('exanak',weather)
}
setInterval(exanak,5000);
setInterval(drawserverayin, 1000);
function drawserverayin() {


    for (var i in grassArr) {
        grassArr[i].mult();
    }
    for (var i in xotakerArr) {
        xotakerArr[i].eat();
        xotakerArr[i].move();
        xotakerArr[i].mult();
        xotakerArr[i].die();
    }
    for (var i in gishatichArr) {
        gishatichArr[i].eat();
        gishatichArr[i].move();
        gishatichArr[i].mult();
        gishatichArr[i].die();
    }
    for (var i in drakonArr) {
        drakonArr[i].eat();
        drakonArr[i].move();
        drakonArr[i].mult();
        drakonArr[i].die();
    }
    for (var i in ararichArr) {
        ararichArr[i].create();
    }
    
    io.sockets.emit("matrix",matrix);
    console.log(weather);
}

var obj = {"info": []};
function main()
{
    var file="statistics.json"
    obj.info.push({ "How many <<Xotaker>> he ate": gishatichEaten});
    obj.info.push({ "How times Drakon spawn(mult)": drakonMult});
    obj.info.push({ "How times Gishatich spawn(mult)": gishatichMult});
    fs.writeFileSync(file,JSON.stringify(obj, null, 4))
}
setInterval(main, 5000)

