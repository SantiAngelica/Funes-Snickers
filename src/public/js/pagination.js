

document.addEventListener("DOMContentLoaded", () => {
    const boxPages = document.getElementById("box-pages")
    const totalPages = parseInt(boxPages.getAttribute("data-pagination"))
    const actualPage = parseInt(boxPages.getAttribute("data-page"))


    const queryParams = new URLSearchParams(window.location.search);



    boxPages.innerHTML = ""
    for (let i = 0; i < totalPages; i++) {

        const newPage = document.createElement("li")
        newPage.classList.add("page-item")
        i + 1 == actualPage && newPage.classList.add("active")
        queryParams.set("page", i + 1)
        newPage.innerHTML = `
        <a class="page-link" href="/products?${queryParams.toString()}"    >${i + 1}</a>
        `
        boxPages.appendChild(newPage)
    }


    const prevLink = document.getElementById("prevPage");
    const nextLink = document.getElementById("nextPage");
    
    if (prevLink) {
        const prevPage = actualPage -1
        queryParams.set("page", prevPage);
        prevLink.href = `/products?${queryParams.toString()}`;
    }
    

    if (nextLink) {
        const nextPage = actualPage + 1
        queryParams.set("page", nextPage);
        nextLink.href = `/products?${queryParams.toString()}`;
    }
})



