//Metodo de MergeSort

const btnAgregar = document.getElementById('btnAgregar');
const btnOrdenar = document.getElementById('btnOrdenar');
const btnLimpiar = document.getElementById('btnLimpiar');
const listAgregar = document.getElementById('listAgregar');
const listOrdenar = document.getElementById('listOrdenar');
let array = [];

cargarEventos();
function cargarEventos() {
    btnAgregar.addEventListener('click', agregar);
    btnOrdenar.addEventListener('click', () => {
        array = ordenar(array);
        imprimir(array, 'Arreglo Finalizado');
    }); 
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

function ordenar(array) {
    if (array.length <= 1) {
        imprimir(array , 'Subarreglos');
        return array;
    }
    const medio = Math.floor(array.length /2);
    const izquierda = array.slice(0,medio);
    const derecha = array.slice(medio);
    imprimir(array, `Arreglo en el lado ${izquierda} y en el lado ${derecha}`);
    console.log(`La division de la lista es: ${izquierda} y ${derecha}`);
    imprimirPaso(array, `Se divide la lista en dos partes: ${izquierda} y ${derecha}`);
    return validarMetodo(ordenar(izquierda), ordenar(derecha));
}

function validarMetodo(izquierda, derecha) {
    let resultado = [];
    let inicioIzquierda = 0;
    let inicioDerecha = 0;

    while(inicioIzquierda< izquierda.length && inicioDerecha < derecha.length){
        if(izquierda[inicioIzquierda] < derecha[inicioDerecha]){
            resultado.push(izquierda[inicioIzquierda]);
            inicioIzquierda++;
        }else{
            resultado.push(derecha[inicioDerecha]);
            inicioDerecha++;
        }
    }
    return resultado.concat(izquierda.slice(inicioIzquierda)).concat(derecha.slice(inicioDerecha));
    console.log(resultado);
    diagrama(izquierda, derecha);
    return resultado;

    
}


function imprimir(array, texto){
    let fragment = new DocumentFragment();
    const ul = document.createElement('ul');
    ul.className = " list-group list-group-horizontal";
    ul.textContent = texto;

    array.forEach((numero) => {
        const li = document.createElement('li');
        li.className = "list-group-item";
        li.textContent = numero;
        fragment.appendChild(li); //Sirve para evitar el reflow
    });

    ul.appendChild(fragment);
    listOrdenar.appendChild(ul);
}

function imprimirPaso(array, texto){
    const p = document.createElement('p');
    p.textContent = `${texto}: ${array.join(', ')}`;
    listOrdenar.appendChild(p);
    console.log(`${texto}`, array);
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
    numeros.value ="";
    numeros.focus();
    console.log(`Lista limpia`);
}