var LivingCreature = require("./LivingCreature")
module.exports = class Ararich extends LivingCreature {
  constructor(x, y) {
    super(x, y);
    this.directions = [
      [this.x - 1, this.y - 1],
      [this.x, this.y - 1],
      [this.x + 1, this.y - 1],
      [this.x - 1, this.y],
      [this.x + 1, this.y],
      [this.x - 1, this.y + 1],
      [this.x, this.y + 1],
      [this.x + 1, this.y + 1]
    ];

  }

  chooseCell() {
    var found = [];
    for (var i in this.directions) {
      var x = this.directions[i][0];
      var y = this.directions[i][1];
      if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
        found.push(this.directions[i]);
      }
    }
      return found;
    
    //return random(found);
  }

  create() {

    var arr = this.chooseCell(0);
    var norVandak = arr[Math.floor(Math.random() * arr.length)];
    var x = norVandak[0];
    var y = norVandak[1];
    if (matrix[y][x] == 0) {
      matrix[y][x] = 2;
      var Xotaker = require('./Xotaker.js');
      var kt = new Xotaker(y, x);
      xotakerArr.push(kt);
    }
    else if (matrix[y][x] == 1) {
      var Xotaker = require('./Xotaker.js');
      var kt = new Xotaker(x, y);
      xotakerArr.push(kt);
      matrix[x][y] = 2;
      for (var i in grassArr) {
        if (grassArr[i].x == x && grassArr[i].y == y) {
          grassArr.splice(i, 1);
          break;
        }
      }
    }

  }

}
// var LivingCreature = require('./livingCreature')

// module.exports = class Ararich extends LivingCreature {
//     constructor(x, y, index) {
//      super(x,y,index);
//     }
//     getNewDirections() {
//         this.directions = [
//             [this.x - 1, this.y - 1],
//             [this.x, this.y - 1],
//             [this.x + 1, this.y - 1],
//             [this.x - 1, this.y],
//             [this.x + 1, this.y],
//             [this.x - 1, this.y + 1],
//             [this.x, this.y + 1],
//             [this.x + 1, this.y + 1],
//         ];
//     }
//     chooseCell(character) {
//         this.getNewDirections()
//         return super.chooseCell(character);
//     }

//     create() {
//         var empty = this.chooseCell(0)[ Math.floor(Math.random()*this.chooseCell(0).length)];
//         var empty = this.chooseCell(1)[ Math.floor(Math.random()*this.chooseCell(1).length)];
//         if (empty) {
//             var newX = empty[0];
//             var newY = empty[1];
//             matrix[newY][newX] = 1;
//             var Xotaker = require('./Xotaker.js');
//             var kt = new Xotaker(newX, newY);
//             xotakerArr.push(kt);
//             for (var i in grassArr) {
//                 if (grassArr[i].x == newX && grassArr[i].y == newY) {
//                     grassArr.splice(i, 1);
//                 }
//             }
//         }
//     }
// }