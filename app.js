// El principal objetivo de este desafío es fortalecer tus habilidades en lógica de programación. Aquí deberás desarrollar la lógica para resolver el problema.
/*
 * AMIGO SECRETO - LÓGICA DE PROGRAMACIÓN
 * Desafío Oracle Next Education
 * 
 * Funcionalidades principales:
 * ✅ Agregar amigos con validación
 * ✅ Sortear amigo secreto aleatoriamente
 * ✅ Mostrar resultados en pantalla
 * 🚀 Mejoras adicionales incluidas
 */

// ==========================================
// VARIABLES GLOBALES
// ==========================================

// Array para almacenar los nombres de los amigos
let amigos = [];

// ==========================================
// FUNCIONES PRINCIPALES DEL DESAFÍO
// ==========================================

/**
 * ✅ FUNCIÓN REQUERIDA: agregarAmigo()
 * Agrega un nuevo amigo a la lista con validaciones
 */
function agregarAmigo() {
    // Obtener el valor del campo de entrada
    const inputAmigo = document.getElementById('amigo');
    const nombre = inputAmigo.value.trim();
    
    // ✅ REQUISITO: Validación de nombre vacío con alerta
    if (nombre === '') {
        alert('Por favor, ingrese un nombre válido.');
        inputAmigo.focus();
        return;
    }
    
    // 🚀 MEJORA: Validaciones adicionales
    if (nombre.length < 2) {
        alert('El nombre debe tener al menos 2 caracteres.');
        inputAmigo.focus();
        return;
    }
    
    if (nombre.length > 20) {
        alert('El nombre no puede tener más de 20 caracteres.');
        inputAmigo.focus();
        return;
    }
    
    // 🚀 MEJORA: Evitar nombres duplicados
    const nombreCapitalizado = capitalizarNombre(nombre);
    if (amigos.some(amigo => amigo.toLowerCase() === nombreCapitalizado.toLowerCase())) {
        alert('Este nombre ya está en la lista.');
        inputAmigo.focus();
        return;
    }
    
    // ✅ REQUISITO: Agregar nombre al array
    amigos.push(nombreCapitalizado);
    
    // ✅ REQUISITO: Limpiar campo de entrada
    inputAmigo.value = '';
    inputAmigo.focus();
    
    // ✅ REQUISITO: Actualizar visualización
    actualizarListaAmigos();
    
    // 🚀 MEJORA: Feedback visual
    mostrarMensajeTemporal(`"${nombreCapitalizado}" agregado correctamente 👥`, 'success');
    
    console.log(`Amigo agregado: ${nombreCapitalizado}`);
    console.log('Lista actual:', amigos);
}

/**
 * ✅ FUNCIÓN REQUERIDA: sortearAmigo()
 * Selecciona un nombre aleatorio y lo muestra en pantalla
 */
function sortearAmigo() {
    // ✅ REQUISITO: Verificar que hay amigos en la lista
    if (amigos.length === 0) {
        alert('No hay amigos en la lista. Agregue al menos un nombre antes de sortear.');
        document.getElementById('amigo').focus();
        return;
    }
    
    // 🚀 MEJORA: Verificar mínimo para sorteo realista
    if (amigos.length === 1) {
        alert('Se necesitan al menos 2 amigos para hacer un sorteo interesante. ¡Agrega más nombres!');
        document.getElementById('amigo').focus();
        return;
    }
    
    // 🚀 MEJORA: Efecto de "sorteando..." para suspense
    const resultado = document.getElementById('resultado');
    resultado.innerHTML = '<li class="sorteando">🎲 Sorteando...</li>';
    
    // ✅ REQUISITO: Generar selección aleatoria
    setTimeout(() => {
        const indiceAleatorio = Math.floor(Math.random() * amigos.length);
        const amigoSorteado = amigos[indiceAleatorio];
        
        // ✅ REQUISITO: Mostrar resultado en pantalla
        resultado.innerHTML = `<li class="ganador">🎉 ${amigoSorteado} 🎉</li>`;
        
        // 🚀 MEJORA: Feedback adicional
        mostrarMensajeTemporal(`¡${amigoSorteado} es el amigo secreto elegido!`, 'celebration');
        
        // 🚀 MEJORA: Scroll suave al resultado
        resultado.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        console.log(`Amigo sorteado: ${amigoSorteado}`);
    }, 1000); // 1 segundo de suspense
}

// ==========================================
// FUNCIONES AUXILIARES
// ==========================================

/**
 * Actualiza la visualización de la lista de amigos
 */
function actualizarListaAmigos() {
    const listaAmigos = document.getElementById('listaAmigos');
    
    if (amigos.length === 0) {
        listaAmigos.innerHTML = '';
        actualizarContador();
        return;
    }
    
    // Crear lista HTML con los nombres
    let listaHTML = '';
    amigos.forEach((amigo, index) => {
        listaHTML += `
            <li class="amigo-item" data-index="${index}">
                <span class="amigo-nombre">${amigo}</span>
                <button class="btn-eliminar" onclick="eliminarAmigo(${index})" title="Eliminar ${amigo}" aria-label="Eliminar ${amigo}">
                    ✕
                </button>
            </li>
        `;
    });
    
    listaAmigos.innerHTML = listaHTML;
    actualizarContador();
}

/**
 * Capitaliza correctamente los nombres
 */
function capitalizarNombre(nombre) {
    return nombre.toLowerCase()
        .split(' ')
        .map(palabra => palabra.charAt(0).toUpperCase() + palabra.slice(1))
        .join(' ');
}

/**
 * Actualiza el contador de amigos
 */
function actualizarContador() {
    let contador = document.querySelector('.contador-amigos');
    
    if (!contador) {
        contador = document.createElement('div');
        contador.className = 'contador-amigos';
        
        const inputSection = document.querySelector('.input-section');
        const lista = document.getElementById('listaAmigos');
        inputSection.insertBefore(contador, lista);
    }
    
    contador.textContent = amigos.length === 0 ? '' : `Amigos agregados: ${amigos.length}`;
}

// ==========================================
// FUNCIONES DE MEJORAS ADICIONALES
// ==========================================

/**
 * 🚀 MEJORA: Eliminar amigo individual
 */
function eliminarAmigo(index) {
    const nombreEliminado = amigos[index];
    amigos.splice(index, 1);
    actualizarListaAmigos();
    limpiarResultado();
    mostrarMensajeTemporal(`"${nombreEliminado}" eliminado de la lista`, 'info');
    console.log(`Amigo eliminado: ${nombreEliminado}`);
}

/**
 * 🚀 MEJORA: Limpiar toda la lista
 */
function limpiarLista() {
    if (amigos.length === 0) {
        alert('La lista ya está vacía.');
        return;
    }
    
    if (confirm(`¿Estás seguro de eliminar todos los ${amigos.length} amigos de la lista?`)) {
        amigos = [];
        actualizarListaAmigos();
        limpiarResultado();
        document.getElementById('amigo').focus();
        mostrarMensajeTemporal('Lista limpiada correctamente', 'info');
        console.log('Lista limpiada');
    }
}

/**
 * Limpiar resultado anterior
 */
function limpiarResultado() {
    document.getElementById('resultado').innerHTML = '';
}

/**
 * 🚀 MEJORA: Mostrar mensajes temporales de feedback
 */
function mostrarMensajeTemporal(mensaje, tipo = 'info') {
    // Crear elemento temporal
    const mensajeDiv = document.createElement('div');
    mensajeDiv.className = `mensaje-temporal ${tipo}`;
    mensajeDiv.textContent = mensaje;
    
    // Agregar al DOM
    document.body.appendChild(mensajeDiv);
    
    // Eliminar después de 3 segundos
    setTimeout(() => {
        mensajeDiv.style.animation = 'slideOut 0.3s ease-in';
        setTimeout(() => {
            if (mensajeDiv.parentNode) {
                mensajeDiv.remove();
            }
        }, 300);
    }, 3000);
}

// ==========================================
// CONFIGURACIÓN INICIAL Y EVENT LISTENERS
// ==========================================

/**
 * Configuración inicial cuando se carga la página
 */
document.addEventListener('DOMContentLoaded', function() {
    const inputAmigo = document.getElementById('amigo');
    
    // ✅ REQUISITO: Permitir agregar con Enter
    inputAmigo.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            agregarAmigo();
        }
    });
    
    // 🚀 MEJORA: Validación en tiempo real del input
    inputAmigo.addEventListener('input', function() {
        let valor = this.value;
        
        // Remover caracteres no válidos (solo letras, espacios y acentos)
        valor = valor.replace(/[^a-zA-ZÀ-ÿ\u00f1\u00d1\s]/g, '');
        
        // Limitar longitud
        if (valor.length > 20) {
            valor = valor.substring(0, 20);
        }
        
        this.value = valor;
    });
    
    // 🚀 MEJORA: Focus automático al cargar
    inputAmigo.focus();
    
    // Inicializar contador
    actualizarContador();
    
    console.log('Amigo Secreto inicializado correctamente');
});

// ==========================================
// FUNCIONES DE UTILIDAD ADICIONALES
// ==========================================

/**
 * 🚀 MEJORA: Obtener estadísticas de la lista
 */
function obtenerEstadisticas() {
    return {
        totalAmigos: amigos.length,
        nombreMasLargo: amigos.reduce((a, b) => a.length > b.length ? a : b, ''),
        nombreMasCorto: amigos.reduce((a, b) => a.length < b.length ? a : b, ''),
        lista: [...amigos] // Copia del array
    };
}

/**
 * 🚀 MEJORA: Exportar lista (para uso futuro)
 */
function exportarLista() {
    if (amigos.length === 0) {
        alert('No hay amigos para exportar.');
        return;
    }
    
    const listaTexto = amigos.join('\n');
    const blob = new Blob([listaTexto], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = 'amigos-secretos.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    mostrarMensajeTemporal('Lista exportada correctamente', 'success');
}

// ==========================================
// MODO DEBUG (para desarrollo)
// ==========================================

/**
 * 🚀 MEJORA: Función de debug para testing
 */
function modoDebug() {
    console.log('=== MODO DEBUG ACTIVADO ===');
    console.log('Amigos actuales:', amigos);
    console.log('Estadísticas:', obtenerEstadisticas());
    console.log('Elementos DOM encontrados:', {
        inputAmigo: !!document.getElementById('amigo'),
        listaAmigos: !!document.getElementById('listaAmigos'),
        resultado: !!document.getElementById('resultado')
    });
}

// Activar modo debug en consola escribiendo: modoDebug()