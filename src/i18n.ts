export type Language = 'en' | 'zh' | 'es' | 'pt' | 'fr' | 'it' | 'de' | 'ja' | 'ko'

export const LANGUAGES: Array<{ code: Language; label: string; short: string }> = [
  { code: 'en', label: 'English', short: 'EN' },
  { code: 'zh', label: '中文', short: '中' },
  { code: 'es', label: 'Español', short: 'ES' },
  { code: 'pt', label: 'Português', short: 'PT' },
  { code: 'fr', label: 'Français', short: 'FR' },
  { code: 'it', label: 'Italiano', short: 'IT' },
  { code: 'de', label: 'Deutsch', short: 'DE' },
  { code: 'ja', label: '日本語', short: '日' },
  { code: 'ko', label: '한국어', short: '한' },
]

const localeMap: Record<Language, string> = {
  en: 'en',
  zh: 'zh-CN',
  es: 'es',
  pt: 'pt',
  fr: 'fr',
  it: 'it',
  de: 'de',
  ja: 'ja',
  ko: 'ko',
}

export interface Translation {
  seo: {
    title: string
    description: string
  }
  brand: {
    name: string
    tagline: string
  }
  nav: {
    play: string
    how: string
    features: string
    faq: string
    cta: string
  }
  play: {
    kicker: string
    title: string
    unique: string
    label: string
    instruction: string
    tipTitle: string
    tipBody: string
    carefulTitle: string
    carefulBody: string
  }
  controls: {
    undo: string
    restart: string
    share: string
    newGame: string
    copyTitle: string
    copied: string
    copyFailed: string
    difficulty: Record<'easy' | 'medium' | 'hard' | 'expert', string>
  }
  board: {
    rowCol: (row: number, col: number) => string
    starterCat: string
    conflicts: {
      row: string
      col: string
      region: string
      touch: string
    }
  }
  status: {
    again: string
    next: string
  }
  stats: {
    title: string
    totalWins: (wins: number) => string
    clear: string
    clearConfirm: string
    wins: (wins: number) => string
    emptyTime: string
  }
  hero: {
    kicker: string
    titleBefore: string
    titleAccent: string
    titleAfter: string
    body: string
    backToBoard: string
    rules: string
    statSizes: string
    statRandom: string
    statLogic: string
    preview: string
  }
  how: {
    eyebrow: string
    title: string
    body: string
    rules: Array<{ n: string; title: string; body: string }>
  }
  features: {
    eyebrow: string
    title: string
    items: Array<{ icon: string; title: string; body: string }>
  }
  faq: {
    eyebrow: string
    title: string
    body: string
    items: Array<{ q: string; a: string }>
  }
  footer: {
    body: string
    playTitle: string
    aboutTitle: string
    playLinks: string[]
    aboutLines: string[]
    copyright: string
  }
}

export const translations: Record<Language, Translation> = {
  en: {
    seo: {
      title: 'Meowdoku - Cat Logic Puzzle Game',
      description:
        'Play Meowdoku, a cozy cat logic puzzle. Place one cat in each colored region while avoiding row, column, and diagonal contact conflicts.',
    },
    brand: { name: 'Meowdoku', tagline: 'MEOW · PUZZLE' },
    nav: { play: 'Play', how: 'How to play', features: 'Features', faq: 'FAQ', cta: 'Play now' },
    play: {
      kicker: 'Meowdoku',
      title: 'Place the cats, solve the board',
      unique: 'Unique solution',
      label: 'How to play:',
      instruction:
        'Tap a cell to cycle Empty -> X -> Cat. Each row, column, and colored garden can hold only one cat, and cats cannot touch diagonally.',
      tipTitle: 'Tip',
      tipBody: 'Tap once to mark X, tap again to place a cat, tap again to clear. X marks are your deduction notes.',
      carefulTitle: 'Be careful',
      carefulBody: 'A wrong cat costs one heart. Use X marks first when you are unsure.',
    },
    controls: {
      undo: 'Undo',
      restart: 'Reset',
      share: 'Share',
      newGame: 'New',
      copyTitle: 'Copy this puzzle link',
      copied: 'Link copied. Send this puzzle to a friend.',
      copyFailed: 'Copy failed. Please copy the address manually.',
      difficulty: { easy: 'Easy', medium: 'Medium', hard: 'Hard', expert: 'Expert' },
    },
    board: {
      rowCol: (row, col) => `Row ${row}, column ${col}`,
      starterCat: 'starter cat',
      conflicts: {
        row: 'another cat is already in this row',
        col: 'another cat is already in this column',
        region: 'another cat is already in this colored region',
        touch: 'this cat is touching another cat',
      },
    },
    status: { again: 'Try again', next: 'Next puzzle' },
    stats: {
      title: 'My notes',
      totalWins: (wins) => `${wins} solved`,
      clear: 'Clear',
      clearConfirm: 'Clear all best records?',
      wins: (wins) => `Solved ${wins}`,
      emptyTime: '--',
    },
    hero: {
      kicker: 'A tiny cat logic ritual',
      titleBefore: 'Place every cat in the',
      titleAccent: 'right',
      titleAfter: 'spot',
      body:
        'Meowdoku is a gentle logic puzzle: each colored garden gets one cat, rows and columns cannot repeat, and diagonal neighbors need a little space.',
      backToBoard: 'Back to board',
      rules: 'Rules',
      statSizes: 'Board sizes',
      statRandom: 'Random puzzles',
      statLogic: 'Pure logic',
      preview: '4x4 preview',
    },
    how: {
      eyebrow: 'GAME RULES',
      title: 'Four rules to solve Meowdoku',
      body: 'Read these once and you are ready to play.',
      rules: [
        { n: '01', title: 'One cat per garden', body: 'Every colored region must contain exactly one cat.' },
        { n: '02', title: 'One per row and column', body: 'Each row and each column can contain at most one cat.' },
        { n: '03', title: 'No diagonal touching', body: 'Cats cannot sit in cells that touch diagonally.' },
        { n: '04', title: 'Logic only', body: 'Each generated puzzle is checked for a unique solution.' },
      ],
    },
    features: {
      eyebrow: "WHY YOU'LL STAY",
      title: 'Why Meowdoku invites one more round',
      items: [
        { icon: '🪷', title: 'Soft palette', body: 'Pastel cells keep the board calm and readable.' },
        { icon: '🎲', title: 'Endless puzzles', body: 'Puzzles are generated locally and checked for uniqueness.' },
        { icon: '❤️', title: 'Three hearts', body: 'Wrong cats cost hearts, so deduction matters.' },
        { icon: '↶', title: 'Undo and reset', body: 'Step back or restart without friction.' },
        { icon: '🌿', title: 'No ads', body: 'Just you, the board, and the cats.' },
        { icon: '⏱', title: 'Gentle timer', body: 'Track pace if you want, ignore it if you do not.' },
      ],
    },
    faq: {
      eyebrow: 'FAQ',
      title: 'Questions you may have',
      body: 'Most answers become clear after a couple of boards.',
      items: [
        { q: 'Is Meowdoku the same as Sudoku?', a: 'It shares row and column logic, but adds colored regions and no diagonal touching.' },
        { q: 'What happens when I place a wrong cat?', a: 'The cat is highlighted and you lose one heart.' },
        { q: 'Why does the first tap place an X?', a: 'Cells cycle through Empty -> X -> Cat -> Empty. X marks are notes.' },
        { q: 'How do difficulties differ?', a: 'They mainly change board size: 5x5, 6x6, 7x7, and 8x8.' },
        { q: 'Can I play offline?', a: 'Yes. Once loaded, puzzle generation and play happen in your browser.' },
      ],
    },
    footer: {
      body: 'A small logic game for placing cats and clearing your mind.',
      playTitle: 'Play',
      aboutTitle: 'About',
      playLinks: ['Start a puzzle', 'Game rules', 'Features', 'FAQ'],
      aboutLines: ['For cat people', 'For puzzle people', 'For people who are both'],
      copyright: 'A tiny exercise for a quieter mind',
    },
  },
  zh: {
    seo: {
      title: 'Meowdoku 喵多酷 - 猫咪逻辑谜题',
      description: '在线游玩 Meowdoku 喵多酷：在彩色区域里安顿小猫，避开同行、同列与对角接触。',
    },
    brand: { name: '喵多酷', tagline: 'MEOW · PUZZLE' },
    nav: { play: '开始玩', how: '怎么玩', features: '特色', faq: '常见问题', cta: '立刻撸猫' },
    play: {
      kicker: 'Meowdoku',
      title: '安顿小猫,解开这一局',
      unique: '唯一解',
      label: '玩法：',
      instruction: '点击格子在 空 -> × -> 猫 之间切换。每行、每列、每个彩色花园里都只能住一只猫,连斜对角也要保持距离。',
      tipTitle: '小贴士',
      tipBody: '点一下打 ×,再点一下放猫,再点一下擦掉。别小看那些 ×,它们是你的推理草稿。',
      carefulTitle: '更小心一点',
      carefulBody: '放错猫会扣一颗心。三颗用光就只能重来啦。不确定的时候,先打 × 排除一下。',
    },
    controls: {
      undo: '撤销',
      restart: '重置',
      share: '分享',
      newGame: '换局',
      copyTitle: '复制本局链接',
      copied: '链接已复制,发给好友挑战这一关吧',
      copyFailed: '复制失败,请手动复制地址栏',
      difficulty: { easy: '萌新', medium: '小试', hard: '进阶', expert: '硬核' },
    },
    board: {
      rowCol: (row, col) => `第 ${row} 行 第 ${col} 列`,
      starterCat: '开局提示猫',
      conflicts: { row: '同行已经有猫', col: '同列已经有猫', region: '同色花园已经有猫', touch: '和另一只猫贴得太近' },
    },
    status: { again: '再来一次', next: '下一局' },
    stats: {
      title: '我的小本本',
      totalWins: (wins) => `累计通关 ${wins} 次`,
      clear: '清空',
      clearConfirm: '确定清空所有最佳记录吗？',
      wins: (wins) => `通关 ${wins}`,
      emptyTime: '--',
    },
    hero: {
      kicker: '一只猫的逻辑修行',
      titleBefore: '把每只小猫',
      titleAccent: '安顿',
      titleAfter: '到刚刚好的位置',
      body: '喵多酷是一款温柔的逻辑谜题：每个彩色花园里只住一只猫，同行同列不能重复，连斜对角都得保持礼貌的小距离。',
      backToBoard: '回到棋盘',
      rules: '规则速览',
      statSizes: '不同尺寸',
      statRandom: '随机关卡',
      statLogic: '纯逻辑',
      preview: '4x4 预览',
    },
    how: {
      eyebrow: 'GAME RULES',
      title: '四条小规矩,撸猫到通关',
      body: '上手不用读说明书,看完这四张卡片你就已经会玩了。',
      rules: [
        { n: '01', title: '每个花园住一只', body: '盘面被分成若干个彩色花园，每个花园里有且只有一只小猫安家。' },
        { n: '02', title: '同行同列只一只', body: '同一横排、同一竖列也最多只能有一只猫。' },
        { n: '03', title: '对角不许贴脸', body: '猫咪之间在斜对角也不能紧贴。' },
        { n: '04', title: '只靠推理', body: '每一局都有唯一解，猜测在这里没有用武之地。' },
      ],
    },
    features: {
      eyebrow: "WHY YOU'LL STAY",
      title: '它为什么让人想再开一局',
      items: [
        { icon: '🪷', title: '禅意配色', body: '奶油底配上糖果色块,看着就让脑子先松弛下来。' },
        { icon: '🎲', title: '无限关卡', body: '关卡由算法实时生成,并验证过唯一解。' },
        { icon: '❤️', title: '三颗爱心', body: '放错小猫会扣一颗心,逼你认真推理。' },
        { icon: '↶', title: '撤销 / 重置', body: '走错路了？退一步,从那一刻继续就好。' },
        { icon: '🌿', title: '没有广告', body: '没有弹窗,没有广告,只有你和小猫。' },
        { icon: '⏱', title: '佛系计时', body: '时间只是参考,慢慢来。' },
      ],
    },
    faq: {
      eyebrow: 'FAQ',
      title: '那些你可能想问的问题',
      body: '大多数疑惑会在游戏里自己揭晓。',
      items: [
        { q: '这跟数独是一回事吗？', a: '思路类似,但这里多了彩色花园和斜对角不能贴脸。' },
        { q: '一只小猫放错了会怎样？', a: '会扣一颗爱心,并把那只猫高亮提醒你。' },
        { q: '为什么点一下出现 ×？', a: '点击是三态循环：空 -> 标记 -> 猫 -> 空。标记只是笔记。' },
        { q: '不同难度差在哪里？', a: '主要是盘面大小：5x5、6x6、7x7、8x8。' },
        { q: '我可以离线玩吗？', a: '可以。首次加载之后,玩法全在浏览器里跑。' },
      ],
    },
    footer: {
      body: '一个用来安顿小猫、也安顿自己脑子的小游戏。',
      playTitle: '玩起来',
      aboutTitle: '关于',
      playLinks: ['开始一局', '游戏规则', '特色', '常见问题'],
      aboutLines: ['致敬喜欢猫的人', '致敬喜欢谜题的人', '致敬两样都喜欢的人'],
      copyright: '一份让脑子小憩一下的练习',
    },
  },
  es: undefined as never,
  pt: undefined as never,
  fr: undefined as never,
  it: undefined as never,
  de: undefined as never,
  ja: undefined as never,
  ko: undefined as never,
}

function fromEnglish(overrides: Partial<Translation>): Translation {
  return { ...translations.en, ...overrides } as Translation
}

translations.es = fromEnglish({
  seo: { title: 'Meowdoku - Juego de lógica con gatos', description: 'Juega Meowdoku: coloca un gato en cada región de color sin conflictos de fila, columna o diagonal.' },
  brand: { name: 'Meowdoku', tagline: 'MEOW · PUZZLE' },
  nav: { play: 'Jugar', how: 'Reglas', features: 'Funciones', faq: 'FAQ', cta: 'Jugar' },
  play: { ...translations.en.play, title: 'Coloca los gatos y resuelve el tablero', unique: 'Solución única', label: 'Cómo jugar:', instruction: 'Toca una casilla para alternar Vacía -> X -> Gato. Cada fila, columna y región de color solo puede tener un gato, y no pueden tocarse en diagonal.' },
  controls: { ...translations.en.controls, undo: 'Deshacer', restart: 'Reiniciar', share: 'Compartir', newGame: 'Nueva', copyTitle: 'Copiar enlace', copied: 'Enlace copiado.', copyFailed: 'No se pudo copiar.', difficulty: { easy: 'Fácil', medium: 'Media', hard: 'Difícil', expert: 'Experto' } },
  board: { ...translations.en.board, rowCol: (r, c) => `Fila ${r}, columna ${c}`, starterCat: 'gato inicial', conflicts: { row: 'ya hay un gato en esta fila', col: 'ya hay un gato en esta columna', region: 'ya hay un gato en esta región', touch: 'este gato toca a otro' } },
  status: { again: 'Otra vez', next: 'Siguiente' },
  hero: { ...translations.en.hero, titleBefore: 'Pon cada gato en el lugar ', titleAccent: 'correcto', titleAfter: '', body: 'Meowdoku es un rompecabezas lógico: cada región de color recibe un gato, sin repetir filas ni columnas y sin tocarse en diagonal.', backToBoard: 'Volver al tablero', rules: 'Reglas' },
  how: { ...translations.en.how, title: 'Cuatro reglas para resolver Meowdoku', body: 'Léelas una vez y ya puedes jugar.', rules: [
    { n: '01', title: 'Un gato por región', body: 'Cada región de color contiene exactamente un gato.' },
    { n: '02', title: 'Uno por fila y columna', body: 'Cada fila y columna puede tener como máximo un gato.' },
    { n: '03', title: 'Sin diagonales', body: 'Los gatos no pueden tocarse en diagonal.' },
    { n: '04', title: 'Solo lógica', body: 'Cada tablero se comprueba con solución única.' },
  ] },
  faq: { ...translations.en.faq, title: 'Preguntas frecuentes', body: 'La mayoría se aclara tras jugar un par de tableros.' },
  footer: { ...translations.en.footer, body: 'Un pequeño juego lógico para colocar gatos y despejar la mente.', playTitle: 'Jugar', aboutTitle: 'Acerca de', copyright: 'Un ejercicio pequeño para una mente tranquila' },
})
translations.pt = fromEnglish({
  seo: { title: 'Meowdoku - Jogo de lógica com gatos', description: 'Jogue Meowdoku: coloque um gato em cada região colorida sem conflitos de linha, coluna ou diagonal.' },
  nav: { play: 'Jogar', how: 'Regras', features: 'Recursos', faq: 'FAQ', cta: 'Jogar' },
  play: { ...translations.en.play, title: 'Coloque os gatos e resolva o tabuleiro', unique: 'Solução única', label: 'Como jogar:', instruction: 'Toque em uma célula para alternar Vazio -> X -> Gato. Cada linha, coluna e região colorida pode ter só um gato, sem contato diagonal.' },
  controls: { ...translations.en.controls, undo: 'Desfazer', restart: 'Reiniciar', share: 'Compartilhar', newGame: 'Novo', copyTitle: 'Copiar link', copied: 'Link copiado.', copyFailed: 'Falha ao copiar.', difficulty: { easy: 'Fácil', medium: 'Médio', hard: 'Difícil', expert: 'Expert' } },
  board: { ...translations.en.board, rowCol: (r, c) => `Linha ${r}, coluna ${c}`, starterCat: 'gato inicial', conflicts: { row: 'já há um gato nesta linha', col: 'já há um gato nesta coluna', region: 'já há um gato nesta região', touch: 'este gato está tocando outro' } },
  status: { again: 'Tentar de novo', next: 'Próximo' },
  hero: { ...translations.en.hero, titleBefore: 'Coloque cada gato no lugar ', titleAccent: 'certo', titleAfter: '', body: 'Meowdoku é um puzzle lógico suave: uma região colorida, um gato, sem repetir linha ou coluna e sem contato diagonal.', backToBoard: 'Voltar ao tabuleiro', rules: 'Regras' },
  how: { ...translations.en.how, title: 'Quatro regras para resolver Meowdoku', body: 'Leia uma vez e comece a jogar.' },
  faq: { ...translations.en.faq, title: 'Perguntas frequentes', body: 'A maioria das respostas aparece depois de alguns tabuleiros.' },
  footer: { ...translations.en.footer, body: 'Um pequeno jogo lógico para colocar gatos e acalmar a mente.', playTitle: 'Jogar', aboutTitle: 'Sobre', copyright: 'Um pequeno exercício para uma mente mais calma' },
})
translations.fr = fromEnglish({
  seo: { title: 'Meowdoku - Jeu de logique avec des chats', description: 'Jouez à Meowdoku : placez un chat dans chaque région colorée sans conflit de ligne, colonne ou diagonale.' },
  nav: { play: 'Jouer', how: 'Règles', features: 'Atouts', faq: 'FAQ', cta: 'Jouer' },
  play: { ...translations.en.play, title: 'Placez les chats et résolvez la grille', unique: 'Solution unique', label: 'Règle:', instruction: 'Touchez une case pour alterner Vide -> X -> Chat. Chaque ligne, colonne et région colorée ne peut contenir qu’un chat, sans contact diagonal.' },
  controls: { ...translations.en.controls, undo: 'Annuler', restart: 'Recommencer', share: 'Partager', newGame: 'Nouveau', copyTitle: 'Copier le lien', copied: 'Lien copié.', copyFailed: 'Copie impossible.', difficulty: { easy: 'Facile', medium: 'Moyen', hard: 'Difficile', expert: 'Expert' } },
  board: { ...translations.en.board, rowCol: (r, c) => `Ligne ${r}, colonne ${c}`, starterCat: 'chat de départ', conflicts: { row: 'un chat est déjà sur cette ligne', col: 'un chat est déjà dans cette colonne', region: 'un chat est déjà dans cette région', touch: 'ce chat touche un autre chat' } },
  status: { again: 'Rejouer', next: 'Suivant' },
  hero: { ...translations.en.hero, titleBefore: 'Placez chaque chat au ', titleAccent: 'bon', titleAfter: ' endroit', body: 'Meowdoku est un puzzle logique doux: une région colorée, un chat, aucune répétition de ligne ou colonne, aucun contact diagonal.', backToBoard: 'Retour à la grille', rules: 'Règles' },
  how: { ...translations.en.how, title: 'Quatre règles pour résoudre Meowdoku', body: 'Lisez-les une fois et vous pouvez jouer.' },
  faq: { ...translations.en.faq, title: 'Questions fréquentes', body: 'La plupart des réponses viennent après quelques grilles.' },
  footer: { ...translations.en.footer, body: 'Un petit jeu de logique pour placer des chats et se vider l’esprit.', playTitle: 'Jouer', aboutTitle: 'À propos', copyright: 'Un petit exercice pour un esprit plus calme' },
})
translations.it = fromEnglish({
  seo: { title: 'Meowdoku - Gioco logico con gatti', description: 'Gioca a Meowdoku: metti un gatto in ogni regione colorata evitando righe, colonne e diagonali.' },
  nav: { play: 'Gioca', how: 'Regole', features: 'Funzioni', faq: 'FAQ', cta: 'Gioca' },
  play: { ...translations.en.play, title: 'Sistema i gatti e risolvi la griglia', unique: 'Soluzione unica', label: 'Come giocare:', instruction: 'Tocca una casella per passare da Vuota -> X -> Gatto. Ogni riga, colonna e regione colorata può avere un solo gatto, senza contatto diagonale.' },
  controls: { ...translations.en.controls, undo: 'Annulla', restart: 'Riavvia', share: 'Condividi', newGame: 'Nuovo', copyTitle: 'Copia link', copied: 'Link copiato.', copyFailed: 'Copia fallita.', difficulty: { easy: 'Facile', medium: 'Medio', hard: 'Difficile', expert: 'Esperto' } },
  board: { ...translations.en.board, rowCol: (r, c) => `Riga ${r}, colonna ${c}`, starterCat: 'gatto iniziale', conflicts: { row: 'c’è già un gatto in questa riga', col: 'c’è già un gatto in questa colonna', region: 'c’è già un gatto in questa regione', touch: 'questo gatto tocca un altro gatto' } },
  status: { again: 'Riprova', next: 'Prossimo' },
  hero: { ...translations.en.hero, titleBefore: 'Metti ogni gatto nel posto ', titleAccent: 'giusto', titleAfter: '', body: 'Meowdoku è un puzzle logico rilassante: una regione colorata, un gatto, niente duplicati in righe o colonne e niente diagonali.' },
  how: { ...translations.en.how, title: 'Quattro regole per risolvere Meowdoku', body: 'Leggile una volta e puoi iniziare.' },
  faq: { ...translations.en.faq, title: 'Domande frequenti', body: 'Molte risposte arrivano dopo qualche partita.' },
  footer: { ...translations.en.footer, body: 'Un piccolo gioco logico per sistemare gatti e liberare la mente.', playTitle: 'Gioca', aboutTitle: 'Info', copyright: 'Un piccolo esercizio per una mente più calma' },
})
translations.de = fromEnglish({
  seo: { title: 'Meowdoku - Katzen-Logikrätsel', description: 'Spiele Meowdoku: Setze eine Katze in jede farbige Region ohne Reihen-, Spalten- oder Diagonalkonflikte.' },
  nav: { play: 'Spielen', how: 'Regeln', features: 'Features', faq: 'FAQ', cta: 'Spielen' },
  play: { ...translations.en.play, title: 'Setze die Katzen und löse das Feld', unique: 'Eindeutige Lösung', label: 'So geht es:', instruction: 'Tippe ein Feld, um Leer -> X -> Katze zu wechseln. Jede Reihe, Spalte und Farbregion darf nur eine Katze haben, ohne diagonale Berührung.' },
  controls: { ...translations.en.controls, undo: 'Zurück', restart: 'Neustart', share: 'Teilen', newGame: 'Neu', copyTitle: 'Link kopieren', copied: 'Link kopiert.', copyFailed: 'Kopieren fehlgeschlagen.', difficulty: { easy: 'Leicht', medium: 'Mittel', hard: 'Schwer', expert: 'Experte' } },
  board: { ...translations.en.board, rowCol: (r, c) => `Reihe ${r}, Spalte ${c}`, starterCat: 'Startkatze', conflicts: { row: 'in dieser Reihe ist schon eine Katze', col: 'in dieser Spalte ist schon eine Katze', region: 'in dieser Region ist schon eine Katze', touch: 'diese Katze berührt eine andere' } },
  status: { again: 'Nochmal', next: 'Nächstes' },
  hero: { ...translations.en.hero, titleBefore: 'Setze jede Katze an den ', titleAccent: 'richtigen', titleAfter: ' Platz', body: 'Meowdoku ist ein ruhiges Logikrätsel: eine Farbregion, eine Katze, keine Wiederholung in Reihen oder Spalten und keine Diagonalen.' },
  how: { ...translations.en.how, title: 'Vier Regeln für Meowdoku', body: 'Einmal lesen, dann losspielen.' },
  faq: { ...translations.en.faq, title: 'Häufige Fragen', body: 'Viele Antworten zeigen sich nach ein paar Feldern.' },
  footer: { ...translations.en.footer, body: 'Ein kleines Logikspiel zum Katzenplatzieren und Abschalten.', playTitle: 'Spielen', aboutTitle: 'Über', copyright: 'Eine kleine Übung für einen ruhigeren Kopf' },
})
translations.ja = fromEnglish({
  seo: { title: 'Meowdoku - 猫のロジックパズル', description: 'Meowdoku をプレイ。色付きエリアに猫を1匹ずつ置き、行・列・斜め接触を避けます。' },
  brand: { name: 'Meowdoku', tagline: 'MEOW · PUZZLE' },
  nav: { play: 'プレイ', how: 'ルール', features: '特徴', faq: 'FAQ', cta: 'プレイ' },
  play: { ...translations.en.play, title: '猫を置いて盤面を解こう', unique: '唯一解', label: '遊び方:', instruction: 'マスをタップして 空 -> X -> 猫 を切り替えます。各行・列・色エリアには猫は1匹だけ。斜めにも接触できません。' },
  controls: { ...translations.en.controls, undo: '戻す', restart: 'リセット', share: '共有', newGame: '新規', copyTitle: 'リンクをコピー', copied: 'リンクをコピーしました。', copyFailed: 'コピーできませんでした。', difficulty: { easy: '初級', medium: '中級', hard: '上級', expert: '達人' } },
  board: { ...translations.en.board, rowCol: (r, c) => `${r}行 ${c}列`, starterCat: '初期猫', conflicts: { row: '同じ行に猫がいます', col: '同じ列に猫がいます', region: '同じ色エリアに猫がいます', touch: '他の猫に近すぎます' } },
  status: { again: 'もう一度', next: '次へ' },
  hero: { ...translations.en.hero, titleBefore: 'すべての猫を', titleAccent: '正しい', titleAfter: '場所へ', body: 'Meowdoku はやさしいロジックパズルです。色エリアに猫を1匹ずつ置き、行・列・斜め接触を避けます。', backToBoard: '盤面へ戻る', rules: 'ルール' },
  how: { ...translations.en.how, title: 'Meowdoku の4つのルール', body: '一度読めばすぐ遊べます。', rules: [
    { n: '01', title: '各エリアに猫1匹', body: '各色エリアには必ず猫が1匹入ります。' },
    { n: '02', title: '行と列に1匹まで', body: '同じ行・列に猫を複数置けません。' },
    { n: '03', title: '斜め接触なし', body: '猫同士は斜めに接してはいけません。' },
    { n: '04', title: '論理だけ', body: '各パズルは唯一解として確認されています。' },
  ] },
  features: { ...translations.en.features, title: 'もう一局遊びたくなる理由' },
  faq: { ...translations.en.faq, title: 'よくある質問', body: '数回遊ぶと多くの疑問は自然に解けます。' },
  footer: { ...translations.en.footer, body: '猫を置いて頭を整える小さなロジックゲーム。', playTitle: 'プレイ', aboutTitle: '概要', copyright: '静かな頭のための小さな練習' },
})
translations.ko = fromEnglish({
  seo: { title: 'Meowdoku - 고양이 논리 퍼즐', description: 'Meowdoku를 플레이하세요. 각 색 영역에 고양이 한 마리를 놓고 행, 열, 대각선 충돌을 피하세요.' },
  nav: { play: '플레이', how: '규칙', features: '특징', faq: 'FAQ', cta: '플레이' },
  play: { ...translations.en.play, title: '고양이를 놓고 퍼즐 풀기', unique: '유일해', label: '방법:', instruction: '칸을 눌러 빈칸 -> X -> 고양이로 전환합니다. 각 행, 열, 색 영역에는 고양이 한 마리만 놓을 수 있고 대각선으로 닿으면 안 됩니다.' },
  controls: { ...translations.en.controls, undo: '되돌리기', restart: '초기화', share: '공유', newGame: '새 게임', copyTitle: '링크 복사', copied: '링크를 복사했습니다.', copyFailed: '복사에 실패했습니다.', difficulty: { easy: '쉬움', medium: '보통', hard: '어려움', expert: '전문가' } },
  board: { ...translations.en.board, rowCol: (r, c) => `${r}행 ${c}열`, starterCat: '시작 고양이', conflicts: { row: '같은 행에 고양이가 있습니다', col: '같은 열에 고양이가 있습니다', region: '같은 색 영역에 고양이가 있습니다', touch: '다른 고양이와 너무 가깝습니다' } },
  status: { again: '다시 하기', next: '다음' },
  hero: { ...translations.en.hero, titleBefore: '모든 고양이를 ', titleAccent: '알맞은', titleAfter: ' 자리에', body: 'Meowdoku는 편안한 논리 퍼즐입니다. 각 색 영역에 고양이 한 마리를 놓고 행, 열, 대각선 접촉을 피하세요.', backToBoard: '보드로 돌아가기', rules: '규칙' },
  how: { ...translations.en.how, title: 'Meowdoku의 네 가지 규칙', body: '한 번 읽으면 바로 플레이할 수 있습니다.', rules: [
    { n: '01', title: '영역마다 고양이 한 마리', body: '각 색 영역에는 정확히 한 마리의 고양이가 있어야 합니다.' },
    { n: '02', title: '행과 열마다 한 마리', body: '같은 행이나 열에는 고양이를 여러 마리 놓을 수 없습니다.' },
    { n: '03', title: '대각선 접촉 금지', body: '고양이끼리 대각선으로 닿으면 안 됩니다.' },
    { n: '04', title: '논리만 사용', body: '각 퍼즐은 유일해가 확인됩니다.' },
  ] },
  features: { ...translations.en.features, title: '한 판 더 하고 싶어지는 이유' },
  faq: { ...translations.en.faq, title: '자주 묻는 질문', body: '몇 판 플레이하면 대부분 자연스럽게 이해됩니다.' },
  footer: { ...translations.en.footer, body: '고양이를 놓으며 머리를 정리하는 작은 논리 게임입니다.', playTitle: '플레이', aboutTitle: '정보', copyright: '조용한 마음을 위한 작은 연습' },
})

export function getLocale(lang: Language): string {
  return localeMap[lang]
}

export function isLanguage(value: string): value is Language {
  return LANGUAGES.some((language) => language.code === value)
}
