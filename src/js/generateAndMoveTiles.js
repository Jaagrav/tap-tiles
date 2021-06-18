class GenerateAndMoveTiles {
    constructor() {
        this.tileSpeed = 0.2;
        this.prevRandomNum = 0;
        this.gameInterval = {};
        this.tilesContainer1 = document.querySelector(".tiles-container1");
        this.tilesContainer2 = document.querySelector(".tiles-container2");
        this.tileRowHeight = {};
        this.tileRowPosition = {};
        this.tileRows = [];
    }

    getRandomNum() {
        let pressable = 0;
        while(pressable === this.prevRandomNum) {
            pressable = Math.floor(Math.random() * 4);
        } 
        this.prevRandomNum = pressable;
        return pressable;
    }

    generate_tile_row1() {
        const tileRow = document.createElement("div");
        
        tileRow.className = "tile-row";

        let randomNum = this.getRandomNum();
        for(let i = 0 ; i < 4 ; i++) {
            const tile = document.createElement("div");
            tile.className = "tile" + ((randomNum === i) ? " pressable" : "");
            tileRow.appendChild(tile);
        }       

        this.tilesContainer1.appendChild(tileRow);
    }

    generate_tile_row2() {
        const tileRow = document.createElement("div");
        
        tileRow.className = "tile-row";

        let randomNum = this.getRandomNum();
        for(let i = 0 ; i < 4 ; i++) {
            const tile = document.createElement("div");
            tile.className = "tile" + ((randomNum === i) ? " pressable" : "");
            tileRow.appendChild(tile);
        }       
        
        this.tilesContainer2.appendChild(tileRow);
    }

    generate_next_tile_rows1() {
        for(let i = 0; i < 10 ; i++) {
            this.generate_tile_row1();
        }
    }

    generate_next_tile_rows2() {
        for(let i = 0; i < 10 ; i++) {
            this.generate_tile_row2();
        }
    }

    play_game() {
        this.tileRowHeight = {
            row1: this.tilesContainer1.clientHeight,
            row2: this.tilesContainer2.clientHeight,
        };
        this.tileRowPosition = {
            row1: -this.tileRowHeight.row1,
            row2: -this.tileRowHeight.row2 * 2
        };

        this.tilesContainer1.style.transform = `translateY(${-this.tileRowHeight.row1}px)`;
        this.tilesContainer2.style.transform = `translateY(${-this.tileRowHeight.row2 * 2}px)`;
        
        this.gameInterval = setInterval(() => {
            this.tileRowPosition.row1 += this.tileSpeed * 20;
            this.tileRowPosition.row2 += this.tileSpeed * 20;

            if(this.tileRowPosition.row1 > window.innerHeight) {
                this.tileRowPosition.row1 = -this.tileRowHeight.row1 + this.tileRowPosition.row2;
                this.tilesContainer1.innerHTML = "";
                this.generate_next_tile_rows1();
            }
            
            if(this.tileRowPosition.row2 > window.innerHeight){
                this.tileRowPosition.row2 = -this.tileRowHeight.row2 + this.tileRowPosition.row1;
                this.tilesContainer2.innerHTML = "";
                this.generate_next_tile_rows2();
            }

            gsap.to(this.tilesContainer1, {
                duration: 0,
                ease: 'none',
                translateY: `${this.tileRowPosition.row1}px`
            });
            gsap.to(this.tilesContainer2, {
                duration: 0,
                ease: 'none',
                translateY: `${this.tileRowPosition.row2}px`
            });

            this.checkBelowScreen();
        }, 10);
    }

    checkBelowScreen() {
        document.querySelectorAll(".tile.pressable").forEach((elem, index) => {
            console.log(window.innerHeight - elem.offsetTop)
            
        })
    }

    stop_game() {
        clearInterval(this.gameInterval)
    }
}