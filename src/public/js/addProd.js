import { verificateSession } from "./verSes.js"



document.getElementById('btn-add-cart').addEventListener('click',async () => {
    let user = await verificateSession()
    console.log("usuario:",user)
    if(user){
        const quantity = document.getElementById('quantity-p').innerText
        const prodID = document.getElementById('btn-add-cart').getAttribute('data-id')
        const cartID = user.cart
        
        fetch(`/api/carts/${cartID}/products/${prodID}/${quantity}`,{
                method: 'POST',
        })
        .then(res => res.json())
        .then(json => {
            console.log(json)
            if(json.status == 'success'){
                const prod = {
                    src: document.getElementById("src-modal").getAttribute('src'),
                    tittle: document.getElementById('staticBackdropLabel').innerText,
                    quantity: quantity,
                    total: document.getElementById("total-price").innerText
                }
                Toastify({
                    className: "toastifyProd",
                    text: "Producto añadido correctamente!",
                    destination: `/carts/${cartID}`,
                    close: true,
                    gravity: "bottom",
                    style: {
                        background: "rgb(13, 202, 240)"
                    }
                }).showToast()
            }
        })
    }
})
