const baseUrl = 'http://localhost:3333'
import { loginRequest , createLogin } from "./request.js"
const token = localStorage.getItem('@final:token')
const tokenValue = localStorage.getItem('@final:isAdm')

function authentication(){

    if(token){
        if(tokenValue === 'false'){
            location.replace('/pages/user.html')
        }else{
            location.replace('/pages/adm.html')
        }
    }
}

authentication()

const handleModalLogin = () =>{
    const modal = document.querySelector('.login__modal')
    const registerModal = document.querySelector('.register__modal')
    const button = document.querySelector('.login__button')
    const buttonRegister = document.querySelector('.button__register__modal')
    const buttonClose = document.querySelector('.close__login__modal')

    button.addEventListener('click', () =>{
        modal.showModal()
    })

    buttonRegister.addEventListener('click', () =>{
        modal.close()
        registerModal.showModal()
    })

    buttonClose.addEventListener('click' , () =>{
        modal.close()
    })
}

const handleRegisterModal = () =>{
    const modal = document.querySelector('.register__modal')
    const button = document.querySelector('.register__button')
    const buttonClose = document.querySelector('.modal__button__return')

    button.addEventListener('click', () =>{
        modal.showModal()
    })

    buttonClose.addEventListener('click', () =>{
        modal.close()
    })
}

const getAllCategories = async () =>{
    const allCategories = await fetch(`${baseUrl}/categories/readAll` , {
        method: "GET"
    })
    .then(res => res.json())

    return allCategories
}

const renderSelect = async () =>{
    const categories = await getAllCategories()
    const select = document.querySelector('select')

    categories.forEach(category =>{
        const option = document.createElement('option')
        option.id = category.id
        option.value = category.name
        option.innerText = category.name

        select.appendChild(option)
    })
}

function filterCompanies() {
    const select = document.querySelector('select')
    const div = document.querySelector('.companies')

    select.addEventListener('change' , async () =>{
        const selectValue = select.value
        console.log(selectValue)
        div.innerHTML = ""

        const filterCategory = await fetch(`${baseUrl}/companies/readByCategory/${selectValue}` ,{
            method: "GET"
        })
        .then(async (res) =>{
            if(res.ok){
                const response = await res.json()

                return response
            }else{
                const allCompanies = await fetch (`${baseUrl}/companies/readAll`,{
                    method: "GET"
                })
                .then(response => response.json())
                return allCompanies
            }
        })
        

        renderFilterCompanies(filterCategory, selectValue)
    })
}

function renderFilterCompanies  (array, selectValue) {
    const div = document.querySelector('.companies')

    array.forEach(arr =>{
    
        const divItens = document.createElement('div')
        const h3 = document.createElement('h3')
        const p = document.createElement('p')

        h3.innerText = arr.name
        p.innerText = selectValue

        divItens.append(h3 , p)
        div.appendChild(divItens)
    })
}

async function  renderCompanies(){
    const allCompanies = await fetch (`${baseUrl}/companies/readAll`,{
        method: "GET"
    })
    .then(response => response.json())

    const allCategories = await getAllCategories()

    
    if(allCategories.id == allCompanies.categoryId){

        renderFilterCompanies(allCompanies, allCategories.name)

    }

    console.log(allCategories)
    console.log(allCompanies)
}

function handleLogin(){
    const inputs = document.querySelectorAll('.input__login')
    const button = document.querySelector('.button__modal__login')

    let loginBody = {}
    let count= 0

    button.addEventListener('click', async (e) =>{
        e.preventDefault()

        inputs.forEach(input =>{
            if(input.value.trim() === ''){
                count ++
            }

            loginBody[input.name] = input.value
        })
        if(count !== 0){
            count = 0
            return alert("preencha os campos necessários")
        }else{
            const login = await loginRequest(loginBody)

            return login
        }
    })
}

function handleCreateLogin(){
    const inputs = document.querySelectorAll('.input__register')
    const button = document.querySelector('.modal__register__button')

    let createBody = {}
    let count = 0

    button.addEventListener('click', async (e) =>{
        e.preventDefault()

        inputs.forEach(input =>{
            if(input.value.trim() === ''){
                count ++
            }
            createBody[input.name] = input.value
        })
        if(count !== 0){
            count = 0
            return alert("preencha os campos necessários")
        }else{
            const create = await createLogin(createBody)

            return create
        }
    })
}


handleCreateLogin()

handleLogin()
await renderCompanies()
filterCompanies()
renderSelect()
handleRegisterModal()
handleModalLogin()