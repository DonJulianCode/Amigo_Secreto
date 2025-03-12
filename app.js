let amigos = [];

// Función para agregar amigos a la lista
function agregarAmigo() {
    let input = document.getElementById("amigo");
    let nombre = input.value.trim();

    if (nombre === "") {
        alert("Por favor, ingresa un nombre válido.");
        return;
    }

    if (amigos.includes(nombre)) {
        alert("Este nombre ya ha sido agregado.");
        return;
    }
    
    amigos.push(nombre);
    input.value = "";
    actualizarLista();
}

// Función para actualizar la lista en pantalla
function actualizarLista() {
    let lista = document.getElementById("listaAmigos");
    lista.innerHTML = "";
    
    amigos.forEach((amigo, index) => {
        let li = document.createElement("li");
        li.textContent = amigo + " "; // Espacio agregado antes del botón
        
        let botonEliminar = document.createElement("button");
        botonEliminar.textContent = "❌";
        botonEliminar.style.marginLeft = "10px"; // Agregar margen entre el nombre y el botón
        botonEliminar.onclick = function () { eliminarAmigo(index); };
        
        li.appendChild(botonEliminar);
        lista.appendChild(li);
    });
}

// Función para eliminar un nombre de la lista
function eliminarAmigo(index) {
    amigos.splice(index, 1);
    actualizarLista();
}

// Función para sortear los amigos
function sortearAmigo() {
    if (amigos.length < 2) {
        alert("Debe haber al menos dos amigos para realizar el sorteo.");
        return;
    }
    
    let resultado = document.getElementById("resultado");
    resultado.innerHTML = "";
    
    let copiaAmigos = [...amigos];
    let asignaciones = {};

    while (copiaAmigos.length > 0) {
        let amigo = copiaAmigos.pop();
        let posibles = copiaAmigos.filter(a => a !== amigo);
        
        if (posibles.length === 0) {
            alert("No se puede realizar el sorteo sin emparejamientos válidos. Intenta de nuevo.");
            return;
        }
        
        let elegido = posibles[Math.floor(Math.random() * posibles.length)];
        asignaciones[amigo] = elegido;
        
        // Remover al elegido de la lista
        copiaAmigos = copiaAmigos.filter(a => a !== elegido);
    }
    
    // Mostrar los resultados
    for (let [amigo, asignado] of Object.entries(asignaciones)) {
        let li = document.createElement("li");
        li.textContent = `${amigo} → ${asignado}`;
        resultado.appendChild(li);
    }
}
