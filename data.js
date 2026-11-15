/**
 * CURRÍCULO OFICIAL DE 2º DE EDUCACIÓN PRIMARIA (LOMLOE)
 * Base de datos de contenidos pedagógicos: Explicaciones, Minijuegos y Tests
 */

const CURRICULUM_DATA = {
  matematicas: {
    id: "matematicas",
    title: "Matemáticas Mágicas",
    shortTitle: "Matemáticas",
    icon: "🔢",
    themeColor: "from-amber-400 to-orange-500",
    accentColor: "#f59e0b",
    badge: "Mago del Cálculo",
    description: "¡Domina los números hasta el 999, las sumas y restas con llevada, el reloj y las figuras!",
    topics: [
      {
        id: "mate_1",
        title: "Números hasta el 999: Centenas, Decenas y Unidades",
        icon: "💯",
        explanation: {
          intro: "¡Hola, supermatemático! Los números tienen familias y viven en casitas llamadas Unidades (U), Decenas (D) y Centenas (C).",
          sections: [
            {
              heading: "¿Qué es cada cosa?",
              body: "• 1 Unidad (U) = 1 elemento suelto (del 0 al 9).\n• 1 Decena (D) = Un grupo de 10 unidades juntas (10, 20, 30...).\n• 1 Centena (C) = ¡Un súper grupo de 100 unidades o 10 decenas!",
              visual: "1 C = 10 D = 100 U"
            },
            {
              heading: "Descomponemos números",
              body: "Fíjate en el número 438:\n• Tiene 4 Centenas = 400\n• Tiene 3 Decenas = 30\n• Tiene 8 Unidades = 8\n¡400 + 30 + 8 = 438!",
              visual: "438 ➡️ 4C + 3D + 8U"
            },
            {
              heading: "Anterior y Posterior",
              body: "• El número ANTERIOR es el que va justo antes (-1). Ejemplo: antes del 500 va el 499.\n• El número POSTERIOR es el que va justo después (+1). Ejemplo: después del 500 va el 501.",
              visual: "499 ⬅️ [ 500 ] ➡️ 501"
            }
          ],
          tip: "¡Truco! Para saber si un número es mayor que otro, mira primero sus Centenas. Si son iguales, mira las Decenas. Y si siguen iguales, mira las Unidades."
        },
        minigame: {
          type: "classification",
          instruction: "Clasifica cada número según cuántas centenas tiene:",
          categories: [
            { id: "c1", name: "100 a 199 (1 Centena)" },
            { id: "c2", name: "200 a 299 (2 Centenas)" },
            { id: "c3", name: "500 a 599 (5 Centenas)" }
          ],
          items: [
            { id: "n1", text: "145", category: "c1" },
            { id: "n2", text: "280", category: "c2" },
            { id: "n3", text: "512", category: "c3" },
            { id: "n4", text: "199", category: "c1" },
            { id: "n5", text: "205", category: "c2" },
            { id: "n6", text: "599", category: "c3" }
          ]
        },
        test: [
          {
            question: "¿Cuántas unidades hay en 3 Centenas?",
            options: ["30 unidades", "300 unidades", "3 unidades", "3.000 unidades"],
            correct: 1,
            feedback: "¡Genial! 1 centena son 100, así que 3 centenas son 300 unidades."
          },
          {
            question: "¿Cuál es el número ANTERIOR al 200?",
            options: ["199", "201", "190", "100"],
            correct: 0,
            feedback: "¡Exacto! El número anterior a 200 es restar uno: 200 - 1 = 199."
          },
          {
            question: "¿Cómo se descompone el número 645?",
            options: ["60 + 40 + 5", "600 + 4 + 5", "600 + 40 + 5", "6 + 4 + 5"],
            correct: 2,
            feedback: "¡Muy bien! 6 Centenas (600) + 4 Decenas (40) + 5 Unidades (5)."
          },
          {
            question: "¿Qué número es mayor: 572 o 527?",
            options: ["527", "Son iguales", "572", "Ninguno"],
            correct: 2,
            feedback: "¡Correcto! Los dos tienen 5 centenas, pero 572 tiene 7 decenas y 527 solo tiene 2 decenas."
          },
          {
            question: "¿Qué número se forma con 7 Centenas, 0 Decenas y 9 Unidades?",
            options: ["790", "709", "79", "7009"],
            correct: 1,
            feedback: "¡Perfecto! 700 + 0 + 9 = 709."
          }
        ]
      },
      {
        id: "mate_2",
        title: "Sumas y Restas con Llevada",
        icon: "➕",
        explanation: {
          intro: "Sumar es juntar y restar es quitar o calcular la diferencia. ¡Las llevadas son un truco mágico muy fácil!",
          sections: [
            {
              heading: "La Suma con Llevada",
              body: "Si al sumar las unidades te pasas de 9 (por ejemplo, 7 + 8 = 15):\n1. Dejas el 5 en las unidades.\n2. ¡El 1 'se va volando' arriba como una decena de regalo para el vecino de las decenas!",
              visual: " 3 7\n+ 2 8\n-----\n 6 5  (¡Nos llevamos 1!)"
            },
            {
              heading: "La Resta con Llevada (Pedir ayuda al vecino)",
              body: "Si a 2 no le puedes quitar 5 (porque 2 es más pequeño que 5), el 2 llama a la puerta de su vecina la decena:\n'¡Vecina decena, préstame 10!'.\nEl 2 se convierte en 12 (12 - 5 = 7) y la decena vecina tiene 1 menos.",
              visual: " 5 2  (el 5 pasa a 4, el 2 pasa a 12)\n- 1 7\n-----\n 3 5"
            }
          ],
          tip: "¡Consejo de oro! Empieza SIEMPRE a sumar o restar por la derecha, es decir, por la columna de las Unidades."
        },
        minigame: {
          type: "matching",
          instruction: "Empareja cada operación con su resultado correcto:",
          pairs: [
            { a: "45 + 18", b: "63" },
            { a: "36 + 27", b: "63" },
            { a: "70 - 15", b: "55" },
            { a: "52 - 18", b: "34" },
            { a: "29 + 31", b: "60" }
          ]
        },
        test: [
          {
            question: "¿Cuánto es 38 + 25?",
            options: ["53", "63", "62", "55"],
            correct: 1,
            feedback: "¡Excelente! 8 + 5 = 13 (me llevo 1). 3 + 2 = 5, más 1 que me llevaba = 6. Resultado: 63."
          },
          {
            question: "¿Por qué columna debemos empezar siempre a sumar o restar?",
            options: ["Por las centenas", "Por las decenas", "Por las unidades", "Da igual"],
            correct: 2,
            feedback: "¡Así se hace! Siempre por la derecha: ¡por las Unidades!"
          },
          {
            question: "Si tienes 50 cromos y le regalas 16 a tu mejor amigo, ¿cuántos te quedan?",
            options: ["34", "44", "36", "24"],
            correct: 0,
            feedback: "¡Muy bien resuelto el problema! 50 - 16 = 34 cromos."
          },
          {
            question: "¿Cuánto es 64 - 28?",
            options: ["46", "36", "34", "44"],
            correct: 1,
            feedback: "¡Perfecto! 14 - 8 = 6. El 6 se convierte en 5; 5 - 2 = 3. Total: 36."
          },
          {
            question: "En una fiesta hay 47 globos azules y 35 globos rojos. ¿Cuántos globos hay en total?",
            options: ["72 globos", "82 globos", "78 globos", "85 globos"],
            correct: 1,
            feedback: "¡Fantástico! 47 + 35 = 82 globos."
          }
        ]
      },
      {
        id: "mate_3",
        title: "Las Tablas de Multiplicar (x2, x5, x10)",
        icon: "✖️",
        explanation: {
          intro: "¿Sabías que multiplicar es un 'superpoder' para sumar súper rápido el mismo número?",
          sections: [
            {
              heading: "¿Qué significa multiplicar?",
              body: "Si tienes 4 platos y en cada plato hay 2 galletas, en vez de sumar 2 + 2 + 2 + 2 = 8, dices:\n4 veces 2 = 4 x 2 = 8.",
              visual: "🍪🍪 + 🍪🍪 + 🍪🍪 + 🍪🍪 = 4 x 2 = 8"
            },
            {
              heading: "La Tabla del 2 (El doble)",
              body: "¡Es contar de 2 en 2!\n2x1=2, 2x2=4, 2x3=6, 2x4=8, 2x5=10, 2x6=12, 2x7=14, 2x8=16, 2x9=18, 2x10=20.",
              visual: "2, 4, 6, 8, 10, 12, 14, 16, 18, 20"
            },
            {
              heading: "La Tabla del 5 y del 10",
              body: "• En la tabla del 5 todos los resultados terminan en 0 o en 5 (5, 10, 15, 20...).\n• En la tabla del 10 solo tienes que añadir un cero al número (10 x 4 = 40; 10 x 7 = 70).",
              visual: "5 x 6 = 30 | 10 x 6 = 60"
            }
          ],
          tip: "¡El orden no cambia el resultado! 2 x 5 es 10, y 5 x 2 también es 10. ¡Es la propiedad conmutativa!"
        },
        minigame: {
          type: "bubble_hunter",
          instruction: "Haz clic en todas las burbujas que tengan un resultado correcto:",
          bubbles: [
            { text: "2 x 4 = 8", correct: true },
            { text: "5 x 3 = 15", correct: true },
            { text: "10 x 5 = 50", correct: true },
            { text: "2 x 7 = 15", correct: false },
            { text: "5 x 4 = 22", correct: false },
            { text: "2 x 9 = 18", correct: true },
            { text: "10 x 8 = 80", correct: true },
            { text: "5 x 5 = 25", correct: true }
          ]
        },
        test: [
          {
            question: "¿Cuánto es 2 x 6?",
            options: ["10", "12", "14", "16"],
            correct: 1,
            feedback: "¡Bravo! 2 x 6 = 12 (el doble de 6)."
          },
          {
            question: "¿Cuánto es 5 x 7?",
            options: ["30", "35", "40", "25"],
            correct: 1,
            feedback: "¡Muy bien! 5 x 7 = 35."
          },
          {
            question: "Si compras 4 paquetes de cromos y cada paquete tiene 10 cromos, ¿cuántos cromos tienes?",
            options: ["14 cromos", "40 cromos", "44 cromos", "30 cromos"],
            correct: 1,
            feedback: "¡Excelente! 4 veces 10 = 4 x 10 = 40 cromos."
          },
          {
            question: "Todos los números de la tabla del 5 terminan en...",
            options: ["En 1 o en 3", "En 0 o en 5", "En números pares", "En 9"],
            correct: 1,
            feedback: "¡Efectivamente! Todos terminan en 0 o en 5 (5, 10, 15, 20...)."
          },
          {
            question: "¿Cuál es el resultado de 2 x 8?",
            options: ["16", "18", "14", "20"],
            correct: 0,
            feedback: "¡Genial! 2 x 8 = 16."
          }
        ]
      },
      {
        id: "mate_4",
        title: "El Reloj y las Monedas de Euro",
        icon: "⏰",
        explanation: {
          intro: "Aprender a mirar la hora y usar el dinero te hace independiente y te ayuda a organizar tu día.",
          sections: [
            {
              heading: "El Reloj de Agujas",
              body: "• La aguja corta marca las HORAS.\n• La aguja larga marca los MINUTOS.\n- Cuando la larga está en el 12: ¡En punto! (ej. 3:00)\n- Cuando está en el 6: ¡Y media! (ej. 3:30)\n- Cuando está en el 3: ¡Y cuarto! (ej. 3:15)\n- Cuando está en el 9: ¡Menos cuarto! (ej. 3:45)",
              visual: "Corta: Horas 🕐 | Larga: Minutos ⏱️"
            },
            {
              heading: "El Euro y los Céntimos",
              body: "• 1 Euro (€) = 100 céntimos.\n• Monedas: 1c, 2c, 5c, 10c, 20c, 50c, 1€ y 2€.\n• Billetes: 5€, 10€, 20€, 50€...",
              visual: "🪙 1€ = 100 céntimos"
            }
          ],
          tip: "¡Truco! Si tienes dos monedas de 50 céntimos, juntas suman exactamente 1 Euro (50c + 50c = 100c = 1€)."
        },
        minigame: {
          type: "matching",
          instruction: "Empareja cada situación con su equivalencia:",
          pairs: [
            { a: "Aguja larga en el 6", b: "Y media (:30)" },
            { a: "Aguja larga en el 12", b: "En punto (:00)" },
            { a: "Dos monedas de 50 céntimos", b: "1 Euro" },
            { a: "Aguja larga en el 3", b: "Y cuarto (:15)" },
            { a: "Cinco monedas de 2€", b: "10 Euros" }
          ]
        },
        test: [
          {
            question: "Si la aguja corta apunta al 4 y la aguja larga al 12, ¿qué hora es?",
            options: ["Las 4 y media", "Las 12 y cuatro", "Las 4 en punto", "Las 4 menos cuarto"],
            correct: 2,
            feedback: "¡Muy bien! Cuando la aguja larga está en el 12 son 'en punto': ¡Las 4 en punto!"
          },
          {
            question: "¿Cuántos céntimos hay en 1 Euro?",
            options: ["10 céntimos", "100 céntimos", "50 céntimos", "1000 céntimos"],
            correct: 1,
            feedback: "¡Exacto! 1 Euro equivale a 100 céntimos."
          },
          {
            question: "Un helado cuesta 1€ y 50 céntimos. Si pagas con una moneda de 2€, ¿cuánto te devuelven?",
            options: ["50 céntimos", "1 Euro", "20 céntimos", "nada"],
            correct: 0,
            feedback: "¡Fantástico! 2€ - 1,50€ = 50 céntimos de vuelta."
          },
          {
            question: "¿Qué aguja del reloj se mueve más rápido?",
            options: ["La aguja corta (de las horas)", "La aguja larga (de los minutos)", "Se mueven a la misma velocidad", "Ninguna se mueve"],
            correct: 1,
            feedback: "¡Muy bien observado! El minutero (aguja larga) da una vuelta entera cada 60 minutos."
          },
          {
            question: "Si son las 9:30, decimos que son las...",
            options: ["Nueve en punto", "Nueve y cuarto", "Nueve y media", "Diez menos cuarto"],
            correct: 2,
            feedback: "¡Correcto! Los 30 minutos corresponden a 'y media'."
          }
        ]
      },
      {
        id: "mate_5",
        title: "Geometría: Figuras Planas y Cuerpos 3D",
        icon: "📐",
        explanation: {
          intro: "¡Mira a tu alrededor! Todo lo que ves tiene una forma geométrica: tu libreta, una pelota o un gorro de fiesta.",
          sections: [
            {
              heading: "Figuras Planas (2D)",
              body: "• Triángulo: 3 lados rectos y 3 esquinas (vértices).\n• Cuadrado: 4 lados exactamente iguales y 4 esquinas.\n• Rectángulo: 4 lados (2 largos y 2 cortos) y 4 esquinas.\n• Círculo: ¡Es una línea curva cerrada! No tiene lados rectos ni vértices.",
              visual: "🔺 Triángulo | 🟩 Cuadrado | 🟢 Círculo"
            },
            {
              heading: "Cuerpos Geométricos con volumen (3D)",
              body: "• Cubo: como un dado de parchís.\n• Esfera: como una pelota de fútbol.\n• Cilindro: como una lata de refresco o un tubo de pegamento.\n• Cono: como el cucurucho de un helado.",
              visual: "🎲 Cubo | ⚽ Esfera | 🥫 Cilindro"
            }
          ],
          tip: "Las esquinas donde se juntan dos lados se llaman VÉRTICES."
        },
        minigame: {
          type: "classification",
          instruction: "Clasifica cada objeto según su forma geométrica 3D:",
          categories: [
            { id: "esfera", name: "Forma de Esfera ⚽" },
            { id: "cubo", name: "Forma de Cubo 🎲" },
            { id: "cilindro", name: "Forma de Cilindro 🥫" }
          ],
          items: [
            { id: "o1", text: "Pelota de tenis", category: "esfera" },
            { id: "o2", text: "Dado de jugar", category: "cubo" },
            { id: "o3", text: "Vela redonda en tubo", category: "cilindro" },
            { id: "o4", text: "Naranja", category: "esfera" },
            { id: "o5", text: "Caja de regalo cuadrada", category: "cubo" },
            { id: "o6", text: "Lata de tomate", category: "cilindro" }
          ]
        },
        test: [
          {
            question: "¿Cuántos lados tiene un triángulo?",
            options: ["4 lados", "2 lados", "3 lados", "5 lados"],
            correct: 2,
            feedback: "¡Eso es! El triángulo tiene 3 lados y 3 vértices."
          },
          {
            question: "¿Qué figura plana no tiene ningún lado recto ni vértices?",
            options: ["El cuadrado", "El círculo", "El rectángulo", "El rombo"],
            correct: 1,
            feedback: "¡Exacto! El círculo es redondo y plano, sin lados rectos ni esquinas."
          },
          {
            question: "¿Qué cuerpo geométrico se parece a una lata de refresco?",
            options: ["Una esfera", "Un cubo", "Un cilindro", "Una pirámide"],
            correct: 2,
            feedback: "¡Genial! Una lata tiene bases circulares y forma de cilindro."
          },
          {
            question: "¿Cómo se llaman las 'esquinas' de una figura geométrica?",
            options: ["Lados", "Vértices", "Bordes", "Puntas"],
            correct: 1,
            feedback: "¡Muy bien! Se llaman vértices."
          },
          {
            question: "Un cuadrado y un rectángulo tienen ambos 4 lados, pero el cuadrado...",
            options: ["Tiene todos sus lados iguales", "No tiene vértices", "Es redondo", "Tiene lados curvos"],
            correct: 0,
            feedback: "¡Perfecto! Los cuatro lados de un cuadrado miden exactamente lo mismo."
          }
        ]
      }
    ]
  },

  lengua: {
    id: "lengua",
    title: "Reino de las Letras",
    shortTitle: "Lengua Castellana",
    icon: "📚",
    themeColor: "from-blue-500 to-indigo-600",
    accentColor: "#3b82f6",
    badge: "Escritor Estrella",
    description: "¡Aprende el abecedario, sustantivos, verbos, reglas de ortografía y sinónimos!",
    topics: [
      {
        id: "len_1",
        title: "El Abecedario y el Orden Alfabético",
        icon: "🔤",
        explanation: {
          intro: "¡Nuestro abecedario tiene 27 letras mágicas que nos permiten escribir todas las palabras del mundo!",
          sections: [
            {
              heading: "Vocales y Consonantes",
              body: "• Hay 5 vocales: A, E, I, O, U.\n• Hay 22 consonantes: B, C, D, F, G, H, J, K, L, M, N, Ñ, P, Q, R, S, T, V, W, X, Y, Z.",
              visual: "Vocales: A E I O U"
            },
            {
              heading: "¿Cómo ordenar alfabéticamente?",
              body: "Para ordenar palabras como en el diccionario:\n1. Miramos la primera letra de cada palabra.\n2. Si la primera letra es igual (ej. Barco y Bota), miramos la segunda letra (la a va antes que la o, así que Barco va primero).",
              visual: "Avión ➡️ Barco ➡️ Casa ➡️ Dedo"
            }
          ],
          tip: "¡El abecedario siempre empieza por la A y termina por la Z!"
        },
        minigame: {
          type: "sorting",
          instruction: "Ordena estas 4 palabras por orden alfabético (del 1 al 4):",
          items: [
            { id: "w1", text: "Manzana", order: 3 },
            { id: "w2", text: "Árbol", order: 1 },
            { id: "w3", text: "Delfín", order: 2 },
            { id: "w4", text: "Zapato", order: 4 }
          ]
        },
        test: [
          {
            question: "¿Cuántas letras tiene el abecedario en español?",
            options: ["20 letras", "27 letras", "32 letras", "25 letras"],
            correct: 1,
            feedback: "¡Correcto! Son 27 letras (incluyendo la Ñ)."
          },
          {
            question: "¿Cuáles son las 5 vocales?",
            options: ["B, C, D, F, G", "A, E, I, O, U", "M, P, S, T, L", "1, 2, 3, 4, 5"],
            correct: 1,
            feedback: "¡Fenomenal! A, E, I, O, U."
          },
          {
            question: "¿Qué palabra va PRIMERO según el abecedario?",
            options: ["Plátano", "León", "Barco", "Gato"],
            correct: 2,
            feedback: "¡Exacto! Barco empieza por B, que va antes que G, L y P."
          },
          {
            question: "Entre 'Coche' y 'Casa', ¿cuál va antes en el diccionario?",
            options: ["Coche", "Casa", "Las dos a la vez", "Ninguna"],
            correct: 1,
            feedback: "¡Muy bien! Como las dos empiezan por C, miramos la segunda letra: la 'a' de Casa va antes que la 'o' de Coche."
          },
          {
            question: "¿Qué letra va inmediatamente después de la M en el abecedario?",
            options: ["La P", "La L", "La N", "La O"],
            correct: 2,
            feedback: "¡Estupendo! K, L, M, N, Ñ..."
          }
        ]
      },
      {
        id: "len_2",
        title: "Sustantivos (Nombres) y Adjetivos",
        icon: "🏷️",
        explanation: {
          intro: "Las palabras tienen trabajos diferentes en las oraciones: unas dan nombre a las cosas y otras nos dicen cómo son.",
          sections: [
            {
              heading: "Sustantivos o Nombres",
              body: "Son palabras que nombran a personas, animales, plantas, cosas y lugares.\n• Comunes: nombran a cualquier ser (niño, perro, río, mesa).\n• Propios: nombran a alguien o algún lugar especial y ¡SE ESCRIBEN CON MAYÚSCULA! (Lucas, España, río Ebro).",
              visual: "Común: perro 🐕 | Propio: Toby 🦮"
            },
            {
              heading: "Los Adjetivos (¿Cómo es?)",
              body: "Los adjetivos son palabras que acompañan al sustantivo y nos dicen cómo es o cómo está.\nEjemplos: pelota ROJA, niño SIMPÁTICO, sopa CALIENTE, coche RÁPIDO.",
              visual: "gato [SUSTANTIVO] + negro [ADJETIVO]"
            }
          ],
          tip: "¡Regla de oro! Los nombres de personas, mascotas y ciudades siempre se escriben con la primera letra MAYÚSCULA."
        },
        minigame: {
          type: "classification",
          instruction: "Clasifica cada palabra: ¿es Sustantivo Común, Sustantivo Propio o Adjetivo?",
          categories: [
            { id: "comun", name: "Sustantivo Común" },
            { id: "propio", name: "Sustantivo Propio (Mayúscula)" },
            { id: "adjetivo", name: "Adjetivo (Cómo es)" }
          ],
          items: [
            { id: "w1", text: "gato", category: "comun" },
            { id: "w2", text: "Madrid", category: "propio" },
            { id: "w3", text: "brillante", category: "adjetivo" },
            { id: "w4", text: "Sara", category: "propio" },
            { id: "w5", text: "árbol", category: "comun" },
            { id: "w6", text: "divertido", category: "adjetivo" }
          ]
        },
        test: [
          {
            question: "¿Cuál de estas palabras es un SUSTANTIVO PROPIO?",
            options: ["montaña", "Barcelona", "ciudad", "río"],
            correct: 1,
            feedback: "¡Eso es! Barcelona es el nombre propio de una ciudad y se escribe con mayúscula."
          },
          {
            question: "En la frase 'El perro juguetón corre por el parque', ¿cuál es el ADJETIVO?",
            options: ["perro", "corre", "juguetón", "parque"],
            correct: 2,
            feedback: "¡Muy bien! 'Juguetón' nos dice cómo es el perro."
          },
          {
            question: "El plural de 'lápiz' es...",
            options: ["lápizes", "lápices", "lápiss", "lápis"],
            correct: 1,
            feedback: "¡Fantástico! Las palabras que terminan en Z hacen el plural con C: lápices."
          },
          {
            question: "¿Cuál de estos sustantivos es femenino y singular?",
            options: ["los leones", "la mariposa", "el barco", "las flores"],
            correct: 1,
            feedback: "¡Genial! 'La mariposa' (femenino: la, singular: una sola)."
          },
          {
            question: "¿Qué palabra nos dice una cualidad (adjetivo) de la nieve?",
            options: ["blanca", "montaña", "nieve", "caer"],
            correct: 0,
            feedback: "¡Perfecto! 'Blanca' o 'fría' son adjetivos que describen la nieve."
          }
        ]
      },
      {
        id: "len_3",
        title: "Los Verbos: ¡Palabras en Acción!",
        icon: "🏃",
        explanation: {
          intro: "¿Qué haces durante el día? Corres, saltas, estudias, ríes y duermes. ¡Todas esas acciones son VERBOS!",
          sections: [
            {
              heading: "¿Qué es un Verbo?",
              body: "Es la palabra que indica lo que hace una persona, animal o cosa.\nEjemplos: El pájaro VUELA. La niña LEE. El sol BRILLA.",
              visual: "Acción: Bailar, Cantar, Escribir"
            },
            {
              heading: "Pasado, Presente y Futuro",
              body: "• PASADO (Ayer): Ya ocurrió. (Ayer jugué, ayer comí).\n• PRESENTE (Hoy): Está pasando ahora mismo. (Hoy juego, hoy como).\n• FUTURO (Mañana): Pasará más adelante. (Mañana jugaré, mañana comeré).",
              visual: "Ayer comí ⬅️ Hoy como ➡️ Mañana comeré"
            }
          ],
          tip: "Para encontrar el verbo en una frase, pregúntate: ¿Qué está haciendo el protagonista?"
        },
        minigame: {
          type: "classification",
          instruction: "Clasifica cada verbo según cuándo ocurre la acción:",
          categories: [
            { id: "pasado", name: "Pasado (Ayer)" },
            { id: "presente", name: "Presente (Hoy)" },
            { id: "futuro", name: "Futuro (Mañana)" }
          ],
          items: [
            { id: "v1", text: "canté", category: "pasado" },
            { id: "v2", text: "canto", category: "presente" },
            { id: "v3", text: "cantaré", category: "futuro" },
            { id: "v4", text: "estudió", category: "pasado" },
            { id: "v5", text: "juega", category: "presente" },
            { id: "v6", text: "viajaremos", category: "futuro" }
          ]
        },
        test: [
          {
            question: "¿Cuál es el verbo en la oración 'Mateo come una manzana rica'?",
            options: ["Mateo", "come", "manzana", "rica"],
            correct: 1,
            feedback: "¡Exacto! 'Come' es la acción que hace Mateo."
          },
          {
            question: "La frase 'Ayer los niños saltaron en el parque' está en tiempo...",
            options: ["Presente", "Futuro", "Pasado", "Infinito"],
            correct: 2,
            feedback: "¡Muy bien! Ocurrió ayer, así que está en Pasado."
          },
          {
            question: "¿Cómo se dice el verbo 'bailar' en FUTURO para 'nosotros'?",
            options: ["bailamos", "bailaremos", "bailaron", "bailé"],
            correct: 1,
            feedback: "¡Eso es! Nosotros bailaremos mañana."
          },
          {
            question: "¿Cuál de estas palabras NO es un verbo?",
            options: ["dormir", "patinar", "ventana", "dibujar"],
            correct: 2,
            feedback: "¡Genial! 'Ventana' es un objeto (sustantivo), no una acción."
          },
          {
            question: "Completa la frase: 'Ahora mismo el profesor nos ______ un cuento.'",
            options: ["explicará", "explicó", "explica", "explicaban"],
            correct: 2,
            feedback: "¡Perfecto! Al ser ahora mismo (presente), es 'explica'."
          }
        ]
      },
      {
        id: "len_4",
        title: "Ortografía de Campeones: C/QU, Z/C y R/RR",
        icon: "✍️",
        explanation: {
          intro: "Escribir bien es como tener superpoderes de ninja de las palabras. ¡Estas son las 3 reglas de oro de 2º de Primaria!",
          sections: [
            {
              heading: "Regla 1: El sonido K (C y QU)",
              body: "• Escribimos C con las vocales a, o, u: CA, CO, CU (casa, coche, cuna).\n• Escribimos QU con las vocales e, i: QUE, QUI (queso, quince, paquete). ¡Nunca se escribe con k!",
              visual: "ca, que, qui, co, cu"
            },
            {
              heading: "Regla 2: El sonido Z (Z y C)",
              body: "• Escribimos Z con a, o, u: ZA, ZO, ZU (zapato, zorro, zumo).\n• Escribimos C con e, i: CE, CI (cebra, cielo, circo).",
              visual: "za, ce, ci, zo, zu"
            },
            {
              heading: "Regla 3: Antes de P y B...",
              body: "¡Siempre se escribe M y nunca N! Ejemplo: campo, bombón, tambor, campana.",
              visual: "M antes de P y B (cam-po, bom-ba)"
            }
          ],
          tip: "¡Cuidado con la R! Entre dos vocales, para que suene fuerte hay que poner doble R (perro, carro). Si va al principio, suena fuerte pero se escribe solo una (ratón)."
        },
        minigame: {
          type: "bubble_hunter",
          instruction: "Haz clic únicamente en las palabras escritas CORRECTAMENTE:",
          bubbles: [
            { text: "queso", correct: true },
            { text: "cebra", correct: true },
            { text: "campo", correct: true },
            { text: "canpo", correct: false },
            { text: "ceso", correct: false },
            { text: "guitarra", correct: true },
            { text: "enpanada", correct: false },
            { text: "zapato", correct: true }
          ]
        },
        test: [
          {
            question: "¿Cómo se escribe correctamente?",
            options: ["Ceso", "Queso", "Keso", "Qeso"],
            correct: 1,
            feedback: "¡Muy bien! Con la letra E se escribe 'que': Queso."
          },
          {
            question: "Antes de las letras P y B, ¿qué letra se escribe siempre?",
            options: ["La letra N", "La letra M", "La letra S", "La letra R"],
            correct: 1,
            feedback: "¡Excelente! Siempre M: campana, bombero, sombrero."
          },
          {
            question: "¿Cuál de estas palabras está bien escrita?",
            options: ["Tanbor", "Tambor", "Tabmor", "Tanvor"],
            correct: 1,
            feedback: "¡Correcto! 'Tambor' lleva M antes de B."
          },
          {
            question: "¿Cómo se escribe el animal 'c_bra'?",
            options: ["cebra", "zebra", "quebra", "sebra"],
            correct: 0,
            feedback: "¡Así es! Con la E se escribe con C: Cebra."
          },
          {
            question: "¿Por qué 'ratón' se escribe con una sola R aunque suena fuerte?",
            options: ["Porque va al principio de la palabra", "Porque es pequeño", "Porque es un animal", "Es un error"],
            correct: 0,
            feedback: "¡Genial! A principio de palabra nunca se pone doble R (ratón, rosa, rueda)."
          }
        ]
      },
      {
        id: "len_5",
        title: "Sinónimos y Antónimos",
        icon: "🎭",
        explanation: {
          intro: "Las palabras tienen mejores amigas que significan lo mismo y contrincantes que significan lo contrario.",
          sections: [
            {
              heading: "¿Qué son los Sinónimos?",
              body: "Son palabras diferentes pero que tienen el MISMO significado.\n• Contento = Alegre = Feliz\n• Rápido = Veloz\n• Bonito = Hermoso\n• Caminar = Andar",
              visual: "Feliz 🤝 Alegre (Sinónimos)"
            },
            {
              heading: "¿Qué son los Antónimos?",
              body: "Son palabras que significan lo CONTRARIO u OPUESTO.\n• Alto ↔️ Bajo\n• Frío ↔️ Caliente\n• Grande ↔️ Pequeño\n• Luz ↔️ Oscuridad",
              visual: "Día ☀️ ⚡ 🌙 Noche (Antónimos)"
            }
          ],
          tip: "Usar sinónimos te ayuda a no repetir la misma palabra muchas veces cuando escribes cuentos o redacciones."
        },
        minigame: {
          type: "matching",
          instruction: "Empareja cada palabra con su ANTÓNIMO (su significado contrario):",
          pairs: [
            { a: "Encendido", b: "Apagado" },
            { a: "Valiente", b: "Cobarde" },
            { a: "Subir", b: "Bajar" },
            { a: "Limpio", b: "Sucio" },
            { a: "Verdad", b: "Mentira" }
          ]
        },
        test: [
          {
            question: "¿Cuál es el SINÓNIMO de la palabra 'veloz'?",
            options: ["Lento", "Rápido", "Triste", "Fuerte"],
            correct: 1,
            feedback: "¡Exacto! Rápido y veloz significan lo mismo."
          },
          {
            question: "¿Cuál es el ANTÓNIMO de 'fácil'?",
            options: ["Sencillo", "Difícil", "Rápido", "Divertido"],
            correct: 1,
            feedback: "¡Muy bien! Lo contrario de fácil es difícil."
          },
          {
            question: "¿Qué pareja de palabras son SINÓNIMOS?",
            options: ["Luz y oscuridad", "Empezar y comenzar", "Subir y bajar", "Lleno y vacío"],
            correct: 1,
            feedback: "¡Fenomenal! Empezar y comenzar significan exactamente lo mismo."
          },
          {
            question: "¿Cuál es el antónimo de 'abierto'?",
            options: ["Libre", "Cerrado", "Claro", "Roto"],
            correct: 1,
            feedback: "¡Eso es! Abierto y cerrado son contrarios."
          },
          {
            question: "Encuentra el sinónimo de 'charlar':",
            options: ["Comer", "Dormir", "Hablar", "Correr"],
            correct: 2,
            feedback: "¡Bravo! Charlar es lo mismo que hablar."
          }
        ]
      }
    ]
  },

  ciencias_naturales: {
    id: "ciencias_naturales",
    title: "Bosque de la Naturaleza",
    shortTitle: "Ciencias Naturales",
    icon: "🌿",
    themeColor: "from-emerald-500 to-green-600",
    accentColor: "#10b981",
    badge: "Guardián de la Tierra",
    description: "¡Descubre los animales vertebrados, las plantas, los 5 sentidos y el reciclaje!",
    topics: [
      {
        id: "nat_1",
        title: "Los Animales: Vertebrados e Invertebrados",
        icon: "🐾",
        explanation: {
          intro: "En el planeta Tierra viven millones de animales increíbles. ¡Vamos a descubrir cómo se clasifican!",
          sections: [
            {
              heading: "Vertebrados e Invertebrados",
              body: "• Vertebrados: Tienen columna vertebral y esqueleto de huesos por dentro (como nosotros).\n• Invertebrados: No tienen huesos (como mariposas, arañas, medusas y caracoles).",
              visual: "Vertebrados 🦴 vs Invertebrados 🐛"
            },
            {
              heading: "Los 5 grupos de vertebrados",
              body: "1. Mamíferos: Tienen pelo, maman leche y son vivíparos (nacen del vientre).\n2. Aves: Tienen plumas, pico, 2 alas y ponen huevos (ovíparos).\n3. Peces: Tienen escamas, aletas y respiran bajo el agua por branquias.\n4. Reptiles: Tienen escamas duras y se arrastran (serpientes, lagartos).\n5. Anfibios: Piel húmeda y desnuda; viven en el agua y en la tierra (ranas).",
              visual: "Mamífero 🐶 | Ave 🦅 | Pez 🐟 | Reptil 🦎 | Anfibio 🐸"
            }
          ],
          tip: "¿Sabías que los delfines y las ballenas NO son peces? ¡Son mamíferos marinos que respiran aire por un agujerito llamado espiráculo!"
        },
        minigame: {
          type: "classification",
          instruction: "Clasifica a estos animales en su grupo correcto:",
          categories: [
            { id: "mamifero", name: "Mamíferos 🦁" },
            { id: "ave", name: "Aves 🦜" },
            { id: "pez", name: "Peces 🐠" }
          ],
          items: [
            { id: "a1", text: "Perro", category: "mamifero" },
            { id: "a2", text: "Gorrión", category: "ave" },
            { id: "a3", text: "Tiburón", category: "pez" },
            { id: "a4", text: "Delfín", category: "mamifero" },
            { id: "a5", text: "Pingüino", category: "ave" },
            { id: "a6", text: "Sardina", category: "pez" }
          ]
        },
        test: [
          {
            question: "¿Qué tienen por dentro los animales VERTEBRADOS?",
            options: ["Concha de caracol", "Columna vertebral y huesos", "Algodón", "Nada, están vacíos"],
            correct: 1,
            feedback: "¡Exacto! Los vertebrados tienen esqueleto interno con columna vertebral."
          },
          {
            question: "¿Cómo nacen los animales VIVÍPAROS?",
            options: ["De un huevo", "Del vientre de su madre", "De las hojas de un árbol", "Del agua"],
            correct: 1,
            feedback: "¡Muy bien! Los vivíparos (como los mamíferos) nacen directamente de la madre."
          },
          {
            question: "El pingüino no puede volar, pero tiene plumas y pico. ¿Qué tipo de animal es?",
            options: ["Un pez", "Un mamífero", "Un ave", "Un reptil"],
            correct: 2,
            feedback: "¡Genial! Los pingüinos son aves nadadoras extraordinarias."
          },
          {
            question: "¿Por dónde respiran los peces bajo el agua?",
            options: ["Por los pulmones", "Por las patas", "Por las branquias", "Por la cola"],
            correct: 2,
            feedback: "¡Eso es! Las branquias les permiten absorber el oxígeno del agua."
          },
          {
            question: "¿Cuál de estos animales es un INVERTEBRADO?",
            options: ["El perro", "La mariposa", "El gato", "El caballo"],
            correct: 1,
            feedback: "¡Fenomenal! La mariposa es un insecto y no tiene huesos por dentro."
          }
        ]
      },
      {
        id: "nat_2",
        title: "El Reino de las Plantas",
        icon: "🌱",
        explanation: {
          intro: "¡Las plantas son seres vivos increíbles que fabrican su propio alimento con ayuda del sol!",
          sections: [
            {
              heading: "Las Partes de una Planta",
              body: "• Raíz: Está bajo tierra. Sujeta la planta y absorbe agua y sales minerales.\n• Tallo: Sostiene las hojas y ramas y transporta la savia.\n• Hojas: 'La cocina de la planta'. Toman la luz del sol y el aire.\n• Flores y Frutos: Ayudan a la reproducción; los frutos guardan las semillas.",
              visual: "Flor 🌸 ➡️ Hojas 🍃 ➡️ Tallo 🌱 ➡️ Raíz 🥕"
            },
            {
              heading: "¿Qué necesita una planta para vivir?",
              body: "Las plantas son seres vivos y necesitan 4 cosas vitales:\n1. Agua 💧\n2. Luz solar ☀️\n3. Aire 🌬️\n4. Tierra o sustrato con nutrientes 🌱",
              visual: "Agua + Sol + Aire + Tierra = Vida"
            }
          ],
          tip: "¡Diferencia clave! Los árboles tienen un tronco duro y leñoso. Los arbustos tienen ramas desde el suelo. Las hierbas tienen tallos verdes y blanditos."
        },
        minigame: {
          type: "sorting",
          instruction: "Ordena las partes de la planta desde abajo (tierra) hasta arriba:",
          items: [
            { id: "p1", text: "Raíz (bajo tierra)", order: 1 },
            { id: "p2", text: "Tallo o tronco", order: 2 },
            { id: "p3", text: "Hojas y ramas", order: 3 },
            { id: "p4", text: "Flores y frutos", order: 4 }
          ]
        },
        test: [
          {
            question: "¿Qué parte de la planta absorbe el agua de la tierra?",
            options: ["Las hojas", "La flor", "La raíz", "El fruto"],
            correct: 2,
            feedback: "¡Perfecto! La raíz absorbe el agua y los minerales del suelo."
          },
          {
            question: "¿Qué necesitan las plantas para fabricar su alimento?",
            options: ["Hamburguesas", "Luz del sol, agua, aire y tierra", "Solo oscuridad", "Zumo de naranja"],
            correct: 1,
            feedback: "¡Muy bien! Agua, luz solar, aire y tierra."
          },
          {
            question: "¿Dónde se esconden las semillas que darán nuevas plantas?",
            options: ["En el tronco", "Dentro de los frutos", "En las raíces profundas", "En el aire"],
            correct: 1,
            feedback: "¡Correcto! Los frutos protegen las semillas (como en la manzana o la sandía)."
          },
          {
            question: "Una planta con tallo blando, flexible y verde es...",
            options: ["Un árbol", "Un arbusto", "Una hierba", "Una piedra"],
            correct: 2,
            feedback: "¡Excelente! Las hierbas tienen tallos verdes y tiernos."
          },
          {
            question: "¿Por qué decimos que las plantas son seres vivos?",
            options: ["Porque nacen, crecen, se reproducen y mueren", "Porque pueden correr", "Porque hablan", "Porque van al colegio"],
            correct: 0,
            feedback: "¡Exacto! Cumplen el ciclo vital de los seres vivos."
          }
        ]
      },
      {
        id: "nat_3",
        title: "El Cuerpo Humano y los 5 Sentidos",
        icon: "👀",
        explanation: {
          intro: "Tu cuerpo es una máquina maravillosa. ¡Gracias a los sentidos podemos explorar todo lo que nos rodea!",
          sections: [
            {
              heading: "Los 5 Sentidos y sus Órganos",
              body: "1. Vista 👁️: El órgano son los OJOS (vemos colores, formas y distancias).\n2. Oído 👂: El órgano son los OÍDOS (escuchamos música, voces y ruidos).\n3. Olfato 👃: El órgano es la NARIZ (olemos flores ricas o comida quemada).\n4. Gusto 👅: El órgano es la LENGUA (sabores dulce, salado, ácido, amargo).\n5. Tacto ✋: El órgano es la PIEL (sentimos frío, calor, suave, rugoso).",
              visual: "Ojos | Oídos | Nariz | Lengua | Piel"
            },
            {
              heading: "Huesos, Músculos y Articulaciones",
              body: "• El Esqueleto: Son más de 200 huesos que nos sostienen y protegen órganos delicados (el cráneo protege el cerebro).\n• Los Músculos: Se estiran y encogen para que nos podamos mover.\n• Las Articulaciones: Lugares donde se unen los huesos (codo, rodilla, tobillo, cuello).",
              visual: "🦴 Esqueleto + 💪 Músculos = ¡Movimiento!"
            }
          ],
          tip: "¡El órgano más grande de todo tu cuerpo es la PIEL! Nos cubre de la cabeza a los pies y nos protege del frío y de las bacterias."
        },
        minigame: {
          type: "matching",
          instruction: "Empareja cada estímulo con el sentido con el que lo percibes:",
          pairs: [
            { a: "El arcoíris de colores", b: "Sentido de la Vista 👁️" },
            { a: "Una canción divertida", b: "Sentido del Oído 👂" },
            { a: "El perfume de una rosa", b: "Sentido del Olfato 👃" },
            { a: "Un helado de fresa", b: "Sentido del Gusto 👅" },
            { a: "La suavidad de un peluche", b: "Sentido del Tacto ✋" }
          ]
        },
        test: [
          {
            question: "¿Cuál es el órgano del sentido del GUSTO?",
            options: ["La nariz", "Los dientes", "La lengua", "Los ojos"],
            correct: 2,
            feedback: "¡Genial! La lengua tiene papilas gustativas para saborear la comida."
          },
          {
            question: "¿Qué hueso duro protege nuestro cerebro como si fuera un casco?",
            options: ["Las costillas", "El fémur", "El cráneo", "La columna"],
            correct: 2,
            feedback: "¡Muy bien! El cráneo protege el cerebro."
          },
          {
            question: "¿Cómo se llama el punto donde se doblan la pierna y el muslo?",
            options: ["El hombro", "La rodilla", "La muñeca", "El cuello"],
            correct: 1,
            feedback: "¡Exacto! La rodilla es una articulación fundamental para caminar y saltar."
          },
          {
            question: "¿Qué sentido nos avisa de que el agua de la ducha está demasiado caliente?",
            options: ["La vista", "El olfato", "El tacto (la piel)", "El oído"],
            correct: 2,
            feedback: "¡Eso es! La piel percibe la temperatura y el dolor."
          },
          {
            question: "¿Cuántos sentidos tenemos?",
            options: ["3 sentidos", "5 sentidos", "10 sentidos", "2 sentidos"],
            correct: 1,
            feedback: "¡Perfecto! Vista, oído, olfato, gusto y tacto."
          }
        ]
      },
      {
        id: "nat_4",
        title: "Hábitos Saludables y Bienestar",
        icon: "🥗",
        explanation: {
          intro: "¡Para ser un auténtico superhéroe con energía, hay que cuidar nuestro cuerpo todos los días!",
          sections: [
            {
              heading: "Los 4 Pilares de la Salud",
              body: "1. Alimentación sana: Comer frutas, verduras, pescado y beber mucha agua (¡menos chuches y refrescos!).\n2. Deporte y juego activo: Mover el cuerpo al menos 1 hora al día (correr, bailar, patinar).\n3. Higiene personal: Lavarse las manos antes de comer, ducharse y cepillarse los dientes 3 veces al día.\n4. Descanso: Dormir entre 9 y 10 horas cada noche para recargar las pilas del cerebro.",
              visual: "🍎 Come sano | 🏃 Muévete | 🪥 Higiene | 😴 Duerme bien"
            }
          ],
          tip: "¡El agua es tu mejor aliada! Cuando juegues y sudes, bebe agua fresca para mantener tu cuerpo hidratado."
        },
        minigame: {
          type: "classification",
          instruction: "Clasifica los siguientes hábitos:",
          categories: [
            { id: "saludable", name: "Hábito Saludable (¡Súper bien!) 🌟" },
            { id: "nosaludable", name: "No Saludable (¡Evitar!) ❌" }
          ],
          items: [
            { id: "h1", text: "Lavarse los dientes tras cada comida", category: "saludable" },
            { id: "h2", text: "Comer gominolas todos los días", category: "nosaludable" },
            { id: "h3", text: "Dormir 10 horas diarias", category: "saludable" },
            { id: "h4", text: "Ver pantallas hasta muy tarde en la cama", category: "nosaludable" },
            { id: "h5", text: "Comer manzana y plátano en el recreo", category: "saludable" },
            { id: "h6", text: "Pasar todo el día sentado en el sofá", category: "nosaludable" }
          ]
        },
        test: [
          {
            question: "¿Cuántas veces al día es recomendable cepillarse los dientes?",
            options: ["Una vez al año", "Solo los domingos", "Tres veces al día (después de las comidas)", "Nunca"],
            correct: 2,
            feedback: "¡Así se hace! Tres veces al día para mantener una sonrisa sana y sin caries."
          },
          {
            question: "¿Cuántas horas debe dormir aproximadamente un niño de 7 u 8 años?",
            options: ["4 horas", "9 a 10 horas", "2 horas", "15 horas"],
            correct: 1,
            feedback: "¡Excelente! Entre 9 y 10 horas para que el cuerpo y la mente descansen bien."
          },
          {
            question: "¿Qué es lo mejor que puedes beber cuando tienes sed?",
            options: ["Refresco con gas", "Agua fresca", "Batido con mucho azúcar", "Bebida energética"],
            correct: 1,
            feedback: "¡Perfecto! El agua es la bebida más saludable y necesaria."
          },
          {
            question: "¿Cuándo es MUY IMPORTANTE lavarse las manos con agua y jabón?",
            options: ["Antes de comer y después de ir al baño", "Solo en tu cumpleaños", "Cuando llueve", "Nunca hace falta"],
            correct: 0,
            feedback: "¡Bravo! Así eliminamos bacterias y prevenimos ponernos malitos."
          },
          {
            question: "¿Qué grupo de alimentos nos da vitaminas y minerales?",
            options: ["Los pasteles y chocolates", "Las frutas y las verduras", "Las patatas fritas de bolsa", "Los caramelos"],
            correct: 1,
            feedback: "¡Genial! Las frutas y verduras son ricas en vitaminas esenciales."
          }
        ]
      },
      {
        id: "nat_5",
        title: "La Materia, el Agua y el Reciclaje (Las 3 R)",
        icon: "♻️",
        explanation: {
          intro: "Cuidar nuestro planeta es misión de todos. ¡Aprende los estados del agua y a ser un maestro del reciclaje!",
          sections: [
            {
              heading: "Los 3 Estados del Agua",
              body: "• Sólido: Hielo, nieve, granizo (está duro y muy frío).\n• Líquido: El agua del grifo, los ríos, la lluvia y el mar.\n• Gaseoso: Vapor de agua, nubes (cuando el agua se calienta y sube al cielo).",
              visual: "🧊 Hielo (Sólido) ➡️ 💧 Agua (Líquido) ➡️ ☁️ Vapor (Gas)"
            },
            {
              heading: "¿Dónde tiramos cada residuo?",
              body: "• Contenedor AMARILLO: Envases de plástico, briks de leche y latas.\n• Contenedor AZUL: Papel, folios viejos, periódicos y cajas de cartón.\n• Contenedor VERDE (Iglú): Botellas y frascos de vidrio (¡sin tapas!).\n• Contenedor MARRÓN / GRIS: Restos orgánicos (pieles de plátano, comida).",
              visual: "🟡 Amarillo: Plásticos | 🔵 Azul: Papel | 🟢 Verde: Vidrio"
            }
          ],
          tip: "¡Recuerda las 3 R mágicas: REDUCIR (usar menos cosas de un solo uso), REUTILIZAR (dar una segunda vida a las cosas) y RECICLAR!"
        },
        minigame: {
          type: "classification",
          instruction: "Tira cada objeto en su contenedor de reciclaje correcto:",
          categories: [
            { id: "azul", name: "Contenedor Azul 🔵 (Papel y Cartón)" },
            { id: "amarillo", name: "Contenedor Amarillo 🟡 (Envases y Latas)" },
            { id: "verde", name: "Contenedor Verde 🟢 (Vidrio)" }
          ],
          items: [
            { id: "r1", text: "Caja de zapatos de cartón", category: "azul" },
            { id: "r2", text: "Botella de plástico de refresco", category: "amarillo" },
            { id: "r3", text: "Frasco de mermelada de cristal", category: "verde" },
            { id: "r4", text: "Folios y dibujos usados", category: "azul" },
            { id: "r5", text: "Lata de atún de metal", category: "amarillo" },
            { id: "r6", text: "Brik de zumo", category: "amarillo" }
          ]
        },
        test: [
          {
            question: "¿En qué contenedor debemos depositar una caja de cereales de cartón?",
            options: ["En el contenedor amarillo", "En el contenedor azul", "En el contenedor verde", "En el suelo"],
            correct: 1,
            feedback: "¡Muy bien! El papel y cartón va siempre al contenedor Azul."
          },
          {
            question: "¿En qué estado se encuentra un cubito de hielo?",
            options: ["Líquido", "Gaseoso", "Sólido", "Caliente"],
            correct: 2,
            feedback: "¡Exacto! El hielo es agua en estado sólido."
          },
          {
            question: "Una lata de refresco de aluminio y una botella de plástico van al contenedor...",
            options: ["Azul", "Verde", "Amarillo", "Gris"],
            correct: 2,
            feedback: "¡Fenomenal! Los envases plásticos y latas van al Amarillo."
          },
          {
            question: "¿Qué significan las '3 R' de la ecología?",
            options: ["Reír, Rumiar y Rebotar", "Reducir, Reutilizar y Reciclar", "Rápido, Raro y Rico", "Romper, Rayar y Rascar"],
            correct: 1,
            feedback: "¡Magnífico! Reducir, Reutilizar y Reciclar para cuidar la Tierra."
          },
          {
            question: "¿Qué pasa con el agua líquida cuando se calienta mucho al hervir?",
            options: ["Se congela", "Se convierte en vapor de agua (gas)", "Se vuelve verde", "Desaparece para siempre"],
            correct: 1,
            feedback: "¡Correcto! Se evapora y se convierte en vapor de agua."
          }
        ]
      }
    ]
  },

  ciencias_sociales: {
    id: "ciencias_sociales",
    title: "Isla de la Sociedad",
    shortTitle: "Ciencias Sociales",
    icon: "🌍",
    themeColor: "from-sky-500 to-cyan-600",
    accentColor: "#0284c7",
    badge: "Explorador del Mundo",
    description: "¡Viaja por paisajes de montaña y costa, las 4 estaciones, los pueblos y la educación vial!",
    topics: [
      {
        id: "soc_1",
        title: "Los Paisajes: Montaña, Llanura y Costa",
        icon: "🏔️",
        explanation: {
          intro: "¡La naturaleza tiene paisajes espectaculares! Unos los ha modelado la Tierra y en otros los seres humanos han construido ciudades y puentes.",
          sections: [
            {
              heading: "1. Paisaje de Montaña",
              body: "• Son terrenos elevados y con pendientes.\n• Partes de una montaña: Cima o cumbre (lo más alto), falda (la ladera) y pie (la parte baja).\n• Varias montañas alineadas forman una SIERRA o cordillera.",
              visual: "⛰️ Cima (arriba) | Falda (medio) | Pie (abajo)"
            },
            {
              heading: "2. Paisaje de Llanura",
              body: "• Terrenos planos y horizontales, sin montañas.\n• Perfectos para cultivar cereales y hortalizas y construir carreteras.",
              visual: "🌾 Llanura amplia y abierta"
            },
            {
              heading: "3. Paisaje de Costa",
              body: "• Es la zona donde la tierra se junta con el mar.\n• Podemos encontrar playas de arena, acantilados rocosos, islas y puertos.",
              visual: "🏖️ Playa + Mar = Costa"
            }
          ],
          tip: "Elementos NATURALES son los árboles, ríos y montañas. Elementos HUMANOS o ARTIFICIALES son las casas, carreteras y puentes construidos por las personas."
        },
        minigame: {
          type: "classification",
          instruction: "Clasifica cada elemento: ¿es Natural o Artificial (hecho por el ser humano)?",
          categories: [
            { id: "natural", name: "Elemento Natural 🌲" },
            { id: "artificial", name: "Elemento Artificial (Humano) 🌉" }
          ],
          items: [
            { id: "e1", text: "Río con agua cristalina", category: "natural" },
            { id: "e2", text: "Puente de piedra", category: "artificial" },
            { id: "e3", text: "Montaña nevada", category: "natural" },
            { id: "e4", text: "Carretera asfaltada", category: "artificial" },
            { id: "e5", text: "Bosque de pinos", category: "natural" },
            { id: "e6", text: "Faro del puerto", category: "artificial" }
          ]
        },
        test: [
          {
            question: "¿Cómo se llama la parte más alta de una montaña?",
            options: ["El pie", "La falda", "La cima o cumbre", "El túnel"],
            correct: 2,
            feedback: "¡Exacto! La cima es el punto más elevado."
          },
          {
            question: "Un terreno completamente llano y plano, sin montañas, es una...",
            options: ["Meseta", "Llanura", "Isla", "Acantilado"],
            correct: 1,
            feedback: "¡Muy bien! Se llama llanura."
          },
          {
            question: "¿Qué es una ISLA?",
            options: ["Una montaña muy alta", "Un trozo de tierra rodeado de agua por todas partes", "Un río que desemboca en el mar", "Un bosque sin árboles"],
            correct: 1,
            feedback: "¡Fantástico! Una isla está rodeada de agua por todas partes (como Mallorca o Tenerife)."
          },
          {
            question: "¿Cuál de estos elementos es ARTIFICIAL (creado por personas)?",
            options: ["Un túnel en la montaña", "Un árbol centenario", "Una playa natural", "Un acantilado de piedra"],
            correct: 0,
            feedback: "¡Correcto! Los túneles son construidos por personas e ingenieros."
          },
          {
            question: "Un grupo de montañas unidas entre sí forma...",
            options: ["Un archipiélago", "Una sierra o cordillera", "Una llanura", "Un desierto"],
            correct: 1,
            feedback: "¡Bravo! Varias montañas forman una sierra."
          }
        ]
      },
      {
        id: "soc_2",
        title: "Las 4 Estaciones y el Clima",
        icon: "🌦️",
        explanation: {
          intro: "¿Por qué en verano nos bañamos en la playa y en invierno nos ponemos guantes y gorro? ¡Por las 4 estaciones del año!",
          sections: [
            {
              heading: "Las 4 Estaciones del Año",
              body: "🌸 PRIMAVERA: Los campos florecen, nacen crías de animales y las temperaturas son suaves.\n☀️ VERANO: Hace mucho calor, los días son largos y vamos a la piscina o la playa.\n🍂 OTOÑO: Las hojas de los árboles caducos caen, sopla viento y llueve más.\n❄️ INVIERNO: Hace frío, en las montañas nieva y los días son más cortitos.",
              visual: "Primavera 🌸 ➡️ Verano ☀️ ➡️ Otoño 🍂 ➡️ Invierno ❄️"
            },
            {
              heading: "Los Instrumentos del Tiempo",
              body: "• Termómetro: Mide la temperatura (si hace frío o calor en grados).\n• Pluviómetro: Mide la cantidad de lluvia caída.\n• Veleta: Nos dice hacia dónde sopla el viento.",
              visual: "🌡️ Termómetro | 🌧️ Pluviómetro | 🧭 Veleta"
            }
          ],
          tip: "¡El año tiene 12 meses y 4 estaciones! Cada estación dura aproximadamente 3 meses."
        },
        minigame: {
          type: "matching",
          instruction: "Empareja cada estación con su característica principal:",
          pairs: [
            { a: "Verano ☀️", b: "Mucho calor y días largos" },
            { a: "Otoño 🍂", b: "Caída de las hojas secas" },
            { a: "Invierno ❄️", b: "Mucho frío y abrigos gruesos" },
            { a: "Primavera 🌸", b: "Nacimiento de flores y pajaritos" },
            { a: "Termómetro 🌡️", b: "Mide la temperatura" }
          ]
        },
        test: [
          {
            question: "¿En qué estación del año caen las hojas secas de los árboles?",
            options: ["En verano", "En otoño", "En primavera", "En agosto"],
            correct: 1,
            feedback: "¡Muy bien! En otoño caen las hojas de los árboles de hoja caduca."
          },
          {
            question: "¿Qué aparato utilizamos para medir cuánta lluvia ha caído?",
            options: ["La veleta", "El pluviómetro", "El reloj", "La báscula"],
            correct: 1,
            feedback: "¡Excelente! El pluviómetro recoge y mide el agua de lluvia."
          },
          {
            question: "¿Cuántas estaciones hay en un año?",
            options: ["2 estaciones", "12 estaciones", "4 estaciones", "7 estaciones"],
            correct: 2,
            feedback: "¡Eso es! Cuatro: primavera, verano, otoño e invierno."
          },
          {
            question: "¿En qué estación hace más calor y los días duran más?",
            options: ["En invierno", "En otoño", "En verano", "En enero"],
            correct: 2,
            feedback: "¡Fenomenal! En verano recibimos más luz solar directa."
          },
          {
            question: "La veleta es un instrumento que sirve para saber...",
            options: ["La dirección del viento", "La hora", "El peso de las nubes", "Si va a nevar"],
            correct: 0,
            feedback: "¡Genial! La veleta gira con el viento e indica su dirección (Norte, Sur, Este, Oeste)."
          }
        ]
      },
      {
        id: "soc_3",
        title: "Pueblos, Ciudades y el Ayuntamiento",
        icon: "🏘️",
        explanation: {
          intro: "¿Vives en un pueblo tranquilo o en una gran ciudad con semáforos y autobuses? ¡Ambos lugares son geniales!",
          sections: [
            {
              heading: "Pueblos y Ciudades",
              body: "• PUEBLO: Localidad pequeña, con pocos habitantes, calles tranquilas, rodeado de naturaleza y con casas más bajas.\n• CIUDAD: Localidad grande, con muchos habitantes, edificios altos, mucho tráfico, tiendas y avenidas anchas.",
              visual: "Pueblo 🏡 vs Ciudad 🏙️"
            },
            {
              heading: "El Ayuntamiento y los Servicios Públicos",
              body: "• En el Ayuntamiento trabajan el Alcalde o Alcaldesa y los Concejales.\n• Se encargan de que las calles estén limpias, funcionen las farolas, haya parques bonitos y policía local para protegernos.",
              visual: "🏛️ Ayuntamiento = Gobierno de la localidad"
            }
          ],
          tip: "¡Tanto en el pueblo como en la ciudad es muy importante cuidar el mobiliario urbano (bancos, papeleras, juegos del parque)!"
        },
        minigame: {
          type: "classification",
          instruction: "Clasifica estas características: ¿son típicas de un Pueblo o de una Ciudad?",
          categories: [
            { id: "pueblo", name: "Típico de Pueblo 🏡" },
            { id: "ciudad", name: "Típico de Gran Ciudad 🏙️" }
          ],
          items: [
            { id: "l1", text: "Edificios con rascacielos muy altos", category: "ciudad" },
            { id: "l2", text: "Pocos habitantes donde casi todos se conocen", category: "pueblo" },
            { id: "l3", text: "Líneas de metro subterráneo", category: "ciudad" },
            { id: "l4", text: "Campos de cultivo y huertos cercanos", category: "pueblo" },
            { id: "l5", text: "Mucho tráfico de coches y autobuses", category: "ciudad" },
            { id: "l6", text: "Calles silenciosas y estrechas", category: "pueblo" }
          ]
        },
        test: [
          {
            question: "¿Quién dirige el Ayuntamiento y representa a todos los vecinos?",
            options: ["El capitán", "El alcalde o alcaldesa", "El director del cine", "El médico"],
            correct: 1,
            feedback: "¡Exacto! El alcalde o alcaldesa dirige el ayuntamiento con sus concejales."
          },
          {
            question: "En una gran CIUDAD encontramos habitualmente...",
            options: ["Muchos edificios altos y transporte público", "Solo una calle pequeña", "Muchos tractores en el centro", "Silencio total"],
            correct: 0,
            feedback: "¡Muy bien! Las ciudades tienen muchos servicios, avenidas y transportes."
          },
          {
            question: "¿Cuál de estos es un servicio municipal que cuida nuestra localidad?",
            options: ["El servicio de limpieza y recogida de basura", "La fábrica de chucherías", "Una nave espacial", "El parque de atracciones privado"],
            correct: 0,
            feedback: "¡Fenomenal! Los barrenderos y camiones de basura mantienen limpio el municipio."
          },
          {
            question: "¿Dónde se celebran las reuniones de los concejales de una localidad?",
            options: ["En el supermercado", "En el Ayuntamiento", "En la playa", "En la piscina"],
            correct: 1,
            feedback: "¡Bravo! En el Ayuntamiento."
          },
          {
            question: "Para ser un buen ciudadano, ¿dónde debemos tirar los envoltorios en la calle?",
            options: ["Al suelo", "A la papelera o contenedor", "A la fuente", "Debajo de un coche"],
            correct: 1,
            feedback: "¡Perfecto! Siempre a las papeleras para cuidar nuestro entorno."
          }
        ]
      },
      {
        id: "soc_4",
        title: "Las Profesiones y los Trabajos",
        icon: "👷",
        explanation: {
          intro: "¡Todos los trabajos son importantes y ayudan a que la sociedad funcione!",
          sections: [
            {
              heading: "Los 3 Sectores de Trabajo",
              body: "1. Trabajos de la naturaleza (Sector Primario): Obtienen productos directos de la tierra y el mar (agricultores, ganaderos, pescadores, mineros).\n2. Trabajos de fabricación (Sector Secundario): Transforman materias primas en productos elaborados en fábricas y talleres (panaderos, carpinteros, obreros).\n3. Trabajos de servicios (Sector Terciario): No fabrican objetos, prestan ayuda a las personas (maestros, médicas, bomberos, carteras, cocineros).",
              visual: "Campo 🌾 ➡️ Fábrica 🏭 ➡️ Servicios 🚑"
            }
          ],
          tip: "¡Una panadera coge el trigo que plantó el agricultor y hace un pan delicioso que luego tú compras en la panadería!"
        },
        minigame: {
          type: "matching",
          instruction: "Empareja cada profesional con su función en la sociedad:",
          pairs: [
            { a: "Médico / Enfermera 👩‍⚕️", b: "Nos cura y cuida nuestra salud" },
            { a: "Bombero / Bombera 👨‍🚒", b: "Apaga fuegos y hace rescates" },
            { a: "Maestro / Maestra 👩‍🏫", b: "Enseña conocimientos en la escuela" },
            { a: "Agricultor / Agricultora 🚜", b: "Cultiva alimentos en el campo" },
            { a: "Policía Local 👮", b: "Protege y ayuda a los ciudadanos" }
          ]
        },
        test: [
          {
            question: "¿Qué profesional se encarga de apagar incendios y ayudar en emergencias?",
            options: ["El camarero", "El bombero o bombera", "El pintor", "El zapatero"],
            correct: 1,
            feedback: "¡Genial! Los bomberos nos protegen ante el fuego y situaciones de rescate."
          },
          {
            question: "¿Qué trabajo obtiene productos directamente de la naturaleza?",
            options: ["La pescadora", "La informática", "El taxista", "El peluquero"],
            correct: 0,
            feedback: "¡Muy bien! Los pescadores y agricultores obtienen materias primas."
          },
          {
            question: "¿Qué hace un carpintero?",
            options: ["Hace pan", "Trabaja la madera para fabricar mesas o sillas", "Cura animales", "Conduce trenes"],
            correct: 1,
            feedback: "¡Excelente! El carpintero transforma la madera en muebles."
          },
          {
            question: "¿Quién nos enseña a leer, escribir y aprender en el colegio?",
            options: ["El maquinista", "El maestro o maestra", "El fontanero", "El jardinero"],
            correct: 1,
            feedback: "¡Por supuesto! Tus profes en la escuela."
          },
          {
            question: "Un veterinario es el médico que cuida a...",
            options: ["Los coches", "Los ordenadores", "Los animales enfermos", "Las plantas marchitas"],
            correct: 2,
            feedback: "¡Bravo! Cuida y cura a perros, gatos y todos los animales."
          }
        ]
      },
      {
        id: "soc_5",
        title: "Educación Vial: Peatones y Semáforos Seguros",
        icon: "🚦",
        explanation: {
          intro: "Cuando salimos a la calle somos peatones. ¡Conocer las normas de circulación nos mantiene seguros!",
          sections: [
            {
              heading: "El Semáforo de Peatones",
              body: "• Muñeco ROJO 🔴: ¡QUIETO! Peligro, están pasando los coches. Prohibido cruzar.\n• Muñeco VERDE 🟢: Puedes cruzar con tranquilidad por el paso de peatones, mirando antes a izquierda y derecha.",
              visual: "🔴 Rojo = Parar | 🟢 Verde = Cruzar"
            },
            {
              heading: "Reglas de Oro del Peatón",
              body: "1. Cruzar SIEMPRE por el paso de peatones (las líneas blancas pintadas en el suelo).\n2. Antes de cruzar: mirar a la izquierda, a la derecha y otra vez a la izquierda.\n3. Caminar siempre por la acera, nunca por la calzada.\n4. En el coche: llevar siempre el cinturón abrochado y usar la sillita adaptada.",
              visual: "🚸 Paso de cebra + Mirar a ambos lados"
            }
          ],
          tip: "¡Si montas en bicicleta o en patinete, es OBLIGATORIO llevar casco en la cabeza para protegerte!"
        },
        minigame: {
          type: "classification",
          instruction: "¿Es una conducta Segura o Peligrosa en la calle?",
          categories: [
            { id: "segura", name: "Conducta Segura 🛡️ (¡Genial!)" },
            { id: "peligrosa", name: "Conducta Peligrosa ⚠️ (¡Nunca hacer!)" }
          ],
          items: [
            { id: "v1", text: "Cruzar cuando el muñeco del semáforo está verde", category: "segura" },
            { id: "v2", text: "Salir corriendo detrás de un balón hacia la carretera", category: "peligrosa" },
            { id: "v3", text: "Ponerse el casco al montar en bicicleta o patinete", category: "segura" },
            { id: "v4", text: "Cruzar por mitad de la calle sin paso de peatones", category: "peligrosa" },
            { id: "v5", text: "Abrocharse el cinturón de seguridad en el coche", category: "segura" },
            { id: "v6", text: "Caminar por el borde de la carretera mirando el móvil", category: "peligrosa" }
          ]
        },
        test: [
          {
            question: "¿Qué debes hacer cuando el semáforo de peatones está en ROJO?",
            options: ["Cruzar corriendo muy rápido", "Esperar en la acera sin cruzar", "Saltar a la carretera", "Cerrar los ojos"],
            correct: 1,
            feedback: "¡Exacto! Rojo significa parar y esperar en la acera."
          },
          {
            question: "¿Por dónde deben cruzar la calle los peatones de forma segura?",
            options: ["Por cualquier esquina", "Por el paso de peatones (paso de cebra)", "Por encima de los coches", "Por los árboles"],
            correct: 1,
            feedback: "¡Muy bien! Siempre por el paso de peatones señalizado."
          },
          {
            question: "¿Qué elemento de protección debes llevar SIEMPRE que montes en bicicleta o patinete?",
            options: ["Gafas de sol", "Un casco en la cabeza", "Una bufanda", "Una mochila pesada"],
            correct: 1,
            feedback: "¡Excelente! El casco protege tu cabeza de posibles golpes."
          },
          {
            question: "En el coche, ¿qué debemos hacer nada más sentarnos?",
            options: ["Gritar", "Abrocharnos el cinturón de seguridad", "Tocar el volante", "Sacar la mano por la ventanilla"],
            correct: 1,
            feedback: "¡Fenomenal! Abrocharse el cinturón salva vidas."
          },
          {
            question: "Antes de cruzar un paso de cebra, ¿hacia dónde debemos mirar?",
            options: ["Solo al suelo", "A la izquierda, a la derecha y otra vez a la izquierda", "Solo al cielo para ver nubes", "Hacia atrás"],
            correct: 1,
            feedback: "¡Perfecto! Nos aseguramos de que no venga ningún vehículo en ambas direcciones."
          }
        ]
      }
    ]
  },

  ingles: {
    id: "ingles",
    title: "English Adventure",
    shortTitle: "Inglés",
    icon: "🇬🇧",
    themeColor: "from-rose-500 to-pink-600",
    accentColor: "#e11d48",
    badge: "Super Star Speaker",
    description: "¡Aprende colores, números, animales, partes del cuerpo y material escolar en inglés!",
    topics: [
      {
        id: "ing_1",
        title: "Colors & Numbers (1 to 20)",
        icon: "🎨",
        explanation: {
          intro: "Welcome to English Adventure! Let's learn colors and numbers. ¡Aprender los colores y números en inglés es súper fácil!",
          sections: [
            {
              heading: "Colors (Los Colores)",
              body: "• Red: Rojo 🔴\n• Blue: Azul 🔵\n• Yellow: Amarillo 🟡\n• Green: Verde 🟢\n• Orange: Naranja 🟠\n• Purple: Morado 🟣\n• Pink: Rosa 🌸\n• Black: Negro ⚫ | White: Blanco ⚪",
              visual: "Red, Blue, Yellow, Green, Orange"
            },
            {
              heading: "Numbers 1 to 20 (Los Números)",
              body: "1: One, 2: Two, 3: Three, 4: Four, 5: Five,\n6: Six, 7: Seven, 8: Eight, 9: Nine, 10: Ten,\n11: Eleven, 12: Twelve, 13: Thirteen, 14: Fourteen,\n15: Fifteen, 16: Sixteen, 17: Seventeen, 18: Eighteen,\n19: Nineteen, 20: Twenty!",
              visual: "10 = Ten | 20 = Twenty"
            }
          ],
          tip: "Pronunciation tip: 'Three' (3) se pronuncia poniendo la lengüita entre los dientes suavemente: /zrii/."
        },
        minigame: {
          type: "matching",
          instruction: "Match each English word with its Spanish meaning:",
          pairs: [
            { a: "Red", b: "Rojo" },
            { a: "Yellow", b: "Amarillo" },
            { a: "Twelve (12)", b: "Doce" },
            { a: "Green", b: "Verde" },
            { a: "Twenty (20)", b: "Veinte" }
          ]
        },
        test: [
          {
            question: "What color is the sun? (¿De qué color es el sol?)",
            options: ["Blue", "Yellow", "Black", "Pink"],
            correct: 1,
            feedback: "Great job! The sun is yellow!"
          },
          {
            question: "What number comes after 'seven' (7)?",
            options: ["Six", "Eight", "Ten", "Five"],
            correct: 1,
            feedback: "Awesome! Seven, EIGHT, nine, ten!"
          },
          {
            question: "How do you say 'Azul' in English?",
            options: ["Red", "Green", "Blue", "Brown"],
            correct: 2,
            feedback: "Perfect! Blue is azul."
          },
          {
            question: "How many fingers do you have in two hands?",
            options: ["Five", "Ten", "Twenty", "Eight"],
            correct: 1,
            feedback: "Well done! Five plus five equals TEN (10) fingers."
          },
          {
            question: "What number is 'fifteen'?",
            options: ["5", "12", "15", "50"],
            correct: 2,
            feedback: "Super! Fifteen is el número 15."
          }
        ]
      },
      {
        id: "ing_2",
        title: "Animals & Pets (Los Animales)",
        icon: "🐶",
        explanation: {
          intro: "Do you love animals? Let's discover their English names! ¡Vamos a aprender los animales y mascotas en inglés!",
          sections: [
            {
              heading: "Pets (Mascotas en casa)",
              body: "• Dog: Perro 🐕\n• Cat: Gato 🐈\n• Rabbit: Conejo 🐇\n• Fish: Pez 🐠\n• Bird: Pájaro 🐦\n• Hamster: Hámster 🐹",
              visual: "Dog 🐶 | Cat 🐱 | Rabbit 🐰"
            },
            {
              heading: "Wild Animals (Animales salvajes)",
              body: "• Lion: León 🦁\n• Elephant: Elefante 🐘\n• Monkey: Mono 🐒\n• Tiger: Tigre 🐅\n• Crocodile: Cocodrilo 🐊\n• Dolphin: Delfín 🐬",
              visual: "Lion 🦁 | Elephant 🐘"
            }
          ],
          tip: "To say what you like: 'I like dogs' (Me gustan los perros) or 'I love cats' (Me encantan los gatos)."
        },
        minigame: {
          type: "bubble_hunter",
          instruction: "Haz clic en todas las palabras que son ANIMALES en inglés:",
          bubbles: [
            { text: "Elephant", correct: true },
            { text: "Table", correct: false },
            { text: "Rabbit", correct: true },
            { text: "Pencil", correct: false },
            { text: "Monkey", correct: true },
            { text: "Dolphin", correct: true },
            { text: "Chair", correct: false },
            { text: "Tiger", correct: true }
          ]
        },
        test: [
          {
            question: "How do you say 'Gato' in English?",
            options: ["Dog", "Cat", "Bird", "Horse"],
            correct: 1,
            feedback: "Excellent! Cat is gato."
          },
          {
            question: "Which of these animals can fly?",
            options: ["Fish", "Bird", "Elephant", "Turtle"],
            correct: 1,
            feedback: "Great! A bird has wings and flies in the sky."
          },
          {
            question: "What is a 'Rabbit'?",
            options: ["Un león", "Un conejo", "Un pato", "Una oveja"],
            correct: 1,
            feedback: "Good job! Rabbit es un simpático conejo."
          },
          {
            question: "Which animal is big and has a long trunk?",
            options: ["Mouse", "Cat", "Elephant", "Bee"],
            correct: 2,
            feedback: "Fantastic! The elephant has a long trunk."
          },
          {
            question: "'Dog' in Spanish means...",
            options: ["Gato", "Pájaro", "Perro", "Vaca"],
            correct: 2,
            feedback: "You're a star! Dog is perro."
          }
        ]
      },
      {
        id: "ing_3",
        title: "The Body & Face (El Cuerpo y la Cara)",
        icon: "👦",
        explanation: {
          intro: "Head, shoulders, knees and toes! ¡Vamos a aprender las partes del cuerpo y de la cara cantando y jugando!",
          sections: [
            {
              heading: "Parts of the Body",
              body: "• Head: Cabeza 🗣️\n• Arms: Brazos 💪\n• Hands: Manos ✋\n• Legs: Piernas 🦵\n• Feet / Foot: Pies / Pie 🦶\n• Knees: Rodillas",
              visual: "Head, Shoulders, Knees and Toes!"
            },
            {
              heading: "Parts of the Face (La cara)",
              body: "• Eyes: Ojos 👀\n• Ears: Orejas 👂\n• Nose: Nariz 👃\n• Mouth: Boca 👄\n• Hair: Pelo 💇",
              visual: "Eyes 👀 | Nose 👃 | Mouth 👄"
            }
          ],
          tip: "¡Truco! Un solo pie se dice 'one FOOT', pero dos pies se dicen 'two FEET'."
        },
        minigame: {
          type: "matching",
          instruction: "Match the body part with its Spanish name:",
          pairs: [
            { a: "Eyes", b: "Ojos 👀" },
            { a: "Hands", b: "Manos ✋" },
            { a: "Mouth", b: "Boca 👄" },
            { a: "Nose", b: "Nariz 👃" },
            { a: "Ears", b: "Orejas 👂" }
          ]
        },
        test: [
          {
            question: "What do you use to see? (¿Qué usas para ver?)",
            options: ["Ears", "Eyes", "Nose", "Knees"],
            correct: 1,
            feedback: "Correct! We see with our EYES."
          },
          {
            question: "How do you say 'Manos' in English?",
            options: ["Feet", "Arms", "Hands", "Legs"],
            correct: 2,
            feedback: "Great! Hands are manos."
          },
          {
            question: "What is on your head and can be blonde, brown or red?",
            options: ["Nose", "Hair", "Mouth", "Shoulder"],
            correct: 1,
            feedback: "Awesome! Hair is pelo."
          },
          {
            question: "What body part do you use to listen to music?",
            options: ["Ears", "Mouth", "Hands", "Eyes"],
            correct: 0,
            feedback: "Well done! We listen with our EARS."
          },
          {
            question: "In the famous song: 'Head, shoulders, ______ and toes'...",
            options: ["Apples", "Knees", "Pens", "Books"],
            correct: 1,
            feedback: "Super! 'Head, shoulders, KNEES and toes'!"
          }
        ]
      },
      {
        id: "ing_4",
        title: "School Supplies & Classroom (La Clase)",
        icon: "🎒",
        explanation: {
          intro: "Open your pencil case! ¿Qué llevas hoy en tu mochila del colegio?",
          sections: [
            {
              heading: "In My Backpack (En mi mochila)",
              body: "• Pencil: Lápiz ✏️\n• Pen: Bolígrafo 🖊️\n• Rubber / Eraser: Goma de borrar 🧼\n• Ruler: Regla 📏\n• Scissors: Tijeras ✂️\n• Glue: Pegamento 🧴\n• Book: Libro 📖\n• Notebook: Libreta / Cuaderno 📓\n• Schoolbag / Backpack: Mochila 🎒",
              visual: "Pencil ✏️ | Book 📖 | Backpack 🎒"
            }
          ],
          tip: "In class: 'Can I borrow a pencil, please?' significa '¿Me prestas un lápiz, por favor?'."
        },
        minigame: {
          type: "classification",
          instruction: "Classify each item: School Supply (Material Escolar) or NOT School Supply?",
          categories: [
            { id: "school", name: "School Supply 🎒" },
            { id: "notschool", name: "Not School Supply ❌" }
          ],
          items: [
            { id: "s1", text: "Pencil", category: "school" },
            { id: "s2", text: "Pizza", category: "notschool" },
            { id: "s3", text: "Ruler", category: "school" },
            { id: "s4", text: "Rubber", category: "school" },
            { id: "s5", text: "Bicycle", category: "notschool" },
            { id: "s6", text: "Notebook", category: "school" }
          ]
        },
        test: [
          {
            question: "What do you use to cut paper?",
            options: ["Pencil", "Scissors", "Book", "Ruler"],
            correct: 1,
            feedback: "Very good! Scissors are tijeras."
          },
          {
            question: "How do you say 'Libro' in English?",
            options: ["Pen", "Book", "Desk", "Bag"],
            correct: 1,
            feedback: "Correct! Book is libro."
          },
          {
            question: "What do you use when you make a mistake writing with a pencil?",
            options: ["Glue", "Rubber / Eraser", "Scissors", "Sharpener"],
            correct: 1,
            feedback: "Super! A rubber (or eraser) erases pencil marks."
          },
          {
            question: "Where do you put your books and pencil case to go to school?",
            options: ["In my bed", "In my backpack / schoolbag", "In the fridge", "Under the table"],
            correct: 1,
            feedback: "Exactly! In your backpack."
          },
          {
            question: "What is a 'Ruler' used for?",
            options: ["To draw straight lines and measure", "To eat soup", "To sleep", "To paint walls"],
            correct: 0,
            feedback: "Fantastic! A ruler measures and draws straight lines."
          }
        ]
      },
      {
        id: "ing_5",
        title: "Family & Daily Greetings (Familia y Saludos)",
        icon: "👨‍👩‍👧‍👦",
        explanation: {
          intro: "Family is very special! Let's learn how to introduce your family and say hello in English.",
          sections: [
            {
              heading: "My Family (Mi familia)",
              body: "• Mother / Mum: Madre / Mamá 👩\n• Father / Dad: Padre / Papá 👨\n• Brother: Hermano 👦\n• Sister: Hermana 👧\n• Baby: Bebé 👶\n• Grandmother / Grandma: Abuela 👵\n• Grandfather / Grandpa: Abuelo 👴",
              visual: "Mum, Dad, Brother, Sister, Baby"
            },
            {
              heading: "Daily Greetings (Saludos cotidianos)",
              body: "• Hello! / Hi!: ¡Hola!\n• Good morning: Buenos días ☀️\n• Good afternoon: Buenas tardes 🌤️\n• Good night: Buenas noches 🌙\n• Goodbye! / Bye-bye!: ¡Adiós!\n• How are you? - I am fine, thank you!: ¿Cómo estás? - ¡Estoy bien, gracias!",
              visual: "Hello! 👋 ➡️ Goodbye! 👋"
            }
          ],
          tip: "Polite magic words: 'Please' (por favor) and 'Thank you' (gracias)!"
        },
        minigame: {
          type: "matching",
          instruction: "Match each family member with the Spanish word:",
          pairs: [
            { a: "Mother / Mum", b: "Mamá 👩" },
            { a: "Father / Dad", b: "Papá 👨" },
            { a: "Grandfather", b: "Abuelo 👴" },
            { a: "Sister", b: "Hermana 👧" },
            { a: "Brother", b: "Hermano 👦" }
          ]
        },
        test: [
          {
            question: "How do you say 'Buenos días' in English?",
            options: ["Good night", "Good morning", "Goodbye", "Hello"],
            correct: 1,
            feedback: "Great! Good morning means buenos días!"
          },
          {
            question: "Who is your mother's father?",
            options: ["Your brother", "Your grandfather (grandpa)", "Your sister", "Your uncle"],
            correct: 1,
            feedback: "That's right! El padre de tu madre es tu Grandfather."
          },
          {
            question: "If someone asks 'How are you?', you can answer...",
            options: ["I am fine, thank you!", "My name is John", "I am 8 years old", "It is green"],
            correct: 0,
            feedback: "Perfect! 'I am fine, thank you!' (¡Estoy bien, gracias!)."
          },
          {
            question: "What is the polite English word for 'Por favor'?",
            options: ["Sorry", "Please", "Thanks", "Welcome"],
            correct: 1,
            feedback: "Excellent! Please is por favor."
          },
          {
            question: "How do you say 'Adiós' when leaving school?",
            options: ["Hello", "Good morning", "Goodbye!", "Yes"],
            correct: 2,
            feedback: "Super star! Goodbye or Bye-bye!"
          }
        ]
      }
    ]
  }
};
