/**
 * AVENTURA DEL SABER - 2º DE PRIMARIA
 * Motor principal del juego, lógica interactiva, gamificación y persistencia
 */

// Avatares disponibles para los niños
const AVATARS = [
  { id: "astronauta", name: "Astronauta Leo", emoji: "👨‍🚀", desc: "¡Explorador de galaxias del saber!" },
  { id: "superheroina", name: "Super Sofía", emoji: "🦸‍♀️", desc: "¡Poderes mágicos de aprendizaje!" },
  { id: "explorador", name: "Explorador Mateo", emoji: "🧭", desc: "¡Descubridor de secretos y misterios!" },
  { id: "maga", name: "Maga Luna", emoji: "🧙‍♀️", desc: "¡Hechicera de los números y las letras!" },
  { id: "robot", name: "Robot Bip-Bop", emoji: "🤖", desc: "¡Cerebro de ordenador ultrarrápido!" },
  { id: "dino", name: "Dino Sabio", emoji: "🦖", desc: "¡El dinosaurio más curioso de la Tierra!" }
];

// Mascotas en la tienda
const PETS_SHOP = [
  { id: "perrito", name: "Perrito Toby", emoji: "🐶", price: 30, desc: "Siempre fiel y juguetón" },
  { id: "gatito", name: "Gatito Bigotes", emoji: "🐱", price: 30, desc: "Ronronea cuando aciertas" },
  { id: "dragon", name: "Dragón Chispa", emoji: "🐲", price: 60, desc: "¡Lanza chispas de felicidad!" },
  { id: "unicornio", name: "Unicornio Estelar", emoji: "🦄", price: 80, desc: "Mágico y lleno de luz" },
  { id: "fenix", name: "Fénix Dorado", emoji: "🦅", price: 100, desc: "El guardián legendario" }
];

class AventuraApp {
  constructor() {
    this.state = this.loadState();
    this.currentSubject = null;
    this.currentTopic = null;
    this.activeScreen = "home";
    this.testState = null;
    this.minigameState = null;

    this.initConfetti();
    this.bindEvents();
    this.render();
  }

  // Carga el progreso del jugador desde localStorage
  loadState() {
    const defaultState = {
      name: "Super Estudiante",
      avatar: "astronauta",
      pet: null,
      coins: 0,
      xp: 0,
      completedTopics: {}, // topicId -> { stars: 3, bestScore: 5 }
      unlockedPets: [],
      badges: []
    };

    try {
      const saved = localStorage.getItem("aventura_primaria_save");
      if (saved) {
        return { ...defaultState, ...JSON.parse(saved) };
      }
    } catch (e) {
      console.warn("No se pudo cargar localStorage:", e);
    }
    return defaultState;
  }

  saveState() {
    try {
      localStorage.setItem("aventura_primaria_save", JSON.stringify(this.state));
    } catch (e) {
      console.warn("No se pudo guardar en localStorage:", e);
    }
    this.updateHeaderStats();
  }

  // Motor de lectura por voz accesible para niños
  speakText(text, lang = "es-ES") {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel(); // Detener lecturas anteriores

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = 0.95; // Ritmo un poquito más calmado y claro para niños
    utterance.pitch = 1.1; // Tono alegre y cálido

    // Intentar buscar una voz española o inglesa natural si está disponible
    const voices = window.speechSynthesis.getVoices();
    const matchedVoice = voices.find(v => v.lang.startsWith(lang.slice(0, 2)));
    if (matchedVoice) {
      utterance.voice = matchedVoice;
    }

    window.speechSynthesis.speak(utterance);
  }

  // Nivel del jugador basado en la experiencia (XP)
  getLevel() {
    return Math.floor(this.state.xp / 100) + 1;
  }

  getLevelTitle() {
    const lvl = this.getLevel();
    if (lvl < 3) return "Novato Curioso 🌱";
    if (lvl < 6) return "Explorador Activo 🧭";
    if (lvl < 10) return "Sabio de Primaria ⭐";
    if (lvl < 15) return "Maestro del Saber 🎓";
    return "Gran Campeón Supremo 👑";
  }

  // Añadir recompensas
  addReward(coinsEarned, xpEarned) {
    const oldLevel = this.getLevel();
    this.state.coins += coinsEarned;
    this.state.xp += xpEarned;
    const newLevel = this.getLevel();

    sounds.coin();
    this.saveState();

    if (newLevel > oldLevel) {
      setTimeout(() => {
        sounds.levelUp();
        this.triggerConfetti();
        this.showToast(`¡ENHORABUENA! ¡Has subido al Nivel ${newLevel}: ${this.getLevelTitle()}! 🎉`, "success");
      }, 700);
    }
  }

  // Notificaciones Toast estilo infantil
  showToast(msg, type = "info") {
    const container = document.getElementById("toast-container");
    if (!container) return;

    const toast = document.createElement("div");
    toast.className = `p-4 rounded-2xl shadow-xl text-white font-bold flex items-center gap-3 animate-pop z-50 text-base md:text-lg ${
      type === "success" ? "bg-emerald-500" : type === "error" ? "bg-rose-500" : "bg-indigo-600"
    }`;
    toast.innerHTML = `<span>🔔</span> <span>${msg}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transform = "translateY(-10px)";
      toast.style.transition = "all 0.3s ease";
      setTimeout(() => toast.remove(), 300);
    }, 3500);
  }

  // Inicialización del Confeti
  initConfetti() {
    this.canvas = document.getElementById("confetti-canvas");
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext("2d");
    this.confettiParticles = [];
    this.resizeCanvas();
    window.addEventListener("resize", () => this.resizeCanvas());
  }

  resizeCanvas() {
    if (!this.canvas) return;
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  triggerConfetti() {
    if (!this.canvas) return;
    const colors = ["#f43f5e", "#8b5cf6", "#3b82f6", "#10b981", "#f59e0b", "#ec4899", "#06b6d4"];
    for (let i = 0; i < 90; i++) {
      this.confettiParticles.push({
        x: window.innerWidth / 2 + (Math.random() - 0.5) * 200,
        y: window.innerHeight / 2,
        r: 6 + Math.random() * 8,
        color: colors[Math.floor(Math.random() * colors.length)],
        vx: (Math.random() - 0.5) * 16,
        vy: -10 - Math.random() * 12,
        gravity: 0.45,
        rotation: Math.random() * 360,
        rotSpeed: (Math.random() - 0.5) * 10,
        opacity: 1
      });
    }
    if (!this.animatingConfetti) {
      this.animatingConfetti = true;
      this.loopConfetti();
    }
  }

  loopConfetti() {
    if (!this.ctx) return;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for (let i = this.confettiParticles.length - 1; i >= 0; i--) {
      const p = this.confettiParticles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vy += p.gravity;
      p.rotation += p.rotSpeed;
      p.opacity -= 0.008;

      if (p.opacity <= 0 || p.y > this.canvas.height) {
        this.confettiParticles.splice(i, 1);
        continue;
      }

      this.ctx.save();
      this.ctx.translate(p.x, p.y);
      this.ctx.rotate((p.rotation * Math.PI) / 180);
      this.ctx.globalAlpha = p.opacity;
      this.ctx.fillStyle = p.color;
      this.ctx.fillRect(-p.r / 2, -p.r / 2, p.r, p.r * 1.5);
      this.ctx.restore();
    }

    if (this.confettiParticles.length > 0) {
      requestAnimationFrame(() => this.loopConfetti());
    } else {
      this.animatingConfetti = false;
    }
  }

  bindEvents() {
    // Sonido mute toggle
    const muteBtn = document.getElementById("mute-toggle-btn");
    if (muteBtn) {
      muteBtn.addEventListener("click", () => {
        const isMuted = sounds.toggleMute();
        muteBtn.textContent = isMuted ? "🔇" : "🔊";
      });
    }
  }

  updateHeaderStats() {
    const nameEl = document.getElementById("player-name-display");
    const avatarEl = document.getElementById("player-avatar-display");
    const coinsEl = document.getElementById("player-coins-display");
    const levelEl = document.getElementById("player-level-badge");
    const petEl = document.getElementById("player-pet-display");

    if (nameEl) nameEl.textContent = this.state.name;
    if (avatarEl) {
      const avObj = AVATARS.find(a => a.id === this.state.avatar) || AVATARS[0];
      avatarEl.textContent = avObj.emoji;
    }
    if (coinsEl) coinsEl.textContent = this.state.coins;
    if (levelEl) levelEl.textContent = `Nivel ${this.getLevel()} • ${this.getLevelTitle()}`;
    if (petEl) {
      if (this.state.pet) {
        const petObj = PETS_SHOP.find(p => p.id === this.state.pet);
        petEl.textContent = petObj ? petObj.emoji : "";
        petEl.classList.remove("hidden");
      } else {
        petEl.classList.add("hidden");
      }
    }
  }

  // Navegación entre pantallas
  navigateTo(screen, params = {}) {
    sounds.click();
    this.activeScreen = screen;
    if (params.subject) this.currentSubject = params.subject;
    if (params.topic) this.currentTopic = params.topic;

    window.scrollTo({ top: 0, behavior: "smooth" });
    this.render();
  }

  render() {
    this.updateHeaderStats();
    const appEl = document.getElementById("main-app-container");
    if (!appEl) return;

    switch (this.activeScreen) {
      case "home":
        this.renderHome(appEl);
        break;
      case "profile":
        this.renderProfile(appEl);
        break;
      case "subject_hub":
        this.renderSubjectHub(appEl);
        break;
      case "explanation":
        this.renderExplanation(appEl);
        break;
      case "minigame":
        this.renderMinigame(appEl);
        break;
      case "test":
        this.renderTest(appEl);
        break;
      case "medals":
        this.renderMedals(appEl);
        break;
      case "shop":
        this.renderShop(appEl);
        break;
      case "diploma":
        this.renderDiploma(appEl);
        break;
      default:
        this.renderHome(appEl);
    }
  }

  /* ========================================================
     PANTALLA DE INICIO (HOME / SELECTOR DE ASIGNATURAS)
     ======================================================== */
  renderHome(container) {
    const subjects = Object.values(CURRICULUM_DATA);
    let totalCompleted = Object.keys(this.state.completedTopics).length;
    let totalTopics = 25; // 5 materias * 5 temas
    let totalStars = Object.values(this.state.completedTopics).reduce((acc, t) => acc + (t.stars || 0), 0);

    let html = `
      <div class="space-y-8 animate-pop">
        <!-- Banner de Bienvenida -->
        <div class="relative overflow-hidden rounded-3xl p-6 md:p-8 bg-gradient-to-r from-amber-400 via-pink-500 to-indigo-600 text-white shadow-xl">
          <div class="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div class="text-center md:text-left space-y-2">
              <div class="inline-flex items-center gap-2 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-sm font-bold">
                <span>🌟 2º de Educación Primaria</span>
                <span>•</span>
                <span>Temario Oficial LOMLOE</span>
              </div>
              <h1 class="text-3xl md:text-5xl font-black tracking-tight">¡Hola, ${this.state.name}!</h1>
              <p class="text-base md:text-lg text-white/90 max-w-xl">
                ¿Qué súper materia quieres explorar hoy? Aprende las explicaciones mágicas, supera los minijuegos y gana estrellas y trofeos.
              </p>
              <div class="pt-2 flex flex-wrap gap-3 justify-center md:justify-start">
                <button onclick="app.speakText('¡Hola ${this.state.name}! Elige una asignatura para comenzar a jugar y aprender')" class="btn-bubble bg-white/30 hover:bg-white/40 text-white px-4 py-2 rounded-2xl text-sm">
                  🔊 Escuchar bienvenida
                </button>
                <button onclick="app.navigateTo('diploma')" class="btn-bubble bg-yellow-300 hover:bg-yellow-400 text-yellow-950 px-4 py-2 rounded-2xl text-sm font-extrabold shadow-lg">
                  📜 Ver mi Diploma Oficial
                </button>
              </div>
            </div>

            <!-- Avatar Gigante -->
            <div class="flex flex-col items-center">
              <div class="w-28 h-28 md:w-36 md:h-36 bg-white/25 rounded-3xl flex items-center justify-center text-6xl md:text-7xl shadow-2xl animate-float border-4 border-white/40">
                ${(AVATARS.find(a => a.id === this.state.avatar) || AVATARS[0]).emoji}
              </div>
              <button onclick="app.navigateTo('profile')" class="mt-3 text-xs bg-white text-indigo-700 font-black px-3 py-1.5 rounded-full shadow hover:bg-indigo-50">
                ✏️ Cambiar Avatar
              </button>
            </div>
          </div>

          <!-- Barra de Progreso Global -->
          <div class="mt-6 pt-5 border-t border-white/20 grid grid-cols-2 sm:grid-cols-3 gap-4 text-center">
            <div class="bg-black/10 rounded-2xl p-3">
              <span class="text-xs uppercase tracking-wider text-white/80 font-bold">Temas Superados</span>
              <p class="text-2xl md:text-3xl font-black">${totalCompleted} / ${totalTopics}</p>
            </div>
            <div class="bg-black/10 rounded-2xl p-3">
              <span class="text-xs uppercase tracking-wider text-white/80 font-bold">Estrellas del Saber</span>
              <p class="text-2xl md:text-3xl font-black text-yellow-300">⭐ ${totalStars}</p>
            </div>
            <div class="bg-black/10 rounded-2xl p-3 col-span-2 sm:col-span-1">
              <span class="text-xs uppercase tracking-wider text-white/80 font-bold">Monedas Ganadas</span>
              <p class="text-2xl md:text-3xl font-black text-amber-200">🪙 ${this.state.coins}</p>
            </div>
          </div>
        </div>

        <!-- Título de Selección -->
        <div class="text-center md:text-left">
          <h2 class="text-2xl md:text-3xl font-black text-slate-800 flex items-center justify-center md:justify-start gap-3">
            <span>🗺️</span> Elige tu Asignatura
          </h2>
          <p class="text-slate-600 text-sm md:text-base">Selecciona un mundo para desbloquear sus 5 temas explicados y minijuegos:</p>
        </div>

        <!-- Cuadrícula de Asignaturas -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    `;

    subjects.forEach(sub => {
      // Contar progreso por materia
      let subCompleted = sub.topics.filter(t => this.state.completedTopics[t.id]?.completed).length;
      let pct = Math.round((subCompleted / sub.topics.length) * 100);

      html += `
        <div onclick="app.navigateTo('subject_hub', { subject: '${sub.id}' })"
             class="card-game p-6 hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2 border-t-8 flex flex-col justify-between"
             style="border-top-color: ${sub.accentColor};">
          <div class="space-y-4">
            <div class="flex items-center justify-between">
              <span class="text-5xl p-3 rounded-2xl bg-slate-50 border border-slate-100 shadow-sm">${sub.icon}</span>
              <span class="text-xs font-bold px-3 py-1.5 rounded-full text-white" style="background-color: ${sub.accentColor}">
                ${subCompleted}/${sub.topics.length} superados
              </span>
            </div>
            <div>
              <h3 class="text-xl md:text-2xl font-black text-slate-800">${sub.title}</h3>
              <p class="text-xs md:text-sm text-slate-600 mt-1">${sub.description}</p>
            </div>
          </div>

          <div class="mt-6 pt-4 border-t border-slate-100">
            <div class="flex justify-between items-center text-xs font-bold text-slate-500 mb-1">
              <span>Progreso</span>
              <span>${pct}%</span>
            </div>
            <div class="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
              <div class="h-full rounded-full transition-all duration-500" style="width: ${pct}%; background-color: ${sub.accentColor};"></div>
            </div>
            <button class="w-full mt-4 btn-bubble text-white py-2.5 rounded-xl font-bold text-sm shadow" style="background-color: ${sub.accentColor}">
              ¡Entrar a Explorar! 🚀
            </button>
          </div>
        </div>
      `;
    });

    html += `
        </div>
      </div>
    `;

    container.innerHTML = html;
  }

  /* ========================================================
     PANTALLA DE HUB DE ASIGNATURA (5 TEMAS)
     ======================================================== */
  renderSubjectHub(container) {
    const sub = CURRICULUM_DATA[this.currentSubject];
    if (!sub) return this.navigateTo("home");

    let html = `
      <div class="space-y-6 animate-pop">
        <!-- Barra de navegación superior -->
        <div class="flex items-center justify-between">
          <button onclick="app.navigateTo('home')" class="btn-bubble bg-white text-slate-700 px-4 py-2 rounded-2xl text-sm font-bold shadow border border-slate-200">
            ⬅️ Volver a Asignaturas
          </button>
          <div class="flex items-center gap-2">
            <span class="text-2xl">${sub.icon}</span>
            <span class="font-extrabold text-slate-800 text-lg hidden sm:inline">${sub.title}</span>
          </div>
        </div>

        <!-- Cabecera de la Asignatura -->
        <div class="rounded-3xl p-6 md:p-8 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6"
             style="background: linear-gradient(135deg, ${sub.accentColor}, #4f46e5);">
          <div class="space-y-2 text-center md:text-left">
            <span class="px-3 py-1 bg-white/20 backdrop-blur rounded-full text-xs font-bold">2º Primaria</span>
            <h1 class="text-3xl md:text-4xl font-black">${sub.title}</h1>
            <p class="text-white/90 text-sm md:text-base max-w-xl">${sub.description}</p>
          </div>
          <div class="text-6xl p-4 bg-white/20 rounded-3xl backdrop-blur-md">
            ${sub.icon}
          </div>
        </div>

        <!-- Lista de los 5 Temas -->
        <div class="space-y-4">
          <h2 class="text-xl md:text-2xl font-black text-slate-800">Temas de Aprendizaje Oficiales:</h2>
    `;

    sub.topics.forEach((topic, idx) => {
      const topicProgress = this.state.completedTopics[topic.id] || { completed: false, stars: 0 };
      const starsDisplay = "⭐".repeat(topicProgress.stars) + "☆".repeat(3 - topicProgress.stars);

      html += `
        <div class="card-game p-5 md:p-6 transition-all hover:border-slate-300">
          <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <!-- Título del Tema -->
            <div class="flex items-start gap-4">
              <div class="w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center text-3xl bg-slate-100 flex-shrink-0">
                ${topic.icon}
              </div>
              <div>
                <div class="flex items-center gap-2">
                  <span class="text-xs font-bold text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-full">Tema ${idx + 1}</span>
                  ${topicProgress.completed ? '<span class="text-xs font-extrabold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">¡Completado! ✅</span>' : ''}
                </div>
                <h3 class="text-lg md:text-xl font-black text-slate-800 mt-1">${topic.title}</h3>
                <div class="text-yellow-500 font-bold text-sm mt-1">
                  ${starsDisplay} <span class="text-slate-400 font-normal text-xs">(${topicProgress.stars}/3 estrellas)</span>
                </div>
              </div>
            </div>

            <!-- Botones de Acción (3 Puertas: Aprende, Juega, Test) -->
            <div class="flex flex-wrap items-center gap-2 md:justify-end">
              <button onclick="app.navigateTo('explanation', { subject: '${sub.id}', topic: '${topic.id}' })"
                      class="btn-bubble bg-indigo-50 hover:bg-indigo-100 text-indigo-700 px-3.5 py-2 rounded-xl text-xs md:text-sm font-bold border border-indigo-200">
                📖 Explicación
              </button>
              <button onclick="app.navigateTo('minigame', { subject: '${sub.id}', topic: '${topic.id}' })"
                      class="btn-bubble bg-amber-400 hover:bg-amber-500 text-amber-950 px-3.5 py-2 rounded-xl text-xs md:text-sm font-bold shadow">
                🎮 Minijuego
              </button>
              <button onclick="app.navigateTo('test', { subject: '${sub.id}', topic: '${topic.id}' })"
                      class="btn-bubble bg-emerald-500 hover:bg-emerald-600 text-white px-3.5 py-2 rounded-xl text-xs md:text-sm font-bold shadow">
                📝 Super Test
              </button>
            </div>
          </div>
        </div>
      `;
    });

    html += `
        </div>
      </div>
    `;

    container.innerHTML = html;
  }

  /* ========================================================
     PANTALLA DE EXPLICACIÓN (TEORÍA Y EJEMPLOS VISUALES)
     ======================================================== */
  renderExplanation(container) {
    const sub = CURRICULUM_DATA[this.currentSubject];
    const topic = sub?.topics.find(t => t.id === this.currentTopic);
    if (!topic) return this.navigateTo("subject_hub", { subject: this.currentSubject });

    const exp = topic.explanation;
    const isEnglish = this.currentSubject === "ingles";
    const langCode = isEnglish ? "en-GB" : "es-ES";

    let html = `
      <div class="space-y-6 animate-pop max-w-4xl mx-auto">
        <!-- Navegación -->
        <div class="flex items-center justify-between">
          <button onclick="app.navigateTo('subject_hub', { subject: '${sub.id}' })" class="btn-bubble bg-white text-slate-700 px-4 py-2 rounded-2xl text-sm font-bold shadow border border-slate-200">
            ⬅️ Volver a Temas
          </button>
          <div class="flex items-center gap-2">
            <button onclick="app.speakText('${exp.intro.replace(/'/g, "\\'")}', '${langCode}')" class="speak-btn shadow" title="Escuchar en voz alta">
              🔊
            </button>
            <span class="text-xs font-bold text-slate-500 bg-white px-3 py-1 rounded-full shadow-sm">Modo Lectura Guiada</span>
          </div>
        </div>

        <!-- Cabecera del Tema -->
        <div class="card-game p-6 md:p-8 bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-xl">
          <div class="flex items-center gap-4">
            <span class="text-5xl md:text-6xl p-3 bg-white/20 rounded-2xl backdrop-blur-md">${topic.icon}</span>
            <div>
              <span class="text-xs font-bold uppercase tracking-wider text-white/80">${sub.shortTitle}</span>
              <h1 class="text-2xl md:text-4xl font-black">${topic.title}</h1>
              <p class="text-white/90 text-sm md:text-base mt-2">${exp.intro}</p>
            </div>
          </div>
        </div>

        <!-- Secciones de Teoría Explicada -->
        <div class="space-y-4">
    `;

    exp.sections.forEach((sec, idx) => {
      const cleanBody = sec.body.replace(/\n/g, "<br>");
      html += `
        <div class="card-game p-6 space-y-3">
          <div class="flex items-center justify-between">
            <h3 class="text-lg md:text-xl font-black text-slate-800 flex items-center gap-2">
              <span class="w-7 h-7 rounded-full bg-indigo-100 text-indigo-700 text-sm flex items-center justify-center font-bold">${idx + 1}</span>
              ${sec.heading}
            </h3>
            <button onclick="app.speakText('${sec.body.replace(/'/g, "\\'").replace(/\n/g, " ")}', '${langCode}')" class="speak-btn" title="Leer esta sección">
              🔊
            </button>
          </div>
          <div class="text-slate-700 text-base md:text-lg leading-relaxed">
            ${cleanBody}
          </div>
          ${sec.visual ? `
            <div class="mt-4 p-4 rounded-2xl bg-amber-50 border-2 border-amber-200 text-amber-900 font-extrabold text-center text-lg shadow-inner">
              💡 ${sec.visual}
            </div>
          ` : ''}
        </div>
      `;
    });

    if (exp.tip) {
      html += `
        <div class="p-6 rounded-3xl bg-emerald-50 border-3 border-emerald-300 text-emerald-900 shadow-md flex items-start gap-4">
          <span class="text-4xl">🌟</span>
          <div class="space-y-1">
            <h4 class="font-black text-lg">¡Consejo de Oro!</h4>
            <p class="text-base text-emerald-800">${exp.tip}</p>
          </div>
        </div>
      `;
    }

    html += `
        </div>

        <!-- Botones de Acción al terminar de leer -->
        <div class="card-game p-6 flex flex-col sm:flex-row items-center justify-between gap-4 bg-gradient-to-r from-amber-100 to-yellow-50 border-2 border-yellow-300">
          <div>
            <h4 class="font-black text-slate-800 text-lg">¿Lo has entendido bien?</h4>
            <p class="text-slate-600 text-sm">¡Pon a prueba tu habilidad con el minijuego o el test final!</p>
          </div>
          <div class="flex items-center gap-3 w-full sm:w-auto">
            <button onclick="app.navigateTo('minigame', { subject: '${sub.id}', topic: '${topic.id}' })"
                    class="btn-bubble bg-amber-500 hover:bg-amber-600 text-white px-5 py-3 rounded-2xl font-bold shadow text-base flex-1 sm:flex-initial">
              🎮 Jugar Minijuego
            </button>
            <button onclick="app.navigateTo('test', { subject: '${sub.id}', topic: '${topic.id}' })"
                    class="btn-bubble bg-emerald-500 hover:bg-emerald-600 text-white px-5 py-3 rounded-2xl font-bold shadow text-base flex-1 sm:flex-initial">
              📝 Hacer el Test
            </button>
          </div>
        </div>
      </div>
    `;

    container.innerHTML = html;
  }

  /* ========================================================
     PANTALLA DE MINIJUEGOS (MECÁNICAS LÚDICAS Y DINÁMICAS)
     ======================================================== */
  renderMinigame(container) {
    const sub = CURRICULUM_DATA[this.currentSubject];
    const topic = sub?.topics.find(t => t.id === this.currentTopic);
    if (!topic || !topic.minigame) return this.navigateTo("subject_hub", { subject: this.currentSubject });

    const mg = topic.minigame;
    this.minigameState = {
      type: mg.type,
      topicId: topic.id,
      completed: false,
      score: 0
    };

    let html = `
      <div class="space-y-6 animate-pop max-w-4xl mx-auto">
        <!-- Barra de navegación -->
        <div class="flex items-center justify-between">
          <button onclick="app.navigateTo('subject_hub', { subject: '${sub.id}' })" class="btn-bubble bg-white text-slate-700 px-4 py-2 rounded-2xl text-sm font-bold shadow border border-slate-200">
            ⬅️ Salir del Juego
          </button>
          <div class="flex items-center gap-2">
            <span class="text-2xl">${topic.icon}</span>
            <span class="font-extrabold text-slate-800 text-sm hidden sm:inline">${topic.title}</span>
          </div>
        </div>

        <!-- Cabecera del Minijuego -->
        <div class="card-game p-6 bg-gradient-to-r from-amber-400 to-orange-500 text-white shadow-xl flex items-center justify-between">
          <div>
            <div class="inline-flex items-center gap-1.5 px-3 py-1 bg-white/20 rounded-full text-xs font-bold">
              <span>🎮 Minijuego Interactivo</span>
            </div>
            <h1 class="text-2xl md:text-3xl font-black mt-1">${topic.title}</h1>
            <p class="text-white/95 text-base mt-1">${mg.instruction}</p>
          </div>
          <button onclick="app.speakText('${mg.instruction.replace(/'/g, "\\'")}')" class="speak-btn bg-white/25 text-white hover:bg-white/40" title="Escuchar instrucción">
            🔊
          </button>
        </div>

        <!-- Contenedor del Juego según el Tipo -->
        <div id="minigame-play-area" class="card-game p-6 md:p-8 space-y-6">
    `;

    // Renderizar según mecánica
    if (mg.type === "classification") {
      html += this.renderClassificationGame(mg);
    } else if (mg.type === "matching") {
      html += this.renderMatchingGame(mg);
    } else if (mg.type === "bubble_hunter") {
      html += this.renderBubbleHunterGame(mg);
    } else if (mg.type === "sorting") {
      html += this.renderSortingGame(mg);
    }

    html += `
        </div>
      </div>
    `;

    container.innerHTML = html;
  }

  // 1. Minijuego: Clasificación
  renderClassificationGame(mg) {
    this.minigameState.itemsLeft = [...mg.items];
    this.minigameState.totalItems = mg.items.length;
    this.minigameState.selectedItem = null;

    let html = `
      <div class="space-y-6">
        <!-- Ítems pendientes de clasificar -->
        <div>
          <h4 class="text-sm font-bold text-slate-500 uppercase tracking-wider mb-3">1. Toca o haz clic en un elemento:</h4>
          <div id="classification-items" class="flex flex-wrap gap-3">
    `;

    mg.items.forEach(item => {
      html += `
        <button id="class-item-${item.id}"
                onclick="app.selectClassItem('${item.id}', '${item.category}')"
                class="btn-bubble bg-white border-2 border-indigo-200 text-indigo-900 px-4 py-3 rounded-2xl font-extrabold text-base md:text-lg shadow-sm hover:border-indigo-500">
          ${item.text}
        </button>
      `;
    });

    html += `
          </div>
        </div>

        <!-- Cajas / Categorías destino -->
        <div>
          <h4 class="text-sm font-bold text-slate-500 uppercase tracking-wider mb-3">2. Ahora mételo en su caja correspondiente:</h4>
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
    `;

    mg.categories.forEach(cat => {
      html += `
        <div id="class-cat-${cat.id}"
             onclick="app.placeClassItem('${cat.id}')"
             class="border-3 border-dashed border-slate-300 hover:border-indigo-500 hover:bg-indigo-50/50 rounded-3xl p-5 text-center transition-all cursor-pointer min-h-[140px] flex flex-col justify-between">
          <h5 class="font-black text-slate-800 text-lg">${cat.name}</h5>
          <div id="cat-box-${cat.id}" class="flex flex-wrap gap-2 justify-center mt-3"></div>
          <span class="text-xs text-slate-400 mt-2 font-bold">Toca aquí para colocar</span>
        </div>
      `;
    });

    html += `
          </div>
        </div>
      </div>
    `;
    return html;
  }

  selectClassItem(itemId, itemCategory) {
    sounds.click();
    // Desmarcar anteriores
    document.querySelectorAll("#classification-items button").forEach(b => {
      b.classList.remove("ring-4", "ring-indigo-500", "bg-indigo-100");
    });

    const btn = document.getElementById(`class-item-${itemId}`);
    if (btn) {
      btn.classList.add("ring-4", "ring-indigo-500", "bg-indigo-100");
      this.minigameState.selectedItem = { id: itemId, category: itemCategory, text: btn.textContent.trim() };
    }
  }

  placeClassItem(catId) {
    const sel = this.minigameState.selectedItem;
    if (!sel) {
      sounds.wrong();
      this.showToast("Primero toca un elemento de arriba y luego toca la caja", "info");
      return;
    }

    if (sel.category === catId) {
      // ¡Acierto!
      sounds.correct();
      const itemBtn = document.getElementById(`class-item-${sel.id}`);
      if (itemBtn) itemBtn.remove();

      const catBox = document.getElementById(`cat-box-${catId}`);
      if (catBox) {
        const badge = document.createElement("span");
        badge.className = "bg-emerald-100 text-emerald-800 font-bold px-3 py-1.5 rounded-xl text-sm border border-emerald-300 animate-pop shadow-sm";
        badge.textContent = sel.text;
        catBox.appendChild(badge);
      }

      this.minigameState.itemsLeft = this.minigameState.itemsLeft.filter(i => i.id !== sel.id);
      this.minigameState.selectedItem = null;

      if (this.minigameState.itemsLeft.length === 0) {
        this.finishMinigame();
      }
    } else {
      // Error
      sounds.wrong();
      this.showToast("¡Vaya! Ese elemento no va en esa caja. ¡Prueba en otra!", "error");
    }
  }

  // 2. Minijuego: Emparejar (Matching)
  renderMatchingGame(mg) {
    this.minigameState.pairsLeft = mg.pairs.length;
    this.minigameState.selectedPairA = null;
    this.minigameState.selectedPairB = null;

    // Desordenar columna B
    const shuffledB = [...mg.pairs].sort(() => Math.random() - 0.5);

    let html = `
      <div class="space-y-4">
        <p class="text-sm text-slate-500 font-bold">Selecciona una tarjeta de la izquierda y luego su pareja en la derecha:</p>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Columna A -->
          <div class="space-y-3">
            <h4 class="font-extrabold text-slate-700 text-center">Columna A</h4>
    `;

    mg.pairs.forEach((p, idx) => {
      html += `
        <button id="match-a-${idx}" onclick="app.selectMatchA(${idx}, '${p.b.replace(/'/g, "\\'")}')"
                class="w-full text-left btn-bubble bg-white border-2 border-slate-200 text-slate-800 p-4 rounded-2xl font-black text-base md:text-lg shadow-sm hover:border-indigo-400">
          ${p.a}
        </button>
      `;
    });

    html += `
          </div>
          <!-- Columna B -->
          <div class="space-y-3">
            <h4 class="font-extrabold text-slate-700 text-center">Columna B</h4>
    `;

    shuffledB.forEach((p, idx) => {
      html += `
        <button id="match-b-${idx}" onclick="app.selectMatchB(${idx}, '${p.b.replace(/'/g, "\\'")}')"
                class="w-full text-left btn-bubble bg-white border-2 border-slate-200 text-slate-800 p-4 rounded-2xl font-black text-base md:text-lg shadow-sm hover:border-indigo-400">
          ${p.b}
        </button>
      `;
    });

    html += `
          </div>
        </div>
      </div>
    `;
    return html;
  }

  selectMatchA(idx, targetB) {
    sounds.click();
    document.querySelectorAll('[id^="match-a-"]').forEach(b => b.classList.remove("ring-4", "ring-indigo-500", "bg-indigo-50"));
    const btn = document.getElementById(`match-a-${idx}`);
    btn.classList.add("ring-4", "ring-indigo-500", "bg-indigo-50");
    this.minigameState.selectedPairA = { idx, targetB, btn };
    this.checkMatch();
  }

  selectMatchB(idx, valueB) {
    sounds.click();
    document.querySelectorAll('[id^="match-b-"]').forEach(b => b.classList.remove("ring-4", "ring-indigo-500", "bg-indigo-50"));
    const btn = document.getElementById(`match-b-${idx}`);
    btn.classList.add("ring-4", "ring-indigo-500", "bg-indigo-50");
    this.minigameState.selectedPairB = { idx, valueB, btn };
    this.checkMatch();
  }

  checkMatch() {
    const { selectedPairA, selectedPairB } = this.minigameState;
    if (selectedPairA && selectedPairB) {
      if (selectedPairA.targetB === selectedPairB.valueB) {
        // ¡Pareja correcta!
        sounds.correct();
        selectedPairA.btn.classList.remove("ring-4", "ring-indigo-500", "bg-indigo-50");
        selectedPairA.btn.classList.add("bg-emerald-100", "border-emerald-500", "text-emerald-900", "pointer-events-none");
        selectedPairA.btn.innerHTML += " ✅";

        selectedPairB.btn.classList.remove("ring-4", "ring-indigo-500", "bg-indigo-50");
        selectedPairB.btn.classList.add("bg-emerald-100", "border-emerald-500", "text-emerald-900", "pointer-events-none");
        selectedPairB.btn.innerHTML += " ✅";

        this.minigameState.selectedPairA = null;
        this.minigameState.selectedPairB = null;
        this.minigameState.pairsLeft--;

        if (this.minigameState.pairsLeft === 0) {
          this.finishMinigame();
        }
      } else {
        // Error
        sounds.wrong();
        selectedPairA.btn.classList.add("bg-rose-100", "border-rose-400");
        selectedPairB.btn.classList.add("bg-rose-100", "border-rose-400");

        setTimeout(() => {
          selectedPairA.btn.classList.remove("ring-4", "ring-indigo-500", "bg-indigo-50", "bg-rose-100", "border-rose-400");
          selectedPairB.btn.classList.remove("ring-4", "ring-indigo-500", "bg-indigo-50", "bg-rose-100", "border-rose-400");
          this.minigameState.selectedPairA = null;
          this.minigameState.selectedPairB = null;
        }, 600);
      }
    }
  }

  // 3. Minijuego: Cazador de Burbujas (Bubble Hunter)
  renderBubbleHunterGame(mg) {
    this.minigameState.correctNeeded = mg.bubbles.filter(b => b.correct).length;
    this.minigameState.correctFound = 0;

    let html = `
      <div class="space-y-6 text-center">
        <p class="text-slate-600 font-bold">Haz clic o toca solo en las burbujas verdaderas o correctas:</p>
        <div class="flex flex-wrap gap-4 justify-center py-4">
    `;

    mg.bubbles.forEach((b, idx) => {
      html += `
        <button id="bubble-${idx}" onclick="app.clickBubble(${idx}, ${b.correct})"
                class="bubble-btn px-6 py-4 text-slate-800 font-extrabold text-lg md:text-xl transform hover:scale-110">
          ${b.text}
        </button>
      `;
    });

    html += `
        </div>
      </div>
    `;
    return html;
  }

  clickBubble(idx, isCorrect) {
    const btn = document.getElementById(`bubble-${idx}`);
    if (!btn || btn.classList.contains("selected-correct")) return;

    if (isCorrect) {
      sounds.pop();
      sounds.correct();
      btn.classList.add("selected-correct");
      this.minigameState.correctFound++;

      if (this.minigameState.correctFound >= this.minigameState.correctNeeded) {
        this.finishMinigame();
      }
    } else {
      sounds.wrong();
      btn.classList.add("selected-wrong");
      setTimeout(() => btn.classList.remove("selected-wrong"), 500);
    }
  }

  // 4. Minijuego: Ordenar elementos (Sorting)
  renderSortingGame(mg) {
    this.minigameState.currentStep = 1;
    this.minigameState.totalSteps = mg.items.length;
    // Mezclamos los elementos
    const shuffled = [...mg.items].sort(() => Math.random() - 0.5);

    let html = `
      <div class="space-y-6">
        <div class="bg-indigo-50 border-2 border-indigo-200 p-4 rounded-2xl flex items-center justify-between">
          <span class="font-black text-indigo-900 text-lg">Debes buscar el elemento:</span>
          <span id="current-step-indicator" class="text-xl font-black bg-indigo-600 text-white px-4 py-1.5 rounded-full">Paso 1</span>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
    `;

    shuffled.forEach(item => {
      html += `
        <button id="sort-item-${item.id}" onclick="app.clickSortItem('${item.id}', ${item.order})"
                class="btn-bubble bg-white border-2 border-slate-200 p-5 rounded-2xl font-black text-lg text-slate-800 hover:border-indigo-500 shadow-sm text-left">
          ${item.text}
        </button>
      `;
    });

    html += `
        </div>
      </div>
    `;
    return html;
  }

  clickSortItem(id, order) {
    const btn = document.getElementById(`sort-item-${id}`);
    if (!btn || btn.classList.contains("bg-emerald-100")) return;

    if (order === this.minigameState.currentStep) {
      sounds.correct();
      btn.classList.add("bg-emerald-100", "border-emerald-500", "text-emerald-900", "pointer-events-none");
      btn.innerHTML = `<span class="bg-emerald-600 text-white w-7 h-7 rounded-full inline-flex items-center justify-center text-sm mr-2">${this.minigameState.currentStep}</span> ` + btn.textContent;

      this.minigameState.currentStep++;

      const stepInd = document.getElementById("current-step-indicator");
      if (stepInd && this.minigameState.currentStep <= this.minigameState.totalSteps) {
        stepInd.textContent = `Paso ${this.minigameState.currentStep}`;
      }

      if (this.minigameState.currentStep > this.minigameState.totalSteps) {
        this.finishMinigame();
      }
    } else {
      sounds.wrong();
      this.showToast(`¡Ups! Ese no es el paso ${this.minigameState.currentStep}. ¡Inténtalo de nuevo!`, "error");
    }
  }

  // Al completar con éxito el minijuego
  finishMinigame() {
    sounds.fanfare();
    this.triggerConfetti();
    this.addReward(15, 40); // 15 monedas, 40 XP

    const playArea = document.getElementById("minigame-play-area");
    if (!playArea) return;

    playArea.innerHTML = `
      <div class="text-center py-8 space-y-6 animate-pop">
        <div class="text-7xl animate-float">🏆</div>
        <div class="space-y-2">
          <h2 class="text-3xl font-black text-slate-800">¡Reto Superado con Éxito!</h2>
          <p class="text-slate-600 text-lg">Has completado el minijuego de manera fantástica.</p>
        </div>

        <div class="inline-flex items-center gap-6 bg-amber-50 border-2 border-amber-300 px-6 py-3 rounded-2xl">
          <div class="text-center">
            <span class="text-xs text-amber-800 font-bold uppercase">Recompensa</span>
            <p class="text-2xl font-black text-amber-600">+15 🪙</p>
          </div>
          <div class="text-center">
            <span class="text-xs text-indigo-800 font-bold uppercase">Experiencia</span>
            <p class="text-2xl font-black text-indigo-600">+40 XP 🌟</p>
          </div>
        </div>

        <div class="flex flex-wrap justify-center gap-4 pt-4">
          <button onclick="app.navigateTo('subject_hub', { subject: '${this.currentSubject}' })"
                  class="btn-bubble bg-slate-200 hover:bg-slate-300 text-slate-800 px-6 py-3 rounded-2xl font-bold">
            Volver a Temas 🗺️
          </button>
          <button onclick="app.navigateTo('test', { subject: '${this.currentSubject}', topic: '${this.currentTopic}' })"
                  class="btn-bubble bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-3 rounded-2xl font-black shadow-lg text-lg">
            ¡Hacer el Super Test! 📝
          </button>
        </div>
      </div>
    `;
  }

  /* ========================================================
     PANTALLA DE TEST (EVALUACIÓN DIVERTIDA DE 5 PREGUNTAS)
     ======================================================== */
  renderTest(container) {
    const sub = CURRICULUM_DATA[this.currentSubject];
    const topic = sub?.topics.find(t => t.id === this.currentTopic);
    if (!topic || !topic.test) return this.navigateTo("subject_hub", { subject: this.currentSubject });

    this.testState = {
      questions: topic.test,
      currentIndex: 0,
      score: 0,
      total: topic.test.length,
      topicId: topic.id,
      answered: false
    };

    this.renderTestQuestion(container, sub, topic);
  }

  renderTestQuestion(container, sub, topic) {
    const qIndex = this.testState.currentIndex;
    const q = this.testState.questions[qIndex];
    const isEnglish = this.currentSubject === "ingles";
    const langCode = isEnglish ? "en-GB" : "es-ES";

    let html = `
      <div class="space-y-6 animate-pop max-w-3xl mx-auto">
        <!-- Barra de navegación -->
        <div class="flex items-center justify-between">
          <button onclick="app.navigateTo('subject_hub', { subject: '${sub.id}' })" class="btn-bubble bg-white text-slate-700 px-4 py-2 rounded-2xl text-sm font-bold shadow border border-slate-200">
            ⬅️ Cancelar Test
          </button>
          <div class="text-sm font-bold text-slate-500">
            Pregunta <span class="text-indigo-600 font-black text-lg">${qIndex + 1}</span> de ${this.testState.total}
          </div>
        </div>

        <!-- Barra de Progreso de Preguntas -->
        <div class="w-full bg-slate-200 h-3 rounded-full overflow-hidden">
          <div class="bg-indigo-600 h-full transition-all duration-300 rounded-full" style="width: ${(qIndex / this.testState.total) * 100}%"></div>
        </div>

        <!-- Tarjeta de Pregunta -->
        <div class="card-game p-6 md:p-8 space-y-6">
          <div class="flex items-start justify-between gap-4">
            <h2 class="text-xl md:text-2xl font-black text-slate-800 leading-snug">
              ${q.question}
            </h2>
            <button onclick="app.speakText('${q.question.replace(/'/g, "\\'")}', '${langCode}')" class="speak-btn flex-shrink-0" title="Escuchar pregunta">
              🔊
            </button>
          </div>

          <!-- Opciones de Respuesta -->
          <div class="space-y-3" id="options-container">
    `;

    q.options.forEach((opt, idx) => {
      html += `
        <button id="opt-btn-${idx}" onclick="app.answerTestQuestion(${idx})"
                class="w-full text-left btn-bubble bg-slate-50 hover:bg-indigo-50 border-2 border-slate-200 hover:border-indigo-400 p-4 md:p-5 rounded-2xl font-bold text-base md:text-lg text-slate-800 flex items-center justify-between group transition-all">
          <span>${opt}</span>
          <span class="w-8 h-8 rounded-full bg-slate-200 group-hover:bg-indigo-200 text-slate-700 group-hover:text-indigo-800 flex items-center justify-center text-sm font-black flex-shrink-0 ml-3">
            ${String.fromCharCode(65 + idx)}
          </span>
        </button>
      `;
    });

    html += `
          </div>

          <!-- Feedback Explicativo -->
          <div id="test-feedback-box" class="hidden p-5 rounded-2xl"></div>

          <!-- Botón Siguiente -->
          <div id="test-next-btn-container" class="hidden pt-2 flex justify-end">
            <button onclick="app.nextTestQuestion()" class="btn-bubble bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-2xl font-extrabold shadow-lg text-lg">
              ${qIndex + 1 < this.testState.total ? "Siguiente Pregunta ➡️" : "Ver Mis Resultados 🏆"}
            </button>
          </div>
        </div>
      </div>
    `;

    container.innerHTML = html;
  }

  answerTestQuestion(chosenIndex) {
    if (this.testState.answered) return;
    this.testState.answered = true;

    const q = this.testState.questions[this.testState.currentIndex];
    const isCorrect = chosenIndex === q.correct;

    const chosenBtn = document.getElementById(`opt-btn-${chosenIndex}`);
    const correctBtn = document.getElementById(`opt-btn-${q.correct}`);
    const feedbackBox = document.getElementById("test-feedback-box");
    const nextBtnContainer = document.getElementById("test-next-btn-container");

    // Deshabilitar todos los botones
    document.querySelectorAll("#options-container button").forEach(b => {
      b.classList.add("pointer-events-none");
    });

    if (isCorrect) {
      sounds.correct();
      this.testState.score++;
      if (chosenBtn) {
        chosenBtn.classList.remove("bg-slate-50", "border-slate-200");
        chosenBtn.classList.add("bg-emerald-100", "border-emerald-500", "text-emerald-950");
      }
      if (feedbackBox) {
        feedbackBox.className = "p-5 rounded-2xl bg-emerald-50 border-2 border-emerald-300 text-emerald-900 font-bold animate-pop";
        feedbackBox.innerHTML = `<span class="text-2xl mr-2">🌟</span> ¡Correcto! ${q.feedback}`;
        feedbackBox.classList.remove("hidden");
      }
    } else {
      sounds.wrong();
      if (chosenBtn) {
        chosenBtn.classList.remove("bg-slate-50", "border-slate-200");
        chosenBtn.classList.add("bg-rose-100", "border-rose-400", "text-rose-950");
      }
      if (correctBtn) {
        correctBtn.classList.remove("bg-slate-50", "border-slate-200");
        correctBtn.classList.add("bg-emerald-100", "border-emerald-500", "text-emerald-950");
      }
      if (feedbackBox) {
        feedbackBox.className = "p-5 rounded-2xl bg-amber-50 border-2 border-amber-300 text-amber-900 font-bold animate-pop";
        feedbackBox.innerHTML = `<span class="text-2xl mr-2">💡</span> ¡Ánimo! ${q.feedback}`;
        feedbackBox.classList.remove("hidden");
      }
    }

    if (nextBtnContainer) {
      nextBtnContainer.classList.remove("hidden");
    }
  }

  nextTestQuestion() {
    sounds.click();
    this.testState.currentIndex++;
    this.testState.answered = false;

    if (this.testState.currentIndex < this.testState.total) {
      const container = document.getElementById("main-app-container");
      const sub = CURRICULUM_DATA[this.currentSubject];
      const topic = sub.topics.find(t => t.id === this.currentTopic);
      this.renderTestQuestion(container, sub, topic);
    } else {
      this.finishTest();
    }
  }

  finishTest() {
    sounds.fanfare();
    this.triggerConfetti();

    const score = this.testState.score;
    const total = this.testState.total;
    let stars = 1;
    if (score >= 4) stars = 3;
    else if (score >= 3) stars = 2;

    const coinsEarned = score * 5 + stars * 5;
    const xpEarned = score * 15 + stars * 20;

    // Actualizar progreso persistente
    const prevData = this.state.completedTopics[this.testState.topicId] || { stars: 0, bestScore: 0 };
    this.state.completedTopics[this.testState.topicId] = {
      completed: true,
      stars: Math.max(prevData.stars, stars),
      bestScore: Math.max(prevData.bestScore, score)
    };

    this.addReward(coinsEarned, xpEarned);

    const container = document.getElementById("main-app-container");
    const starsEmoji = "⭐".repeat(stars) + "☆".repeat(3 - stars);

    container.innerHTML = `
      <div class="card-game p-8 max-w-xl mx-auto text-center space-y-6 animate-pop shadow-2xl">
        <div class="text-7xl animate-float">🎉</div>
        <div class="space-y-2">
          <span class="text-xs uppercase font-extrabold tracking-wider text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">Test Finalizado</span>
          <h2 class="text-3xl font-black text-slate-800">¡Genial trabajo, ${this.state.name}!</h2>
          <div class="text-4xl text-yellow-400 py-2">${starsEmoji}</div>
          <p class="text-slate-600 text-lg">
            Has acertado <strong class="text-slate-900 font-black">${score} de ${total}</strong> preguntas.
          </p>
        </div>

        <div class="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-200">
          <div>
            <span class="text-xs text-slate-500 font-bold uppercase">Monedas Conseguidas</span>
            <p class="text-2xl font-black text-amber-500">+${coinsEarned} 🪙</p>
          </div>
          <div>
            <span class="text-xs text-slate-500 font-bold uppercase">Puntos de Saber</span>
            <p class="text-2xl font-black text-indigo-600">+${xpEarned} XP 🌟</p>
          </div>
        </div>

        <div class="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
          <button onclick="app.navigateTo('subject_hub', { subject: '${this.currentSubject}' })"
                  class="btn-bubble bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-2xl font-black shadow-lg">
            Volver a la Asignatura 🗺️
          </button>
          <button onclick="app.navigateTo('home')"
                  class="btn-bubble bg-slate-100 hover:bg-slate-200 text-slate-700 px-6 py-3 rounded-2xl font-bold">
            Ir a Inicio 🏠
          </button>
        </div>
      </div>
    `;
  }

  /* ========================================================
     PANTALLA DE PERFIL Y AVATARES
     ======================================================== */
  renderProfile(container) {
    let html = `
      <div class="card-game p-6 md:p-8 max-w-2xl mx-auto space-y-8 animate-pop">
        <div class="flex items-center justify-between">
          <button onclick="app.navigateTo('home')" class="btn-bubble bg-white text-slate-700 px-4 py-2 rounded-2xl text-sm font-bold shadow border border-slate-200">
            ⬅️ Volver
          </button>
          <h1 class="text-2xl font-black text-slate-800">Tu Perfil de Aventurero</h1>
        </div>

        <!-- Nombre -->
        <div class="space-y-2">
          <label class="block text-sm font-bold text-slate-700">Tu Nombre de Jugador:</label>
          <div class="flex gap-2">
            <input type="text" id="player-name-input" value="${this.state.name}" maxlength="20"
                   class="flex-1 px-4 py-3 border-2 border-slate-200 rounded-2xl font-bold text-lg focus:border-indigo-500 focus:outline-none">
            <button onclick="app.updatePlayerName()" class="btn-bubble bg-indigo-600 text-white px-5 py-3 rounded-2xl font-bold shadow">
              Guardar 💾
            </button>
          </div>
        </div>

        <!-- Selector de Avatar -->
        <div class="space-y-3">
          <label class="block text-sm font-bold text-slate-700">Elige tu Avatar Favorito:</label>
          <div class="grid grid-cols-2 sm:grid-cols-3 gap-4">
    `;

    AVATARS.forEach(av => {
      const isSelected = this.state.avatar === av.id;
      html += `
        <div onclick="app.selectAvatar('${av.id}')"
             class="p-4 rounded-2xl border-3 text-center cursor-pointer transition-all ${
               isSelected ? "border-indigo-600 bg-indigo-50/80 shadow-md transform scale-105" : "border-slate-200 hover:border-slate-300"
             }">
          <div class="text-5xl mb-2">${av.emoji}</div>
          <h4 class="font-extrabold text-slate-800 text-sm">${av.name}</h4>
          <p class="text-xs text-slate-500 mt-1">${av.desc}</p>
        </div>
      `;
    });

    html += `
          </div>
        </div>

        <!-- Zona de Padres / Docentes: Reiniciar progreso -->
        <div class="pt-6 border-t border-slate-200 flex justify-between items-center text-xs text-slate-500">
          <span>Control escolar y familiar</span>
          <button onclick="app.confirmReset()" class="text-rose-600 hover:underline font-bold">
            ⚠️ Reiniciar Progreso
          </button>
        </div>
      </div>
    `;

    container.innerHTML = html;
  }

  updatePlayerName() {
    const input = document.getElementById("player-name-input");
    if (!input) return;
    const val = input.value.trim();
    if (val) {
      this.state.name = val;
      this.saveState();
      sounds.coin();
      this.showToast(`¡Nombre actualizado a ${val}! 🎉`, "success");
    }
  }

  selectAvatar(avId) {
    sounds.click();
    this.state.avatar = avId;
    this.saveState();
    this.render();
  }

  confirmReset() {
    if (confirm("¿Estás seguro de que deseas reiniciar todos los puntos, estrellas y progreso de la aventura?")) {
      localStorage.removeItem("aventura_primaria_save");
      this.state = this.loadState();
      sounds.wrong();
      this.render();
      this.showToast("Progreso reiniciado correctamente", "info");
    }
  }

  /* ========================================================
     PANTALLA DE MEDALLAS Y LOGROS
     ======================================================== */
  renderMedals(container) {
    const totalCompleted = Object.keys(this.state.completedTopics).length;
    const totalStars = Object.values(this.state.completedTopics).reduce((acc, t) => acc + (t.stars || 0), 0);

    const BADGES_LIST = [
      { id: "b1", title: "Primer Gran Paso", emoji: "🌱", desc: "Supera tu primer tema", req: totalCompleted >= 1 },
      { id: "b2", title: "Coleccionista de Estrellas", emoji: "⭐", desc: "Consigue al menos 15 estrellas", req: totalStars >= 15 },
      { id: "b3", title: "Mago de las Mates", emoji: "🔢", desc: "Supera todos los temas de Matemáticas", req: this.checkSubjectDone("matematicas") },
      { id: "b4", title: "Doctor de las Letras", emoji: "📚", desc: "Supera todos los temas de Lengua", req: this.checkSubjectDone("lengua") },
      { id: "b5", title: "Guardián de la Tierra", emoji: "🌿", desc: "Supera todos los temas de Ciencias Naturales", req: this.checkSubjectDone("ciencias_naturales") },
      { id: "b6", title: "Explorador Social", emoji: "🌍", desc: "Supera todos los temas de Ciencias Sociales", req: this.checkSubjectDone("ciencias_sociales") },
      { id: "b7", title: "English Champion", emoji: "🇬🇧", desc: "Supera todos los temas de Inglés", req: this.checkSubjectDone("ingles") },
      { id: "b8", title: "Súper Sabio Total", emoji: "👑", desc: "Completa los 25 temas de 2º de Primaria", req: totalCompleted >= 25 }
    ];

    let html = `
      <div class="card-game p-6 md:p-8 max-w-3xl mx-auto space-y-6 animate-pop">
        <div class="flex items-center justify-between">
          <button onclick="app.navigateTo('home')" class="btn-bubble bg-white text-slate-700 px-4 py-2 rounded-2xl text-sm font-bold shadow border border-slate-200">
            ⬅️ Volver
          </button>
          <h1 class="text-2xl font-black text-slate-800 flex items-center gap-2">
            <span>🏅</span> Muro de Trofeos y Medallas
          </h1>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
    `;

    BADGES_LIST.forEach(b => {
      html += `
        <div class="p-5 rounded-2xl border-2 flex items-center gap-4 transition-all ${
          b.req ? "bg-amber-50/70 border-amber-300 shadow-sm" : "bg-slate-50 border-slate-200 opacity-60"
        }">
          <div class="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl ${
            b.req ? "bg-amber-200 shadow-inner" : "bg-slate-200 grayscale"
          }">
            ${b.emoji}
          </div>
          <div>
            <h4 class="font-extrabold text-slate-900 text-base flex items-center gap-2">
              ${b.title} ${b.req ? '<span class="text-xs bg-emerald-500 text-white px-2 py-0.5 rounded-full font-bold">¡Conseguida!</span>' : ''}
            </h4>
            <p class="text-xs text-slate-600 mt-0.5">${b.desc}</p>
          </div>
        </div>
      `;
    });

    html += `
        </div>
      </div>
    `;

    container.innerHTML = html;
  }

  checkSubjectDone(subId) {
    const sub = CURRICULUM_DATA[subId];
    if (!sub) return false;
    return sub.topics.every(t => this.state.completedTopics[t.id]?.completed);
  }

  /* ========================================================
     PANTALLA DE TIENDA DE MASCOTAS Y RECOMPENSAS
     ======================================================== */
  renderShop(container) {
    let html = `
      <div class="card-game p-6 md:p-8 max-w-3xl mx-auto space-y-6 animate-pop">
        <div class="flex items-center justify-between">
          <button onclick="app.navigateTo('home')" class="btn-bubble bg-white text-slate-700 px-4 py-2 rounded-2xl text-sm font-bold shadow border border-slate-200">
            ⬅️ Volver
          </button>
          <div class="flex items-center gap-2 bg-amber-100 text-amber-900 px-4 py-1.5 rounded-2xl font-black text-lg">
            <span>🪙</span> <span>${this.state.coins} Monedas</span>
          </div>
        </div>

        <div class="text-center space-y-2">
          <h1 class="text-2xl md:text-3xl font-black text-slate-800">Tienda de Mascotas Mágicas</h1>
          <p class="text-slate-600 text-sm">Canjea tus monedas de estudio para adoptar un fiel compañero de aventuras:</p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
    `;

    PETS_SHOP.forEach(pet => {
      const isUnlocked = this.state.unlockedPets.includes(pet.id);
      const isEquipped = this.state.pet === pet.id;

      html += `
        <div class="border-2 rounded-3xl p-5 text-center flex flex-col justify-between space-y-3 ${
          isEquipped ? "border-emerald-500 bg-emerald-50/60 shadow-md" : "border-slate-200 bg-white"
        }">
          <div>
            <div class="text-6xl my-2">${pet.emoji}</div>
            <h4 class="font-black text-slate-800 text-lg">${pet.name}</h4>
            <p class="text-xs text-slate-500 mt-1">${pet.desc}</p>
          </div>

          <div class="pt-2 border-t border-slate-100">
            ${
              isEquipped
                ? `<button class="w-full py-2 bg-emerald-600 text-white rounded-xl font-bold text-xs pointer-events-none">Equipado ⭐</button>`
                : isUnlocked
                ? `<button onclick="app.equipPet('${pet.id}')" class="w-full btn-bubble bg-indigo-600 text-white py-2 rounded-xl font-bold text-xs shadow">Llevar conmigo</button>`
                : `<button onclick="app.buyPet('${pet.id}', ${pet.price})" class="w-full btn-bubble bg-amber-400 hover:bg-amber-500 text-amber-950 py-2 rounded-xl font-black text-xs shadow flex items-center justify-center gap-1.5">
                    <span>Adoptar por</span> <span>${pet.price} 🪙</span>
                   </button>`
            }
          </div>
        </div>
      `;
    });

    html += `
        </div>
      </div>
    `;

    container.innerHTML = html;
  }

  buyPet(petId, price) {
    if (this.state.coins >= price) {
      sounds.coin();
      this.state.coins -= price;
      this.state.unlockedPets.push(petId);
      this.state.pet = petId;
      this.saveState();
      this.triggerConfetti();
      this.showToast(`¡Has adoptado a tu nueva mascota! 🎉`, "success");
      this.render();
    } else {
      sounds.wrong();
      this.showToast(`Necesitas ${price} monedas. ¡Completa más tests para ganar más!`, "error");
    }
  }

  equipPet(petId) {
    sounds.click();
    this.state.pet = petId;
    this.saveState();
    this.render();
  }

  /* ========================================================
     PANTALLA DE DIPLOMA OFICIAL (IMPRIMIBLE)
     ======================================================== */
  renderDiploma(container) {
    const totalCompleted = Object.keys(this.state.completedTopics).length;
    const totalStars = Object.values(this.state.completedTopics).reduce((acc, t) => acc + (t.stars || 0), 0);
    const dateStr = new Date().toLocaleDateString("es-ES", { year: 'numeric', month: 'long', day: 'numeric' });

    let html = `
      <div class="space-y-6 max-w-4xl mx-auto animate-pop">
        <div class="flex items-center justify-between">
          <button onclick="app.navigateTo('home')" class="btn-bubble bg-white text-slate-700 px-4 py-2 rounded-2xl text-sm font-bold shadow border border-slate-200">
            ⬅️ Volver a Inicio
          </button>
          <button onclick="window.print()" class="btn-bubble bg-indigo-600 text-white px-5 py-2 rounded-2xl text-sm font-black shadow flex items-center gap-2">
            🖨️ Imprimir / Guardar Diploma
          </button>
        </div>

        <!-- Marco de Diploma -->
        <div class="bg-white border-8 border-double border-amber-400 rounded-3xl p-8 md:p-12 text-center shadow-2xl relative overflow-hidden space-y-6">
          <div class="absolute -top-12 -right-12 w-36 h-36 bg-amber-200 rounded-full opacity-30"></div>
          <div class="absolute -bottom-12 -left-12 w-36 h-36 bg-indigo-200 rounded-full opacity-30"></div>

          <div class="space-y-2">
            <span class="text-xs font-black tracking-widest text-amber-700 uppercase">Academia del Saber de Primaria</span>
            <h1 class="text-3xl md:text-5xl font-black text-slate-800 tracking-tight">DIPLOMA DE HONOR</h1>
            <p class="text-base text-slate-500 font-bold">Por su esfuerzo, curiosidad y dedicación al estudio</p>
          </div>

          <div class="py-4">
            <span class="text-sm text-slate-600">Se otorga con orgullo y felicitaciones a:</span>
            <h2 class="text-4xl md:text-5xl font-black text-indigo-700 tracking-wide mt-2 underline decoration-amber-400 decoration-wavy">
              ${this.state.name}
            </h2>
          </div>

          <p class="text-slate-700 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Por haber superado con valentía <strong class="text-slate-900">${totalCompleted} temas</strong> del curso de
            <strong>2º de Educación Primaria</strong>, habiendo acumulado <strong>⭐ ${totalStars} Estrellas del Saber</strong>
            en Matemáticas, Lengua, Ciencias y la aventura en Inglés.
          </p>

          <div class="pt-8 border-t-2 border-dashed border-amber-300 grid grid-cols-2 gap-8 items-center">
            <div>
              <span class="text-3xl">🏅</span>
              <p class="font-extrabold text-slate-800 text-sm mt-1">Nivel Alcanzado: ${this.getLevelTitle()}</p>
              <span class="text-xs text-slate-500">Fecha: ${dateStr}</span>
            </div>
            <div class="border-t-2 border-slate-400 pt-2 max-w-xs mx-auto">
              <span class="font-black text-indigo-800 text-sm">Claustro de Sabios de 2º Primaria</span>
              <p class="text-xs text-slate-500 italic">Sello Oficial de Excelencia</p>
            </div>
          </div>
        </div>
      </div>
    `;

    container.innerHTML = html;
  }
}

// Inicializar la aplicación cuando cargue la página
let app;
window.addEventListener("DOMContentLoaded", () => {
  app = new AventuraApp();
});
