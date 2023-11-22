$(document).ready(function () {
    let words = {
        easy: [
            { term: "planet", translation: "планета" },
            { term: "family", translation: "родина" },
        ],
        medium: [
            { term: "processor", translation: "процесор" },
            { term: "monitor", translation: "монітор" },
			{ term: "casino", translation: "казино" },
        ],
        hard: [
            { term: "house", translation: "дім" },
            { term: "car", translation: "машина" },
            { term: "university", translation: "університет" },
            { term: "telephone", translation: "телефон" },
            { term: "world", translation: "світ" },
        ],
    };
    let currentIndex = 0;
    let correctCount = 0;
    let incorrectCount = 0;
    let isTranslationVisible = false;
    let currentWords = [];

    function showNextWord() {
        if (currentIndex < currentWords.length) {
            $("#box").text(currentWords[currentIndex].term);
            $("#userInput").val("");
			$("#step").text(currentIndex + 1 + " of " + currentWords.length);
        } else {
            showResultModal();
        }
    }

    function showResultModal() {
        let accuracy = (correctCount / currentWords.length) * 100;
        let message = `Your accuracy is ${accuracy.toFixed(2)}%.`;

        setTimeout(function () {
            alert(message);
            currentIndex = 0;
            correctCount = 0;
            incorrectCount = 0;
            $("#correctCount").text(correctCount);
            $("#incorrectCount").text(incorrectCount);
            $("#step").text(currentIndex + 1);
            showNextWord();
        },100); 
    }

    $("#box").on("click", function () {
        if (isTranslationVisible) {
            $("#box").text(currentWords[currentIndex].term);
            isTranslationVisible = false;
        } else {
            $("#box").text(currentWords[currentIndex].translation);
            isTranslationVisible = true;
        }
    });

    $("#userInput").on("keyup", function (event) {
        if (event.keyCode === 13) {
            let userTranslation = $("#userInput").val().trim().toLowerCase();
            let correctTranslation = currentWords[currentIndex].translation.toLowerCase();

            if (userTranslation === correctTranslation) {
                correctCount++;
            } else {
                incorrectCount++;
            }
            $("#correctCount").text(correctCount);
            $("#incorrectCount").text(incorrectCount);
            currentIndex++;
            showNextWord();
        }
    });

    $("#difficulty").on("change", function () {
        let difficulty = $(this).val();
        currentWords = words[difficulty];
        currentWords.sort(() => Math.random() - 0.5);
        currentIndex = 0;
        correctCount = 0;
        incorrectCount = 0;
        $("#correctCount").text(correctCount);
        $("#incorrectCount").text(incorrectCount);
        $("#step").text(currentIndex + 1 + " of " + currentWords.length); 
        showNextWord();
    });

    $("#difficulty").val("easy").trigger("change");
});