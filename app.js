// 5 SEEING HABITS FLASHCARD STUDY APP

// FLASHCARD DATA


let flashcards = [
  {
    id: 1,
    habit: "Aim High in Steering",
    question: "How do you Aim High in Steering?",
    answer: "Look at an imaginary target like a baseball or dartboard."
  },
  {
    id: 2,
    habit: "Aim High in Steering",
    question: "What does Aim High in Steering do?",
    answer: "Centers your vehicle in the traffic lane and ensures a safe path on turns."
  },
  {
    id: 3,
    habit: "Aim High in Steering",
    question: "What is the key phrase for Aim High in Steering?",
    answer: "Find a safe path well ahead."
  },
  {
    id: 4,
    habit: "Get the Big Picture",
    question: "How do you Get the Big Picture?",
    answer: "Check how wide and deep the space is, and note what is in it, including objects and the ground."
  },
  {
    id: 5,
    habit: "Get the Big Picture",
    question: "What does Get the Big Picture do?",
    answer: "Keeps you away from billboards, allows for smooth stops and turns, and buys you time."
  },
  {
    id: 6,
    habit: "Get the Big Picture",
    question: "What is the key phrase for Get the Big Picture?",
    answer: "Stay back and see it all."
  },
  {
    id: 7,
    habit: "Keep Your Eyes Moving",
    question: "How do you Keep Your Eyes Moving?",
    answer: "Move your eyes constantly—look front every 2 seconds and check the rear every 5 to 8 seconds."
  },
  {
    id: 8,
    habit: "Keep Your Eyes Moving",
    question: "What does Keep Your Eyes Moving do?",
    answer: "Keeps you alive at intersections and keeps your eyes ahead of your car."
  },
  {
    id: 9,
    habit: "Keep Your Eyes Moving",
    question: "What is the key phrase for Keep Your Eyes Moving?",
    answer: "Scan – don't stare."
  },
  {
    id: 10,
    habit: "Leave Yourself an Out",
    question: "How do you Leave Yourself an Out?",
    answer: "Have an escape route and take the path of least resistance."
  },
  {
    id: 11,
    habit: "Leave Yourself an Out",
    question: "What does Leave Yourself an Out do?",
    answer: "Maintains space on all four sides, but always in front."
  },
  {
    id: 12,
    habit: "Leave Yourself an Out",
    question: "What is the key phrase for Leave Yourself an Out?",
    answer: "Be prepared. Expect the unexpected."
  },
  {
    id: 13,
    habit: "Make Sure They See You",
    question: "How do you Make Sure They See You?",
    answer: "Communicate in traffic using your horn, lights, and signals, and establish eye-to-eye contact."
  },
  {
    id: 14,
    habit: "Make Sure They See You",
    question: "What does Make Sure They See You do?",
    answer: "Prevents accidents by letting other drivers know your intentions."
  },
  {
    id: 15,
    habit: "Make Sure They See You",
    question: "What is the key phrase for Make Sure They See You?",
    answer: "Don't gamble. Use your horn, lights, and signals."
  }
];



// APP STATE


let currentCardIndex = 0;
let correctCount = 0;
let incorrectCount = 0;



// LOCAL STORAGE


function saveFlashcards() {
  localStorage.setItem(
    "seeingHabitsFlashcards",
    JSON.stringify(flashcards)
  );
}

function loadFlashcards() {
  const savedCards = localStorage.getItem("seeingHabitsFlashcards");

  if (savedCards !== null) {
    flashcards = JSON.parse(savedCards);
  }
}



// DISPLAY CARD


function displayCard() {
  if (flashcards.length === 0) {
    document.getElementById("habit-label").textContent =
      "No Flashcards";

    document.getElementById("question-text").textContent =
      "Add a flashcard below to begin studying.";

    document.getElementById("answer-text").textContent = "";

    document.getElementById("card-progress").textContent =
      "Card 0 of 0";

    return;
  }

  const currentCard = flashcards[currentCardIndex];

  document.getElementById("habit-label").textContent =
    currentCard.habit;

  document.getElementById("question-text").textContent =
    currentCard.question;

  document.getElementById("answer-text").textContent =
    currentCard.answer;

  document.getElementById("card-progress").textContent =
    `Card ${currentCardIndex + 1} of ${flashcards.length}`;

  document.getElementById("score-progress").textContent =
    `Correct: ${correctCount} | Incorrect: ${incorrectCount}`;
}



// SHOW FRONT


function showFront() {
  const flashcard =
    document.getElementById("flashcard");

  flashcard.classList.remove("flipped");
}


// START STUDYING


function startStudying() {
  document.getElementById("instructions-section").style.display =
    "none";

  document.getElementById("study-section").style.display =
    "block";

  showFront();
  displayCard();
}



// FLIP CARD


function flipCard() {
  const flashcard =
    document.getElementById("flashcard");

  flashcard.classList.toggle("flipped");
}



// NEXT CARD


function nextCard() {
  if (flashcards.length === 0) {
    return;
  }

  currentCardIndex++;

  if (currentCardIndex >= flashcards.length) {
    currentCardIndex = 0;
  }

  showFront();
  displayCard();
}



// PREVIOUS CARD


function previousCard() {
  if (flashcards.length === 0) {
    return;
  }

  currentCardIndex--;

  if (currentCardIndex < 0) {
    currentCardIndex = flashcards.length - 1;
  }

  showFront();
  displayCard();
}



// CORRECT / INCORRECT


function markCorrect() {
  correctCount++;
  nextCard();
}

function markIncorrect() {
  incorrectCount++;
  nextCard();
}



// SHUFFLE


function shuffleCards() {
  for (let i = flashcards.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(
      Math.random() * (i + 1)
    );

    const temp = flashcards[i];
    flashcards[i] = flashcards[randomIndex];
    flashcards[randomIndex] = temp;
  }

  currentCardIndex = 0;

  saveFlashcards();
  showFront();
  displayCard();
}



// ADD FLASHCARD


function addFlashcard() {
  const habitInput = document
    .getElementById("habit-input")
    .value.trim();

  const questionInput = document
    .getElementById("question-input")
    .value.trim();

  const answerInput = document
    .getElementById("answer-input")
    .value.trim();

  if (
    habitInput === "" ||
    questionInput === "" ||
    answerInput === ""
  ) {
    alert("Please complete all flashcard fields.");
    return;
  }

  const newCard = {
    id: Date.now(),
    habit: habitInput,
    question: questionInput,
    answer: answerInput
  };

  flashcards.push(newCard);

  saveFlashcards();

  document.getElementById("habit-input").value = "";
  document.getElementById("question-input").value = "";
  document.getElementById("answer-input").value = "";

  renderCardList();
  displayCard();
}



// FLASHCARD MANAGER LIST

function deleteFlashcard(id) {
  const index = flashcards.findIndex(card => card.id === id);

  if (index === -1) {
    return;
  }

  flashcards.splice(index, 1);

  if (currentCardIndex >= flashcards.length) {
    currentCardIndex = 0;
  }

  saveFlashcards();
  renderCardList();
  showFront();
  displayCard();
}


function editFlashcard(id) {
  const card = flashcards.find(card => card.id === id);

  if (!card) {
    return;
  }

  document.getElementById("habit-input").value = card.habit;
  document.getElementById("question-input").value = card.question;
  document.getElementById("answer-input").value = card.answer;

  deleteFlashcard(id);
}

function renderCardList() {
  const cardList = document.getElementById("card-list");

  cardList.innerHTML = "";

  flashcards.forEach(card => {
    const cardItem = document.createElement("div");
    cardItem.classList.add("saved-card");

    const habitTitle = document.createElement("h3");
    habitTitle.textContent = card.habit;

    const questionText = document.createElement("p");
    questionText.textContent =
      `Question: ${card.question}`;

    const answerText = document.createElement("p");
    answerText.textContent =
      `Answer: ${card.answer}`;

    const actions = document.createElement("div");
    actions.classList.add("saved-card-actions");

    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.classList.add("edit-btn");

    editButton.addEventListener("click", function() {
      editFlashcard(card.id);
    });

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("delete-btn");

    deleteButton.addEventListener("click", function() {
      deleteFlashcard(card.id);
    });

    actions.appendChild(editButton);
    actions.appendChild(deleteButton);

    cardItem.appendChild(habitTitle);
    cardItem.appendChild(questionText);
    cardItem.appendChild(answerText);
    cardItem.appendChild(actions);

    cardList.appendChild(cardItem);
  });
}



// EVENT LISTENERS


document
  .getElementById("start-btn")
  .addEventListener("click", startStudying);

document
  .getElementById("flip-btn")
  .addEventListener("click", flipCard);

document
  .getElementById("next-btn")
  .addEventListener("click", nextCard);

document
  .getElementById("prev-btn")
  .addEventListener("click", previousCard);

document
  .getElementById("correct-btn")
  .addEventListener("click", markCorrect);

document
  .getElementById("incorrect-btn")
  .addEventListener("click", markIncorrect);

document
  .getElementById("shuffle-btn")
  .addEventListener("click", shuffleCards);

document
  .getElementById("save-card-btn")
  .addEventListener("click", addFlashcard);



// START APP


loadFlashcards();
renderCardList();