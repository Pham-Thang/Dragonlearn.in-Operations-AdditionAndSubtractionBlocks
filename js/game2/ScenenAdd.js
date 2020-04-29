var completed = false;
var n_block = 0;
var ex;
var box = 1;
var my_font = {
    font: "40px Arial",
    fill: "black"
};
var next = false;

class ScenenAdd extends  Phaser.Scene {

    constructor() {
        super("ScneneAdd");
    }

    preload() {
        this.load.image("blue_block1", "../../image/image_game2/blueblock1.bmp");
        this.load.image("blue_block2", "../../image/image_game2/blueblock2.bmp");
        this.load.image("blue_block3", "../../image/image_game2/blueblock3.bmp");
        this.load.image("blue_block4", "../../image/image_game2/blueblock4.bmp");
        this.load.image("blue_block5", "../../image/image_game2/blueblock5.bmp");
        this.load.image("pink_block", "../../image/image_game2/pinkblock1.png");
        this.load.image("green_ball", "../../image/image_game2/greenball.png");
        this.load.image("speak_big_unSelect", "../../image/image_game2/speaker_big_1.png");
        this.load.image("speak_small_unSelect", "../../image/image_game2/speaker_big_1.png");
        this.load.image("box_Unselected", "../../image/image_game2/boxUnselected.png");
    }
    create(){
        ex = exs[index];
        
        for (var i = 0; i < n_EXS - n_pass_exs; ++i) {
            this.ball_left = this.add.image((config.width - 470) / 2 + 20 + i * 23, 30, 'green_ball');
        }
        for (var i = 0; i < n_pass_exs; ++i) {
            this.add.image((config.width + 470) / 2 - 20 - i * 23, 30, 'green_ball');
        }
        this.speaker_big = this.add.image(280, 100, 'speak_big_unSelect');
        this.add.text(this.speaker_big.x + 20, this.speaker_big.y - 20, "Fill in the blanks", my_font);
        for (var i = 0; i < ex.operator_1; ++i){
            this.add.image((960 - 65 * (ex.operator_1 + ex.operator_2)) / 2 - 40 + i * 65, 250, 'blue_block1');
        }
        for (var i = ex.operator_1; i < ex.operator_2 + ex.operator_1; ++i){
            this.add.image((960 - 65 * (ex.operator_1 + ex.operator_2))/2 - 40 +i*65,250,'pink_block');
        }

        this.box_1 = this.add.image(config.width / 2 - 80, config.height / 2 + 50, 'box_Unselected');
        this.add.text(this.box_1.x + 30, this.box_1.y - 20, "+", my_font);
        this.box_2 = this.add.image(this.box_1.x + 80, this.box_1.y, 'box_Unselected');
        this.add.text(this.box_1.x + 110, this.box_1.y - 20, "=", my_font);
        this.box_3 = this.add.image(this.box_2.x + 80, this.box_1.y, 'box_Unselected');

        this.input.keyboard.on('keydown', this.fill, this);
    }
    update() {
        if (completed) {
            this.ball_left.x += 3;
            if (this.ball_left.x >= (config.width + 470) / 2 - 20 - n_pass_exs * 23) {
                this.ball_left.x >= (config.width + 470) / 2 - 20 - n_pass_exs * 23;
                completed = false;
            }
        }

    }

    fill(event) {
        if (box == 1) {
            if (event.key == exs[index].operator_1) {
                if (this.text_1) {
                    this.text_1.visible = false;
                }
                this.text_1 = this.add.text(this.box_1.x - 10, this.box_1.y - 20, event.key, my_font);
                ++box;
            } else if (0 <= event.key && event.key <= 9) {
                if (this.text_1) {
                    this.text_1.visible = false;
                }
                my_font.fill = 'red';
                this.text_1 = this.add.text(this.box_1.x - 10, this.box_1.y - 20, event.key, my_font);
                my_font.fill = 'black';
            }
            return;
        }
        if (box == 2) {
            if (event.key == exs[index].operator_2) {
                if (this.text_2) {
                    this.text_2.visible = false;
                }
                this.text_2 = this.add.text(this.box_2.x - 10, this.box_2.y - 20, event.key, my_font);
                ++box;
            } else if (0 <= event.key && event.key <= 9) {
                if (this.text_2) {
                    this.text_2.visible = false;
                }
                my_font.fill = 'red';
                this.text_2 = this.add.text(this.box_2.x - 10, this.box_2.y - 20, event.key, my_font);
                my_font.fill = 'black';
            }
            return;
        }
        if (box == 3) {
            if (event.key == exs[index].operator_1 + exs[index].operator_2) {
                if (this.text_3) {
                    this.text_3.visible = false;
                }
                this.text_3 = this.add.text(this.box_3.x - 10, this.box_3.y - 20, event.key, my_font);
                //chuyeenr manf;
                completed = true;
            } else if (0 <= event.key && event.key <= 9) {
                if (this.text_3) {
                    this.text_3.visible = false;
                }
                my_font.fill = 'red';
                this.text_3 = this.add.text(this.box_3.x - 10, this.box_3.y - 20, event.key, my_font);
                my_font.fill = 'black';
            }
        }
    }
}