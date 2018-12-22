var LivingCreature = require("./LivingCreature")
module.exports = class Grass extends LivingCreature{
    constructor(x, y, index) {
        super(x, y, index);
        this.multiply = 0;
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
    getNewDirections()
    {
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
    chooseCell(character) {
        this.getNewDirections()
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if(x >= 0 && x<matrix[0].length && y >=0 && y<matrix.length)
            {
            if (matrix[y][x] == character) {
                found.push(this.directions[i]);
            }
        }
        }
        return found;
    }
    
    mult() {
        this.multiply++;
        var empty = this.chooseCell(0)[ Math.floor(Math.random()*this.chooseCell(0).length)];
        if (empty && this.multiply > 6) {
           
            var x = empty[0];
            var y = empty[1];
            matrix[y][x] = 1;

            var gr = new Grass(x, y, 1)
            grassArr.push(gr)
        }
    }
}