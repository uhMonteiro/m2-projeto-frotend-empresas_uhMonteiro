const baseUrl = 'http://localhost:3333'
const requestHeaders = {
    'Content-Type': 'application/json'
}

export async function loginRequest(loginBody){
    const loginRequest = await fetch(`${baseUrl}/auth/login`,{
        method: "POST",
        headers: requestHeaders,
        body: JSON.stringify(loginBody),
    }).then(async (res) =>{
        if(res.ok){
            const responseJson = await res.json()
            const {authToken} = responseJson
            console.log(authToken)
            localStorage.setItem('@final:token', JSON.stringify(authToken))
            localStorage.setItem('@final:isAdm', JSON.stringify(responseJson.isAdm))
            if(responseJson.isAdm == true){
                location.replace('./pages/adm.html')
            }else{
                location.replace('./pages/user.html')
            }
        }else{
            const responseJson = await res.json()
            alert(responseJson.message)
        }
    })
    return loginRequest
}

export async function createLogin(createBody) {
    const modalRegister = document.querySelector('.register__modal')
    const modalLogin = document.querySelector('.login__modal')
    
    const createEmployees = await fetch(`${baseUrl}/employees/create`,{
        method:'POST',
        headers: requestHeaders,
        body: JSON.stringify(createBody)
    })
    .then(async (res) =>{
        const responseJson = await res.json()
        if(res.ok){
            modalRegister.close()
            modalLogin.showModal()
        }else{
            alert(responseJson.message)
        }
    })
    return createEmployees
}


const createBody = {
    name: "augusto",
    email:"augusto@mail.com",
    password: "senha"
}

//createLogin(createBody)