var LivingCreature = require("./LivingCreature")
module.exports = class Drakon extends LivingCreature{
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
            [this.x + 1, this.y + 1],
            [this.x - 2, this.y - 2],
            [this.x, this.y - 2],
            [this.x + 2, this.y - 2],
            [this.x - 2, this.y],
            [this.x + 2, this.y],
            [this.x - 2, this.y + 2],
            [this.x, this.y + 2],
            [this.x + 2, this.y + 2]
        ];
    }
    chooseCell(character) { 
        this.getNewDirections();
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
            matrix[y][x] = 4;

            var dr = new Drakon(x, y, 1)
            drakonArr.push(dr)
            drakonMult++;
        }
        if (empty && this.multiply > 3 && weather == "summer") {
           
            var x = empty[0];
            var y = empty[1];
            matrix[y][x] = 4;

            var dr = new Drakon(x, y, 1)
            drakonArr.push(dr)
            drakonMult++;
        }
    }
    move()
    {
        var empty = this.chooseCell(0)[ Math.floor(Math.random()*this.chooseCell(0).length)];
        this.energy--  
        if (empty) {
           
            var x = empty[0];
            var y = empty[1];
            matrix[y][x] = 4;
            matrix[this.y][this.x] = 0;
            this.y = y;
            this.x = x;

        }      
    }
    eat()
    {
        var empty = this.chooseCell(3)[ Math.floor(Math.random()*this.chooseCell(3).length)];
        var empty = this.chooseCell(2)[ Math.floor(Math.random()*this.chooseCell(2).length)];
        if(empty)
        {
            this.energy++
            var x = empty[0];
            var y = empty[1];
            matrix[y][x] = 4; 
            matrix[this.y][this.x] = 0;   

            for(var i in gishatichArr)
            {
                if(gishatichArr[i].x == x && gishatichArr[i].y == y)
                {
                    gishatichArr.splice(i,1)
                }

            }
            for(var i in xotakerArr)
            {
                if(xotakerArr[i].x == x && xotakerArr[i].y == y)
                {
                    xotakerArr.splice(i,1)
                }

            }            
            this.y = y;
            this.x = x;
        }
    }
    die()
    {
        if(this.energy <= 0){
            matrix[this.y][this.x] = 0;
            for(var i in drakonArr)
            {
                if(drakonArr[i].x == this.x && drakonArr[i].y == this.y)
                {
                    drakonArr.splice(i,1)
                }
            }
        }
    }
}
