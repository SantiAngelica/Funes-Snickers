import { verificateSession } from "./verSes.js"


const btnOpenModal = document.getElementsByClassName('btn-open-modal')
const modalTittle = document.getElementById('staticBackdropLabel')
const modalPrice = document.getElementById('price-modal')
const ModalTotal = document.getElementById("total-price")
const modalSrc = document.getElementById('src-modal')
const quantityP = document.getElementById("quantity-p")
const modalID = document.getElementById('btn-add-cart')
let verSession





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
                let id = btn.getAttribute('data-id')
                modalTittle.innerText = tittle
                modalSrc.setAttribute("src", src)
                modalPrice.innerText = price
                ModalTotal.innerText = price
                quantityP.innerText = 1
                modalID.setAttribute('data-id', id)
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






