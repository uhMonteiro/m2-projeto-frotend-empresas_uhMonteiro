const baseUrl = 'http://localhost:3333'
const requestHeaders = {
    'Content-Type': 'application/json'
}

export async function loginRequest(loginBody){
    const tokenRequest = await fetch(`${baseUrl}/auth/login`,{
        method: "POST",
        headers: requestHeaders,
        body: JSON.stringify(loginBody),
    }).then(async (res) =>{
        if(res.ok){
            const responseJson = await res.json()
            const {authToken} = responseJson
            localStorage.setItem('@final:token', JSON.stringify(authToken))
            if(responseJson.isAdm = true){
                location.replace('./pages/adm.html')
            }else{
                location.replace('./pages/user.html')
            }
            
            console.log(responseJson)
        }else{
            const responseJson = await res.json()
            alert(responseJson.message)
        }
    })
    return tokenRequest
}

//loginRequest({
//    email: 'admin@mail.com',
//    password: '123456'
//})
