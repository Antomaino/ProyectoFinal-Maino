const botonFinalizar = document.getElementById('finalizarCompra');
const usuario = '';

botonFinalizar.addEventListener('click', () => {

    Swal.fire({
        title: '¿Quieres finalizar tu compra?',
        text: 'Ingresa tu email',
        inputplaceholder: 'pepe@pepe.com',
        input: 'email',
        confirmButtonText: 'Enviar',
        
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: '¡Muchas gracias por tu compra!',
                text: 'Te enviamos todo el detalle por mail.',
                icon: 'success',
            })
        }
    })
})