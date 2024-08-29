const boxUrl = document.getElementById("box-url-edit")
const thumbnailsEdit = JSON.parse(document.getElementById("thumbnails-edit").getAttribute("data-url"))


//MANEJO DE LA LISTA DE URL
function DelUrl(url){
    const index = thumbnailsEdit.findIndex(x => x == url)
    thumbnailsEdit.splice(index,1)
    LoadUrl(thumbnailsEdit)
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

document.addEventListener("DOMContentLoaded", () => {
    LoadUrl(thumbnailsEdit)
})

const btnAdd = document.getElementById("btn-add-url-edit")
const url = document.getElementById("thumbnails-edit")

btnAdd.addEventListener("click", () => {
    let newUrl = url.value
    if (newUrl != "") {
        thumbnailsEdit.push(newUrl)
        LoadUrl(thumbnailsEdit)
        url.value = ''
    }

})







//ENVIO DE FORMULARIO 

const pid = document.getElementById("thumbnails-edit").getAttribute("data-id")

function SendForm(data){
    data.status == "true" ? data.status = true : data.status = false
    const prodEdit = {
        category: data.category,
        tittle: data.tittle,
        description: data.description,
        price: Number(data.price),
        stock: Number(data.stock),
        code: data.code,
        status: data.status,
        thumbnails: thumbnailsEdit
    }
   
    fetch(`/api/products/${pid}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(prodEdit)
    })
    .then(response => response.text())
    .then(result => {
        console.log(result);
    })
    .catch(error => console.error('Error:', error));
}







//ALERTA PARA CONFIRMARENVIO DE FORMULARIO PARA EDITAR
document.getElementById("form-edit").addEventListener("submit", (evt) => {
    evt.preventDefault()
    Swal.fire({
        title: "Esta seguro?",
        text: "Todos los campos se reescribiran",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, editalo!"
      }).then((result) => {

        if (result.isConfirmed) {
          Swal.fire({
            title: "Listo!",
            text: "Su producto ha sido editado.",
            icon: "success"
          });
          const data = Object.fromEntries(
            new FormData(evt.target)
        )
          SendForm(data)
        }
        })
})