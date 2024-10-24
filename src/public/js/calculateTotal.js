
export function calculateTotal(cart){
    let total = 0 
    cart.forEach(item => {
        total += item.product.price * item.quantity
    })
    return total
}
