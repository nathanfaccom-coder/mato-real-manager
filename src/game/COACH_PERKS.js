export const COACH_PERKS = [
  // --- GRUPO 1: ATAQUE E FINALIZAÇÃO ---
  {
    id: "SNIPER_COACH",
    name: "🎯 Finalizador Nato",
    desc: "Treinos de Chute rendem +50% XP em Finalização e Força.",
    type: "TRAIN_BOOST",
    attrs: ["shot", "shotPower", "shotTech"],
    multiplier: 1.5,
  },
  {
    id: "AERIAL_THREAT",
    name: "✈️ Força Aérea",
    desc: "Bônus massivo em treinos de Cabeceio e Impulsão.",
    type: "TRAIN_BOOST",
    attrs: ["header", "jump"],
    multiplier: 1.5,
  },
  {
    id: "OFFENSIVE_MIND",
    name: "🦊 Faro de Gol",
    desc: "Melhora o atributo Ataque (Posicionamento) e Resposta.",
    type: "TRAIN_BOOST",
    attrs: ["attack", "response"],
    multiplier: 1.5,
  },

  // --- GRUPO 2: TÉCNICA E CONTROLE ---
  {
    id: "DRIBBLE_WIZARD",
    name: "🪄 Mago do Drible",
    desc: "Acelera a evolução de Drible, Agilidade e Técnica.",
    type: "TRAIN_BOOST",
    attrs: ["dribble", "agility", "tech"],
    multiplier: 1.5,
  },
  {
    id: "MIDFIELD_MAESTRO",
    name: "🎩 Maestro",
    desc: "Especialista em treinar Passe Curto e Passe Longo.",
    type: "TRAIN_BOOST",
    attrs: ["shortPass", "longPass"],
    multiplier: 1.5,
  },
  {
    id: "SET_PIECE_GURU",
    name: "🎱 Bola Parada",
    desc: "Torna o time letal em Faltas, Pênaltis e Efeito (Curva).",
    type: "TRAIN_BOOST",
    attrs: ["freeKick", "curve"],
    multiplier: 1.8,
  },

  // --- GRUPO 3: FÍSICO E VELOCIDADE ---
  {
    id: "SPEED_DEMON",
    name: "⚡ Velocista",
    desc: "Foco total em Velocidade Máxima e Aceleração.",
    type: "TRAIN_BOOST",
    attrs: ["speed", "accel", "dribbleSpd"],
    multiplier: 1.5,
  },
  {
    id: "IRON_LUNGS",
    name: "🫁 Pulmão de Aço",
    desc: "Melhora drasticamente Resistência e Condição Física.",
    type: "TRAIN_BOOST",
    attrs: ["stamina", "condition"],
    multiplier: 1.5,
  },
  {
    id: "BALANCE_CORE",
    name: "⚖️ Equilíbrio Total",
    desc: "Fortalece o Equilíbrio e proteção de bola.",
    type: "TRAIN_BOOST",
    attrs: ["balance", "strength"],
    multiplier: 1.5,
  },

  // --- GRUPO 4: DEFESA E GOLEIRO ---
  {
    id: "DEFENSIVE_WALL",
    name: "🛡️ Muralha",
    desc: "Treinos defensivos upam muito Defesa e Agressividade.",
    type: "TRAIN_BOOST",
    attrs: ["defense", "aggression"],
    multiplier: 1.5,
  },
  {
    id: "GK_WHISPERER",
    name: "🧤 Paredão",
    desc: "Goleiros evoluem 50% mais rápido em habilidades de GK.",
    type: "TRAIN_BOOST",
    attrs: ["gk"],
    multiplier: 1.5,
  },
  {
    id: "TACTICAL_DISCIPLINE",
    name: "🧠 Tático",
    desc: "Foca na evolução mental: Trabalho em Equipe e Mentalidade.",
    type: "TRAIN_BOOST",
    attrs: ["teamwork", "mentality"],
    multiplier: 1.5,
  },

  // --- GRUPO 5: ESPECIAIS (Utility) ---
  {
    id: "AMBIDEXTROUS",
    name: "🦶 Onde a Coruja Dorme",
    desc: "Treinos específicos para melhorar Pé Ruim (Freq e Precisão).",
    type: "TRAIN_BOOST",
    attrs: ["weakFootAcc", "weakFootFreq"],
    multiplier: 2.0, // Bônus alto pois é difícil upar
  },
  {
    id: "FITNESS_EXPERT",
    name: "🔋 Gestão de Energia",
    desc: "Jogadores gastam 20% menos energia nos treinos.",
    type: "ENERGY_SAVE",
    value: 0.8,
  },
  {
    id: "YOUTH_MENTOR",
    name: "👶 Base de Ouro",
    desc: "Jogadores Sub-21 ganham DOBRO de XP nos treinos.",
    type: "YOUTH_BOOST",
    ageLimit: 21,
    multiplier: 2.0,
  },
  {
    id: "MOTIVATOR",
    name: "🔥 Palestrante",
    desc: 'Aumenta em 20% a chance de "Grande Evolução" (Crítico) no treino.',
    type: "CRIT_CHANCE",
    value: 0.2,
  },
  {
    id: "HARD_WORKER",
    name: "💪 Trabalho Duro",
    desc: "Garante um mínimo de XP mais alto, evitando treinos ruins.",
    type: "MIN_XP_BOOST",
    value: 5, // Adiciona +5 de XP base garantido
  },
  {
    id: "POS_SPECIALIST",
    name: "📍 Posicionamento",
    desc: "Aumenta o bônus de afinidade quando treina a posição correta.",
    type: "AFFINITY_BOOST",
    value: 5, // +5 extra se a posição bater
  },
];
