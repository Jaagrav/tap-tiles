const generateAndMoveTiles = new GenerateAndMoveTiles();

document.querySelector(".game_playbtn").addEventListener('click', function(e) {
    gsap.to(".landing", {
        opacity: 0,
        pointEvents: "none",
        translateY: -50
    })
    setTimeout(() => generateAndMoveTiles.play_game(), 1000);
})