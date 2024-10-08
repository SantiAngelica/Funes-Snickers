const plus = document.getElementById("plus")
const minus = document.getElementById("minus")
const quantity = document.getElementById("quantity-p")
const total = document.getElementById("total-price")
const price = document.getElementById("price-modal")




plus.addEventListener("click", () => {
    quantity.innerText < 5 && quantity.innerText++
    const showPrice = Number(price.innerText) * Number(quantity.innerText)
    total.innerText = showPrice.toLocaleString('es-ES')
})
minus.addEventListener("click", () => {
    quantity.innerText > 1 && quantity.innerText--
    const showPrice = Number(price.innerText) * Number(quantity.innerText)
    
    total.innerText = showPrice.toLocaleString('es-ES')
})