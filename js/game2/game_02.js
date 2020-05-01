var config = {
    width: 800,
    height: 600,
    backgroundColor: 0xffffff,
    type: Phaser.AUTO,
    scene: [ScenenAdd],
}

var game = new Phaser.Game(config);
var index = 1;
const n_EXS = 5;
var n_pass_exs = 0;

var exs = [
    {
        operator_1: 2,
        operator_2: 5
    },
    {
        operator_1: 7,
        operator_2: 2
    },
    {
        operator_1: 9,
        operator_2: 2
    },
    {
        operator_1: 7,
        operator_2: 2
    },
    {
        operator_1: 7,
        operator_2: 2
    }

]

