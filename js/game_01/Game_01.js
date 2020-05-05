var config = {
    type: Phaser.AUTO,
    width: 960,
    height: 600,
    backgroundColor: 0xffffff,
    x: 100,
    y: 50,
    boder: 1,
    physic: {
        default: 'arcade',
        arcade: {
            y: 200
        }
    },
    scene: [AddBlocks, SubtractBlocks],
};

var game = new Phaser.Game(config);


const n_EXS = 10;
var n_pass_exs = 0;
var blockList = [];
var ex = null;
var filling = false;
var completed = false;
var pass = false;
var index = 0;
var my_font_40 = {
    font: "40px Arial",
    fill: "black"
};
var my_font_26 = {
    font: "26px Arial",
    fill: "black"
};


var exs = [
    {
        operator_1: 7,
        operator_2: 2,
    },
    {
        operator_1: 8,
        operator_2: 3,
    },
    {
        operator_1: 6,
        operator_2: 3,
    },
    {
        operator_1: 9,
        operator_2: 1,
    },
    {
        operator_1: 8,
        operator_2: 1,
    },
    {
        operator_1: 7,
        operator_2: 2,
    },
    {
        operator_1: 5,
        operator_2: 3,
    },
    {
        operator_1: 9,
        operator_2: 3,
    },
    {
        operator_1: 8,
        operator_2: 1,
    },
    {
        operator_1: 8,
        operator_2: 2,
    },
    {
        operator_1: 6,
        operator_2: 2,
    },
    {
        operator_1: 7,
        operator_2: 1,
    },
    {
        operator_1: 4,
        operator_2: 3,
    },
    {
        operator_1: 6,
        operator_2: 3,
    }
]


