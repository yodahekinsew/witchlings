const getResultsButton = document.getElementById("results-button");
const cardsPage = document.getElementById("cards-page");
const cardsHolder = document.getElementById("cards-holder");
const cards = document.getElementsByClassName("card");

/**
 * Adding CSS for the cards
 * (would be too annoying to do myself)
 */
const numCards = 7;

165 / 1533;

const idleAngleRange = { min: -30, max: 30 };
const hoverAngleRange = { min: -20, max: 20 };
const activeAngleRange = { min: -10, max: 10 };
const idleTranslateXRange = { min: -20, max: 20 };
const activeTranslateXRange = { min: -25, max: 25 };
const idleTranslateYRange = { min: 4.5, max: 10 };
// const idleTranslateYRange = { min: 65, max: 165 };
const hoverTranslateYRange = { min: 2, max: 7.5 };
const activeTranslateYRange = { min: 0, max: 5 };
const lerpRange = (range, interpolant) => {
  return interpolant * (range.max - range.min) + range.min;
};

var showingAllCards = false;
var addedCSS = [];
const addCSS = (s) => {
  let newCSS = document.head.appendChild(document.createElement("style"));
  newCSS.innerHTML = s;
  addedCSS.push(newCSS);
};
const removeAddedCSS = () => {
  addedCSS.forEach((css) => document.head.removeChild(css));
  addedCSS = [];
};
const addExtraCSS = () => {
  for (let i = 0; i < numCards; i++) {
    const childIndex = numCards - i;
    // const childIndex = i + 1;

    const interpolant = i / (numCards - 1);
    const idleAngle = lerpRange(idleAngleRange, interpolant);
    const hoverAngle = lerpRange(hoverAngleRange, interpolant);
    const activeAngle = lerpRange(activeAngleRange, interpolant);
    const idleTranslateX = lerpRange(idleTranslateXRange, interpolant);
    const activeTranslateX = lerpRange(activeTranslateXRange, interpolant);

    const inverseInterpolant = Math.pow(
      Math.abs(i - (numCards - 1) / 2) / ((numCards - 1) / 2),
      2
    );
    const idleTranslateY = lerpRange(idleTranslateYRange, inverseInterpolant);
    const hoverTranslateY = lerpRange(hoverTranslateYRange, inverseInterpolant);
    const activeTranslateY = lerpRange(
      activeTranslateYRange,
      inverseInterpolant
    );
    addCSS(
      `.card:nth-child(${childIndex}) { transition-delay: ${
        0.125 * i
      }s; transform: rotateZ(${5 * Math.random()}deg);}`
    );
    addCSS(
      `.show-card.card:nth-child(${childIndex}) {transition-delay: 0s; transform: translate(${idleTranslateX}vw, ${idleTranslateY}vw) rotateZ(${idleAngle}deg) ;}`
    );
    addCSS(
      `.show-card.card:nth-child(${childIndex}):hover { transition: transform 0.5s ease; transform: translate(${activeTranslateX}vw, ${hoverTranslateY}vw) rotateZ(${hoverAngle}deg) scale(1.15); }`
    );
    addCSS(
      `.show-card.card:nth-child(${childIndex}):active { transform: translate(${idleTranslateX}vw, ${activeTranslateY}vw) rotateZ(${activeAngle}deg) scale(1.25); }`
    );
  }

  const unselectedTranslateLeftXRange = {
    idle: { min: -32.5, max: -17.5 },
    hover: { min: -35, max: -20 },
    active: { min: -32.5, max: -17.5 },
  };
  const unselectedTranslateRightXRange = {
    idle: { min: 17.5, max: 32.5 },
    hover: { min: 20, max: 35 },
    active: { min: 17.5, max: 32.5 },
  };
  const unselectedTranslateYRange = {
    idle: { min: 6.5, max: 13 },
    hover: { min: 3, max: 9.7 },
    active: { min: 0, max: 6.5 },
  };
  // const unselectedTranslateYRange = {
  //   idle: { min: 100, max: 200 },
  //   hover: { min: 50, max: 150 },
  //   active: { min: 0, max: 100 },
  // };
  const unselectedAngleRange = {
    idle: { min: -30, max: 30 },
    hover: { min: -20, max: 20 },
    active: { min: -10, max: 10 },
  };
  const halfCount = (numCards - 1) / 2;
  const halfCountCeil = Math.ceil(halfCount);
  for (let i = 0; i < numCards - 1; i++) {
    const childIndex = numCards - 1 - i;
    // const childIndex = i + 1;
    const translateXRange =
      i < halfCount
        ? unselectedTranslateLeftXRange
        : unselectedTranslateRightXRange;
    const translateXInterpolant =
      i < halfCount
        ? i / (halfCountCeil - 1)
        : (i - halfCountCeil) / (halfCountCeil - 1);
    const unselectedIdleTranslateX = lerpRange(
      translateXRange.idle,
      translateXInterpolant
    );
    const unselectedHoverTranslateX = lerpRange(
      translateXRange.hover,
      translateXInterpolant
    );
    const unselectedActiveTranslateX = lerpRange(
      translateXRange.active,
      translateXInterpolant
    );

    const translateYInterpolant = Math.pow(
      Math.abs(i - (numCards - 2) / 2) / ((numCards - 2) / 2),
      2
    );
    const unselectedIdleTranslateY = lerpRange(
      unselectedTranslateYRange.idle,
      translateYInterpolant
    );
    const unselectedHoverTranslateY = lerpRange(
      unselectedTranslateYRange.hover,
      translateYInterpolant
    );
    const unselectedActiveTranslateY = lerpRange(
      unselectedTranslateYRange.active,
      translateYInterpolant
    );

    const angleInterpolant = i / (numCards - 2);
    const unselectedIdleAngle = lerpRange(
      unselectedAngleRange.idle,
      angleInterpolant
    );
    const unselectedHoverAngle = lerpRange(
      unselectedAngleRange.hover,
      angleInterpolant
    );
    const unselectedActiveAngle = lerpRange(
      unselectedAngleRange.active,
      angleInterpolant
    );
    addCSS(
      `.unselected-${childIndex}.show-card.card {transition-delay: 0s; transform: translate(${unselectedIdleTranslateX}vw, ${unselectedIdleTranslateY}vw)  rotateZ(${unselectedIdleAngle}deg);}`
    );
    addCSS(
      `.unselected-${childIndex}.show-card.card:hover { transform: translate(${unselectedHoverTranslateX}vw, ${unselectedHoverTranslateY}vw) rotateZ(${unselectedHoverAngle}deg) scale(1.15) !important; }`
    );
    addCSS(
      `.unselected-${childIndex}.show-card.card:active {transform: translate(${unselectedActiveTranslateX}vw, ${unselectedActiveTranslateY}vw) rotateZ(${unselectedActiveAngle}deg) scale(1.25); }`
    );
  }
};

function mediaHandler(x) {
  if (x.matches) {
    addExtraCSS();
  } else {
    removeAddedCSS();
  }
}
var checkWidth = window.matchMedia("(min-width: 992px)");
mediaHandler(checkWidth);
checkWidth.addListener(mediaHandler);

/**
 * Once the window loads, add functions to the card elements
 */
var currentSelectedCard;
var mapping = {};
const clearMapping = () => {
  for (let i = 0; i < cards.length; i++) {
    if (mapping.hasOwnProperty(i))
      cards[i].classList.remove(`unselected-${mapping[i]}`);
  }
};
window.addEventListener("load", (event) => {
  // Click anywhere outside of the cards to deselect the current card
  document.getElementById("results-page").onclick = () => {
    if (currentSelectedCard) currentSelectedCard.classList.remove("selected");
    currentSelectedCard = null;
    clearMapping();
  };

  // Add hover and click support for the cards
  for (let i = 0; i < cards.length; i++) {
    cards[i].addEventListener("click", (e) => {
      e.stopPropagation();
      if (currentSelectedCard) {
        currentSelectedCard.classList.remove("selected");
        if (currentSelectedCard == cards[i]) {
          currentSelectedCard = null;
          clearMapping();
          return;
        }
      }
      clearMapping();
      var index = 0;
      for (let j = 0; j < cards.length; j++) {
        if (i != j) {
          cards[j].classList.add(`unselected-${index + 1}`);
          mapping[j] = index + 1;
          index++;
        }
      }
      cards[i].classList.add("selected");
      currentSelectedCard = cards[i];
    });
  }
});

/**
 * Update the cards positions on resize
 */
window.addEventListener("resize", (event) => {
  console.log("resizing --> should update cards");
});

/**
 * Animate the selected card
 */
window.onmousemove = (e) => {
  const mouseX = 2 * (e.clientX / window.innerWidth - 0.5);
  const mouseY = -2 * (e.clientY / window.innerHeight - 0.5);

  // Animate the lighting on the card
  const intensity = Math.sqrt(Math.pow(mouseX, 2) + Math.pow(mouseY, 2)) / 1.5;
  document.documentElement.style.setProperty(
    "--card-lighting",
    `radial-gradient(farthest-corner at ${
      (e.clientX / window.innerWidth) * 150
    }px ${(e.clientY / window.innerHeight) * 250}px, rgba(255, 255, 255, ${
      0.4 - intensity * 0.4
    }) 0%,  rgba(255, 255, 255, ${
      0.4 - intensity * 0.4
    }) 2.5%, rgba(255, 255, 255, ${
      0.3 - intensity * 0.3
    }) 7.5%, rgba(255, 255, 255, 0) ${65 - intensity * 65}%)`
  );

  // Animate the rotation on the card
  document.documentElement.style.setProperty(
    "--card-rotation",
    `rotateX(${(e.clientY / window.innerHeight) * 15}deg) rotateY(${
      -mouseX * 10
    }deg)`
  );
};

/**
 * Handle showing the cards (when user clicks the 'Get Results' button)
 * This function is used by the #get-results button in quiz.js
 */
const showCards = () => {
  // Request an animation frame here so that the cards page
  // has time to display, if it doesn't a transition won't occur
  for (let card of cards) card.classList.remove("hide-card");
  setTimeout(() => {
    for (let card of cards) card.classList.add("show-card");
  }, 1000);
};

const hideCards = () => {
  // Request an animation frame here so that the cards page
  // has time to display, if it doesn't a transition won't occur
  for (let card of cards) card.classList.remove("show-card");
  setTimeout(() => {
    for (let card of cards) card.classList.add("hide-card");
  }, 1000);
};

const enableCards = () => {
  for (let card of cards) card.style.pointerEvents = "unset";
};

const disableCards = () => {
  for (let card of cards) card.style.pointerEvents = "none";
};

const PATH_TO_HOUSES = "./data/houses.json";
const resultsPage = document.getElementById("results-page");
const yourCovenField = document.getElementById("your-coven");
const covenChoiceField = document.getElementById("coven-choice");
const houseDescriptionField = document.getElementById("house-description");
const houseCards = document.getElementById("cards-holder");
const postQuizButtons = document.getElementById("post-quiz-buttons");
const retakeQuizButton = document.getElementById("retake-quiz-button");
const preorderBookButton = document.getElementById("preorder-book-button");
let allHousesInfo;

const setCardsHolderTop = () => {
  // The cards should be place at a minimum of 75px from the "your-coven" field
  // but ideally they should be centered in the remaining portion of the screen if
  // there's more room to move down
  const minimumTop =
    yourCovenField.offsetHeight + (0 * window.innerHeight) / 100;
  const remainingHeight = window.innerHeight - yourCovenField.offsetHeight;
  const idealTop =
    yourCovenField.offsetHeight +
    remainingHeight / 2 -
    cardsHolder.scrollHeight;
  console.log(
    idealTop,
    minimumTop,
    yourCovenField.offsetHeight,
    window.innerHeight,
    cardsHolder.scrollHeight
  );

  // cardsHolder.style.top = `${Math.max(idealTop, minimumTop)}px`;
  cardsHolder.style.top = `${minimumTop}px`;
};

function displayResults(houseResult) {
  const houseInfo = allHousesInfo[houseResult];

  // Change the house name
  covenChoiceField.innerText = houseResult;

  // Fill out the house description
  for (let i = 0; i < houseInfo.description.length; i++) {
    houseDescriptionField.children[i].innerText = houseInfo.description[i];
  }
  for (let i = houseInfo.description.length; i < 3; i++) {
    houseDescriptionField.children[i].innerText = "";
  }

  // Update the house cards (in reverse order)
  houseCards.children[6].firstElementChild.src = houseInfo.crest;
  houseCards.children[5].firstElementChild.src = houseInfo.motto;
  houseCards.children[4].firstElementChild.src = houseInfo.details;
  houseCards.children[3].firstElementChild.src = houseInfo.strength;
  houseCards.children[2].firstElementChild.src = houseInfo.weakness;
  houseCards.children[1].firstElementChild.src = houseInfo.profession;
  houseCards.children[0].firstElementChild.src = houseInfo.fun;

  // RESULTS REVEAL ANIMATION
  // 1 --> fade in results page over quiz page
  resultsPage.style.display = "unset";
  resultsPage.scrollTo(0, 0);
  // yourCovenField.style.transform = "translate(-50%, -50%)";
  yourCovenField.style.top = "50%";
  requestAnimationFrame(() => {
    resultsPage.style.opacity = 1;
  });
  setCardsHolderTop();

  // 2 --> fade in "Your coven is... " loading text
  // Should be done automatically
  const yourCovenTexts =
    yourCovenField.firstElementChild.getElementsByClassName("fade-reveal");
  setTimeout(() => {
    yourCovenTexts[0].style.opacity = 1;
  }, 1000);
  for (let i = 1; i < yourCovenTexts.length; i++) {
    setTimeout(() => {
      yourCovenTexts[i].style.opacity = 1;
    }, 2000 + 125 * i);
  }

  // 3 --> fade in coven choice
  setTimeout(() => {
    covenChoiceField.style.opacity = 1;
  }, 4000);

  // 4 --> fade away "Your coven is..."
  setTimeout(() => {
    for (let i = 0; i < yourCovenTexts.length; i++) {
      yourCovenTexts[i].style.opacity = 0;
    }
  }, 5000);

  // 5 --> move coven name to top of screen
  setTimeout(() => {
    // yourCovenField.style.transform = "translate(-50%, -500%)";
    // yourCovenField.style.transform = "translate(0, 0%)";
    yourCovenField.style.top = "0%";
  }, 5500);

  // 6 --> fade in coven description
  setTimeout(() => {
    houseDescriptionField.style.opacity = 1;
  }, 5500); // 6500

  // 7 --> fade in "learn more about your coven" and the cards
  setTimeout(() => {
    showCards();
    setTimeout(() => {
      enableCards();
    }, 2000);
  }, 7500);

  // 8 --> fade in buttons (take quiz again, share results) and links (to preorder book)
  setTimeout(() => {
    postQuizButtons.style.opacity = 1;
    setTimeout(() => {
      retakeQuizButton.style.pointerEvents = "all";
      preorderBookButton.style.pointerEvents = "all";
    }, 500);
  }, 9500);
}

window.addEventListener("resize", () => {
  setCardsHolderTop();
});

function getResults(selectedHouses) {
  const houseCounts = {};
  selectedHouses.forEach((house) => {
    if (houseCounts[house]) {
      houseCounts[house]++;
    } else {
      houseCounts[house] = 1;
    }
  });

  var houseResult = selectedHouses[0];
  var maxCount = 0;
  for (const house in houseCounts) {
    const count = houseCounts[house];
    if (count > maxCount) {
      houseResult = house;
      maxCount = count;
    }
  }

  //   displayResults("House Hyacinth");
  displayResults(houseResult);
}

/**
 * Getting the house information
 */
window.addEventListener("load", () => {
  fetch(PATH_TO_HOUSES)
    .then((response) => {
      if (!response.ok) {
        throw new Error("HTTP error " + response.status);
      }
      return response.json();
    })
    .then((json) => {
      allHousesInfo = json;
    })
    .catch(function (e) {
      console.log("Error parsing questions JSON: ", e);
      this.dataError = true;
    });
});

/**
 * Setting up the post quiz buttons
 */
retakeQuizButton.onclick = () => {
  disableCards();
  startQuiz(); // scrolls quiz to start

  covenChoiceField.style.opacity = 0;

  houseDescriptionField.style.opacity = 0;

  postQuizButtons.style.opacity = 0;
  retakeQuizButton.style.pointerEvents = "none";
  preorderBookButton.style.pointerEvents = "none";

  hideCards();

  setTimeout(() => {
    resultsPage.style.opacity = 0;
    setTimeout(() => {
      resultsPage.style.display = "none";
    }, 500);
  }, 3000);
};
preorderBookButton.onclick = (event) => {
  if (!event) event = window.event;
  console.log(event);
  if (event.stopPropogation) event.stopPropogation();
  else event.cancelBubble = true;
  console.log(event);
  window.open("https://www.claribelortega.com/witchlings", "_blank");
};

const PATH_TO_QUESTIONS = "./data/questions.json";
const quiz = document.getElementById("quiz");
const takeQuizButton = document.getElementById("take-quiz-button");
const previousQuestionButton = document.getElementById("previous-question");
let houseOrder;
var autoScroll;

takeQuizButton.onclick = () => {
  quiz.style.overflowY = "auto";
  requestAnimationFrame(startQuiz);
};

var currentQuestion = 0;
previousQuestionButton.onclick = () => {
  console.log(quiz.scrollTop, quiz.clientHeight);
  // const currentQuestion = Math.round(quiz.scrollTop / quiz.clientHeight) - 1;
  currentQuestion--;
  // console.log("Which question index are we on?", currentQuestion);
  quiz.scrollTo({
    top: document.getElementById(`question-${currentQuestion}`).offsetTop,
    behavior: "smooth",
  });
};

quiz.addEventListener("scroll", () => {
  if (
    quiz.scrollTop > 1.5 * quiz.clientHeight &&
    quiz.scrollTop < quiz.scrollHeight - 1.5 * quiz.clientHeight
  ) {
    previousQuestionButton.style.pointerEvents = "unset";
    previousQuestionButton.style.opacity = 1;
  } else {
    previousQuestionButton.style.pointerEvents = "none";
    previousQuestionButton.style.opacity = 0;
  }
});

function scrollToPage(index) {}

function generateQuestionsHTML(questions) {
  // Setting up the image question separately
  const imageAnswerFields = document
    .getElementById("question-0")
    .getElementsByClassName("answer");
  for (let i = 0; i < imageAnswerFields.length; i++) {
    let answerField = imageAnswerFields[i];
    answerField.onclick = () => {
      for (let j = 0; j < imageAnswerFields.length; j++) {
        imageAnswerFields[j].classList.remove("selected");
      }
      answerField.classList.add("selected");

      // Go to next question
      currentQuestion = 1;
      clearTimeout(autoScroll);
      const element = document.getElementById(`question-0`);
      autoScroll = setTimeout(() => {
        quiz.scrollTo({
          top: element.offsetHeight + element.offsetTop,
          behavior: "smooth",
        });
      }, 500);
    };
  }

  // Setup the rest of the questions
  const questionTemplate = document.getElementById("question-template");
  questions.forEach((question, questionIndex) => {
    if (question.type == "image") return;
    const questionClone = questionTemplate.content.cloneNode(true);
    questionClone.firstElementChild.id = `question-${questionIndex}`;
    if (question.type == "image")
      questionClone.firstElementChild.classList.add("image-question");
    const questionField = questionClone.firstElementChild.firstElementChild;
    questionField.innerText = question.question;
    const answerFields =
      questionClone.children[0].getElementsByClassName("answer");
    for (let i = 0; i < answerFields.length; i++) {
      let answerField = answerFields[i];
      const text =
        answerField.firstElementChild.firstElementChild.firstElementChild;
      if (question.type == "image") {
        answerField.firstElementChild.firstElementChild.removeChild(text);
        var img = document.createElement("img");
        img.src = question.answers[i].answer;
        img.alt = question.answers[i].alt;
        answerField.firstElementChild.firstElementChild.appendChild(img);
      } else {
        text.innerText = question.answers[i].answer;
      }
      answerField.onclick = () => {
        for (let j = 0; j < answerFields.length; j++) {
          answerFields[j].classList.remove("selected");
        }
        answerField.classList.add("selected");

        // Go to next question
        currentQuestion = questionIndex + 1;
        clearTimeout(autoScroll);
        const element = document.getElementById(`question-${questionIndex}`);
        autoScroll = setTimeout(() => {
          quiz.scrollTo({
            top: element.offsetHeight + element.offsetTop,
            behavior: "smooth",
          });
        }, 500);
      };
    }
    quiz.appendChild(questionClone);
  });
  quiz.appendChild(quiz.firstElementChild);
  requestAnimationFrame(() => {
    document.getElementById("background").style.height = "0px";
    requestAnimationFrame(() => {
      document.getElementById("background").style.height = `${
        document.getElementById("quiz").scrollHeight
      }px`;
    });
  });
}

/**
 * Getting the quiz information
 */
window.addEventListener("load", () => {
  fetch(PATH_TO_QUESTIONS)
    .then((response) => {
      if (!response.ok) {
        throw new Error("HTTP error " + response.status);
      }
      return response.json();
    })
    .then((json) => {
      console.log(json);
      houseOrder = json.houses;
      generateQuestionsHTML(json.questions);
    })
    .catch(function (e) {
      console.log("Error parsing questions JSON: ", e);
      this.dataError = true;
    });
});

/**
 * Handle quiz submission
 */
getResultsButton.onclick = () => {
  // Check if the quiz is filled out, and if it is show the cards
  var filledOut = true;
  let selectedHouses = [];
  const questions = quiz.getElementsByClassName("question");
  for (let i = 0; i < questions.length; i++) {
    const answers = questions[i].getElementsByClassName("answer");
    var hasSelectedAnswer = false;
    // Iterate through answers to see which one was selected
    // (Doing it this way rather than just getting the selected directly,
    // so we can see which index, and subsequently which house, was chosen)
    for (let j = 0; j < answers.length; j++) {
      if (answers[j].classList.contains("selected")) {
        hasSelectedAnswer = true;
        selectedHouses.push(houseOrder[j]);
      }
    }
    // If a question isn't answered, scroll back up to that question
    if (!hasSelectedAnswer) {
      filledOut = false;
      quiz.scrollTo({
        top: document.getElementById(`question-${i}`).offsetTop,
        behavior: "smooth",
      });
      break;
    }
  }

  if (filledOut) getResults(selectedHouses);
};

const startQuiz = () => {
  // Clear selected answers when starting the quiz
  const questions = quiz.getElementsByClassName("question");
  for (let i = 0; i < questions.length; i++) {
    const answers = questions[i].getElementsByClassName("answer");
    for (let j = 0; j < answers.length; j++)
      answers[j].classList.remove("selected");
  }

  quiz.scrollTo({
    top: quiz.clientHeight,
    behavior: "smooth",
  });
};

const loadingCover = document.getElementById("loading-cover");
const loadingIcon = document.getElementById("lottie");

window.addEventListener("load", () => {
  setTimeout(() => (loadingIcon.style.opacity = 0), 1500);
  setTimeout(() => {
    loadingCover.style.opacity = 0;
    setTimeout(() => {
      loadingCover.style.pointerEvents = "none";
    }, 1500);
    setTimeout(() => {
      loadingCover.style.display = "none";
    }, 3000);
  }, 2000);
});

window.addEventListener("resize", () => {
  document.getElementById("background").style.height = "0px";
  requestAnimationFrame(() => {
    document.getElementById("background").style.height = `${
      document.getElementById("quiz").scrollHeight
    }px`;
  });
});
