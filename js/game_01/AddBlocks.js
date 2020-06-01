index = 0;
class AddBlocks extends Phaser.Scene {

    constructor() {
        super("AddBlocks");
    }

    preload() {
        this.load.image("block_blue", "../../image/img_game_01/block_blue.png");
        this.load.image("block_pink", "../../image/img_game_01/block_pink.png");
        this.load.image("block_empty", "../../image/img_game_01/block_empty_.png");
        this.load.image("block_empty_yellow", "../../image/img_game_01/block_empty_yellow.png");
        this.load.image('ball_green', "../../image/img_game_01/ball_green.png");
        this.load.image('speaker_big', "../../image/img_game_01/speaker_big_1.png");
        this.load.image('speaker_small', "../../image/img_game_01/speaker_small_1.png");
        this.load.image('block_creater', "../../image/img_game_01/2.png");
        this.load.image('boxUnselected', "../../image/img_game_01/boxUnselected.png");
        this.load.image('boxSelected', "../../image/img_game_01/boxSelected.png");
        this.load.image('frame_of_ballgreens', "../../image/img_game_01/img_01.png");

    }

    create() {
        filling = false;
        completed = false;
        pass = true;
        blockList.length = 0;
        ex = exs[index];
        ///
        this.add.image(config.width / 2, 30, 'frame_of_ballgreens');
        for (var i = 0; i < n_EXS - n_pass_exs; ++i) {
            this.ball_left = this.add.image((config.width-470)/2 + 20 + i * 23, 30, 'ball_green');
        }
        for (var i = 0; i < n_pass_exs; --i) {
            this.ball_right = this.add.image((config.width + 470) / 2 - 20 - i * 23, 30, 'ball_green');
        }
        ///
        this.speaker_big = this.add.image(280, 100, 'speaker_big');
        this.add.text(this.speaker_big.x + 20, this.speaker_big.y - 20, "Add blocks to solve it", my_font_40);
        ///
        this.add.text(350, 150, ex.operator_1 + " + " + ex.operator_2 + " = ", my_font_40);
        this.box_ans_unselected = this.add.image(510, 170, 'boxUnselected');
        this.box_ans_selected = this.add.image(510, 170, 'boxSelected');
        this.box_ans_selected.visible = false;
        ///
        for (var i = 0; i < ex.operator_1; ++i) {
            this.block = this.add.image((960 - 85 * (ex.operator_1 + ex.operator_2) + 10) / 2 + i * 85, 300, "block_blue");
            blockList.push(this.block);
        }
        for (var i = ex.operator_1; i < ex.operator_1 + ex.operator_2; ++i) {
            this.add.image((960 - 85 * (ex.operator_1 + ex.operator_2) + 10) / 2 + i * 85, 325, "block_empty");
        }
        this.block_empty_yellow = this.add.image((960 - 85 * (ex.operator_1 + ex.operator_2) + 10) / 2 + blockList.length * 85, 325, "block_empty_yellow")
        this.block_empty_yellow.visible = false;
        //
        this.speaker_add = this.add.image(580, 500, 'speaker_small');
        this.text_add = this.add.text(620, 487, "Add a block", my_font_26);
        //
        this.speaker_ask = this.add.image(150, 400, 'speaker_small');
        this.text_ask_1 = this.add.text(170, 387, "How many blocks", my_font_26);
        this.text_ask_2 = this.add.text(150, 427, "are there now?", my_font_26);
        this.speaker_ask.visible = false;
        this.text_ask_1.visible = false;
        this.text_ask_2.visible = false;
        //
        this.box_1_unselect = this.add.image(400, 400, 'boxUnselected');
        this.box_1_select = this.add.image(400, 400, 'boxSelected');
        this.box_1_select.visible = false;
        this.number_blocks_now = this.add.text(390, 380, blockList.length, my_font_40);
        //
        this.block_create = this.add.image(550, 425, "block_creater");
        this.block_new = this.add.image(550, 400, "block_pink");

        this.input.on('pointerdown', this.startDragMouse, this);
    }

    update() {
        if (completed && pass) {
            if (this.ball_left) {
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
                        this.scene.start('SubtractBlocks');
                    } else {
                        //debugger;
                        alert("completed");
                    }
                }
            } else {
                //debugger;
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
                    this.scene.start('SubtractBlocks');
                }
            } else {
                ++index;
                if (index >= exs.length) {
                    index = 0;
                }
                this.scene.start('SubtractBlocks');
            }
        }
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

        var x_left = blockList[blockList.length - 1].x;
        var x_right = 960 - (960 - 85 * (ex.operator_1 + ex.operator_2)) / 2 + 70;
        var y_top = 250;
        var y_bottom = 370;
        if (x_left < pointer.x && pointer.x < x_right && y_top < pointer.y && pointer.y < y_bottom) {
            this.block_empty_yellow.visible = true;
        } else {
            this.block_empty_yellow.visible = false;
        }
    }

    stopDragMouse(pointer) {
        this.input.off('pointermove', this.doDragMouse, this);
        this.input.off('pointerup', this.stopDragMouse, this);
        this.addBlock(pointer);
        this.input.on('pointerdown', this.startDragMouse, this);
    }

    addBlock(pointer) {
        var x_left = blockList[blockList.length - 1].x;
        var x_right = 960 - (960 - 85 * (ex.operator_1 + ex.operator_2)) / 2 + 70;
        var y_top = 250;
        var y_bottom = 370;
        if (x_left < pointer.x && pointer.x < x_right && y_top < pointer.y && pointer.y < y_bottom) {
            this.block_new.x = blockList[blockList.length - 1].x + 85;
            this.block_new.y = 300;
            blockList.push(this.block_new);
            this.block_new = null;
            this.fill();
        } else {
            this.block_new.x = 550;
            this.block_new.y = 400;
        }
    }
    
    fill() {
        filling = true;
        if (this.number_blocks_now) {
            this.number_blocks_now.visible = false;
        }
        this.speaker_add.visible = false;
        this.text_add.visible = false;

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
            if (blockList.length == ex.operator_1 + ex.operator_2) {
                //dien kq cua phep tinh
                this.box_ans_unselected.visible = false;
                this.box_ans_selected.visible = true;
                this.input.keyboard.on('keyup', this.check_ans, this);
            } else {
                this.block_new = this.add.image(550, 400, "block_pink");
                this.block_empty_yellow.x = (960 - 85 * (ex.operator_1 + ex.operator_2) + 10) / 2 + blockList.length * 85;
                this.block_empty_yellow.visible = false;

                this.speaker_add.visible = true;
                this.text_add.visible = true;
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
            //Hoan thanh bai
            completed = true;
        } else if (0 <= event.key && event.key <= 9) {
            pass = false;
            my_font_40.fill = "red";
            this.ans = this.add.text(500, 150, event.key, my_font_40);
            my_font_40.fill = "black";
        }
    }
}
