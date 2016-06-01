'use strict';

// Variable initalization
var canvas = document.getElementById('cvs'),
    gfx = canvas.getContext('2d'),
    running = true,
    width = 1250,
    height = 620,
    imgs = ["grond", "sky", "sky_cloud_1", "sky_cloud_2", "sky_cloud_3", "wall", "barrel", "charge", "wheel"],
    sky_1_offset = 0,
    sky_2_offset = 0,
    mouse = [null, null],
    sky_3_offset = 0,
    tower_offset = getRandomInt(0, 100),
    bal = null,
    charging = false,
    mayCharge = true,
    chargeLoc = [null, null],
    chargePower = 80,
    chargeState = false,
    images = {},
    ball = null,
    barrelRotation = 0,
    muteBtn = document.getElementById('btn'),
    music = new Audio('music.mp3');

music.loop = true;
music.play();

// Define the languages
canvas.width = width;
canvas.height = height;

// Load the images
imgs.forEach(function(name) {
    images[name] = new Image();
    images[name].src = "img/" + name + ".png";
});

// Our main game loop
function tick() {
    update();
    gfx.clearRect(0, 0, width, height);
    render();

    if(running) {
        window.requestAnimationFrame(tick);
    }
}

function update() {
    sky_1_offset -= 0.8;
    sky_2_offset -= 0.4;
    sky_3_offset -= 0.2;

    if(sky_1_offset <= -width) {
        sky_1_offset = 0;
    }

    if(sky_2_offset <= -width) {
        sky_2_offset = 0;
    }

    if(sky_3_offset <= -width) {
        sky_3_offset = 0;
    }

    if(mouse[0]) {
        let cannon = [images.barrel.width / 2 - 31, 170 + images.barrel.height / 2 + tower_offset],
            angle = getAngle(cannon, [mouse[0], mouse[1]]);

        if(angle > 20) {
            angle = 20;
        }

        if(angle <= -65) {
            angle = -65;
        }

        barrelRotation = angle;
    }

    // Charging arrow
    if(chargeState) {
        chargePower += 0.8;
    } else {
        chargePower -= 0.8;
    }

    // Min 68% - Max 90%
    if(chargePower < 60 || chargePower > 90) {
        chargeState = !chargeState;
    }

    let x = 45 + (1035 * (chargePower / 900)) * Math.cos(barrelRotation * Math.PI / 180);
    let y = (199 + tower_offset) + (1035 * (chargePower / 900)) * Math.sin(barrelRotation * Math.PI / 180);

    chargeLoc = [x, y];
}

function render() {
    // Sky
    gfx.drawImage(images.sky, 0, 0, width, height);

    gfx.drawImage(images.sky_cloud_1, sky_1_offset, 0, width, height);
    gfx.drawImage(images.sky_cloud_1, width + sky_1_offset, 0, width, height);

    gfx.drawImage(images.sky_cloud_2, sky_2_offset, 0, width, height);
    gfx.drawImage(images.sky_cloud_2, width + sky_2_offset, 0, width, height);

    gfx.drawImage(images.sky_cloud_3, sky_3_offset, 0, width, height);
    gfx.drawImage(images.sky_cloud_3, width + sky_3_offset, 0, width, height);

    // charge
    if(charging && chargeLoc[0]) {
        drawRotatedImage(images.charge, barrelRotation, chargeLoc[0], chargeLoc[1], (images.charge.width / 2) * (chargePower / 100), (images.charge.height / 2) * (chargePower / 100));
    }

    // Cannon
    drawRotatedImage(images.barrel, barrelRotation, 45, 200 + tower_offset);
    gfx.drawImage(images.wheel, 25, 197 + tower_offset);

    // Tower
    gfx.drawImage(images.wall, 0, 230 + tower_offset);

    // Ground
    gfx.drawImage(images.grond, 0, 550);
    gfx.drawImage(images.grond, images.grond.width, 550);
    gfx.drawImage(images.grond, images.grond.width * 2, 550);
    gfx.drawImage(images.grond, images.grond.width * 3, 550);

    // Debug
}

// Start our game
tick();

document.getElementById('container').style.width = cvs.clientWidth + "px";

// Set the sound button toggle
muteBtn.addEventListener("click", function() {
    var tog = muteBtn.getAttribute('data-enabled');

    if(tog == "true") {
        muteBtn.src = "img/mute.png";
        music.volume = 0;
        muteBtn.setAttribute('data-enabled', 'false');
    } else {
        muteBtn.src = "img/sound.png";
        music.volume = 1;
        muteBtn.setAttribute('data-enabled', 'true');
    }
});

/* Utility */
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function drawRotatedImage(img, angle, x, y) {
    drawRotatedImage(img, angle, x, y, img.width, img.height);
}

var TO_RADIANS = Math.PI/180;

function drawRotatedImage(image, angle, x, y, width, height) {
    if(!width) {
        width = image.width;
    }
    if(!height) {
        height = image.height;
    }
	gfx.save();
	gfx.translate(x, y);
	gfx.rotate(angle * TO_RADIANS);
	gfx.drawImage(image, -(width / 2), -(height / 2), width, height);
	gfx.restore();
}

cvs.addEventListener('mousemove', function(evt) {
    let rect = cvs.getBoundingClientRect(),
        root = document.documentElement;

    // return relative mouse position
    let mouseX = evt.clientX - rect.left - root.scrollLeft;
    let mouseY = evt.clientY - rect.top - root.scrollTop;

    mouse = [mouseX, mouseY];
});

cvs.addEventListener('mousedown', function(evt) {
    if(mayCharge) {
        if(!charging) {
            chargePower = 60;
        }

        charging = true;
        mayCharge = false;
    }
});

cvs.addEventListener('mouseup', function(evt) {
    charging = false;
});

function getAngle(pos1, pos2) {
    let angle = Math.atan2(pos2[1] - pos1[1], pos2[0] - pos1[0]) * (180/Math.PI);

    return angle;
}
