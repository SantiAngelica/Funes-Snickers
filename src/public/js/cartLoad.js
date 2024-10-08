import { verificateSession } from "./verSes.js";


document.addEventListener('DOMContentLoaded', async () => {
    let user = await verificateSession()
    if(user){
        document.getElementById('a-cart').setAttribute('href', `/carts/${user.cart}`)
    }

})