import { MbtiResponse, FourPillarsResult, SeiMeiResult } from "@shared/schema";
import { AnalysisResult, SanmeiResult, MbtiResult } from "../../client/src/lib/types";
import { calculateSeiMei } from "./seimei-calculator";
import { calculateFourPillars } from "./four-pillars-calculator";

interface BirthDate {
  year: number;
  month: number;
  day: number;
  hour?: number;
  minute?: number;
}

// Calculate personality result based on MBTI responses and birth info
export function calculatePersonalityResult(
  mbtiResponses: MbtiResponse[],
  birthDate: BirthDate,
  gender: string,
  // 姓名判断と四柱推命のオプションパラメータを追加
  firstNameKanji?: string,
  lastNameKanji?: string
): AnalysisResult {
  // Calculate MBTI type
  const mbtiResult = calculateMbtiType(mbtiResponses);
  
  // Calculate Sanmei (算命学) type
  const sanmeiResult = calculateSanmeiType(birthDate);
  
  // 姓名判断の計算
  let seiMeiResult;
  if (firstNameKanji && lastNameKanji) {
    seiMeiResult = calculateSeiMei(lastNameKanji, firstNameKanji);
  }

  // 四柱推命の計算
  let fourPillarsResult;
  if (birthDate.hour !== undefined) {
    fourPillarsResult = calculateFourPillars(
      birthDate.year, 
      birthDate.month, 
      birthDate.day, 
      birthDate.hour
    );
  }

  // Generate the combined analysis
  return generateAnalysis(
    mbtiResult, 
    sanmeiResult, 
    gender, 
    seiMeiResult, 
    fourPillarsResult
  );
}

// Calculate MBTI type from responses
function calculateMbtiType(responses: MbtiResponse[]) {
  // Initialize counters for each dimension
  let iCount = 0, eCount = 0;
  let nCount = 0, sCount = 0;
  let fCount = 0, tCount = 0;
  let jCount = 0, pCount = 0;
  
  // Count responses by category
  responses.forEach(response => {
    const questionId = response.questionId;
    const answer = response.answer.toLowerCase(); // 小文字に変換して処理
    
    // Find the category of the question (IE, NS, FT, JP)
    // Each question is assigned to one of the categories
    switch (answer) {
      case 'i': iCount++; break;
      case 'e': eCount++; break;
      case 'n': nCount++; break;
      case 's': sCount++; break;
      case 'f': fCount++; break;
      case 't': tCount++; break;
      case 'j': jCount++; break;
      case 'p': pCount++; break;
    }
  });
  
  console.log("MBTI Counts:", { iCount, eCount, nCount, sCount, fCount, tCount, jCount, pCount });
  
  // Calculate percentages (higher percentage means stronger preference)
  const totalIE = iCount + eCount;
  const totalNS = nCount + sCount;
  const totalFT = fCount + tCount;
  const totalJP = jCount + pCount;
  
  const ieScale = totalIE > 0 ? Math.round((iCount / totalIE) * 100) : 50;
  const nsScale = totalNS > 0 ? Math.round((nCount / totalNS) * 100) : 50;
  const ftScale = totalFT > 0 ? Math.round((tCount / totalFT) * 100) : 50; // Tが多いほどTスコアが高い
  const jpScale = totalJP > 0 ? Math.round((jCount / totalJP) * 100) : 50;
  
  console.log("MBTI Scales:", { ieScale, nsScale, ftScale, jpScale });
  
  // Determine type based on which preference is stronger
  const iOrE = ieScale >= 50 ? 'I' : 'E';
  const nOrS = nsScale >= 50 ? 'N' : 'S';
  const fOrT = ftScale >= 50 ? 'T' : 'F'; // ftScaleが高いほど、Tになる
  const jOrP = jpScale >= 50 ? 'J' : 'P';
  
  // Combine to form the 4-letter MBTI type
  const type = `${iOrE}${nOrS}${fOrT}${jOrP}`;
  
  console.log("Final MBTI Type:", type);
  
  return {
    type,
    ieScale,
    nsScale,
    ftScale,
    jpScale
  };
}

// Calculate Sanmei (算命学) type based on birth date
function calculateSanmeiType(birthDate: BirthDate) {
  const { year, month, day } = birthDate;
  
  // Simplified calculation of 算命学 type based on birth year
  // In a real application, this would be more complex and accurate
  // This is a simplified version for demonstration purposes
  
  // Calculate element (wood, fire, earth, metal, water)
  // 年と月と日を使用して計算
  const elementIndex = Math.abs((year + month + day) % 5);
  const elements = ['木', '火', '土', '金', '水'];
  const element = elements[elementIndex];
  
  // Calculate polarity (yin or yang - 陰 or 陽)
  // 月と日を使用して計算を豊かにする
  const isYin = ((year + month + day) % 2 === 0);
  const polarity = isYin ? '陰' : '陽';
  
  // Combine element and polarity
  const fullType = `${element}命・${polarity}`;
  
  return {
    element,
    polarity,
    fullType
  };
}

// Generate full analysis based on MBTI and Sanmei results
function generateAnalysis(
  mbtiResult: any, 
  sanmeiResult: any, 
  gender: string,
  seiMeiResult?: any,
  fourPillarsResult?: any
): AnalysisResult {
  // Get type nickname based on MBTI type
  const typeNickname = getMbtiNickname(mbtiResult.type);
  
  // Get MBTI traits
  const mbtiTraits = getMbtiTraits(mbtiResult.type);
  
  // Get Sanmei traits
  const sanmeiTraits = getSanmeiTraits(sanmeiResult.element, sanmeiResult.polarity);
  
  // Generate overview
  const overview = generateOverview(mbtiResult.type, sanmeiResult.element, sanmeiResult.polarity);
  
  // Generate strengths
  const strengths = generateStrengths(mbtiResult.type, sanmeiResult.element, sanmeiResult.polarity);
  
  // Generate challenges
  const challenges = generateChallenges(mbtiResult.type, sanmeiResult.element, sanmeiResult.polarity);
  
  // Generate relationship insights
  const relationships = generateRelationships(mbtiResult.type, sanmeiResult.element, sanmeiResult.polarity);
  
  // Generate career insights
  const career = generateCareer(mbtiResult.type, sanmeiResult.element, sanmeiResult.polarity);
  
  // Generate balance tips
  const balance = {
    energyManagement: generateEnergyManagement(mbtiResult.type, sanmeiResult.element),
    perfectionism: generatePerfectionismAdvice(mbtiResult.type, sanmeiResult.element)
  };
  
  // Generate relationship tips
  const relationshipTips = {
    boundaries: generateBoundariesAdvice(mbtiResult.type, sanmeiResult.element),
    expression: generateExpressionAdvice(mbtiResult.type, sanmeiResult.element),
    compatibility: generateCompatibilityAdvice(mbtiResult.type, sanmeiResult.element)
  };
  
  // Generate future outlook
  const futureOutlook = generateFutureOutlook(mbtiResult.type, sanmeiResult.element, sanmeiResult.polarity);
  
  return {
    mbtiResult,
    sanmeiResult,
    typeNickname,
    overview,
    mbtiTraits,
    sanmeiTraits,
    strengths,
    challenges,
    relationships,
    career,
    balance,
    relationshipTips,
    futureOutlook,
    // 姓名判断と四柱推命の結果を追加
    seiMeiResult,
    fourPillarsResult
  };
}

// Helper functions for generating specific content

function getMbtiNickname(type: string): string {
  const nicknames: Record<string, string> = {
    'INTJ': '「建築家・戦略家」',
    'INTP': '「論理学者・思想家」',
    'ENTJ': '「指揮官・統率者」',
    'ENTP': '「討論者・発明家」',
    'INFJ': '「提唱者・神秘的な理想主義者」',
    'INFP': '「仲介者・理想主義的な癒し手」',
    'ENFJ': '「主人公・教師」',
    'ENFP': '「広報運動家・チャンピオン」',
    'ISTJ': '「管理者・義務遂行者」',
    'ISFJ': '「擁護者・防衛者」',
    'ESTJ': '「幹部・監督者」',
    'ESFJ': '「領事・提供者」',
    'ISTP': '「巨匠・職人」',
    'ISFP': '「冒険家・芸術家」',
    'ESTP': '「起業家・実行者」',
    'ESFP': '「エンターテイナー・パフォーマー」'
  };
  
  return nicknames[type] || '「独自の組み合わせタイプ」';
}

function getMbtiTraits(type: string): string[] {
  const traits: Record<string, string[]> = {
    'INTJ': [
      '戦略的思考と長期計画に優れている',
      '独立心が強く、自己主導的',
      '合理的な意思決定と問題解決能力が高い',
      '高い基準と完璧主義の傾向がある'
    ],
    'INTP': [
      '論理的思考と分析に優れている',
      '新しい概念やアイデアに関心を持つ',
      '知的好奇心が強い',
      '独創的な問題解決アプローチを持つ'
    ],
    'ENTJ': [
      'リーダーシップと決断力がある',
      '効率性と生産性を重視する',
      '戦略的思考と計画立案に長けている',
      '直接的でオープンなコミュニケーションスタイル'
    ],
    'ENTP': [
      '創造的思考と革新性がある',
      '議論や知的な対話を楽しむ',
      '多様なアイデアや可能性を探求する',
      '従来の方法や規則に挑戦する'
    ],
    'INFJ': [
      '人々の感情や動機を直感的に理解する',
      '理想主義的で目標達成に向けて粘り強い',
      '深い洞察力と創造性を持つ',
      '他者との意味のある関係を重視する'
    ],
    'INFP': [
      '強い個人的価値観と倫理観を持つ',
      '他者への共感力と理解力が高い',
      '創造的で芸術的な表現に惹かれる',
      '他者との調和と真正性を重視する'
    ],
    'ENFJ': [
      '他者の成長と発展を支援することに情熱的',
      'カリスマ性とリーダーシップがある',
      '優れたコミュニケーション能力がある',
      '人間関係と社会的な調和を重視する'
    ],
    'ENFP': [
      '熱意と創造性に溢れている',
      '新しい可能性や考え方に開かれている',
      '優れた人間関係スキルを持つ',
      '自由と自己表現を重視する'
    ],
    'ISTJ': [
      '責任感が強く信頼できる',
      '秩序だったアプローチで体系的に問題を解決する',
      '事実と詳細に注意を払う',
      '伝統と安定性を重視する'
    ],
    'ISFJ': [
      '思いやりがあり、他者のニーズに注意深い',
      '責任感と信頼性が高い',
      '実用的で秩序だったアプローチを好む',
      '安定性と調和を重視する'
    ],
    'ESTJ': [
      '効率的で体系的な問題解決能力がある',
      '責任感が強く、義務を重視する',
      '明確な構造とガイドラインを好む',
      '直接的で実用的なコミュニケーションスタイル'
    ],
    'ESFJ': [
      '他者の福祉と調和に気を配る',
      '協力的で社交的',
      '組織と秩序に価値を置く',
      '責任感と義務感が強い'
    ],
    'ISTP': [
      '問題解決に対する実用的なアプローチを持つ',
      '危機的状況で冷静さを保つ',
      '手先の器用さと技術的スキルに長けている',
      '自律性と柔軟性を重視する'
    ],
    'ISFP': [
      '芸術的感性と美的センスがある',
      '思いやりがあり、他者の気持ちに敏感',
      '現在の瞬間を楽しむ能力がある',
      '自由と個人的な表現を重視する'
    ],
    'ESTP': [
      '行動志向で冒険を楽しむ',
      '状況に素早く適応し、問題解決能力が高い',
      '現実的で実用的なアプローチを好む',
      '社交的でエネルギッシュ'
    ],
    'ESFP': [
      '社交的でエネルギッシュ',
      '人々と交流し、楽しい雰囲気を作り出す',
      '現在の瞬間を楽しむ',
      '柔軟性と適応力がある'
    ]
  };
  
  return traits[type] || [
    '独自の思考パターンを持つ',
    'バランスの取れた視点で状況を分析する',
    '状況に応じて柔軟に対応できる',
    '多面的な才能と能力を持つ'
  ];
}

function getSanmeiTraits(element: string, polarity: string): string[] {
  const elementTraits: Record<string, string[]> = {
    '木': [
      '成長と発展を好み、理想を追求する',
      '柔軟で順応性がある一方、内面に強い意志を持つ',
      '自然や環境との調和を重視する',
      '進歩的で未来志向の思考を持つ'
    ],
    '火': [
      '情熱的でエネルギッシュな性質を持つ',
      '直感的な判断と決断力がある',
      '表現力と創造性に富む',
      '人々を鼓舞し、活気をもたらす'
    ],
    '土': [
      '安定性と信頼性を重視する',
      '実用的で現実的な思考を持つ',
      '誠実で思いやりがある',
      '伝統と家族の価値を大切にする'
    ],
    '金': [
      '整然とした思考と分析力を持つ',
      '正確さと完璧さを追求する',
      '原則と規律を重んじる',
      '強い意志と断固とした態度を持つ'
    ],
    '水': [
      '柔軟で適応力があり、流れに従う',
      '深い知恵と直感力を持つ',
      '内省的で哲学的な思考を好む',
      '感情的な深さと洞察力がある'
    ]
  };
  
  // Adjust traits based on polarity
  const polarityAdjustment = polarity === '陰' ? 
    '内面的な表現と静かな強さを持つ' : 
    '外向的な表現と積極的なエネルギーを持つ';
  
  const baseTraits = elementTraits[element] || [
    '自然の要素とのバランスを持つ',
    '多面的な性質を持ち合わせている',
    '状況に応じて適応できる柔軟性がある',
    '独自の個性と表現方法を持つ'
  ];
  
  return [...baseTraits, polarityAdjustment];
}

function generateOverview(mbtiType: string, element: string, polarity: string): string {
  // Generate personalized overview based on MBTI type and Sanmei elements
  const mbtiOverview = getMbtiOverview(mbtiType);
  const sanmeiOverview = getSanmeiOverview(element, polarity);
  const combinedOverview = getCombinedOverview(mbtiType, element, polarity);
  
  return `${mbtiOverview}\n\n${sanmeiOverview}\n\n${combinedOverview}`;
}

function getMbtiOverview(type: string): string {
  const overviews: Record<string, string> = {
    'INTJ': 'あなたは分析的で戦略的な思考を持ち、世界を理解し改善するための体系的なアプローチを好みます。独立心が強く、効率性を重視する傾向があります。',
    'INTP': 'あなたは論理的で理論的な思考を持ち、概念や原理を理解することに情熱を持っています。新しいアイデアや可能性を探求することを楽しむ傾向があります。',
    'ENTJ': 'あなたは決断力とリーダーシップを持ち、効率的な方法で目標を達成することに情熱を持っています。論理的な思考と計画性に優れています。',
    'ENTP': 'あなたは革新的で知的好奇心が強く、新しいアイデアを生み出し、議論することを楽しみます。様々な可能性を探求し、従来の枠組みに挑戦する傾向があります。',
    'INFJ': 'あなたは内省的で直感的な性格を持ち、社会や周囲の人々のために何かを成し遂げたいという強い使命感を抱いています。深い洞察力と理想主義的な側面を持っています。',
    'INFP': 'あなたは理想主義的で共感力が高く、自分の価値観や信念に基づいた真正性のある生き方を求めています。創造性と人間の可能性を信じる傾向があります。',
    'ENFJ': 'あなたはカリスマ性と思いやりを持ち、他者の成長や発展をサポートすることに喜びを見出します。社会的な調和と意義のある関係を重視します。',
    'ENFP': 'あなたは熱意と創造性に溢れ、新しい可能性や人との繋がりを求める傾向があります。自由な表現と人間の潜在能力を引き出すことに情熱を持っています。',
    'ISTJ': 'あなたは責任感が強く、秩序と体系を重視します。事実と詳細に注意を払い、義務を果たすことに価値を見出す傾向があります。',
    'ISFJ': 'あなたは思いやりがあり、責任感が強く、他者のニーズに敏感です。実用的なサポートと伝統的な価値観を大切にする傾向があります。',
    'ESTJ': 'あなたは実務的でリーダーシップがあり、効率と秩序を重視します。明確な構造とルールに基づいて行動し、責任を果たすことを重んじます。',
    'ESFJ': 'あなたは協力的で社交的であり、周囲との調和と他者のケアを重視します。伝統的な価値観と人間関係の中で安定を求める傾向があります。',
    'ISTP': 'あなたは実践的で論理的な問題解決者であり、具体的な事実や経験から学ぶことを好みます。自律性と柔軟性を持ち、危機的状況でも冷静さを保つ能力があります。',
    'ISFP': 'あなたは感受性が強く、芸術的な表現を通じて自分の個性を示す傾向があります。現在の瞬間を大切にし、自由と美を追求します。',
    'ESTP': 'あなたは行動志向で、現実的な問題解決に優れています。冒険を楽しみ、状況に素早く適応できる柔軟性を持っています。',
    'ESFP': 'あなたは社交的で spontaneous であり、現在の瞬間を楽しむことを重視します。他者と共に楽しい経験を創り出すことに喜びを感じる傾向があります。'
  };
  
  return overviews[type] || 'あなたは独自の思考パターンと行動様式を持ち、様々な状況に応じて異なる側面を発揮することができます。';
}

function getSanmeiOverview(element: string, polarity: string): string {
  const elementOverviews: Record<string, string> = {
    '木': `算命学の「${element}命・${polarity}」の特性として、${polarity === '陰' ? '穏やかながらも芯の強さを持ち' : '活発で成長力があり'}、自分の信念に従って着実に成長する傾向があります。自然界の樹木のように、柔軟さと強さを兼ね備え、環境との調和を大切にします。`,
    '火': `算命学の「${element}命・${polarity}」の特性として、${polarity === '陰' ? '内面に熱い情熱を秘めながらも控えめに表現し' : '明るく活発なエネルギーを外に表現し'}、周囲に活力と温かさをもたらします。創造的なビジョンと直感力に優れています。`,
    '土': `算命学の「${element}命・${polarity}」の特性として、${polarity === '陰' ? '内面に安定した基盤を持ち、穏やかに周囲をサポートする' : '実用的で頼りになる存在として、積極的に周囲を支える'}傾向があります。信頼性と実用性を重視し、伝統的な価値観を大切にします。`,
    '金': `算命学の「${element}命・${polarity}」の特性として、${polarity === '陰' ? '内面に強い意志と原則を持ちながらも控えめに表現する' : '明確な基準と決断力を持ち、それを外に表現する'}傾向があります。精密さと完璧さを追求し、原則に基づいた行動を取ります。`,
    '水': `算命学の「${element}命・${polarity}」の特性として、${polarity === '陰' ? '内面に深い知恵と直感力を持ちながらも静かに流れる' : '柔軟に適応しながらも強い直感力で道を切り開く'}傾向があります。深い洞察力と適応力を持ち、状況の流れを読む能力に優れています。`
  };
  
  return elementOverviews[element] || `算命学における五行思想では、あなたは「${element}命・${polarity}」の特性を持ち、独自のエネルギーバランスと表現方法を持っています。`;
}

function getCombinedOverview(mbtiType: string, element: string, polarity: string): string {
  // Simplified combined overview based on common patterns
  // In a real application, this would be more personalized
  
  // Check if MBTI is introverted or extraverted
  const isIntroverted = mbtiType.startsWith('I');
  
  // Check if intuitive or sensing
  const isIntuitive = mbtiType.includes('N');
  
  // Check if feeling or thinking
  const isFeeling = mbtiType.includes('F');
  
  // Check if judging or perceiving
  const isJudging = mbtiType.includes('J');
  
  // Check if yin or yang
  const isYin = polarity === '陰';
  
  // Generate combined insight
  let combinedInsight = '二つの体系から見るあなたの最も際立った特徴は、';
  
  // Based on introversion/extraversion and yin/yang
  if ((isIntroverted && isYin) || (!isIntroverted && !isYin)) {
    // Aligned energy direction
    combinedInsight += isIntroverted 
      ? '「静かな内省力」と「深い内面的理解」です。表面的な社交よりも、一人一人との深い関わりを大切にし、'
      : '「活発な表現力」と「外向的なエネルギー」です。多くの人々との交流を通じて、';
  } else {
    // Mixed energy direction
    combinedInsight += isIntroverted
      ? '「内省的な思考」と「外向的なエネルギーのバランス」です。状況に応じて内向と外向の特性を切り替え、'
      : '「社交的な表現」と「内面的な深さのバランス」です。人々との交流を楽しみながらも内面に深い思考を持ち、';
  }
  
  // Based on element and MBTI function preferences
  switch (element) {
    case '木':
      combinedInsight += isIntuitive
        ? '成長と可能性を見出す直感力に優れています。'
        : '実際的な成長と発展を重視します。';
      break;
    case '火':
      combinedInsight += isFeeling
        ? '情熱的な感情表現と人間関係の暖かさを大切にします。'
        : '創造的なビジョンと明確な表現力を持っています。';
      break;
    case '土':
      combinedInsight += isJudging
        ? '安定と秩序を重視する傾向があります。'
        : '実用的でありながらも柔軟性を持っています。';
      break;
    case '金':
      combinedInsight += isFeeling
        ? '原則を重んじながらも人間関係の価値を理解しています。'
        : '論理的な分析と明確な基準に基づく判断を好みます。';
      break;
    case '水':
      combinedInsight += isIntuitive
        ? '深い洞察力と直感的な理解力を持っています。'
        : '状況に適応しながら実際的な知恵を活かします。';
      break;
    default:
      combinedInsight += '独自のバランスと調和を持った視点で世界を捉えています。';
  }
  
  combinedInsight += '他者の成長や幸福に貢献することに喜びを見出します。';
  
  return combinedInsight;
}

function generateStrengths(mbtiType: string, element: string, polarity: string): string {
  // Base strengths from MBTI
  let mbtiStrengths = '';
  if (mbtiType.startsWith('I')) {
    mbtiStrengths += 'MBTIの' + mbtiType + 'としての';
    mbtiStrengths += mbtiType.includes('N') ? '直感力と洞察力' : '注意深い観察力と実用的な思考';
    mbtiStrengths += '、';
  } else {
    mbtiStrengths += 'MBTIの' + mbtiType + 'としての';
    mbtiStrengths += mbtiType.includes('N') ? '創造的な視野と可能性への探求心' : '現実的な問題解決能力と実行力';
    mbtiStrengths += '、';
  }
  
  // Base strengths from element
  let elementStrengths = '';
  switch (element) {
    case '木':
      elementStrengths = '算命学の木命としての柔軟性と成長志向';
      break;
    case '火':
      elementStrengths = '算命学の火命としての情熱と創造的エネルギー';
      break;
    case '土':
      elementStrengths = '算命学の土命としての安定性と信頼性';
      break;
    case '金':
      elementStrengths = '算命学の金命としての精密さと決断力';
      break;
    case '水':
      elementStrengths = '算命学の水命としての適応力と深い洞察力';
      break;
    default:
      elementStrengths = '算命学の要素としての独自のバランス';
  }
  
  // Combined strengths
  let combinedResult = '';
  if (mbtiType.includes('F') && (element === '木' || element === '水')) {
    combinedResult = '人間関係や組織内で「静かなる改革者」として機能することができます。';
  } else if (mbtiType.includes('T') && (element === '金' || element === '火')) {
    combinedResult = '戦略的思考と実行力を兼ね備えた「実践的な戦略家」として力を発揮できます。';
  } else if (mbtiType.includes('J') && (element === '土' || element === '金')) {
    combinedResult = '組織と構造を重視する「信頼できる基盤構築者」としての役割を果たせます。';
  } else if (mbtiType.includes('P') && (element === '木' || element === '火')) {
    combinedResult = '創造的で柔軟な「革新的な触媒」として環境に適応しながら新たな可能性を開拓できます。';
  } else {
    combinedResult = '多面的な視点と独自のアプローチで問題に取り組む能力に優れています。';
  }
  
  return `${mbtiStrengths}${elementStrengths}が組み合わさり、あなたは${combinedResult}複雑な状況を理解し、長期的なビジョンに基づいて行動する能力に優れています。`;
}

function generateChallenges(mbtiType: string, element: string, polarity: string): string {
  // MBTI-related challenges
  let mbtiChallenges = '';
  if (mbtiType.startsWith('I')) {
    mbtiChallenges = '内向的な性質';
  } else {
    mbtiChallenges = '外向的なエネルギーの管理';
  }
  
  if (mbtiType.includes('N')) {
    mbtiChallenges += 'と理想主義的な傾向';
  } else {
    mbtiChallenges += 'と実用主義的な焦り';
  }
  
  // Element-related challenges
  let elementChallenges = '';
  switch (element) {
    case '木':
      elementChallenges = '成長への強い欲求が時に周囲との摩擦を生じさせることがあります';
      break;
    case '火':
      elementChallenges = '情熱的な性質がバーンアウトにつながる可能性があります';
      break;
    case '土':
      elementChallenges = '安定を求めるあまり変化に抵抗してしまうことがあります';
      break;
    case '金':
      elementChallenges = '高い基準を持つことが完璧主義につながることがあります';
      break;
    case '水':
      elementChallenges = '適応性が高いがゆえに自分の立場を見失うことがあります';
      break;
    default:
      elementChallenges = '要素間のバランスを取ることが時に難しく感じられます';
  }
  
  // Combined advice
  let growthAdvice = '';
  if (mbtiType.includes('J')) {
    growthAdvice = '「完璧でなくても良い」という考え方を受け入れること';
  } else if (mbtiType.includes('P')) {
    growthAdvice = '焦点を絞り、行動に移すための明確な優先順位をつけること';
  } else if (mbtiType.includes('F')) {
    growthAdvice = '自分自身のニーズも大切にする健全な境界線を設けること';
  } else {
    growthAdvice = '論理だけでなく感情的側面も考慮に入れること';
  }
  
  return `${mbtiChallenges}から、時に現実とのギャップにストレスを感じることがあります。また、${elementChallenges}。他者のニーズに敏感なあまり、自分自身のニーズを後回しにしてしまう傾向も見られます。自分の限界を認識し、${growthAdvice}が成長への鍵となります。`;
}

function generateRelationships(mbtiType: string, element: string, polarity: string): string {
  // MBTI relationship preferences
  let relationshipStyle = '';
  if (mbtiType.startsWith('I')) {
    relationshipStyle = '少数の深い関係を好み、表面的な交流よりも意味のある会話や共有体験を重視します。';
  } else {
    relationshipStyle = '広い人間関係のネットワークを持ち、様々な人々との交流から刺激を受ける傾向があります。';
  }
  
  // Element influence on relationships
  let elementInfluence = '';
  switch (element) {
    case '木':
      elementInfluence = '木命の特性として、周囲に良い影響を与えながら自身も成長する関係性を自然と構築しています。';
      break;
    case '火':
      elementInfluence = '火命の特性として、温かさと情熱をもって人間関係に活力をもたらします。';
      break;
    case '土':
      elementInfluence = '土命の特性として、安定感と信頼性をもって周囲の人々を支える役割を担うことが多いです。';
      break;
    case '金':
      elementInfluence = '金命の特性として、誠実さと明確なコミュニケーションで信頼関係を構築します。';
      break;
    case '水':
      elementInfluence = '水命の特性として、深い理解と柔軟な受容性で多様な人々との関係を育みます。';
      break;
    default:
      elementInfluence = '独自のエネルギーバランスで、状況に応じた適切な関係性を築く能力があります。';
  }
  
  // Emotional sensitivity based on MBTI and element
  let emotionalNote = '';
  if (mbtiType.includes('F') || element === '水' || element === '木') {
    emotionalNote = '共感力が高いため、時に他者の問題を自分のことのように感じてしまうこともあります。';
  } else {
    emotionalNote = '論理的な思考を大切にしながらも、重要な関係では感情的なつながりも大切にします。';
  }
  
  return `${relationshipStyle}${elementInfluence}${emotionalNote}`;
}

function generateCareer(mbtiType: string, element: string, polarity: string): string {
  // Career preferences based on MBTI
  let careerPreferences = '';
  
  if (mbtiType.includes('N') && mbtiType.includes('F')) {
    careerPreferences = '人の成長や発展に関わる職業、創造的な問題解決が求められる分野、社会的な意義のある仕事';
  } else if (mbtiType.includes('N') && mbtiType.includes('T')) {
    careerPreferences = '戦略的な計画立案、複雑な問題の分析、革新的なシステム設計が求められる分野';
  } else if (mbtiType.includes('S') && mbtiType.includes('F')) {
    careerPreferences = '実用的なケアやサポート、対人サービス、コミュニティの調和を促進する分野';
  } else if (mbtiType.includes('S') && mbtiType.includes('T')) {
    careerPreferences = '実務的な管理運営、効率的なシステムの実装、具体的な問題解決が求められる分野';
  } else {
    careerPreferences = '多面的なスキルを活かせる分野、バランスの取れた視点が求められる仕事';
  }
  
  // Element influence on career
  let elementInfluence = '';
  switch (element) {
    case '木':
      elementInfluence = '成長や発展に関連する仕事、教育、コーチング、環境関連の分野';
      break;
    case '火':
      elementInfluence = '創造性、表現、リーダーシップ、革新的なプロジェクトに関連する分野';
      break;
    case '土':
      elementInfluence = '安定とサポートを提供する役割、不動産、農業、組織基盤に関連する分野';
      break;
    case '金':
      elementInfluence = '精密さと明確さが求められる分野、財務、法律、品質管理、構造化されたシステム';
      break;
    case '水':
      elementInfluence = '流動的思考と適応力が活かせる分野、研究、カウンセリング、芸術、医療';
      break;
    default:
      elementInfluence = '多様な要素のバランスが求められる統合的な分野';
  }
  
  // Specific roles
  let specificRoles = '';
  if (mbtiType === 'INFJ' || mbtiType === 'ENFJ') {
    specificRoles = '具体的には、カウンセラー、教育者、ライター、芸術家、非営利団体での活動などが考えられます。';
  } else if (mbtiType === 'INTJ' || mbtiType === 'ENTJ') {
    specificRoles = '具体的には、戦略コンサルタント、研究者、システム設計者、企業家、プロジェクトマネージャーなどが考えられます。';
  } else if (mbtiType === 'ISFJ' || mbtiType === 'ESFJ') {
    specificRoles = '具体的には、医療従事者、ソーシャルワーカー、教師、顧客サービス、コミュニティサポートなどが考えられます。';
  } else if (mbtiType === 'ISTJ' || mbtiType === 'ESTJ') {
    specificRoles = '具体的には、財務管理者、法律専門家、プロジェクト管理者、運営責任者などが考えられます。';
  } else {
    specificRoles = '具体的には、あなたの多面的なスキルを活かせる分野で、個性と才能が評価される環境が最適でしょう。';
  }
  
  // Organizational role
  let orgRole = '';
  if (mbtiType.startsWith('E')) {
    orgRole = '組織内では、ビジョンを示し、人々をつなぐ役割が得意です。';
  } else {
    orgRole = '組織内では、深い分析と洞察を提供し、背後から支える役割が得意です。';
  }
  
  return `${careerPreferences}に適性があります。また、${elementInfluence}も相性が良いでしょう。${specificRoles}${orgRole}`;
}

function generateEnergyManagement(mbtiType: string, element: string): string {
  if (mbtiType.startsWith('I')) {
    return `内向型として、社交的な活動の後には一人の時間を意識的に確保しましょう。${element === '木' ? '自然の中で過ごす時間は、木命の特性を活かした効果的なリフレッシュ方法になります。' : element === '水' ? '水辺で過ごしたり、瞑想したりすることで、水命の特性を活かしたリフレッシュが可能です。' : '静かな環境で内省する時間を持つことで、エネルギーを回復できます。'}`;
  } else {
    return `外向型として、他者との交流からエネルギーを得る一方で、${element === '火' ? '火命の特性から時に燃え尽きることがあります。情熱を持続させるために意識的な休息を取り入れましょう。' : element === '木' ? '木命の特性から成長と活動を求め過ぎることがあります。時には自然の中でゆっくり過ごす時間も大切にしましょう。' : '活動と休息のバランスを意識的に取ることが大切です。'}`;
  }
}

function generatePerfectionismAdvice(mbtiType: string, element: string): string {
  if (mbtiType.includes('J') || element === '金' || element === '木') {
    return '高い理想を持つことは素晴らしいですが、すべてを完璧にしようとするストレスから自分を守ることも大切です。小さな成功を認め、祝うことを習慣にしましょう。';
  } else {
    return '柔軟性を持つことは強みですが、時に焦点が定まらなくなることがあります。重要なプロジェクトでは、何が「十分に良い」かを定義し、行動に移すことを意識しましょう。';
  }
}

function generateBoundariesAdvice(mbtiType: string, element: string): string {
  if (mbtiType.includes('F') || element === '水' || element === '木') {
    return '共感力が高いあなたは、時に他者の感情に圧倒されることがあります。健全な境界線を設けることを学びましょう。';
  } else {
    return '論理的思考を重視するあなたは、時に感情的なニーズを見逃すことがあります。自分と他者の感情的境界にも注意を払いましょう。';
  }
}

function generateExpressionAdvice(mbtiType: string, element: string): string {
  if (mbtiType.startsWith('I')) {
    return '内面に豊かな思考を持っていても、それを言葉にして共有しないと他者には伝わりません。あなたの洞察は多くの人の助けになります。';
  } else {
    return '自然な表現力を持つあなたですが、時に他者が内省や処理の時間を必要とすることを忘れないでください。重要な会話では相手の反応を見ながら進めることが効果的です。';
  }
}

function generateCompatibilityAdvice(mbtiType: string, element: string): string {
  return 'すべての関係に同じエネルギーを注ぐのではなく、相互成長できる関係に意識的に時間を投資しましょう。';
}

function generateFutureOutlook(mbtiType: string, element: string, polarity: string): string {
  let elementOutlook = '';
  switch (element) {
    case '木':
      elementOutlook = 'あなたの木命としての性質は、時間をかけて着実に成長するというプロセスと調和しています。';
      break;
    case '火':
      elementOutlook = 'あなたの火命としての性質は、情熱と創造力を通じて新たな可能性を照らし出すことと調和しています。';
      break;
    case '土':
      elementOutlook = 'あなたの土命としての性質は、安定した基盤を築きながら、着実に前進するプロセスと調和しています。';
      break;
    case '金':
      elementOutlook = 'あなたの金命としての性質は、明確な基準と精密さを持って価値あるものを選び取るプロセスと調和しています。';
      break;
    case '水':
      elementOutlook = 'あなたの水命としての性質は、柔軟に状況に適応しながら、深い知恵を育むプロセスと調和しています。';
      break;
    default:
      elementOutlook = 'あなたの持つ五行のバランスは、多面的な視点で未来を形作るプロセスと調和しています。';
  }
  
  let mbtiOutlook = '';
  if (mbtiType.includes('N')) {
    mbtiOutlook = 'MBTIの直感力と組み合わさることで、将来の可能性を見通しながら、今の自分に必要な成長のステップを選ぶ力を持っています。';
  } else {
    mbtiOutlook = 'MBTIの現実的な視点と組み合わさることで、具体的な一歩一歩を着実に進みながら、確かな未来を築く力を持っています。';
  }
  
  return `${elementOutlook}${mbtiOutlook}焦らず、自分のペースで進むことを忘れないでください。`;
}
