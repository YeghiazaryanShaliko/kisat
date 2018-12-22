var LivingCreature = require("./LivingCreature")
module.exports = class Gishatich extends LivingCreature{
    constructor(x, y, index) {
        super(x, y, index);
        this.energy = 5;
        this.index = index;
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
            matrix[y][x] = 3;

            var gt = new Gishatich(x, y, 1)
            gishatichArr.push(gt)
            gishatichMult++;
        }
        if (empty && this.multiply > 1 &&  weather == "spring") {
           
            var x = empty[0];
            var y = empty[1];
            matrix[y][x] = 3;

            var gt = new Gishatich(x, y, 1)
            gishatichArr.push(gt)
            gishatichMult++;
        }
    }
    move()
    {
        var empty = this.chooseCell(0)[ Math.floor(Math.random()*this.chooseCell(0) + this.chooseCell(0).length)];
        this.energy--  
        if (empty) {
           
            var x = empty[0];
            var y = empty[1];
            matrix[y][x] = 3;
            matrix[this.y][this.x] = 0;
            this.y = y;
            this.x = x;

        }      
    }
    eat()
    {
        var empty = this.chooseCell(2)[ Math.floor(Math.random()*this.chooseCell(2).length)];
        if(empty)
        {
            this.energy++
            var x = empty[0];
            var y = empty[1];
            matrix[y][x] = 3; 
            matrix[this.y][this.x] = 0;   
            for(var i in xotakerArr)
            {
                if(xotakerArr[i].x == x && xotakerArr[i].y == y)
                {
                    xotakerArr.splice(i,1)
                }
            }
            this.y = y;
            this.x = x;
            gishatichEaten++;
        }
    }
    die()
    {
        if(this.energy <= 0){
            matrix[this.y][this.x] = 0;
            for(var i in gishatichArr)
            {
                if(gishatichArr[i].x == this.x && gishatichArr[i].y == this.y)
                {
                    gishatichArr.splice(i,1)
                }
            }
        }
    }
}