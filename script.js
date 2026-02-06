const PRECIO_POR_DIA_PERSONA = 40000;

// Función para calcular y mostrar el total en tiempo real
function actualizarPresupuesto() {
    const checkinInput = document.getElementById('checkin').value;
    const checkoutInput = document.getElementById('checkout').value;
    const cantidad = parseInt(document.getElementById('cantidadPersonas').value) || 0;
    const displayTotal = document.getElementById('precioTotal');

    let dias = 1; // Valor por defecto para que no marque $0 al inicio

    if (checkinInput && checkoutInput) {
        const checkin = new Date(checkinInput);
        const checkout = new Date(checkoutInput);
        
        if (checkout > checkin) {
            dias = Math.ceil((checkout - checkin) / (1000 * 60 * 60 * 24));
        } else {
            dias = 0; // Si la fecha es inválida, el total será 0
        }
    }

    const total = dias * cantidad * PRECIO_POR_DIA_PERSONA;
    displayTotal.innerText = total.toLocaleString('es-AR');
}


// Escuchar cambios en los inputs para actualizar el precio
document.querySelectorAll('#checkin, #checkout, #cantidadPersonas').forEach(input => {
    input.addEventListener('change', actualizarPresupuesto);
});

document.getElementById('reservaForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const nombre = document.getElementById('nombre').value;
    const checkinVal = document.getElementById('checkin').value;
    const checkoutVal = document.getElementById('checkout').value;
    const cantidad = document.getElementById('cantidadPersonas').value;
    const totalFinal = document.getElementById('precioTotal').innerText;

    const telefono = "5492236355163"; 
    const mensaje = `¡Hola Casa Topinambur! 👋%0A%0A` +
                    `*Consulta de Estadía*%0A` +
                    `---------------------------------%0A` +
                    `👤 *Nombre:* ${nombre}%0A` +
                    `👥 *Huéspedes:* ${cantidad}%0A` +
                    `📅 *Check-in:* ${checkinVal}%0A` +
                    `📅 *Check-out:* ${checkoutVal}%0A` +
                    `---------------------------------%0A` +
                    `💰 *Presupuesto Total:* $${totalFinal}%0A` +
                    `---------------------------------%0A` +
                    `¿Tienen lugar para nosotros?`;

    window.open(`https://wa.me/${telefono}?text=${mensaje}`, '_blank');
});


document.querySelectorAll('#checkin, #checkout, #cantidadPersonas').forEach(input => {
    input.addEventListener('input', actualizarPresupuesto);
});

const video = document.getElementById('bg-video');

// Intenta reproducir apenas cargue
window.addEventListener('load', () => {
    video.play().catch(error => {
        console.log("Esperando interacción del usuario para reproducir.");
    });
});

// Asegura que no se pause si el usuario hace click en otros lados
video.addEventListener('suspend', () => {
    video.play();
});