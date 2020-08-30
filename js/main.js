const searchDiv = document.querySelector("#search-div");
let open = false;
const searchBar = document.querySelector("#search");
const addForm = document.forms["add-form"];
const contactList = document.querySelector("#list");
const noContactsMessage = document.querySelector("#no-contacts");

// ADD EVENT LISTENERS
searchDiv.addEventListener("click", showHideSearch);
searchBar.addEventListener("keyup", searchContacts);
addForm.addEventListener("submit", addContact);
contactList.addEventListener("click", deleteContact);

// FUNCTION: SHOW/HIDE SEARCH BAR ON BUTTON CLICK
function showHideSearch(e) {
    e.preventDefault;
    const searchBar = document.querySelector("#search");
    const searchButton = document.querySelector("#search-button");

    if (
        (e.target.classList.contains("fa-search") ||
            e.target.classList.contains("show-btn")) &&
        open === false
    ) {
        searchBar.classList.add("show-search");
        searchButton.innerHTML = `<i class="fas fa-chevron-right"></i>`;
        open = true;
    } else if (
        (e.target.classList.contains("fa-chevron-right") ||
            e.target.classList.contains("show-btn")) &&
        open === true
    ) {
        searchBar.classList.remove("show-search");
        searchButton.innerHTML = `<i class="fas fa-search"></i>`;
        open = false;
    }
}

// FUNCTION: SEARCH CONTACTS
function searchContacts(e) {
    const searchText = e.target.value.toLowerCase();
    const contactNames = contactList.getElementsByTagName("li");
    Array.from(contactNames).forEach(function (name) {
        const contactName = name.firstElementChild.textContent.toLowerCase();
        if (contactName.indexOf(searchText) != -1) {
            name.style.display = "grid";
        } else {
            name.style.display = "none";
        }
    });
}

// FUNCTION: ADD NEW CONTACT
function addContact(e) {
    e.preventDefault();
    const nameValue = addForm.querySelector("#name-input").value;
    const numberValue = addForm.querySelector("#number-input").value;
    const li = document.createElement("li");

    const nameSpan = document.createElement("span");
    nameSpan.classList.add("name");
    nameSpan.textContent = nameValue;

    const numberSpan = document.createElement("span");
    numberSpan.classList.add("number");
    numberSpan.textContent = numberValue;

    const deleteButton = document.createElement("span");
    deleteButton.classList.add("delete");
    const delIcon = document.createElement("i");
    delIcon.className = "fas fa-user-minus";
    deleteButton.appendChild(delIcon);

    li.appendChild(nameSpan);
    li.appendChild(numberSpan);
    li.appendChild(deleteButton);
    contactList.appendChild(li);

    if (contactList.children.length >= 1) {
        noContactsMessage.style.display = "none";
    }
}

// FUNCTION: DELETE CONTACT
function deleteContact(e) {
    if (e.target.classList.contains("delete")) {
        if (confirm("Are you sure?")) {
            e.target.parentElement.remove();
        }
    } else if (e.target.classList.contains("fas")) {
        if (confirm("Are you sure?")) {
            e.target.parentElement.parentElement.remove();
        }
    }
    if (contactList.children.length < 1) {
        noContactsMessage.style.display = "block";
    }
}

// NO CONTACTS MESSAGE IF THERE ARE NO CONTACTS
