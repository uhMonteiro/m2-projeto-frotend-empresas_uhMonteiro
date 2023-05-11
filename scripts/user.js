const baseUrl = 'http://localhost:3333'
const token = localStorage.getItem('@final:token')

async function userProfile(){
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

async function userCompanyInformations(array){
    const company = await fetch(`${baseUrl}/departments/readById/${array.department_id}`,{
        method:"GET",
        headers: { Authorization: `Bearer ${token}` }
    })
    .then(response => response.json())
    console.log(company)
    return company
} 

function createCardCompany(array) {
    const section = document.querySelector('.company__informations')
    
    const divHeader = document.createElement('div')
    const nameCompany = document.createElement('h2')
    const nameDepartament = document.createElement('h2')
    const divEmployees = document.createElement('div')
    const nameEmployee = document.createElement('p')

    nameCompany.innerText = a
    nameDepartament.innerText = array.name

}

userCompanyInformations(await userProfile())
createUserInformations(await userProfile())
userProfile()
logout()