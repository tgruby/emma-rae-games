    
const PERSPECTIVE = {
    0: 'left_edge',
    1: 'left',
    2: 'center',
    3: 'right',
    4: 'right_edge'
};

const DISTANCE = {
    0: 'remote',
    1: 'distant',
    2: 'far',
    3: 'mid',
    4: 'near'
};

const DIRECTION = {
    'north': 0,
    'west': 1,
    'south': 2,
    'east': 3
};

class Engine {

    constructor(datafile, storyURL) { 
        this.player = {
            inventory: new Array(),
            health: 75,
            hunger: 25,
            score: 0
        };
        this.map = this.parseMap(datafile.gameMaps, 0);

        this.y = datafile.startingPosition[0] + 2; // we are adding a buffer around the map.
        this.x = datafile.startingPosition[1] + 1; // we are adding a buffer around the map.
        this.direction = DIRECTION[datafile.startingDirection];
        this.story = datafile;
        this.storyURL = storyURL;
        this.drawPerspective();
    }

    parseMap(gameMaps, level) {
        let gameMap = gameMaps[level];
        let map = new Array();
        let width = 0;
        for (let i = 0; i < gameMap.length; i++) {
            let row = gameMap[i].match(/.{3}/g);
            row.unshift('      ');  // add two blank spaces to the beginning of the row
            row.push('      ');  // add two blank spaces to the end of the row
            map.push(row);
            if (row.length > width) width = row.length;
            console.log(gameMap[i]);
        }
        // add a blank row to the top and bottom of the map
        let blankRow = new Array(width);
        blankRow.fill('      ');
        map.unshift(blankRow);
        map.unshift(blankRow);
        map.push(blankRow);
        map.push(blankRow);

        return map;
    }

    moveForward() {
        let nextPosition = this.nextPosition();
        // check if the next position is impassible, if it is, don't move.
        let nearbyObject = this.story.gameItems[this.map[nextPosition.y][nextPosition.x]];
        if (nearbyObject === undefined || nearbyObject.type != "obstacle") {
            this.x = nextPosition.x;
            this.y = nextPosition.y;
            let sound = new Audio(this.storyURL + this.story.moveSound);
            if (nearbyObject !== undefined && nearbyObject.sound !== undefined) sound = new Audio(this.storyURL + nearbyObject.sound);
            if (nearbyObject !== undefined && nearbyObject.type == "goal") {
                startConfetti();
                setTimeout(function() {
                    stopConfetti();
                }, 4000);
            }
            this.updateHealth(this.story.moveHealthImpact);
            this.updateHunger(this.story.moveHungerImpact);
            sound.play();
        } else {
            let sound = new Audio(this.storyURL + this.story.moveBlockedSound);
            sound.play();
            this.flashMessage(this.storyURL + this.story.moveBlockedMessage, 250);
        }

        this.drawPerspective();
    }

    updateScore(impact) {
        this.player.score = this.player.score + impact;
        $('#score').text("Score: " + this.player.score);
    }

    updateHealth(impact) {
        this.player.health = this.player.health + impact;
        if (this.player.health > 100) this.player.health = 100;
        if (this.player.health < 0) this.player.health = 0;
        $('#health').css('width', this.player.health + '%');
    }

    updateHunger(impact) {
        this.player.hunger = this.player.hunger + impact;
        if (this.player.hunger > 100) this.player.hunger = 100;
        if (this.player.hunger < 0) this.player.hunger = 0;
        $('#hunger').css('width', (100 - this.player.hunger) + '%');

        // if the player is starving, they lose health
        if (this.player.hunger < 10) {  
            this.updateHealth(-2);
        }
    }

    nextPosition() {
        let nextPosition = {x: this.x, y: this.y};
        if (this.direction == DIRECTION['north']) nextPosition['y'] = this.y - 1;
        if (this.direction == DIRECTION['east']) nextPosition['x'] = this.x + 1;
        if (this.direction == DIRECTION['south']) nextPosition['y'] = this.y + 1;
        if (this.direction == DIRECTION['west']) nextPosition['x'] = this.x - 1;
        return nextPosition;
    }
    
    turnLeft() {
        this.direction = this.direction + 1;
        if (this.direction > 3) this.direction = 0;

        let sound = new Audio(this.storyURL + this.story.moveSound);
        sound.play();

        this.drawPerspective();
    }

    turnRight() {
        this.direction = this.direction - 1;
        if (this.direction < 0) this.direction = 3;

        let sound = new Audio(this.storyURL + this.story.moveSound);
        sound.play();

        this.drawPerspective();
    }

    interact() {
        let nearbyObject = this.story.gameItems[this.map[this.y][this.x]];
        let interactSound = new Audio(this.storyURL + this.story.interactSound);
        if (nearbyObject !== undefined && nearbyObject.interactSound !== undefined)
            interactSound = new Audio(this.storyURL + nearbyObject.interactSound);
        interactSound.play();
        this.flashMessage(this.storyURL + this.story.interactImage, 250);
        if (nearbyObject !== undefined && nearbyObject.type !== 'obstacle') {
            // Put the object in the player's inventory
            this.player.inventory.push(nearbyObject);
            this.map[this.y][this.x] = "   ";
            if (nearbyObject.healthInteractImpact) this.updateHealth(nearbyObject.healthInteractImpact);
            if (nearbyObject.hungerInteractImpact) this.updateHunger(nearbyObject.hungerInteractImpact);
            if (nearbyObject.scoreInteractImpact) this.updateScore(nearbyObject.scoreInteractImpact);
        }
        this.drawPerspective();
    }

    hideWaypoint() {
        $('#waypoint_panel').modal('hide');
    }

    /* given a large matrix and a position within that matrix, and a direction (north, south, east, west) create a 3x3 matrix from the original matrix. */
    getViewableArea() {
        let matrix = this.map;
        let x = this.x;
        let y = this.y;
        let direction = this.direction;

        let viewableArea = new Array();
        if (direction == 0) {
            viewableArea.push([' ',' ',' ',' ',' ']);
            if (matrix[y-3] == undefined) viewableArea.push([' ',' ',' ',' ',' ']);
            else viewableArea.push([matrix[y-3][x-2], matrix[y-3][x-1], matrix[y-3][x], matrix[y-3][x+1], matrix[y-3][x+2]]);
            viewableArea.push([matrix[y-2][x-2], matrix[y-2][x-1], matrix[y-2][x], matrix[y-2][x+1], matrix[y-2][x+2]]);
            viewableArea.push([matrix[y-1][x-2], matrix[y-1][x-1], matrix[y-1][x], matrix[y-1][x+1], matrix[y-1][x+2]]);
            viewableArea.push([matrix[y][x-2], matrix[y][x-1], matrix[y][x], matrix[y][x+1], matrix[y][x+2]]);
        }
        if (direction == 3) {
            viewableArea.push([' ',' ',' ',' ',' ']);
            if (matrix[y-1][x+3] == undefined) viewableArea.push([' ',' ',' ',' ',' ']);
            else viewableArea.push([matrix[y-2][x+3], matrix[y-1][x+3], matrix[y][x+3], matrix[y+1][x+3], matrix[y+2][x+3]]);
            viewableArea.push([matrix[y-2][x+2], matrix[y-1][x+2], matrix[y][x+2], matrix[y+1][x+2], matrix[y+2][x+2]]);
            viewableArea.push([matrix[y-2][x+1], matrix[y-1][x+1], matrix[y][x+1], matrix[y+1][x+1], matrix[y+2][x+1]]);
            viewableArea.push([matrix[y-2][x], matrix[y-1][x], matrix[y][x], matrix[y+1][x], matrix[y+2][x]]);
        }
        if (direction == 2) {
            viewableArea.push([' ',' ',' ',' ',' ']);
            if (matrix[y+3] == undefined) viewableArea.push([' ',' ',' ',' ',' ']);
            else viewableArea.push([matrix[y+3][x+2], matrix[y+3][x+1], matrix[y+3][x], matrix[y+3][x-1], matrix[y+3][x-2]]);
            viewableArea.push([matrix[y+2][x+2], matrix[y+2][x+1], matrix[y+2][x], matrix[y+2][x-1], matrix[y+2][x-2]]);
            viewableArea.push([matrix[y+1][x+2], matrix[y+1][x+1], matrix[y+1][x], matrix[y+1][x-1], matrix[y+1][x-2]]);
            viewableArea.push([matrix[y][x+2],   matrix[y][x+1],   matrix[y][x],   matrix[y][x-1],   matrix[y][x-2]]);
        }
        if (direction == 1) {
            viewableArea.push([' ',' ',' ',' ',' ']);
            if (matrix[y+1][x-3] == undefined) viewableArea.push([' ',' ',' ',' ',' ']);
            else viewableArea.push([matrix[y+2][x-3], matrix[y+1][x-3], matrix[y][x-3], matrix[y-1][x-3], matrix[y-2][x-3]]);
            viewableArea.push([matrix[y+2][x-2], matrix[y+1][x-2], matrix[y][x-2], matrix[y-1][x-2], matrix[y-2][x-2]]);
            viewableArea.push([matrix[y+2][x-1], matrix[y+1][x-1], matrix[y][x-1], matrix[y-1][x-1], matrix[y-2][x-1]]);
            viewableArea.push([matrix[y+2][x],   matrix[y+1][x],   matrix[y][x],   matrix[y-1][x],   matrix[y-2][x]]);
        }
        return viewableArea;
    }

    /* 
        Draw View given the x, y position and the direction the character is facing. 
        Currently this is pretty in-efficent.  Should be tightened up.
    */
    drawPerspective() {
        let timing = Date.now();
        
        let backgroundImage = document.getElementById("background");
        backgroundImage.src = this.storyURL + this.story.backgroundImage;

        let area = this.getViewableArea();

        // now we draw with the correct matrix:
        this.draw(area);
        console.log("Draw Perspective took: " + (Date.now() - timing) + "ms.");
    }

    /* Take in a simple 2d array (5 wide x 5 deep) describing what is available to be seen. 
    For now, use the name of the item supplied.  If no item name is supplied, use 'blank.png'.
    Draw the user's perspective.
    */
    draw(itemPositions) {
        for (let y = 0; y < itemPositions.length; y++) {
            for (let x = 0; x < itemPositions[y].length; x++) {
                let item = this.story.gameItems[itemPositions[y][x]];
                if (item) {
                    if (item.type == 'waypoint' && DISTANCE[y] == 'near' && PERSPECTIVE[x] == 'center') {
                        document.getElementById('waypoint_title').innerHTML = item.title;
                        document.getElementById('waypoint_body').innerHTML = item.html;
                        // play sound. enable space press to get rid of screen
                        let sound = new Audio('sounds/beep.mp3');
                        sound.play();
                        $('#waypoint_panel').modal('show');
                        if (item.showOnce) {
                            this.map[this.y][this.x] = '   ';
                        }
                    } else if (item.type == 'item' || item.type == 'creature' || item.type == 'obstacle' || item.type == 'goal') {
                        let image = this.storyURL + item.image;
                        this.showImage(image, x, y);
                    } else {
                        this.showImage('img/blank.svg', x, y);
                    }
                } else {
                    this.showImage('img/blank.svg', x, y);
                }
            }
        }
    }

    /* show image */  
    showImage(image, x, y) {
        let distance = DISTANCE[y];
        let perspective = PERSPECTIVE[x];
        let front = document.getElementById(distance + '_' + perspective + '_front');
        let side = document.getElementById(distance + '_' + perspective + '_side');
        if (front) front.src = image;
        if (side) side.src = image;
    }

    /* temporarily show an image in the nearest cell when this method is called. */
    flashMessage(image, timing) {  
        let imgPosition = document.getElementById('interact_image');
        imgPosition.src = image;
        setTimeout(function() {
            console.log("Flasing Image back to blank");
            imgPosition.src = "img/blank.svg";
        }, timing);
    }

}