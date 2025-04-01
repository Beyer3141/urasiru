import { SeiMeiResult } from "../../client/src/lib/types";

// 姓名判断の画数マッピング（簡易版）
const kanjiStrokesMap: Record<string, number> = {
  // 基本的な漢字の画数（実際のアプリケーションではより広範なマッピングが必要）
  '一': 1, '二': 2, '三': 3, '四': 4, '五': 5, '六': 6, '七': 7, '八': 8, '九': 9, '十': 10,
  '百': 6, '千': 3, '万': 3, '木': 4, '林': 8, '森': 12, '田': 5, '山': 3, '川': 3, '河': 8,
  '水': 4, '火': 4, '土': 3, '金': 8, '石': 5, '日': 4, '月': 4, '明': 8, '光': 6, '空': 8,
  '雲': 12, '雨': 8, '電': 13, '風': 9, '天': 4, '地': 6, '海': 9, '大': 3, '中': 4, '小': 3,
  '生': 5, '花': 7, '草': 9, '竹': 6, '年': 6, '子': 3, '父': 4, '母': 5, '男': 7, '女': 3,
  '人': 2, '心': 4, '手': 4, '足': 7, '目': 5, '耳': 6, '口': 3, '音': 9, '力': 2, '上': 3,
  '下': 3, '左': 5, '右': 5, '前': 9, '後': 9, '東': 8, '西': 6, '南': 9, '北': 5, '高': 10,
  '安': 6, '新': 13, '古': 5, '長': 8, '愛': 13, '美': 9, '佐': 7, '藤': 18, '加': 5, '鈴': 13,
  '村': 7, '岡': 8, '島': 10, '松': 8, '織': 18, '原': 10,
  '太': 4, '郎': 10, '次': 6, '介': 9, '菜': 11, '香': 9, '智': 12,
  '恵': 10, '里': 7, '奈': 8, '春': 9, '夏': 10, '秋': 9, '冬': 7
};

/**
 * 漢字の画数を取得する関数
 * 登録されていない漢字の場合はデフォルト値を返す
 */
function getKanjiStrokes(kanji: string): number {
  if (kanji in kanjiStrokesMap) {
    return kanjiStrokesMap[kanji];
  }
  // 登録されていない漢字の場合、平均的な値を返す
  return 7;
}

/**
 * 文字列の総画数を計算する関数
 */
function calculateTotalStrokes(name: string): number {
  let total = 0;
  for (let i = 0; i < name.length; i++) {
    const char = name.charAt(i);
    // 漢字、ひらがな、カタカナのみ計算（空白などは無視）
    if (/[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF]/.test(char)) {
      total += getKanjiStrokes(char);
    }
  }
  return total;
}

/**
 * 画数から運勢を計算（簡易版）
 */
function getLuck(total: number): string {
  // 1〜81の数値を良い（3）、まあまあ（2）、要注意（1）の3段階で評価
  const remainder = total % 10;
  
  if ([1, 3, 5, 7, 9].includes(remainder)) {
    return "大吉: あなたの名前の画数は非常に良い運勢を示しています。創造性、リーダーシップ、成功への道が開かれています。";
  } else if ([2, 6, 8].includes(remainder)) {
    return "中吉: あなたの名前の画数は安定した運勢を示しています。堅実さと調和がもたらされますが、時に柔軟性が必要です。";
  } else {
    return "小吉: あなたの名前の画数は慎重さを要する運勢を示しています。チャレンジを乗り越えることで大きな成長が期待できます。";
  }
}

/**
 * 画数から特性を取得（簡易版）
 */
function getCharacteristics(total: number): string[] {
  const characteristics: string[] = [];
  
  // 天格（姓の画数）に基づく特性
  if (total % 3 === 0) {
    characteristics.push("直観力が鋭く、物事の本質を見抜く力がある");
  } else if (total % 3 === 1) {
    characteristics.push("コミュニケーション能力が高く、人間関係を円滑に築ける");
  } else {
    characteristics.push("忍耐強く、困難にも粘り強く取り組める");
  }
  
  // 地格（名の画数）に基づく特性
  if (total % 5 === 0) {
    characteristics.push("社交性があり、様々な場面で適応力を発揮する");
  } else if (total % 5 === 1) {
    characteristics.push("誠実で信頼される人柄を持っている");
  } else if (total % 5 === 2) {
    characteristics.push("創造性豊かで、独自の視点を持っている");
  } else if (total % 5 === 3) {
    characteristics.push("分析力に優れ、論理的な思考ができる");
  } else {
    characteristics.push("感受性が豊かで、人の気持ちを理解するのが上手");
  }
  
  // 人格（姓名の中心的な画数）に基づく特性
  if (total % 7 === 0) {
    characteristics.push("リーダーシップがあり、周囲を導く力を持っている");
  } else if (total % 7 === 1 || total % 7 === 6) {
    characteristics.push("協調性があり、チームの中で調和を生み出せる");
  } else if (total % 7 === 2 || total % 7 === 5) {
    characteristics.push("独立心が強く、自分のペースで物事を進める");
  } else {
    characteristics.push("細部に気を配る几帳面さがあり、丁寧な仕事ができる");
  }
  
  return characteristics;
}

/**
 * 姓名判断の結果に基づくアドバイス
 */
function getAdvice(total: number): string {
  const remainder = total % 8;
  
  switch (remainder) {
    case 0:
      return "安定を大切にしながらも、新しい挑戦を恐れないことで、より大きな成長が期待できます。";
    case 1:
      return "あなたのリーダーシップを活かし、周囲の人々と共に目標に向かって進むことで、より大きな成功を収めることができるでしょう。";
    case 2:
      return "柔軟性と適応力を大切にしながら、自分の価値観を明確にすることで、より充実した人生を歩むことができるでしょう。";
    case 3:
      return "創造性を発揮できる場を積極的に求め、自分らしい表現方法を見つけることで、より充実した毎日を過ごせるでしょう。";
    case 4:
      return "計画性と実行力のバランスを大切にし、着実に目標に向かって進むことで、確かな成果を上げることができるでしょう。";
    case 5:
      return "好奇心と探究心を大切にしながら、一つのことに深く取り組む姿勢を持つことで、専門性を高めることができるでしょう。";
    case 6:
      return "人との繋がりを大切にしながらも、自分自身の時間とエネルギーを適切に管理することで、より充実した関係性を築けるでしょう。";
    case 7:
      return "直観と論理のバランスを取りながら、自分の内なる声に耳を傾けることで、より自分らしい選択ができるようになるでしょう。";
  }
  
  return "自分の強みを活かしながら、バランスの取れた生活を心がけることで、より充実した人生を歩むことができるでしょう。";
}

/**
 * 姓名判断の計算を行う関数
 */
export function calculateSeiMei(lastName: string, firstName: string): SeiMeiResult {
  // 姓と名の画数を計算
  const lastNameTotal = calculateTotalStrokes(lastName);
  const firstNameTotal = calculateTotalStrokes(firstName);
  const nameTotal = lastNameTotal + firstNameTotal;
  
  // 天格、地格、人格の計算
  const heavenNumber = lastNameTotal;
  const earthNumber = firstNameTotal;
  // 人格は姓の最後の文字と名の最初の文字の画数の合計
  const lastChar = lastName.charAt(lastName.length - 1);
  const firstChar = firstName.charAt(0);
  const humanNumber = getKanjiStrokes(lastChar) + getKanjiStrokes(firstChar);
  
  // 特性、運勢、アドバイスを取得
  const characteristics = getCharacteristics(nameTotal);
  const goodLuck = getLuck(nameTotal);
  const advice = getAdvice(nameTotal);
  
  return {
    nameTotal,
    firstNameTotal,
    lastNameTotal,
    heavenNumber,
    earthNumber,
    humanNumber,
    characteristics,
    goodLuck,
    advice
  };
}