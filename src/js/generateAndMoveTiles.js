class GenerateAndMoveTiles {
    constructor() {
        this.tileHeight = window.innerHeight / 4;
        this.tileSpeed = 0.2;
        this.prevRandomNum = 0;
        this.gameInterval = {};
        this.score = 0;
        this.scoreElem = document.querySelector(".score");
        this.gameTiles = document.querySelector(".game-tiles-container");
        this.tilesContainer1 = document.querySelector(".tiles-container1");
        this.tilesContainer2 = document.querySelector(".tiles-container2");
        this.tileRowHeight = {};
        this.tileRowPosition = {};
        this.tileRows = [];

        gsap.to(this.scoreElem, {
            duration: 0,
            top: -100
        });
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
            
            tile.setAttribute("tile-clicked", "false");
            tile.addEventListener("click", () => {
                if(tile.className.includes("pressable")){
                    tile.setAttribute("tile-clicked", "true");
                    this.register_tap(tile, 0);
                }
                else{
                    this.register_tap(tile, 1);
                }
            });

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
            
            tile.setAttribute("tile-clicked", "false");
            tile.addEventListener("click", () => {
                if(tile.className.includes("pressable")){
                    tile.setAttribute("tile-clicked", "true");
                    this.register_tap(tile, 0);
                }
                else{
                    this.register_tap(tile, 1);
                }
            });
            
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
        gsap.to(this.gameTiles, {
            translateY: window.innerHeight
        });
        gsap.to(this.scoreElem, {
            top: 0
        });
        this.score = 0;
        this.tilesContainer1.innerHTML = "";
        this.tilesContainer2.innerHTML = "";
        this.generate_next_tile_rows1();
        this.generate_next_tile_rows2();
        this.tileRowHeight = {
            row1: this.tilesContainer1.clientHeight,
            row2: this.tilesContainer2.clientHeight,
        };
        this.tileRowPosition = {
            row1: -this.tileRowHeight.row1 - window.innerHeight,
            row2: -(this.tileRowHeight.row1 + this.tileRowHeight.row2) - window.innerHeight
        };

        this.tilesContainer1.style.top = `${this.tileRowPosition.row1}px`;
        this.tilesContainer2.style.top = `${this.tileRowPosition.row2}px`;
        
        this.gameInterval = setInterval(() => {
            this.scoreElem.innerHTML = this.score;
            this.tileRowPosition.row1 += 20 * this.tileSpeed;
            this.tileRowPosition.row2 += 20 * this.tileSpeed;

            if(this.tileRowPosition.row1 > 0) {
                this.tileRowPosition.row1 = -this.tileRowHeight.row1 + this.tileRowPosition.row2;
                this.tilesContainer1.innerHTML = "";
                this.generate_next_tile_rows1();
                this.tileSpeed += 0.01;
            }
            
            if(this.tileRowPosition.row2 > 0){
                this.tileRowPosition.row2 = -this.tileRowHeight.row2 + this.tileRowPosition.row1;
                this.tilesContainer2.innerHTML = "";
                this.generate_next_tile_rows2();
                this.tileSpeed += 0.01;
            }

            gsap.to(this.tilesContainer1, {
                duration: 0,
                ease: 'none',
                top: `${this.tileRowPosition.row1}px`,
            });
            gsap.to(this.tilesContainer2, {
                duration: 0,
                ease: 'none',
                top: `${this.tileRowPosition.row2}px`,
            });

            this.checkBelowScreen();
        }, 10);
    }

    checkBelowScreen() {
        if(this.tileRowHeight && this.tileRowPosition){
            let c1Showing = this.tileRowPosition.row1 > this.tileRowPosition.row2;
            document.querySelectorAll(`.tiles-container${c1Showing ? 1 : 2} .tile.pressable`).forEach((elem, index) => {
                if(Math.abs(this.tileRowPosition.row1) <= elem.offsetTop && elem.getAttribute("tile-clicked") === "false") {
                    this.register_tap(elem, 1);
                }
                if(Math.abs(this.tileRowPosition.row2) <= elem.offsetTop && elem.getAttribute("tile-clicked") === "false") {
                    this.register_tap(elem, 1);
                }
            })
        }
    }

    register_tap(elem, type) {

        switch (type) {
            case 0: 
                gsap.to(elem, {
                    duration: .3,
                    opacity: 0,
                });
                this.score++;
                break;
            case 1:
                gsap.to(elem, {
                    duration: .2,
                    background: "rgba(255, 0, 0, 0.6)",
                    opacity: 1
                });
                this.stop_game();
                break;
        }

    }

    stop_game() {
        clearInterval(this.gameInterval);
        gsap.to(this.tilesContainer1, {
            ease: 'none',
            top: `${this.tileRowPosition.row1 - this.tileHeight}px`,
            opacity: 1
        });
        gsap.to(this.tilesContainer2, {
            ease: 'none',
            top: `${this.tileRowPosition.row2 - this.tileHeight}px`,
            opacity: 1
        });
    }
}