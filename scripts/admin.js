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
        const nav = document.createElement('nav')
        const pencil__img = document.createElement('img')
        const trash__img = document.createElement('img')

        h2.innerText = arr.name
        pencil__img.src = "../images/pincil.svg"
        pencil__img.id = arr.id
        trash__img.src = "../images/trash.svg"
        trash__img.id = arr.id

        span.append(h2 , p)
        nav.append(pencil__img , trash__img)
        div.append(span , nav)

        section.appendChild(div)
    })
}

async function selectCompanys(){
    const select = document.querySelector('.select__companies')

    const allCompanies = await fetch(`${baseUrl}/companies/readAll`,{
        method: 'GET'
    })
    .then(response => response.json())

    allCompanies.forEach(companie =>{
        const option = document.createElement('option')
        option.innerText = companie.name
        option.value = companie.id
        option.id = companie.name

        select.appendChild(option)
    })
    return allCompanies
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

function dialogCreateDepartament(){
    const button = document.querySelector('.create__button')
    const modal = document.querySelector('.dialog__create__departament')
    const buttonClose = document.querySelector('.close__modal')

    button.addEventListener('click', () =>{
        modal.showModal()
    })

    buttonClose.addEventListener('click' , () =>{
        modal.close()
    })
}

async function department(array){
    const select = document.querySelector('.departament__select')

    array.forEach(arr =>{
        const option = document.createElement('option')
        option.innerText = arr.name
        option.value = arr.id


        select.appendChild(option)
    })
}

function handleCreateDepartament(){
    const select = document.querySelector('.departament__select')
    const button = document.querySelector('.department__create')
    const inputs = document.querySelectorAll('.input__departament')


    let selectValue = {}
    let departmentBody = {}
    let count = 0

    select.addEventListener('change', async () =>{
        selectValue = select.value
        button.addEventListener('click' , async (event) =>{
            event.preventDefault()

         inputs.forEach(input =>{
            if(input.value.trim() === ""){
                count ++
            }

            departmentBody[input.name] = input.value 
            departmentBody[select.name] = select.value
            console.log(departmentBody)
         })
         if(count !== 0){
            count = 0

            return alert('preencha os campos necessarios')
         }else{
            const jb = await createDepartament(departmentBody)

            return jb
         }
            
        })
       
    })
}

async function createDepartament(departamentBod){
    const modal = document.querySelector('.dialog__create__departament')

    const create = await fetch(`${baseUrl}/departments/create`,{
        method:'POST',
        headers: { Authorization: `Bearer ${token}`},
        body: JSON.stringify(departamentBod)
    })
    .then(async (res) =>{
        const responseJson = await res.json()
        console.log(responseJson)
        if(res.ok){
            modal.close()
        }else{
            alert(responseJson.message)
        }
    })
    return create
}



//const departamentBody = {
//    name: "test",
//    description: "Departamento responsavel pela sua segurança",
//    company_id: "86bffcd8-ff51-4b42-8dd2-e60639a3dc13"
//}


handleCreateDepartament()
department(await selectCompanys())
await getEmployees()
dialogCreateDepartament()
logout()
companyDepartaments()

