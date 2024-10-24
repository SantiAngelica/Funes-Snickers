class UserDTO {
    constructor(user) {
        this.email = user.email; 
        this.cart = user.cart;
        this.fullname = `${user.first_name} ${user.last_name}` 
        this.role = user.role
    }
}

export default UserDTO; 