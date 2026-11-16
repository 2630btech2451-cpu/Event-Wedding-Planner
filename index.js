// 1. COUNTDOWN TIMER

let countdown;

function startCountdown() {

    let date = document.getElementById("eventDate").value;

    if (!date || new Date(date).getTime() <= Date.now()) {
        alert("Select a future date");
        return;
    }

    let target = new Date(date).getTime();

    clearInterval(countdown);

    function update() {

        let distance = target - new Date().getTime();

        if (distance <= 0) {
            document.getElementById("timer").innerHTML =
                "Event Started!";
            clearInterval(countdown);
            return;
        }

        let days = Math.floor(distance / 86400000);
        let hours = Math.floor(distance / 3600000) % 24;
        let minutes = Math.floor(distance / 60000) % 60;
        let seconds = Math.floor(distance / 1000) % 60;

        document.getElementById("timer").innerHTML =
            days + " Days " + hours + " Hours " +
            minutes + " Minutes " + seconds + " Seconds";
    }

    update();
    countdown = setInterval(update, 1000);
}


// 2. BUDGET CALCULATOR

function calculateBudget() {

    let guests = Number(document.getElementById("guests").value);
    let food = Number(document.getElementById("food").value);
    let venue = Number(document.getElementById("venue").value);
    let decoration = Number(document.getElementById("decoration").value);

    if (guests <= 0 || food <= 0 || venue < 0 || decoration < 0) {
        alert("Enter valid details");
        return;
    }

    let total = guests * food + venue + decoration;

    document.getElementById("result").innerHTML =
        "Total Budget: ₹" + total;
}


// 3. GALLERY FILTER

function filterGallery(category) {

    let images = document.getElementsByClassName("gallery-item");

    for (let i = 0; i < images.length; i++) {

        if (category == "all" ||
            images[i].classList.contains(category)) {

            images[i].style.display = "block";

        } else {

            images[i].style.display = "none";
        }
    }
}


// 4. GUEST LIST WITH LOCAL STORAGE

let guestList = JSON.parse(localStorage.getItem("guestList")) || [];

function displayGuests() {

    let list = document.getElementById("guestList");

    list.innerHTML = "";

    guestList.forEach(function(name, index) {

        let li = document.createElement("li");

        li.textContent = name + " ";

        let btn = document.createElement("button");

        btn.textContent = "Remove";

        btn.onclick = function() {
            removeGuest(index);
        };

        li.appendChild(btn);
        list.appendChild(li);
    });
}

function addGuest() {

    let name = document.getElementById("guestName").value.trim();

    if (name == "") {
        alert("Enter guest name");
        return;
    }

    guestList.push(name);

    localStorage.setItem("guestList", JSON.stringify(guestList));

    document.getElementById("guestName").value = "";

    displayGuests();
}

function removeGuest(index) {

    guestList.splice(index, 1);

    localStorage.setItem("guestList", JSON.stringify(guestList));

    displayGuests();
}


// 5. BOOKING FORM VALIDATION

function bookEvent(event) {

    event.preventDefault();

    let phone = document.getElementById("phone").value;
    let name = document.getElementById("name").value;
    let date = document.getElementById("bookingDate").value;

    if (!/^[0-9]{10}$/.test(phone)) {
        alert("Enter valid 10 digit phone number");
        return;
    }

    let selectedDate = new Date(date + "T00:00:00");
    let today = new Date();
    today.setHours(0, 0, 0, 0);

    if (!date || selectedDate < today) {
        alert("Select a valid booking date");
        return;
    }

    document.getElementById("bookingMessage").innerHTML =
        "Thank You " + name + "! Booking Successful.";

    event.target.reset();
}


// DISPLAY GUESTS

displayGuests();
