
const socket = io()


function DeleteProd(pid) {
    console.log(pid)
    Swal.fire({
        title: "Desea eliminar el producto?",
        showCancelButton: true,
        confirmButtonText: "Elminar",

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
                <h5 class="card-title">${prod.tittle}</h5>
                <p class="card-description">${prod.description}</p>
                <p class="card-text">$${prod.price}</p>
                <a href="/realtimeproducts/edit/${prod.id}" class="btn btn-outline-info">Editar</a>
                <button class="btn btn-delete btn-outline-danger">Elminar</button>
            </div>
        `
        let btnDelete = newProd.querySelector(".btn-delete")

        btnDelete.addEventListener("click", () => DeleteProd(prod.id))
        boxRealTime.append(newProd)
    });
}

//CARGAR PRODUCTOS
socket.on("list products", (arrProds) => {
    LoadProds(arrProds)
})



//MANEJO DE LAS URL






const thumbnails = []
function DelUrl(urlIndex){
    thumbnails.splice(urlIndex,1)
    LoadUrl(thumbnails)
}
function LoadUrl(thumbnails) {
    boxUrl.innerHTML = ``
    let conter = -1
    thumbnails.forEach(url => {
        conter+=1
        const newUrlshow = document.createElement("div")
        newUrlshow.classList.add("mb-2")
        newUrlshow.classList.add("link-container")
        newUrlshow.innerHTML = `
           <a href="${url}" target="_blank" class="truncated-link">${url}</a>
           <button type="button" class="btn-close link-button" aria-label="Close"></button>
        `
        newUrlshow.querySelector(".link-button").addEventListener("click", () => {
            DelUrl(conter)
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

document.getElementById("form").addEventListener("submit", (evt) => {
    evt.preventDefault()
    const data = Object.fromEntries(
        new FormData(evt.target)
    )
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
})

socket.on("response add prod", (res) => {
    if (res == 2) {
        document.getElementById("codeHelp").innerText = "No puede haber codigos repetidos"
    }
    if (res == 3) {
        document.getElementById("codeHelp").innerText = ""
        Swal.fire({
            icon: "success",
            title: "Nuevo producto agregado!",
            showConfirmButton: true,
            timer: 1500
        })
    }
})



