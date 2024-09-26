const btnAddProd = document.getElementById('btn-add-prod')
const id = btnAddProd.getAttribute("data-id")
let verSession



async function verificateSession() {
    const response = await fetch('/api/sessions/current', {
        method: 'GET',
        credentials: 'include' 
    });
    console.log(response)
    return response.ok
}
document.addEventListener('DOMContentLoaded', async () => {
    verSession = await verificateSession()
    if(verSession){
        btnAddProd.setAttribute('data-bs-toggle', "modal")
        btnAddProd.setAttribute('data-bs-target', `#staticBackdrop-${id}`)
    }
})

btnAddProd.addEventListener('click',async ( ) => {
    
    if (!verSession) {
        Swal.fire({
            icon: "warning",
            title: "Espera!",
            text: "Debes iniciar sesion antes de añadir productos a tu carrito:(",
            footer: '<a href="/sessions">Iniciar sesion</a>'
          });
    }
})


