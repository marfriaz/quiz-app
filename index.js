//question database
const STORE = [
    {
      question: 'How many corgis are in this photo?',
      image: 'images/test1.jpg',
      alt: 'this is the alt info for the image',
      answers: [
        '5', 
        '9', 
        '8', 
        '10'
      ],
      correctAnswer:
        '9'
    },
    {
        question: 'How many dogs are in this photo??',
        image: 'images/test2.jpg',
        alt: 'this is the alt info for the image',
        answers: [
          '15', 
          '14', 
          '16', 
          'None'
        ],
        correctAnswer:
          '15'
      },
      {
        question: 'How many shibas are in this photo?',
        image: 'images/test3.jpg',
        alt: 'this is the alt info for the image',
        answers: [
          '11', 
          '3', 
          '13', 
          '12'
        ],
        correctAnswer:
          '12'
      },
      {
        question: 'How many servings of guacamole are in this photo?',
        image: 'images/test4.jpg',
        alt: 'this is the alt info for the image',
        answers: [
          'None', 
          '9', 
          '8', 
          '10'
        ],
        correctAnswer:
          '8'
      },
      {
        question: 'How many images have delicious fried chicken?',
        image: 'images/test5.jpg',
        alt: 'this is the alt info for the image',
        answers: [
          '5', 
          '9', 
          '10', 
          '8'
        ],
        correctAnswer:
          '8'
      },
      {
        question: 'How many dogs are in this photo?',
        image: 'images/test6.jpg',
        alt: 'this is the alt info for the image',
        answers: [
          '5', 
          '9', 
          '8', 
          '10'
        ],
        correctAnswer:
          '8'
      },
      {
        question: 'How many blueberry muffins are in this photo?',
        image: 'images/test7.jpg',
        alt: 'this is the alt info for the image',
        answers: [
          '1', 
          '8', 
          '9', 
          '10'
        ],
        correctAnswer:
          '8'
      },
      {
        question: 'How many images are dalmatians in this photo?',
        image: 'images/test8.jpg',
        alt: 'this is the alt info for the image',
        answers: [
          '5', 
          '9', 
          '8', 
          '7'
        ],
        correctAnswer:
          '7'
      },
      {
        question: 'How many kittens are in this photo?',
        image: 'images/test9.jpg',
        alt: 'this is the alt info for the image',
        answers: [
          '5', 
          '9', 
          '8', 
          '7'
        ],
        correctAnswer:
          '8'
      }
    ];

//variables to store the quiz score and question number information
let score = 0;
let questionNumber = 0;



// begins the quiz
function startQuiz() {
    $('.question-page').hide();
    $('.endingPage').hide();
    $('#start-button').on('click', function(event) {
        $('.startingPage').hide();
      //  ('.questionNumber').text(1);
        $('.question-page').show();
        $('#question-number').text(1);
        generateQuestion();
    });
  }

function generateQuestion() {
    $('.question-page').show();
    let answerOptions= "";
    for (let i =0 ; i < STORE[questionNumber].answers.length; i++) {
        answerOptions += `
        <input type="radio" name="answer" id="option${i+1}" value="${STORE[questionNumber].answers[i]}" required>
        <label for="option${i+1}">${STORE[questionNumber].answers[i]}</label>
        `;
    }
    // pushes question and answer options
    $('#questions-container').html(`
    <img class="question-img images" src=${STORE[questionNumber].image} alt=${STORE[questionNumber].alt}>
    <section id="img-and-options">
    <h1 id ="question">${STORE[questionNumber].question}</h1>
    <fieldset class="radios">
        ${answerOptions}
    </fieldset>
    <section class="response"></section>
    <button type="button" class="button" id="submit-button">Submit</button>
    </section>
    `);
}


function submitAnswer() {
    // event delegation
    $('fieldset').on('click', '#submit-button', event => {
        // prevents default form submission behaviour
        event.preventDefault();
        $('.response').show();
        // check dis
        const selectedAnswer = $('input[name=answer]:checked').val();
        const rightAnswer = STORE[questionNumber].correctAnswer;
        if (selectedAnswer === rightAnswer) {
            youAreCorrect();
        } else {
            youAreIncorrect();
        };
        $('#submit-button').hide();
    });
  };


function youAreCorrect() {
    $('.response').html(`
        <h1 id="correct">Correct!</h1>
        <button type="button" class="nextButton button">Next</button>
      `);
      updateScore();
}; 


function youAreIncorrect() {
    $('.response').html(`
        <h1 id="wrong">Wrong! Correct Answer is ${STORE[questionNumber].correctAnswer}</h1>
        <button type="button" class="nextButton button">Next</button>
      `);
}; 


/* Displays question number and score obtained */
function updateQuestionNumber() {
    if (questionNumber + 1 >= STORE.length) {
        questionNumber++;
        $('#question-number').html(STORE.length)
    } else {
    questionNumber++;
    $('#question-number').html(`${questionNumber + 1}`);
    };
}

function updateScore() {
    score++;
    $('#score-number').text(score);
  }



// from response page of last question, click next
function nextQuestion() {
    // event delegation
    $('fieldset').on('click', '.nextButton', event => {        
        if (questionNumber + 1>= STORE.length) {
            $('.question-page').hide();
            $('.endingPage').show();
            $('#question-number').html(`${STORE.length}`);
            endingPage();
        } else {
            updateQuestionNumber();
            generateQuestion();
        }
    });
  };


function endingPage() {
    $('.endingPage').html(`
        <h1>You scored: ${score}/${STORE.length}!!!</h1>
        <img class="home-image images" src="images/header2.jpg" alt="Pug in the shape of a bread loaf">
        <button type="button" class="restart-button button">Take Again</button>
    `)
}

function restartQuiz() {
    $('.endingPage').on('click', '.restart-button', event => { 
        questionNumber = 0;
        score = 0;
        $('#question-number').html('0');
        $('#score-number').html('0');
        $('.startingPage').show();
        $('.endingPage').hide();
      });
    }



//runs the functions
function makeQuiz() {
    startQuiz();
    submitAnswer();
    nextQuestion();
    restartQuiz();
  }
  
 
  $(makeQuiz);
