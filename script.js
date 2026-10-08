let selectedActivity = null;


/* -------------------------
   SECTION NAVIGATION
------------------------- */

function showSection(id) {

    document
        .querySelectorAll(".screen")
        .forEach(section => {
            section.style.display = "none";
        });

    const section =
        document.getElementById(id);

    section.style.display = "flex";

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


function nextSection(id) {
    showSection(id);
}


/* -------------------------
   INVITATION
------------------------- */

function acceptInvitation() {

    showSection("choice");

    createHeartBurst();
}


/* -------------------------
   DECLINE
------------------------- */

function declineInvitation() {

    showSection("declined");
}


/* -------------------------
   RUNNING "NO" BUTTON
------------------------- */

const noButton =
    document.getElementById("noButton");

let noAttempts = 0;

function moveNoButton() {

    noAttempts++;

    const maxX =
        Math.min(
            window.innerWidth * 0.3,
            150
        );

    const maxY =
        Math.min(
            window.innerHeight * 0.25,
            120
        );

    const x =
        Math.random() * maxX * 2 - maxX;

    const y =
        Math.random() * maxY * 2 - maxY;

    noButton.style.position = "relative";

    noButton.style.left = `${x}px`;

    noButton.style.top = `${y}px`;

    if (noAttempts >= 5) {

        noButton.innerText =
            "Ладно, почти поймала 😅";

        noButton.style.left = "0px";

        noButton.style.top = "0px";
    }
}


/*
    На компьютере убегает
    при наведении.
*/

noButton.addEventListener(
    "mouseenter",
    moveNoButton
);


/*
    На телефоне убегает
    при попытке нажать.
*/

noButton.addEventListener(
    "touchstart",
    function(event) {

        event.preventDefault();

        moveNoButton();
    }
);


/* -------------------------
   ACTIVITY
------------------------- */

function selectOption(button) {

    document
        .querySelectorAll(".option")
        .forEach(option => {
            option.classList.remove("selected");
        });

    button.classList.add("selected");

    selectedActivity =
        button.dataset.value;
}


function goToDate() {

    if (!selectedActivity) {

        alert(
            "Сначала выбери, куда хочешь пойти ❤️"
        );

        return;
    }

    showSection("date");
}


/* -------------------------
   CONFIRMATION
------------------------- */

function showConfirmation() {

    const date =
        document.getElementById("dateInput").value;

    const time =
        document.getElementById("timeInput").value;


    if (!date) {

        alert(
            "Выбери дату 📅"
        );

        return;
    }


    if (!time) {

        alert(
            "Выбери время 🕐"
        );

        return;
    }


    document
        .getElementById("summaryActivity")
        .innerText =
        selectedActivity;


    document
        .getElementById("summaryDate")
        .innerText =
        formatDate(date);


    document
        .getElementById("summaryTime")
        .innerText =
        time;


    showSection("confirmation");
}


/* -------------------------
   DATE FORMAT
------------------------- */

function formatDate(dateString) {

    const date =
        new Date(dateString + "T00:00:00");

    return date.toLocaleDateString(
        "ru-RU",
        {
            day: "numeric",
            month: "long",
            year: "numeric"
        }
    );
}


/* -------------------------
   BACK
------------------------- */

function goBackToChoice() {

    showSection("choice");
}


/* -------------------------
   SEND ANSWER
------------------------- */

async function sendAnswer() {

    const date =
        document.getElementById("dateInput").value;

    const time =
        document.getElementById("timeInput").value;


    const answer = {

        accepted: true,

        activity:
            selectedActivity,

        date:
            date,

        time:
            time,

        submittedAt:
            new Date().toISOString()
    };


    try {

        const response =
            await fetch(
                "https:dev-invitation.mysteriouzumaki.workers.dev",
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body:
                        JSON.stringify(answer)
                }
            );


        if (!response.ok) {
            throw new Error(
                "Server error"
            );
        }


        showSection("final");

        createHeartBurst();


    } catch (error) {

        console.error(error);

        /*
            Даже если уведомление
            не отправилось, девушка
            не должна увидеть
            техническую ошибку.
        */

        showSection("final");

        createHeartBurst();
    }
}


/* -------------------------
   HEARTS
------------------------- */

function createHeart() {

    const heart =
        document.createElement("div");

    heart.className = "heart";

    heart.innerText =
        ["❤️", "💕", "💗", "💖", "💘"]
        [
            Math.floor(
                Math.random() * 5
            )
        ];


    heart.style.left =
        Math.random() *
        window.innerWidth +
        "px";


    heart.style.fontSize =
        15 +
        Math.random() * 25 +
        "px";


    heart.style.animationDuration =
        4 +
        Math.random() * 5 +
        "s";


    document
        .getElementById("hearts")
        .appendChild(heart);


    setTimeout(
        () => heart.remove(),
        9000
    );
}


setInterval(
    createHeart,
    500
);


/* -------------------------
   HEART BURST
------------------------- */

function createHeartBurst() {

    for (
        let i = 0;
        i < 25;
        i++
    ) {

        setTimeout(
            createHeart,
            i * 60
        );
    }
}


/* -------------------------
   START
------------------------- */

showSection("hero");