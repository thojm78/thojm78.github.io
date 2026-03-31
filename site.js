console.log('Hello')


// Assignment 3
const hours = new Date().getHours() // get the current hour

const isMorning = hours >= 4 && hours < 12 // is it morning?
const isAfternoon = hours >= 12 && hours < 17 // is it afternoon?
const isEvening = hours >= 17 || hours < 4 // is it evening?

const welcome = document.querySelector('#welcome')
if (isMorning) {
    welcome.textContent = 'Good Morning'
}
else if (isAfternoon) {
    welcome.textContent = 'Good Afternoon'
}
else if (isEvening) {
    welcome.textContent = 'Good Evening'
}


// Assignment 4 - local storage
localStorage.setItem("It's a secret to everybody.", 'Hi Ryan')


// Assignment 5 - carousel 
const urls = [
    'https://images.pexels.com/photos/1454360/pexels-photo-1454360.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://images.pexels.com/photos/933964/pexels-photo-933964.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://images.pexels.com/photos/1251861/pexels-photo-1251861.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://images.pexels.com/photos/1370296/pexels-photo-1370296.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
].map(url => { (new Image()).src = url; return url })

const images = document.querySelectorAll('#carousel img')

let currentImage = 0
const showImages = () => {
    const offset = currentImage % urls.length
    images.forEach((image, index) => {
        const imageIndex = (index + offset + urls.length) % urls.length
        image.src = urls[imageIndex]
    })
}
showImages()

setInterval(() => {
    currentImage++
    showImages()
}, 5000)

const prevButton = document.querySelector('#prev')
const nextButton = document.querySelector('#next')

prevButton.addEventListener('click', () => {
    currentImage--
    showImages()
})


nextButton.addEventListener('click', () => {
    currentImage++
    showImages()
})


// Assignment 6 - to do list
const todoList = document.querySelector('.todo-list')
const todoInput = document.querySelector('#new-todo')
const addButton = document.querySelector('#addTodo')

// Get the list from local storage
const todos = JSON.parse(localStorage.getItem('todo-list')) || []


const renderTodos = () => {
    // Clear the li's before we recreate them
    todoList.innerHTML = ''

    // Create and add new list items to the DOM
    todos.forEach(todo => {
        const li = document.createElement('li')
        li.textContent = todo.text
        todoList.append(li)
    })
}

renderTodos()

addButton.addEventListener('click', () => {
    if (todoInput.value.trim() === '') {
        return alert('Enter a todo item.')
    }

    // Add a new item to the list
    todos.push({ text: todoInput.value, completed: false })

    // Save the list to local storage
    localStorage.setItem('todo-list', JSON.stringify(todos))

    todoInput.value = ''

    renderTodos()
})


// Assignment 7 - API fetch
// arrow function to fetch random pokemon from PokeAPI
const getRandomPokemon = async () => {
    const url = 'https://pokeapi.co/api/v2/pokemon/' + Math.floor(Math.random() * 150)

    try {
        const response = await fetch(url)
        const data = await response.json()
        return data
    } catch (error) {
        console.log(error)
    }
}

// arrow function that takes pokemon object as parameter
const renderPokemon = (pokemonObject) => {
    const div = document.querySelector('.pokemonImage')
    const img = document.createElement('img')
    img.src = pokemonObject.sprites.front_default // url of the image from the 'front_default' property
        img.alt = pokemonObject.name // name of the pokemon
        div.append(img)
    
    return pokemonObject
}

const getPokemonImage = async () => {
    const pokemon = await getRandomPokemon()
    renderPokemon(pokemon)
}

getPokemonImage()