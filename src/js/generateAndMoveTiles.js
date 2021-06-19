class GenerateAndMoveTiles {
    constructor() {
        this.tileSpeed = 0.2;
        this.prevRandomNum = 0;
        this.gameInterval = {};
        this.gameTiles = document.querySelector(".game-tiles-container");
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
            
            tile.setAttribute("tile-clicked", "false");
            tile.addEventListener("click", () => {
                if(tile.className.includes("pressable"))
                    tile.setAttribute("tile-clicked", "true");
                else
                    console.log("stop game due to false touch")
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
                if(tile.className.includes("pressable"))
                    tile.setAttribute("tile-clicked", "true");
                else
                    console.log("stop game due to false touch")
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
        this.generate_next_tile_rows1();
        this.generate_next_tile_rows2();
        this.tileRowHeight = {
            row1: this.tilesContainer1.clientHeight,
            row2: this.tilesContainer2.clientHeight,
        };
        this.tileRowPosition = {
            row1: -this.tileRowHeight.row1 - 400,
            row2: -(this.tileRowHeight.row2 * 2) - 400
        };

        this.tilesContainer1.style.top = `${this.tileRowPosition.row1}px`;
        this.tilesContainer2.style.top = `${this.tileRowPosition.row2}px`;
        
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
                top: `${this.tileRowPosition.row1}px`
            });
            gsap.to(this.tilesContainer2, {
                duration: 0,
                ease: 'none',
                top: `${this.tileRowPosition.row2}px`
            });

            this.checkBelowScreen();
        }, 10);
    }

    checkBelowScreen() {
        if(this.tileRowHeight && this.tileRowPosition)
            document.querySelectorAll(".tile.pressable").forEach((elem, index) => {
                if(
                    (Math.abs(this.tileRowPosition.row1) === elem.offsetTop ||
                    Math.abs(this.tileRowPosition.row2) === elem.offsetTop) &&
                    elem.getAttribute("tile-clicked") === "false"
                ) {
                    if(this.tileRowPosition.row1 > this.tileRowPosition.row2 && elem.parentElement.parentElement.className === "tiles-container1") {
                        this.stop_game();
                    }
                    
                    if(this.tileRowPosition.row1 < this.tileRowPosition.row2 && elem.parentElement.parentElement.className === "tiles-container2") {
                        this.stop_game();
                    }

                }
            })
    }

    stop_game() {
        clearInterval(this.gameInterval)
    }
}