export async function verificateSession() {
    let respuesta = await fetch('/api/sessions/current', {
        method: 'GET',
        credentials: 'include' 
    })
        .then(res => res.json())    
        .then(data => {
            return data
        })
    return respuesta
}