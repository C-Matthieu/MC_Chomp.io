document.addEventListener('DOMContentLoaded', () => {
    let l_button = [];
    let rows = 0;
    let cols = 0;
    let poison = rows - 1;
    document.getElementById('rows').focus();
    let termine = false;
    const ultra_violet = "#6c6ea0ff";

    // Fonction pour générer le plateau de jeu
    function generateGameBoard() {
        const gameBoard = document.getElementById('game-board');
        const gagnant = document.getElementById('gagnant');
        const joueur = document.getElementById('joueur');
        rows = document.getElementById('rows').value;
        cols = document.getElementById('cols').value;

        // Réinitialisation des variables
        termine = false;
        document.getElementById('rows').value = '';
        document.getElementById('cols').value = '';
        poison = rows - 1;
        gameBoard.innerHTML = '';
        gagnant.innerHTML = '';
        joueur.innerHTML = '';
        gagnant.style.color = ultra_violet;
        joueur.style.color = ultra_violet;
        l_button = [];

        // Ajuste le style de la grille en fonction des dimensions
        gameBoard.style.gridTemplateColumns = `repeat(${cols}, 50px)`;

        // Génère les boutons
        for (let i = 0; i < rows; i++) {
            let ligne = [];
            for (let j = 0; j < cols; j++) {
                const button = document.createElement('button');
                button.textContent = ``;
                ligne.push([button, "green"]);

                // Ajoute des événements de clic
                button.addEventListener('click', () => {
                    console.log(`Button (${i}, ${j}) clicked!`);
                    changeValue(i, j);
                });
                button.addEventListener('mouseover', () => highlightSquare(i, j));
                button.addEventListener('mouseout', () => resetHighlight(i,j));

                gameBoard.appendChild(button);
            }
            l_button.push(ligne);
        }
        l_button[rows - 1][0][0].style.backgroundColor = 'red';
        l_button[rows - 1][0][1]= 'red';
        document.getElementById('joueur').innerHTML = 'Au tour de Joueur 1';
    }

    // Fonction pour changer la couleur des cases lorsqu'un joueur clique dessus
    function changeValue(i, j) {
        const joueur = document.getElementById('joueur');
        const gagnant = document.getElementById('gagnant');
        if (termine) {
            return;
        }
        gagnant.innerHTML = '';
        if (l_button[i][j][1] == '#5c5c5c') {
            gagnant.innerHTML = 'Case déjà visitée, veuillez choisir une autre case';
        } 
        else {
            for (let k = 0; k < rows; k++) {
                for (let l = 0; l < cols; l++) {
                    if (k <= i && l >= j) {
                        l_button[k][l][0].style.backgroundColor = '#5c5c5c';
                        l_button[k][l][1] = '#5c5c5c';
                    }
                }
            }
        
            if (joueur.innerHTML == "Au tour de Joueur 1") {
                joueur.innerHTML = "Au tour de Joueur 2";
            } else {
                joueur.innerHTML = "Au tour de Joueur 1";
            }
        }
        if (i == poison && j == 0) {
            gagnant.style.color = 'green';
            joueur.style.color = 'red';
            termine = true;
            document.getElementById('rows').focus();
            if (joueur.innerHTML == "Au tour de Joueur 1") {
                gagnant.innerHTML = 'Joueur 2 a gagné';
                joueur.innerHTML = 'Joueur 1 a perdu';
            } else {
                gagnant.innerHTML = 'Joueur 1 a gagné';
                joueur.innerHTML = 'Joueur 2 a perdu';
            }
        }
    }

    // Fonction pour mettre en surbrillance les cases lorsqu'un joueur passe la souris dessus
    function highlightSquare(i,j){
        for (let k = 0; k < rows; k++) {
            for (let l = 0; l < cols; l++) {
                if (k <= i && l >= j && l_button[k][l][1] != '#5c5c5c') {
                    l_button[k][l][0].style.backgroundColor = 'grey';
                }
            }
        }
    }

    function resetHighlight(i,j){
        for (let k = 0; k < rows; k++) {
            for (let l = 0; l < cols; l++) {
                if (l_button[k][l][1] != l_button[k][l][0].style.backgroundColor) {
                    l_button[k][l][0].style.backgroundColor = l_button[k][l][1];
                }
            }
        }
    }


    // Fonction qui permet de gérer les focus grâce aux touches du clavier
    document.addEventListener('keydown', function (event) {
        if (event.key == "Enter") {
            const row = document.getElementById('rows');
            const col = document.getElementById('cols');
            if (row.value != '' && col.value != '') {
                generateGameBoard();
                document.getElementById('rows').blur();
                document.getElementById('cols').blur();
                document.getElementById('valider').blur();
            } else if (row.value != '' && col.value == '') {
                col.focus();
            } else if (row.value == '' && col.value != '') {
                row.focus();
            } else {
                row.focus();
            }
        }
    });


});

// Fonction pour ouvrir et fermer la modal des règles
function openRulesModal() {
    document.getElementById('rules-modal').style.display = 'flex';
}

function closeRulesModal() {
    document.getElementById('rules-modal').style.display = 'none';
}
