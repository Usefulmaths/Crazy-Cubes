var canvas = document.getElementById('mainCanvas');
var context = canvas.getContext('2d');

var keys = [];
var width = 500, height = 400, speed = 4;
var score = 0;

var randomcube1Dimensions = 10 + Math.random() * 30;

var randomcube2Dimensions = 10 + Math.random() * 30;

var randomcube3Dimensions = 10 + Math.random() * 30;

var player = {
    x: 20,
    y: 40,
    height: 20,
    width: 20,
    area: function() { return player.height * player.width; }
};

var cube1 = {
    x: Math.random() * (width - 20),
    y: Math.random() * (height - 20),
    height: randomcube1Dimensions,
    width: randomcube1Dimensions
}

var cube2 = {
    x: Math.random() * (width - 20),
    y: Math.random() * (height - 20),
    height: randomcube2Dimensions,
    width: randomcube2Dimensions
}

var cube3 = {
    x: Math.random() * (width - 20),
    y: Math.random() * (height - 20),
    height: randomcube3Dimensions,
    width: randomcube3Dimensions
}


window.addEventListener("keydown", function (e) {
    keys[e.keyCode] = true;
}, false);

window.addEventListener("keyup", function (e) {
    delete keys[e.keyCode];
}, false);

/*
 up - 38
 down - 40
 left - 37
 right - 39
 */


function game() {

    update();
    render();

}

function update() {
    if (keys[37]) {
        player.x -= speed;
    }
    if (keys[38]) {
        player.y -= speed;
    }
    if (keys[39]) {
        player.x += speed;
    }
    if (keys[40]) {
        player.y += speed;
    }
    if (player.x < 0) {
        player.x = 0
    }
    if (player.y < 0) {
        player.y = 0
    }
    if (player.y > height - player.height) {
        player.y = height - player.height;
    }
    if (player.x > width - player.width) {
        player.x = width - player.width;
    }
    if (collision(player, cube1) && player.width * player.height > cube1.width * cube1.height) {
        process();
    }
    else if(collision(player, cube1) && player.width*player.height < cube1.width*cube1.height) {
        largeCubeProcess();
    }

    if (collision(player, cube2) && player.area() > cube2.width * cube2.height) {
        process();
    }
    else if(collision(player, cube2) && player.width*player.height < cube2.width*cube2.height) {
        largeCubeProcess();
    }

    if (collision(player, cube3) && player.width * player.height > cube3.width * cube3.height) {
        process();
    }
    else if(collision(player, cube3) && player.width*player.height < cube3.width*cube3.height) {
        largeCubeProcess();
    }

}

function render() {
    context.clearRect(0, 0, width, height);
    context.fillStyle = "blue";
    context.fillRect(player.x, player.y, player.width, player.height);

    context.fillStyle = "green";
    context.fillRect(cube1.x, cube1.y, cube1.width, cube1.height);
    context.fillRect(cube2.x, cube2.y, cube2.width, cube2.height);
    context.fillRect(cube3.x, cube3.y, cube3.width, cube3.height);


    context.fillStyle = "black";
    context.font = "bold 30px helvetica"
    context.fillText(score, 10, 30);
}

function process() {
    score++;
    cubeAfterCollision(cube1);
    cubeAfterCollision(cube2);
    cubeAfterCollision(cube3);
    playerAfterCollision();

}

function collision(first, second) {
    return !(first.x > second.x + second.width ||
    first.x + first.width < second.x ||
    first.y > second.y + second.height ||
    first.y + first.height < second.y);
}

function cubeAfterCollision(cube) {
    cube.width = 10 + Math.random() * 30;
    cube.height = cube.width;
    cube.x = Math.random() * (width - cube.width);
    cube.y = Math.random() * (height - cube.height);
}

function playerAfterCollision() {
    var expand = 2;
    player.width += expand;
    player.height += expand;
}

function largeCubeProcess() {
    alert("You lose!");

}

setInterval(game, 1000 / 30);