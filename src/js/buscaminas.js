let row ="";
let col ="";
let bomba = "./src/img/mina20px.jpg"
// Creamos el tablero de juego
function crearTabla(){
    // Pregunamos numero de filas y columnas
    row = parseInt(prompt("Inserta el nuemro de filas:"));
    col = parseInt(prompt("Inserta el nuemro de coumnas:"));
    if(row >= 10 && row <= 30 && col >= 10 && col <= 30){
        let contenedor = document.getElementById("tablero");
        let tabla = `<table>`;

        for (let i = 0; i < row; i++) {
            tabla += `<tr>`;
            for (let j = 0; j < col; j++) {
                tabla += `<td id="td${i}-${j}" data-mina="false" data-minas-pegadas="0" data-oberta="false">`;
                tabla += `<img id="img${i}-${j}"  src="./src/img/fons20px.jpg" onclick="obreCasella(${i}, ${j})">`;
                tabla += `</td>`;            
            }
            tabla += `</tr>`;
        }
        tabla += `</table>`;
        // console.log(tabla);
        // console.log(contenedor);
        contenedor.innerHTML=tabla;
    }else{
        alert("Las filas y culumnas tienen que ser superiores a 10 y inferiores a 30. D:<")
    }
}

// Añadir minas
function setMinas(){
    let celadasTotales = row*col;
    let numMina= celadasTotales * 0.17;
    console.log(celadasTotales, numMina);

    for (let m = 0; m < numMina; m++) {
        let i = parseInt(Math.random() * row);
        // console.log(i);
        let j = parseInt(Math.random() * col);
        // console.log(j);
        // console.log(`setMinas en i=${i}, j=${j}`)
        let casillaIJ = document.getElementById(`td${i}-${j}`);
        //console.log(casillaIJ);
        if( casillaIJ != null ){
            casillaIJ.dataset.mina = "true";
        }
    }
}

// Derecta si la casilla clicada tiene bomba y la muestra
function esMina(x, y){
    if (x >= 0 && x < row && y >= 0 && y < col) {
        let casillaID = document.getElementById(`td${x}-${y}`);

        //console.log(`esMina(${x},${y}) -> ${casillaID}`);
        
        if(casillaID.dataset.mina == "true"){
            return true;
        }else{
            return false;
        }
    } 
}

// Abrir la casilla

function obreCasella(x, y){
    
    if (x >= 0 && x < row && y >= 0 && y < col) {
        let casillaID = document.getElementById(`td${x}-${y}`);
        
        if (casillaID.dataset.oberta == "true") {
            return;
        }
        casillaID.dataset.oberta = "true";

        if(esMina(x,y)){
            mostrarMinas(x,y);
        }else {
            let numeroMinas = casillaID.dataset.minasPegadas;
            console.log(numeroMinas);
            if (numeroMinas == "0") {
                // console.log(`${numeroMinas} alrededor`);
                
                for (let i = -1; i <= 1; i++) {
                    for (let j = -1; j <= 1; j++) {
                        obreCasella(i+x, j+y);
                    } 
                }
            }
            casillaID.innerHTML = numeroMinas;
        }
    }
}

// Detectar las minas pegadas
function contarMinasAdyacentes() {
    for (let i = 0; i < row; i++) {
        for (let j = 0; j < col; j++) {
            let casillaID = document.getElementById(`td${i}-${j}`);
            let numMinas=0;
            if(!esMina(i,j)){
                for (let x = -1; x <= 1; x++) {
                    for (let y = -1; y <= 1; y++) {
                        if(esMina(i+x,j+y)){
                            numMinas++;
                        }   
                    } 
                }
                casillaID.dataset.minasPegadas=""+numMinas;
                //console.log(`i = ${i}, j = ${j} numMinas = ${numMinas}`);
            }  
        }
    }
}
function mostrarMinas(x,y) {
    console.log(`x -> ${x} | y -> ${y}`);
    let contador = 0;
    for (let i = 0; i < row; i++) {
        for (let j = 0; j < col; j++) {
            if(esMina(i,j)){
                let img = document.getElementById(`img${i}-${j}`);
                img.src="./src/img/mina20px.jpg";
            }
        }
    }
}
// funcion que inicializa el juego
function startGame() {
    crearTabla();
    setMinas();
    contarMinasAdyacentes();
}