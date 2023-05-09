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
    const allCategories = await fetch(`${baseUrl}/categories/redAll` , {
        method: "GET"
    })
    .then(res => res.json())

    return allCategories
}

const renderSelect = async () =>{
    const categories = await getAllCategories()

    console.log(categories)
}

renderSelect()

handleRegisterModal()
handleModalLogin()