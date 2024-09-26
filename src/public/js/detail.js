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




