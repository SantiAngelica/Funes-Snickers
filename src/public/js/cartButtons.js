import { verificateSession } from "./verSes.js"
import { calculateTotal } from "./calculateTotal.js"


const cartTotalPrice = document.getElementById('cart-total-price')
const cart = JSON.parse(cartTotalPrice.getAttribute('data-cart'))


document.addEventListener('DOMContentLoaded', async () => {
    const user = await verificateSession()
    if (user.role == 'user') {
        document.getElementById('delete-cart').addEventListener('click', async () => {
            Swal.fire({
                title: "Estas seguro?",
                text: "Todos los productos se eliminaran de tu carrito",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Si, borralos!"
            }).then((result) => {
                if (result.isConfirmed) {
                    fetch(`/api/carts/${user.cart}`, {
                        method: 'delete'
                    }).then(res => {
                        if(res.status == 200){
                            location.reload()
                        }
                    })

                }
            })
        })

        document.getElementById('buy-cart').addEventListener('click', async () => {
            fetch(`/api/carts/${user.cart}/purchase`, {method: 'post'})
            .then(res => {
                if(res.status == 201){
                    location.reload()
                }
            })
        })
    }
    cartTotalPrice.innerText = `$${calculateTotal(cart).toLocaleString()}`
})