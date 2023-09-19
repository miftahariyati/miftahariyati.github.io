//References
let timeLeft = document.querySelector(".time-left");
let quizContainer = document.getElementById("container");
let nextBtn = document.getElementById("next-button");
let countOfQuestion = document.querySelector(".number-of-question");
let displayContainer = document.getElementById("display-container");
let scoreContainer = document.querySelector(".score-container");
let restart = document.getElementById("restart");
let userScore = document.getElementById("user-score");
let startScreen = document.querySelector(".start-screen");
let startButton = document.getElementById("start-button");
const modal = document.getElementById("modal");
const modalCloseButton = document.getElementById("modal-close");
let questionCount;
let scoreCount = 0;
let count = 61;
let countdown;

//Questions and Options array

const quizArray = [
    {
        id: "0",
        question: "I don't like these oranges. These oranges are a little bit ...",
        options: ["Salty", "Sour", "Sweet", "Bitter"],
        correct: "Sour",
        url: "https://img.freepik.com/premium-vector/little-boy-eat-sour-orange-show-funny-expression_97632-6077.jpg?w=2000",
        balloonText: "Jeruk ini rasanya sedikit kecut",
    },
    {
        id: "1",
        question: "My father always drinks coffee every morning. Coffee is ...",
        options: ["Salty", "Sour", "Sweet", "Bitter"],
        correct: "Bitter",
        url: "https://img.freepik.com/premium-vector/father-reads-newspaper-drink-coffee_10045-300.jpg?w=2000",
        balloonText: "Saya suka minum kopi yang pahit",
    },
    {
        id: "2",
        question: "Dani : ...<br>" +
            "Rini : It tastes sweet",
        options: ["What is honey taste?", "Why does honey taste?", "How does honey taste?", "Does honey taste?"],
        correct: "How does honey taste?",
        url: "https://img.freepik.com/premium-vector/vector-beekeeper-with-honey-jar-bee-beehive-cute-kid-doing-agricultural-work-icon-rural-country-farmer-character-child-protective-uniform-funny-farm-illustration-with-cartoon-boy_150240-4044.jpg?w=2000",
        balloonText: "Madu rasanya manis",
    },
    {
        id: "3",
        question: "We eat ... on tuesday",
        options: ["Salty pare", "Bitter pare", "Sour pare", "Sweet pare"],
        correct: "Bitter pare",
        url: "https://media.istockphoto.com/id/591837232/id/vektor/pare.jpg?s=170667a&w=0&k=20&c=BKZavJSJFDl5oGEOvxufXGBgzfYgf3z8vNKXFIabORE=",
        balloonText: "Pare yang sangat pahit",
    },
    {
        id: "4",
        question: "Cake is Danisha's favorite food. Cake is ...",
        options: ["Sweet", "Bitter", "Sour", "Salty"],
        correct: "Sweet",
        url: "https://img.freepik.com/premium-vector/cartoon-vector-illustration-children-cartoon-illustration-cake-with-strawberry_255358-3181.jpg?w=2000",
        balloonText: "Saya suka kue",
    },
    {
        id: "5",
        question: "Rini's favorite food is ...",
        options: ["Sweet fish", "Sour fish", "Salty fish", "Bitter fish"],
        correct: "Salty fish",
        url: "https://img.freepik.com/premium-vector/vector-illustration-kid-eating-fish_29937-1636.jpg?w=2000",
        balloonText: "Saya suka makan ikan asin",
    }, {
        id: "6",
        question: "My mother give me a pizza. Pizza is a little bit ...",
        options: ["Sour", "Sweet", "Bitter", "Salty"],
        correct: "Salty",
        url: "https://img.freepik.com/premium-vector/boy-holding-pizza-box-eating-slice-pizza_173125-801.jpg?w=2000",
        balloonText: "Pizza ini rasanya sedikit asin",
    },
    {
        id: "7",
        question: "Every morning, Rini always drinks ...",
        options: ["Sour milk", "Salty milk", "Bitter milk", "Sweet milk"],
        correct: "Sweet milk",
        url: "https://img.freepik.com/premium-vector/happy-cute-little-kid-girl-drink-milk_97632-1845.jpg?w=2000",
        balloonText: "Saya suka susu manis",
    },
    {
        id: "8",
        question: "What is Dini drinking?<br>" +
            "He is drinking a glass of ...",
        options: ["Sour mango juice", "Sweet lemon juice", "Sweet mango juice", "Sour lemon juice"],
        correct: "Sour lemon juice",
        url: "https://img.freepik.com/premium-vector/lemon-juice-milkshake-takeaway-plastic-cup-illustration-cold-drinks-plastic-cups-with-ice-flat-style_385450-339.jpg?w=2000",
        balloonText: "Es lemon ini cukup kecut",
    },
    {
        id: "9",
        question: "What does Yuri want?<br>" +
            "She wants ...",
        options: ["Bitter green water", "Sweet green water", "Bitter green tea", "Sweet green tea"],
        correct: "Bitter green tea",
        url: "https://img.freepik.com/premium-vector/cute-cartoon-girl-drinks-matcha-tea_533043-41.jpg?w=2000",
        balloonText: "Saya suka teh hijau pahit",
    },
];

//Restart Quiz
restart.addEventListener("click", () => {
    initial();
    displayContainer.classList.remove("hide");
    scoreContainer.classList.add("hide");
});

//Next Button
nextBtn.addEventListener("click", () => {

    const questionCard = document.querySelector(".container-mid:not(.hide)");
    const selectedOption = questionCard.querySelector(".option-div.correct");

    if (!selectedOption) {
        // If no option is selected, show the modal alert
        showModal();
    } else {
        closeModal();
        displayNext();
    }
});

const displayNext = () => {
    //increment questionCount
    questionCount += 1;
    //if last question
    if (questionCount == quizArray.length) {
        //hide question container and display score
        displayContainer.classList.add("hide");
        scoreContainer.classList.remove("hide");
        //user score
        userScore.innerHTML =
            "Your score is " + scoreCount + " out of " + questionCount;

    } else {
        //display questionCount
        countOfQuestion.innerHTML =
            questionCount + 1 + " dari " + quizArray.length + " pertanyaan";
        //display quiz
        quizDisplay(questionCount);
        count = 61;
        clearInterval(countdown);
        timerDisplay();
    }
};

//Timer
const timerDisplay = () => {
    countdown = setInterval(() => {
        count--;
        timeLeft.innerHTML = `${count}s`;
        if (count == 0) {
            clearInterval(countdown);
            displayNext();
        }
    }, 1000);
};

//Display quiz
const quizDisplay = (questionCount) => {
    let quizCards = document.querySelectorAll(".container-mid");
    //Hide other cards
    quizCards.forEach((card) => {
        card.classList.add("hide");
    });
    //display current question card
    quizCards[questionCount].classList.remove("hide");

    // Display the image for the current question
    const currentQuestion = quizArray[questionCount];
    const imageUrl = currentQuestion.url;
    const imageContainer = document.querySelector(".image-container");
    const image = imageContainer.querySelector("img");
    const balloonTooltip = imageContainer.querySelector(".balloon-tooltip");

    image.src = imageUrl;
    balloonTooltip.textContent = currentQuestion.balloonText;

};

// Function to show the modal dialog
function showModal() {
    modal.style.display = "block";
}

// Function to close the modal dialog
function closeModal() {
    modal.style.display = "none";
}

modalCloseButton.addEventListener("click", closeModal);

//Quiz Creation
function quizCreator() {
    //randomly sort questions
    quizArray.sort(() => Math.random() - 0.5);
    //generate quiz
    for (let i of quizArray) {
        //randomly sort options
        i.options.sort(() => Math.random() - 0.5);
        //quiz card creation
        let div = document.createElement("div");
        div.classList.add("container-mid", "hide");
        //question number
        countOfQuestion.innerHTML = 1 + " of " + quizArray.length + " Question";
        //question
        let question_DIV = document.createElement("p");
        question_DIV.classList.add("question");
        question_DIV.innerHTML = i.question;
        div.appendChild(question_DIV);
        //options
        div.innerHTML += `
    <button class="option-div" onclick="checker(this)">${i.options[0]}</button>
     <button class="option-div" onclick="checker(this)">${i.options[1]}</button>
      <button class="option-div" onclick="checker(this)">${i.options[2]}</button>
       <button class="option-div" onclick="checker(this)">${i.options[3]}</button>
    `;
        quizContainer.appendChild(div);
    }
}

//Checker Function to check if option is correct or not
function checker(userOption) {
    let userSolution = userOption.innerText;
    let question =
        document.getElementsByClassName("container-mid")[questionCount];
    let options = question.querySelectorAll(".option-div");

    //if user clicked answer == correct option stored in object
    if (userSolution === quizArray[questionCount].correct) {
        userOption.classList.add("correct");
        scoreCount++;

        // Play the correct answer sound effect
        document.getElementById("correct-audio").play();
    } else {
        userOption.classList.add("incorrect");
        //For marking the correct option
        options.forEach((element) => {
            if (element.innerText == quizArray[questionCount].correct) {
                element.classList.add("correct");
            }
        });

        options.forEach((element) => {
            if (element !== userOption) {
                element.classList.add("shake");
                // Remove the "shake" class after the animation completes
                element.addEventListener("animationend", () => {
                    element.classList.remove("shake");
                }, { once: true });
            }
        });

        // Play the wrong answer sound effect
        document.getElementById("wrong-audio").play();
    }

    //clear interval(stop timer)
    clearInterval(countdown);
    //disable all options
    options.forEach((element) => {
        element.disabled = true;
    });
}

//initial setup
function initial() {
    quizContainer.innerHTML = "";
    questionCount = 0;
    scoreCount = 0;
    count = 61;
    clearInterval(countdown);
    timerDisplay();
    quizCreator();
    quizDisplay(questionCount);
}

//when user click on start button
startButton.addEventListener("click", () => {
    startScreen.classList.add("hide");
    displayContainer.classList.remove("hide");
    initial();
});

//hide quiz and display start screen
window.onload = () => {
    startScreen.classList.remove("hide");
    displayContainer.classList.add("hide");
};