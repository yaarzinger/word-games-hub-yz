document.addEventListener("DOMContentLoaded", () => {
  const board = document.getElementById("board");
  const keyboard = document.getElementById("keyboard");

  const ROWS = 6;
  const COLS = 5;
  let currentRow = 0;
  let currentCol = 0;
  let gameOver = false;

  // מילים מובנות מראש
  const wordList = [
  "אבנים", "אגורה", "אגרוף", "אדירה", "אורחת",
  "אזמרה", "אחותי", "אחרות", "אימון", "אישית",
  "אלבון", "אלהים", "אלפית", "אמונה", "אמיתי",
  "אנושי", "אסירה", "אספלט", "אפודה", "אפילו",
  "ארוכה", "ארוחה", "ארמון", "אשכול", "בגדול",
  "בדיחה", "בהמות", "בחירה", "בטחון", "בלילה",
  "בסיסי", "בעיני", "בקבוק", "ברשות", "גדרות",
  "גזירה", "גיבור", "גלידה", "גמדים", "געגוע",
  "גרשות", "דגלים", "דיבור", "דמעות", "הגרלה",
  "הגיון", "הגשמה", "הדהים", "הדרכה", "הובלה",
  "הודעה", "הוצאה", "החיים", "הכניס", "הלבשה"
];


  const targetWord = wordList[Math.floor(Math.random() * wordList.length)];
  console.log("🔐 מילה סודית:", targetWord);

  function createBoard() {
    for (let r = 0; r < ROWS; r++) {
      const row = document.createElement("div");
      row.className = "row";
      for (let c = 0; c < COLS; c++) {
        const tile = document.createElement("div");
        tile.className = "tile";
        tile.id = `tile-${r}-${c}`;
        row.appendChild(tile);
      }
      board.appendChild(row);
    }
  }

  function createKeyboard() {
    const hebrewLetters = [
      "א", "ב", "ג", "ד", "ה", "ו", "ז", "ח",
      "ט", "י", "כ", "ל", "מ", "נ", "ס", "ע",
      "פ", "צ", "ק", "ר", "ש", "ת", "ף", "ץ", "ם", "ן"
    ];

    hebrewLetters.forEach(letter => {
      const key = document.createElement("button");
      key.className = "key";
      key.textContent = letter;
      key.onclick = () => handleKey(letter);
      keyboard.appendChild(key);
    });

    const del = document.createElement("button");
    del.className = "key";
    del.textContent = "⌫";
    del.onclick = deleteLetter;
    keyboard.appendChild(del);

    const enter = document.createElement("button");
    enter.className = "key";
    enter.textContent = "⏎";
    enter.onclick = submitGuess;
    keyboard.appendChild(enter);
  }

  function handleKey(letter) {
    if (gameOver) return;
    if (currentCol < COLS) {
      const tile = document.getElementById(`tile-${currentRow}-${currentCol}`);
      tile.textContent = letter;
      currentCol++;
    }
  }

  function deleteLetter() {
    if (gameOver) return;
    if (currentCol > 0) {
      currentCol--;
      const tile = document.getElementById(`tile-${currentRow}-${currentCol}`);
      tile.textContent = "";
    }
  }

  function submitGuess() {
    if (gameOver) return;
    if (currentCol < COLS) return;

    let guess = "";
    for (let c = 0; c < COLS; c++) {
      guess += document.getElementById(`tile-${currentRow}-${c}`).textContent;
    }

    if (!wordList.includes(guess)) {
      alert("המילה לא קיימת במאגר!");
      return;
    }

    const guessArr = guess.split("");
    const targetArr = targetWord.split("");
    const colors = Array(COLS).fill("#787c7e");
    const used = Array(COLS).fill(false);

    for (let i = 0; i < COLS; i++) {
      if (guessArr[i] === targetArr[i]) {
        colors[i] = "#6aaa64";
        used[i] = true;
      }
    }

    for (let i = 0; i < COLS; i++) {
      if (colors[i] !== "#6aaa64") {
        for (let j = 0; j < COLS; j++) {
          if (!used[j] && guessArr[i] === targetArr[j]) {
            colors[i] = "#c9b458";
            used[j] = true;
            break;
          }
        }
      }
    }

    for (let i = 0; i < COLS; i++) {
      const tile = document.getElementById(`tile-${currentRow}-${i}`);
      tile.style.backgroundColor = colors[i];
      tile.style.color = "white";
      tile.style.border = "none";
    }

    if (guess === targetWord) {
      gameOver = true;
      setTimeout(() => {
      alert("🎉 ניצחת!");
      }, 300);
      return;
    }

    currentRow++;
    currentCol = 0;

    if (currentRow === ROWS) {
      gameOver = true;
      setTimeout(() => {
        alert(`😢 לא הצלחת. המילה הייתה: ${targetWord}`);
      }, 300);
    }
  }

  // הפעלה
  createBoard();
  createKeyboard();
});
