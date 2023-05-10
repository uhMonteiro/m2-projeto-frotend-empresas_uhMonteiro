const baseUrl = 'http://localhost:3333'

async function userProfile(){
    const token = localStorage.getItem('@final:token')
    const user = await fetch(`${baseUrl}/employees/profile`,{
        method:'GET',
        headers: { Authorization: `Bearer ${token}`}
    })
    .then(response => response.json())

    return user
}

const logout = () =>{
    const button = document.querySelector('.logout__button')

    button.addEventListener('click' , () =>{
        location.replace('/')
        localStorage.removeItem('@final:token')
        localStorage.removeItem('@final:isAdm')
    })
}

function createUserInformations(array){
    const div = document.querySelector('.div__user__informations')
    const h2 = document.createElement('h2')
    const p = document.createElement('p')
    
    
        h2.innerText = array.name
        p.innerText = array.email

    

    div.append(h2 , p)
}

console.log(await userProfile())
createUserInformations(await userProfile())
userProfile()
logout()