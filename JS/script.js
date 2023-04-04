
// --------------------------------------------------------------------------------------------------------------------

// CREATE RECEIPE 
class Receipe {
    constructor(
        Name = 'Unknown',
        Tags = ['Tag1', 'Tag2'],
        Difficulté = 'Unknown',
        Ingredients = [],
        Préparation = [],
        Cuisson = 1,
        PrepTemps = 1,
        Person = 'Unknown'
    ) {
        this.Name = Name
        this.Tags = Tags
        this.Difficulté = Difficulté
        this.Ingredients = Ingredients
        this.Préparation = Préparation
        this.Cuisson = Cuisson
        this.PrepTemps = PrepTemps
        this.Person = Person
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
    document.getElementById('TagList').innerHTML = ''
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
    Name.setAttribute('id', `${receipe.Name.toLowerCase().replace(/\s/g, '')}`)
    let Person = document.createElement('p')
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

    let StepsListHeader = document.createElement('h1')
    StepsListHeader.innerText = 'Étapes'
    let Steps = document.createElement('ol')
    receipe.Préparation.forEach (step => {
        itempoint = document.createElement('li')
        itempoint.innerText = step
        Steps.appendChild(itempoint)
    })

    let TagList = document.createElement('ul')
    TagList.setAttribute('class', 'TagUL')
    receipe.Tags.forEach(tag => {
        tagli = document.createElement('li')
        tagli.innerText = tag
        tagli.setAttribute('class', 'TagsLiItem')
        tagicon = document.createElement('span')
        tagicon.setAttribute('class', 'material-symbols-outlined')
        tagicon.innerText = 'sell'
        tagli.appendChild(tagicon)
        TagList.appendChild(tagli)
    })

    Name.textContent = receipe.Name
    Person.innerHTML = `Made by: ${receipe.Person} <br><br>`
    Difficulté.textContent = receipe.Difficulté
    PrepTemps.textContent = `Préparation: ${receipe.PrepTemps}min`
    Cuisson.textContent = `Cuisson: ${receipe.Cuisson}min`
    TempTotalnumber = parseInt(receipe.PrepTemps) + parseInt(receipe.Cuisson)
    TempTotal.textContent = `Temps Total: ${TempTotalnumber}min`

    InfoReceipe.appendChild(Person)
    InfoReceipe.appendChild(Difficulté)
    InfoReceipe.appendChild(PrepTemps)
    InfoReceipe.appendChild(Cuisson)
    InfoReceipe.appendChild(TempTotal)

    ReceipeDiv.appendChild(Name)

    ReceipeDiv.appendChild(TagList)
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

const AddTagBtn = document.getElementById('AggTag')
AddTagBtn.addEventListener('click', (e) => {
    e.preventDefault()
    const TagUL = document.getElementById('TagList')
    let TagLi = document.createElement('li')
    let tagdesc = document.getElementById('Kind').value
    TagLi.innerText = tagdesc
    TagLi.setAttribute('onclick', "remove_item(this)")
    TagUL.appendChild(TagLi)
    document.getElementById('Kind').value = ''
})

function remove_item(selected_item) {
    selected_item.parentNode.removeChild(selected_item);
}


// Get data from the form
const getReceipebyInput = () => {

    const Name = document.getElementById('Name').value
    const PrepTemps = document.getElementById('PrepTemps').value
    const Person = document.getElementById('Person').value
    const Cuisson = document.getElementById('Cuisson').value
    const TempTotal = parseInt(PrepTemps) + parseInt(Cuisson)
    const Difficulté = document.getElementById('difficultyradio').value
    const IngUL = document.getElementById('IngredientList')
    const StepUL = document.getElementById('StepsList')
    const TagUL = document.getElementById('TagList')

    const Tags = []
    Array.from(TagUL.childNodes).forEach(tag => {
        Tags.push(tag.innerText)
    })

    const Ingredients = []
    Array.from(IngUL.childNodes).forEach(item => {
        Ingredients.push(item.innerText)
    })
    const Préparation = []
    Array.from(StepUL.childNodes).forEach(step => {
        Préparation.push(step.innerText)
    })
    return new Receipe(Name, Tags, Difficulté, Ingredients, Préparation, Cuisson, PrepTemps, Person)
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
    book.receipes = books.map((item) => JSONToBook(item))
    } else {
    book.receipes = []
    }
}

const receipe = book.getReceipe(Name)

const db = firebase.firestore()

let unsubscribe
function setupRealTimeListener() {
    unsubscribe = db
    .collection('Receipe')
    .onSnapshot((snapshot) => {
        book.receipes = docsToBooks(snapshot.docs)
        updateReceipesGrid()
    })
}
setupRealTimeListener()

const addBookDB = (newBook) => {
    db.collection("Receipe").add(bookToDoc(newBook))
}

const docsToBooks = (docs) => {
    return docs.map((doc) => {
        return new Receipe(
        doc.data().Name,
        doc.data().Tags,
        doc.data().Difficulté,
        doc.data().Ingredients,
        doc.data().Préparation,
        doc.data().Cuisson,
        doc.data().PrepTemps, 
        doc.data().Person
        )
    })
}


const JSONToBook = (receipe) => {
    return new Receipe(
        receipe.Name, 
        receipe.Tags,
        receipe.Difficulté, 
        receipe.Ingredients, 
        receipe.Préparation, 
        receipe.Cuisson, 
        receipe.PrepTemps, 
        receipe.Person)
}


const bookToDoc = (receipe) => {
    return {
    Name: receipe.Name,
    Tags: receipe.Tags,
    Difficulté: receipe.Difficulté,
    Ingredients: receipe.Ingredients,
    Préparation: receipe.Préparation,
    Cuisson: receipe.Cuisson,
    PrepTemps: receipe.PrepTemps,
    Person: receipe.Person,
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    }
}


// Search Bar 

const AllReceipeNameOL = document.getElementById('AllReceipeName')
const SearchBarInput = document.getElementById('SearchBarInput')
const LiReceipes = []
const SearchForm = document.getElementById('SearchForm')

SearchBarInput.addEventListener('focus', () => {
    AllReceipeNameOL.style.display = 'block'
})

SearchBarInput.addEventListener('focusout', () => {
    AllReceipeNameOL.style.display = 'none'
})

function search_receipe() {
    let input = document.getElementById('SearchBarInput').value
    input=input.toLowerCase();
    let x = document.getElementsByClassName('RecetteNameLI');
    for (i = 0; i < x.length; i++) { 
        if (!x[i].innerHTML.toLowerCase().includes(input)) {
            x[i].style.display="none";
        }
        else {
            x[i].style.display="block";                 
        }
    }
}

setTimeout(() => {
    const RecetteDivs = document.querySelectorAll('#RecetteDiv')
    RecetteDivs.forEach(item => {
        LiReceipes.push(item.firstChild.innerHTML);
        RecetteLi = document.createElement('li')
        Recettea = document.createElement('a')
        Recettea.setAttribute('class', 'RecetteNameA')
        Recettea.setAttribute('href', '#')
        Recettea.setAttribute('onclick', 'GetName(this)')
        RecetteLi.setAttribute('class', 'RecetteNameLI')
        RecetteLi.textContent = item.firstChild.innerHTML
        RecetteLi.appendChild(Recettea)
        AllReceipeNameOL.appendChild(RecetteLi) })
}, 2000)

SearchForm.addEventListener('submit', (e) => {
    e.preventDefault()
    let finalre = ''
    LiReceipes.forEach(rec => {
        ele = rec.toLowerCase().replace(/\s/g, '')
        input = document.getElementById('SearchBarInput').value
        if (ele.includes(input)) {
            finalre = ele
        }
    })
    const div = document.getElementById(finalre)
    div.scrollIntoView({behavior:"smooth"})
    SearchForm.reset()
})

function GetName() {
    console.log(this)
}