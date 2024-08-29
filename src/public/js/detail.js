const boxCarousel = document.getElementById("box-carousel")
const thumbnails = JSON.parse(boxCarousel.getAttribute("data-url"))
let conter = 0

thumbnails.forEach(url => {
    const newUrl = document.createElement("div")
    newUrl.classList.add("carousel-item")
    if (conter == 0) {
        newUrl.classList.add("active")
        conter += 1
    }
    newUrl.innerHTML = `
        <figure class="figure-detail">
            <img src=${url} class="d-block w-100" alt="...">
        </figure>
    `
    boxCarousel.appendChild(newUrl)
})




const plus = document.getElementById("plus")
const minus = document.getElementById("minus")
const quantity = document.getElementById("quantity-p")
const total = document.getElementById("total-price")
const price = total.getAttribute("data-price")



plus.addEventListener("click", () => {
    quantity.innerText < 5 && quantity.innerText++
    const showPrice = price * Number(quantity.innerText)
    total.innerText = `$${showPrice}.000` 
})
minus.addEventListener("click", () => {
    quantity.innerText > 1 && quantity.innerText--
    const showPrice = price * Number(quantity.innerText)
    total.innerText = `$${showPrice}.000` 
})