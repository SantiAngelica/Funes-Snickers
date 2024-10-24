function generateTicketCode() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    
    const randomPart = () => Array.from({ length: 5 }, () => chars.charAt(Math.floor(Math.random() * chars.length))).join('');
    
    return `${randomPart()}-${randomPart()}`;
}


function calculateTotal(cart){
    let total = 0 
    cart.forEach(item => {
        total += item.product.price * item.quantity
    })
    return total
}

function checkStock(cart){
    let cartOK, cartNOT
    cartOK = cart.filter(item => item.quantity <= item.product.stock)
    cartNOT = cart.filter(item => item.quantity > item.product.stock)
    return{
        cartOK,
        cartNOT
    }
}


export {
    generateTicketCode,
    calculateTotal,
    checkStock
}