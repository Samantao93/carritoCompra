// Variables
const carrito=document.querySelector('#carrito'),
      listaCursos=document.querySelector('#lista-cursos'),
      tbodyCarrito=document.querySelector('#lista-carrito tbody'),
      vaciarCarrito=document.querySelector('#vaciar-carrito');
let articulosCarrito=[];

cargarEventListeners();
function cargarEventListeners() {
// Agregar carrito
listaCursos.addEventListener('click',agregarCurso);

// Eliminar cursos
carrito.addEventListener('click',eliminarCurso)

// Vaciar carrito
vaciarCarrito.addEventListener('click',() => {

    articulosCarrito=[];

    limpiarHTML();

})
}

// Funciones
function agregarCurso(e) {
    e.preventDefault(); //Prevenimos que vaya al enlace vacío
    if(e.target.classList.contains('agregar-carrito')) {
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado);
    }
}

function eliminarCurso(x) {
    if(x.target.classList.contains('borrar-curso')){
        const cursoId = x.target.getAttribute('data-id');


        articulosCarrito = articulosCarrito.filter( curso => curso.id !== cursoId);

        carritoHTML();
    }
}

function leerDatosCurso(curso) {
    // console.log(curso)

    const infoCursos = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }


    const existe = articulosCarrito.some ( curso => curso.id === infoCursos.id)

    if (existe){
        const cursos = articulosCarrito.map(curso => {
            if(curso.id === infoCursos.id){
                curso.cantidad++;
                return curso
            } else {
                return curso;
            }
    });

    articulosCarrito = [...cursos]
    } else {
        articulosCarrito = [...articulosCarrito,infoCursos]
    }

    
    carritoHTML();
}

function carritoHTML() {

    limpiarHTML();

    articulosCarrito.forEach(curso => {
        const {imagen, cantidad, id, precio, titulo} = curso; // De esta manera después no tenemos que usar curso en HTML, solo imagen...
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src='${imagen}' width="100">
            </td>
            <td>${titulo}</td>
            <td>${precio}</td>
            <td>${cantidad}</td>
            <td>
                <a href='#' class='borrar-curso' data-id='${id}'> X </a>
            </td>
            `;

    tbodyCarrito.appendChild(row);
})   

}

function limpiarHTML() {
    //tbodyCarrito.innerHTML=''

    while(tbodyCarrito.firstChild){ // Más rápido
        tbodyCarrito.removeChild(tbodyCarrito.firstChild)
    }
}