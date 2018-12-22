var n = 50;
var m = 50;
var side = 15;
var socket = io();
var weather = "winter";
// var matrix = [];
// for(var y=0; y<m; ++y) {
//   matrix.push([]);
//   for(var x=0; x<n; x += 1) {
//     matrix[y].push(Math.round(Math.random()*4.6))
//   }
// }



// var grassArr = [];
// var xotakerArr = [];
// var gishatichArr = [];
// var drakonArr = [];
// var ararichArr = [];
function setup() {
    frameRate(8);
    createCanvas(m * side, n * side);
    background('#acacac');


}
socket.on("exanak", function (data) {
    weather = data;
})


function clickMix() {
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

    grassArr = [];
    xotakerArr = [];
    gishatichArr = [];
    drakonArr = [];
    ararichArr = [];

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
}

var p = document.getElementById("mix");
p.onclick = clickMix;
socket.on("mix", clickMix);

function drawMatrix(matrix) {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1 && weather != "autumn") {
                fill("green");
            }
            if (matrix[y][x] == 1 && weather == "autumn") {
                fill("#333300");
            }
            if (matrix[y][x] == 1 && weather == "winter") {
                fill("white");
            }
            if (matrix[y][x] == 1 && weather == "spring") {
                fill("#4dffa6");
            }
            else if (matrix[y][x] == 2) {
                fill("yellow");
            }
            else if (matrix[y][x] == 0) {
                fill("#acacac");
            }
            else if (matrix[y][x] == 3) {
                fill("red");
            }
            else if (matrix[y][x] == 4) {
                fill("black");
            }
            else if (matrix[y][x] == 5) {
                fill("blue");
            }
            rect(x * side, y * side, side, side);

        }
    }
    console.log(weather);
}
socket.on("matrix", drawMatrix);
