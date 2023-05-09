const baseUrl = 'http://localhost:3333'


const handleModalLogin = () =>{
    const modal = document.querySelector('.login__modal')
    const button = document.querySelector('.login__button')
    const buttonClose = document.querySelector('.close__login__modal')

    button.addEventListener('click', () =>{
        modal.showModal()
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

const createListCompanies = (array) =>{

    const div = document.createElement('div')
    const h2 = document.createElement('h2')
    const p = document.createElement('p')

    h2.innerText = array.name
    p.innerText = j

    div.append(h2 , p)
}

const renderListCompanies = () =>{
    const select = document.querySelector('select')

    select.addEventListener('change' , async () =>{
        const selectValue = select.value

        const filterCategory = await fetch(`${baseUrl}/companies/readByCategory/${selectValue}` ,{
            method: "GET"
        })
        .then(res => res.json())

        console.log(filterCategory)

        return filterCategory
    })
}

renderListCompanies()

renderSelect()
handleRegisterModal()
handleModalLogin()