
const socket = io()


function DeleteProd(pid) {
  
    Swal.fire({
        title: "Desea eliminar el producto?",
        showCancelButton: true,
        confirmButtonText: "Elminar",
        icon: "warning"

    }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            socket.emit("delete prod", pid)
        }
    });


}



function LoadProds(arrProds) {
    const boxRealTime = document.getElementById("box-real-time")
    boxRealTime.innerHTML = ``
    arrProds.forEach(prod => {
        const newProd = document.createElement("div")
        newProd.classList.add("card")
        newProd.style.width = "18rem"
        newProd.innerHTML = `
            <figure class="figure-img">
                <img src=${prod.thumbnails[0]} class="card-img-top" alt=${prod.tittle}>
            </figure>
            <div class="card-body">
                <h5 class="card-title mb-0">${prod.tittle}</h5>
                <p class="card-category">${prod.category.charAt(0).toUpperCase() + prod.category.slice(1).toLowerCase()}</p>
                <p class="card-description">${prod.description}</p>
                <p class="card-text">$${prod.price}</p>
                <a href="/realtimeproducts/edit/${prod._id}" class="btn btn-outline-info">Editar</a>
                <button class="btn btn-delete btn-outline-danger">Elminar</button>
            </div>
        `
        let btnDelete = newProd.querySelector(".btn-delete")

        btnDelete.addEventListener("click", () => DeleteProd(prod._id))

        boxRealTime.append(newProd)
    });
}











//MANEJO DE LAS URL
let thumbnails = []
function DelUrl(url) {
    const index = thumbnails.findIndex(x => x == url)
    thumbnails.splice(index, 1)
    LoadUrl(thumbnails)
}
function LoadUrl(thumbnails) {
    boxUrl.innerHTML = ``
    
    thumbnails.forEach(url => {
        const newUrlshow = document.createElement("div")
        newUrlshow.classList.add("mb-2")
        newUrlshow.classList.add("link-container")
        newUrlshow.innerHTML = `
        <a href="${url}" target="_blank" class="truncated-link">${url}</a>
        <button type="button" class="btn-close link-button" aria-label="Close"></button>
        `
        newUrlshow.querySelector(".link-button").addEventListener("click", () => {
            DelUrl(url)
        })
        boxUrl.appendChild(newUrlshow)
    })
}



const btnAdd = document.getElementById("btn-add-url")
const url = document.getElementById("thumbnails")
const boxUrl = document.getElementById("box-url")

btnAdd.addEventListener("click", () => {
    let newUrl = url.value
    if (newUrl != "") {
        thumbnails.push(newUrl)
        LoadUrl(thumbnails)
        url.value = ''
    }
    
})













//SUBMIT FORMULARIO DE NUEVO PROD
function CreateProd(data) {
    data.status == "true" ? data.status = true : data.status = false
    const newProd = {
        category: data.category,
        tittle: data.tittle,
        description: data.description,
        price: Number(data.price),
        stock: Number(data.stock),
        code: data.code,
        status: data.status,
        thumbnails: thumbnails
        
    }
    socket.emit("form data", newProd)
}




document.getElementById("form").addEventListener("submit", (evt) => {
    evt.preventDefault()
    Swal.fire({
        title: "Seguro que desea crear el producto?",
        showCancelButton: true,
        confirmButtonText: "Crear",
        icon: "question"
    }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            const data = Object.fromEntries(
                new FormData(evt.target)
            )
            CreateProd(data)
            document.getElementById("form").reset()
            thumbnails = []
            LoadUrl(thumbnails)
            
        }
        
        
    });
    
    
    
})



//CARGAR PRODUCTOS
socket.on("list products", (arrProds) => {
    LoadProds(arrProds)
})






