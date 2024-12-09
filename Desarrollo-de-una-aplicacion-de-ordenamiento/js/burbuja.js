//Metodo de la burbuja 
const btnAgregar = document.getElementById('btnAgregar');
const btnOrdenar = document.getElementById('btnOrdenar');
const btnLimpiar = document.getElementById('btnLimpiar');
const listAgregar = document.getElementById('listAgregar');
const listOrdenar = document.getElementById('listOrdenar');
let array = [];

cargarEvento();


function cargarEvento(){ 
    btnAgregar.addEventListener('click', agregar);
    btnOrdenar.addEventListener('click', ordenar);
    btnLimpiar.addEventListener('click', limpiar);
}

function agregar(){
    let numeros = document.getElementById('numeros');
    if(numeros.value.trim() !== ''){
        array.push(Number(numeros.value));
        const li = document.createElement('li');
        li.className = "list-group-item";
        li.textContent = Number(numeros.value);
        listAgregar.appendChild(li);
        console.log('El numero agregado es: ', numeros.value);
    }else{
        alert('Ingrese un numero!')
    }

    //Para limpiar los input
    numeros.value = '';
    numeros.focus();

}
function ordenar(){
    let aux; 
    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array.length - i - 1; j++) {
            if (array[j] > array[ j + 1]) {
                aux = array[j];
                array[j] = array[j + 1];
                array[j + 1] = aux;
            }
        }
        imprimir(i);
    }
    mostrarResultados();
}

function mostrarResultados(){
    listOrdenar.innerHTML = '';
    for (let i = 0; i < array.length; i++) {
        const li = document.createElement('li');
        li.className = "list-group-item";
        li.textContent = array[i];
        listOrdenar.appendChild(li);
    }
}

function imprimir(i){
    let fragment = new DocumentFragment();
    const ul = document.createElement('ul');
    ul.className = "list-group list-group-horizontal";
    ul.textContent = `Iteracion ${i + 1}`;

    array.forEach((numero) => {
        const li = document.createElement('li');
        li.className = "list-group-item";
        li.textContent = numero;
        fragment.appendChild(ul);
    });
}


//Para limpiar los elementos de HTML
function limpiar(){
    while(listAgregar.firstChild){
        listAgregar.removeChild(listAgregar.firstChild);
    }
    while(listOrdenar.firstChild){
        listOrdenar.removeChild(listOrdenar.firstChild);
    }

    array = [];
    const numeros = document.getElementById('numeros');
    numeros.value = "";
    numeros.focus();
}