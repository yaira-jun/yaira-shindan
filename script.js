(function () {
  'use strict';

  // ---- 質問データ(選択肢の並び順 = A,B,C,D。scoreは合計点用) ----
  var QUESTIONS = [
    {
      text: '合コンで隣の友達が渾身の下ネタをぶっ込んできた。あなたの反応は？',
      options: [
        { label: '腹抱えて爆笑、二次会でもネタにする', score: 4 },
        { label: 'ちょっと笑ってしまう', score: 3 },
        { label: '微妙な空気の中、愛想笑い', score: 2 },
        { label: '真顔で「はい、次」とスルー', score: 1 }
      ]
    },
    {
      text: '「それ、入れていいですか？」と言われた。あなたの脳内は？',
      options: [
        { label: '一瞬で別の意味に変換完了', score: 4 },
        { label: '数秒後に「あ、そういうこと」と気づく', score: 3 },
        { label: '素直に「何を？」と聞き返す', score: 2 },
        { label: '普通に仕事の話だと思う', score: 1 }
      ]
    },
    {
      text: '自分では普通のつもりで言った一言に、友達が「今の、絶対わざとだよね？」と食いついてきた。あなたは？',
      options: [
        { label: '「気づくの遅すぎ」と逆にドヤる', score: 4 },
        { label: '「言われてみれば…！」と今更爆笑', score: 3 },
        { label: '「え、どこが？」と本気で分からない', score: 2 },
        { label: '「普通の話だと思うけど」と真顔', score: 1 }
      ]
    },
    {
      text: '飲み会でついに下ネタトークが解禁された。あなたのポジションは？',
      options: [
        { label: '進行役、もはや主役', score: 4 },
        { label: 'ちゃんと会話に混ざる参加者', score: 3 },
        { label: 'グラスの氷を見つめる係', score: 2 },
        { label: 'なぜか一番真面目な相談に乗り出す', score: 1 }
      ]
    },
    {
      text: '「これ、めっちゃ硬くて大きいよ」と言われた。まず思い浮かべるものは？',
      options: [
        { label: 'それしか思い浮かばない', score: 4 },
        { label: '一瞬ソレがよぎる', score: 3 },
        { label: '特に何も思わない', score: 2 },
        { label: '素材か何かの話だと思う', score: 1 }
      ]
    },
    {
      text: '友達の下ネタが盛大にスベった。あなたの動きは？',
      options: [
        { label: '追い打ちでさらに強いパンチラインを打つ', score: 4 },
        { label: '助け舟で笑ってあげる', score: 3 },
        { label: '気まずさに耐えて黙々と食事を続ける', score: 2 },
        { label: '「今のは寒かったね」と正直にツッコむ', score: 1 }
      ]
    },
    {
      text: 'SNSのタイムラインに下ネタ系の動画が流れてきた。あなたは？',
      options: [
        { label: '友達グループに即シェアしたくなる', score: 4 },
        { label: '音量上げてガッツリ見る', score: 3 },
        { label: 'ちょっと気になって二度見する', score: 2 },
        { label: '秒でスクロールしてスルー', score: 1 }
      ]
    },
    {
      text: '日常会話の中で「それ、別の意味に聞こえるんだけど」と思うことは？',
      options: [
        { label: 'しょっちゅう、もはや才能', score: 4 },
        { label: 'たまに気づいてニヤける', score: 3 },
        { label: '言われないと気づかない', score: 2 },
        { label: 'ほぼゼロ、真面目に聞いている', score: 1 }
      ]
    },
    {
      text: 'グループLINEで下ネタスタンプが飛び交い始めた。あなたは？',
      options: [
        { label: '一番おかしいスタンプで会話を加速させる', score: 4 },
        { label: '普通にスタンプを返して参加する', score: 3 },
        { label: '既読だけつけてそっと見守る', score: 2 },
        { label: '「それ誰かに見られたら大変だよ」とツッコむ係', score: 1 }
      ]
    },
    {
      text: '自分の下ネタ耐性を自己採点するなら？',
      options: [
        { label: '免疫MAX、もはや余裕', score: 4 },
        { label: '平均的、普通に楽しめる', score: 3 },
        { label: 'ちょっと弱め、慣れてない', score: 2 },
        { label: 'そもそも興味の範囲外', score: 1 }
      ]
    }
  ];

  // ---- 通常結果(スコア 10〜40 を10段階に分割。idはリンクに使う短い合言葉) ----
  var NORMAL_RESULTS = [
    { id: 'n0', min: 10, max: 12, title: '天然ピュアさん', desc: '下ネタという概念そのものがあまり頭にないタイプ。裏の意味に気づかず、いつも素で会話しています。' },
    { id: 'n1', min: 13, max: 15, title: '健全すぎる人', desc: 'とても健全な反応をするタイプ。変な意味になかなか気づかない、素直な心の持ち主です。' },
    { id: 'n2', min: 16, max: 18, title: '素直系リアクター', desc: '言われたことをそのまま受け取る素直さが魅力。下ネタも深読みせず、まっすぐ受け止めます。' },
    { id: 'n3', min: 19, max: 21, title: '冷静なツッコミ職人', desc: '下ネタが出ても動じず、冷静にツッコミを入れられるタイプ。場を仕切る力があります。' },
    { id: 'n4', min: 22, max: 24, title: '空気を読む観察者', desc: '反応はしすぎず、でも状況はしっかり見ているタイプ。周りのノリに合わせるのが上手です。' },
    { id: 'n5', min: 25, max: 27, title: '実は結構反応しちゃう人', desc: '表面上は普通に見えるけど、実は下ネタにしっかり反応しているタイプ。顔には出さないだけ。' },
    { id: 'n6', min: 28, max: 30, title: '隠れノリノリさん', desc: '普段は大人しそうに見えて、実は下ネタが振られると内心テンションが上がるタイプです。' },
    { id: 'n7', min: 31, max: 33, title: '意味深察知能力者', desc: '何気ない言葉の裏にある意味を察知する能力が高め。ただし、考えすぎには注意。' },
    { id: 'n8', min: 34, max: 36, title: '下ネタセンサー高感度', desc: 'どんな言葉からも下ネタの気配を感じ取れる高性能センサーの持ち主。反応速度も抜群です。' },
    { id: 'n9', min: 37, max: 40, title: '下ネタ耐性MAX', desc: '下ネタに対する反応速度も理解度も最強クラス。友達の間でも「下ネタ担当」として頼られる存在かも。' }
  ];

  // ---- 隠し結果(答え方のパターンで判定。全部で10種類) ----
  var HIDDEN_RESULTS = {
    allA: { id: 'allA', title: '下ネタの申し子', desc: '10問全部で全力の反応。もはや下ネタ界のレジェンドと言っても過言ではありません。', isHidden: true },
    allB: { id: 'allB', title: '永遠の中間管理職', desc: '全問「ちょっと笑う」を選んだあなたは、どんな時も程よい距離感をキープする調整型。', isHidden: true },
    allC: { id: 'allC', title: '苦笑いマスター', desc: '全問「苦笑い」。気まずさを一身に受け止める表情筋には拍手を送りたいところです。', isHidden: true },
    allD: { id: 'allD', title: '聖人モード', desc: '全問「冷静」を選んだあなたは、もはや悟りの境地。下ネタなど風のように通り過ぎていきます。', isHidden: true },
    frontAbackD: { id: 'frontAbackD', title: 'だんだん冷める人', desc: '序盤はノリノリだったのに、後半急に冷静になるタイプ。テンションの落差が最大の武器。', isHidden: true },
    frontDbackA: { id: 'frontDbackA', title: 'だんだん乗ってくる人', desc: '最初は淡々としているのに、後半どんどんノッてくるタイプ。助走が長い分、加速力がすごい。', isHidden: true },
    altAD: { id: 'altAD', title: 'ツンデレタイプ', desc: 'ノる→冷静→ノる→冷静…を繰り返す、まさかのツンデレパターン。周りを振り回しているのは無自覚かも。', isHidden: true },
    altDA: { id: 'altDA', title: '小悪魔タイプ', desc: '冷静→ノる→冷静→ノる…を繰り返す、緩急自在の小悪魔タイプ。掴みどころのなさが逆に魅力です。', isHidden: true },
    extreme: { id: 'extreme', title: '両極端な人', desc: '反応がAかDにきっぱり分かれるあなたは、中間がない両極端タイプ。白黒はっきりさせたい性格かも。', isHidden: true },
    unpredictable: { id: 'unpredictable', title: '予測不能な人', desc: '4つの選択肢を満遍なく使う、読めないタイプ。次にどう反応するか、友達も予想できないはずです。', isHidden: true }
  };

  // ---- 状態(今何問目か、これまでの答えを記録しておく箱) ----
  var state = {
    currentIndex: 0,
    totalScore: 0,
    answers: [],
    userName: ''
  };

  var currentResultData = null; // { name, title, desc, percent, id }
  var currentShareUrl = '';
  var currentShareText = '';
  var currentImageDataUrl = '';

  // ---- DOM参照 ----
  var startScreen = document.getElementById('start-screen');
  var quizScreen = document.getElementById('quiz-screen');
  var resultScreen = document.getElementById('result-screen');

  var nameInput = document.getElementById('name-input');
  var startBtn = document.getElementById('start-btn');

  var progressText = document.getElementById('progress-text');
  var progressFill = document.getElementById('progress-fill');
  var quizCard = document.getElementById('quiz-card');
  var questionText = document.getElementById('question-text');
  var optionsContainer = document.getElementById('options-container');
  var backBtn = document.getElementById('back-btn');

  var resultLead = document.getElementById('result-lead');
  var rareBadge = document.getElementById('rare-badge');
  var resultTitle = document.getElementById('result-title');
  var resultDesc = document.getElementById('result-desc');
  var gaugePercent = document.getElementById('gauge-percent');
  var gaugeFill = document.getElementById('gauge-fill');
  var resultImage = document.getElementById('result-image');

  var saveImageBtn = document.getElementById('save-image-btn');
  var snsLineBtn = document.getElementById('sns-line-btn');
  var snsXBtn = document.getElementById('sns-x-btn');
  var snsFbBtn = document.getElementById('sns-fb-btn');
  var copyLinkBtn = document.getElementById('copy-link-btn');
  var restartBtn = document.getElementById('restart-btn');
  var copyToast = document.getElementById('copy-toast');

  // ============ 画面切り替え ============

  function showScreen(screen) {
    [startScreen, quizScreen, resultScreen].forEach(function (s) {
      s.classList.remove('active');
    });
    screen.classList.add('active');
  }

  function resetState() {
    state.currentIndex = 0;
    state.totalScore = 0;
    state.answers = [];
  }

  function startQuiz() {
    var typedName = nameInput.value.trim();
    state.userName = typedName || '匿名希望';
    resetState();
    showScreen(quizScreen);
    renderQuestion();
  }

  // ============ 質問の表示 ============

  function renderQuestion() {
    var q = QUESTIONS[state.currentIndex];

    progressText.textContent = 'Q' + (state.currentIndex + 1) + ' / 10';
    var pct = (state.currentIndex / QUESTIONS.length) * 100;
    progressFill.style.width = pct + '%';

    questionText.textContent = q.text;
    optionsContainer.innerHTML = '';
    backBtn.classList.toggle('hidden', state.currentIndex === 0);

    var letters = ['A', 'B', 'C', 'D'];
    q.options.forEach(function (opt, i) {
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'option-btn';

      var letterSpan = document.createElement('span');
      letterSpan.className = 'option-letter';
      letterSpan.textContent = letters[i];

      var labelSpan = document.createElement('span');
      labelSpan.textContent = opt.label;

      btn.appendChild(letterSpan);
      btn.appendChild(labelSpan);

      btn.addEventListener('click', function () {
        handleAnswer(btn, i, opt.score);
      });

      optionsContainer.appendChild(btn);
    });

    quizCard.classList.remove('question-enter');
    void quizCard.offsetWidth; // アニメーションをもう一度再生させるためのおまじない
    quizCard.classList.add('question-enter');
  }

  function handleAnswer(btnEl, optionIndex, score) {
    var allBtns = optionsContainer.querySelectorAll('.option-btn');
    allBtns.forEach(function (b) { b.disabled = true; });

    btnEl.classList.add('selected');
    state.totalScore += score;
    state.answers.push(optionIndex); // 0=A,1=B,2=C,3=D を記録

    setTimeout(function () {
      state.currentIndex++;
      if (state.currentIndex < QUESTIONS.length) {
        renderQuestion();
      } else {
        finishQuiz();
      }
    }, 280);
  }

  function goToPreviousQuestion() {
    if (state.currentIndex === 0) return;

    var previousIndex = state.currentIndex - 1;
    var previousAnswer = state.answers.pop();
    state.totalScore -= QUESTIONS[previousIndex].options[previousAnswer].score;
    state.currentIndex = previousIndex;

    renderQuestion();
  }

  // ============ 隠し結果の判定 ============

  function countLetters(answers) {
    var c = [0, 0, 0, 0];
    answers.forEach(function (a) { c[a]++; });
    return { A: c[0], B: c[1], C: c[2], D: c[3] };
  }

  function isAlternating(answers, evenValue, oddValue) {
    return answers.every(function (a, i) {
      return i % 2 === 0 ? a === evenValue : a === oddValue;
    });
  }

  function detectHiddenResult(answers) {
    var c = countLetters(answers);
    var front = answers.slice(0, 5);
    var back = answers.slice(5);

    if (c.A === 10) return HIDDEN_RESULTS.allA;
    if (c.B === 10) return HIDDEN_RESULTS.allB;
    if (c.C === 10) return HIDDEN_RESULTS.allC;
    if (c.D === 10) return HIDDEN_RESULTS.allD;

    if (front.every(function (a) { return a === 0; }) && back.every(function (a) { return a === 3; })) {
      return HIDDEN_RESULTS.frontAbackD;
    }
    if (front.every(function (a) { return a === 3; }) && back.every(function (a) { return a === 0; })) {
      return HIDDEN_RESULTS.frontDbackA;
    }

    if (isAlternating(answers, 0, 3)) return HIDDEN_RESULTS.altAD;
    if (isAlternating(answers, 3, 0)) return HIDDEN_RESULTS.altDA;

    if (c.A === 5 && c.D === 5 && c.B === 0 && c.C === 0) return HIDDEN_RESULTS.extreme;

    if (c.A >= 2 && c.B >= 2 && c.C >= 2 && c.D >= 2 && answers[0] === answers[9]) {
      return HIDDEN_RESULTS.unpredictable;
    }

    return null;
  }

  function pickNormalResult(score) {
    var found = NORMAL_RESULTS.find(function (r) {
      return score >= r.min && score <= r.max;
    });
    return found || NORMAL_RESULTS[NORMAL_RESULTS.length - 1];
  }

  function findResultById(id) {
    var normal = NORMAL_RESULTS.find(function (r) { return r.id === id; });
    if (normal) return normal;
    if (HIDDEN_RESULTS[id]) return HIDDEN_RESULTS[id];
    return null;
  }

  // ============ 結果画面の表示(自分の診断結果 / 共有リンクからの表示 共通) ============

  function finishQuiz() {
    progressText.textContent = 'Q10 / 10';
    progressFill.style.width = '100%';

    var result = detectHiddenResult(state.answers) || pickNormalResult(state.totalScore);
    var percent = Math.round((state.totalScore / 40) * 100);

    renderResultScreen({
      id: result.id,
      name: state.userName,
      title: result.title,
      desc: result.desc,
      percent: percent,
      isHidden: !!result.isHidden
    }, 'own');
  }

  function renderResultScreen(data, mode) {
    currentResultData = data;

    resultLead.textContent = data.name + 'さんの診断結果は……';
    resultTitle.textContent = data.title;
    resultDesc.textContent = data.desc;
    gaugePercent.textContent = data.percent + '%';
    rareBadge.classList.toggle('hidden', !data.isHidden);

    showScreen(resultScreen);

    gaugeFill.style.width = '0%';
    copyToast.classList.remove('show');
    setTimeout(function () {
      gaugeFill.style.width = data.percent + '%';
    }, 100);

    currentImageDataUrl = createResultImageDataUrl(data);
    resultImage.src = currentImageDataUrl;

    currentShareUrl = mode === 'shared' ? window.location.href : buildShareUrl(data.id, data.percent, data.name);
    currentShareText = data.name + 'さんが下ネタ診断をやったら「' + data.title + '」でした！あなたは何タイプ？';

    restartBtn.textContent = mode === 'shared' ? '自分も診断してみる！' : 'もう一回やる';
  }

  // ============ 共有リンクの作成 / 読み取り ============

  function buildShareUrl(id, percent, name) {
    var base = window.location.origin + window.location.pathname;
    return base + '?r=' + id + '&p=' + percent + '&n=' + encodeURIComponent(name);
  }

  function readSharedResultFromUrl() {
    var params = new URLSearchParams(window.location.search);
    var id = params.get('r');
    var percentRaw = params.get('p');
    var nameRaw = params.get('n');

    if (!id || !percentRaw) return null;

    var result = findResultById(id);
    if (!result) return null;

    var percent = parseInt(percentRaw, 10);
    if (isNaN(percent)) return null;
    percent = Math.max(0, Math.min(100, percent));

    var name = nameRaw ? decodeURIComponent(nameRaw) : '匿名希望';

    return {
      id: result.id,
      name: name,
      title: result.title,
      desc: result.desc,
      percent: percent,
      isHidden: !!result.isHidden
    };
  }

  // ============ 結果画像の生成(その場で見せる用・保存用を兼ねる) ============

  function wrapCanvasText(ctx, text, x, y, maxWidth, lineHeight) {
    var line = '';
    var lines = [];
    for (var i = 0; i < text.length; i++) {
      var testLine = line + text[i];
      if (ctx.measureText(testLine).width > maxWidth && line !== '') {
        lines.push(line);
        line = text[i];
      } else {
        line = testLine;
      }
    }
    lines.push(line);
    lines.forEach(function (l, idx) {
      ctx.fillText(l, x, y + idx * lineHeight);
    });
    return lines.length;
  }

  function drawRoundedRect(ctx, x, y, width, height, radius) {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.arcTo(x + width, y, x + width, y + height, radius);
    ctx.arcTo(x + width, y + height, x, y + height, radius);
    ctx.arcTo(x, y + height, x, y, radius);
    ctx.arcTo(x, y, x + width, y, radius);
    ctx.closePath();
  }

  function createResultImageDataUrl(data) {
    var size = 1080;
    var canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    var ctx = canvas.getContext('2d');
    var fontFamily = '"Hiragino Maru Gothic ProN", "Yu Gothic", Meiryo, sans-serif';

    // 背景
    var bgGradient = ctx.createLinearGradient(0, 0, size, size);
    bgGradient.addColorStop(0, '#4a2a7a');
    bgGradient.addColorStop(1, '#e6398a');
    ctx.fillStyle = bgGradient;
    ctx.fillRect(0, 0, size, size);

    // サイトタイトル
    ctx.fillStyle = '#ffffff';
    ctx.font = '700 46px ' + fontFamily;
    ctx.textAlign = 'center';
    ctx.fillText('下ネタ診断！！', size / 2, 100);

    // 白いカード
    var cardX = 60, cardY = 150, cardW = size - 120, cardH = 830;
    ctx.fillStyle = '#ffffff';
    drawRoundedRect(ctx, cardX, cardY, cardW, cardH, 32);
    ctx.fill();

    // リード文(名前入り)
    ctx.fillStyle = '#7a6d8c';
    ctx.font = '700 28px ' + fontFamily;
    ctx.fillText(data.name + 'さんの診断結果は……', size / 2, cardY + 80);

    // 激レア(隠し結果)バッジ
    if (data.isHidden) {
      var badgeText = '★ 激レア隠し結果 ★';
      ctx.font = '900 26px ' + fontFamily;
      var badgeTextWidth = ctx.measureText(badgeText).width;
      var badgePadX = 24, badgeH = 48;
      var badgeW = badgeTextWidth + badgePadX * 2;
      var badgeX = size / 2 - badgeW / 2;
      var badgeY = cardY + 105;
      var badgeGradient = ctx.createLinearGradient(badgeX, 0, badgeX + badgeW, 0);
      badgeGradient.addColorStop(0, '#ffd23f');
      badgeGradient.addColorStop(1, '#ffb347');
      ctx.fillStyle = badgeGradient;
      drawRoundedRect(ctx, badgeX, badgeY, badgeW, badgeH, badgeH / 2);
      ctx.fill();
      ctx.fillStyle = '#5a3b00';
      ctx.fillText(badgeText, size / 2, badgeY + badgeH / 2 + 2);
    }

    var blockOffset = data.isHidden ? 55 : 0;

    // 結果タイトル
    ctx.fillStyle = '#e6398a';
    ctx.font = '900 58px ' + fontFamily;
    ctx.fillText(data.title, size / 2, cardY + 170 + blockOffset);

    // 説明文(中央寄せで折り返し)
    ctx.fillStyle = '#2b1a3d';
    ctx.font = '400 32px ' + fontFamily;
    ctx.textAlign = 'left';
    wrapCanvasText(ctx, data.desc, cardX + 60, cardY + 250 + blockOffset, cardW - 120, 46);

    // ゲージ
    var gaugeX = cardX + 60, gaugeY = cardY + 560 + blockOffset, gaugeW = cardW - 120, gaugeH = 40;
    ctx.textAlign = 'left';
    ctx.fillStyle = '#7a6d8c';
    ctx.font = '700 28px ' + fontFamily;
    ctx.fillText('下ネタ反応度', gaugeX, gaugeY - 16);

    ctx.textAlign = 'right';
    ctx.fillStyle = '#e6398a';
    ctx.font = '900 30px ' + fontFamily;
    ctx.fillText(data.percent + '%', gaugeX + gaugeW, gaugeY - 16);

    ctx.fillStyle = '#f0eaf5';
    drawRoundedRect(ctx, gaugeX, gaugeY, gaugeW, gaugeH, gaugeH / 2);
    ctx.fill();

    var fillWidth = Math.max(gaugeH, gaugeW * (data.percent / 100));
    var gaugeGradient = ctx.createLinearGradient(gaugeX, 0, gaugeX + gaugeW, 0);
    gaugeGradient.addColorStop(0, '#8b5cf6');
    gaugeGradient.addColorStop(1, '#ff5fa2');
    ctx.fillStyle = gaugeGradient;
    drawRoundedRect(ctx, gaugeX, gaugeY, fillWidth, gaugeH, gaugeH / 2);
    ctx.fill();

    // フッター
    ctx.textAlign = 'center';
    ctx.fillStyle = '#b8a9c9';
    ctx.font = '700 26px ' + fontFamily;
    ctx.fillText('あなたも診断してみよう', size / 2, cardY + cardH - 40);

    return canvas.toDataURL('image/png');
  }

  // ============ 画像保存・SNSシェア・リンクコピー ============

  function handleSaveImage() {
    var link = document.createElement('a');
    link.href = currentImageDataUrl;
    link.download = 'shindan-result.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // 環境によっては自動保存が効かないので、手動保存の案内も出しておく
    showCopyToast('保存できない場合は、上の画像を長押し(PCなら右クリック)して保存してね');
  }

  function handleShareLine() {
    var url = 'https://line.me/R/msg/text/?' + encodeURIComponent(currentShareText + '\n' + currentShareUrl);
    window.open(url, '_blank');
  }

  function handleShareX() {
    var url = 'https://twitter.com/intent/tweet?text=' + encodeURIComponent(currentShareText) + '&url=' + encodeURIComponent(currentShareUrl);
    window.open(url, '_blank');
  }

  function handleShareFacebook() {
    var url = 'https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(currentShareUrl) + '&quote=' + encodeURIComponent(currentShareText);
    window.open(url, '_blank');
  }

  function handleCopyLink() {
    copyTextFallback(currentShareText + '\n' + currentShareUrl, 'リンクをコピーしました！');
  }

  function copyTextFallback(text, message) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(function () {
        showCopyToast(message);
      }).catch(function () {
        legacyCopy(text, message);
      });
    } else {
      legacyCopy(text, message);
    }
  }

  function legacyCopy(text, message) {
    var textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();
    try {
      document.execCommand('copy');
      showCopyToast(message);
    } catch (e) {
      // コピーに失敗しても診断結果は表示されたままなので致命的ではない
    }
    document.body.removeChild(textarea);
  }

  function showCopyToast(message) {
    copyToast.textContent = message;
    copyToast.classList.add('show');
    setTimeout(function () {
      copyToast.classList.remove('show');
    }, 2400);
  }

  function restartQuiz() {
    resetState();
    showScreen(startScreen);
  }

  // ---- イベント登録 ----
  startBtn.addEventListener('click', startQuiz);
  backBtn.addEventListener('click', goToPreviousQuestion);
  saveImageBtn.addEventListener('click', handleSaveImage);
  snsLineBtn.addEventListener('click', handleShareLine);
  snsXBtn.addEventListener('click', handleShareX);
  snsFbBtn.addEventListener('click', handleShareFacebook);
  copyLinkBtn.addEventListener('click', handleCopyLink);
  restartBtn.addEventListener('click', restartQuiz);

  // ---- 起動時:共有リンクから開かれた場合はその結果をそのまま表示 ----
  var shared = readSharedResultFromUrl();
  if (shared) {
    renderResultScreen(shared, 'shared');
  }

})();
