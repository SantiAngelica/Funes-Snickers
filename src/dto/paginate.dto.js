class PaginateProductsDTO {
    constructor(products){
        this.status= products ? 'success' : 'error';
        this.payload= products.docs;
        this.totalPages= products.totalPages;
        this.prevPage= products.prevPage;
        this.nextPage= products.nextPage;
        this.page= products.page;
        this.hasPrevPage= products.hasPrevPage
        this.hasNextPage= products.hasNextPage
        this.prevLink= products.hasPrevPage? `/products?page=${products.prevPage}` : null
        this.nextLink= products.hasNextPage? `/products?page=${products.nextPage}` : null
    }
}

export default PaginateProductsDTO