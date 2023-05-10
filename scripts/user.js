const baseUrl = 'http://localhost:3333'

async function userProfile(){
    const token = localStorage.getItem('@final:token')
    const user = await fetch(`${baseUrl}/employees/profile`,{
        method:'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    })
    .then(response => response.json())

    return user
}

console.log(await userProfile())
userProfile()