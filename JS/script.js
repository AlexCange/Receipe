
// --------------------------------------------------------------------------------------------------------------------

// CREATE RECEIPE 
class Receipe {
    constructor(
        Name = 'Unknown',
        Difficulté = 'Unknown',
        Ingredients = ['Ingredient 1', 'Ingredient 2'],
        Préparation = ['Step1', 'Step2', 'Step3'],
        Cuisson = 1,
        PrepTemps = 1
    ) {
        this.Name = Name
        this.Difficulté = Difficulté
        this.Ingredients = Ingredients
        this.Préparation = Préparation
        this.Cuisson = Cuisson
        this.PrepTemps = PrepTemps
    }
}
// RECEIPE BOOK
class ReceipeBook {
    constructor() {
        this.receipes = []
    }

    addReceipe(newReceipe) {
        this.receipes.push(newReceipe)
    }

    getReceipe(Name) {
        return this.receipes.find((receipe) => receipe.Name === Name)
    }
}

const book = new ReceipeBook()

// ------------- DISPLAY WEBSITE ------------------

const RecettesGrid = document.getElementById('RecettesGrid')
const AddReceipeForm = document.getElementById('ReceipeAdd')
const AddReceipeBtn = document.getElementById('AddReceipeBtn')
const AddIngredientForm = document.getElementById('AddIngredientBtn')
const AddStepsForm = document.getElementById('AddStepsBtn')


    // Update the grid with all receipes
const updateReceipesGrid = () => {
    resetReceipesGrid()
    for (let receipe of book.receipes) {
        createReceipeDiv(receipe)
    }
    document.getElementById('AddReceipeForm').reset()
    document.getElementById('IngredientList').innerHTML = ''
    document.getElementById('StepsList').innerHTML = ''
}

const resetReceipesGrid = () => {
    document.getElementById('RecettesGrid').innerHTML = ''
}

// Create a new div for each receipe
const createReceipeDiv = (receipe) => {

    let ReceipeDiv = document.createElement('div')
    ReceipeDiv.classList.add('RecetteDiv')
    ReceipeDiv.setAttribute('id', 'RecetteDiv')
    let Name = document.createElement('h1')
    let InfoReceipe = document.createElement('div')
    let Difficulté = document.createElement('p')
    let PrepTemps = document.createElement('p')
    let Cuisson = document.createElement('p')
    let TempTotal = document.createElement('p')

    let IngListHeader = document.createElement('h1')
    IngListHeader.innerText = 'Ingrédients'
    let Ingredient = document.createElement('ul')
    receipe.Ingredients.forEach(ing => {
        inglist = document.createElement('li')
        inglist.innerText = ing
        Ingredient.appendChild(inglist)
    })
    console.log(receipe.Ingredients);

    let StepsListHeader = document.createElement('h1')
    StepsListHeader.innerText = 'Étapes'
    let Steps = document.createElement('ol')
    receipe.Préparation.forEach (step => {
        itempoint = document.createElement('li')
        itempoint.innerText = step
        Steps.appendChild(itempoint)
    })

    Name.textContent = receipe.Name
    Difficulté.textContent = receipe.Difficulté
    PrepTemps.textContent = `${receipe.PrepTemps}min`
    Cuisson.textContent = `${receipe.Cuisson}min`
    TempTotalnumber = parseInt(receipe.PrepTemps) + parseInt(receipe.PrepTemps)
    TempTotal.textContent = `${TempTotalnumber}min`

    InfoReceipe.appendChild(Difficulté)
    InfoReceipe.appendChild(PrepTemps)
    InfoReceipe.appendChild(Cuisson)
    InfoReceipe.appendChild(TempTotal)

    ReceipeDiv.appendChild(Name)
    ReceipeDiv.appendChild(InfoReceipe)

    ReceipeDiv.appendChild(IngListHeader)
    ReceipeDiv.appendChild(Ingredient)

    ReceipeDiv.appendChild(StepsListHeader)
    ReceipeDiv.appendChild(Steps)

    RecettesGrid.appendChild(ReceipeDiv)
}

// Add Ingredients to List
AddIngredientForm.addEventListener('click', (e) => {
    e.preventDefault()
    const IngUL = document.getElementById('IngredientList')
    let IngLi = document.createElement('li')
    let qty = document.getElementById('Quantity').value
    let measure = document.getElementById('measure').value
    let ingname = document.getElementById('IngredientName').value
    IngLi.innerText = `${qty}${measure} ${ingname}`
    IngLi.setAttribute('onclick', "remove_item(this)")
    IngUL.appendChild(IngLi)
    document.getElementById('IngredientName').value = ''
    document.getElementById('Quantity').value = ''
})

AddStepsForm.addEventListener('click', (e) => {
    e.preventDefault()
    const StepUL = document.getElementById('StepsList')
    let StepLi = document.createElement('li')
    let stepdesc = document.getElementById('StepText').value
    StepLi.innerText = stepdesc
    StepLi.setAttribute('onclick', "remove_item(this)")
    StepUL.appendChild(StepLi)
    document.getElementById('StepText').value = ''
})

function remove_item(selected_item) {
    selected_item.parentNode.removeChild(selected_item);
}


// Get data from the form
const getReceipebyInput = () => {

    const Name = document.getElementById('Name').value
    const PrepTemps = document.getElementById('PrepTemps').value
    const Cuisson = document.getElementById('Cuisson').value
    const TempTotal = parseInt(PrepTemps) + parseInt(Cuisson)
    const Difficulté = document.getElementById('difficultyradio').value
    const IngUL = document.getElementById('IngredientList')
    const StepUL = document.getElementById('StepsList')

    const Ingredients = []
    Array.from(IngUL.childNodes).forEach(item => {
        Ingredients.push(item.innerText)
    })
    const Préparation = []
    Array.from(StepUL.childNodes).forEach(step => {
        Préparation.push(step.innerText)
    })
    return new Receipe(Name, Difficulté, Ingredients, Préparation, Cuisson, PrepTemps)
}


const addReceipe = (e) => {
    e.preventDefault()
    const newReceipe = getReceipebyInput()

    book.addReceipe(newReceipe)
    saveLocal()
    addBookDB(newReceipe)
    updateReceipesGrid()
}

const addReceipeformbtn = document.getElementById('AddReceipeForm')
addReceipeformbtn.onsubmit = addReceipe




const saveLocal = () => {
    localStorage.setItem('ReceipeBook', JSON.stringify(book.receipes))
}

const restoreLocal = () => {
    const books = JSON.parse(localStorage.getItem('ReceipeBook'))
    if (books) {
    book.receipes = books.map((book) => JSONToBook(book))
    } else {
    book.receipes = []
    }
}

const receipe = book.getReceipe(Name)

const db = firebase.firestore()

const addBookDB = (newBook) => {
    db.collection("Receipe").add(bookToDoc(newBook))
}


const getBookIdDB = async (Name) => {
    const snapshot = await db
    .collection('Receipe')
    .where('Name', '==', Name)
    .get()
    const receipeId = snapshot.docs.map((doc) => doc.id).join('')
    return receipeId
}


const docsToBooks = (docs) => {
    return docs.map((doc) => {
        return new Receipe(
        doc.data().Name,
        doc.data().Difficulté,
        doc.data().Ingredient,
        doc.data().Préparation,
        doc.data().Cuisson,
        doc.data().PrepTemps
        )
    })
}


const JSONToBook = (receipe) => {
    return new Receipe(
        receipe.Name, 
        receipe.Difficulté, 
        receipe.Ingredients, 
        receipe.Préparation, 
        receipe.Cuisson, 
        receipe.PrepTemps)
}


const bookToDoc = (receipe) => {
    return {
    Name: receipe.Name,
    Difficulté: receipe.Difficulté,
    Ingredients: receipe.Ingredients,
    Préparation: receipe.Préparation,
    Cuisson: receipe.Cuisson,
    PrepTemps: receipe.PrepTemps,
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    }
}

