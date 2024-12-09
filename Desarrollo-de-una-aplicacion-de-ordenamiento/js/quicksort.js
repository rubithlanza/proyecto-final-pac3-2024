//El Metodo de Quicksort

const btnAgregar = document.getElementById('btnAgregar');
const btnOrdenar = document.getElementById('btnOrdenar');
const btnLimpiar = document.getElementById('btnLimpiar');
const listAgregar = document.getElementById('listAgregar');
const listOrdenar = document.getElementById('listOrdenar');
let array = [];
let iteracion = 0; // Este nos va ayudar a saber cuantas veces se ha llamado a la funcion de Quicksort

cargarEventos();
function cargarEventos() {
    btnAgregar.addEventListener('click', agregar);
    btnOrdenar.addEventListener('click',() => ordenar(0, array.length -1)); //Es todo es para que se ejecute la funcion de Quicksort
    btnLimpiar.addEventListener('click', limpiar);
}


function agregar() {
    const numeros = document.getElementById('numeros');
    if(numeros.value.trim() !== ''){
        array.push(Number(numeros.value));
        const li = document.createElement('li');
        li.className = 'list-group-item';
        li.textContent = Number(numeros.value);
        listAgregar.appendChild(li);
        console.log('El numero agregado es: ', numeros.value);
        console.log(array);
    }else{
        alert('Ingrese un numero!')
    }

    //Para limpiar los input 
    numeros.value = '';
    numeros.focus();
}

function ordenar(primero, ultimo){
    if(primero < ultimo){
        let particion = validarMetodo(primero, ultimo);
        iteracion ++;
        imprimir(iteracion);
        console.log(`Las iteraciones son ${iteracion} del array ${array}`);
        ordenar(primero, particion -1);
        ordenar(particion + 1, ultimo);
    }else if(primero === ultimo){
        console.log('El array ya esta ordenado');
        iteracion ++;
        imprimir(iteracion);
        console.log(`Las iteraciones son ${iteracion} del array ${array}`);
    }
}

function validarMetodo(primero, ultimo){
    let pivote = array[ultimo];
    let i = (primero - 1);
    console.log(`Pivote seleccionado: ${pivote}`);

    for (let j = primero; j < ultimo; j++) {
        if (array[j] < pivote) {
            i++;
            [array[i], array[j]] = [array[j], array[i]]; // Intercambio
            console.log(`Intercambio: ${array[i]} con ${array[j]} - ${array}`);
            diagrama(array[i], array[j]);
        }
    }
    [array[i + 1], array[ultimo]] = [array[ultimo], array[i + 1]]; // Intercambio del pivote
    diagrama(array[i + 1], array[ultimo]);
    console.log(`Intercambio del pivote: ${array[i + 1]} con ${array[ultimo]} - ${array}`);
    return i + 1;
}

function imprimir(iteracion){
    let fragment = new DocumentFragment();
    const ul = document.createElement('ul');
    ul.className = " list-group list-group-horizontal";
    ul.textContent = `iteracion ${iteracion}`;

    array.forEach((numero) => {
        const li = document.createElement('li');
        li.className = "list-group-item";
        li.textContent = numero;
        fragment.appendChild(li); //Sirve para evitar el reflow
    });

    ul.appendChild(fragment);
    listOrdenar.appendChild(ul);
}

function diagrama(element, elementDos){
    const html = document.createElement('span');
    html.className = "text-danger fw-bold fs-6";
    html.textContent = ` ${element} < ${elementDos}`;
    listOrdenar.appendChild(html);
}


function limpiar(){
    while(listAgregar.firstChild){
        listAgregar.removeChild(listAgregar.firstChild);
    }
    while(listOrdenar.firstChild){
        listOrdenar.removeChild(listOrdenar.firstChild);
    }

    array =[];
    iteracion = 0; // Este sirve para que se reinicie el conteo de iteraciones
    numeros.value ="";
    numeros.focus();
}