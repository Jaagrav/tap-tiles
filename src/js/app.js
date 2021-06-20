let generateAndMoveTiles = new GenerateAndMoveTiles();
const music = new Music();

document.querySelector(".game_playbtn").addEventListener('click', function(e) {
    gsap.to(".landing", {
        opacity: 0,
        pointEvents: "none",
        translateY: -50
    })
    setTimeout(() => {
        music.play();
        generateAndMoveTiles = new GenerateAndMoveTiles();
        generateAndMoveTiles.play_game();
    }, 1000);
})
gsap.to(".score", {
    duration: 0,
    top: -100
});
music.play();
music.pause();