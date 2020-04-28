
var filling = false;
var completed = false;
class AddBlocks extends Phaser.Scene {

    constructor() {
        super("AddBlocks");
    }

    preload() {
        this.load.image("block_blue", "../../image/img_game_01/block_blue.png");
        this.load.image("block_pink", "../../image/img_game_01/block_pink.png");
        this.load.image('ball_green', "../../image/img_game_01/ball_green.png");
        this.load.image('speaker_big', "../../image/img_game_01/speaker_big_1.png");
        this.load.image('speaker_small', "../../image/img_game_01/speaker_big_1.png");
        this.load.image('block_foot', "../../image/img_game_01/85.png");
        this.load.image('box', "../../image/img_game_01/box.png");
        this.load.image('img_01', "../../image/img_game_01/img_01.png");

    }

    create() {
        n_blocks = 0;
        ex = exs[index];
        this.add.image(config.width/2, 30, 'img_01');
        for (var i = 0; i < n_EXS - n_pass_exs; ++i) {
            this.ball_left = this.add.image((config.width-470)/2 + 20 + i * 23, 30, 'ball_green');
        }
        for (var i = 0; i < n_pass_exs; ++i) {
            this.add.image((config.width + 470) / 2 - 20 - i * 23, 30, 'ball_green');
        }

        this.speaker_big = this.add.image(250, 100, 'speaker_big');
        this.add.text(280, 80, "Add blocks to solve it", {
            font: "40px Arial",
            fill: "black"
        });

        this.add.text(350, 150, ex.operator_1 + " + " + ex.operator_2 + " = ", {
            font: "40px Arial",
            fill: "black"
        });
        this.box_ans = this.add.image(510, 170, 'box');
        for (var i = 0; i < ex.operator_1; ++i) {
            this.add.image((960 - 85 * (ex.operator_1 + ex.operator_2) + 10) / 2 + i * 85, 300, "block_blue");
            ++n_blocks;
        }
        for (var i = ex.operator_1; i < ex.operator_1 + ex.operator_2; ++i) {
            this.add.image((960 - 85 * (ex.operator_1 + ex.operator_2) + 10) / 2 + i * 85, 325, "block_foot");
        }

        this.image = this.add.image(580, 500, 'speaker_small');
        this.add.text(620, 480, "Add a block", {
            font: "40px Arial",
            fill: "black"
        });

        this.block_create = this.add.image(550, 425, "block_foot");
        this.block_new = this.add.image(550, 400, "block_pink");
        
 
        this.input.on('pointerdown', this.startDragMouse, this);
        
    }

    update() {
        if (completed & this.ball_left.x < (config.width + 470) / 2 - 20 - n_pass_exs * 23) {
            this.ball_left.x += 3;
            if (this.ball_left.x >= (config.width + 470) / 2 - 20 - n_pass_exs * 23) {
                this.ball_left.x = (config.width + 470) / 2 - 20 - n_pass_exs * 23;
            }
        }
        //if (completed & ) {
            
        //    n_pass_exs++;
        //    index++;
        //    //chuyen sang bai tiep theo
        //    if (index < exs.length) {
        //        this.Scene.start("AddBlocks");
        //    }
        //}
    }

    startDragMouse(pointer) {
        if (this.block_new == null) {
            return;
        }
        if (this.block_new.x - 38 < pointer.x && pointer.x < this.block_new.x + 38 && this.block_new.y - 35 < pointer.y && pointer.y < this.block_new.y + 35) {
            this.input.off('pointerdown', this.startDragMouse, this);
            this.input.on('pointermove', this.doDragMouse, this);
            this.input.on('pointerup', this.stopDragMouse, this);
        }
    }

    doDragMouse(pointer) {
        this.block_new.x = pointer.x;
        this.block_new.y = pointer.y;
    }

    stopDragMouse(pointer) {
        this.input.off('pointermove', this.doDragMouse, this);
        this.input.off('pointerup', this.stopDragMouse, this);
        this.addBlock(pointer);
        this.input.on('pointerdown', this.startDragMouse, this);
    }

    addBlock(pointer) {
        ex = exs[index];
        var x_left = (960 - 85 * (ex.operator_1 + ex.operator_2) + 10) / 2 + n_blocks * 85 - 70;
        var x_right = 960 - (960 - 85 * (ex.operator_1 + ex.operator_2) + 10) / 2 + 70;
        var y_top = 250;
        var y_bottom = 370;
        if (x_left < pointer.x && pointer.x < x_right && y_top < pointer.y && pointer.y < y_bottom) {
            this.block_new.x = (960 - 85 * (ex.operator_1 + ex.operator_2) + 10) / 2 + n_blocks * 85;
            this.block_new.y = 300;
            ++n_blocks;
            this.block_new = null;
            this.fill();
        } else {
            this.block_new.x = 550;
            this.block_new.y = 400;
        }
    }
    
    fill() {
        ex = exs[index];
        filling = true;
        this.box_1 = this.add.image(400, 400, 'box');
        this.input.keyboard.on('keyup', this.check_key, this);
    }

    check_key(event) {
        if (event.key == n_blocks) {
            this.box_1 = this.add.image(400, 400, 'box');
            this.number_blocks_now = this.add.text(390, 380, event.key, {
                font: "40px Arial",
                fill: "black"
            });
            this.input.keyboard.off('keyup', this.check_key, this);
            if (n_blocks == ex.operator_1 + ex.operator_2) {
                //dien kq cua phep tinh
                this.input.keyboard.on('keyup', this.check_ans, this);

            } else {
                this.block_new = this.add.image(550, 400, "block_pink");
            }
            
        } else if (0 <= event.key && event.key <= 9) {
            this.box_1 = this.add.image(400, 400, 'box');
            this.number_blocks_now = this.add.text(390, 380, event.key, {
                font: "40px Arial",
                fill: "red"
            });
        }
    }

    check_ans(event) {
        if (event.key == n_blocks) {
            this.box_ans = this.add.image(510, 170, 'box');
            this.number_blocks_now = this.add.text(500, 150, event.key, {
                font: "40px Arial",
                fill: "black"
            });
            this.input.keyboard.off('keyup', this.check_ans, this);
            //sang bai tiep
            completed = true;
        } else if (0 <= event.key && event.key <= 9) {
            this.box_ans = this.add.image(510, 170, 'box');
            this.number_blocks_now = this.add.text(500, 150, event.key, {
                font: "40px Arial",
                fill: "red"
            });
        }
    }
}
