const totalPrice = document.getElementsByClassName('price-cart')
import { verificateSession } from "./verSes.js";

document.addEventListener('DOMContentLoaded', () => {
    Array.from(totalPrice).forEach(x => {
        let unitPrice = parseFloat(x.getAttribute('data-price'))
        let q =  parseFloat(x.getAttribute('data-q'))
        let total = unitPrice * q

        x.innerText = total.toLocaleString()
    
    });
})


const btnDeleteProd = document.getElementById('delete-prod-cart')
btnDeleteProd.addEventListener('click', async () => {
    const user = await verificateSession()
    if(user){
        let prodID = btnDeleteProd.getAttribute('data-id')
        Swal.fire({
            title: "Estas seguro?",
            text: "El producto se eliminara de tu carrito",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, borralo!"
          }).then((result) => {
            if (result.isConfirmed) {
                fetch(`/api/carts/${user.cart}/products/${prodID}`, {
                    method: 'DELETE'
                })
                .then(res => res.json())
                .then(json => {
                    if(json.status == 'success'){
                        Swal.fire({
                            title: "Eliminado!",
                            text: "EL producto a sido eliminado",
                            icon: "success"
                        }).then(() => {
                            location.reload()
                        });
                    }
                })
              
            }
          });
       
    }
})

