// VARIABLES

const carrito = document.getElementById('carrito');
const curso = document.getElementById('lista-cursos');
const listCursos = document.querySelector('#lista-carrito tbody');
const vaciarCarrBTN = document.getElementById('vaciar-carrito');

//LISTENERS
cargarEventListeners();

function cargarEventListeners(){
    //Dispara cuando se presiona agregar carrito
    curso.addEventListener('click', comprarCurso);

    //cuando se elimina un curso del carrito
    carrito.addEventListener('click', eliminarCurso);

    //Vaciar carrito
    vaciarCarrBTN.addEventListener('click', vaciarCarrito);

    //Al cargar el documento, mostrar LocalStorage
    document.addEventListener('DOMContentLoaded', leerLocalStorage);
}





//FUNCIONES

//funcion que añade al carrito
function comprarCurso(e) {
    e.preventDefault();
    // Delegation para agregar-carrito
    if(e.target.classList.contains('agregar-carrito')){
        const curso = e.target.parentElement.parentElement;
        //Enviamos el curso seleccionado para tomar sus datos
        leerDatosCurso(curso);         
    }
}

// lee los datos del curso
function leerDatosCurso(curso) {
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
    }
    
    insertarCarrito (infoCurso);   
}

//Muestra el curso seleccionado en el Carrito
function insertarCarrito(curso) {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>
            <img src="${curso.imagen}" width=100>
        </td>
        <td> ${curso.titulo}</td>
        <td> ${curso.precio}</td>
        <td>
            <a href="#" class="borrar-curso" data-id="${curso.id}">X</a>
        </td>
    `;
    listCursos.appendChild(row);
    guardarCursoLocalStorage(curso);
}


//Elimina el curso del carrito en el DOM
function eliminarCurso(e) {
    e.preventDefault();

    let curso, cursoId;
    if(e.target.classList.contains('borrar-curso')){
        e.target.parentElement.parentElement.remove();
        curso = e.target.parentElement.parentElement;      
      cursoId = curso.querySelector('a').getAttribute('data-id')
    
    }
    eliminarCursoLocalStorage(cursoId);
}

//elimina los cursos del carrito en el DOM
function vaciarCarrito() { 
    //forma lenta
    //listCursos.innerHTML = '';
    //forma rapida (recomendada)
    while(listCursos.firstChild){
        listCursos.removeChild(listCursos.firstChild);
    }
    
    //Vaciar carrito de LocalStorage
    vaciarLocalStorage();
    return false;
 }

 //Almacena cursos en el carrito a LocalStorage
function guardarCursoLocalStorage(curso){

    console.log(curso);
    
    let cursos;
    console.log(curso);
    //toma el valor de una arreglo con datos de la LS o vacio
    cursos = obtenerCursoLocalStorage();
    
    //el curso seleccionado se agrega al arreglo
    cursos.push(curso);
    
    localStorage.setItem('cursos', JSON.stringify(cursos));
    console.log(curso);
}

//comprueba que haya elementos en el LocalStorage

function obtenerCursoLocalStorage() {
    let cursosLS;

    //comprobamos si hay algo en LocalStorage
    if(localStorage.getItem('cursos') === null){
        cursosLS =[];
    } else {
        cursosLS = JSON.parse(localStorage.getItem('cursos'));
    }
    return cursosLS;

  }
//Imprime los cursos de LocalStorage en el carrito
function leerLocalStorage() {
    let cursosLS;

    cursosLS = obtenerCursoLocalStorage();

    cursosLS.forEach( function(curso) {
        //construir el template
        const row = document.createElement('tr');
        row.innerHTML = `
        <td>
            <img src="${curso.imagen}" width=100>
        </td>
        <td> ${curso.titulo}</td>
        <td> ${curso.precio}</td>
        <td>
            <a href="#" class="borrar-curso" data-id="${curso.id}">X</a>
        </td>
        `;
        listCursos.appendChild(row);
    });     
}

//Elimina el curso por el ID en el LocalStorage

function eliminarCursoLocalStorage(curso){
    let cursosLS;
    // Obtenemos el arreglo de cursos
    cursosLS = obtenerCursoLocalStorage();
    //Iteramos comparando el ID del curso borrado con los del LocalStorage
    cursosLS.forEach(function(cursoLS, index){
        if(cursoLS.id === curso){
            cursosLS.splice(index, 1);
        }
        
    });
    //Añadimos el arreglo actual a storage
    localStorage.setItem('cursos',JSON.stringify(cursosLS));
    
}

//Eliminar todos los cursos de localStorage

function vaciarLocalStorage(){
    localStorage.clear();
}