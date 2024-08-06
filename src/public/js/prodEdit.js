const boxUrl = document.getElementById("box-url-edit")
const thumbnailsEdit = JSON.parse(document.getElementById("thumbnails-edit").getAttribute("data-url"))

function DelUrl(urlIndex){
    thumbnailsEdit.splice(urlIndex,1)
    LoadUrl(thumbnailsEdit)
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

const pid = document.getElementById("thumbnails-edit").getAttribute("data-id")
console.log(pid)
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
        fetch(`/realtimeproducts/edit/${pid}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(prodEdit)
        })
        .then(response => response.text())
        .then(result => {
            console.log(result);
            alert(result);
        })
        .catch(error => console.error('Error:', error));
        }
      });
    
})