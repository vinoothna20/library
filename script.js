const myLibrary = [];

function Book(title, author, noOfPages, read) {
    let id = crypto.randomUUID();
    while(true) {
        if(isIdPresent(id)) {
            id = crypto.randomUUID();
        } else {
            break;
        }
    }

    this.id = id,
    this.title = title,
    this.author = author,
    this.noOfPages = noOfPages,
    this.read = read
}

function addBookToLibrary(title, author, noOfPages, read) {
    const bookToBeAdded = new Book(title, author, noOfPages, read);
    myLibrary.push(bookToBeAdded);
}

const addNewBookBtn = document.querySelector(".addBookBtn");
const addBookDialog = document.querySelector("#addBookDialog");
const booksContainer = document.querySelector(".noBooksCont");
const saveBtn = addBookDialog.querySelector("#saveBtn");
const inpEles = addBookDialog.querySelectorAll("input");
const readInp = addBookDialog.querySelector("#read");

addNewBookBtn.addEventListener("click",()=>{
    clearForm();
    addBookDialog.showModal();
});

saveBtn.addEventListener("click", (event) => {
    event.preventDefault(); 

    if(inpEles[0].value === "" || inpEles[1].value === "" || inpEles[2].value === "") {
        alert("Please fill the form to save.");
        return;
    }

    if(readInp.checked) {
        addBookToLibrary(inpEles[0].value, inpEles[1].value, inpEles[2].value, "Read");
    } else {
        addBookToLibrary(inpEles[0].value, inpEles[1].value, inpEles[2].value, "Not Read");
    }    
    addBookDialog.close();

    displayBooks();    
});

const displayBooks = () => {
    if(myLibrary.length > 0) {
        booksContainer.innerHTML = "";
        booksContainer.classList.remove("noBooksCont");
        booksContainer.classList.add("booksCont");
        
        for(let bookIndex in myLibrary) {
            const book = myLibrary[bookIndex];
    
            const card = document.createElement("div");
            card.setAttribute("class","card");
            
            const title = document.createElement("h3");
            title.textContent = `Title: ${book.title}`
    
            const author = document.createElement("p");
            author.textContent = `Author: ${book.author}`
    
            const noOfPages = document.createElement("p");
            noOfPages.textContent = `No of Pages: ${book.noOfPages}`
    
            const read = document.createElement("p");
            read.textContent = `Read: ${book.read}`
    
            const deleteBookBtn = document.createElement("button");
            deleteBookBtn.textContent = "Remove";
            deleteBookBtn.setAttribute("class","deleteBtn");
            deleteBookBtn.setAttribute("data-index-number",book.id)
            deleteBookBtn.addEventListener("click",(e) => deleteBook(e))
    
            card.append(title, author,noOfPages, read, deleteBookBtn);
    
            booksContainer.appendChild(card);
            
        }
    }  else {
        booksContainer.innerHTML = "";
        booksContainer.classList.remove("booksCont");
        booksContainer.classList.add("noBooksCont");
        const heading = document.createElement("h2");
        booksContainer.appendChild(heading);
        heading.innerHTML = `<p>There are no books here 😢</p>
        <p>Why not add one? 😉</p>`;
        clearForm();
    }
}

const clearForm = () => {
    for(let i = 0; i < inpEles.length - 1; i++) {
        inpEles[i].value = "";
    }
    readInp.checked = false;
}

const deleteBook = (e) => {
    const bookId = e.target.dataset.indexNumber;
    if(isIdPresent(bookId)) {
        for(let j = 0; j < myLibrary.length; j++) {
            if(myLibrary[j].id === bookId) {
                myLibrary.splice(j,1)
            }            
        }
    }

    displayBooks();
    
}

const isIdPresent = (id) => {
    for(let bookIndex in myLibrary) {
        const book = myLibrary[bookIndex];
        if(book.id === id) {
            return true;
        }
    }

    return false;
}

displayBooks();