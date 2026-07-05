import assert from 'assert';

console.log("Starting Task 2 logic tests...");

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
