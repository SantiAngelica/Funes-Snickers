const btnOpenModal = document.getElementsByClassName('btn-open-modal')
const modalTittle = document.getElementById('staticBackdropLabel')
const modalPrice = document.getElementById('price-modal')
const ModalTotal = document.getElementById("total-price")
const modalSrc = document.getElementById('src-modal')
const quantityP = document.getElementById("quantity-p")
let verSession



async function verificateSession() {
    let respuesta = await fetch('/api/sessions/current', {
        method: 'GET',
        credentials: 'include' 
    })
        .then(res => res.json())    
        .then(data => {
            return data
        })
    return respuesta
}

document.addEventListener('DOMContentLoaded', async () => {
    verSession = await verificateSession()
    if(verSession.role == 'user'){
        [...btnOpenModal].forEach(btn => {
            btn.setAttribute('data-bs-toggle', "modal")
            btn.setAttribute('data-bs-target', '#staticBackdrop')
            btn.addEventListener('click', () => {
                let price = Number(btn.getAttribute('data-price'))
                let src = btn.getAttribute('data-src')
                let tittle = btn.getAttribute('data-tittle')
                modalTittle.innerText = tittle
                modalSrc.setAttribute("src", src)
                modalPrice.innerText = price
                ModalTotal.innerText = price
                quantityP.innerText = 0 
            })
        });
    }
    if(!verSession.role){
        [...btnOpenModal].forEach(btn => {
            btn.addEventListener('click',  () => {
                if (!verSession.role) {
                    Swal.fire({
                        icon: "warning",
                        title: "Espera!",
                        text: "Debes iniciar sesion antes de añadir productos a tu carrito:(",
                        footer: '<a href="/sessions">Iniciar sesion</a>'
                      });
                }
            })
        })
    }
})






