const token = localStorage.getItem('@final:token')
const baseUrl = 'http://localhost:3333'

function authentication(){

    if(!token){
        location.replace('/')
    }
}

authentication()


const logout = () =>{
    const button = document.querySelector('.button__adm__logout')

    button.addEventListener('click' , () =>{
        localStorage.removeItem('@final:token')
        localStorage.removeItem('@final:isAdm')
    
        location.replace('/')
    })
}

async function getEmployees(){
    const employees = await fetch(`${baseUrl}/employees/readAll`,{
        method: 'GET' ,
        headers: { Authorization: `Bearer ${token}`}
    })
    .then(response => response.json())

    createUsersArea(employees)

    return employees
}

function createUsersArea(array){
    const section = document.querySelector('.section__register')

    array.forEach(arr => {
        
        const div = document.createElement('div')
        const span = document.createElement('span')
        const h2 = document.createElement('h2')
        const p = document.createElement('p')
        const pencil__img = document.createElement('img')
        const trash__img = document.createElement('img')

        h2.innerText = arr.name
        pencil__img.src = "../images/pincil.svg"
        pencil__img.id = arr.id
        trash__img.src = "../images/trash.svg"
        trash__img.id = arr.id

        span.append(h2 , p)
        div.append(span , pencil__img , trash__img)

        section.appendChild(div)
    })
}

async function selectCompanys(){
    const select = document.querySelector('.select__companies')

    const allCompanies = await fetch(`${baseUrl}/companies/readAll`,{
        method: 'GET'
    })
    .then(response => response.json())
    console.log(allCompanies)

    allCompanies.forEach(companie =>{
        const option = document.createElement('option')
        option.innerText = companie.name
        option.value = companie.id
        option.id = companie.name

        select.appendChild(option)
    })
}

function companyDepartaments(){
    const select = document.querySelector('.select__companies')

    select.addEventListener('change', async () =>{
        const selectId = select.value

        const filterCompany = await fetch(`${baseUrl}/departments/readByCompany/${selectId}`,{
            method:'GET',
            headers: { Authorization: `Bearer ${token}`}
        })
        .then(response => response.json())

        renderDepartaments(filterCompany)
    })
}

function renderDepartaments(array){
    const section = document.querySelector('.section__departaments')
    section.innerHTML = ""

    array.forEach(arr =>{
        const div = document.createElement('div')
        const span = document.createElement('span')
        const h2 =  document.createElement('h2')
        const description = document.createElement('p')
        const name = document.createElement('p')
        const nav = document.createElement('nav')
        const eye = document.createElement('img')
        const pincil = document.createElement('img')
        const trash = document.createElement('img')

        h2.innerText = arr.name
        description.innerText = arr.description
        eye.src = "../images/eye.svg"
        pincil.src = "../images/pincil.svg"
        pincil.id = arr.id
        trash.src = "../images/trash.svg"
        trash.id = arr.id

        span.append(h2, description , name)
        nav.append(eye , pincil , trash)
        div.append(span , nav)
        section.appendChild(div)
    })
}

console.log(await getEmployees())

selectCompanys()
logout()
companyDepartaments()

