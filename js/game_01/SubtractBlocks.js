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
        this.load.image('block_empty_blue', "../../image/img_game_01/block_empty_blue.png");
        this.load.image('boxUnselected', "../../image/img_game_01/boxUnselected.png");
        this.load.image('boxSelected', "../../image/img_game_01/boxSelected.png");
        this.load.image('frame_of_ballgreens', "../../image/img_game_01/img_01.png");
        this.load.spritesheet('block_blue_animation', '../../image/img_game_01/block_blue_animation.png', { frameWidth: 150, frameHeight: 150 });

    }

    create() {
        filling = false;
        completed = false;
        pass = true;
        blockList.length = 0;
        ex = exs[index];
        this.add.image(config.width / 2, 30, 'frame_of_ballgreens');
        for (var i = 0; i < n_EXS - n_pass_exs; ++i) {
            this.ball_left = this.add.image((config.width - 470) / 2 + 20 + i * 23, 30, 'ball_green');
        }
        for (var i = 0; i < n_pass_exs; ++i) {
            this.ball_right = this.add.image((config.width + 470) / 2 - 20 - i * 23, 30, 'ball_green');
        }
        //
        this.speaker_big = this.add.image(280, 100, 'speaker_big');
        this.add.text(this.speaker_big.x + 20, this.speaker_big.y - 20, "Pop blocks to solve it", my_font_40);
        //
        this.add.text(350, 150, ex.operator_1 + " - " + ex.operator_2 + " = ", my_font_40);
        this.box_ans_unselected = this.add.image(510, 170, 'boxUnselected');
        this.box_ans_selected = this.add.image(510, 170, 'boxSelected');
        this.box_ans_selected.visible = false;
        //
        for (var i = ex.operator_1 - ex.operator_2; i < ex.operator_1; ++i) {
            this.add.image((960 - 85 * ex.operator_1 + 10) / 2 + i * 85, 325, "block_empty_blue");
        }
        for (var i = 0; i < ex.operator_1; ++i) {
            this.block = this.add.sprite((960 - 85 * ex.operator_1 + 10) / 2 + i * 85, 300, "block_blue_animation");
            blockList.push(this.block);
        }
        this.anims.create({
            key: 'explosive',
            frames: this.anims.generateFrameNumbers('block_blue_animation'),
            frameRate: 10,
            repeat: 0,
            hideOnComplete: true
        })
        //
        this.speaker_pop = this.add.image(530, blockList[blockList.length - 1].y + 100, 'speaker_small');
        this.text_pop = this.add.text(this.speaker_pop.x + 20, this.speaker_pop.y - 20, "Click a block to pop", my_font_26);

        this.box_1_unselect = this.add.image(400, 400, 'boxUnselected');
        this.box_1_select = this.add.image(400, 400, 'boxSelected');
        this.box_1_select.visible = false;
        this.number_blocks_now = this.add.text(390, 380, blockList.length, my_font_40);
        
        this.speaker_ask = this.add.image(150, 400, 'speaker_small');
        this.text_ask_1 = this.add.text(170, 387, "How many blocks", my_font_26);
        this.text_ask_2 = this.add.text(150, 427, "are there now?", my_font_26);
        this.speaker_ask.visible = false;
        this.text_ask_1.visible = false;
        this.text_ask_2.visible = false;

        this.input.on('pointerdown', this.clickMouse, this);
    }

    update() {
        if (completed && pass) {
            if (this.ball_left) {
                debugger;
                this.ball_left.x += 4;
                if (this.ball_left.x >= (config.width + 470) / 2 - 20 - n_pass_exs * 23) {
                    this.ball_left.x = (config.width + 470) / 2 - 20 - n_pass_exs * 23;
                    ++n_pass_exs;
                    if (n_pass_exs < 10) {
                        ++index;
                        if (index >= exs.length) {
                            index = 0;
                        }
                        //debugger;
                        this.scene.start('AddBlocks');
                    } else {
                        //debugger;
                        alert("completed");
                    }
                }
            } else {
                alert("completed");
            }
        } else if (completed && !pass) {
            if (this.ball_right) {
                this.ball_right.x -= 4;
                if (this.ball_right.x <= (config.width - 470) / 2 + 20 + (n_EXS - n_pass_exs) * 23) {
                    this.ball_right.x = (config.width - 470) / 2 + 20 + (n_EXS - n_pass_exs) * 23;
                    --n_pass_exs;
                    ++index;
                    if (index >= exs.length) {
                        index = 0;
                    }
                    this.scene.start('AddBlocks');
                }
            } else {
                ++index;
                if (index >= exs.length) {
                    index = 0;
                }
                this.scene.start('AddBlocks');
            }
        }
    }
    
    clickMouse(event) {
        if (blockList.length > ex.operator_1 - ex.operator_2 && blockList[blockList.length - 1].x - 40 < event.x && event.x < blockList[blockList.length - 1].x + 40 && blockList[blockList.length - 1].y - 40 < event.x && event.y < blockList[blockList.length - 1].x + 40) {
            blockList[blockList.length - 1].play('explosive');
            blockList.pop();
            this.input.off('pointerdown', this.clickMouse, this);
            this.fill();
        }
    }
    
    
    fill() {
        filling = true;
        if (this.number_blocks_now) {
            this.number_blocks_now.visible = false;
        }
        this.speaker_pop.visible = false;
        this.text_pop.visible = false;

        this.speaker_ask.visible = true;
        this.text_ask_1.visible = true;
        this.text_ask_2.visible = true;

        this.box_1_unselect.visible = false;
        this.box_1_select.visible = true;
        this.input.keyboard.on('keyup', this.check_key, this);
    }

    check_key(event) {
        if (this.number_blocks_now) {
            this.number_blocks_now.visible = false;
        }
        if (event.key == blockList.length) {
            this.speaker_ask.visible = false;
            this.text_ask_1.visible = false;
            this.text_ask_2.visible = false;

            this.box_1_unselect.visible = true;
            this.box_1_select.visible = false;

            this.number_blocks_now = this.add.text(390, 380, event.key, my_font_40);
            this.input.keyboard.off('keyup', this.check_key, this);
            if (blockList.length == ex.operator_1 - ex.operator_2) {
                //dien kq cua phep tinh
                this.box_ans_unselected.visible = false;
                this.box_ans_selected.visible = true;
                this.input.keyboard.on('keyup', this.check_ans, this);
            } else {
                this.input.on('pointerdown', this.clickMouse, this);

                this.speaker_pop.visible = true;
                this.text_pop.visible = true;
            }

        } else if (0 <= event.key && event.key <= 9) {
            pass = false;
            my_font_40.fill = "red";
            this.number_blocks_now = this.add.text(390, 380, event.key, my_font_40);
            my_font_40.fill = "black";
        }
    }

    check_ans(event) {
        if (this.ans) {
            this.ans.visible = false;
        }
        if (event.key == blockList.length) {
            this.ans = this.add.text(500, 150, event.key, my_font_40);
            this.input.keyboard.off('keyup', this.check_ans, this);
            //hoan thanh Ex
            completed = true;
        } else if (0 <= event.key && event.key <= 9) {
            pass = false;
            my_font_40.fill = "red";
            this.nans = this.add.text(500, 150, event.key, my_font_40);
            my_font_40.fill = "black";
        }
    }
}
