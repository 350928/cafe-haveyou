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
