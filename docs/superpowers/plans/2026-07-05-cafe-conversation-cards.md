# 카페 대화 카드 게임 (Have You?) 구현 계획서

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 카페 테이블 배치용 모바일/태블릿 브라우저 최적화 대화 카드 게임 웹 앱 구축.
**Architecture:** 빌드가 필요 없는 순수 HTML, CSS, JavaScript 싱글 페이지 애플리케이션(SPA) 구조. 로컬스토리지를 통한 상태 보존 및 모던 CSS 3D 플립 애니메이션 적용.
**Tech Stack:** HTML5, CSS3 (Vanilla CSS), JavaScript (ES6+), Node.js (동작 로직 유닛 테스트용)

## Global Constraints
- **종속성**: 외부 라이브러리 및 빌드 도구 최소화 (서버 없는 순수 정적 웹 앱).
- **UI 스타일**: 둥글고 귀여운 라운딩 테두리와 Playful & Pastel 디자인 시스템 적용.
- **반응성**: 태블릿 및 스마트폰 화면 비율(가로/세로 대응) 및 터치 영역 최적화.

---

### Task 1: 스캐폴딩 및 핵심 로직 테스트 설정

**Files:**
- Create: `index.html`
- Create: `test.js`

**Interfaces:**
- Produces: 기본 HTML 마크업 구조 및 Node.js 기반의 비즈니스 로직 테스트 실행 환경.

- [ ] **Step 1: 기본 HTML 스켈레톤 작성**

Create `index.html` with:
```html
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <title>Have You? - 대화 카드 게임</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div id="app">
    <!-- 웰컴 화면 -->
    <div id="welcome-screen" class="screen active">
      <h1 class="logo">Have You?<br><span class="subtitle">우리들의 대화 카드</span></h1>
      <div class="deck-illustration">
        <div class="card-deco deco-1"></div>
        <div class="card-deco deco-2"></div>
        <div class="card-deco deco-3"></div>
      </div>
      <button id="start-btn" class="btn primary-btn">시작하기</button>
    </div>

    <!-- 게임 플레이 화면 -->
    <div id="game-screen" class="screen">
      <header class="game-header">
        <button id="home-btn" class="header-btn">🏠</button>
        <span id="card-counter">0번째 대화</span>
        <button id="reset-btn" class="header-btn">🔄</button>
      </header>

      <main class="game-main">
        <div class="deck-container">
          <div id="card-deck" class="card-deck-stack"></div>
        </div>

        <div id="card-wrapper" class="card-wrapper">
          <div id="active-card" class="game-card">
            <div class="card-face card-front">
              <span id="card-category" class="card-badge">MBTI</span>
              <p id="card-text" class="card-content">질문 내용이 여기에 표시됩니다.</p>
            </div>
            <div class="card-face card-back"></div>
          </div>
        </div>

        <button id="next-btn" class="btn secondary-btn hidden">다음 카드 뽑기 ➔</button>
      </main>
    </div>

    <!-- 덱 초기화/리셋 오버레이 알림 -->
    <div id="reset-overlay" class="overlay hidden">
      <div class="overlay-content">
        <span class="overlay-icon">🔄</span>
        <p>모든 카드를 뽑았습니다!<br>카드를 새로 섞는 중...</p>
      </div>
    </div>
  </div>
  <script src="app.js"></script>
</body>
</html>
```

- [ ] **Step 2: 비즈니스 로직 테스트 스크립트 작성**

Create `test.js` containing initial assertions:
```javascript
import assert from 'assert';

console.log("Starting Task 1 logic tests...");

// 테스트할 로직 모형 정의
const mockCards = [
  { id: 1, category: "MBTI", type: "question", content: "질문 1", color: "#FFD1DC" },
  { id: 2, category: "취미", type: "question", content: "질문 2", color: "#D1F2D9" },
  { id: 3, category: "미션", type: "mission", content: "미션 1", color: "#FFE3D1" }
];

function shuffleDeck(deck) {
  const newDeck = [...deck];
  for (let i = newDeck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newDeck[i], newDeck[j]] = [newDeck[j], newDeck[i]];
  }
  return newDeck;
}

// 1. 셔플 수량 테스트
const shuffled = shuffleDeck(mockCards);
assert.strictEqual(shuffled.length, mockCards.length, "셔플 후 카드 개수가 동일해야 합니다.");

console.log("Task 1 tests passed successfully!");
```

- [ ] **Step 3: Node.js 테스트 실행**

Run: `node test.js`
Expected: "Starting Task 1 logic tests...\nTask 1 tests passed successfully!"

- [ ] **Step 4: 변경 사항 커밋**

```bash
git add index.html test.js
git commit -m "feat: setup basic HTML scaffolding and test runner"
```

---

### Task 2: 코어 게임 로직 및 데이터베이스 구현 (JS 로직)

**Files:**
- Create: `app.js`
- Modify: `test.js`

**Interfaces:**
- Consumes: `index.html`에서 정의한 DOM 엘리먼트 ID들.
- Produces: 무작위 카드 선택, 중복 제거, 상태 자동 복구 기능이 있는 `app.js`.

- [ ] **Step 1: 카드 데이터베이스 및 게임 컨트롤러 설계 및 테스트 추가**

Modify `test.js` to add core state machine logic tests:
```javascript
import assert from 'assert';

// (기존 mockCards 및 shuffleDeck 복사 유지 또는 통합)
const mockCards = [
  { id: 1, category: "MBTI", type: "question", content: "질문 1", color: "#FFD1DC" },
  { id: 2, category: "취미", type: "question", content: "질문 2", color: "#D1F2D9" },
  { id: 3, category: "미션", type: "mission", content: "미션 1", color: "#FFE3D1" }
];

function shuffleDeck(deck) {
  const newDeck = [...deck];
  for (let i = newDeck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newDeck[i], newDeck[j]] = [newDeck[j], newDeck[i]];
  }
  return newDeck;
}

class GameState {
  constructor(cards) {
    this.allCards = cards;
    this.remainingDeck = [];
    this.drawnCards = [];
    this.counter = 0;
  }

  initNewGame() {
    this.remainingDeck = shuffleDeck(this.allCards);
    this.drawnCards = [];
    this.counter = 0;
  }

  drawCard() {
    if (this.remainingDeck.length === 0) {
      return null;
    }
    const card = this.remainingDeck.pop();
    this.drawnCards.push(card);
    this.counter++;
    return card;
  }
}

// 2. 게임 상태 머신 테스트
const game = new GameState(mockCards);
game.initNewGame();
assert.strictEqual(game.remainingDeck.length, 3);
assert.strictEqual(game.drawnCards.length, 0);

const c1 = game.drawCard();
assert.ok(c1);
assert.strictEqual(game.remainingDeck.length, 2);
assert.strictEqual(game.drawnCards.length, 1);
assert.strictEqual(game.counter, 1);

game.drawCard();
game.drawCard();
const cNull = game.drawCard();
assert.strictEqual(cNull, null, "덱이 비었을 때 null을 반환해야 합니다.");

console.log("Task 2 tests passed successfully!");
```

- [ ] **Step 2: 로직 테스트 실행**

Run: `node test.js`
Expected: PASS (종료 코드 0)

- [ ] **Step 3: 웹 애플리케이션 실행 파일 `app.js` 작성**

Create `app.js` containing full cards array and browser binding:
```javascript
const cardsDatabase = [
  { id: 1, category: "MBTI", type: "question", content: "서로의 MBTI를 맞춰보세요! 왜 그렇게 생각했는지 이유도 함께 말해주세요.", color: "#FFD1DC" },
  { id: 2, category: "MBTI", type: "question", content: "만약 완전히 다른 성향의 MBTI로 하루 동안 살 수 있다면, 어떤 유형이 되어보고 싶나요?", color: "#FFD1DC" },
  { id: 3, category: "MBTI", type: "question", content: "계획적인 J 성향과 즉흥적인 P 성향, 서로의 성향 차이를 느꼈던 최근 경험은?", color: "#FFD1DC" },
  { id: 4, category: "취미", type: "question", content: "최근에 새로 생긴 관심사나 요즘 시간 가는 줄 모르고 푹 빠져 있는 취미는 무엇인가요?", color: "#D1F2D9" },
  { id: 5, category: "취미", type: "question", content: "돈과 시간이 무한하다면 지금 당장 배워보거나 시작하고 싶은 취미는?", color: "#D1F2D9" },
  { id: 6, category: "취미", type: "question", content: "혼자 보내는 시간과 다른 사람들과 어울려 보내는 시간 중, 요즘 내게 더 필요한 충전 방법은?", color: "#D1F2D9" },
  { id: 7, category: "사는 곳", type: "question", content: "지금 살고 있는 동네에서 가장 소개해주고 싶은 아지트(맛집, 카페, 산책로 등)는 어디인가요?", color: "#FFF5BA" },
  { id: 8, category: "사는 곳", type: "question", content: "내가 언젠가 꿈꾸는 이상적인 나만의 집 인테리어나 살고 싶은 지역은 어디인가요?", color: "#FFF5BA" },
  { id: 9, category: "사는 곳", type: "question", content: "지금 사는 곳에서 가장 마음에 드는 점과 가장 아쉬운 점은 무엇인가요?", color: "#FFF5BA" },
  { id: 10, category: "취향", type: "question", content: "내 인생 최고의 음식 1가지와, 아무리 배고파도 먹기 싫은 최악의 음식은?", color: "#E8D3FC" },
  { id: 11, category: "취향", type: "question", content: "사람 관계에서 가장 호감을 느끼는 태도나 행동과, 반대로 정이 뚝 떨어지는 비호감 행동은?", color: "#E8D3FC" },
  { id: 12, category: "취향", type: "question", content: "내가 가장 좋아하는 계절과 그 계절이 되면 꼭 해야 하는 나만의 루틴은?", color: "#E8D3FC" },
  { id: 13, category: "일/공부", type: "question", content: "지금의 직업이나 전공을 선택하게 된 결정적인 순간이나 계기는 무엇이었나요?", color: "#D3EEFF" },
  { id: 14, category: "일/공부", type: "question", content: "내 능력이 무한하다면, 한 번쯤 꼭 직업으로 삼아보고 싶은 꿈의 영역이 있나요?", color: "#D3EEFF" },
  { id: 15, category: "일/공부", type: "question", content: "일이나 공부를 하면서 가장 큰 성취감이나 뿌듯함을 느꼈던 기억은 언제인가요?", color: "#D3EEFF" },
  { id: 16, category: "미션", type: "mission", content: "🔥 [미션] 상대방의 오늘 코디나 외모 중 가장 마음에 드는 매력 포인트 3가지 칭찬하기!", color: "#FFE3D1" },
  { id: 17, category: "미션", type: "mission", content: "🔥 [미션] 상대방과 눈을 마주치고 5초간 아무 말 없이 웃지 않고 버티기!", color: "#FFE3D1" },
  { id: 18, category: "미션", type: "mission", content: "🔥 [미션] 가벼운 가위바위보를 해서 이긴 사람이 원하는 질문 하나를 상대방에게 직구로 물어보기!", color: "#FFE3D1" },
  { id: 19, category: "미션", type: "mission", content: "🔥 [미션] 이번 턴에는 스마트폰을 뒤집어 놓고 3분 동안 서로의 눈을 보며 대화하기!", color: "#FFE3D1" }
];

function shuffleDeck(deck) {
  const newDeck = [...deck];
  for (let i = newDeck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newDeck[i], newDeck[j]] = [newDeck[j], newDeck[i]];
  }
  return newDeck;
}

class CafeCardGame {
  constructor() {
    this.remainingDeck = [];
    this.drawnCards = [];
    this.counter = 0;
    this.loadState();
  }

  loadState() {
    const saved = localStorage.getItem('haveyou_game_state');
    if (saved) {
      try {
        const state = JSON.parse(saved);
        this.remainingDeck = state.remainingDeck;
        this.drawnCards = state.drawnCards;
        this.counter = state.counter;
        return;
      } catch (e) {
        console.error("State recovery failed, resetting game.", e);
      }
    }
    this.resetGame();
  }

  saveState() {
    const state = {
      remainingDeck: this.remainingDeck,
      drawnCards: this.drawnCards,
      counter: this.counter
    };
    localStorage.setItem('haveyou_game_state', JSON.stringify(state));
  }

  resetGame() {
    this.remainingDeck = shuffleDeck(cardsDatabase);
    this.drawnCards = [];
    this.counter = 0;
    this.saveState();
  }

  drawCard() {
    if (this.remainingDeck.length === 0) {
      return null;
    }
    const card = this.remainingDeck.pop();
    this.drawnCards.push(card);
    this.counter++;
    this.saveState();
    return card;
  }
}

// DOM 바인딩 및 초기화
document.addEventListener('DOMContentLoaded', () => {
  const gameInstance = new CafeCardGame();

  const welcomeScreen = document.getElementById('welcome-screen');
  const gameScreen = document.getElementById('game-screen');
  const startBtn = document.getElementById('start-btn');
  const homeBtn = document.getElementById('home-btn');
  const resetBtn = document.getElementById('reset-btn');
  const nextBtn = document.getElementById('next-btn');
  const cardCounter = document.getElementById('card-counter');
  const cardDeck = document.getElementById('card-deck');
  const cardWrapper = document.getElementById('card-wrapper');
  const cardCategory = document.getElementById('card-category');
  const cardText = document.getElementById('card-text');
  const activeCardEl = document.getElementById('active-card');
  const resetOverlay = document.getElementById('reset-overlay');

  function renderCurrentCard(card) {
    if (!card) {
      // 덱이 모두 고갈되었을 때 리셋 알림
      resetOverlay.classList.remove('hidden');
      setTimeout(() => {
        gameInstance.resetGame();
        resetOverlay.classList.add('hidden');
        cardWrapper.classList.remove('visible');
        nextBtn.classList.add('hidden');
        cardDeck.classList.remove('hidden');
        cardCounter.textContent = `0번째 대화`;
      }, 1800);
      return;
    }

    cardCategory.textContent = card.category;
    cardText.textContent = card.content;
    activeCardEl.style.backgroundColor = card.color;
    cardCounter.textContent = `${gameInstance.counter}번째 대화`;

    cardWrapper.classList.add('visible');
    nextBtn.classList.remove('hidden');
  }

  startBtn.addEventListener('click', () => {
    welcomeScreen.classList.remove('active');
    gameScreen.classList.add('active');
    // 복구된 상태가 있으면 렌더링
    if (gameInstance.drawnCards.length > 0) {
      renderCurrentCard(gameInstance.drawnCards[gameInstance.drawnCards.length - 1]);
      cardDeck.classList.add('hidden');
    }
  });

  homeBtn.addEventListener('click', () => {
    gameScreen.classList.remove('active');
    welcomeScreen.classList.add('active');
  });

  resetBtn.addEventListener('click', () => {
    if (confirm("게임을 처음부터 다시 시작하시겠습니까?")) {
      gameInstance.resetGame();
      cardWrapper.classList.remove('visible');
      nextBtn.classList.add('hidden');
      cardDeck.classList.remove('hidden');
      cardCounter.textContent = `0번째 대화`;
    }
  });

  function handleDraw() {
    cardDeck.classList.add('hidden');
    const newCard = gameInstance.drawCard();
    renderCurrentCard(newCard);
  }

  cardDeck.addEventListener('click', handleDraw);
  nextBtn.addEventListener('click', handleDraw);
});
```

- [ ] **Step 4: 변경 사항 커밋**

```bash
git add app.js test.js
git commit -m "feat: implement game logic core and localStorage persistence"
```

---

### Task 3: 파스텔톤 테마 스타일링 및 애니메이션 적용

**Files:**
- Create: `style.css`

- [ ] **Step 1: CSS 파일 작성**

Create `style.css` with Google Fonts, layout grids, and interactive transitions:
```css
@import url('https://fonts.googleapis.com/css2?family=Gowun+Dodum&display=swap');

:root {
  --bg-primary: #FFF9F2;
  --text-main: #4A3E3D;
  --text-muted: #8C7A78;
  --btn-primary: #FFB5A7;
  --btn-secondary: #FCD5CE;
  --shadow-color: rgba(140, 122, 120, 0.15);
  --border-radius-lg: 24px;
  --border-radius-sm: 12px;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  -webkit-tap-highlight-color: transparent;
}

body {
  font-family: 'Gowun Dodum', sans-serif;
  background-color: var(--bg-primary);
  color: var(--text-main);
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

#app {
  width: 100%;
  max-width: 500px;
  height: 100%;
  position: relative;
  box-shadow: 0 10px 30px var(--shadow-color);
  background-color: var(--bg-primary);
}

.screen {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: none;
  flex-direction: column;
  padding: 30px 20px;
  opacity: 0;
  transition: opacity 0.4s ease;
}

.screen.active {
  display: flex;
  opacity: 1;
}

/* 웰컴 화면 스타일 */
#welcome-screen {
  justify-content: space-around;
  align-items: center;
  background: linear-gradient(135deg, #FFF9F2 0%, #FFE5EC 100%);
  text-align: center;
}

.logo {
  font-size: 2.8rem;
  font-weight: 700;
  color: #FF7B90;
  line-height: 1.2;
}

.subtitle {
  font-size: 1.1rem;
  color: var(--text-muted);
  font-weight: 400;
}

.deck-illustration {
  position: relative;
  width: 160px;
  height: 200px;
  margin: 40px auto;
  animation: floatDeck 3s ease-in-out infinite;
}

.card-deco {
  position: absolute;
  width: 130px;
  height: 180px;
  border-radius: var(--border-radius-lg);
  border: 4px solid #FFF;
  box-shadow: 0 8px 16px var(--shadow-color);
}

.deco-1 {
  background-color: #FFD1DC;
  transform: rotate(-10deg);
  z-index: 1;
}

.deco-2 {
  background-color: #D1F2D9;
  transform: rotate(5deg);
  left: 15px;
  z-index: 2;
}

.deco-3 {
  background-color: #FFF5BA;
  transform: rotate(0deg);
  left: 30px;
  z-index: 3;
}

@keyframes floatDeck {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-12px); }
}

.btn {
  font-family: inherit;
  font-size: 1.2rem;
  font-weight: 600;
  padding: 16px 40px;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  box-shadow: 0 6px 12px var(--shadow-color);
  transition: transform 0.1s ease, box-shadow 0.2s ease;
}

.btn:active {
  transform: scale(0.96);
  box-shadow: 0 3px 6px var(--shadow-color);
}

.primary-btn {
  background-color: var(--btn-primary);
  color: #FFF;
}

.secondary-btn {
  background-color: var(--btn-secondary);
  color: var(--text-main);
  margin-top: 20px;
  align-self: center;
}

.hidden {
  display: none !important;
}

/* 게임 메인 화면 스타일 */
.game-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.header-btn {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 8px;
  border-radius: 50%;
  transition: background-color 0.2s;
}

.header-btn:active {
  background-color: rgba(0, 0, 0, 0.05);
}

#card-counter {
  font-weight: 600;
  color: var(--text-muted);
}

.game-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.deck-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
}

.card-deck-stack {
  width: 220px;
  height: 310px;
  border-radius: var(--border-radius-lg);
  background: repeating-linear-gradient(
    45deg,
    #FCD5CE,
    #FCD5CE 10px,
    #FFF 10px,
    #FFF 20px
  );
  border: 6px solid #FFF;
  box-shadow: 0 12px 24px var(--shadow-color);
  cursor: pointer;
  position: relative;
}

.card-deck-stack::before {
  content: "탭하여 카드 뽑기";
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  background-color: rgba(255, 255, 255, 0.9);
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
  white-space: nowrap;
}

/* 액티브 카드 뷰 */
.card-wrapper {
  perspective: 1000px;
  width: 100%;
  max-width: 320px;
  height: 420px;
  margin: 0 auto;
  display: none;
}

.card-wrapper.visible {
  display: block;
}

.game-card {
  width: 100%;
  height: 100%;
  border-radius: var(--border-radius-lg);
  border: 8px solid #FFF;
  box-shadow: 0 15px 30px var(--shadow-color);
  position: relative;
  transform-style: preserve-3d;
  transition: transform 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.card-face {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  border-radius: calc(var(--border-radius-lg) - 8px);
  padding: 30px 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.card-front {
  justify-content: space-between;
}

.card-badge {
  background-color: rgba(255, 255, 255, 0.6);
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 600;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
}

.card-content {
  font-size: 1.35rem;
  font-weight: 600;
  line-height: 1.6;
  text-align: center;
  word-break: keep-all;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.card-back {
  background: repeating-linear-gradient(
    -45deg,
    #FCD5CE,
    #FCD5CE 10px,
    #FFF 10px,
    #FFF 20px
  );
  transform: rotateY(180deg);
}

/* 오버레이 알림 */
.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 249, 242, 0.95);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
}

.overlay-content {
  text-align: center;
}

.overlay-icon {
  font-size: 3rem;
  display: inline-block;
  animation: rotateSpin 1.5s linear infinite;
  margin-bottom: 20px;
}

@keyframes rotateSpin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.overlay p {
  font-size: 1.2rem;
  font-weight: 600;
  line-height: 1.5;
}
```

- [ ] **Step 2: 파일 생성 커밋**

```bash
git add style.css
git commit -m "feat: design playful & pastel theme CSS and layouts"
```

---

### Task 4: 카드 플립 애니메이션 및 터치 동작 고도화

**Files:**
- Modify: `app.js`
- Modify: `style.css`

- [ ] **Step 1: CSS에 3D Flip 및 슬라이드 연출 보강**

Modify `style.css` to add the flipped state transition details:
```css
/* style.css 파일 끝부분에 추가 */
.game-card.flipped {
  transform: rotateY(180deg);
}

.game-card.draw-animation {
  animation: cardDraw 0.6s cubic-bezier(0.25, 0.8, 0.25, 1) forwards;
}

@keyframes cardDraw {
  0% {
    transform: translateY(150px) scale(0.3) rotate(-15deg);
    opacity: 0;
  }
  100% {
    transform: translateY(0) scale(1) rotate(0deg);
    opacity: 1;
  }
}
```

- [ ] **Step 2: `app.js` 드로우 애니메이션 제어 연동**

Modify `app.js` to clear and re-trigger draw animations:
```javascript
// app.js의 handleDraw 함수 변경 및 연동
  function handleDraw() {
    cardDeck.classList.add('hidden');
    
    // 이전에 적용된 애니메이션 클래스 초기화
    activeCardEl.classList.remove('draw-animation');
    
    // 카드를 드로우하고 화면 갱신
    const newCard = gameInstance.drawCard();
    
    // 강제 리플로우(Reflow)를 일으켜 애니메이션이 다시 실행되도록 처리
    void activeCardEl.offsetWidth;
    
    activeCardEl.classList.add('draw-animation');
    renderCurrentCard(newCard);
  }
```

- [ ] **Step 3: 변경 사항 커밋**

```bash
git add style.css app.js
git commit -m "feat: add 3D draw and card slide animations"
```

---

### Task 5: 스페셜 미션 카드 전용 스타일 보완 및 최종 검증

**Files:**
- Modify: `style.css`
- Modify: `app.js`

- [ ] **Step 1: 미션 카드 디자인 클래스 추가**

Modify `style.css` to define special mission border highlights and badges:
```css
/* 미션 카드를 위한 특별 디자인 정의 */
.game-card.mission-style {
  border: 8px solid #FFE3D1;
  box-shadow: 0 15px 35px rgba(255, 181, 167, 0.4);
}

.game-card.mission-style .card-badge {
  background: linear-gradient(135deg, #FFB5A7 0%, #FF85A2 100%);
  color: #FFF;
  animation: shineBadge 2s linear infinite;
}

@keyframes shineBadge {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.08); }
}
```

- [ ] **Step 2: `app.js` 미션 타입에 따른 클래스 추가 연동**

Modify `app.js` inside `renderCurrentCard`:
```javascript
  function renderCurrentCard(card) {
    if (!card) {
      resetOverlay.classList.remove('hidden');
      setTimeout(() => {
        gameInstance.resetGame();
        resetOverlay.classList.add('hidden');
        cardWrapper.classList.remove('visible');
        nextBtn.classList.add('hidden');
        cardDeck.classList.remove('hidden');
        cardCounter.textContent = `0번째 대화`;
      }, 1800);
      return;
    }

    cardCategory.textContent = card.category;
    cardText.textContent = card.content;
    activeCardEl.style.backgroundColor = card.color;
    cardCounter.textContent = `${gameInstance.counter}번째 대화`;

    // 미션 카드 전용 데코레이션 스타일 제어
    if (card.type === "mission") {
      activeCardEl.classList.add('mission-style');
    } else {
      activeCardEl.classList.remove('mission-style');
    }

    cardWrapper.classList.add('visible');
    nextBtn.classList.remove('hidden');
  }
```

- [ ] **Step 3: 최종 검증 테스트 실행**

Run: `node test.js`
Expected: PASS (게임 로직 단언 통과)

- [ ] **Step 4: 수동 브라우저 테스트 준비 및 변경 사항 커밋**

```bash
git add style.css app.js
git commit -m "feat: complete special mission cards UI styling and logic integration"
```

---

## Verification Plan

### Automated Tests
- `node test.js` 명령어 실행을 통해 덱 생성, 셔플링, 중복 차단 상태 머신 상태가 완전히 보존되고 동작하는지 검증합니다.

### Manual Verification
- `npm install --global http-server` 혹은 유사한 간이 웹 서버 툴을 기동하여 로컬 모바일/태블릿 가상 브라우저(Chrome DevTools Device Mode)에서 다음을 수동 검증합니다:
  - 1. 시작하기 버튼을 터치하여 정상적으로 카드 덱 화면으로 이동하는가.
  - 2. 카드 덱을 터치했을 때 카드가 회전 애니메이션과 함께 이쁘게 튀어나오는가.
  - 3. 카테고리별(MBTI, 취미, 사는 곳 등) 파스텔 배경색이 잘 표시되는가.
  - 4. 미션 카드가 나왔을 때 붉은빛 계열 그라데이션 배지와 특별 쉐도우가 생기는가.
  - 5. 카드를 새로고침해도 현재 카드 및 카운터 상태(예: "4번째 대화")가 유지되는가.
  - 6. 카드 19개를 다 뽑으면 리셋 팝업이 노출되며 자동으로 처음부터 무작위로 다시 섞이는가.
