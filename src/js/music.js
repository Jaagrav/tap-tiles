class Music {
    constructor() {
        this.musicPath = "../src/assets/music/";
        this.tracks = ['track1.mp3', 'track2.mp3', 'track3.mp3'];
        this.playMusic = Math.floor(Math.random() * this.tracks.length);
        this.music = new Audio(this.musicPath + this.tracks[this.playMusic]);
    }
    play() {
        this.music.play();
        this.music.volume = 0;
        gsap.to(this.music, {
            duration: 2,
            volume: 1
        });
        this.music.addEventListener("ended", () => {
            this.playMusic = Math.floor(Math.random() * this.tracks.length);
            this.music.src = this.musicPath + this.tracks[this.playMusic];
            this.play();
        })
    }
    pause() {
        gsap.to(this.music, {
            duration: 2,
            volume: 0.1
        });
    }
}