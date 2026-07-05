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

    // 미션 카드 전용 데코레이션 스타일 제어
    if (card.type === "mission") {
      activeCardEl.classList.add('mission-style');
    } else {
      activeCardEl.classList.remove('mission-style');
    }

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
    
    // 이전에 적용된 애니메이션 클래스 초기화
    activeCardEl.classList.remove('draw-animation');
    
    // 카드를 드로우하고 화면 갱신
    const newCard = gameInstance.drawCard();
    
    // 강제 리플로우(Reflow)를 일으켜 애니메이션이 다시 실행되도록 처리
    void activeCardEl.offsetWidth;
    
    activeCardEl.classList.add('draw-animation');
    renderCurrentCard(newCard);
  }

  cardDeck.addEventListener('click', handleDraw);
  nextBtn.addEventListener('click', handleDraw);
});
