const container = document.getElementById('container-login');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');

registerBtn.addEventListener('click', () => {
    container.classList.add("active-form");
});

loginBtn.addEventListener('click', () => {
    container.classList.remove("active-form");
});


const loginForm = document.getElementById("loginForm")

loginForm.addEventListener('submit', (evt) => {
    let email = document.getElementById("email").value
    let password = document.getElementById("pass").value

    let user = {
        email,
        password
    }
    console.log(user)
    fetch('api/sessions/login', {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
            "Content-Type" : "application/json",
            "Authorization": `Bearer ${localStorage.getItem("authToken")}`
        }
    })
    .then(res => res.json())
    .then(json => {
        localStorage.setItem("authToken", json.token)
    })
})