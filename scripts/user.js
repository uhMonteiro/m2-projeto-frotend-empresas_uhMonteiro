const baseUrl = 'http://localhost:3333'
const token = localStorage.getItem('@final:token')

function authentication(){

    if(!token){
        location.replace('/')
    }
}


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
    .then(async (res) =>{
        if(res.ok){
            
            const response = await res.json()
            
            createCardCompany(response)
            return response
        }
    })
    console.log(company)
    return company
} 

function createCardCompany(array) {
    const section = document.getElementById(12)
    const sectionHeader = document.querySelector('.header__company')
    section.innerHTML = ""
    
    const divHeader = document.createElement('div')
    const nameCompany = document.createElement('h2')
    const p = document.createElement('p')
    const nameDepartament = document.createElement('h2')
    
    section.classList.add('section__employes')
    divHeader.classList.add('div__header')
    
    nameDepartament.innerText = array.name
    nameCompany.innerText = array.company.name
    p.innerText = "-"

    divHeader.append(nameCompany ,p, nameDepartament)
    sectionHeader.appendChild(divHeader)
    
    array.employees.forEach(arr =>{
        const divEmployees = document.createElement('div')
        const nameEmployee = document.createElement('p')
        divEmployees.classList.add('div__employees')

        nameEmployee.innerText = arr.name

        divEmployees.appendChild(nameEmployee)
        section.appendChild(divEmployees)
    })



    
}

authentication()
userCompanyInformations(await userProfile())
createUserInformations(await userProfile())
userProfile()
logout()