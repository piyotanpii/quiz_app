// クイズのデータ
var quizData = [{
        question: "次のうち、最初のプログラミング言語はどれですか？",
        choices: ["C", "Java", "Python", "Fortran"],
        correctAnswer: 3
    },
    {
        question: "JavaScriptの開発者は誰ですか？",
        choices: ["Brendan Eich", "Bill Gates", "Tim Berners-Lee", "Larry Page"],
        correctAnswer: 0
    },
    {
        question: "CSSはどのような役割を果たしますか？",
        choices: ["プログラミング言語", "スタイルシート言語", "データベース", "マークアップ言語"],
        correctAnswer: 1
    }
];

var currentQuestion = 0;
var score = 0;

var questionElement = document.getElementById("question");
var choicesElement = document.getElementById("choices");
var submitButton = document.getElementById("submit");

// クイズの表示とイベントハンドラの設定
function loadQuiz() {
    var quiz = quizData[currentQuestion];
    questionElement.textContent = quiz.question;

    choicesElement.innerHTML = "";
    // 選択肢を表示する
    for (var i = 0; i < quiz.choices.length; i++) {
        var choice = quiz.choices[i];
        var liElement = document.createElement("li");
        liElement.textContent = choice;
        liElement.setAttribute("data-index", i);
        liElement.addEventListener("click", selectAnswer);
        choicesElement.appendChild(liElement);
    }

    submitButton.disabled = true; // ユーザーが選択するまでボタンを無効化する
}

// 解答の選択
function selectAnswer() {
    // 選択された解答をハイライト表示する
    var selectedChoice = choicesElement.querySelector("li.selected");
    if (selectedChoice) {
        selectedChoice.classList.remove("selected");
    }
    this.classList.add("selected");

    submitButton.disabled = false; // 解答が選択されたらボタンを有効化する
}

// 回答のチェック
function checkAnswer() {
    var selectedChoice = choicesElement.querySelector("li.selected");
    if (selectedChoice) {
        var selectedIndex = selectedChoice.getAttribute("data-index");
        var quiz = quizData[currentQuestion];
        if (selectedIndex == quiz.correctAnswer) {
            score++;
        }
        currentQuestion++;
        if (currentQuestion < quizData.length) {
            loadQuiz();
        } else {
            showResult();
        }
    }
}

// 結果の表示
function showResult() {
    questionElement.textContent = "クイズ終了！";
    choicesElement.innerHTML = "";
    var resultElement = document.createElement("p");
    resultElement.textContent = "正解数: " + score + "/" + quizData.length;
    choicesElement.appendChild(resultElement);

    submitButton.textContent = "最初のページに戻る";
    submitButton.removeEventListener("click", checkAnswer);
    submitButton.addEventListener("click", resetQuiz);
    submitButton.disabled = false;
}

// クイズの読み込み
loadQuiz();

// 回答ボタンのクリックイベントハンドラを設定する
submitButton.addEventListener("click", checkAnswer);

// クイズのリセット
function resetQuiz() {
    currentQuestion = 0;
    score = 0;
    loadQuiz();

    submitButton.textContent = "回答する";
    submitButton.removeEventListener("click", resetQuiz);
    submitButton.addEventListener("click", checkAnswer);
}