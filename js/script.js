var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var bouton = document.getElementById("monbouton");
var bouton2 = document.getElementById("monbouton2");
var speed1 = document.getElementById("speed1");
var speed2 = document.getElementById("speed2");
var speed3 = document.getElementById("speed3");
var speed4 = document.getElementById("speed4");
var classique = document.getElementById("classique");
var ouvert = document.getElementById("ouvert");
var xPlayer1 = canvas.width - 640;
var yPlayer1 = canvas.height / 2;
var xPlayer2 = canvas.width - 80;
var yPlayer2 = canvas.height / 2;
var playerRadius = 3;
var dX1 = 1;
var dY1 = 0;
var dX2 = -1;
var dY2 = 0;
var trajP1 = [];
var trajP2 = [];
var trajP1Bis = [];
var trajP2Bis = [];
var cpt = 0;
var speed = 2;


//Gestion et choix des vitesses.
speed1.addEventListener("click", function() {
    speed = 1
})
speed2.addEventListener("click", function() {
    speed = 2
})
speed3.addEventListener("click", function() {
    speed = 4
})

// Creation du Player 1
function drawPlayer1() {
    ctx.beginPath();
    ctx.arc(xPlayer1, yPlayer1, playerRadius, 0, Math.PI * 2);
    ctx.fillStyle = "#fbff39";
    ctx.fill();
    ctx.closePath();
}


// Creation du Player 2
function drawPlayer2() {
    ctx.beginPath();
    ctx.arc(xPlayer2, yPlayer2, playerRadius, 0, Math.PI * 2);
    ctx.fillStyle = "#ff394a";
    ctx.fill();
    ctx.closePath();
}

//Reset du canvas
function restart() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    xPlayer1 = canvas.width - 640;
    yPlayer1 = canvas.height / 2;
    xPlayer2 = canvas.width - 80;
    yPlayer2 = canvas.height / 2;
}


//Démarage possible sur bouton ENTRER
document.body.addEventListener("keydown", function(event) {
    event.preventDefault();
    if (event.keyCode === 13) {
        // Speed +1 ici compense le click non effectué (permet une vitesse identique au lancement au click)
        for (let i = 0; i < speed + 1; i++) {
            bouton.click();
        }
    }
});

// Démarage au "click" sur bouton démarer
bouton.addEventListener("click", function() {

    //Modification de la vitesse en effectuant des "clicks" virtuels (dépends de la variable speed)
    for (let i = 0; i < speed; i++) {
        bouton.click();
    }

    draw();

    function draw() {

        // Dessin des joueurs
        drawPlayer1();
        drawPlayer2();
        xPlayer1 += dX1;
        yPlayer1 += dY1;
        xPlayer2 += dX2;
        yPlayer2 += dY2;

        var obj1 = {
            xPlayer1,
            yPlayer1
        };
        var obj2 = {
            xPlayer2,
            yPlayer2
        };

        //Tableaux de coordonnées pour gérer les collisions
        trajP1.unshift(obj1);
        trajP2.unshift(obj2);
        trajP1Bis[cpt] = obj1;
        trajP2Bis[cpt] = obj2;


        // *************************collisions************************

        //match nul (contact tête contre tête)

        for (let i = 0; i < trajP1.length; i++) {
            if (trajP2Bis[cpt].xPlayer2 === trajP1Bis[i].xPlayer1 && trajP2Bis[cpt].yPlayer2 === trajP1Bis[i].yPlayer1 && trajP1Bis[cpt].xPlayer1 === trajP2Bis[i].xPlayer2 && trajP1Bis[cpt].yPlayer1 === trajP2Bis[i].yPlayer2) {
                alert("Match NUL ")
                document.location.reload();
                clearInterval(interval);
                restart();
            }
        }

        //----------------------------------------------------------------

        // Auto collision************

        //Autocollision joueur 2
        for (let i = 1; i < trajP1Bis.length; i++) {
            if (trajP2Bis.length > 1) {
                if (trajP2Bis[i - 1].xPlayer2 === trajP2[0].xPlayer2 && trajP2Bis[i - 1].yPlayer2 === trajP2[0].yPlayer2) {
                    alert("Player 1 Win ")
                    document.location.reload();
                    clearInterval(interval);
                    restart();
                }
            }
        }

        //Autocollision joueur 1
        for (let i = 1; i < trajP1Bis.length; i++) {
            if (trajP1Bis.length > 1) {
                if (trajP1Bis[i - 1].xPlayer1 === trajP1[0].xPlayer1 && trajP1Bis[i - 1].yPlayer1 === trajP1[0].yPlayer1) {
                    alert("Player 2 Win ")
                    document.location.reload();
                    clearInterval(interval);
                    restart();
                }
            }
        }

        //----------------------------------------------------------------

        //Collision entre joueurs********

        //player2 touche player1
        for (let i = 0; i < trajP1.length; i++) {
            if (trajP2Bis[cpt].xPlayer2 === trajP1Bis[i].xPlayer1 && trajP2Bis[cpt].yPlayer2 === trajP1Bis[i].yPlayer1) {
                alert("Player 1 Win ")
                document.location.reload();
                clearInterval(interval);
                restart();

            }
        }

        //player1 touche player2
        for (let i = 0; i < trajP2.length; i++) {
            if (trajP1Bis[cpt].xPlayer1 === trajP2Bis[i].xPlayer2 && trajP1Bis[cpt].yPlayer1 === trajP2Bis[i].yPlayer2) {
                alert("Player 2 Win ")
                document.location.reload();
                clearInterval(interval);
                restart();
            }
        }

        //----------------------------------------------------------------

        // collisions bordures**********

        //Mode OPEN non choisi , mode standart par defaut , collisions bordure effectives
        if (ouvert.checked === false) {
            if (yPlayer2 + playerRadius == 0 || yPlayer2 - playerRadius == canvas.height || xPlayer2 + playerRadius == 0 || xPlayer2 - playerRadius == canvas.width) {
                alert("Player 1 WIN")
                document.location.reload();
                clearInterval(interval);
                restart();
            }
            if (yPlayer1 + playerRadius == 0 || yPlayer1 - playerRadius == canvas.height || xPlayer1 + playerRadius == 0 || xPlayer1 - playerRadius == canvas.width) {
                alert("Player 2 WIN")
                document.location.reload();
                clearInterval(interval);
                restart();
            }

            // choix Mode OPEN pas de collisions bordures .
        } else {
            if (yPlayer2 < 0) {
                yPlayer2 = canvas.height
            }
            if (yPlayer2 > canvas.height) {
                yPlayer2 = 0;
            }
            if (xPlayer2 < 0) {
                xPlayer2 = canvas.width
            }
            if (xPlayer2 > canvas.width) {
                xPlayer2 = 0
            }
            if (yPlayer1 < 0) {
                yPlayer1 = canvas.height
            }
            if (yPlayer1 > canvas.height) {
                yPlayer1 = 0
            }
            if (xPlayer1 < 0) {
                xPlayer1 = canvas.width
            }
            if (xPlayer1 > canvas.width) {
                xPlayer1 = 0
            }
        }

        cpt += 1;

        requestAnimationFrame(draw);
    }

    // gestion des déplacements fléchés  
    document.onkeydown = function(KeyboardEvent) {
        switch (KeyboardEvent.keyCode) {
            case 37:
                dX2 = -1;
                dY2 = 0;
                break;
            case 38:
                dX2 = 0;
                dY2 = -1;
                break;
            case 39:
                dX2 = 1;
                dY2 = 0;
                break;
            case 40:
                dX2 = 0;
                dY2 = 1;
                break;
            case 81:
                dX1 = -1;
                dY1 = 0;
                break;
            case 90:
                dX1 = 0;
                dY1 = -1;
                break;
            case 68:
                dX1 = 1;
                dY1 = 0;
                break;
            case 83:
                dX1 = 0;
                dY1 = 1;
                break;
        }
    };
})