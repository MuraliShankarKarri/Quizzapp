/* ── QUESTIONS DATA ─────────────────────────────── */
const QUESTIONS = [
  { q: "What is the capital of France?",                         opts: ["Berlin","Madrid","Paris","Rome"],                              ans: 2 },
  { q: "Which planet is known as the Red Planet?",               opts: ["Venus","Mars","Jupiter","Saturn"],                             ans: 1 },
  { q: "Who painted the Mona Lisa?",                             opts: ["Raphael","Michelangelo","Leonardo da Vinci","Caravaggio"],      ans: 2 },
  { q: "What is the largest ocean on Earth?",                    opts: ["Atlantic","Indian","Arctic","Pacific"],                        ans: 3 },
  { q: "How many continents are there on Earth?",                opts: ["5","6","7","8"],                                               ans: 2 },
  { q: "Which element has the chemical symbol 'O'?",             opts: ["Gold","Oxygen","Osmium","Oganesson"],                          ans: 1 },
  { q: "What is the longest river in the world?",                opts: ["Amazon","Yangtze","Nile","Mississippi"],                       ans: 2 },
  { q: "In which year did World War II end?",                    opts: ["1943","1944","1945","1946"],                                   ans: 2 },
  { q: "Who wrote 'Romeo and Juliet'?",                          opts: ["Charles Dickens","William Shakespeare","Jane Austen","Mark Twain"], ans: 1 },
  { q: "What is the smallest planet in our solar system?",       opts: ["Mars","Mercury","Venus","Pluto"],                              ans: 1 },
  { q: "Which country invented the telephone?",                  opts: ["USA","UK","Canada","Germany"],                                 ans: 0 },
  { q: "What is the hardest natural substance on Earth?",        opts: ["Gold","Iron","Diamond","Quartz"],                              ans: 2 },
  { q: "How many sides does a hexagon have?",                    opts: ["5","6","7","8"],                                               ans: 1 },
  { q: "What is the currency of Japan?",                         opts: ["Yuan","Won","Ringgit","Yen"],                                  ans: 3 },
  { q: "Which gas do plants absorb from the atmosphere?",        opts: ["Oxygen","Nitrogen","Carbon Dioxide","Hydrogen"],               ans: 2 },
  { q: "Who was the first person to walk on the Moon?",          opts: ["Buzz Aldrin","Neil Armstrong","Yuri Gagarin","Alan Shepard"],  ans: 1 },
  { q: "What is the capital city of Australia?",                 opts: ["Sydney","Melbourne","Canberra","Brisbane"],                    ans: 2 },
  { q: "How many bones are in the adult human body?",            opts: ["196","206","216","226"],                                       ans: 1 },
  { q: "Which animal is known as the King of the Jungle?",       opts: ["Tiger","Cheetah","Lion","Leopard"],                           ans: 2 },
  { q: "What is the boiling point of water at sea level (°C)?",  opts: ["90","95","100","105"],                                         ans: 2 },
  { q: "Which country is the largest by land area?",             opts: ["China","Canada","USA","Russia"],                               ans: 3 },
  { q: "How many letters are in the English alphabet?",          opts: ["24","25","26","27"],                                           ans: 2 },
  { q: "What is the speed of light (approx.) in km/s?",          opts: ["100,000","200,000","300,000","400,000"],                       ans: 2 },
  { q: "Who invented the World Wide Web?",                       opts: ["Bill Gates","Steve Jobs","Tim Berners-Lee","Linus Torvalds"],  ans: 2 },
  { q: "What is the national animal of India?",                  opts: ["Lion","Elephant","Tiger","Peacock"],                          ans: 2 },
  { q: "Which organ pumps blood around the human body?",         opts: ["Liver","Lungs","Kidney","Heart"],                             ans: 3 },
  { q: "What is the main language spoken in Brazil?",            opts: ["Spanish","English","French","Portuguese"],                    ans: 3 },
  { q: "Which metal is liquid at room temperature?",             opts: ["Lead","Tin","Mercury","Gallium"],                             ans: 2 },
  { q: "How many planets are in our solar system?",              opts: ["7","8","9","10"],                                              ans: 1 },
  { q: "Which scientist developed the theory of relativity?",    opts: ["Isaac Newton","Nikola Tesla","Albert Einstein","Galileo"],    ans: 2 },
  { q: "What is the tallest mountain in the world?",             opts: ["K2","Kangchenjunga","Lhotse","Mount Everest"],                ans: 3 },
  { q: "In which country is the Eiffel Tower located?",          opts: ["Italy","Germany","France","Spain"],                           ans: 2 },
  { q: "What is the chemical formula for water?",                opts: ["HO","H2O","H3O","H2O2"],                                      ans: 1 },
  { q: "Which sport is played at Wimbledon?",                    opts: ["Cricket","Football","Tennis","Golf"],                         ans: 2 },
  { q: "What is the largest continent?",                         opts: ["Africa","North America","Europe","Asia"],                     ans: 3 },
  { q: "Who wrote '1984'?",                                      opts: ["Aldous Huxley","George Orwell","Ray Bradbury","H.G. Wells"],  ans: 1 },
  { q: "What colour is the 'Black Box' in an aircraft?",         opts: ["Black","Grey","Orange","Yellow"],                             ans: 2 },
  { q: "How many hours are there in a day?",                     opts: ["12","18","24","36"],                                           ans: 2 },
  { q: "Which country hosted the 2016 Summer Olympics?",         opts: ["China","UK","Brazil","Japan"],                                ans: 2 },
  { q: "What is the most spoken language in the world?",         opts: ["English","Spanish","Hindi","Mandarin Chinese"],               ans: 3 }
];

/* ── STATE ──────────────────────────────────────── */
let current     = 0;
let userAnswers = new Array(40).fill(null);
let submitted   = false;

const LABELS = ['A', 'B', 'C', 'D'];

/* ── HELPERS ────────────────────────────────────── */
function $(id) { return document.getElementById(id); }

/* ── RENDER ─────────────────────────────────────── */
function render() {
  const q   = QUESTIONS[current];
  const idx = current + 1;

  /* header */
  $('current-num').textContent = idx;
  $('q-badge').textContent     = 'Question ' + String(idx).padStart(2, '0');
  $('q-text').textContent      = q.q;

  /* progress bar */
  const pct = Math.max(2.5, (idx / 40) * 100);
  $('progress-bar').style.width   = pct + '%';
  $('pct-label').textContent      = Math.round(pct) + '%';

  /* answered count */
  const answered = userAnswers.filter(a => a !== null).length;
  $('answered-label').textContent = answered + ' answered';

  /* options */
  renderOptions(q);

  /* dots */
  renderDots();

  /* prev button */
  const prevBtn = $('prev-btn');
  prevBtn.disabled = (current === 0);
  prevBtn.onclick  = () => goTo(current - 1);

  /* next / submit button */
  const nextBtn = $('next-btn');
  if (current === 39) {
    nextBtn.textContent = 'Submit Quiz ✓';
    nextBtn.onclick     = submitQuiz;
  } else {
    nextBtn.textContent = 'Next →';
    nextBtn.onclick     = () => goTo(current + 1);
  }

  /* footer note */
  const note = $('review-note');
  if (submitted) {
    note.textContent = 'Review mode — green = correct, red = wrong';
  } else {
    const remaining = 40 - answered;
    note.textContent = remaining > 0
      ? remaining + ' question' + (remaining !== 1 ? 's' : '') + ' remaining'
      : 'All questions answered — ready to submit!';
  }
}

function renderOptions(q) {
  const ol = $('options-list');
  ol.innerHTML = '';

  q.opts.forEach((opt, i) => {
    const btn = document.createElement('button');
    btn.className = 'option-btn';

    if (submitted) {
      if (i === q.ans) {
        btn.classList.add('correct');
        btn.innerHTML = buildOptionHTML(LABELS[i], opt, '✓');
      } else if (userAnswers[current] === i) {
        btn.classList.add('wrong');
        btn.innerHTML = buildOptionHTML(LABELS[i], opt, '✕');
      } else {
        btn.innerHTML = buildOptionHTML(LABELS[i], opt, '');
      }
      btn.disabled = true;
    } else {
      if (userAnswers[current] === i) btn.classList.add('selected');
      btn.innerHTML = buildOptionHTML(LABELS[i], opt, '');
      btn.onclick   = () => selectAnswer(i);
    }

    ol.appendChild(btn);
  });
}

function buildOptionHTML(label, text, icon) {
  return `<span class="opt-label">${label}</span>
          <span class="opt-text">${text}</span>
          <span class="opt-icon">${icon}</span>`;
}

function renderDots() {
  const dotsRow = $('dots-row');
  dotsRow.innerHTML = '';

  const start = Math.max(0, Math.min(current - 3, 40 - 7));
  const end   = Math.min(39, start + 6);

  for (let i = start; i <= end; i++) {
    const d = document.createElement('span');
    d.className = 'dot' +
      (i === current          ? ' current' :
       userAnswers[i] !== null ? ' filled'  : '');
    d.title   = 'Q' + (i + 1);
    d.onclick = () => goTo(i);
    dotsRow.appendChild(d);
  }
}

/* ── ANSWER SELECTION ───────────────────────────── */
function selectAnswer(i) {
  if (submitted) return;
  userAnswers[current] = i;
  render();
}

/* ── NAVIGATION ─────────────────────────────────── */
function goTo(idx) {
  if (idx < 0 || idx > 39) return;
  current = idx;
  render();
}

/* ── SUBMIT ─────────────────────────────────────── */
function submitQuiz() {
  submitted = true;

  const correct = QUESTIONS.filter((q, i) => userAnswers[i] === q.ans).length;
  const wrong   = userAnswers.filter((a, i) => a !== null && a !== QUESTIONS[i].ans).length;
  const skipped = userAnswers.filter(a => a === null).length;
  const pct     = Math.round((correct / 40) * 100);

  $('modal-pct').textContent = pct + '%';
  $('stat-c').textContent    = correct;
  $('stat-w').textContent    = wrong;
  $('stat-s').textContent    = skipped;

  let emoji, grade;
  if      (pct >= 90) { emoji = '🏆'; grade = 'Outstanding! You nailed it.'; }
  else if (pct >= 75) { emoji = '🌟'; grade = 'Great job! Really impressive.'; }
  else if (pct >= 60) { emoji = '👍'; grade = 'Good effort! Keep practising.'; }
  else if (pct >= 40) { emoji = '📚'; grade = 'Fair attempt. Study up and retry!'; }
  else                { emoji = '💪'; grade = 'Keep going — practice makes perfect!'; }

  $('modal-emoji').textContent = emoji;
  $('modal-grade').textContent = grade;
  $('result-modal').style.display = 'flex';

  render();
}

/* ── REVIEW / RESTART ───────────────────────────── */
function reviewAnswers() {
  $('result-modal').style.display = 'none';
  current = 0;
  render();
}

function restartQuiz() {
  submitted   = false;
  userAnswers = new Array(40).fill(null);
  current     = 0;
  $('result-modal').style.display = 'none';
  render();
}

/* ── INIT ───────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', render);