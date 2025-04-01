// MBTI Questions
export const mbtiQuestions = [
  {
    id: 1,
    question: "社交的な場面では、通常どのように感じますか？",
    options: [
      { value: "e", text: "エネルギーが湧いてくる。会話を楽しむことができる。" },
      { value: "i", text: "疲れることが多い。一人の時間が必要になる。" }
    ],
    category: "ie" // Introversion vs Extraversion
  },
  {
    id: 2,
    question: "通常、情報を処理するときはどちらに近いですか？",
    options: [
      { value: "s", text: "具体的な事実や詳細に注目する" },
      { value: "n", text: "パターンや可能性を探る" }
    ],
    category: "ns" // Intuition vs Sensing
  },
  {
    id: 3,
    question: "決断をする際、あなたは主に何を重視しますか？",
    options: [
      { value: "t", text: "論理と客観的な分析" },
      { value: "f", text: "人への影響と個人的な価値観" }
    ],
    category: "ft" // Feeling vs Thinking
  },
  {
    id: 4,
    question: "計画を立てることについてどう思いますか？",
    options: [
      { value: "j", text: "計画を立て、それに従うことで安心感を得る" },
      { value: "p", text: "状況に応じて柔軟に対応する方が好き" }
    ],
    category: "jp" // Judging vs Perceiving
  },
  {
    id: 5,
    question: "新しいアイデアに出会ったとき、あなたは通常どう反応しますか？",
    options: [
      { value: "s", text: "実用性と現実的な適用方法を重視する" },
      { value: "n", text: "そのアイデアが持つ可能性と未来への影響に興味を持つ" }
    ],
    category: "ns"
  },
  {
    id: 6,
    question: "人との対立が起きた時、あなたはどのように対処しますか？",
    options: [
      { value: "t", text: "論理的に問題を分析し、公平な解決策を見つける" },
      { value: "f", text: "関係性を守ることを優先し、皆が納得できる方法を探す" }
    ],
    category: "ft"
  },
  {
    id: 7,
    question: "あなたの休日の過ごし方は？",
    options: [
      { value: "j", text: "事前に計画を立て、予定通りに過ごす" },
      { value: "p", text: "その日の気分や状況に合わせて過ごす" }
    ],
    category: "jp"
  },
  {
    id: 8,
    question: "エネルギーを回復するのに最適なのは？",
    options: [
      { value: "i", text: "一人で静かに過ごす時間" },
      { value: "e", text: "友人や家族と過ごす社交的な時間" }
    ],
    category: "ie"
  }
];

// Life focus options
export const lifeFocusOptions = [
  { value: "career", label: "キャリア・仕事" },
  { value: "relationship", label: "人間関係・恋愛" },
  { value: "self-improvement", label: "自己成長・学び" },
  { value: "health", label: "健康・ウェルネス" },
  { value: "family", label: "家族・子育て" },
  { value: "financial", label: "経済的安定" },
  { value: "creative", label: "創造的活動" }
];

// Challenge options
export const challengeOptions = [
  { value: "decision-making", label: "重要な決断を下すこと" },
  { value: "stress", label: "ストレス管理" },
  { value: "relationships", label: "人間関係の課題" },
  { value: "work-life", label: "ワークライフバランス" },
  { value: "purpose", label: "目的や方向性の探索" },
  { value: "self-confidence", label: "自信や自己価値" }
];

// Generate years for the dropdown (1940 to current year)
export const years = Array.from(
  { length: new Date().getFullYear() - 1939 },
  (_, i) => new Date().getFullYear() - i
);

// Generate months for the dropdown (1-12)
export const months = Array.from({ length: 12 }, (_, i) => i + 1);

// Function to generate days based on month and year
export const getDaysInMonth = (year: number, month: number) => {
  // Month in JavaScript is 0-indexed
  return new Date(year, month, 0).getDate();
};
