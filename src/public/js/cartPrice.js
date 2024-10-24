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


const btnDeleteProd = document.getElementsByClassName('delete-prod-cart')
Array.from(btnDeleteProd).forEach(btn => {
    btn.addEventListener('click', async () => {
        const user = await verificateSession()
        if(user){
            let prodID = btn.getAttribute('data-id')
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
                    .then(res => {
                        if(res.status == 200){
                            location.reload()
                        }
                    })
        
                  
                }
              });
           
        }
});
})

