index = 1;
var blockList = [];
var filling = false;
var completed = false;
class SubtractBlocks extends Phaser.Scene {

    constructor() {
        super("SubtractBlocks");
    }

    preload() {
        this.load.image('block_blue', "../../image/img_game_01/block_blue.png");
        this.load.image("block_pink", "../../image/img_game_01/block_pink.png");
        this.load.image('ball_green', "../../image/img_game_01/ball_green.png");
        this.load.image('speaker_big', "../../image/img_game_01/speaker_big_1.png");
        this.load.image('speaker_small', "../../image/img_game_01/speaker_big_1.png");
        this.load.image('block_foot', "../../image/img_game_01/85.png");
        this.load.image('boxUnselected', "../../image/img_game_01/boxUnselected.png");
        this.load.image('boxSelected', "../../image/img_game_01/boxSelected.png");
        this.load.image('img_01', "../../image/img_game_01/img_01.png");
        this.load.spritesheet('boom', '../../image/img_game_01/81.png', { frameWidth: 150, frameHeight: 150 });

    }

    create() {
        ex = exs[index];
        this.add.image(config.width / 2, 30, 'img_01');
        for (var i = 0; i < n_EXS - n_pass_exs; ++i) {
            this.ball_left = this.add.image((config.width - 470) / 2 + 20 + i * 23, 30, 'ball_green');
        }
        for (var i = 0; i < n_pass_exs; ++i) {
            this.add.image((config.width + 470) / 2 - 20 - i * 23, 30, 'ball_green');
        }

        this.speaker_big = this.add.image(280, 100, 'speaker_big');
        this.add.text(this.speaker_big.x + 20, this.speaker_big.y - 20, "Pop blocks to solve it", my_font);

        this.add.text(350, 150, ex.operator_1 + " - " + ex.operator_2 + " = ", my_font);
        this.box_ans_Unselected = this.add.image(510, 170, 'boxUnselected');
        this.box_ans_Selected = this.add.image(510, 170, 'boxSelected');
        this.box_ans_Selected.visible = false;

        for (var i = ex.operator_1 - ex.operator_2; i < ex.operator_1; ++i) {
            this.add.image((960 - 85*ex.operator_1 + 10) / 2 + i * 85, 325, "block_foot");
        }
        for (var i = 0; i < ex.operator_1; ++i) {
            this.block = this.add.sprite((960 - 85 * ex.operator_1 + 10) / 2 + i * 85, 300, "block_blue");
            this.anims.create({
                key: 'explosive',
                frames: this.anims.generateFrameNumbers('boom'),
                frameRate: 10,
                repeat: 0,
                hideOnComplete: true
            })
            blockList.push(this.block);
        }

        this.pop_icon = this.add.image(530, blockList[blockList.length - 1].y + 100, 'speaker_small');
        this.pop_text = this.add.text(this.pop_icon.x + 20, this.pop_icon.y - 20, "Click a block to pop", my_font);

        this.input.on('pointerdown', this.clickMouse, this);

        this.box_1 = this.add.image(400, 400, 'boxSelected');
        this.box_1.visible = false;
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
    
    clickMouse(event) {
        if (blockList.length > exs[index].operator_1 - exs[index].operator_2 && blockList[blockList.length - 1].x - 40 < event.x && event.x < blockList[blockList.length - 1].x + 40 && blockList[blockList.length - 1].y - 40 < event.x && event.y < blockList[blockList.length - 1].x + 40) {
            blockList[blockList.length - 1].play('explosive');
            blockList.pop();
            this.fill();
        }
    }
    
    
    fill() {
        filling = true;
        this.input.off('pointerdown', this.clickMouse, this);
        this.box_1.visible = true;
        this.input.keyboard.on('keyup', this.check_key, this);
    }

    check_key(event) {
        if (event.key == blockList.length) {
            if (this.number_blocks_now) {
                this.number_blocks_now.visible = false;
            }
            this.number_blocks_now = this.add.text(390, 380, event.key, {
                font: "40px Arial",
                fill: "black"
            });
            this.input.keyboard.off('keyup', this.check_key, this);
            if (blockList.length == ex.operator_1 - ex.operator_2) {
                //dien kq cua phep tinh
                this.box_ans_Unselected.visible = false;
                this.box_ans_Selected.visible = true;
                this.input.keyboard.on('keyup', this.check_ans, this);
            } else {
                this.input.on('pointerdown', this.clickMouse, this);
            }

        } else if (0 <= event.key && event.key <= 9) {
            if (this.number_blocks_now) {
                this.number_blocks_now.visible = false;
            }
            this.number_blocks_now = this.add.text(390, 380, event.key, {
                font: "40px Arial",
                fill: "red"
            });
        }
    }

    check_ans(event) {
        if (this.ans) {
            this.ans.visible = false;
        }
        if (event.key == blockList.length) {
            this.ans = this.add.text(500, 150, event.key, {
                font: "40px Arial",
                fill: "black"
            });
            this.input.keyboard.off('keyup', this.check_ans, this);
            //hoan thanh Ex
            completed = true;
        } else if (0 <= event.key && event.key <= 9) {
            this.nans = this.add.text(500, 150, event.key, {
                font: "40px Arial",
                fill: "red"
            });
        }
    }
}
