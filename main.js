'use strict';

// Variable initalization
var canvas = document.getElementById('cvs'),
    gfx = canvas.getContext('2d'),
    running = true,
    width = 1250,
    height = 620,
    imgs = ["grond", "sky", "sky_cloud_1", "sky_cloud_2", "sky_cloud_3", "wall", "barrel", "wheel"],
    sky_1_offset = 0,
    sky_2_offset = 0,
    sky_3_offset = 0,
    tower_offset = getRandomInt(0, 100),
    images = {},
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

    // Cannon
    gfx.drawImage(images.barrel, -24, 165 + tower_offset);
    gfx.drawImage(images.wheel, 25, 197 + tower_offset);

    // Tower
    gfx.drawImage(images.wall, 0, 230 + tower_offset);

    // Ground
    gfx.drawImage(images.grond, 0, 550);
    gfx.drawImage(images.grond, images.grond.width, 550);
    gfx.drawImage(images.grond, images.grond.width * 2, 550);
    gfx.drawImage(images.grond, images.grond.width * 3, 550);
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
