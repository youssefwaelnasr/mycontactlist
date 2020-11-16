const contactList = document.querySelector("#list");
const searchDiv = document.querySelector("#search-div");
const searchBar = document.querySelector("#search");
const addForm = document.forms["add-form"];
const noContactsMessage = document.querySelector("#no-contacts");

searchDiv.addEventListener("click", showHideSearch);
searchBar.addEventListener("keyup", searchContacts);
addForm.addEventListener("submit", addContact);
contactList.addEventListener("click", deleteContact);
contactList.addEventListener("dragstart", dragStart);
contactList.addEventListener("dragend", dragEnd);
contactList.addEventListener("dragover", dragOver);

let open = false;
function showHideSearch(e) {
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

    li.setAttribute("draggable", true);
    li.appendChild(nameSpan);
    li.appendChild(numberSpan);
    li.appendChild(deleteButton);
    contactList.appendChild(li);

    addForm.reset();

    if (contactList.children.length >= 1) {
        noContactsMessage.style.display = "none";
    }
}

function deleteContact(e) {
    if (e.shiftKey) {
        if (e.target.classList.contains("fa-user-minus")) {
            e.target.parentElement.parentElement.remove();
        } else if (e.target.classList.contains("delete")) {
            e.target.parentElement.remove();
        }
    } else {
        if (e.target.classList.contains("delete")) {
            if (
                confirm(
                    "Are you sure?\n\nPS: You can hold shift and click delete to skip this confirmation.",
                )
            ) {
                e.target.parentElement.remove();
            }
        } else if (e.target.classList.contains("fa-user-minus")) {
            if (
                confirm(
                    "Are you sure?\n\nPS: You can hold shift and click delete to skip this confirmation.",
                )
            ) {
                e.target.parentElement.parentElement.remove();
            }
        }
    }
    if (contactList.children.length < 1) {
        noContactsMessage.style.display = "block";
    }
}

function dragStart(e) {
    if (e.target.tagName === "LI") {
        e.target.classList.add("dragging");
    }
}

function dragEnd(e) {
    if (e.target.tagName === "LI") {
        e.target.classList.remove("dragging");
    }
}

function dragOver(e) {
    e.preventDefault();
    const afterElement = getAfterElement(this, e.clientY);
    const current = document.querySelector(".dragging");
    if (afterElement == null) {
        contactList.appendChild(current);
    } else {
        contactList.insertBefore(current, afterElement);
    }
}

function getAfterElement(container, y) {
    const listItems = [...container.querySelectorAll("li:not(.draggable)")];
    return listItems.reduce(
        (closest, child) => {
            const box = child.getBoundingClientRect();
            const offset = y - box.top - box.height / 2;
            if (offset < 0 && offset > closest.offset) {
                return { offset: offset, element: child };
            } else {
                return closest;
            }
        },
        { offset: Number.NEGATIVE_INFINITY },
    ).element;
}
