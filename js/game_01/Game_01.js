var config = {
    type: Phaser.AUTO,
    width: 960,
    height: 600,
    backgroundColor: 0xffffff,
    x: 100,
    y: 50,
    physic: {
        default: 'arcade',
        arcade: {
            y: 200
        }
    },
    scene: [ AddBlocks ]
};

var game = new Phaser.Game(config);


const n_EXS = 10;
var n_pass_exs = 1;
var ex;
var n_blocks = 0;
var index = 0;

var exs = [
    {
        operator_1: 6,
        operator_2: 2,
    },
    {
        operator_1: 5,
        operator_2: 3,
    },

]


