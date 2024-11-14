const listaCursos = document.querySelector('#lista-cursos')
const listaCarrito = document.querySelector('#lista-carrito tbody') // Aquí el tbody va sin .
const vaciarCarrito = document.querySelector('#vaciar-carrito')
const carrito = document.querySelector('#carrito')


arregloCarrito=[]

eventosListeners()
function eventosListeners() {
    // Añadir objetos al carrito
    listaCursos.addEventListener('click',obtenerCurso)

    // Eliminar objeto carrito
    listaCarrito.addEventListener('click',eliminarObjeto)

    // Vaciar carrito
    vaciarCarrito.addEventListener('click', function () { //Hay que vaciar tanto el arreglo como limpiar la listaCarrito
        articulosCarrito=[];

        limpiarHTML();
    })
}


function obtenerCurso(e) {
    e.preventDefault()
    if(e.target.classList.contains('agregar-carrito')) {
        obtenerInfoCurso(e.target)
    }
    

}

function obtenerInfoCurso(curso) {
    const infoCurso = curso.parentElement.parentElement

    infoCursos = {
        img: infoCurso.querySelector('img').src,
        titulo: infoCurso.querySelector('h4').textContent,
        precio: infoCurso.querySelector('.precio span').textContent,
        data_id: infoCurso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }    


    const existe = arregloCarrito.some(cursoMap => cursoMap.data_id === infoCursos.data_id)


    if(existe){
        arregloCarrito = arregloCarrito.map(cursoMap => { // La diferencia con el original es que crea un elemento y después tiene que añadir al arregloCarrito, si lo haces sobre el mismo arreglo no hace falta crear un nuevo arreglo
            if(cursoMap.data_id === infoCursos.data_id) {            
                cursoMap.cantidad++
            } 
            return cursoMap
        })
    } else {
        arregloCarrito=[...arregloCarrito,infoCursos];
    }

    carritoHTML();
}

function carritoHTML() { 
    limpiarHTML();
    arregloCarrito.forEach(element => { //En vez de poner otra variable, lo realizamos con el arregloCarrito correspondiente.
        const {titulo,data_id,img,precio,cantidad} = element;
        const row = document.createElement('tr'); // Me ha faltado poner como constante row
        // Me ha faltado poner <img con src> y <a>
        row.innerHTML = `
            <td><img src='${img}' width=50></td>
            <td>${titulo}</td>
            <td>${precio}</td>
            <td>${cantidad}</td>
            <td><a href='#' class='borrar-curso' data-id=${data_id}>X</a></td>        
        `;
        listaCarrito.appendChild(row);    
});
}

function limpiarHTML() {
    while(listaCarrito.firstChild) {
        listaCarrito.removeChild(listaCarrito.firstChild)
    }
}

function eliminarObjeto(e){
    if(e.target.classList.contains('borrar-curso')) {
        const id = e.target.getAttribute('data-id')
        arregloCarrito = arregloCarrito.filter(curso => curso.data_id !== id); // Me ha faltado reasignarlo a arregloCarrito
        carritoHTML(); // Me ha faltado carritoHTML
    }
}
