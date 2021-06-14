function OnEdit(element) {
    console.log('onedit clicked');
    if (element.id == 'editBtn') {
        element.id = 'saveBtn';
        element.style.backgroundColor = "green";
        document.getElementById('deleteBtn').innerHTML = "Cancel";
    }
}

function OnDelete(element) {
    console.log('onDelete clicked');
    if (element.innerHTML == "Cancel") {
        element.innerHTML = "Delete";
    }
    if (element.innerHTML == "Delete") {
        //Show DialogBox Are you Sure.
    }
}