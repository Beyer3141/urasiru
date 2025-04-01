import { FourPillarsResult } from "../../client/src/lib/types";

// 天干（10種類）
const HEAVENLY_STEMS = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];
// 地支（12種類）
const EARTHLY_BRANCHES = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];
// 五行
const FIVE_ELEMENTS = ['木', '火', '土', '金', '水'];
// 天干と五行の対応
const STEM_TO_ELEMENT = {
  '甲': '木', '乙': '木',
  '丙': '火', '丁': '火',
  '戊': '土', '己': '土',
  '庚': '金', '辛': '金',
  '壬': '水', '癸': '水'
};
// 地支と五行の対応
const BRANCH_TO_ELEMENT = {
  '子': '水', '丑': '土', '寅': '木', '卯': '木',
  '辰': '土', '巳': '火', '午': '火', '未': '土',
  '申': '金', '酉': '金', '戌': '土', '亥': '水'
};

/**
 * 年柱を計算する関数
 * 四柱推命では、年の干支は立春（2月4日頃）を基準として変わる
 */
function calculateYearPillar(year: number): { stem: string; branch: string } {
  // 簡略化のため、立春の考慮は省略して計算（実際のアプリケーションでは立春も考慮する）
  const stemIndex = (year - 4) % 10;
  const branchIndex = (year - 4) % 12;
  
  return {
    stem: HEAVENLY_STEMS[stemIndex],
    branch: EARTHLY_BRANCHES[branchIndex]
  };
}

/**
 * 月柱を計算する関数
 */
function calculateMonthPillar(year: number, month: number): { stem: string; branch: string } {
  const yearStem = HEAVENLY_STEMS[(year - 4) % 10];
  // 月の干支の計算（簡略化）
  const baseIndex = yearStem === '甲' || yearStem === '己' ? 0 :
                   yearStem === '乙' || yearStem === '庚' ? 2 :
                   yearStem === '丙' || yearStem === '辛' ? 4 :
                   yearStem === '丁' || yearStem === '壬' ? 6 : 8;
  
  // 月に対応する地支の計算
  const monthBranchIndex = (month + 1) % 12; // 立春基準で調整
  const stemIndex = (baseIndex + month - 1) % 10;
  
  return {
    stem: HEAVENLY_STEMS[stemIndex],
    branch: EARTHLY_BRANCHES[monthBranchIndex]
  };
}

/**
 * 日柱を計算する関数
 * 実際の計算は複雑で中国暦に基づく必要があるため、ここでは簡略化
 */
function calculateDayPillar(year: number, month: number, day: number): { stem: string; branch: string } {
  // 簡略版：西暦1900年1月1日は「甲子」
  const baseDate = new Date(1900, 0, 1);
  const targetDate = new Date(year, month - 1, day);
  const dayDiff = Math.floor((targetDate.getTime() - baseDate.getTime()) / (24 * 60 * 60 * 1000));
  
  const stemIndex = dayDiff % 10;
  const branchIndex = dayDiff % 12;
  
  return {
    stem: HEAVENLY_STEMS[stemIndex],
    branch: EARTHLY_BRANCHES[branchIndex]
  };
}

/**
 * 時柱を計算する関数
 */
function calculateHourPillar(dayStem: string, hour: number): { stem: string; branch: string } {
  // 時間（0-23）から地支を決定
  let branchIndex = Math.floor(hour / 2);
  if (hour === 23) branchIndex = 0; // 23時は子（子の刻）
  
  // 日柱の天干から時柱の天干を計算
  const baseIndex = HEAVENLY_STEMS.indexOf(dayStem);
  const stemOffset = Math.floor(hour / 2) * 2;
  const stemIndex = (baseIndex + stemOffset) % 10;
  
  return {
    stem: HEAVENLY_STEMS[stemIndex],
    branch: EARTHLY_BRANCHES[branchIndex]
  };
}

/**
 * 五行の相生相克関係から吉凶を判断（簡略版）
 */
function calculateElementRelationships(dayMasterElement: string): { lucky: string[], unlucky: string[] } {
  // 五行の相生関係：木→火→土→金→水→木
  // 五行の相克関係：木→土、火→金、土→水、金→木、水→火
  
  let lucky: string[] = [];
  let unlucky: string[] = [];
  
  switch (dayMasterElement) {
    case '木':
      lucky = ['水', '木', '火']; // 水は木を生じ、火は木から生じる
      unlucky = ['金', '土']; // 金は木を克し、土は木が克する
      break;
    case '火':
      lucky = ['木', '火', '土']; // 木は火を生じ、土は火から生じる
      unlucky = ['水', '金']; // 水は火を克し、金は火が克する
      break;
    case '土':
      lucky = ['火', '土', '金']; // 火は土を生じ、金は土から生じる
      unlucky = ['木', '水']; // 木は土を克し、水は土が克する
      break;
    case '金':
      lucky = ['土', '金', '水']; // 土は金を生じ、水は金から生じる
      unlucky = ['火', '木']; // 火は金を克し、木は金が克する
      break;
    case '水':
      lucky = ['金', '水', '木']; // 金は水を生じ、木は水から生じる
      unlucky = ['土', '火']; // 土は水を克し、火は水が克する
      break;
  }
  
  return { lucky, unlucky };
}

/**
 * 日主（日柱の天干）に基づいて人生テーマを判断
 */
function getLifeTheme(dayMaster: string): string {
  switch (dayMaster) {
    case '甲':
      return "創造性と先駆性：新しいことを始め、道を切り開くことに強みがあります。リーダーシップと独創性を発揮できる場所で活躍できるでしょう。";
    case '乙':
      return "柔軟性と適応力：直感力と繊細な感覚を持ち、状況に適応する能力に優れています。芸術や人間関係の分野で才能を発揮できるでしょう。";
    case '丙':
      return "情熱と影響力：明るく積極的なエネルギーを持ち、人々を鼓舞する力があります。人前に立つ仕事や創造的な分野で力を発揮できるでしょう。";
    case '丁':
      return "優しさと思いやり：繊細な感情と深い共感力を持ち、人々のケアや支援に関わる分野で才能を発揮できるでしょう。";
    case '戊':
      return "安定性と信頼：誠実で堅実な性格を持ち、長期的な視点で物事を考えることができます。組織の中核として安定をもたらす役割に適しています。";
    case '己':
      return "内省と理解：深い洞察力と分析力を持ち、複雑な情報を整理して理解する能力に優れています。知識や情報を扱う分野で才能を発揮できるでしょう。";
    case '庚':
      return "決断力と実行力：明確な判断と行動力を持ち、効率的に目標を達成することができます。管理や実践的な分野で力を発揮できるでしょう。";
    case '辛':
      return "洗練と審美眼：繊細な感覚と美的センスを持ち、物事を洗練させる能力に優れています。芸術やデザイン、人間関係の調和を生み出す分野に適しています。";
    case '壬':
      return "革新と知恵：知的好奇心と先見性を持ち、新しい知識や技術を探求することに長けています。科学や哲学、革新的な分野で才能を発揮できるでしょう。";
    case '癸':
      return "直感と感受性：鋭い直感と豊かな感受性を持ち、目に見えない世界とのつながりを感じることができます。芸術や癒し、人々の内面的成長を支援する分野に適しています。";
    default:
      return "バランスと調和：様々な要素のバランスを取り、調和を生み出す能力を持っています。多面的な視点からアプローチできる分野で才能を発揮できるでしょう。";
  }
}

/**
 * 四柱推命の計算を行う関数
 */
export function calculateFourPillars(year: number, month: number, day: number, hour: number = 12): FourPillarsResult {
  // 四柱（年柱、月柱、日柱、時柱）を計算
  const yearPillar = calculateYearPillar(year);
  const monthPillar = calculateMonthPillar(year, month);
  const dayPillar = calculateDayPillar(year, month, day);
  const hourPillar = calculateHourPillar(dayPillar.stem, hour);
  
  // 日主（日柱の天干）とその五行を取得
  const dayMaster = dayPillar.stem;
  const dayMasterElement = STEM_TO_ELEMENT[dayMaster as keyof typeof STEM_TO_ELEMENT];
  
  // 五行の相生相克関係から吉凶を判断
  const { lucky, unlucky } = calculateElementRelationships(dayMasterElement);
  
  // 人生テーマを取得
  const lifeTheme = getLifeTheme(dayMaster);
  
  return {
    heavenlyStem: dayMaster,
    earthlyBranch: dayPillar.branch,
    dayMaster: dayMasterElement,
    luckyElements: lucky,
    unluckyElements: unlucky,
    lifeTheme
  };
}