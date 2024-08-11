let col = 6;
let grandezzaMatrice = col * col;
let matrice = [];

let gen = 1;

let vrosso = 0;
let vblu = 0;

//quando vinci diventa 1 e non puoi piu mettere pedine
let pots = 0;

// Creiamo la matrice e la popoliamo con 0
for (let i = 0; i < col; i++) {
    let row = [];
    for (let j = 0; j < col; j++) {
        row.push(0);
    }
    matrice.push(row);
}

console.log(matrice);

// Impostiamo il numero di colonne del contenitore
document.getElementById("contenitore").style.gridTemplateColumns = "repeat(" + col + ", 1fr)";

function vedereTabella(matrice) {
    let container = document.getElementById("contenitore");
    container.innerHTML = ''; // Resettiamo il contenuto del contenitore

    for (let i = 0; i < col; i++) {
        for (let j = 0; j < col; j++) {
            let card = document.createElement('div');

            if (matrice[i][j] === 1) {
                card.style.backgroundColor = "red";
                card.style.color = "red";
            } else if (matrice[i][j] === 2) {
                card.style.backgroundColor = "blue";
                card.style.color = "blue";
            } else {
                card.style.backgroundColor = "white";
                card.style.color = "white";
            }


            // Creiamo un nodo di testo con il numero
            let text = document.createTextNode(matrice[i][j]);
            card.appendChild(text);

            container.appendChild(card);

            // Aggiungi l'evento click per gestire l'interazione
            if (pots == 0) {
                card.addEventListener('click', () => {

                    gen++;
                    let giocatore = (gen % 2) + 1;
                    if (giocatore == 1) {
                        document.getElementById("gioc").innerHTML = "Tocca al giocatore blu";
                        vblu++;
                    }else{
                        document.getElementById("gioc").innerHTML = "Tocca al giocatore rosso";
                        vrosso++;
                    }
                    function controllaSotto(mtrx, x, y) {
                        // fa cadere
                        if (x + 1 < col && mtrx[x + 1][y] == 0) {
                            return controllaSotto(mtrx, x + 1, y);
                        }
                        // Se siamo arrivati in fondo, settiamo il valore a 1
                        if (mtrx[x][y] != 1 && mtrx[x][y] != 2) {
                            mtrx[x][y] = giocatore;


                            let sinistra = 0;
                            let destra = 0;
                            let centro = 0;
                            let basso = 0;

                            // per fare il controllo ho considerato le 4 diagonali di numeri
                            // che passano per un numero e ho sommato i numeri uguali di una diagonale
                            // poi se il numero era >= 3 allora era punto

                            //sinistra
                            function revisions(o, v) {
                                if (o > 0 && v > 0 && mtrx[o][v] == mtrx[o - 1][v - 1]) {
                                    sinistra++
                                    o--;
                                    v--;
                                    revisions(o, v);
                                }
                            }
                            function revisionsb(o, v) {
                                if (o < col - 1 && v < col - 1 && mtrx[o][v] == mtrx[o + 1][v + 1]) {
                                    sinistra++
                                    o++;
                                    v++;
                                    revisionsb(o, v);
                                }
                            }
                            //destra
                            function revisiond(o, v) {
                                if (o < col - 1 && v > 0 && mtrx[o][v] == mtrx[o + 1][v - 1]) {
                                    destra++;
                                    o++;
                                    v--;
                                    revisiond(o, v);
                                }
                            }
                            function revisiondb(o, v) {
                                if (o > 0 && v < col - 1 && mtrx[o][v] == mtrx[o - 1][v + 1]) {
                                    destra++;
                                    o--;
                                    v++;
                                    revisiondb(o, v);
                                }
                            }
                            //centro
                            function revisionc(o, v) {
                                if (v > 0 && mtrx[o][v] == mtrx[o][v - 1]) {
                                    centro++;
                                    v--;
                                    revisionc(o, v);
                                }
                            }
                            function revisioncb(o, v) {
                                if (v < col - 1 && mtrx[o][v] == mtrx[o][v + 1]) {
                                    centro++;
                                    v++;
                                    revisioncb(o, v);
                                }
                            }
                            //basso
                            function revisionb(o, v) {
                                if (o < col - 1 && mtrx[o][v] == mtrx[o + 1][v]) {
                                    basso++;
                                    o++;
                                    revisionb(o, v);
                                }
                            }
                            function revisionbb(o, v) {
                                if (o > 0 && mtrx[o][v] == mtrx[o - 1][v]) {
                                    basso++;
                                    o--;
                                    revisionbb(o, v);
                                }
                            }
                            //sinistra
                            revisions(x, y);
                            revisionsb(x, y);
                            //destra
                            revisiond(x, y);
                            revisiondb(x, y);
                            //centro
                            revisionc(x, y);
                            revisioncb(x, y);
                            //basso
                            revisionb(x, y);
                            revisionbb(x, y);

                            console.log(sinistra, centro, destra, basso);

                            if (sinistra >= 3 || centro >= 3 || destra >= 3 || basso >= 3) {
                                if (mtrx[x][y] == 1) {
                                    document.getElementById("gioc").innerHTML = "Ha vinto il giocatore rosso";
                                    pots = 1;
                                } else {
                                    document.getElementById("gioc").innerHTML = "Ha vinto il giocatore blu";
                                    pots = 1;
                                }
                            }
                        } else {
                            gen++;
                        }
                    }
                    // Chiamiamo la funzione di controllo ricorsiva
                    controllaSotto(matrice, i, j);

                    // Ricarica la matrice aggiornata
                    vedereTabella(matrice);

                });
            }

        }
    }
}
//crometro


let elapsedTime = 0;

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

function startTimer() {
    setInterval(() => {
        elapsedTime++;
        document.getElementById('stopwatch').textContent = formatTime(elapsedTime);
    }, 1000);
}

// Avvia il cronometro quando la pagina viene caricata
window.onload = startTimer;

// Chiamiamo la funzione per generare la griglia iniziale
vedereTabella(matrice);

document.getElementById("gioc").innerHTML = "Tocca al giocatore rosso";

