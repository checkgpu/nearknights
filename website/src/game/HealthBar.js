class HealthBar {
    constructor (scene, x, y, max, cur)
    {
        this.bar = new window.Phaser.GameObjects.Graphics(scene);
        this.scene = scene;

        this.x = x;
        this.y = y;
        this.value = 100;
        this.p = 76 / 100;
        this.max = max;
        this.cur = cur;

        this.draw();

        scene.add.existing(this.bar);
    }

    decrease (amount)
    {
        this.cur -= amount;

        if (this.cur < 0)
        {
            this.cur = 0;
        }

        this.draw();

        return (this.cur === 0);
    }

    draw ()
    {
        this.bar.clear();

        //  BG
        //this.bar.fillStyle(0x000000);
        //this.bar.fillRect(this.x, this.y, 80, 16);

        //  Health
        this.bar.fillStyle(0x000000);
        this.bar.fillRect(this.x + 2, this.y + 2, 76, 12);

        //if (this.value < 30)
        //{
            //this.bar.fillStyle(0xff0000);
        //}
        //else
        //{
            this.bar.fillStyle(0xa82e01);
        //}

        var d = Math.floor(this.p*(this.cur/this.max)*100);

        this.bar.fillRect(this.x + 2, this.y + 2, d, 12);
    }

    remove() {
      this.bar.destroy()
    }
}
window.HealthBar = HealthBar;