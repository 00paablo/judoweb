/**
 * JUDO (柔道) - Core Application Logic
 * Enciclopedia de Técnicas, Sistema de Cinturones, Simulador Olímpico y Quiz Tokui-Waza
 */

// ==========================================================================
// 1. BASE DE DATOS DE TÉCNICAS (GOKYO NO WAZA & KATAME-WAZA)
// ==========================================================================
const TECHNIQUES_DB = [
  {
    id: 'ippon-seoi-nage',
    name: 'Ippon Seoi Nage',
    japanese: '一本背負投',
    category: 'te',
    categoryName: 'Te-Waza (Brazo)',
    translation: 'Lanzamiento por encima de un hombro',
    description: 'Una de las proyecciones más veloces y emblemáticas del Judo. Tori penetra bajo el centro de gravedad de Uke cargándolo en un solo hombro con máxima explosividad.',
    biomechanics: {
      kuzushi: 'Desequilibrio al frente y arriba con tirón circular de solapa y manga.',
      tsukuri: 'Pivote de 180° flexionando rodillas; Tori bloquea el brazo de Uke en su axila.',
      kake: 'Extensión explosiva de piernas y flexión de tronco lanzando a Uke en arco continuo.'
    },
    difficulty: 4,
    tacticalTip: 'Devastador contra rivales más altos o cuando el oponente avanza con guardia pesada.',
    olympicMoments: 'Famoso por leyendas como Kosei Inoue y Toshihiko Koga.'
  },
  {
    id: 'uchi-mata',
    name: 'Uchi Mata',
    japanese: '内股',
    category: 'koshi',
    categoryName: 'Koshi-Waza (Cadera)',
    translation: 'Barrido por el interior del muslo',
    description: 'Considerada la técnica reina del judo moderno y la más puntuadora en Campeonatos del Mundo. Combina giro de cadera con una siega acrobática del muslo interno de Uke.',
    biomechanics: {
      kuzushi: 'Tirón en espiral ascendente provocando que Uke apoye todo el peso en un pie.',
      tsukuri: 'Rotación profunda de espaldas a Uke con la pierna de apoyo perfectamente plantada.',
      kake: 'Lanzamiento de la pierna activa hacia el cielo mientras la cabeza mira hacia el tatami.'
    },
    difficulty: 5,
    tacticalTip: 'Requiere flexibilidad y excelente sentido del timing. Imparable con agarre alto a la espalda.',
    olympicMoments: 'Sello distintivo de Shohei Ono e Hifumi Abe.'
  },
  {
    id: 'osoto-gari',
    name: 'Osoto Gari',
    japanese: '大外刈',
    category: 'ashi',
    categoryName: 'Ashi-Waza (Pierna)',
    translation: 'Gran siega exterior',
    description: 'La primera gran técnica enseñada a los judokas. Una siega implacable por el exterior de la pierna contraria que produce caídas de alto impacto con Ippon limpio.',
    biomechanics: {
      kuzushi: 'Presión diagonal hacia atrás sobre el talón derecho de Uke comprometiendo su postura.',
      tsukuri: 'Paso largo al lado del pie de Uke pegando pecho con pecho.',
      kake: 'Siega de pierna con pie en flexión como una guadaña, rematando con el peso del cuerpo.'
    },
    difficulty: 3,
    tacticalTip: 'Excelente para judokas con potente presencia física y contundencia en agarres frontales.',
    olympicMoments: 'Utilizada con letalidad por Teddy Riner e Yasuhiro Yamashita.'
  },
  {
    id: 'harai-goshi',
    name: 'Harai Goshi',
    japanese: '払腰',
    category: 'koshi',
    categoryName: 'Koshi-Waza (Cadera)',
    translation: 'Barrido de cadera',
    description: 'Nacida históricamente de la evolución del Uki Goshi inventada por Jigoro Kano. Tori barre la cadera y muslo exterior de Uke mediante un giro amplio y armónico.',
    biomechanics: {
      kuzushi: 'Apertura circular de Uke tirando fuertemente de la manga hacia arriba.',
      tsukuri: 'Cadera de Tori colocada a media altura en íntimo contacto.',
      kake: 'Barrido simultáneo con la pierna extendida girando el tronco completamente.'
    },
    difficulty: 4,
    tacticalTip: 'Ideal ante oponentes que defienden agachándose o esquivando hacia el exterior.',
    olympicMoments: 'Muy temida en categorías pesadas por su amplitud de vuelo.'
  },
  {
    id: 'tai-otoshi',
    name: 'Tai Otoshi',
    japanese: '体落',
    category: 'te',
    categoryName: 'Te-Waza (Brazo)',
    translation: 'Derribo del cuerpo con barrera',
    description: 'Una técnica de pura palanca de brazos. No requiere cargar el peso de Uke en la cadera; Tori cruza una pierna como zancadilla sin tocar y proyecta con el empuje de brazos.',
    biomechanics: {
      kuzushi: 'Tracción de ambos brazos hacia abajo y adelante en trayectoria elíptica.',
      tsukuri: 'Bajar el centro de masa y extender la pierna derecha frente a los tobillos de Uke.',
      kake: 'Acción rotacional como abrir un volante de coche, haciendo rodar a Uke sobre la pierna barrera.'
    },
    difficulty: 4,
    tacticalTip: 'Exige precisión milimétrica en el apoyo del pie para evitar lesiones.',
    olympicMoments: 'Clásico de campeones japoneses contra judokas europeos corpulentos.'
  },
  {
    id: 'deashi-harai',
    name: 'Deashi Harai',
    japanese: '出足払',
    category: 'ashi',
    categoryName: 'Ashi-Waza (Pierna)',
    translation: 'Barrido al pie avanzado',
    description: 'La quintaesencia del Ju (suavidad). El pie de Uke es barrido en el instante preciso en que roza el tatami antes de afianzar el peso corporal.',
    biomechanics: {
      kuzushi: 'Guiar el desplazamiento de Uke hasta obligarle a dar un paso al frente.',
      tsukuri: 'Equilibrio perfecto de Tori sobre un pie, orientando la planta del otro pie en cuchara.',
      kake: 'Barrer el tobillo de Uke en diagonal hacia adentro en el microsegundo del apoyo.'
    },
    difficulty: 4,
    tacticalTip: 'Cero uso de fuerza bruta. 100% ritmo musical, lectura corporal y anticipación.',
    olympicMoments: 'La técnica más bella estéticamente cuando se logra un Ippon instantáneo.'
  },
  {
    id: 'tomoe-nage',
    name: 'Tomoe Nage',
    japanese: '巴投',
    category: 'sutemi',
    categoryName: 'Sutemi-Waza (Sacrificio)',
    translation: 'Lanzamiento circular en sacrificio',
    description: 'Tori se deja caer voluntariamente de espaldas al tatami (Ma-sutemi), coloca su pie en el bajo abdomen de Uke y lo catapulta limpiamente por encima de su cabeza.',
    biomechanics: {
      kuzushi: 'Fingir retroceso para que Uke presione fuertemente hacia adelante.',
      tsukuri: 'Deslizar los glúteos entre los talones de Uke y apoyar el empeine en su ingle.',
      kake: 'Empujar con la pierna mientras los brazos continúan la trayectoria circular hacia atrás.'
    },
    difficulty: 4,
    tacticalTip: 'Sorprende al contrincante agresivo y permite transición directa a sumisión en suelo.',
    olympicMoments: 'Arma secreta legendaria en finales olímpicas y combates igualados.'
  },
  {
    id: 'ura-nage',
    name: 'Ura Nage',
    japanese: '裏投',
    category: 'sutemi',
    categoryName: 'Sutemi-Waza (Sacrificio)',
    translation: 'Lanzamiento hacia atrás',
    description: 'El contraataque más temido del Judo. Cuando Uke ataca de espaldas con una técnica de cadera, Tori lo abraza por la cintura y lo eleva en un espectacular suplex con sacrificio.',
    biomechanics: {
      kuzushi: 'Aprovechar la entrada de Uke bloqueando su cadera con la pelvis de Tori.',
      tsukuri: 'Abrazar el tronco de Uke flexionando fuertemente las rodillas.',
      kake: 'Arco dorsal explosivo proyectando a Uke detrás de Tori al chocar contra el suelo.'
    },
    difficulty: 5,
    tacticalTip: 'Requiere valentía, cuello robusto y reflejos automáticos de contraataque.',
    olympicMoments: 'Provee los Ippons más espectaculares y vibrantes de cualquier competición.'
  },
  {
    id: 'kesa-gatame',
    name: 'Kesa Gatame',
    japanese: '袈裟固',
    category: 'katame',
    categoryName: 'Katame-Waza (Control)',
    translation: 'Control en bufanda / diagonal',
    description: 'La inmovilización reina del Ne-waza (suelo). Tori envuelve el cuello y brazo de Uke, controlando su caja torácica con las costillas y una sólida base de piernas.',
    biomechanics: {
      kuzushi: 'Mantener la espalda de Uke plana contra el tatami impidiendo giros.',
      tsukuri: 'Pierna delantera extendida y trasera flexionada para estabilidad multidireccional.',
      kake: 'Apretar el brazo de Uke contra el costado y bajar el centro de gravedad al pecho.'
    },
    difficulty: 2,
    tacticalTip: 'Si Uke no escapa en 20 segundos se declara Ippon por Osaekomi.',
    olympicMoments: 'Inmovilización fundamental presente en todos los dojos del mundo.'
  },
  {
    id: 'juji-gatame',
    name: 'Juji Gatame',
    japanese: '腕挫十字固',
    category: 'katame',
    categoryName: 'Katame-Waza (Luxación)',
    translation: 'Luxación de codo en cruz',
    description: 'Palanca articular hiperextendiendo el codo de Uke mediante la presión de la pelvis de Tori entre sus muslos cerrados.',
    biomechanics: {
      kuzushi: 'Aislar el brazo de Uke controlando su muñeca con los pulgares hacia arriba.',
      tsukuri: 'Pasar una pierna sobre el pecho y la otra sobre el cuello de Uke cerrando rodillas.',
      kake: 'Elevar la pelvis lentamente manteniendo tracción continua hasta el tapeo (Mairi).'
    },
    difficulty: 4,
    tacticalTip: 'Permitida en judo de competición a partir de categorías juveniles; sumisión fulminante.',
    olympicMoments: 'Especialidad de la campeona olímpica y medallista de oro Kayla Harrison.'
  },
  {
    id: 'sankaku-jime',
    name: 'Sankaku Jime',
    japanese: '三角絞',
    category: 'katame',
    categoryName: 'Katame-Waza (Estrangulación)',
    translation: 'Estrangulación en triángulo',
    description: 'Estrangulación vascular donde Tori atrapa la cabeza y un brazo de Uke entre sus piernas en forma de triángulo (figura de 4), cortando el flujo carotídeo.',
    biomechanics: {
      kuzushi: 'Romper la postura de Uke desde la guardia cerrada o tortuga.',
      tsukuri: 'Enganchar el tobillo detrás de la corva de la pierna contraria.',
      kake: 'Apretar los aductores hacia adentro y traccionar la nuca de Uke.'
    },
    difficulty: 5,
    tacticalTip: 'Si se aplica correctamente provoca sumisión en menos de 5 segundos.',
    olympicMoments: 'Común en suelo dinámico y contras de defensas cerradas.'
  },
  {
    id: 'kouchi-gari',
    name: 'Kouchi Gari',
    japanese: '小内刈',
    category: 'ashi',
    categoryName: 'Ashi-Waza (Pierna)',
    translation: 'Pequeña siega interior',
    description: 'Ataque relámpago con la planta del pie segando el talón interior de Uke. Es el complemento perfecto para encadenar con Seoi Nage u Osoto Gari.',
    biomechanics: {
      kuzushi: 'Fintar hacia adelante haciendo que Uke cargue su peso en el talón retrasado.',
      tsukuri: 'Aproximar el empeine en forma de cuchara al talón de Uke.',
      kake: 'Segar el talón hacia adelante mientras el tren superior empuja diagonalmente hacia el suelo.'
    },
    difficulty: 3,
    tacticalTip: 'Clave para judokas tácticos que necesitan desestabilizar la base rival.',
    olympicMoments: 'Usado con maestría infinita por Yasuhiro Yamashita.'
  }
];

const TECHNIQUE_LOCALIZATIONS = {
  'ippon-seoi-nage': {
    en: {
      name: 'Ippon Seoi Nage',
      categoryName: 'Te-Waza (Arm)',
      translation: 'Over-the-shoulder throw',
      description: 'One of the fastest and most iconic throws in Judo. Tori penetrates under the opponent’s centre of gravity and lifts them onto one shoulder with maximum explosiveness.',
      biomechanics: {
        kuzushi: 'Forward and upward unbalance with a circular pull on the sleeve and collar.',
        tsukuri: '180° pivot while bending the knees; Tori locks the opponent’s arm in the armpit.',
        kake: 'Explosive extension of the legs and trunk flexion projecting Uke in a continuous arc.'
      },
      tacticalTip: 'Devastating against taller opponents or when the adversary advances with a heavy guard.',
      olympicMoments: 'Famous in the legacy of Kosei Inoue and Toshihiko Koga.'
    },
    ja: {
      name: '一本背負投',
      categoryName: '手技（腕）',
      translation: '肩上投げ',
      description: '柔道で最も速く象徴的な投げ技の一つ。取りが相手の重心の下をくぐり抜け、一本の肩に乗せるように投げる。',
      biomechanics: {
        kuzushi: '前方へ上方へ崩し、袖と襟を回しながら引く。',
        tsukuri: '膝を曲げて180°回転し、相手の腕を腋の下で抑える。',
        kake: '脚と体幹を爆発的に伸ばし、相手を連続した弧で投げる。'
      },
      tacticalTip: '背が高い相手や、重い防御を前に出す相手に極めて有効。',
      olympicMoments: '井上康生や古賀稔彦の名手と深く結びつく技。'
    }
  },
  'uchi-mata': {
    en: {
      name: 'Uchi Mata',
      categoryName: 'Koshi-Waza (Hip)',
      translation: 'Inner-thigh sweep',
      description: 'Considered the queen throw of modern Judo and one of the most scoring techniques in world championships. It combines hip rotation with an acrobatic sweep of the inner thigh.',
      biomechanics: {
        kuzushi: 'Upward spiral pull that makes Uke support all their weight on one foot.',
        tsukuri: 'Deep rotation with the back facing Uke while the supporting leg is planted firmly.',
        kake: 'The active leg rises to the sky while the head looks toward the mat.'
      },
      tacticalTip: 'Requires flexibility and perfect timing. Devastating with a high back grip.',
      olympicMoments: 'A signature throw of Shohei Ono and Hifumi Abe.'
    },
    ja: {
      name: '内股',
      categoryName: '腰技（腰）',
      translation: '内股刈り',
      description: '現代柔道の女王技とされ、世界選手権では特に得点効率の高い技。腰の回転と内腿の大きな刈り込みを組み合わせる。',
      biomechanics: {
        kuzushi: '上方向へ螺旋をかけ、相手を一本の足に重心を寄せる。',
        tsukuri: '相手の背後に回り込み、支え脚をしっかり踏み込む。',
        kake: '前脚が空を向くように振り上げ、頭を畳へ向けて投げる。'
      },
      tacticalTip: '柔軟性とタイミングが鍵。高い背中の組み手で圧倒的に効く。',
      olympicMoments: '小野卓志や阿部一二三の得意技として知られる。'
    }
  },
  'osoto-gari': {
    en: {
      name: 'Osoto Gari',
      categoryName: 'Ashi-Waza (Leg)',
      translation: 'Large outer leg sweep',
      description: 'A classic and relentless leg sweep from the outside of the opponent’s leg. It produces powerful falls and often finishes with a clean Ippon.',
      biomechanics: {
        kuzushi: 'Diagonal pressure back toward the right heel of Uke, compromising their stance.',
        tsukuri: 'Long step beside Uke’s foot while connecting the chest to the chest.',
        kake: 'Sweep the leg in a curved motion, finishing with the body weight.'
      },
      tacticalTip: 'Excellent for judoka with strong physical presence and direct grip pressure.',
      olympicMoments: 'Used with lethal efficiency by Teddy Riner and Yasuhiro Yamashita.'
    },
    ja: {
      name: '大外刈',
      categoryName: '足技（脚）',
      translation: '大外刈り',
      description: '最も伝統的で強烈な外刈りの一つ。相手の外側の脚を刈り取り、大きく倒す技である。',
      biomechanics: {
        kuzushi: '相手の右足かかとの後ろへ斜めに圧し、姿勢を崩す。',
        tsukuri: '相手の足の横へ長く踏み込み、胸を胸に合わせる。',
        kake: '脚を鎌のように大きく巻き込み、体重を乗せて決める。'
      },
      tacticalTip: '身体を使った相手に対して非常に有効な大きな技。',
      olympicMoments: 'テディ・リナールや山下泰裕が屈指の得意技として使った。'
    }
  },
  'harai-goshi': {
    en: {
      name: 'Harai Goshi',
      categoryName: 'Koshi-Waza (Hip)',
      translation: 'Hip sweep',
      description: 'Historically derived from the evolution of Uki Goshi by Jigoro Kano. Tori sweeps the hip and outer thigh of Uke with a broad, harmonious turn.',
      biomechanics: {
        kuzushi: 'Open the circle by pulling strongly on the sleeve upward.',
        tsukuri: 'Place the hip at middle height in close contact.',
        kake: 'Sweep with the extended leg while rotating the trunk completely.'
      },
      tacticalTip: 'Ideal against opponents who defend by crouching or moving outward.',
      olympicMoments: 'A feared technique in heavy-weight categories because of its wide flight path.'
    },
    ja: {
      name: '払腰',
      categoryName: '腰技（腰）',
      translation: '払腰',
      description: '歴史的には浮腰の進化から生まれた技。大きく回る腰の動きで相手の腰と外腿を払う。',
      biomechanics: {
        kuzushi: '袖を上に引いて相手の重心を円に開かせる。',
        tsukuri: '腰を中段の高さに置き、密着して体勢を作る。',
        kake: '伸ばした脚で同時に払いつつ、体幹を全体的に回す。'
      },
      tacticalTip: 'しゃがみ込みや外側への回避に対して有効。',
      olympicMoments: '大きな飛距離があるため重量級で特に脅威。'
    }
  },
  'tai-otoshi': {
    en: {
      name: 'Tai Otoshi',
      categoryName: 'Te-Waza (Arm)',
      translation: 'Body drop with a barrier',
      description: 'A pure lever throw that does not require loading the opponent’s weight onto the hip. Tori crosses a leg as a barrier and projects with the force of the arms.',
      biomechanics: {
        kuzushi: 'Pull both arms downward and forward in an elliptical path.',
        tsukuri: 'Lower the centre of mass and extend the right leg in front of the opponent’s ankles.',
        kake: 'Rotate like opening a car wheel, rolling Uke over the barrier leg.'
      },
      tacticalTip: 'Requires millimetric precision in foot placement to avoid injuries.',
      olympicMoments: 'A classic of Japanese champions against heavy European judoka.'
    },
    ja: {
      name: '体落',
      categoryName: '手技（腕）',
      translation: '体落とし',
      description: '腕のレバーを使う純粋な技で、相手の体重を腰に乗せる必要がない。足を障害物のように交差させて投げる。',
      biomechanics: {
        kuzushi: '両腕を下へ前へ楕円の軌道で引く。',
        tsukuri: '重心を下げ、右足を相手の足首の前に伸ばす。',
        kake: '車輪を開くように回転し、相手を足の障害物の上へ転がす。'
      },
      tacticalTip: '足の支点の精密さが必要で、負傷を避けるには細心の注意が求められる。',
      olympicMoments: '日本の名選手たちに多く使われる伝統技。'
    }
  },
  'deashi-harai': {
    en: {
      name: 'Deashi Harai',
      categoryName: 'Ashi-Waza (Leg)',
      translation: 'Advanced-foot sweep',
      description: 'The quintessence of Ju (softness). Uke’s foot is swept the instant it grazes the mat before the body weight is grounded.',
      biomechanics: {
        kuzushi: 'Guide Uke’s movement until they step forward.',
        tsukuri: 'Perfect balance on one foot while the other foot is turned like a spoon.',
        kake: 'Sweep the ankle diagonally inward at the exact moment of support.'
      },
      tacticalTip: 'No brute force—100% rhythm, reading and anticipation.',
      olympicMoments: 'The most aesthetically beautiful technique when it lands as an instant Ippon.'
    },
    ja: {
      name: '出足払',
      categoryName: '足技（脚）',
      translation: '出足払',
      description: '柔の極意。相手の足が畳に触れた瞬間に、体重が定着する前に足を払う。',
      biomechanics: {
        kuzushi: '相手を前へ一歩出させるように導く。',
        tsukuri: '一本の足でバランスを取り、もう一方の足をスプーンのように向ける。',
        kake: '相手の足首を内側へ対角線に払う。'
      },
      tacticalTip: '力任せではなく、リズムと読みによって決める技。',
      olympicMoments: '一瞬で一本が決まると最も美しい技とされる。'
    }
  },
  'tomoe-nage': {
    en: {
      name: 'Tomoe Nage',
      categoryName: 'Sutemi-Waza (Sacrifice)',
      translation: 'Circular throw in sacrifice',
      description: 'Tori intentionally falls backwards onto the mat, places a foot in the lower abdomen of Uke and catapults them cleanly over the head.',
      biomechanics: {
        kuzushi: 'Feign a retreat to make Uke lean and push forward.',
        tsukuri: 'Slide the hips between the heels and place the instep in the groin.',
        kake: 'Push with the leg while the arms continue the circular path backward.'
      },
      tacticalTip: 'Surprises the aggressive opponent and can flow directly into ground control.',
      olympicMoments: 'A legendary secret weapon in equal and final matches.'
    },
    ja: {
      name: '巴投',
      categoryName: '捨身技（犠牲）',
      translation: '巴投げ',
      description: '取りが自ら背中を畳に落とし、相手の下腹に足を置き、頭の上へ大きく投げる技。',
      biomechanics: {
        kuzushi: '後退したように見せて相手を前へ押し込み、姿勢を崩す。',
        tsukuri: 'お尻を相手のかかとの間に滑り込み、足の裏を股の下に置く。',
        kake: '脚で押し、両腕を後ろへ大きく回す。'
      },
      tacticalTip: '前に出る相手に対して非常に有効で、寝技へつなぎやすい。',
      olympicMoments: '相手が拮抗した試合や決勝で常に驚きを与える技。'
    }
  },
  'ura-nage': {
    en: {
      name: 'Ura Nage',
      categoryName: 'Sutemi-Waza (Sacrifice)',
      translation: 'Back throw',
      description: 'The most feared counter-attack in Judo. When Uke commits with a hip attack from behind, Tori wraps the waist and lifts them in a spectacular suplex with sacrifice.',
      biomechanics: {
        kuzushi: 'Exploit the entry by blocking Uke’s hip with Tori’s pelvis.',
        tsukuri: 'Wrap the torso, bending the knees sharply.',
        kake: 'Explosive dorsal arc projecting Uke behind Tori onto the mat.'
      },
      tacticalTip: 'Requires courage, a strong neck and automatic counter-attack reflexes.',
      olympicMoments: 'Provides the most spectacular Ippons in competition.'
    },
    ja: {
      name: '裏投',
      categoryName: '捨身技（犠牲）',
      translation: '裏投げ',
      description: '柔道の中でも最も恐れられる反撃技。相手が後ろから腰技に入った瞬間、腰を抱き込んで大きく投げる。',
      biomechanics: {
        kuzushi: '相手の入る瞬間に腰を閉じて、股関節を止める。',
        tsukuri: '相手の胴体を抱き、膝を深く曲げて引き寄せる。',
        kake: '背中を大きく反らし、相手を取りの後ろへ投げ落とす。'
      },
      tacticalTip: '勇気と首の強さ、反撃の瞬間感覚が必要。',
      olympicMoments: '試合の中で最も観客を熱くさせる一本のひとつ。'
    }
  },
  'kesa-gatame': {
    en: {
      name: 'Kesa Gatame',
      categoryName: 'Katame-Waza (Control)',
      translation: 'Scarf hold / diagonal control',
      description: 'The king of immobilisations in ne-waza. Tori wraps the neck and arm of Uke, controlling the chest with the ribs and a stable base.',
      biomechanics: {
        kuzushi: 'Keep Uke’s back flat against the mat to prevent turning.',
        tsukuri: 'Front leg extended and rear leg bent for multidirectional stability.',
        kake: 'Press the arm against the side and lower the centre of gravity toward the chest.'
      },
      tacticalTip: 'If Uke does not escape in 20 seconds, the referee calls Ippon by Osaekomi.',
      olympicMoments: 'A foundational pin found in every dojo in the world.'
    },
    ja: {
      name: '袈裟固',
      categoryName: '固技（抑え）',
      translation: '袈裟固め',
      description: '寝技の中でも王道の抑え込み技。相手の首と腕を巻き、胸と肋骨を押さえながら固定する。',
      biomechanics: {
        kuzushi: '相手の背中を畳に平行に押さえ、回転を阻止する。',
        tsukuri: '前脚を伸ばし、後ろ脚を曲げて四方向に安定させる。',
        kake: '相手の腕を脇に押し込み、重心を胸へ落とす。'
      },
      tacticalTip: '20秒以内に逃げられなければ抑え込み一本。',
      olympicMoments: '世界中の道場で基礎となる抑え込み技。'
    }
  },
  'juji-gatame': {
    en: {
      name: 'Juji Gatame',
      categoryName: 'Katame-Waza (Armlock)',
      translation: 'Cross arm lock',
      description: 'A joint lock hyperextending the elbow by pressing Tori’s pelvis between the closed thighs of Uke.',
      biomechanics: {
        kuzushi: 'Isolate the arm by controlling the wrist with the thumbs upward.',
        tsukuri: 'Cross one leg over the chest and one over the neck, closing the knees.',
        kake: 'Raise the pelvis slowly while maintaining gradual traction until tapping.'
      },
      tacticalTip: 'Allowed in competition judo from youth categories onwards; a rapid, decisive stranglehold alternative.',
      olympicMoments: 'A specialty of Olympic champion and gold medallist Kayla Harrison.'
    },
    ja: {
      name: '腕挫十字固',
      categoryName: '固技（関節）',
      translation: '十字固め',
      description: '相手の腕を極め、骨盤で閉じた脚の間を押さえながら肘を反らす関節技。',
      biomechanics: {
        kuzushi: '手首を支配し、親指を上へ向けて腕を隔離する。',
        tsukuri: '片脚を胸の上、もう片脚を首の上へ置いて膝を閉じる。',
        kake: '骨盤をゆっくり上げ、連続的な引きでタップを狙う。'
      },
      tacticalTip: '青少年カテゴリから試合で許される技。非常に速く決められる。',
      olympicMoments: 'オリンピック金メダリストのケイラ・ハリソンが得意とした技。'
    }
  },
  'sankaku-jime': {
    en: {
      name: 'Sankaku Jime',
      categoryName: 'Katame-Waza (Choke)',
      translation: 'Triangle choke',
      description: 'A vascular choke where Tori traps the head and one arm of Uke between the legs in a triangle, cutting the carotid flow.',
      biomechanics: {
        kuzushi: 'Break the posture from a closed guard or turtle position.',
        tsukuri: 'Hook the ankle behind the opposite calf.',
        kake: 'Tighten the adductors and pull the neck of Uke.'
      },
      tacticalTip: 'When applied correctly, it produces a submission in under five seconds.',
      olympicMoments: 'Common in dynamic groundwork and closed guard attacks.'
    },
    ja: {
      name: '三角絞',
      categoryName: '固技（絞め）',
      translation: '三角絞め',
      description: '頭と片腕を三角形に絡め、動脈の血流を遮断する血管絞め技。',
      biomechanics: {
        kuzushi: '閉じたガードや亀の姿勢から相手の構えを崩す。',
        tsukuri: '足首を相手の反対側のふくらはぎに引っ掛ける。',
        kake: '内転筋を締め、相手の首を引いて絞める。'
      },
      tacticalTip: '正しく入れば5秒以内で極められる。',
      olympicMoments: '動的な寝技や閉じた防御の反撃でよく使われる。'
    }
  },
  'kouchi-gari': {
    en: {
      name: 'Kouchi Gari',
      categoryName: 'Ashi-Waza (Leg)',
      translation: 'Small inner leg sweep',
      description: 'A lightning-fast attack with the sole of the foot trimming the inner heel of Uke. It is the perfect setup for Seoi Nage or Osoto Gari.',
      biomechanics: {
        kuzushi: 'Feint forward so Uke loads weight onto the back heel.',
        tsukuri: 'Bring the foot into a spoon shape near the opponent’s heel.',
        kake: 'Sweep forward while the upper body pushes diagonally to the mat.'
      },
      tacticalTip: 'Essential for tactical judoka who need to destabilise the opponent’s base quickly.',
      olympicMoments: 'Used with infinite mastery by Yasuhiro Yamashita.'
    },
    ja: {
      name: '小内刈',
      categoryName: '足技（脚）',
      translation: '小内刈り',
      description: '足裏で相手の内側の踵を一瞬で刈る速攻技。背負投げや大外刈りの前段として非常に有効。',
      biomechanics: {
        kuzushi: '前へ近づくふりをして、相手を後ろ踵へ重心を寄せる。',
        tsukuri: '足をスプーン状に向けて相手の踵に近づける。',
        kake: '前に刈り込みながら、上半身が対角線へ押し込む。'
      },
      tacticalTip: '技の基盤を崩したい戦術的な選手に非常に重要。',
      olympicMoments: '山下泰裕が見事に使いこなした技。'
    }
  }
};

// ==========================================================================
// 2. SISTEMA DE CINTURONES (OBI PROGRESSION)
// ==========================================================================
const BELTS_DATA = [
  {
    id: 'white',
    name: 'Cinturón Blanco',
    japanese: 'Rokkyu (6º Kyu) - 白帯',
    colorHex: '#f8fafc',
    knotHex: '#e2e8f0',
    time: '0 a 6 meses',
    meaning: 'El comienzo: llegar con curiosidad y estar dispuesto a aprender.',
    curriculum: 'Caídas básicas (Ukemi), normas del dojo (Reishiki) y primeras posturas (Shisei).',
    learned: ['Ejecutar ushiro-ukemi, yoko-ukemi y mae-ukemi sin perder la orientación.', 'Aplicar reishiki básico: rei, orden del judogi y cuidado del tatami.', 'Adoptar shizen-hontai y un kumi-kata estable en desplazamiento.'],
    quote: 'Todo judoka empieza por aprender a caer.'
  },
  {
    id: 'yellow',
    name: 'Cinturón Amarillo',
    japanese: 'Gokyu (5º Kyu) - 黄帯',
    colorHex: '#eab308',
    knotHex: '#ca8a04',
    time: '6 a 12 meses',
    meaning: 'Empiezas a reconocer el desequilibrio y a moverte con más confianza.',
    curriculum: 'Primer grupo del Gokyo: Deashi Harai, Hiza Guruma, Sasae Tsurikomi Ashi, Uki Goshi, Osoto Gari.',
    learned: ['Identificar kuzushi en las ocho direcciones y coordinar el tsurikomi.', 'Completar tsukuri-kake en Deashi Harai, Hiza Guruma y Osoto Gari.', 'Resolver la caída con ukemi seguro tras una proyección controlada.'],
    quote: 'La oportunidad vale más que la fuerza.'
  },
  {
    id: 'orange',
    name: 'Cinturón Naranja',
    japanese: 'Yonkyu (4º Kyu) - 橙帯',
    colorHex: '#f97316',
    knotHex: '#ea580c',
    time: '1 a 2 años',
    meaning: 'Ganas estabilidad y aprendes a construir tus ataques desde el agarre.',
    curriculum: 'Segundo grupo del Gokyo: Kosoto Gari, Kouchi Gari, Koshi Guruma, Tsurikomi Goshi, Okuriashi Harai.',
    learned: ['Mantener shisei y ma-ai durante el desplazamiento y el randori técnico.', 'Encadenar renraku-waza cuando la primera entrada es bloqueada.', 'Aplicar controles básicos de Ne-Waza y salidas de osaekomi.'],
    quote: 'Cada caída te enseña a moverte mejor.'
  },
  {
    id: 'green',
    name: 'Cinturón Verde',
    japanese: 'Sankyu (3º Kyu) - 緑帯',
    colorHex: '#16a34a',
    knotHex: '#15803d',
    time: '2 a 3 años',
    meaning: 'Empiezas a enlazar ataques y a responder cuando el rival se defiende.',
    curriculum: 'Tercer grupo del Gokyo: Kosoto Gake, Tsuri Goshi, Yoko Otoshi, Ashi Guruma, Harai Tsurikomi Ashi.',
    learned: ['Conectar renraku-waza y renzoku-waza con continuidad de kuzushi.', 'Aplicar kaeshi-waza básico sin romper la postura de seguridad.', 'Transitar de tachi-waza a ne-waza manteniendo control de la caída.'],
    quote: 'Un ataque abre el camino para el siguiente.'
  },
  {
    id: 'blue',
    name: 'Cinturón Azul',
    japanese: 'Nikyu (2º Kyu) - 青帯',
    colorHex: '#2563eb',
    knotHex: '#1d4ed8',
    time: '3 a 4 años',
    meaning: 'Tu juego de pie gana recursos y tu trabajo de suelo se vuelve más sólido.',
    curriculum: 'Cuarto grupo del Gokyo: Uchi Mata, Tomoe Nage, Kata Guruma, Sumi Gaeshi, Tani Otoshi.',
    learned: ['Seleccionar tokui-waza según la postura, el kumi-kata y el desplazamiento.', 'Conectar una proyección con una transición inmediata a ne-waza.', 'Resolver osaekomi, escapes y cambios de posición con criterio táctico.'],
    quote: 'La práctica convierte las decisiones en reflejos.'
  },
  {
    id: 'brown',
    name: 'Cinturón Marrón',
    japanese: 'Ikkyu (1º Kyu) - 茶帯',
    colorHex: '#854d0e',
    knotHex: '#713f12',
    time: '4 a 5 años',
    meaning: 'Tienes una base amplia y estás listo para profundizar en tu propio estilo.',
    curriculum: 'Quinto grupo del Gokyo: Osoto Guruma, Uki Otoshi, Ura Nage, Yoko Guruma, Yoko Wakare.',
    learned: ['Definir una cadena técnica propia desde kumi-kata, kuzushi y tsukuri.', 'Atacar, encadenar y contraatacar sin regalar la postura.', 'Sostener randori de intensidad alta con control, seguridad y lectura táctica.'],
    quote: 'La base es firme; ahora toca encontrar tu manera de hacer Judo.'
  },
  {
    id: 'black',
    name: 'Cinturón Negro (1º al 5º Dan)',
    japanese: 'Yudansha (Shodan a Godan) - 黒帯',
    colorHex: '#18181b',
    knotHex: '#09090b',
    time: '5 a 15+ años',
    meaning: 'El grado negro no cierra el camino: abre una etapa de estudio más profundo.',
    curriculum: 'Estudio de los Katas fundamentales (Nage-no-Kata, Katame-no-Kata, Ju-no-Kata) y contribución a la comunidad.',
    learned: ['Explicar kuzushi-tsukuri-kake y los principios biomecánicos de una técnica.', 'Ejecutar Nage-no-Kata y Katame-no-Kata con precisión de forma y ritmo.', 'Integrar randori, enseñanza y seguridad como responsabilidad de dojo.'],
    quote: 'El cinturón negro marca otro comienzo.'
  },
  {
    id: 'red-white',
    name: 'Cinturón Rojo y Blanco (6º al 8º Dan)',
    japanese: 'Kohaku Obi (Rokudan a Hachidan) - 紅白帯',
    colorHex: 'repeating-linear-gradient(90deg, #dc2626 0 35px, #f8fafc 35px 70px)',
    knotHex: '#b91c1c',
    time: '20 a 40 años',
    meaning: 'El rojo del fuego del sacrificio y el blanco de la pureza original. Grado de honor concedido por servicios excepcionales al Judo.',
    curriculum: 'Koshiki-no-Kata, Itsutsu-no-Kata, preservación histórica y liderazgo pedagógico mundial.',
    learned: ['Preservar kata, nomenclatura y detalles de ejecución con contexto histórico.', 'Formar judokas mediante una pedagogía exigente, segura y generosa.', 'Liderar el desarrollo técnico del dojo más allá del resultado competitivo.'],
    quote: 'La fuerza cede paso a la sabiduría total y al beneficio mutuo de la humanidad.'
  },
  {
    id: 'red',
    name: 'Cinturón Rojo (9º y 10º Dan)',
    japanese: 'Akada Obi (Kudan y Judan) - 赤帯',
    colorHex: '#dc2626',
    knotHex: '#991b1b',
    time: 'Toda una vida',
    meaning: 'La máxima cúspide del Judo establecida por Jigoro Kano. Trascendencia completa del ego personal; símbolo de la luz solar.',
    curriculum: 'Reconocimiento supremo del Kodokan y la Federación Internacional de Judo (IJF). Muy pocos seres humanos lo han alcanzado.',
    learned: ['Integrar técnica Kodokan, ética y experiencia en servicio a la comunidad.', 'Mantener viva la transmisión del Judo con rigor histórico y pedagógico.', 'Seguir investigando y aprendiendo incluso en el grado más alto.'],
    quote: 'El Judo no es un deporte para derrotar a otros, sino una senda para perfeccionarse a uno mismo.'
  }
];

// ==========================================================================
// 3. GLOSARIO DE TÉRMINOS ESENCIALES
// ==========================================================================
const GLOSSARY_DB = [
  { romaji: 'Hajime', kanji: '始め', meaning: '¡Empiecen!', context: 'Orden del árbitro para iniciar o reanudar el combate.' },
  { romaji: 'Mate', kanji: '待て', meaning: '¡Alto!', context: 'Orden del árbitro para detener temporalmente la acción.' },
  { romaji: 'Ippon', kanji: '一本', meaning: 'Punto decisivo', context: 'Victoria fulminante e instantánea que pone fin al combate.' },
  { romaji: 'Waza-ari', kanji: '技あり', meaning: 'Técnica eficaz', context: 'Casi un ippon; dos waza-ari suman Ippon (Awasete Ippon).' },
  { romaji: 'Shido', kanji: '指導', meaning: 'Penalización leve', context: 'Falta por pasividad, agarre ilegal o salir del tatami. 3 shidos = descalificación.' },
  { romaji: 'Hansoku-make', kanji: '反則負け', meaning: 'Descalificación directa', context: 'Derrota inmediata por infracción grave o acumulación de 3 shidos.' },
  { romaji: 'Osaekomi', kanji: '抑え込み', meaning: 'Inmovilización válida', context: 'Cuenta de tiempo en suelo: 10 segundos = Waza-ari; 20 segundos = Ippon.' },
  { romaji: 'Tokui-Waza', kanji: '得意技', meaning: 'Técnica favorita / emblema', context: 'La técnica maestra personal más perfeccionada de un judoka.' },
  { romaji: 'Kuzushi', kanji: '崩し', meaning: 'Desequilibrio', context: 'La primera fase esencial antes de cualquier técnica de judo.' },
  { romaji: 'Tsukuri', kanji: '作り', meaning: 'Posicionamiento', context: 'Colocación del cuerpo para ejecutar la palanca biomecánica.' },
  { romaji: 'Kake', kanji: '掛け', meaning: 'Ejecución final', context: 'La culminación del lanzamiento proyectando a Uke hacia el tatami.' },
  { romaji: 'Tori', kanji: '取り', meaning: 'El ejecutor', context: 'El judoka que realiza el ataque o la técnica.' },
  { romaji: 'Uke', kanji: '受け', meaning: 'El receptor', context: 'El judoka que recibe la técnica y realiza la caída controlada.' },
  { romaji: 'Judogi', kanji: '柔道着', meaning: 'Traje de judo', context: 'Uniforme tradicional de algodón resistente compuesto por chaqueta, pantalón y obi.' },
  { romaji: 'Obi', kanji: '帯', meaning: 'Cinturón', context: 'Cinta anudada que indica el grado de destreza y experiencia del practicante.' },
  { romaji: 'Randori', kanji: '乱取り', meaning: 'Práctica libre', context: 'Combate de entrenamiento sin coreografía previa.' },
  { romaji: 'Kata', kanji: '形', meaning: 'Formas preestablecidas', context: 'Secuencias tradicionales solemnes que preservan los principios del judo.' },
  { romaji: 'Rei', kanji: '礼', meaning: 'Reverencia de respeto', context: 'Saludo tradicional al entrar al dojo, al tatami y al oponente.' },
  { romaji: 'Dojo', kanji: '道場', meaning: 'Lugar del camino', context: 'Espacio sagrado de entrenamiento donde se cultiva cuerpo y mente.' },
  { romaji: 'Tatami', kanji: '畳', meaning: 'Esterilla acolchada', context: 'Superficie tradicional sobre la que se practica y amortiguan las caídas.' }
];

const GLOSSARY_LOCALIZATIONS = {
  Hajime: { en: { meaning: 'Begin!', context: 'Referee command to start or restart the contest.' }, ja: { meaning: '始め！', context: '審判の開始または再開の合図。' } },
  Mate: { en: { meaning: 'Stop!', context: 'Referee command to pause the action temporarily.' }, ja: { meaning: '待て！', context: '審判が一時的に動きを止める合図。' } },
  Ippon: { en: { meaning: 'Decisive point', context: 'A clean, immediate score that ends the match.' }, ja: { meaning: '一本', context: '試合を終わらせる決定的な有効技。' } },
  'Waza-ari': { en: { meaning: 'Effective technique', context: 'Almost an ippon; two waza-ari equal one ippon.' }, ja: { meaning: '技あり', context: '一本に近い技。二つで一本と同じ扱い。' } },
  Shido: { en: { meaning: 'Minor penalty', context: 'Warning for passivity, illegal gripping or leaving the mat.' }, ja: { meaning: '指導', context: '消極的な行為や不正な組み手などへの軽い注意。' } },
  'Hansoku-make': { en: { meaning: 'Direct disqualification', context: 'Immediate loss due to severe violation or three shidos.' }, ja: { meaning: '反則負け', context: '重大な反則または三つの指導での即失格。' } },
  Osaekomi: { en: { meaning: 'Valid hold', context: 'Ground hold counted in seconds: 10 = waza-ari, 20 = ippon.' }, ja: { meaning: '抑え込み', context: '寝技の抑え込み。10秒で技あり、20秒で一本。' } },
  'Tokui-Waza': { en: { meaning: 'Favourite technique / signature throw', context: 'A judoka’s most refined personal technique.' }, ja: { meaning: '得意技', context: '選手が最も得意とする技。' } },
  Kuzushi: { en: { meaning: 'Unbalance', context: 'The essential first phase before any judo technique.' }, ja: { meaning: '崩し', context: '技の前に必要な相手の姿勢を崩す動き。' } },
  Tsukuri: { en: { meaning: 'Setup', context: 'The body position that creates the mechanical leverage.' }, ja: { meaning: '作り', context: '技を決めるための体の位置と形。' } },
  Kake: { en: { meaning: 'Execution', context: 'The final action that projects uke to the mat.' }, ja: { meaning: '掛け', context: '相手を畳に投げる最終的な動き。' } },
  Tori: { en: { meaning: 'The attacker / executing player', context: 'The judoka who performs the technique.' }, ja: { meaning: '取り', context: '技を行う側の選手。' } },
  Uke: { en: { meaning: 'The receiver', context: 'The judoka who receives the technique and falls safely.' }, ja: { meaning: '受け', context: '技を受ける側の選手。' } },
  Judogi: { en: { meaning: 'Judo uniform', context: 'Traditional cotton outfit made of jacket, trousers and obi.' }, ja: { meaning: '柔道着', context: '上下と帯からなる伝統的な柔道の服。' } },
  Obi: { en: { meaning: 'Belt', context: 'The sash that indicates the practitioner’s grade.' }, ja: { meaning: '帯', context: '段位を示す締め帯。' } },
  Randori: { en: { meaning: 'Free practice', context: 'Training sparring without fixed choreography.' }, ja: { meaning: '乱取り', context: '形を決めずに行う自由な稽古試合。' } },
  Kata: { en: { meaning: 'Forms / sequences', context: 'Traditional exercises preserving technical principles.' }, ja: { meaning: '形', context: '技と精神を伝える定型の演武。' } },
  Rei: { en: { meaning: 'Respect / bow', context: 'Traditional greeting on entering the dojo or mat.' }, ja: { meaning: '礼', context: '道場や畳に入る時の礼儀。' } },
  Dojo: { en: { meaning: 'Place of the path', context: 'Training hall where body, mind and spirit are developed.' }, ja: { meaning: '道場', context: '技と心を磨く練習の場。' } },
  Tatami: { en: { meaning: 'Folding mat', context: 'Traditional cushioned surface used for training and falling.' }, ja: { meaning: '畳', context: '練習や受け身に使う柔らかなマット。' } }
};

// ==========================================================================
// 4. GENERADOR DE SONIDOS AMBIENTE Y ÁRBITRO (WEB AUDIO API NATIVO)
// ==========================================================================
class DojoAudioSynth {
  constructor() {
    this.ctx = null;
    this.enabled = false;
  }

  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioContext();
    }
  }

  playGong() {
    this.init();
    if (this.ctx.state === 'suspended') this.ctx.resume();

    // Campana de templo más cálida: varios armónicos breves crean un timbre
    // metálico y profundo sin el pitido plano de un único oscilador.
    const now = this.ctx.currentTime;
    const master = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(2200, now);
    master.gain.setValueAtTime(0.0001, now);
    master.gain.exponentialRampToValueAtTime(0.28, now + 0.018);
    master.gain.exponentialRampToValueAtTime(0.0001, now + 3.4);
    master.connect(filter);
    filter.connect(this.ctx.destination);

    const partials = [
      { ratio: 1, level: 0.85, type: 'sine' },
      { ratio: 2.02, level: 0.34, type: 'sine' },
      { ratio: 3.91, level: 0.18, type: 'triangle' },
      { ratio: 5.68, level: 0.08, type: 'sine' }
    ];
    partials.forEach((partial, index) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const frequency = 174.61 * partial.ratio;
      osc.type = partial.type;
      osc.frequency.setValueAtTime(frequency, now);
      osc.detune.setValueAtTime(index * 1.8, now);
      gain.gain.setValueAtTime(partial.level, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.8 + index * 0.12);
      osc.connect(gain);
      gain.connect(master);
      osc.start(now);
      osc.stop(now + 3.6);
    });
  }

  playWhistle() {
    this.init();
    if (this.ctx.state === 'suspended') this.ctx.resume();

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(2400, this.ctx.currentTime);
    osc.frequency.linearRampToValueAtTime(2600, this.ctx.currentTime + 0.1);
    osc.frequency.linearRampToValueAtTime(2300, this.ctx.currentTime + 0.25);

    gain.gain.setValueAtTime(0.3, this.ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.01, this.ctx.currentTime + 0.3);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.3);
  }

  playVictoryFanfare() {
    this.init();
    if (this.ctx.state === 'suspended') this.ctx.resume();

    const notes = [440, 554.37, 659.25, 880]; // A4, C#5, E5, A5
    notes.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime + idx * 0.12);

      gain.gain.setValueAtTime(0.15, this.ctx.currentTime + idx * 0.12);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + idx * 0.12 + 0.8);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(this.ctx.currentTime + idx * 0.12);
      osc.stop(this.ctx.currentTime + idx * 0.12 + 0.8);
    });
  }
}

const dojoSound = new DojoAudioSynth();

// ==========================================================================
// 5. MOTOR DEL SIMULADOR DE MARCADOR OLÍMPICO
// ==========================================================================
class OlympicScoreboard {
  constructor() {
    this.cacheDOM();
    if (!this.clockEl) return;

    this.white = { ippon: 0, wazaari: 0, shido: 0, name: 'H. ABE', country: 'JPN', weight: '' };
    this.blue = { ippon: 0, wazaari: 0, shido: 0, name: 'T. RINER', country: 'FRA', weight: '' };
    this.timeLeft = 240; // 4 minutos reglamentarios
    this.timerInterval = null;
    this.isRunning = false;
    this.isGoldenScore = false;
    this.isGameOver = false;

    this.bindEvents();
    this.updateDisplay();
    this.setMatchState('COMBATE LISTO', 'ready');
  }

  cacheDOM() {
    this.clockEl = document.getElementById('digital-clock');
    this.btnToggleTimer = document.getElementById('btn-toggle-timer');
    this.btnResetTimer = document.getElementById('btn-reset-timer');
    this.btnGoldenScore = document.getElementById('btn-golden-score');
    this.goldenBadge = document.getElementById('golden-score-badge');
    this.matchStateLabel = document.getElementById('match-state-label');

    // Elementos Judoka Blanco
    this.wIpponEl = document.getElementById('white-ippon');
    this.wWazaEl = document.getElementById('white-waza');
    this.wShidoEl = document.getElementById('white-shido');
    this.whiteNameEl = document.querySelector('#athlete-white .athlete-name');
    this.whiteCountryEl = document.querySelector('#athlete-white .athlete-country');
    this.whiteWeightEl = document.querySelector('#athlete-white .athlete-weight');

    // Elementos Judoka Azul
    this.bIpponEl = document.getElementById('blue-ippon');
    this.bWazaEl = document.getElementById('blue-waza');
    this.bShidoEl = document.getElementById('blue-shido');
    this.blueNameEl = document.querySelector('#athlete-blue .athlete-name');
    this.blueCountryEl = document.querySelector('#athlete-blue .athlete-country');
    this.blueWeightEl = document.querySelector('#athlete-blue .athlete-weight');

    // Banner de Victoria
    this.victoryOverlay = document.getElementById('victory-overlay');
    this.winnerTitle = document.getElementById('winner-title');
    this.winnerReason = document.getElementById('winner-reason');
    this.btnResetMatch = document.getElementById('btn-reset-match');
    this.btnEssentialInfo = document.getElementById('btn-essential-info');
    this.essentialInfoPanel = document.getElementById('essential-info-panel');
    this.btnCloseEssentialInfo = document.getElementById('btn-close-essential-info');
  }

  bindEvents() {
    if (this.btnToggleTimer) {
      this.btnToggleTimer.addEventListener('click', () => this.toggleTimer());
    }
    if (this.btnResetTimer) {
      this.btnResetTimer.addEventListener('click', () => this.resetTimer());
    }
    if (this.btnGoldenScore) {
      this.btnGoldenScore.addEventListener('click', () => this.toggleGoldenScore());
    }
    if (this.btnResetMatch) {
      this.btnResetMatch.addEventListener('click', () => this.fullReset());
    }
    if (this.btnEssentialInfo) {
      this.btnEssentialInfo.addEventListener('click', () => this.toggleEssentialInfo());
    }
    if (this.btnCloseEssentialInfo) {
      this.btnCloseEssentialInfo.addEventListener('click', () => this.toggleEssentialInfo(false));
    }

    // Botones de puntos Blanco
    document.querySelectorAll('[data-action][data-player="white"]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const action = e.currentTarget.dataset.action;
        this.addPoint('white', action);
      });
    });

    // Botones de puntos Azul
    document.querySelectorAll('[data-action][data-player="blue"]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const action = e.currentTarget.dataset.action;
        this.addPoint('blue', action);
      });
    });
  }

  toggleTimer() {
    if (this.isGameOver) return;
    if (this.isRunning) {
      clearInterval(this.timerInterval);
      this.isRunning = false;
      this.btnToggleTimer.textContent = 'Hajime (Iniciar)';
      this.btnToggleTimer.style.background = '';
      this.setMatchState('COMBATE EN PAUSA', 'paused');
    } else {
      dojoSound.playGong();
      this.isRunning = true;
      this.btnToggleTimer.textContent = 'Mate (Pausar)';
      this.btnToggleTimer.style.background = 'var(--crimson-primary)';
      this.setMatchState(this.isGoldenScore ? 'GOLDEN SCORE EN CURSO' : 'COMBATE EN CURSO', 'live');
      this.timerInterval = setInterval(() => {
        if (!this.isGoldenScore) {
          this.timeLeft--;
          if (this.timeLeft <= 0) {
            this.timeLeft = 0;
            this.stopTimer();
            dojoSound.playGong();
            this.checkEndOfRegularTime();
          }
        } else {
          // Golden score suma tiempo
          this.timeLeft++;
        }
        this.updateClock();
      }, 1000);
    }
  }

  stopTimer() {
    clearInterval(this.timerInterval);
    this.isRunning = false;
    if (this.btnToggleTimer) {
      this.btnToggleTimer.textContent = 'Hajime (Iniciar)';
      this.btnToggleTimer.style.background = '';
    }
  }

  resetTimer() {
    this.stopTimer();
    this.timeLeft = this.isGoldenScore ? 0 : 240;
    this.setMatchState(this.isGoldenScore ? 'GOLDEN SCORE LISTO' : 'COMBATE LISTO', this.isGoldenScore ? 'golden' : 'ready');
    this.updateClock();
  }

  toggleGoldenScore() {
    this.isGoldenScore = !this.isGoldenScore;
    this.resetTimer();
    if (this.isGoldenScore) {
      this.goldenBadge.classList.add('active');
      this.btnGoldenScore.textContent = 'Modo Normal';
      this.clockEl.style.color = 'var(--gold-light)';
      dojoSound.playGong();
      this.setMatchState(this.isRunning ? 'GOLDEN SCORE EN CURSO' : 'GOLDEN SCORE LISTO', 'golden');
    } else {
      this.goldenBadge.classList.remove('active');
      this.btnGoldenScore.textContent = 'Golden Score';
      this.clockEl.style.color = '#22c55e';
      this.setMatchState(this.isRunning ? 'COMBATE EN CURSO' : 'COMBATE LISTO', this.isRunning ? 'live' : 'ready');
    }
  }

  addPoint(player, action) {
    if (this.isGameOver) return;
    const current = player === 'white' ? this.white : this.blue;
    const opponentKey = player === 'white' ? 'blue' : 'white';
    const opponent = this[opponentKey];

    if (action === 'ippon') {
      current.ippon = 1;
      this.updateDisplay();
      this.triggerVictory(current, 'Victoria fulminante por IPPON (一本勝ち)');
      return;
    }

    if (action === 'wazaari') {
      current.wazaari++;
      if (current.wazaari >= 2) {
        current.wazaari = 2;
        current.ippon = 1;
        this.updateDisplay();
        this.triggerVictory(current, 'Waza-ari Awasete Ippon (技あり合せて一本)');
        return;
      }
      if (this.isGoldenScore) {
        this.updateDisplay();
        this.triggerVictory(current, 'Punto de oro en Golden Score (Waza-ari)');
        return;
      }
      dojoSound.playWhistle();
    }

    if (action === 'shido') {
      current.shido++;
      if (current.shido >= 3) {
        current.shido = 3;
        this.updateDisplay();
        this.triggerVictory(opponent, `Victoria por descalificación rival (Hansoku-make por 3 Shidos)`);
        return;
      }
      dojoSound.playWhistle();
    }

    this.updateDisplay();
  }

  checkEndOfRegularTime() {
    if (this.white.wazaari > this.blue.wazaari) {
      this.triggerVictory(this.white, 'Victoria al término del tiempo reglamentario (Waza-ari)');
    } else if (this.blue.wazaari > this.white.wazaari) {
      this.triggerVictory(this.blue, 'Victoria al término del tiempo reglamentario (Waza-ari)');
    } else {
      // Empate -> Golden score
      alert('¡Tiempo reglamentario cumplido en empate! Se activa automáticamente el GOLDEN SCORE.');
      this.toggleGoldenScore();
      this.toggleTimer();
    }
  }

  triggerVictory(winnerObj, reason) {
    this.stopTimer();
    this.isGameOver = true;
    this.setMatchState('COMBATE FINALIZADO', 'complete');
    dojoSound.playVictoryFanfare();

    this.winnerTitle.textContent = `¡VICTORIA PARA ${winnerObj.name} (${winnerObj.country})!`;
    this.winnerReason.textContent = reason;
    this.victoryOverlay.classList.add('show');

    if (window.judoTournament) {
      window.judoTournament.recordMatchWinner(winnerObj.name);
    }

  }

  fullReset() {
    this.stopTimer();
    const whiteName = this.white?.name || 'H. ABE';
    const whiteCountry = this.white?.country || 'JPN';
    const whiteWeight = this.white?.weight || '';
    const blueName = this.blue?.name || 'T. RINER';
    const blueCountry = this.blue?.country || 'FRA';
    const blueWeight = this.blue?.weight || '';
    this.white = { ippon: 0, wazaari: 0, shido: 0, name: whiteName, country: whiteCountry, weight: whiteWeight };
    this.blue = { ippon: 0, wazaari: 0, shido: 0, name: blueName, country: blueCountry, weight: blueWeight };
    this.isGameOver = false;
    this.isGoldenScore = false;
    this.timeLeft = 240;
    this.goldenBadge.classList.remove('active');
    this.btnGoldenScore.textContent = 'Golden Score';
    this.clockEl.style.color = '#22c55e';
    this.setMatchState('COMBATE LISTO', 'ready');
    this.victoryOverlay.classList.remove('show');
    this.updateClock();
    this.updateDisplay();
  }

  setAthletes(whiteEntry, blueEntry) {
    const whiteCompetitor = typeof whiteEntry === 'string' ? { name: whiteEntry, weight: '' } : whiteEntry;
    const blueCompetitor = typeof blueEntry === 'string' ? { name: blueEntry, weight: '' } : blueEntry;
    this.white.name = whiteCompetitor.name;
    this.white.country = 'DOJO';
    this.white.weight = whiteCompetitor.weight || '';
    this.blue.name = blueCompetitor.name;
    this.blue.country = 'DOJO';
    this.blue.weight = blueCompetitor.weight || '';
    if (this.whiteNameEl) this.whiteNameEl.textContent = whiteCompetitor.name;
    if (this.whiteCountryEl) this.whiteCountryEl.textContent = 'DOJO';
    if (this.whiteWeightEl) this.whiteWeightEl.textContent = whiteCompetitor.weight ? `${whiteCompetitor.weight} kg` : '';
    if (this.blueNameEl) this.blueNameEl.textContent = blueCompetitor.name;
    if (this.blueCountryEl) this.blueCountryEl.textContent = 'DOJO';
    if (this.blueWeightEl) this.blueWeightEl.textContent = blueCompetitor.weight ? `${blueCompetitor.weight} kg` : '';
    this.fullReset();
  }

  setMatchState(label, state) {
    if (!this.matchStateLabel) return;
    this.matchStateLabel.textContent = label;
    this.matchStateLabel.dataset.state = state;
  }

  toggleEssentialInfo(forceOpen) {
    if (!this.essentialInfoPanel || !this.btnEssentialInfo) return;
    const shouldOpen = typeof forceOpen === 'boolean'
      ? forceOpen
      : this.essentialInfoPanel.hidden;
    this.essentialInfoPanel.hidden = !shouldOpen;
    this.btnEssentialInfo.setAttribute('aria-expanded', String(shouldOpen));
  }

  updateClock() {
    const mins = Math.floor(this.timeLeft / 60);
    const secs = this.timeLeft % 60;
    this.clockEl.textContent = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  }

  updateDisplay() {
    if (this.wIpponEl) this.wIpponEl.textContent = this.white.ippon;
    if (this.wWazaEl) this.wWazaEl.textContent = this.white.wazaari;
    if (this.wShidoEl) this.wShidoEl.textContent = this.white.shido;

    if (this.bIpponEl) this.bIpponEl.textContent = this.blue.ippon;
    if (this.bWazaEl) this.bWazaEl.textContent = this.blue.wazaari;
    if (this.bShidoEl) this.bShidoEl.textContent = this.blue.shido;
  }
}

// ========================================================================== 
// 6. CREADOR DE TORNEOS Y CUADRO DE ELIMINACIÓN
// ========================================================================== 
function initTournamentBuilder(scoreboard) {
  const builder = document.getElementById('tournament-builder');
  if (!builder) return null;

  const form = document.getElementById('tournament-form');
  const tournamentNameInput = document.getElementById('tournament-name');
  const participantInput = document.getElementById('participant-name');
  const weightInput = document.getElementById('participant-weight');
  const participantList = document.getElementById('participant-list');
  const participantCount = document.getElementById('participant-count');
  const addParticipantButton = document.getElementById('add-participant');
  const clearButton = document.getElementById('clear-tournament');
  const message = document.getElementById('tournament-form-message');
  const preview = document.getElementById('tournament-preview');
  const previewRounds = document.getElementById('bracket-rounds');
  const status = document.getElementById('tournament-status');
  const activePanel = document.getElementById('active-tournament-panel');
  const activeKicker = document.getElementById('active-tournament-kicker');
  const activeName = document.getElementById('active-tournament-name');
  const activeMeta = document.getElementById('active-tournament-meta');
  const bracket = document.getElementById('tournament-bracket');
  const nextMatchButton = document.getElementById('load-next-match');
  const newTournamentButton = document.getElementById('new-tournament');
  const scoreboardSection = document.getElementById('simulador');
  const overviewEntries = document.getElementById('overview-entries');
  const overviewRounds = document.getElementById('overview-rounds');
  const overviewFinished = document.getElementById('overview-finished');
  const overviewNext = document.getElementById('overview-next');

  let participants = [];
  let tournament = null;

  const roundLabel = (index, total) => {
    if (total === 1 || index === total - 1) return 'Final';
    if (index === total - 2) return 'Semifinales';
    if (index === total - 3) return 'Cuartos de final';
    return `Ronda ${index + 1}`;
  };

  const formatCompetitor = (competitor) => competitor ? `${competitor.name} · ${competitor.weight} kg` : 'Por definir';

  function setMessage(text, type = '') {
    message.textContent = text;
    message.className = `tournament-form-message ${type}`.trim();
  }

  function renderParticipants() {
    participantCount.textContent = `${participants.length} / 32`;
    participantList.innerHTML = '';

    participants.forEach((participant, index) => {
      const item = document.createElement('li');
      item.className = 'participant-row';
      const label = document.createElement('span');
      label.textContent = formatCompetitor(participant);
      const remove = document.createElement('button');
      remove.className = 'participant-remove';
      remove.type = 'button';
      remove.textContent = 'Quitar';
      remove.setAttribute('aria-label', `Quitar a ${participant.name}`);
      remove.addEventListener('click', () => {
        participants.splice(index, 1);
        renderParticipants();
        renderPreview();
        setMessage('');
      });
      item.append(label, remove);
      participantList.appendChild(item);
    });
  }

  function renderPreview() {
    preview.innerHTML = '';
    if (participants.length === 0) {
      preview.innerHTML = '<p class="bracket-empty-state">Añade participantes para ver cómo se organizará el cuadro.</p>';
      previewRounds.textContent = 'Sin participantes';
      return;
    }

    const matchCount = Math.ceil(participants.length / 2);
    const previewGrid = document.createElement('div');
    previewGrid.className = 'preview-match-list';
    for (let index = 0; index < matchCount; index++) {
      const match = document.createElement('div');
      match.className = 'preview-match';
      const first = document.createElement('span');
      first.textContent = participants[index * 2] ? formatCompetitor(participants[index * 2]) : 'Bye';
      const second = document.createElement('span');
      second.textContent = participants[index * 2 + 1] ? formatCompetitor(participants[index * 2 + 1]) : 'Bye';
      match.append(first, second);
      previewGrid.appendChild(match);
    }
    preview.appendChild(previewGrid);
    const rounds = Math.ceil(Math.log2(Math.max(2, participants.length)));
    previewRounds.textContent = `${rounds} ${rounds === 1 ? 'ronda' : 'rondas'}`;
  }

  function makeRounds(names) {
    const size = 2 ** Math.ceil(Math.log2(Math.max(2, names.length)));
    const rounds = [];
    const firstRound = [];

    for (let index = 0; index < size; index += 2) {
      firstRound.push({
        id: `round-1-match-${index / 2 + 1}`,
        players: [names[index] || null, names[index + 1] || null],
        source: null,
        winner: null,
        status: 'pending'
      });
    }
    rounds.push(firstRound);

    let previous = firstRound;
    let roundNumber = 2;
    while (previous.length > 1) {
      const next = [];
      for (let index = 0; index < previous.length; index += 2) {
        next.push({
          id: `round-${roundNumber}-match-${index / 2 + 1}`,
          players: [null, null],
          source: [previous[index], previous[index + 1]],
          winner: null,
          status: 'pending'
        });
      }
      rounds.push(next);
      previous = next;
      roundNumber++;
    }
    return rounds;
  }

  function syncRounds() {
    if (!tournament) return;
    const rounds = tournament.rounds;

    rounds[0].forEach((match) => {
      if (match.status === 'pending' && match.players[0] && !match.players[1]) {
        match.winner = match.players[0];
        match.status = 'bye';
      }
    });

    for (let roundIndex = 1; roundIndex < rounds.length; roundIndex++) {
      rounds[roundIndex].forEach((match) => {
        const [firstSource, secondSource] = match.source;
        const sourcesResolved = [firstSource, secondSource].every(source => source.status === 'won' || source.status === 'bye');
        if (firstSource.status === 'won' || firstSource.status === 'bye') match.players[0] = firstSource.winner;
        if (secondSource.status === 'won' || secondSource.status === 'bye') match.players[1] = secondSource.winner;

        if (match.status === 'pending' && sourcesResolved && match.players[0] && !match.players[1]) {
          match.winner = match.players[0];
          match.status = 'bye';
        }
      });
    }
  }

  function allMatches() {
    return tournament ? tournament.rounds.flat() : [];
  }

  function currentMatch() {
    return tournament ? allMatches().find(match => match.id === tournament.currentMatchId) : null;
  }

  function readyMatch() {
    return tournament && allMatches().find(match => match.status === 'pending' && match.players[0] && match.players[1]);
  }

  function createElementWithText(tag, className, text) {
    const element = document.createElement(tag);
    element.className = className;
    element.textContent = text;
    return element;
  }

  function renderBracket() {
    if (!tournament) return;
    syncRounds();
    bracket.innerHTML = '';

    tournament.rounds.forEach((round, roundIndex) => {
      const column = document.createElement('div');
      column.className = 'bracket-column';
      column.appendChild(createElementWithText('h3', 'bracket-round-title', roundLabel(roundIndex, tournament.rounds.length)));

      const matchStack = document.createElement('div');
      matchStack.className = 'bracket-match-stack';
      round.forEach(match => {
        const hasTwoPlayers = Boolean(match.players[0] && match.players[1]);
        const card = document.createElement('article');
        card.className = `bracket-match-card ${match.status} ${hasTwoPlayers && match.status === 'pending' ? 'ready' : ''} ${match.id === tournament.currentMatchId ? 'current' : ''}`.trim();
        const cardHeader = document.createElement('div');
        cardHeader.className = 'bracket-match-header';
        cardHeader.appendChild(createElementWithText('span', 'bracket-match-number', `Combate ${roundIndex + 1}.${round.indexOf(match) + 1}`));
        const stateLabel = match.status === 'won' ? 'Finalizado' : match.status === 'bye' ? 'Pase directo' : match.status === 'active' ? 'En curso' : hasTwoPlayers ? 'Listo' : 'A la espera';
        cardHeader.appendChild(createElementWithText('span', 'bracket-match-state', stateLabel));
        card.appendChild(cardHeader);

        match.players.forEach((player, playerIndex) => {
          const slot = document.createElement('div');
          slot.className = `bracket-player ${match.winner === player && player ? 'winner' : ''}`.trim();
          const playerName = createElementWithText('strong', 'bracket-player-name', player?.name || 'Por definir');
          const playerWeight = createElementWithText('span', 'bracket-player-weight', player ? `${player.weight} kg` : '—');
          slot.append(playerName, playerWeight);
          if (playerIndex === 0) slot.dataset.side = 'white';
          card.appendChild(slot);
        });
        matchStack.appendChild(card);
      });
      column.appendChild(matchStack);
      bracket.appendChild(column);
    });

    const next = readyMatch();
    nextMatchButton.disabled = !next;
    nextMatchButton.textContent = next ? 'Cargar siguiente combate' : (tournament.rounds.at(-1)[0].status === 'won' ? 'Torneo completado' : 'Esperando resultado');
    const matches = allMatches();
    const completedMatches = matches.filter(match => match.status === 'won' || match.status === 'bye').length;
    if (overviewEntries) overviewEntries.textContent = tournament.participants.length;
    if (overviewRounds) overviewRounds.textContent = tournament.rounds.length;
    if (overviewFinished) overviewFinished.textContent = `${completedMatches} / ${matches.length}`;
    if (overviewNext) {
      if (next) {
        const nextRoundIndex = tournament.rounds.findIndex(round => round.includes(next));
        const nextMatchIndex = tournament.rounds[nextRoundIndex].indexOf(next);
        overviewNext.textContent = `${nextRoundIndex + 1}.${nextMatchIndex + 1}`;
      } else {
        overviewNext.textContent = tournament.rounds.at(-1)[0].status === 'won' ? 'Completado' : 'En curso';
      }
    }
  }

  function loadNextMatch() {
    if (!tournament) return;
    syncRounds();
    const next = readyMatch();
    if (!next) return;
    if (tournament.currentMatchId) {
      const previous = currentMatch();
      if (previous && previous.status === 'active') return;
    }
    next.status = 'active';
    tournament.currentMatchId = next.id;
    scoreboard.setAthletes(next.players[0], next.players[1]);
    status.textContent = 'Combate en curso';
    status.dataset.state = 'live';
    activeKicker.textContent = 'Combate actual';
    activeMeta.textContent = `${tournament.participants.length} participantes · ${next.players[0].name} contra ${next.players[1].name}.`;
    renderBracket();
    scoreboardSection.hidden = false;
    scoreboardSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function recordMatchWinner(name) {
    if (!tournament) return;
    const match = currentMatch();
    if (!match || match.status !== 'active') return;
    match.winner = match.players.find(player => player?.name === name) || { name, weight: '' };
    match.status = 'won';
    tournament.currentMatchId = null;
    syncRounds();
    renderBracket();

    const final = tournament.rounds.at(-1)[0];
    if (final.status === 'won') {
      status.textContent = 'Torneo completado';
      status.dataset.state = 'complete';
      activeKicker.textContent = 'Torneo completado';
      activeMeta.textContent = `${tournament.participants.length} participantes · Ganador: ${final.winner.name}.`;
    } else {
      status.textContent = 'Siguiente combate';
      status.dataset.state = 'ready';
      activeKicker.textContent = 'Próximo combate';
      activeMeta.textContent = `${tournament.participants.length} participantes · Elige el siguiente combate cuando estés listo.`;
    }
  }

  function addParticipant() {
    const name = participantInput.value.trim();
    const weight = Number.parseFloat(weightInput.value);
    if (!name) {
      setMessage('Escribe un nombre antes de añadirlo.', 'error');
      participantInput.focus();
      return;
    }
    if (!Number.isFinite(weight) || weight < 20 || weight > 250) {
      setMessage('Indica un peso válido entre 20 y 250 kg.', 'error');
      weightInput.focus();
      return;
    }
    if (participants.length >= 32) {
      setMessage('El cuadro admite un máximo de 32 participantes.', 'error');
      return;
    }
    if (participants.some(participant => participant.name.toLowerCase() === name.toLowerCase())) {
      setMessage('Ese nombre ya está en la lista.', 'error');
      participantInput.focus();
      return;
    }
    participants.push({ name, weight: Number(weight.toFixed(1)) });
    participantInput.value = '';
    weightInput.value = '';
    renderParticipants();
    renderPreview();
    setMessage('');
    participantInput.focus();
  }

  function resetBuilder() {
    participants = [];
    tournament = null;
    builder.hidden = false;
    tournamentNameInput.value = '';
    participantInput.value = '';
    weightInput.value = '';
    activePanel.hidden = true;
    scoreboardSection.hidden = true;
    status.textContent = 'Sin torneo activo';
    status.dataset.state = 'empty';
    activeKicker.textContent = 'Próximo combate';
    setMessage('');
    renderParticipants();
    renderPreview();
  }

  addParticipantButton.addEventListener('click', addParticipant);
  participantInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      addParticipant();
    }
  });
  clearButton.addEventListener('click', resetBuilder);
  newTournamentButton.addEventListener('click', resetBuilder);
  nextMatchButton.addEventListener('click', loadNextMatch);

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const name = tournamentNameInput.value.trim();
    if (!name) {
      setMessage('Ponle un nombre al torneo para continuar.', 'error');
      tournamentNameInput.focus();
      return;
    }
    if (participants.length < 2) {
      setMessage('Añade al menos dos participantes para crear el cuadro.', 'error');
      participantInput.focus();
      return;
    }

    tournament = {
      name,
      participants: [...participants],
      rounds: makeRounds(participants),
      currentMatchId: null
    };
    builder.hidden = true;
    activePanel.hidden = false;
    activeName.textContent = name;
    activeMeta.textContent = `${participants.length} participantes · El cuadro está listo para empezar.`;
    status.textContent = 'Torneo preparado';
    status.dataset.state = 'ready';
    activeKicker.textContent = 'Próximo combate';
    syncRounds();
    renderBracket();
    loadNextMatch();
  });

  renderParticipants();
  renderPreview();
  return { recordMatchWinner };
}

// ========================================================================== 
// 7. PROFESOR KANO — ASISTENTE LOCAL DE PREGUNTAS
// ========================================================================== 
function initProfessorAssistant() {
  if (document.getElementById('professor-rail')) return;

  const rail = document.createElement('aside');
  rail.className = 'professor-rail';
  rail.id = 'professor-rail';
  rail.setAttribute('aria-label', 'Profesor Kano, asistente de Judo');
  rail.innerHTML = `
    <button class="professor-rail-toggle" id="professor-rail-toggle" type="button" aria-expanded="false" aria-controls="professor-rail-content">
      <span class="professor-toggle-mark" aria-hidden="true">問</span>
      <span class="professor-toggle-label">Profesor</span>
    </button>
    <div class="professor-rail-content" id="professor-rail-content">
    <div class="professor-rail-header">
      <div>
        <span class="professor-rail-kicker">Asistencia de entrenamiento</span>
        <h2>Profesor Kano</h2>
      </div>
      <span class="professor-rail-badge">IA local</span>
    </div>
    <p class="professor-rail-intro">Preguntas rápidas sobre reglas, puntuación y fundamentos del judo.</p>
    <form class="professor-rail-form" id="professor-form">
      <label for="professor-question">Tu pregunta</label>
      <div class="professor-rail-input-row">
        <input id="professor-question" type="text" maxlength="180" placeholder="¿Qué es un Ippon?" autocomplete="off">
        <button type="submit">Preguntar</button>
      </div>
      <div class="professor-rail-prompts" aria-label="Preguntas sugeridas">
        <button type="button" class="professor-prompt" data-professor-question="¿Cómo funciona el Golden Score?">Golden Score</button>
        <button type="button" class="professor-prompt" data-professor-question="¿Qué significa kuzushi?">Kuzushi</button>
        <button type="button" class="professor-prompt" data-professor-question="¿Cuántos shidos descalifican?">Shidos</button>
        <button type="button" class="professor-prompt" data-professor-question="¿Qué es ukemi?">Ukemi</button>
        <button type="button" class="professor-prompt" data-professor-question="¿Cómo funciona el kumi-kata?">Agarres</button>
        <button type="button" class="professor-prompt" data-professor-question="¿Cómo entreno con seguridad?">Seguridad</button>
      </div>
    </form>
    <div class="professor-rail-answer" id="professor-answer" aria-live="polite">
      <span class="professor-answer-label">Respuesta del profesor</span>
      <p id="professor-answer-text">Escribe una pregunta o elige un tema para empezar.</p>
    </div>
    </div>
  `;
  document.body.classList.add('has-professor-rail');
  const header = document.querySelector('.site-header');
  if (header) header.insertAdjacentElement('afterend', rail);
  else document.body.insertBefore(rail, document.body.firstChild);

  const form = document.getElementById('professor-form');
  const input = document.getElementById('professor-question');
  const answer = document.getElementById('professor-answer-text');
  const toggle = document.getElementById('professor-rail-toggle');
  if (!form || !input || !answer) return;

  const professorLanguageCopy = {
    es: {
      aria: 'Profesor Kano, asistente de Judo', kicker: 'Asistencia de entrenamiento', title: 'Profesor Kano', badge: 'IA local', intro: 'Preguntas rápidas sobre reglas, puntuación y fundamentos del judo.', question: 'Tu pregunta', placeholder: '¿Qué es un Ippon?', ask: 'Preguntar', answer: 'Respuesta del profesor', empty: 'Escribe una pregunta o elige un tema para empezar.', prompts: ['Golden Score', 'Kuzushi', 'Shidos', 'Ukemi', 'Agarres', 'Seguridad'], questions: ['¿Cómo funciona el Golden Score?', '¿Qué significa kuzushi?', '¿Cuántos shidos descalifican?', '¿Qué es ukemi?', '¿Cómo funciona el kumi-kata?', '¿Cómo entreno con seguridad?']
    },
    en: {
      aria: 'Professor Kano, Judo assistant', kicker: 'Training assistance', title: 'Professor Kano', badge: 'Local AI', intro: 'Quick questions about rules, scoring and Judo fundamentals.', question: 'Your question', placeholder: 'What is an Ippon?', ask: 'Ask', answer: 'Professor’s answer', empty: 'Write a question or choose a topic to begin.', prompts: ['Golden Score', 'Kuzushi', 'Shidos', 'Ukemi', 'Grip fighting', 'Safety'], questions: ['How does Golden Score work?', 'What does kuzushi mean?', 'How many shidos cause disqualification?', 'What is ukemi?', 'How does kumi-kata work?', 'How do I train safely?']
    },
    ja: {
      aria: '嘉納教授、柔道アシスタント', kicker: '稽古のサポート', title: '嘉納教授', badge: 'ローカルAI', intro: 'ルール、得点、柔道の基礎について質問できます。', question: '質問', placeholder: '一本とは何ですか？', ask: '質問する', answer: '教授の回答', empty: '質問を入力するか、テーマを選んでください。', prompts: ['ゴールデンスコア', '崩し', '指導', '受け身', '組み手', '安全'], questions: ['ゴールデンスコアの仕組みは？', '崩しとは何ですか？', '何回の指導で反則負けですか？', '受け身とは何ですか？', '組み手の役割は？', '安全に稽古するには？']
    }
  };

  function refreshProfessorLanguage() {
    const language = professorLanguageCopy[document.documentElement.lang] ? document.documentElement.lang : 'es';
    const copy = professorLanguageCopy[language];
    rail.setAttribute('aria-label', copy.aria);
    rail.querySelector('.professor-rail-kicker').textContent = copy.kicker;
    rail.querySelector('.professor-rail-header h2').textContent = copy.title;
    rail.querySelector('.professor-rail-badge').textContent = copy.badge;
    rail.querySelector('.professor-rail-intro').textContent = copy.intro;
    rail.querySelector('label[for="professor-question"]').textContent = copy.question;
    input.placeholder = copy.placeholder;
    rail.querySelector('.professor-rail-input-row button').textContent = copy.ask;
    rail.querySelector('.professor-answer-label').textContent = copy.answer;
    document.querySelectorAll('.professor-prompt').forEach((button, index) => {
      button.textContent = copy.prompts[index];
      button.dataset.professorQuestion = copy.questions[index];
    });
    if (!input.value) answer.textContent = copy.empty;
  }

  refreshProfessorLanguage();
  window.refreshProfessorLanguage = refreshProfessorLanguage;

  const setOpen = (open) => {
    rail.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', String(open));
  };

  rail.addEventListener('click', event => event.stopPropagation());
  toggle.addEventListener('click', () => setOpen(!rail.classList.contains('open')));
  document.addEventListener('click', event => {
    if (!rail.contains(event.target)) setOpen(false);
  });

  const answers = [
    { terms: ['ippon', 'waza-ari', 'wazaari', 'puntuación', 'puntos'], text: 'Ippon es la puntuación decisiva: termina el combate. Waza-ari representa una acción de gran calidad; dos waza-ari equivalen a un Ippon.' },
    { terms: ['golden score', 'punto de oro', 'empate', 'tiempo extra', 'ゴールデンスコア'], text: 'Si el tiempo termina igualado, comienza el Golden Score. El primer punto válido decide el combate, sin límite de tiempo.' },
    { terms: ['shido', 'sanción', 'penalización', 'descalifican', 'descalificación', '指導'], text: 'Los shidos son sanciones por infracciones. El tercer shido provoca hansoku-make y da la victoria al rival.' },
    { terms: ['hansoku-make', 'descalificación'], text: 'Hansoku-make es la descalificación. Puede producirse por tres shidos o por una infracción grave; el rival gana el combate.' },
    { terms: ['kuzushi', 'desequilibrio', '崩し'], text: 'Kuzushi es el desequilibrio de Uke. Es el primer momento de una técnica: abrir una dirección antes de colocar el cuerpo y ejecutar.' },
    { terms: ['tsukuri', 'colocación', 'entrada'], text: 'Tsukuri es la fase de colocación: Tori ajusta los pies, la cadera y el agarre para que la técnica pueda continuar con seguridad.' },
    { terms: ['kake', 'ejecución', 'proyección'], text: 'Kake es la ejecución de la técnica. El desequilibrio y la colocación ya están preparados; ahora Tori aplica la acción final con control.' },
    { terms: ['ukemi', 'caer', 'caída', 'caerse', '受け身'], text: 'Ukemi es el aprendizaje de la caída segura. Practica la espalda redonda, protege la cabeza y disipa el impacto con brazos y piernas.' },
    { terms: ['tori', 'atacante'], text: 'Tori es quien ejecuta la técnica. Uke es quien la recibe y practica la caída; ambos aprenden y colaboran durante el entrenamiento.' },
    { terms: ['uke', 'receptor'], text: 'Uke es quien recibe la técnica y realiza la caída controlada. Un buen Uke ayuda a que Tori practique con precisión y seguridad.' },
    { terms: ['randori', 'combate libre', 'entrenamiento'], text: 'Randori es la práctica libre. No se trata de ganar a cualquier precio, sino de probar técnicas, adaptarse al compañero y mantener el control.' },
    { terms: ['kata', 'forma', 'formas'], text: 'Kata son formas preestablecidas que conservan principios técnicos y de comportamiento. Se practican con precisión, ritmo, distancia y respeto.' },
    { terms: ['dojo', 'sala', 'lugar'], text: 'Dojo significa lugar del camino. Es el espacio de práctica donde se entrena la técnica, el carácter y el respeto por los compañeros.' },
    { terms: ['tatami', 'esterilla', 'suelo'], text: 'El tatami es la superficie de práctica. Debe mantenerse limpio y despejado, y las caídas se entrenan progresivamente para reducir riesgos.' },
    { terms: ['judogi', 'kimono', 'traje', 'uniforme'], text: 'El judogi es la ropa de práctica. Debe estar limpio, bien ajustado y con el cinturón correctamente anudado antes de entrar al tatami.' },
    { terms: ['obi', 'cinturón', 'grado', 'kyu', 'dan'], text: 'El obi es el cinturón que sujeta el judogi y muestra el grado. Los kyu corresponden a la progresión inicial; los dan empiezan con el cinturón negro.' },
    { terms: ['rei', 'saludo', 'reverencia', 'etiqueta'], text: 'Rei es el saludo. Marca respeto hacia el dojo, el compañero y la práctica; se realiza con atención, sin convertirlo en un gesto automático.' },
    { terms: ['agarre', 'agarres', 'kumi-kata', 'manga', 'solapa', 'grip', '組み手'], text: 'Kumi-kata es el trabajo de agarres. Controlar manga y solapa permite desequilibrar, mover al rival y preparar una entrada sin tirar solo con los brazos.' },
    { terms: ['osaekomi', 'inmovilización', 'inmovilizar'], text: 'Osaekomi es una inmovilización reconocida en suelo. Tori controla el tronco de Uke y mantiene la posición con estabilidad, presión y movilidad.' },
    { terms: ['ne-waza', 'suelo', 'suelo'], text: 'Ne-waza es el trabajo de suelo: controles, escapes y transiciones. La prioridad es conservar una posición segura y avanzar con técnica, no con fuerza desordenada.' },
    { terms: ['tachi-waza', 'de pie', 'pie'], text: 'Tachi-waza es el trabajo de pie. Incluye el desplazamiento, los agarres, el desequilibrio y las proyecciones antes de llegar al suelo.' },
    { terms: ['nage-waza', 'lanzamiento', 'proyección'], text: 'Nage-waza reúne las técnicas de proyección. Se organizan por familias como técnicas de mano, cadera, pierna y sacrificio.' },
    { terms: ['katame-waza', 'control', 'sumisión'], text: 'Katame-waza reúne las técnicas de control en suelo: inmovilizaciones, estrangulaciones y luxaciones permitidas según la edad y el reglamento.' },
    { terms: ['peso', 'categoría', 'kg', 'kilogramo', 'pesaje'], text: 'El peso ayuda a ordenar el torneo y a comprobar que cada judoka compite en la categoría prevista. En este cuadro se muestra junto a cada nombre.' },
    { terms: ['kano', 'jigoro', 'fundador', 'historia'], text: 'Jigoro Kano fundó el Kodokan Judo en 1882. Sus principios más conocidos son Seiryoku Zenyo, uso óptimo de la energía, y Jita Kyoei, prosperidad mutua.' },
    { terms: ['seiryoku', 'energía', 'fuerza'], text: 'Seiryoku Zenyo significa usar la energía de la manera más eficaz. En judo no consiste en emplear más fuerza, sino en aprovechar equilibrio, dirección y momento.' },
    { terms: ['jita', 'prosperidad', 'compañero', 'respeto'], text: 'Jita Kyoei significa prosperidad mutua. El entrenamiento mejora cuando Tori y Uke se cuidan, se exigen con respeto y progresan juntos.' },
    { terms: ['mejorar', 'practicar', 'entrenar', 'rutina'], text: 'Para mejorar, combina ukemi, desplazamientos, uchikomi, nagekomi y randori con objetivos concretos. La constancia y la calidad de cada repetición importan más que entrenar sin atención.' },
    { terms: ['seguridad', 'lesión', 'dolor', 'calentamiento', 'safely', 'safety', '安全'], text: 'Entrena con calentamiento, respeta el nivel del compañero y detén la práctica si aparece dolor agudo. Las caídas se aprenden antes de aumentar velocidad o intensidad.' }
  ];

  const localizedAnswers = {
    en: {
      'golden score': 'When regulation time ends level, Golden Score begins. The first valid score decides the contest, with no time limit.',
      shido: 'Shidos are penalties for infringements. The third shido becomes hansoku-make and gives the victory to the opponent.',
      kuzushi: 'Kuzushi is Uke’s unbalancing. It is the first phase of a technique: open a direction before setting the body and executing.',
      ukemi: 'Ukemi is the practice of safe falling. Round the back, protect the head and dissipate impact with the arms and legs.',
      agarre: 'Kumi-kata is grip fighting. Controlling the sleeve and collar helps unbalance, move the opponent and prepare an entry.',
      seguridad: 'Warm up, respect your partner’s level and stop if sharp pain appears. Learn falls before increasing speed or intensity.'
    },
    ja: {
      'golden score': '試合時間が同点で終わるとゴールデンスコアに入り、最初の有効な得点で勝敗が決まります。',
      shido: '指導は反則に対するペナルティです。三つ目の指導で反則負けとなり、相手の勝ちになります。',
      kuzushi: '崩しは相手のバランスを崩すことです。体を作って技を掛ける前の、技の第一段階です。',
      ukemi: '受け身は安全に倒れる練習です。背中を丸め、頭を守り、腕と脚で衝撃を分散します。',
      agarre: '組み手は相手を動かすための握り方です。袖と襟を制御し、崩しと技への入りを作ります。',
      seguridad: '準備運動を行い、相手のレベルを尊重し、鋭い痛みがあれば中止してください。速さを上げる前に受け身を学びます。'
    }
  };

  function answerQuestion(question) {
    const normalized = question.trim().toLowerCase();
    if (!normalized) return 'Escribe una pregunta para que pueda ayudarte.';
    const match = answers.find(entry => entry.terms.some(term => normalized.includes(term)));
    if (match) {
      const language = document.documentElement.lang;
      return localizedAnswers[language]?.[match.terms[0]] || match.text;
    }

    const tokens = normalized
      .split(/[^a-záéíóúüñ-]+/i)
      .filter(token => token.length > 3);
    const nearest = answers
      .map(entry => ({
        entry,
        score: entry.terms.reduce((total, term) => total + tokens.reduce((points, token) => {
          return points + (term.includes(token) || token.includes(term) ? 1 : 0);
        }, 0), 0)
      }))
      .sort((a, b) => b.score - a.score)[0];
    const nearestText = nearest && nearest.score > 0
      ? nearest.entry.text
      : answers.find(entry => entry.terms.includes('entrenar')).text;
    return `No sé exactamente qué me has preguntado, pero lo más cercano que conozco es esto: ${nearestText}`;
  }

  function respond(question) {
    input.value = question;
    answer.textContent = answerQuestion(question);
  }

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    respond(input.value);
  });

  document.querySelectorAll('[data-professor-question]').forEach(button => {
    button.addEventListener('click', () => respond(button.dataset.professorQuestion));
  });
}

// ========================================================================== 
// 8. CONTROLADOR DEL VISOR DE TÉCNICAS (RENDER & FILTROS)
// ========================================================================== 
function initTechniquesExplorer() {
  const grid = document.getElementById('waza-grid');
  const searchInput = document.getElementById('waza-search');
  const filterBtns = document.querySelectorAll('.filter-tab-btn');
  const modal = document.getElementById('waza-modal');
  const modalClose = document.getElementById('btn-close-modal');

  let activeCategory = 'all';
  let searchTerm = '';

  const language = () => document.documentElement.lang || 'es';

  const getLocalizedTechnique = (tech, field) => {
    const lang = language();
    const local = TECHNIQUE_LOCALIZATIONS[tech.id]?.[lang];
    if (!local) return tech[field];
    if (field === 'biomechanics') return local.biomechanics || tech.biomechanics;
    return local[field] ?? tech[field];
  };

  function renderTechniques() {
    if (!grid) return;
    grid.innerHTML = '';

    const filtered = TECHNIQUES_DB.filter(tech => {
      const localizedName = getLocalizedTechnique(tech, 'name');
      const localizedTranslation = getLocalizedTechnique(tech, 'translation');
      const localizedDescription = getLocalizedTechnique(tech, 'description');
      const matchCat = activeCategory === 'all' || tech.category === activeCategory;
      const matchSearch = localizedName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          tech.japanese.includes(searchTerm) ||
                          localizedTranslation.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          localizedDescription.toLowerCase().includes(searchTerm.toLowerCase());
      return matchCat && matchSearch;
    });

    if (filtered.length === 0) {
      const noResultsText = language() === 'en'
        ? 'No techniques matched that criterion.'
        : language() === 'ja'
          ? '条件に合う技は見つかりませんでした。'
          : 'No se encontraron técnicas con ese criterio.';
      const tryText = language() === 'en'
        ? 'Try terms like "Seoi", "Mata", "Gari" or "Gatame".'
        : language() === 'ja'
          ? '「Seoi」「Mata」「Gari」「Gatame」などを試してみてください。'
          : 'Prueba con términos como "Seoi", "Mata", "Gari" o "Gatame".';
      grid.innerHTML = `
        <div style="grid-column: 1/-1; text-align: center; padding: 40px; color: var(--text-muted);">
          <p style="font-size: 1.2rem; margin-bottom: 8px;">${noResultsText}</p>
          <p style="font-size: 0.9rem;">${tryText}</p>
        </div>
      `;
      return;
    }

    const stepLabels = {
      es: ['1. Kuzushi', '2. Tsukuri', '3. Kake'],
      en: ['1. Kuzushi', '2. Tsukuri', '3. Kake'],
      ja: ['1. 崩し', '2. 作り', '3. 掛け']
    };
    const stepTitles = {
      es: ['Desequilibrio', 'Colocación', 'Proyección'],
      en: ['Unbalance', 'Setup', 'Execution'],
      ja: ['崩し', '作り', '掛け']
    };
    const difficultyText = {
      es: 'Dificultad:',
      en: 'Difficulty:',
      ja: '難易度：'
    };
    const breakdownText = {
      es: 'Ver Desglose',
      en: 'View breakdown',
      ja: '詳細を見る'
    };

    filtered.forEach(tech => {
      const card = document.createElement('article');
      card.className = 'waza-card';
      const isKatame = tech.category === 'katame';
      const stars = '★'.repeat(tech.difficulty) + '☆'.repeat(5 - tech.difficulty);
      const localizedName = getLocalizedTechnique(tech, 'name');
      const localizedTranslation = getLocalizedTechnique(tech, 'translation');
      const localizedDescription = getLocalizedTechnique(tech, 'description');
      const localizedCategory = getLocalizedTechnique(tech, 'categoryName');
      const localizedBiomechanics = getLocalizedTechnique(tech, 'biomechanics');
      const currentLanguage = language();

      card.innerHTML = `
        <div>
          <div class="waza-card-header">
            <span class="waza-badge ${isKatame ? 'katame' : ''}">${localizedCategory}</span>
            <span class="waza-kanji-stamp">${tech.japanese}</span>
          </div>
          <h3 class="waza-name">${localizedName}</h3>
          <div class="waza-translation">${localizedTranslation}</div>
          <p class="waza-desc">${localizedDescription}</p>
          
          <div class="waza-steps-strip">
            <div class="step-chip">
              <div class="step-chip-title">${stepLabels[currentLanguage][0]}</div>
              <div class="step-chip-desc" title="${localizedBiomechanics.kuzushi}">${stepTitles[currentLanguage][0]}</div>
            </div>
            <div class="step-chip">
              <div class="step-chip-title">${stepLabels[currentLanguage][1]}</div>
              <div class="step-chip-desc" title="${localizedBiomechanics.tsukuri}">${stepTitles[currentLanguage][1]}</div>
            </div>
            <div class="step-chip">
              <div class="step-chip-title">${stepLabels[currentLanguage][2]}</div>
              <div class="step-chip-desc" title="${localizedBiomechanics.kake}">${stepTitles[currentLanguage][2]}</div>
            </div>
          </div>
        </div>

        <div class="waza-card-footer">
          <div class="difficulty-rating">
            <span>${difficultyText[currentLanguage]}</span>
            <span class="difficulty-stars">${stars}</span>
          </div>
          <button class="btn-waza-detail" data-id="${tech.id}">
            ${breakdownText[currentLanguage]} <span>→</span>
          </button>
        </div>
      `;

      grid.appendChild(card);
    });

    document.querySelectorAll('.btn-waza-detail').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.currentTarget.dataset.id;
        openWazaModal(id);
      });
    });
  }

  function openWazaModal(id) {
    const tech = TECHNIQUES_DB.find(t => t.id === id);
    if (!tech || !modal) return;

    const currentLanguage = language();
    const localized = TECHNIQUE_LOCALIZATIONS[tech.id]?.[currentLanguage] || {};

    document.getElementById('modal-title').textContent = localized.name || tech.name;
    document.getElementById('modal-japanese').textContent = `${tech.japanese} — ${localized.translation || tech.translation}`;
    document.getElementById('modal-desc').textContent = localized.description || tech.description;
    document.getElementById('modal-kuzushi').textContent = localized.biomechanics?.kuzushi || tech.biomechanics.kuzushi;
    document.getElementById('modal-tsukuri').textContent = localized.biomechanics?.tsukuri || tech.biomechanics.tsukuri;
    document.getElementById('modal-kake').textContent = localized.biomechanics?.kake || tech.biomechanics.kake;
    document.getElementById('modal-tactics').textContent = localized.tacticalTip || tech.tacticalTip;
    document.getElementById('modal-olympic').textContent = localized.olympicMoments || tech.olympicMoments;

    modal.classList.add('active');
  }

  window.refreshTechniquesExplorer = renderTechniques;

  if (modalClose) {
    modalClose.addEventListener('click', () => modal.classList.remove('active'));
  }
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.classList.remove('active');
    });
  }

  // Filtrado por botones de categoría
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeCategory = btn.dataset.category;
      renderTechniques();
    });
  });

  // Búsqueda en tiempo real
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchTerm = e.target.value.trim();
      renderTechniques();
    });
  }

  renderTechniques();
}

// ========================================================================== 
// 7. CONTROLADOR DEL VISOR DE CINTURONES (OBI INTERACTIVO)
// ========================================================================== 
const BELT_TECHNICAL_NOTES = {
  white: [
    ['Ukemi', 'Ushiro-ukemi, yoko-ukemi y mae-ukemi para absorber la caída sin perder orientación.'],
    ['Reishiki', 'Rei, orden del judogi y cuidado del tatami como base de seguridad y respeto.'],
    ['Shizen-hontai', 'Postura natural y kumi-kata estable para moverse sin bloquear las rodillas.']
  ],
  yellow: [
    ['Kuzushi', 'Desequilibrio en las ocho direcciones antes de intentar la proyección.'],
    ['Tsurikomi', 'Acción coordinada de tirar y elevar para crear la entrada técnica.'],
    ['Tsukuri-kake', 'Colocación y ejecución de las primeras técnicas con ukemi controlado.']
  ],
  orange: [
    ['Shisei y ma-ai', 'Postura y distancia correctas durante el desplazamiento y el randori técnico.'],
    ['Renraku-waza', 'Encadenamiento de técnicas cuando la primera entrada es bloqueada.'],
    ['Osaekomi', 'Control básico en suelo y salidas sencillas de una inmovilización.']
  ],
  green: [
    ['Renzoku-waza', 'Ataques consecutivos que mantienen la presión y el kuzushi.'],
    ['Kaeshi-waza', 'Respuesta técnica a un ataque rival sin perder la postura de seguridad.'],
    ['Tachi-ne-waza', 'Transición de pie a suelo manteniendo control de la caída y la posición.']
  ],
  blue: [
    ['Tokui-waza', 'Técnica de referencia elegida según cuerpo, kumi-kata y desplazamiento.'],
    ['Kumi-kata', 'Uso táctico del agarre para dirigir la postura y limitar las opciones del rival.'],
    ['Ne-waza', 'Osaekomi, escapes y cambios de posición con una intención táctica clara.']
  ],
  brown: [
    ['Gokyo no waza', 'Dominio funcional de las familias técnicas y sus variantes de ejecución.'],
    ['Sen-no-sen', 'Ataque en el instante de entrada del rival, antes de que estabilice su postura.'],
    ['Randori táctico', 'Aplicación intensa de estrategia, seguridad y lectura del combate.']
  ],
  black: [
    ['Nage-no-Kata', 'Demostración precisa de principios de proyección, ritmo y control.'],
    ['Katame-no-Kata', 'Trabajo estructurado de controles, estrangulaciones y luxaciones con seguridad.'],
    ['Pedagogía de dojo', 'Explicar el porqué de kuzushi-tsukuri-kake y acompañar el progreso ajeno.']
  ],
  'red-white': [
    ['Koshiki-no-Kata', 'Preservación de una forma clásica y de sus principios técnicos e históricos.'],
    ['Itsutsu-no-Kata', 'Estudio de los principios de movimiento más allá de una técnica aislada.'],
    ['Transmisión', 'Formación de judokas y liderazgo técnico con rigor, contexto y generosidad.']
  ],
  red: [
    ['Kodokan Judo', 'Integración de técnica, ética y experiencia dentro de una visión completa.'],
    ['Jita-kyoei', 'Aplicación del beneficio mutuo como criterio práctico de enseñanza y servicio.'],
    ['Investigación', 'Mantener viva la transmisión mediante estudio, reflexión y aprendizaje continuo.']
  ]
};

const BELT_LANGUAGE_COPY = {
  white: {
    en: { name: 'White Belt', time: '0–6 months', phase: 'Foundation and Ukemi', meaning: 'The starting point: curiosity, discipline and willingness to learn.', curriculum: 'Basic breakfalls, dojo etiquette and first postures.', next: 'Build safe falling mechanics' },
    ja: { name: '白帯', time: '0〜6か月', phase: '基礎と受け身', meaning: '好奇心と規律を持って学び始める段階です。', curriculum: '基本の受け身、道場礼法、最初の姿勢を学びます。', next: '安全な受け身を身につける' }
  },
  yellow: {
    en: { name: 'Yellow Belt', time: '6–12 months', phase: 'First combinations', meaning: 'You begin to recognise kuzushi and move with more confidence.', curriculum: 'First Gokyo group and coordinated entries.', next: 'Coordinate kuzushi and entry' },
    ja: { name: '黄帯', time: '6〜12か月', phase: '最初の連絡技', meaning: '崩しを感じ、より自信を持って動き始めます。', curriculum: '五教の第一教と、連絡した入りを学びます。', next: '崩しと入りを合わせる' }
  },
  orange: {
    en: { name: 'Orange Belt', time: '1–2 years', phase: 'Continuity and rhythm', meaning: 'You gain stability and build attacks from the grip.', curriculum: 'Second Gokyo group, movement and basic groundwork.', next: 'Keep the attack alive after the first entry' },
    ja: { name: '橙帯', time: '1〜2年', phase: '連続性とリズム', meaning: '安定感が増し、組み手から攻撃を組み立てます。', curriculum: '五教の第二教、移動と基本の寝技を学びます。', next: '最初の入りから攻撃を続ける' }
  },
  green: {
    en: { name: 'Green Belt', time: '2–3 years', phase: 'Control and adaptation', meaning: 'You link attacks and respond when the opponent defends.', curriculum: 'Third Gokyo group, combinations and basic counters.', next: 'Adapt the technique to the opponent' },
    ja: { name: '緑帯', time: '2〜3年', phase: '制御と適応', meaning: '攻撃をつなぎ、相手の防御にも対応し始めます。', curriculum: '五教の第三教、連絡技と基本の返し技を学びます。', next: '相手の動きに技を合わせる' }
  },
  blue: {
    en: { name: 'Blue Belt', time: '3–4 years', phase: 'Reading and strategy', meaning: 'Your standing game gains range and your groundwork becomes more reliable.', curriculum: 'Fourth Gokyo group, transitions and tactical Ne-Waza.', next: 'Build a coherent match strategy' },
    ja: { name: '青帯', time: '3〜4年', phase: '読解と戦術', meaning: '立技の幅が広がり、寝技も安定していきます。', curriculum: '五教の第四教、移行と戦術的な寝技を学びます。', next: '一貫した試合戦術を組み立てる' }
  },
  brown: {
    en: { name: 'Brown Belt', time: '4–5 years', phase: 'Precision and maturity', meaning: 'You have a broad base and are ready to deepen your own style.', curriculum: 'Fifth Gokyo group, timing and pressure management.', next: 'Refine technique under pressure' },
    ja: { name: '茶帯', time: '4〜5年', phase: '精度と成熟', meaning: '広い基礎を身につけ、自分の柔道を深める段階です。', curriculum: '五教の第五教、タイミングとプレッシャーへの対応を学びます。', next: 'プレッシャーの中で精度を高める' }
  },
  black: {
    en: { name: 'Black Belt', time: '5–15+ years', phase: 'Technical responsibility', meaning: 'The black belt opens a deeper stage of study; it does not close the path.', curriculum: 'Fundamental Kata and contribution to the dojo community.', next: 'Turn experience into a reference for others' },
    ja: { name: '黒帯', time: '5〜15年以上', phase: '技術的責任', meaning: '黒帯は道の終わりではなく、深い研究の始まりです。', curriculum: '基本形と道場への貢献を学びます。', next: '経験を次の世代へ伝える' }
  },
  'red-white': {
    en: { name: 'Red and White Belt', time: '20–40 years', phase: 'Legacy and transmission', meaning: 'An honour grade recognising exceptional service to Judo.', curriculum: 'Advanced Kata, preservation and global pedagogy.', next: 'Transmit the art with context and care' },
    ja: { name: '紅白帯', time: '20〜40年', phase: '伝承と継承', meaning: '柔道への特別な貢献を称える名誉段位です。', curriculum: '高段者の形、保存、世界的な指導を学びます。', next: '背景と心を添えて伝える' }
  },
  red: {
    en: { name: 'Red Belt', time: 'A lifetime', phase: 'Service to Judo', meaning: 'A lifetime of study, service and transcendence of personal ego.', curriculum: 'Supreme recognition and continued contribution to Judo.', next: 'Keep learning and serving the community' },
    ja: { name: '赤帯', time: '一生涯', phase: '柔道への奉仕', meaning: '生涯の研究と奉仕、個人の ego を超える歩みを表します。', curriculum: '最高位の認定と柔道への継続的な貢献です。', next: '学び続け、共同体に尽くす' }
  }
};

function initBeltsShowcase() {
  const container = document.getElementById('belt-pills-bar');
  const beltStrap = document.getElementById('belt-graphic-strap');
  const beltKnot = document.getElementById('belt-knot-text');
  const beltRank = document.getElementById('belt-rank-text');
  const beltTitle = document.getElementById('belt-title');
  const beltJp = document.getElementById('belt-japanese');
  const beltTime = document.getElementById('belt-time');
  const beltPhase = document.getElementById('belt-phase');
  const beltMeaning = document.getElementById('belt-meaning');
  const beltCurriculum = document.getElementById('belt-curriculum');
  const beltLearned = document.getElementById('belt-learned');
  const beltNextStep = document.getElementById('belt-next-step');
  const beltQuote = document.getElementById('belt-quote');

  if (!container) return;

  let selectedBelt = BELTS_DATA[0];

  const beltPhases = {
    white: 'Base y Ukemi',
    yellow: 'Primeras combinaciones',
    orange: 'Continuidad y ritmo',
    green: 'Control y adaptación',
    blue: 'Lectura y estrategia',
    brown: 'Precisión y madurez',
    black: 'Responsabilidad técnica',
    'red-white': 'Legado y transmisión',
    red: 'Servicio al Judo'
  };

  const beltNextSteps = {
    white: 'Aprender a caer con seguridad',
    yellow: 'Encadenar desequilibrio y entrada',
    orange: 'Mantener la acción después del primer ataque',
    green: 'Adaptar la técnica al movimiento del rival',
    blue: 'Construir una estrategia de combate',
    brown: 'Afinar la técnica bajo presión',
    black: 'Convertir la experiencia en referencia',
    'red-white': 'Formar a la siguiente generación',
    red: 'Devolver al Judo lo aprendido'
  };

  function setBelt(belt) {
    selectedBelt = belt;
    const language = document.documentElement.lang === 'en' || document.documentElement.lang === 'ja'
      ? document.documentElement.lang
      : 'es';
    const localized = BELT_LANGUAGE_COPY[belt.id]?.[language] || {};
    const displayName = localized.name || belt.name;
    const displayTime = localized.time || belt.time;
    const displayPhase = localized.phase || beltPhases[belt.id] || 'Desarrollo continuo';
    const displayMeaning = localized.meaning || belt.meaning;
    const displayCurriculum = localized.curriculum || belt.curriculum;
    const displayNext = localized.next || beltNextSteps[belt.id] || 'Seguir practicando con atención';

    // Actualizar apariencia visual de la cinta
    if (belt.colorHex.includes('gradient')) {
      beltStrap.style.background = belt.colorHex;
    } else {
      beltStrap.style.background = belt.colorHex;
    }

    // Color de texto del rango
    if (belt.id === 'white') {
      beltRank.style.color = '#1e293b';
      beltKnot.style.color = '#1e293b';
      beltKnot.style.background = 'rgba(0,0,0,0.1)';
    } else {
      beltRank.style.color = 'rgba(255,255,255,0.9)';
      beltKnot.style.color = '#fff';
      beltKnot.style.background = 'rgba(0,0,0,0.4)';
    }

    beltKnot.textContent = belt.japanese.split(' ')[0];
    beltRank.textContent = displayName;

    beltTitle.textContent = displayName;
    beltJp.textContent = belt.japanese;
    beltTime.textContent = displayTime;
    if (beltPhase) beltPhase.textContent = displayPhase;
    beltMeaning.textContent = displayMeaning;
    beltCurriculum.textContent = displayCurriculum;
    if (beltLearned) {
      beltLearned.innerHTML = '';
      const technicalNotes = BELT_TECHNICAL_NOTES[belt.id] || (belt.learned || []).map(item => ['Objetivo técnico', item]);
      technicalNotes.forEach(([term, explanation]) => {
        const li = document.createElement('li');
        li.className = 'belt-requirement-item';
        const termEl = document.createElement('strong');
        termEl.textContent = term;
        const explanationEl = document.createElement('span');
        explanationEl.textContent = explanation;
        li.append(termEl, explanationEl);
        beltLearned.appendChild(li);
      });
    }
    if (beltNextStep) beltNextStep.textContent = displayNext;
    beltQuote.textContent = `"${belt.quote}"`;

    // Actualizar botones activos
    document.querySelectorAll('.belt-pill-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.beltId === belt.id);
    });
  }

  // Generar botones de cinturón
  BELTS_DATA.forEach((belt, idx) => {
    const btn = document.createElement('button');
    btn.className = `belt-pill-btn ${idx === 0 ? 'active' : ''}`;
    btn.dataset.beltId = belt.id;
    btn.style.setProperty('--belt-accent', belt.id === 'red-white' ? '#a8252d' : belt.knotHex);

    const dot = document.createElement('span');
    dot.className = 'belt-color-dot';
    if (belt.colorHex.includes('gradient')) {
      dot.style.background = 'linear-gradient(90deg, #dc2626 50%, #fff 50%)';
    } else {
      dot.style.background = belt.colorHex;
    }

    btn.appendChild(dot);
    const label = document.createElement('span');
    label.className = 'belt-pill-label';
    label.textContent = belt.name.replace('Cinturón ', '');
    btn.appendChild(label);
    btn.addEventListener('click', () => setBelt(belt));
    container.appendChild(btn);
  });

  // Cargar el primer cinturón por defecto
  setBelt(BELTS_DATA[0]);
  window.refreshLocalizedBelt = () => setBelt(selectedBelt);
}

// ==========================================================================
// 8. TEST INTERACTIVO: "¿CUÁL ES TU TOKUI-WAZA IDEAL?"
// ==========================================================================
const QUIZ_QUESTIONS = [
  {
    question: '1. ¿Cómo describirías tu cuerpo frente al de tus rivales?',
    options: [
      { text: 'Soy más bien bajo y me muevo con rapidez.', profile: 'seoi' },
      { text: 'Soy alto y me siento cómodo usando las piernas.', profile: 'uchimata' },
      { text: 'Tengo un tronco fuerte y me gusta trabajar cerca.', profile: 'osoto' },
      { text: 'Soy ágil y disfruto cambiando de posición en el suelo.', profile: 'juji' }
    ]
  },
  {
    question: '2. En randori, ¿qué sueles buscar primero?',
    options: [
      { text: 'Entrar rápido antes de que pueda asentarse.', profile: 'seoi' },
      { text: 'Tomar un buen agarre y esperar el momento.', profile: 'uchimata' },
      { text: 'Hacerle retroceder y marcar el ritmo.', profile: 'osoto' },
      { text: 'Usar su impulso y cambiar el ángulo del ataque.', profile: 'tomoe' }
    ]
  },
  {
    question: '3. Si tu rival te empuja hacia delante, ¿qué respuesta te sale natural?',
    options: [
      { text: 'Girar y entrar para cargarlo sobre el hombro.', profile: 'seoi' },
      { text: 'Aprovechar el paso y atacar con la pierna.', profile: 'uchimata' },
      { text: 'Sentarme y proyectarlo hacia atrás.', profile: 'tomoe' },
      { text: 'Controlar el brazo y llevar el combate al suelo.', profile: 'juji' }
    ]
  },
  {
    question: '4. ¿Qué valor quieres llevar a tu práctica?',
    options: [
      { text: 'Precisión y autocontrol.', profile: 'seoi' },
      { text: 'Técnica y paciencia.', profile: 'uchimata' },
      { text: 'Coraje y constancia.', profile: 'osoto' },
      { text: 'Adaptación y calma.', profile: 'tomoe' }
    ]
  }
];

const QUIZ_PROFILES = {
  seoi: {
    title: 'Tu Tokui-Waza: Ippon Seoi Nage',
    kanji: '一本背負投',
    desc: 'Tu estilo favorece la velocidad y las entradas directas. Ippon Seoi Nage puede darte una respuesta clara cuando encuentras el momento para entrar.',
    quote: 'La rapidez sirve cuando llega acompañada de control.'
  },
  uchimata: {
    title: 'Tu Tokui-Waza: Uchi Mata',
    kanji: '内股',
    desc: 'Lees bien el movimiento y te gusta construir el ataque con paciencia. Uchi Mata premia el equilibrio, el tiempo y la precisión.',
    quote: 'El momento importa tanto como la fuerza.'
  },
  osoto: {
    title: 'Tu Tokui-Waza: Osoto Gari',
    kanji: '大外刈',
    desc: 'Tu juego parte de un agarre firme y de hacer retroceder al rival. Osoto Gari encaja con un estilo directo, estable y constante.',
    quote: 'La estabilidad abre el camino.'
  },
  tomoe: {
    title: 'Tu Tokui-Waza: Tomoe Nage',
    kanji: '巴投',
    desc: 'Prefieres esperar, cambiar el ángulo y aprovechar el impulso del otro. Tomoe Nage convierte esa calma en una proyección inesperada.',
    quote: 'Ceder a tiempo también es una decisión.'
  },
  juji: {
    title: 'Tu Tokui-Waza: Juji Gatame & Ne-Waza',
    kanji: '腕挫十字固',
    desc: 'Te sientes cómodo trabajando en el suelo y buscando el control paso a paso. Juji Gatame recompensa la paciencia, la posición y la atención al detalle.',
    quote: 'En el suelo, la posición decide.'
  }
};

const TOKUI_QUIZ_COPY = {
  es: {
  label: 'Test de estilo', result: 'Tu resultado', restart: 'Cerrar',
    questions: QUIZ_QUESTIONS,
    profiles: QUIZ_PROFILES
  },
  en: {
    label: 'Style test', result: 'Your result', restart: 'Close',
    questions: [
      { question: '1. How would you describe your body compared with your rivals?', options: [{ text: 'I am fairly short and move quickly.', profile: 'seoi' }, { text: 'I am tall and feel comfortable using my legs.', profile: 'uchimata' }, { text: 'I have a strong torso and like working close.', profile: 'osoto' }, { text: 'I am agile and enjoy changing position on the ground.', profile: 'juji' }] },
      { question: '2. In randori, what do you look for first?', options: [{ text: 'Enter quickly before they settle.', profile: 'seoi' }, { text: 'Take a good grip and wait for the moment.', profile: 'uchimata' }, { text: 'Make them retreat and set the rhythm.', profile: 'osoto' }, { text: 'Use their momentum and change the attack angle.', profile: 'tomoe' }] },
      { question: '3. If your rival pushes you forward, what feels natural?', options: [{ text: 'Turn and enter to load them onto the shoulder.', profile: 'seoi' }, { text: 'Use the step and attack with the leg.', profile: 'uchimata' }, { text: 'Sit back and throw them behind you.', profile: 'tomoe' }, { text: 'Control the arm and take the fight to the ground.', profile: 'juji' }] },
      { question: '4. What value do you want to bring to your practice?', options: [{ text: 'Precision and self-control.', profile: 'seoi' }, { text: 'Technique and patience.', profile: 'uchimata' }, { text: 'Courage and consistency.', profile: 'osoto' }, { text: 'Adaptation and calm.', profile: 'tomoe' }] }
    ],
    profiles: {
      seoi: { title: 'Your Tokui-Waza: Ippon Seoi Nage', kanji: '一本背負投', desc: 'Your style favours speed and direct entries. Ippon Seoi Nage gives you a clear answer when you find the moment to enter.', quote: 'Speed works best when it arrives with control.' },
      uchimata: { title: 'Your Tokui-Waza: Uchi Mata', kanji: '内股', desc: 'You read movement well and build attacks patiently. Uchi Mata rewards balance, timing and precision.', quote: 'Timing matters as much as strength.' },
      osoto: { title: 'Your Tokui-Waza: Osoto Gari', kanji: '大外刈', desc: 'Your game starts with a firm grip and making the opponent retreat. Osoto Gari suits a direct, stable and consistent style.', quote: 'Stability opens the way.' },
      tomoe: { title: 'Your Tokui-Waza: Tomoe Nage', kanji: '巴投', desc: 'You wait, change the angle and use the other person’s momentum. Tomoe Nage turns that calm into an unexpected throw.', quote: 'Yielding at the right time is also a decision.' },
      juji: { title: 'Your Tokui-Waza: Juji Gatame & Ne-Waza', kanji: '腕挫十字固', desc: 'You feel at home on the ground and seek control step by step. Juji Gatame rewards patience, position and attention to detail.', quote: 'On the ground, position decides.' }
    }
  },
  ja: {
    label: 'スタイル診断', result: '診断結果', restart: '閉じる',
    questions: [
      { question: '1. 相手と比べて、自分の体格をどう表現しますか？', options: [{ text: '小柄で、素早く動く方です。', profile: 'seoi' }, { text: '背が高く、脚を使うのが得意です。', profile: 'uchimata' }, { text: '体幹が強く、近い距離が好きです。', profile: 'osoto' }, { text: '身軽で、寝技の体勢を変えるのが好きです。', profile: 'juji' }] },
      { question: '2. 乱取りで、最初に何を狙いますか？', options: [{ text: '相手が構える前に素早く入る。', profile: 'seoi' }, { text: '良い組み手を作り、機会を待つ。', profile: 'uchimata' }, { text: '相手を下がらせ、リズムを作る。', profile: 'osoto' }, { text: '相手の勢いを使い、角度を変える。', profile: 'tomoe' }] },
      { question: '3. 相手に前へ押された時、自然に出る反応は？', options: [{ text: '回転して入り、肩に担ぐ。', profile: 'seoi' }, { text: '踏み出した足を利用して脚技に入る。', profile: 'uchimata' }, { text: '座るようにして後ろへ投げる。', profile: 'tomoe' }, { text: '腕を制御して寝技へ移る。', profile: 'juji' }] },
      { question: '4. 稽古にどんな価値を持ち込みたいですか？', options: [{ text: '精度と自制心。', profile: 'seoi' }, { text: '技術と忍耐。', profile: 'uchimata' }, { text: '勇気と継続。', profile: 'osoto' }, { text: '適応力と落ち着き。', profile: 'tomoe' }] }
    ],
    profiles: {
      seoi: { title: 'あなたの得意技：一本背負投', kanji: '一本背負投', desc: '速さと直接的な入りを生かすタイプです。機会を見つけた時、一本背負投が明快な答えになります。', quote: '速さはコントロールとともに生きる。' },
      uchimata: { title: 'あなたの得意技：内股', kanji: '内股', desc: '動きをよく読み、粘り強く攻撃を組み立てます。内股はバランス、間合い、精度を生かす技です。', quote: '力と同じくらい、タイミングが大切。' },
      osoto: { title: 'あなたの得意技：大外刈', kanji: '大外刈', desc: 'しっかりした組み手から相手を下がらせる柔道です。大外刈は直接的で安定したスタイルに合います。', quote: '安定が道を開く。' },
      tomoe: { title: 'あなたの得意技：巴投', kanji: '巴投', desc: '待ちながら角度を変え、相手の勢いを使います。巴投はその落ち着きを意外な投げに変えます。', quote: '適切な時に力を抜くことも決断です。' },
      juji: { title: 'あなたの得意技：十字固めと寝技', kanji: '腕挫十字固', desc: '寝技で段階的にコントロールするのが得意です。十字固めは忍耐、位置取り、細部への注意を生かします。', quote: '寝技では位置が決め手になる。' }
    }
  }
};

function initTokuiWazaQuiz() {
  let currentStep = 0;
  const answersCount = { seoi: 0, uchimata: 0, osoto: 0, tomoe: 0, juji: 0 };

  const questionEl = document.getElementById('quiz-question-title');
  const optionsGrid = document.getElementById('quiz-options-container');
  const progressFill = document.getElementById('quiz-progress-bar');
  const stepCounter = document.getElementById('quiz-step-counter');
  const questionIndex = document.getElementById('quiz-question-index');
  const quizFormView = document.getElementById('tokui-quiz-mini');
  const quizResultView = document.getElementById('quiz-result-view');
  const btnRestart = document.getElementById('btn-quiz-restart');

  if (!questionEl || !optionsGrid) return;

  const getCopy = () => TOKUI_QUIZ_COPY[document.documentElement.lang] || TOKUI_QUIZ_COPY.es;

  function loadStep() {
    const qData = getCopy().questions[currentStep];
    const stepLabel = `${String(currentStep + 1).padStart(2, '0')} / ${String(QUIZ_QUESTIONS.length).padStart(2, '0')}`;
    if (stepCounter) stepCounter.textContent = stepLabel;
    if (questionIndex) questionIndex.textContent = String(currentStep + 1).padStart(2, '0');
    questionEl.textContent = qData.question;
    optionsGrid.innerHTML = '';

    const letters = ['A', 'B', 'C', 'D'];
    qData.options.forEach((opt, idx) => {
      const btn = document.createElement('button');
      btn.className = 'quiz-option-btn';
      btn.innerHTML = `
        <span class="quiz-option-letter">${letters[idx]}</span>
        <span>${opt.text}</span>
      `;
      btn.addEventListener('click', () => {
        answersCount[opt.profile] = (answersCount[opt.profile] || 0) + 1;
        currentStep++;
        progressFill.style.width = `${((currentStep) / QUIZ_QUESTIONS.length) * 100}%`;

        if (currentStep < QUIZ_QUESTIONS.length) {
          loadStep();
        } else {
          showResult();
        }
      });
      optionsGrid.appendChild(btn);
    });
  }

  function showResult() {
    quizFormView.style.display = 'none';
    quizResultView.classList.add('active');

    // Calcular el perfil dominante
    let topProfile = 'seoi';
    let maxVotes = -1;
    for (const [prof, count] of Object.entries(answersCount)) {
      if (count > maxVotes) {
        maxVotes = count;
        topProfile = prof;
      }
    }

    const res = getCopy().profiles[topProfile];
    document.getElementById('result-waza-title').textContent = res.title;
    document.getElementById('result-waza-kanji').textContent = res.kanji;
    document.getElementById('result-waza-desc').textContent = res.desc;
    document.getElementById('result-waza-quote').textContent = `"${res.quote}"`;
    dojoSound.playVictoryFanfare();
    window.setTimeout(() => {
      document.querySelector('.tokui-quick-launcher.open .tokui-quick-trigger')?.click();
    }, 1400);

  }

  function refreshCopy() {
    const copy = getCopy();
    const label = document.getElementById('quiz-label');
    const resultLabel = document.getElementById('quiz-result-label');
    const restartLabel = document.getElementById('btn-quiz-restart');
    if (label) label.textContent = copy.label;
    if (resultLabel) resultLabel.textContent = copy.result;
    if (restartLabel) restartLabel.textContent = copy.restart;
    if (quizResultView.classList.contains('active')) showResult();
    else loadStep();
  }

  if (btnRestart) {
    btnRestart.addEventListener('click', () => {
      document.querySelector('.tokui-quick-launcher.open .tokui-quick-trigger')?.click();
    });
  }

  loadStep();
  window.refreshTokuiQuiz = refreshCopy;
}

// ==========================================================================
// 9. CONTROLADOR DEL GLOSARIO DE TÉRMINOS
// ==========================================================================
function initGlossary() {
  const grid = document.getElementById('glossary-grid');
  const input = document.getElementById('glossary-search');
  if (!grid) return;

  const currentLanguage = () => document.documentElement.lang || 'es';

  function renderGlossary(filter = '') {
    grid.innerHTML = '';
    const filtered = GLOSSARY_DB.filter(term => {
      const localized = GLOSSARY_LOCALIZATIONS[term.romaji]?.[currentLanguage()] || {};
      const meaning = localized.meaning || term.meaning;
      const context = localized.context || term.context;
      return term.romaji.toLowerCase().includes(filter.toLowerCase()) ||
        term.kanji.includes(filter) ||
        meaning.toLowerCase().includes(filter.toLowerCase()) ||
        context.toLowerCase().includes(filter.toLowerCase());
    });

    if (filtered.length === 0) {
      const emptyText = currentLanguage() === 'en'
        ? 'No terms match your search.'
        : currentLanguage() === 'ja'
          ? '該当する用語はありません。'
          : 'No hay términos que coincidan con tu búsqueda.';
      grid.innerHTML = `<div style="grid-column: 1/-1; text-align:center; color: var(--text-muted); padding: 32px;">${emptyText}</div>`;
      return;
    }

    filtered.forEach(term => {
      const localized = GLOSSARY_LOCALIZATIONS[term.romaji]?.[currentLanguage()] || {};
      const card = document.createElement('div');
      card.className = 'glossary-card';
      card.innerHTML = `
        <div class="glossary-term-header">
          <span class="glossary-romaji">${term.romaji}</span>
          <span class="glossary-kanji">${term.kanji}</span>
        </div>
        <div class="glossary-meaning">${localized.meaning || term.meaning}</div>
        <p class="glossary-context">${localized.context || term.context}</p>
      `;
      grid.appendChild(card);
    });
  }

  window.refreshGlossary = renderGlossary;

  if (input) {
    input.addEventListener('input', (e) => {
      renderGlossary(e.target.value.trim());
    });
  }

  renderGlossary();
}

// ========================================================================== 
// 10. NAVBAR, SONIDO & SCROLL
// ========================================================================== 
function removeLegacyHeaderUi() {
  document.querySelectorAll('.btn-audio, .auth-nav-container, #modal-google-auth, #modal-judoka-passport, #g_id_onload').forEach((element) => element.remove());
  document.querySelectorAll('script[src*="accounts.google.com"]').forEach((element) => element.remove());
}

function initTokuiQuickLauncher() {
  const mainNav = document.getElementById('main-nav');
  const cta = document.querySelector('.btn-cta-nav');
  if (!cta) return;

  if (mainNav) {
    mainNav.querySelectorAll('a.nav-link[href="marcador.html"]:not(.nav-link-mobile-cta)').forEach(link => link.remove());
  }

  cta.textContent = 'Torneo';
  cta.setAttribute('aria-label', 'Abrir Torneo');
  document.querySelectorAll('.nav-link-mobile-cta').forEach(link => {
    link.textContent = 'Torneo';
  });

  if (cta.parentElement.querySelector('.tokui-quick-launcher')) return;

  const launcher = document.createElement('div');
  launcher.className = 'tokui-quick-launcher';
  launcher.innerHTML = `
    <button class="tokui-quick-trigger" type="button" aria-expanded="false" aria-controls="tokui-quick-panel">
      <span>Tokui-Waza</span>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m6 9 6 6 6-6"/></svg>
    </button>
    <div class="tokui-quick-panel" id="tokui-quick-panel" hidden>
      <strong class="tokui-panel-title">Tokui-Waza</strong>
      <div class="tokui-quiz-mini" id="tokui-quiz-mini">
        <span class="tokui-quiz-label" id="quiz-label">Test de estilo</span>
        <p class="tokui-quiz-prompt" id="quiz-question-title"></p>
        <div class="tokui-mini-meta"><span id="quiz-question-index">01</span><span id="quiz-step-counter">01 / 04</span></div>
        <div class="tokui-mini-progress"><div id="quiz-progress-bar"></div></div>
        <div class="tokui-mini-options" id="quiz-options-container"></div>
      </div>
      <div class="tokui-quiz-mini-result" id="quiz-result-view">
        <span class="result-badge" id="quiz-result-label">Tu resultado</span>
        <strong class="result-waza-title" id="result-waza-title"></strong>
        <div class="result-waza-kanji" id="result-waza-kanji"></div>
        <p class="result-waza-desc" id="result-waza-desc"></p>
        <p class="result-waza-quote" id="result-waza-quote"></p>
        <button class="tokui-restart-button" id="btn-quiz-restart" type="button">Repetir el test</button>
      </div>
    </div>
  `;

  cta.parentElement.insertBefore(launcher, cta);
  const trigger = launcher.querySelector('.tokui-quick-trigger');
  const panel = launcher.querySelector('.tokui-quick-panel');
  document.body.appendChild(panel);
  panel.addEventListener('click', event => event.stopPropagation());

  function setOpen(isOpen) {
    launcher.classList.toggle('open', isOpen);
    document.body.classList.toggle('tokui-overlay-active', isOpen);
    trigger.setAttribute('aria-expanded', String(isOpen));
    panel.hidden = !isOpen;
  }

  trigger.addEventListener('click', () => setOpen(!launcher.classList.contains('open')));
  document.addEventListener('click', event => {
    if (!launcher.contains(event.target) && !panel.contains(event.target)) setOpen(false);
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') setOpen(false);
  });
}

const SITE_LANGUAGE_COPY = {
  es: {
    language: 'Idioma',
    nav: { philosophy: 'Filosofía', techniques: 'Técnicas', belts: 'Cinturones', history: 'Historia', glossary: 'Glosario' },
    tournament: 'Torneo',
    tournamentLabel: 'Abrir Torneo',
    tokui: 'Tokui-Waza',
    tokuiText: 'Tu técnica de referencia: una forma de conectar postura, agarre y oportunidad.',
    tokuiLink: 'Haz el test Tokui-Waza',
    professor: 'Profesor',
    brandSub: 'El Camino de la Suavidad',
    home: {
      heroTitleLine1: 'El Arte de Vencer',
      heroTitleLine2: 'Cediendo a la Fuerza',
      heroKanji: '精力善用 • 自他共栄',
      heroDescription: 'El Judo (柔道) convierte el movimiento y el desequilibrio en una práctica de fuerza, técnica y carácter. Conoce sus principios, aprende sus técnicas y entra al tatami.',
      primaryCta: 'Explorar Técnicas (Waza)',
      secondaryCta: 'Explora las familias técnicas',
      sectionTitle: 'Explora el Universo del 柔道',
      sectionDesc: 'Encuentra una puerta de entrada: principios, técnicas, grados, competición, historia o vocabulario del dojo.',
      hub: [
        { tag: 'Fundamentos Espirituales', title: 'Filosofía y Código Moral', desc: 'Las dos ideas que sostienen el método de Jigoro Kano y las virtudes que se practican dentro y fuera del dojo.', cta: 'Explorar Filosofía' },
        { tag: 'Arsenal Técnico (技)', title: 'Enciclopedia de Técnicas', desc: 'Consulta proyecciones y controles de suelo. Busca por nombre y filtra por familia técnica.', cta: 'Explorar Técnicas' },
        { tag: 'Graduación y Jerarquía', title: 'El Camino del Cinturón', desc: 'Sigue el recorrido del 6.º Kyu al 10.º Dan y descubre qué representa cada grado.', cta: 'Ver Cinturones' },
        { tag: 'Arbitraje y Competición', title: 'Simulador Olímpico', desc: 'Maneja el reloj, suma Ippon y Waza-ari, aplica Shidos y decide el combate en Golden Score.', cta: 'Entrar al Tatami' },
        { tag: 'Autoconocimiento Marcial', title: 'Familias de técnicas', desc: 'Consulta proyecciones y controles de suelo, organizados por su mecánica y aplicación.', cta: 'Explorar Técnicas' },
        { tag: 'Legado y Evolución', title: 'Crónica Histórica', desc: 'Viaja desde la fundación del Kodokan en 1882 hasta la escena olímpica contemporánea.', cta: 'Ver Historia' },
        { tag: 'Vocabulario Tradicional', title: 'Glosario del Dojo', desc: 'Busca en japonés o español términos de arbitraje, técnica, indumentaria y etiqueta.', cta: 'Ver Glosario' }
      ],
      footerQuote: '"El Judo debe elevarse por encima de una simple técnica de lucha para convertirse en una forma de vida; el objetivo final es perfeccionarse uno mismo y contribuir positivamente al mundo."',
      footerQuoteAuthor: 'Profesor Jigoro Kano (1860 - 1938) • Fundador del Judo',
      footerHeading: 'Secciones',
      footerLinks: [
        'Filosofía y Máximas',
        'Catálogo de Técnicas (Gokyo)',
        'El Camino del Cinturón (Obi)',
        'Simulador de Marcador Olímpico',
        'Familias de técnicas',
        'Historia del Judo',
        'Glosario del Dojo'
      ],
      institutionsHeading: 'Instituciones Mundiales',
      institutions: [
        'Kodokan Judo Institute (Tokio)',
        'Federación Internacional de Judo (IJF)',
        'Unión Europea de Judo (EJU)',
        'Real Federación Española de Judo (RFEJYDA)',
        'Comité Olímpico Internacional (COI)'
      ],
      footerBottom: '© 2026 Portal de Divulgación del Judo (柔道). Desarrollado con HTML5, CSS y JavaScript Vanilla.',
      backToTop: '↑ Volver arriba'
    },
    philosophy: {
      intro: ['Fundamentos del Judo', 'Las ideas que sostienen el Judo', 'Jigoro Kano convirtió técnicas de combate en un método para aprender a moverse, convivir y mejorar. Estas dos máximas explican el corazón del Judo.'],
      cards: [
        { title: 'Usar bien la energía', translation: '精力善用 • Uso Óptimo de la Energía', text: 'Cuando alguien empuja, resistir de frente no siempre es la mejor respuesta. Ceder en la dirección del ataque, conservar el equilibrio y esperar el momento adecuado permite que la fuerza del otro trabaje a tu favor. En el tatami es una técnica; fuera de él, una manera de afrontar los problemas.' },
        { title: 'Progresar juntos', translation: '自他共栄 • Crecer Junto a los Demás', text: 'Nadie aprende Judo en solitario. Tori necesita a Uke para practicar el ataque; Uke necesita a Tori para mejorar sus caídas y su lectura del movimiento. El compañero no está ahí para ser destruido, sino para ayudarnos a entrenar mejor.' }
      ],
      codeHeader: 'El Código Moral del Judoka (道徳コード)',
      codeDesc: 'Ocho hábitos sencillos que dan forma a la práctica dentro y fuera del tatami.',
      virtues: [
        ['Cortesía', 'Reigi (礼儀)', 'Saludar, escuchar y cuidar al compañero y al lugar de práctica.'],
        ['Coraje', 'Yūki (勇気)', 'Dar el paso necesario, incluso cuando algo cuesta o da miedo.'],
        ['Sinceridad', 'Makoto (誠実)', 'Entrenar y hablar con honestidad, sin esconder los errores.'],
        ['Honor', 'Meiyo (名誉)', 'Cumplir la palabra dada y mantener la dignidad en la victoria y la derrota.'],
        ['Modestia', 'Kenkyo (謙虚)', 'Reconocer lo que aún queda por aprender y dejar espacio a los demás.'],
        ['Respeto', 'Sonkei (尊敬)', 'Tratar al compañero como alguien valioso, dentro y fuera del combate.'],
        ['Autocontrol', 'Jisei (自制)', 'Mantener la cabeza fría y elegir la respuesta antes de actuar.'],
        ['Amistad', 'Yūjō (友情)', 'Construir confianza con las personas con las que compartes el tatami.']
      ]
    }
  },
  en: {
    language: 'Language',
    nav: { philosophy: 'Philosophy', techniques: 'Techniques', belts: 'Belts', history: 'History', glossary: 'Glossary' },
    tournament: 'Tournament',
    tournamentLabel: 'Open Tournament',
    tokui: 'Tokui-Waza',
    tokuiText: 'Your reference technique: a way to connect posture, grip and opportunity.',
    tokuiLink: 'Take the Tokui-Waza test',
    professor: 'Professor',
    brandSub: 'The Way of Gentleness',
    home: {
      heroTitleLine1: 'The Art of Winning',
      heroTitleLine2: 'By Yielding to Force',
      heroKanji: '精力善用 • 自他共栄',
      heroDescription: 'Judo (柔道) turns movement and imbalance into a practice of strength, technique and character. Learn its principles, master its techniques and step onto the tatami.',
      primaryCta: 'Explore Techniques (Waza)',
      secondaryCta: 'Explore technical families',
      sectionTitle: 'Explore the World of 柔道',
      sectionDesc: 'Find your entry point: principles, techniques, grades, competition, history and dojo vocabulary.',
      hub: [
        { tag: 'Spiritual Foundations', title: 'Philosophy and Code of Conduct', desc: 'The two ideas that sustain Jigoro Kano’s method and the virtues practiced inside and outside the dojo.', cta: 'Explore Philosophy' },
        { tag: 'Technical Arsenal (技)', title: 'Technique Encyclopedia', desc: 'Consult throws and groundwork. Search by name and filter by technical family.', cta: 'Explore Techniques' },
        { tag: 'Ranking and Hierarchy', title: 'The Belt Path', desc: 'Follow the path from 6th Kyu to 10th Dan and discover what each grade represents.', cta: 'View Belts' },
        { tag: 'Refereeing and Competition', title: 'Olympic Simulator', desc: 'Manage the clock, score Ippon and Waza-ari, apply shidos and decide the fight in Golden Score.', cta: 'Enter the Tatami' },
        { tag: 'Martial Self-Knowledge', title: 'Technique families', desc: 'Consult throws and controls, organized by mechanics and application.', cta: 'Explore Techniques' },
        { tag: 'Legacy and Evolution', title: 'Historical Chronicle', desc: 'Travel from the Kodokan foundation in 1882 to the modern Olympic stage.', cta: 'View History' },
        { tag: 'Traditional Vocabulary', title: 'Dojo Glossary', desc: 'Search in Japanese or Spanish for refereeing, technique, attire and etiquette terms.', cta: 'View Glossary' }
      ],
      footerQuote: '"Judo must rise above a mere fighting technique and become a way of life; the ultimate purpose is to perfect oneself and contribute positively to the world."',
      footerQuoteAuthor: 'Professor Jigoro Kano (1860 - 1938) • Founder of Judo',
      footerHeading: 'Sections',
      footerLinks: [
        'Philosophy and Maxims',
        'Technique Catalogue (Gokyo)',
        'The Belt Path (Obi)',
        'Olympic Score Simulator',
        'Technique families',
        'History of Judo',
        'Dojo Glossary'
      ],
      institutionsHeading: 'World Institutions',
      institutions: [
        'Kodokan Judo Institute (Tokyo)',
        'International Judo Federation (IJF)',
        'European Judo Union (EJU)',
        'Royal Spanish Judo Federation (RFEJYDA)',
        'International Olympic Committee (IOC)'
      ],
      footerBottom: '© 2026 Portal for the Popularisation of Judo (柔道). Built with HTML5, CSS and Vanilla JavaScript.',
      backToTop: '↑ Back to top'
    },
    philosophy: {
      intro: ['Judo philosophy', 'The ideas that sustain Judo', 'Jigoro Kano turned combat techniques into a method for moving, living and improving together. These two principles explain the heart of Judo.'],
      cards: [
        { title: 'Use energy well', translation: '精力善用 • Maximum Use of Energy', text: 'When someone pushes, resisting head-on is not always the best answer. Yielding with the attack, preserving balance and waiting for the right moment lets the opponent’s force work in your favour. On the tatami it is a technique; outside it, a way of facing problems.' },
        { title: 'Grow together', translation: '自他共栄 • Prosper Together', text: 'No one learns Judo alone. Tori needs Uke to practice the attack; Uke needs Tori to improve falls and reading of movement. The partner is not there to be destroyed, but to help each other train better.' }
      ],
      codeHeader: 'The Judoka Code of Ethics (道徳コード)',
      codeDesc: 'Eight simple habits that shape practice inside and outside the tatami.',
      virtues: [
        ['Courtesy', 'Reigi (礼儀)', 'Greeting, listening and taking care of your partner and training space.'],
        ['Courage', 'Yūki (勇気)', 'Taking the necessary step even when something is difficult or frightening.'],
        ['Sincerity', 'Makoto (誠実)', 'Training and speaking honestly, without hiding mistakes.'],
        ['Honor', 'Meiyo (名誉)', 'Keeping one’s word and maintaining dignity in victory and defeat.'],
        ['Modesty', 'Kenkyo (謙虚)', 'Recognising what is still to be learned and making room for others.'],
        ['Respect', 'Sonkei (尊敬)', 'Treating the partner as valuable, both inside and outside the contest.'],
        ['Self-control', 'Jisei (自制)', 'Keeping a cool head and choosing the response before acting.'],
        ['Friendship', 'Yūjō (友情)', 'Building trust with the people you share the tatami with.']
      ]
    }
  },
  ja: {
    language: '言語',
    nav: { philosophy: '哲学', techniques: '技', belts: '帯', history: '歴史', glossary: '用語集' },
    tournament: '大会',
    tournamentLabel: '大会を開く',
    tokui: '得意技',
    tokuiText: '姿勢・組み手・機会をつなぐ、あなたの得意技です。',
    tokuiLink: '得意技テストを始める',
    professor: '教授',
    brandSub: '柔の道',
    home: {
      heroTitleLine1: '力をゆらぎに変えて',
      heroTitleLine2: '勝つ技を生み出す',
      heroKanji: '精力善用 • 自他共栄',
      heroDescription: '柔道は動きと崩しを、力・技・人格の鍛錬へと変えます。原理を知り、技を学び、畳の上でその道を歩みましょう。',
      primaryCta: '技を探す（Waza）',
      secondaryCta: '技の系統を見る',
      sectionTitle: '柔道の世界を探る',
      sectionDesc: '原理、技、段位、競技、歴史、道場の言葉から、自分に合う入口を見つけましょう。',
      hub: [
        { tag: '精神的な礎', title: '哲学と道徳', desc: '嘉納治五郎の考えを支える二つの大原則と、道場の内外で育む徳を学びます。', cta: '哲学を見る' },
        { tag: '技術の全貌（技）', title: '技の百科', desc: '投げ技や固技を調べ、名前検索や分類で見やすく学びます。', cta: '技を見る' },
        { tag: '段位と階級', title: '帯の道', desc: '6級から10段まで、各段位が何を意味し、何を学ぶのかを見ていきます。', cta: '帯を見る' },
        { tag: '審判と競技', title: 'オリンピック対戦演習', desc: '時間管理、一本・技あり、指導、ゴールデンスコアで試合を進めます。', cta: '畳に入る' },
        { tag: '武道の自己理解', title: '技の系統', desc: '投げ技と固技を、動きと応用の観点から整理して学びます。', cta: '技を見る' },
        { tag: '伝統と進化', title: '歴史の断片', desc: '1882年の講道館設立から現代のオリンピックまで、柔道の歩みをたどります。', cta: '歴史を見る' },
        { tag: '伝統的な言葉', title: '道場用語集', desc: '審判・技術・服装・礼儀に関する言葉を、日本語やスペイン語で調べられます。', cta: '用語集を見る' }
      ],
      footerQuote: '"柔道は単なる打撃技ではなく、人生そのものの在り方である。最終的な目標は自分を磨き、世界に良い影響を与えることだ。"',
      footerQuoteAuthor: '嘉納治五郎（1860 - 1938） • 柔道の創始者',
      footerHeading: 'セクション',
      footerLinks: [
        '哲学と格言',
        '技術カタログ（五教）',
        '帯の道（おび）',
        'オリンピック採点シミュレーター',
        '技の系統',
        '柔道の歴史',
        '道場用語集'
      ],
      institutionsHeading: '世界の団体',
      institutions: [
        '講道館（東京）',
        '国際柔道連盟（IJF）',
        '欧州柔道連合（EJU）',
        'スペイン柔道連盟（RFEJYDA）',
        '国際オリンピック委員会（IOC）'
      ],
      footerBottom: '© 2026 柔道普及ポータル（柔道）。HTML5、CSS、Vanilla JavaScript で構築。',
      backToTop: '↑ 上へ戻る'
    },
    philosophy: {
      intro: ['柔道の哲学', '柔道を支える考え方', '嘉納治五郎は戦いの技を、動き・生き方・向上の方法へと変えました。二つの思想が柔道の中心を形づくります。'],
      cards: [
        { title: 'エネルギーを有効に使う', translation: '精力善用 • 最大の効率で力を使う', text: '相手が押してくるとき、正面から受け止めるのが最善とは限りません。攻撃の方向へゆらぎ、バランスを保ち、適切な瞬間を待てば、相手の力を自分の利益に変えられます。畳の上では技であり、日常では生き方です。' },
        { title: '互いに成長する', translation: '自他共栄 • 互いにともに伸びる', text: '誰一人として一人で柔道を極めることはできません。取り手は受け手を通して攻めを学び、受け手は取り手を通して崩しと受け身を磨きます。相手は破るためではなく、より良い稽古のために存在します。' }
      ],
      codeHeader: '柔道家の道徳コード（道徳コード）',
      codeDesc: '畳の内外で技と人格を育てる、8つの簡単な習慣です。',
      virtues: [
        ['礼儀', 'Reigi（礼儀）', '挨拶し、話を聞き、仲間と練習場を大切にする。'],
        ['勇気', 'Yūki（勇気）', '難しいことや怖いことでも、必要な一歩を踏み出す。'],
        ['誠実', 'Makoto（誠実）', '過ちを隠さず、正直に稽古し、話す。'],
        ['名誉', 'Meiyo（名誉）', '約束を守り、勝ち負けの中でも品位を保つ。'],
        ['謙虚', 'Kenkyo（謙虚）', 'まだ学ぶべきことを認め、他人の余地を作る。'],
        ['尊敬', 'Sonkei（尊敬）', '相手を大切にし、試合の内外で敬意を持つ。'],
        ['自制', 'Jisei（自制）', '冷静に判断し、行動する前に選択する。'],
        ['友情', 'Yūjō（友情）', '畳を共にする人々との信頼を築く。']
      ]
    }
  }
};

const PAGE_LANGUAGE_COPY = {
  filosofia: {
    es: ['Filosofía del Judo', 'Las ideas que sostienen al Judo', 'Un código práctico para entrenar, competir y vivir cada día.'],
    en: ['Judo philosophy', 'The ideas that sustain Judo', 'A practical code for training, competition and everyday life.'],
    ja: ['柔道の哲学', '柔道を支える考え方', '稽古、試合、日常を支える実践的な道。']
  },
  tecnicas: {
    es: ['Arsenal técnico · 技', 'Técnicas para entender y practicar', 'Explora lanzamientos de pie y trabajo en suelo a través de kuzushi, tsukuri y kake.'],
    en: ['Technical arsenal · 技', 'Techniques to understand and practise', 'Explore standing throws and groundwork through kuzushi, tsukuri and kake.'],
    ja: ['技術体系 · 技', '理解し、稽古する技', '崩し・作り・掛けを通して、立技と寝技を学びます。']
  },
  cinturones: {
    es: ['Grados y práctica · 帯', 'El camino del cinturón', 'Cada color marca una etapa de aprendizaje. Explora lo que se entrena en cada grado.'],
    en: ['Grades and practice · 帯', 'The path of the belt', 'Each colour marks a stage of learning. Explore what is trained at every grade.'],
    ja: ['段位と稽古 · 帯', '帯の道', '色ごとに学びの段階があります。それぞれの稽古内容を見てみましょう。']
  },
  marcador: {
    es: ['Espacio de competición', 'Crea tu torneo en el tatami', 'Añade judokas, asigna pesos y gestiona cada combate desde un cuadro claro.'],
    en: ['Competition workspace', 'Create your tournament on the tatami', 'Add judoka, assign weights and manage every match from one clear bracket.'],
    ja: ['大会運営', '畳の上に大会を作る', '選手と体重を登録し、見やすい組み合わせで試合を管理します。']
  },
  historia: {
    es: ['Historia del Judo', 'De un dojo de Tokio al mundo', 'Sigue los hitos que llevaron al Judo desde el Kodokan hasta los tatamis del mundo.'],
    en: ['History of Judo', 'From a Tokyo dojo to the world', 'Follow the milestones that carried Judo from the Kodokan to tatami around the world.'],
    ja: ['柔道の歴史', '東京の道場から世界へ', '講道館から世界の畳へ広がった柔道の歩みをたどります。']
  },
  glosario: {
    es: ['Vocabulario del dojo', 'Glosario del Judo', 'Encuentra el significado de las palabras que oyes en clase, competición y entrenamiento.'],
    en: ['Dojo vocabulary', 'Judo glossary', 'Find the meaning of the words you hear in class, competition and training.'],
    ja: ['道場の言葉', '柔道用語集', '稽古や試合で耳にする柔道の言葉を調べましょう。']
  }
};

function getCurrentPageKey() {
  return (window.location.pathname.split('/').pop() || 'index.html').replace('.html', '') || 'index';
}

function updateLanguageSwitcherLabel(switcher, labelText) {
  if (!switcher) return;
  switcher.setAttribute('aria-label', labelText);
  const srOnly = switcher.parentElement?.querySelector('.sr-only');
  if (srOnly) srOnly.textContent = labelText;
  const options = switcher.parentElement?.querySelector('.language-options');
  if (options) {
    options.setAttribute('aria-label', labelText);
    options.querySelectorAll('.language-option').forEach(button => {
      const isActive = button.dataset.language === switcher.value;
      button.classList.toggle('active', isActive);
      button.setAttribute('aria-pressed', String(isActive));
    });
  }
}

function initLanguageSwitcher() {
  const actions = document.querySelector('.nav-actions');
  if (!actions) return;

  let switcher = document.getElementById('language-switcher');
  if (!switcher) {
    const wrapper = document.createElement('label');
    wrapper.className = 'language-switcher';
    wrapper.innerHTML = `
      <span class="sr-only">Idioma</span>
      <select id="language-switcher" class="language-native-select" aria-hidden="true" tabindex="-1">
        <option value="es">ES</option><option value="en">EN</option><option value="ja">日本語</option>
      </select>
      <div class="language-options" role="group" aria-label="Idioma">
        <button type="button" class="language-option" data-language="es" aria-label="Español" aria-pressed="true"><span aria-hidden="true">🇪🇸</span><small>ES</small></button>
        <button type="button" class="language-option" data-language="en" aria-label="English" aria-pressed="false"><span aria-hidden="true">🇬🇧</span><small>EN</small></button>
        <button type="button" class="language-option" data-language="ja" aria-label="日本語" aria-pressed="false"><span aria-hidden="true">🇯🇵</span><small>JA</small></button>
      </div>`;
    switcher = wrapper.querySelector('select');
    const cta = actions.querySelector('.btn-cta-nav');
    actions.insertBefore(wrapper, cta || actions.firstChild);
  }

  let savedLanguage = 'es';
  try {
    savedLanguage = localStorage.getItem('judo-language') || 'es';
  } catch (error) {
    savedLanguage = 'es';
  }
  if (!SITE_LANGUAGE_COPY[savedLanguage]) savedLanguage = 'es';
  switcher.value = savedLanguage;
  const changeLanguage = (language) => {
    switcher.value = language;
    try { localStorage.setItem('judo-language', language); } catch (error) { /* private browsing */ }
    applySiteLanguage(language);
  };
  switcher.parentElement?.querySelectorAll('.language-option').forEach(button => {
    button.addEventListener('click', () => changeLanguage(button.dataset.language));
  });
  updateLanguageSwitcherLabel(switcher, SITE_LANGUAGE_COPY[savedLanguage].language);
  applySiteLanguage(savedLanguage);
}

function applySiteLanguage(language) {
  const activeLanguage = SITE_LANGUAGE_COPY[language] ? language : 'es';
  const copy = SITE_LANGUAGE_COPY[activeLanguage];
  document.documentElement.lang = activeLanguage;

  const setText = (selector, text) => {
    document.querySelectorAll(selector).forEach(element => { element.textContent = text; });
  };

  setText('.nav-link[href="filosofia.html"]', copy.nav.philosophy);
  setText('.nav-link[href="tecnicas.html"]', copy.nav.techniques);
  setText('.nav-link[href="cinturones.html"]', copy.nav.belts);
  setText('.nav-link[href="historia.html"]', copy.nav.history);
  setText('.nav-link[href="glosario.html"]', copy.nav.glossary);
  setText('.btn-cta-nav, .nav-link-mobile-cta', copy.tournament);
  document.querySelectorAll('.btn-cta-nav').forEach(button => button.setAttribute('aria-label', copy.tournamentLabel));
  setText('.logo-sub', copy.brandSub);
  setText('.btn-audio-text', activeLanguage === 'en' ? 'Bell' : activeLanguage === 'ja' ? '鈴' : 'Campana');
  setText('.btn-google-auth span', activeLanguage === 'en' ? 'Sign in' : activeLanguage === 'ja' ? 'ログイン' : 'Acceder');
  updateLanguageSwitcherLabel(document.getElementById('language-switcher'), copy.language);

  const tokuiTrigger = document.querySelector('.tokui-quick-trigger span');
  const tokuiTitle = document.querySelector('.tokui-panel-title');
  if (tokuiTrigger) tokuiTrigger.textContent = copy.tokui;
  if (tokuiTitle) tokuiTitle.textContent = copy.tokui;
  window.refreshTokuiQuiz?.();

  if (document.querySelector('.hero-section')) {
    const heroHeadline = document.querySelector('.hero-headline');
    if (heroHeadline) {
      heroHeadline.innerHTML = `${copy.home.heroTitleLine1}<br><span class="text-gradient-red">${copy.home.heroTitleLine2}</span><span class="kanji-sub">${copy.home.heroKanji}</span>`;
    }
    const heroDescription = document.querySelector('.hero-description');
    if (heroDescription) heroDescription.textContent = copy.home.heroDescription;
    const primaryBtn = document.querySelector('#hero-btn-explore span');
    if (primaryBtn) primaryBtn.textContent = copy.home.primaryCta;
    const secondaryBtn = document.querySelector('#hero-btn-quiz span');
    if (secondaryBtn) secondaryBtn.textContent = copy.home.secondaryCta;
    const sectionTitle = document.querySelector('.section-header .section-title');
    if (sectionTitle) sectionTitle.textContent = copy.home.sectionTitle;
    const sectionDesc = document.querySelector('.section-header .section-desc');
    if (sectionDesc) sectionDesc.textContent = copy.home.sectionDesc;

    document.querySelectorAll('.hub-card').forEach((card, index) => {
      const content = copy.home.hub[index] || copy.home.hub[0];
      const tag = card.querySelector('.hub-card-tag');
      const title = card.querySelector('.hub-card-title');
      const desc = card.querySelector('.hub-card-desc');
      const cta = card.querySelector('.hub-card-cta');
      if (tag) tag.textContent = content.tag;
      if (title) title.textContent = content.title;
      if (desc) desc.textContent = content.desc;
      if (cta) {
        const label = cta.cloneNode(true);
        const svg = label.querySelector('svg');
        label.textContent = content.cta;
        if (svg) label.appendChild(svg);
        cta.replaceWith(label);
      }
    });
  }

  const pageCopy = PAGE_LANGUAGE_COPY[getCurrentPageKey()];
  if (pageCopy && pageCopy[activeLanguage]) {
    const [tag, title, description] = pageCopy[activeLanguage];
    setText('.page-banner-tag', tag);
    setText('.page-banner-title', title);
    setText('.page-banner-desc', description);
  }

  if (document.querySelector('.site-footer')) {
    const footerQuote = document.querySelector('.footer-quote-text');
    if (footerQuote) footerQuote.textContent = copy.home.footerQuote;
    const footerAuthor = document.querySelector('.footer-quote-author');
    if (footerAuthor) footerAuthor.textContent = copy.home.footerQuoteAuthor;
    const footerHeadings = document.querySelectorAll('.footer-heading');
    footerHeadings.forEach((heading, index) => {
      heading.textContent = index === 0 ? copy.home.footerHeading : copy.home.institutionsHeading;
    });
    const footerLinks = document.querySelectorAll('.footer-link');
    footerLinks.forEach((link, index) => {
      const value = copy.home.footerLinks[index] || copy.home.footerLinks[0];
      if (value) link.textContent = value;
    });
    const footerBottom = document.querySelector('.footer-bottom span');
    if (footerBottom) footerBottom.textContent = copy.home.footerBottom;
    const backToTop = document.querySelector('.footer-bottom a');
    if (backToTop) backToTop.textContent = copy.home.backToTop;
  }

  const professorToggle = document.querySelector('.professor-toggle-label');
  if (professorToggle) professorToggle.textContent = copy.professor;
  window.refreshProfessorLanguage?.();

  if (getCurrentPageKey() === 'filosofia') {
    const philosophyCards = document.querySelectorAll('.philosophy-card');
    philosophyCards.forEach((card, index) => {
      const data = copy.philosophy.cards[index];
      if (!data) return;
      const title = card.querySelector('.philosophy-title');
      const translation = card.querySelector('.philosophy-translation');
      const text = card.querySelector('.philosophy-text');
      if (title) title.textContent = data.title;
      if (translation) translation.textContent = data.translation;
      if (text) text.textContent = data.text;
    });
    const header = document.querySelector('.moral-code-header h2');
    const desc = document.querySelector('.moral-code-header .section-desc');
    if (header) header.textContent = copy.philosophy.codeHeader;
    if (desc) desc.textContent = copy.philosophy.codeDesc;
    document.querySelectorAll('.virtue-card').forEach((card, index) => {
      const virtue = copy.philosophy.virtues[index];
      if (!virtue) return;
      const name = card.querySelector('.virtue-name');
      const jp = card.querySelector('.virtue-jp');
      const text = card.querySelector('.virtue-desc');
      if (name) name.textContent = virtue[0];
      if (jp) jp.textContent = virtue[1];
      if (text) text.textContent = virtue[2];
    });
  }

  if (getCurrentPageKey() === 'tecnicas') {
    const techniqueLabels = activeLanguage === 'en'
      ? ['All (12)', 'Te-Waza (Arms)', 'Koshi-Waza (Hips)', 'Ashi-Waza (Legs)', 'Sutemi-Waza (Sacrifice)', 'Katame-Waza (Ground)']
      : activeLanguage === 'ja'
        ? ['すべて (12)', '手技', '腰技', '足技', '捨身技', '固技']
        : ['Todas (12)', 'Te-Waza (Brazos)', 'Koshi-Waza (Cadera)', 'Ashi-Waza (Piernas)', 'Sutemi-Waza (Sacrificio)', 'Katame-Waza (Suelo)'];
    ['#filter-all', '#filter-te', '#filter-koshi', '#filter-ashi', '#filter-sutemi', '#filter-katame'].forEach((selector, index) => setText(selector, techniqueLabels[index]));
    const search = document.getElementById('waza-search');
    if (search) {
      search.placeholder = activeLanguage === 'en' ? 'Search by name or concept…' : activeLanguage === 'ja' ? '名前や概念で検索…' : 'Busca por nombre o concepto…';
      search.setAttribute('aria-label', activeLanguage === 'en' ? 'Search techniques' : activeLanguage === 'ja' ? '技を検索' : 'Buscar técnicas');
    }
    if (typeof window.refreshTechniquesExplorer === 'function') {
      window.refreshTechniquesExplorer();
    }
    document.querySelectorAll('.phase-box-title').forEach((box, index) => {
      const labels = activeLanguage === 'en'
        ? ['1. Kuzushi (崩し - Unbalance)', '2. Tsukuri (作り - Entry / Setup)', '3. Kake (掛け - Execution)']
        : activeLanguage === 'ja'
          ? ['1. 崩し（くずし）', '2. 作り（つくり）', '3. 掛け（かけ）']
          : ['1. Kuzushi (崩し - Desequilibrio)', '2. Tsukuri (作り - Colocación)', '3. Kake (掛け - Ejecución)'];
      box.textContent = labels[index];
    });
    const tacticalTitle = document.querySelector('.modal-content > div > strong');
    if (tacticalTitle) tacticalTitle.textContent = activeLanguage === 'en' ? 'Tactical combat cue:' : activeLanguage === 'ja' ? '戦術のポイント：' : 'Consejo táctico de combate:';
    const olympicLabel = document.querySelector('.modal-content > div:last-child strong');
    if (olympicLabel) olympicLabel.textContent = activeLanguage === 'en' ? 'In Olympic history:' : activeLanguage === 'ja' ? 'オリンピック史上では：' : 'En la historia olímpica:';
  }

  if (getCurrentPageKey() === 'cinturones') {
    const beltCopy = activeLanguage === 'en'
      ? ['Build your rank step by step', 'Select a stage to see what changes in practice, what becomes stable and where to focus next.', 'Learning path', 'CURRENT RANK', 'Mind · technique · body', 'Estimated time', 'Development phase', 'What it represents', 'What you train', 'Suggested technical requirements', 'Next focus']
      : activeLanguage === 'ja'
        ? ['一歩ずつ段位を築く', '段階を選ぶと、稽古で変わること、定着すること、次の焦点が見られます。', '学習の道', '現在の段位', '心・技・体', '目安の期間', '成長段階', '意味', '稽古すること', '技術要件の目安', '次の焦点']
        : ['El rango se construye paso a paso', 'Selecciona una etapa para ver qué cambia en la práctica, qué se consolida y cuál es el siguiente foco.', 'Ruta de aprendizaje', 'RANGO ACTUAL', 'Mente · técnica · cuerpo', 'Tiempo estimado', 'Fase de desarrollo', 'Qué representa', 'Qué se trabaja', 'Requisitos técnicos orientativos', 'Próximo foco'];
    setText('.belt-section-intro h2', beltCopy[0]);
    setText('.belt-section-intro p', beltCopy[1]);
    setText('.belt-section-note span', beltCopy[2]);
    setText('.belt-visual-label', beltCopy[3]);
    setText('.belt-visual-caption', beltCopy[4]);
    setText('.belt-meta-card:nth-child(1) .meta-label', beltCopy[5]);
    setText('.belt-meta-card:nth-child(2) .meta-label', beltCopy[6]);
    setText('.belt-detail-block:nth-of-type(1) .meta-label', beltCopy[7]);
    setText('.belt-detail-block:nth-of-type(2) .meta-label', beltCopy[8]);
    setText('.belt-learned-block .meta-label', beltCopy[9]);
    setText('.belt-next-step span', beltCopy[10]);
    const beltHud = document.getElementById('belt-pills-bar');
    if (beltHud) beltHud.dataset.hudLabel = activeLanguage === 'en' ? 'OBI / BELT PROGRESSION' : activeLanguage === 'ja' ? '帯 / 段位' : 'OBI / PROGRESIÓN';
    document.querySelectorAll('.belt-detail-block .meta-label').forEach((label, index) => {
      label.textContent = beltCopy[7 + index];
    });
    document.querySelectorAll('.belt-pill-btn').forEach(button => {
      const belt = BELTS_DATA.find(item => item.id === button.dataset.beltId);
      const localized = belt && BELT_LANGUAGE_COPY[belt.id]?.[activeLanguage];
      const label = button.querySelector('.belt-pill-label');
      if (label) label.textContent = (localized?.name || belt?.name || '').replace('Cinturón ', '');
    });
    window.refreshLocalizedBelt?.();
  }

  if (getCurrentPageKey() === 'marcador') {
    const marathonCopy = activeLanguage === 'en'
      ? {
        bannerTag: 'Tournament planner',
        bannerTitle: 'Create your tournament on the tatami',
        bannerDesc: 'Name the event, add participants and prepare the bracket. Then manage every contest from the official scoreboard.',
        heading: 'Prepare the brackets',
        subheading: 'Create a competition for your class, club or a friendly dojo afternoon.',
        status: 'No active tournament',
        tournamentLabel: 'Tournament',
        participantLabel: 'Participants',
        addButton: 'Add',
        createButton: 'Create tournament',
        clearButton: 'Clear',
        nextMatch: 'Next match',
        newTournament: 'New tournament',
        preview: 'Bracket preview',
        empty: 'Add participants to see how the bracket will be arranged.',
        ready: 'Ready',
        pending: 'Awaiting results',
        scoreboardEyebrow: 'DOJO SCOREKEEPER',
        scoreboardContextTitle: 'Fight control',
        scoreboardContextDetail: 'IJF rules · 4 minutes',
        goldenBadge: 'GOLDEN SCORE ACTIVE',
        timerLabel: 'Regulation time',
        btnStart: 'Hajime (Start)',
        btnReset: 'Reset clock',
        btnGolden: 'Golden Score',
        winnerTitle: 'VICTORY BY IPPON!',
        winnerReason: 'Perfect projection with speed, force and precise control.',
        continueLabel: 'Continue',
        infoLabel: 'Essential information',
        infoStatus: 'Check the rules whenever you need them.',
        resetMatch: 'Reset match',
        essential: 'Rules essential to the match',
        close: 'Close'
      }
      : activeLanguage === 'ja'
        ? {
          bannerTag: '大会計画',
          bannerTitle: '畳の上で大会を作る',
          bannerDesc: '大会名を決め、選手を追加し、組み合わせを整えます。その後、公式の採点表で試合を進めます。',
          heading: '組み合わせを準備',
          subheading: 'クラス、クラブ、または道場の親睦会のために大会を作成します。',
          status: '進行中の大会なし',
          tournamentLabel: '大会',
          participantLabel: '選手',
          addButton: '追加',
          createButton: '大会を作成',
          clearButton: 'クリア',
          nextMatch: '次の試合',
          newTournament: '新しい大会',
          preview: '組み合わせのプレビュー',
          empty: '選手を追加すると、組み合わせが表示されます。',
          ready: '準備完了',
          pending: '結果待ち',
          scoreboardEyebrow: '道場採点',
          scoreboardContextTitle: '試合管理',
          scoreboardContextDetail: 'IJF規則 · 4分',
          goldenBadge: 'ゴールデンスコア進行中',
          timerLabel: '試合時間',
          btnStart: '始め（開始）',
          btnReset: '時計をリセット',
          btnGolden: 'ゴールデンスコア',
          winnerTitle: '一本勝ち！',
          winnerReason: 'スピードと力、正確なコントロールを備えた見事な投げ技。',
          continueLabel: '続ける',
          infoLabel: '必要事項',
          infoStatus: '必要に応じてルールを確認してください。',
          resetMatch: '試合をリセット',
          essential: '試合の基本ルール',
          close: '閉じる'
        }
        : {
          bannerTag: 'Organiza tu competición',
          bannerTitle: 'Crea tu torneo en el tatami',
          bannerDesc: 'Ponle nombre al torneo, añade a tus participantes y prepara los cruces. Después, controla cada combate con el marcador reglamentario.',
          heading: 'Prepara los cruces',
          subheading: 'Crea una competición para tu clase, tu club o una tarde entre amigos.',
          status: 'Sin torneo activo',
          tournamentLabel: 'Torneo',
          participantLabel: 'Participantes',
          addButton: 'Añadir',
          createButton: 'Crear torneo',
          clearButton: 'Limpiar',
          nextMatch: 'Siguiente combate',
          newTournament: 'Nuevo torneo',
          preview: 'Vista previa del cuadro',
          empty: 'Añade participantes para ver cómo se organizará el cuadro.',
          ready: 'Listo',
          pending: 'Esperando resultado',
          scoreboardEyebrow: 'DOJO SCOREKEEPER',
          scoreboardContextTitle: 'Control de combate',
          scoreboardContextDetail: 'Reglamento IJF · 4 minutos',
          goldenBadge: 'GOLDEN SCORE ACTIVO',
          timerLabel: 'Tiempo reglamentario',
          btnStart: 'Hajime (Iniciar)',
          btnReset: 'Reiniciar Reloj',
          btnGolden: 'Golden Score',
          winnerTitle: '¡VICTORIA POR IPPON!',
          winnerReason: 'Proyección impecable con velocidad, fuerza y control absoluto.',
          continueLabel: 'Continuar',
          infoLabel: 'Información esencial',
          infoStatus: 'Consulta las reglas cuando las necesites.',
          resetMatch: 'Reiniciar Combate',
          essential: 'Reglas esenciales del combate',
          close: 'Cerrar'
        };
    const copyPage = marathonCopy;
    const bannerTag = document.querySelector('.page-banner-tag');
    if (bannerTag) bannerTag.textContent = copyPage.bannerTag;
    const bannerTitle = document.querySelector('.page-banner-title');
    if (bannerTitle) bannerTitle.textContent = copyPage.bannerTitle;
    const bannerDesc = document.querySelector('.page-banner-desc');
    if (bannerDesc) bannerDesc.textContent = copyPage.bannerDesc;

    const heading = document.querySelector('.tournament-builder-heading h2');
    if (heading) heading.textContent = copyPage.heading;
    const subheading = document.querySelector('.tournament-builder-heading .section-desc');
    if (subheading) subheading.textContent = copyPage.subheading;
    const statusNode = document.getElementById('tournament-status');
    if (statusNode) statusNode.textContent = copyPage.status;
    const tournamentLabel = document.querySelector('label[for="tournament-name"]');
    if (tournamentLabel) tournamentLabel.textContent = copyPage.tournamentLabel;
    const participantLabel = document.querySelector('label[for="participant-name"]');
    if (participantLabel) participantLabel.textContent = copyPage.participantLabel;
    const addBtn = document.getElementById('add-participant');
    if (addBtn) addBtn.textContent = copyPage.addButton;
    const createBtn = document.getElementById('create-tournament');
    if (createBtn) createBtn.textContent = copyPage.createButton;
    const clearBtn = document.getElementById('clear-tournament');
    if (clearBtn) clearBtn.textContent = copyPage.clearButton;
    const previewText = document.querySelector('.tournament-preview-heading span');
    if (previewText) previewText.textContent = copyPage.preview;
    const previewEmpty = document.querySelector('.bracket-empty-state');
    if (previewEmpty) previewEmpty.textContent = copyPage.empty;
    const previewRounds = document.getElementById('bracket-rounds');
    if (previewRounds && previewRounds.textContent === 'Sin participantes') previewRounds.textContent = activeLanguage === 'en' ? 'No entrants' : activeLanguage === 'ja' ? '選手なし' : 'Sin participantes';
    const nextBtn = document.getElementById('load-next-match');
    if (nextBtn) nextBtn.textContent = copyPage.nextMatch;
    const newBtn = document.getElementById('new-tournament');
    if (newBtn) newBtn.textContent = copyPage.newTournament;
    const activeKicker = document.getElementById('active-tournament-kicker');
    if (activeKicker) activeKicker.textContent = copyPage.nextMatch;
    const matchStateLabel = document.getElementById('match-state-label');
    if (matchStateLabel) matchStateLabel.textContent = activeLanguage === 'en' ? 'FIGHT READY' : activeLanguage === 'ja' ? '試合準備完了' : 'COMBATE LISTO';
    const contextTitle = document.querySelector('.scoreboard-context-title');
    if (contextTitle) contextTitle.textContent = copyPage.scoreboardContextTitle;
    const contextDetail = document.querySelector('.scoreboard-context-detail');
    if (contextDetail) contextDetail.textContent = copyPage.scoreboardContextDetail;
    const eyebrow = document.querySelector('.scoreboard-eyebrow');
    if (eyebrow) eyebrow.textContent = copyPage.scoreboardEyebrow;
    const badge = document.getElementById('golden-score-badge');
    if (badge) badge.textContent = copyPage.goldenBadge;
    const timerLabel = document.querySelector('.timer-label');
    if (timerLabel) timerLabel.textContent = copyPage.timerLabel;
    const toggleTimer = document.getElementById('btn-toggle-timer');
    if (toggleTimer) toggleTimer.textContent = copyPage.btnStart;
    const resetTimer = document.getElementById('btn-reset-timer');
    if (resetTimer) resetTimer.textContent = copyPage.btnReset;
    const goldenBtn = document.getElementById('btn-golden-score');
    if (goldenBtn) goldenBtn.textContent = copyPage.btnGolden;
    const winnerTitle = document.getElementById('winner-title');
    if (winnerTitle) winnerTitle.textContent = copyPage.winnerTitle;
    const winnerReason = document.getElementById('winner-reason');
    if (winnerReason) winnerReason.textContent = copyPage.winnerReason;
    const continueBtn = document.querySelector('#btn-close-victory');
    if (continueBtn) continueBtn.textContent = copyPage.continueLabel;
    const infoBtn = document.getElementById('btn-essential-info');
    if (infoBtn) infoBtn.textContent = activeLanguage === 'en' ? 'ⓘ Essential information' : activeLanguage === 'ja' ? 'ⓘ 必要事項' : 'ⓘ Información esencial';
    const infoStatus = document.querySelector('.scorekeeper-footer-status');
    if (infoStatus) infoStatus.textContent = copyPage.infoStatus;
    const resetMatch = document.getElementById('btn-reset-match');
    if (resetMatch) resetMatch.textContent = copyPage.resetMatch;
    const essentialRuleTitle = document.querySelector('#essential-info-panel strong');
    if (essentialRuleTitle) essentialRuleTitle.textContent = copyPage.essential;
    const closeInfo = document.getElementById('btn-close-essential-info');
    if (closeInfo) closeInfo.textContent = copyPage.close;
    const tournamentVisibleText = document.querySelector('#tournament-form-message');
    if (tournamentVisibleText && tournamentVisibleText.textContent === 'Sin torneo activo') tournamentVisibleText.textContent = copyPage.status;
  }

  if (getCurrentPageKey() === 'historia') {
    const titles = activeLanguage === 'en'
      ? ['The Kodokan is founded', 'Kodokan challenge', 'Kano’s legacy', 'Olympic debut in Tokyo', 'Women’s judo enters the Games', 'Paris 2024 and beyond']
      : activeLanguage === 'ja'
        ? ['講道館の設立', '講道館の試験', '嘉納の遺産', '東京でのオリンピックデビュー', '女子柔道の登場', 'パリ2024とその先へ']
        : ['Nace el Kodokan', 'La prueba del Kodokan', 'El legado de Kano', 'Debut olímpico en Tokio', 'El Judo femenino en los Juegos', 'París 2024 y más allá'];
    const descriptions = activeLanguage === 'en'
      ? [
        'Jigoro Kano opens the Kodokan at the Eishoji temple in Tokyo and begins teaching a safer, more educational method.',
        'A competition against the Totsuka school helps establish the strength and clarity of the new method.',
        'After the founder’s death, the Kodokan preserves the idea that Judo must develop body, mind and character.',
        'Judo enters the Olympic programme and its technical language begins to connect practitioners across countries.',
        'Barcelona adds women’s competition to the official Olympic schedule.',
        'The Paris Games reaffirm the value of Judo as a global and deeply technical sport.'
      ]
      : activeLanguage === 'ja'
        ? [
          '嘉納治五郎が東京の英松寺に講道館を開き、より安全で教育的な柔道を広めます。',
          '戸塚流との対戦で、新しい方法の技術と確かさが広く知られるようになります。',
          '創始者の死後も講道館は、柔道は心・技・体を育てるものだと伝え続けます。',
          'オリンピックに柔道が採用され、技の言語が各国の選手をつなぎます。',
          'バルセロナ大会で女子競技が正式に加わりました。',
          'パリ大会では、柔道が世界的で高度な技術競技としてその価値を再確認しました。'
        ]
        : [
          'Jigoro Kano abre el Kodokan en el templo Eishoji de Tokio y empieza a enseñar un método seguro y educativo.',
          'Una competición contra la escuela Totsuka da a conocer la solidez técnica del nuevo método.',
          'Tras la muerte de su fundador, el Kodokan mantiene viva una idea: el Judo debe formar cuerpo, mente y carácter.',
          'El Judo llega a los Juegos Olímpicos y su lenguaje técnico empieza a unir a practicantes de muchos países.',
          'Barcelona incorpora la competición femenina al programa olímpico oficial.',
          'París reafirma la dimensión global y técnica del Judo en la cima del deporte.'
        ];
    const tagText = activeLanguage === 'en' ? 'From the past to today' : activeLanguage === 'ja' ? '過去から現在へ' : 'De ayer a hoy';
    const sectionTitle = activeLanguage === 'en' ? 'A discipline that keeps growing' : activeLanguage === 'ja' ? '進化し続ける技と精神' : 'Una disciplina que sigue creciendo';
    const sectionDesc = activeLanguage === 'en' ? 'Every date tells part of the story: from the small Eishoji dojo to a shared practice across the world.' : activeLanguage === 'ja' ? '年月ごとに、英松寺の小さな道場から世界へ広がる柔道の変化が見えてきます。' : 'Cada fecha cuenta un cambio: del pequeño dojo de Eishoji a una práctica compartida en todo el mundo.';
    const bannerText = activeLanguage === 'en' ? ['History of Judo', 'From a Tokyo dojo to the world', 'Follow the milestones that carried Judo from the Kodokan to tatami around the world.'] : activeLanguage === 'ja' ? ['柔道の歴史', '東京の道場から世界へ', '講道館から世界の畳へ広がった柔道の歩みをたどります。'] : ['Historia del Judo', 'De un dojo de Tokio al mundo', 'Sigue los momentos que llevaron al Judo desde el Kodokan de Jigoro Kano hasta los tatamis de todo el mundo.'];
    const bannerTag = document.querySelector('.page-banner-tag');
    const bannerTitle = document.querySelector('.page-banner-title');
    const bannerDescription = document.querySelector('.page-banner-desc');
    if (bannerTag) bannerTag.textContent = bannerText[0];
    if (bannerTitle) bannerTitle.textContent = bannerText[1];
    if (bannerDescription) bannerDescription.textContent = bannerText[2];
    const tag = document.querySelector('.section-tag');
    if (tag) tag.textContent = tagText;
    const sectionHeading = document.querySelector('.section-title');
    if (sectionHeading) sectionHeading.textContent = sectionTitle;
    const sectionLead = document.querySelector('.section-desc');
    if (sectionLead) sectionLead.textContent = sectionDesc;
    document.querySelectorAll('.milestone-title').forEach((node, index) => { const value = titles[index]; if (value) node.textContent = value; });
    document.querySelectorAll('.milestone-desc').forEach((node, index) => { const value = descriptions[index]; if (value) node.textContent = value; });
  }

  if (getCurrentPageKey() === 'glosario') {
    const glossaryTag = document.querySelector('.glossary-controls .section-tag');
    const glossaryTitle = document.querySelector('.glossary-controls .section-title');
    const glossarySearch = document.getElementById('glossary-search');
    if (glossaryTag) glossaryTag.textContent = activeLanguage === 'en' ? 'Japanese–Spanish dictionary' : activeLanguage === 'ja' ? '日・西辞典' : 'Diccionario japonés-español';
    if (glossaryTitle) glossaryTitle.textContent = activeLanguage === 'en' ? 'Speak the language of the tatami' : activeLanguage === 'ja' ? '畳の言葉を話そう' : 'Habla el idioma del tatami';
    if (glossarySearch) {
      glossarySearch.placeholder = activeLanguage === 'en' ? 'Search a word or kanji…' : activeLanguage === 'ja' ? '語句や漢字を検索…' : 'Busca una palabra o kanji…';
      glossarySearch.setAttribute('aria-label', activeLanguage === 'en' ? 'Search in the glossary' : activeLanguage === 'ja' ? '用語集を検索' : 'Buscar en el glosario');
    }
    if (typeof window.refreshGlossary === 'function') {
      window.refreshGlossary();
    }
  }
}

function initNavAndInteractions() {
  const header = document.querySelector('.site-header');
  const mobileToggle = document.getElementById('mobile-toggle');
  const mainNav = document.getElementById('main-nav');

  // Sticky header blur effect
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Auto-mark active nav link based on current page filename
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const pageToNavId = {
    'index.html': null,
    'filosofia.html': 'nav-link-filosofia',
    'tecnicas.html': 'nav-link-tecnicas',
    'cinturones.html': 'nav-link-cinturones',
    'marcador.html': 'nav-link-simulador',
    'historia.html': 'nav-link-historia',
    'glosario.html': 'nav-link-glosario',
  };
  const activeId = pageToNavId[currentPage];
  if (activeId) {
    const activeLink = document.getElementById(activeId);
    if (activeLink) activeLink.classList.add('active');
  }

  // Mobile menu toggle
  if (mobileToggle && mainNav) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = mainNav.classList.toggle('open');
      mobileToggle.classList.toggle('active', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        mainNav.classList.remove('open');
        mobileToggle.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }

}

// INICIALIZACIÓN GLOBAL CUANDO EL DOM ESTÁ LISTO
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
  removeLegacyHeaderUi();
  initNavAndInteractions();
  initTokuiQuickLauncher();
  initTechniquesExplorer();
  initTokuiWazaQuiz();
  initBeltsShowcase();
  const scoreboard = new OlympicScoreboard();
  window.olympicScoreboard = scoreboard;
  window.judoTournament = initTournamentBuilder(scoreboard);
  initProfessorAssistant();
  initLanguageSwitcher();
  initGlossary();
});
