$(document).ready(function() {
    var element = document.getElementById("catpost");
    element.classList.add("active");
    // for category
    document.getElementById("category").addEventListener("input", function() {
        Invalidcat(this);
    });
    document.getElementById("category").addEventListener("invalid", function() {
        Invalidcat(this);
    });

    // for city
    document.getElementById("city").addEventListener("input", function() {
        Invalidcity(this);
    });
    document.getElementById("city").addEventListener("invalid", function() {
        Invalidcity(this);
    });

    // for title
    document.getElementById("title").addEventListener("input", function() {
        Invalidtitle(this);
    });
    document.getElementById("title").addEventListener("invalid", function() {
        Invalidtitle(this);
    });

    // for description
    document.getElementById("description").addEventListener("input", function() {
        InvalidDesc(this);
    });
    document
        .getElementById("description")
        .addEventListener("invalid", function() {
            InvalidDesc(this);
        });

    // for contact number
    document.getElementById("contact").addEventListener("input", function() {
        Invalidnum(this);
        var number = document.getElementById("contact");
        if (number.value.length > number.maxLength) {
            number.value = number.value.slice(0, number.maxLength);
        }
    });
    document.getElementById("contact").addEventListener("invalid", function() {
        Invalidnum(this);
    });

    // for file
    document.getElementById("img").addEventListener("input", function() {
        Invalidfile(this);
    });
    document.getElementById("img").addEventListener("invalid", function() {
        Invalidfile(this);
    });
});

function Invalidcat(textbox) {
    if (textbox.value === "") {
        textbox.setCustomValidity("Entering a category is necessary!");
    } else {
        textbox.setCustomValidity("");
    }
    return true;
}

function Invalidcity(textbox) {
    if (textbox.value === "") {
        textbox.setCustomValidity("Entering a city is necessary!");
    } else {
        textbox.setCustomValidity("");
    }
    return true;
}

function Invalidtitle(textbox) {
    if (textbox.value === "") {
        textbox.setCustomValidity("Entering a title is necessary!");
    } else {
        textbox.setCustomValidity("");
    }
    return true;
}

function InvalidDesc(textbox) {
    if (textbox.value === "") {
        textbox.setCustomValidity("Entering a description is necessary!");
    } else {
        textbox.setCustomValidity("");
    }
    return true;
}

function Invalidnum(textbox) {
    if (textbox.value === "") {
        textbox.setCustomValidity("Entering a contact number is necessary!");
    } else {
        textbox.setCustomValidity("");
    }
    return true;
}

function Invalidfile(textbox) {
    if (textbox.value === "") {
        textbox.setCustomValidity("Please choose your file!");
    } else {
        textbox.setCustomValidity("");
    }
    return true;
}