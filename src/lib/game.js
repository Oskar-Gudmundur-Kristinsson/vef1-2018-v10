// todo vísa í rétta hluti með import
import question from './question';
import * as stor from './storage';
import * as hs from './highscore';

// allar breytur hér eru aðeins sýnilegar innan þessa módúl

let startButton; // takki sem byrjar leik
let problem; // element sem heldur utan um verkefni, sjá index.html
let result; // element sem heldur utan um niðurstöðu, sjá index.html

let playTime; // hversu lengi á að spila? Sent inn gegnum init()
let total = 0; // fjöldi spurninga í núverandi leik
let correct = 0; // fjöldi réttra svara í núverandi leik
let currentProblem; // spurning sem er verið að sýna
let points;

/**
 * Klárar leik. Birtir result og felur problem. Reiknar stig og birtir í result.
 */
function finish() {
  points = hs.score(total,correct,10);
  const text = `Þú svaraðir ${correct} rétt af ${total} spurningum og fékkst ${points} stig fyrir. Skráðu þig á stigatöfluna!`;

  problem = document.querySelector('.problem');
  problem.classList.add("problem--hidden");

  result = document.querySelector('.result--hidden');
  result.classList.remove('result--hidden');

  const r = document.createElement('p');
  const res = document.createTextNode(text);
  r.appendChild(res);
  r.id = "result";
  document.querySelector('.result__text').appendChild(r);

  const updateList = document.querySelector('.result__form');
  updateList.addEventListener('submit',onSubmitScore);
  // todo útfæra
}

/**
 * Keyrir áfram leikinn. Telur niður eftir því hve langur leikur er og þegar
 * tími er búinn kallar í finish().
 *
 * Í staðinn fyrir að nota setInterval köllum við í setTimeout á sekúndu fresti.
 * Þurfum þá ekki að halda utan um id á intervali og skilum falli sem lokar
 * yfir fjölda sekúnda sem eftir er.
 *
 * @param {number} current Sekúndur eftir
 */
function tick(current) {
  // todo uppfæra tíma
  const problem__timer = document.querySelector('.problem__timer');
  if(current != 10){
    document.getElementById('temp').remove();
  }
  const t = document.createElement('p');
  t.id = "temp";
  const time = document.createTextNode(current);
  t.appendChild(time);
  problem__timer.appendChild(t);
  console.log(current);
  if (current <= 0) {
    return finish();
  }

  return setTimeout(function(){tick(current - 1)}, 1000);
}

/**
 * Býr til nýja spurningu og sýnir undir .problem__question
 */
function showQuestion() {
  const problem_q = document.querySelector(".problem__question");
  currentProblem = question();
  console.log(problem_q);
  console.log(currentProblem);
  console.log(currentProblem.problem);
  const q = document.createElement('p');
  const theQuestion = document.createTextNode(currentProblem.problem);
  q.appendChild(theQuestion)
  q.id = "temp1";
  problem_q.appendChild(q);
  const svaraButton = document.querySelector('.problem__answer');
  svaraButton.reset();
  svaraButton.addEventListener("submit",onSubmit);
  // todo útfæra

}

/**
 * Byrjar leik
 *
 * - Felur startButton og sýnir problem
 * - Núllstillir total og correct
 * - Kallar í fyrsta sinn í tick()
 * - Sýnir fyrstu spurningu
 */
function start() {
  problem = document.querySelector('.problem--hidden');
  problem.classList.remove("problem--hidden");
  startButton.classList.add("button--hidden");
  showQuestion();
  tick(playTime);
}

/**
 * Event handler fyrir það þegar spurningu er svarað. Athugar hvort svar sé
 * rétt, hreinsar input og birtir nýja spurningu.
 *
 * @param {object} e Event þegar spurningu svarað
 */
function onSubmit(e) {
  e.preventDefault();
  total++;
  if(currentProblem.answer == e.target.querySelector('.problem__input').value){
    correct++;
  }
  // todo útfæra
  document.getElementById('temp1').remove();
  console.log(total);
  console.log(correct);
  showQuestion();
}

/**
 * Event handler fyrir þegar stig eru skráð eftir leik.
 *
 * @param {*} e Event þegar stig eru skráð
 */
function onSubmitScore(e) {
  e.preventDefault();

  stor.save(e.targget.querySelector('.result__form').value,points);


  // todo útfæra

  result.classList.add('result--hidden');
  problem.classList.add('problem--hidden');
  startButton.classList.remove('button--hidden');
}

/**
 * Finnur öll element DOM og setur upp event handlers.
 *
 * @param {number} _playTime Fjöldi sekúnda sem hver leikur er
 */
export default function init(_playTime) {
  playTime = _playTime;
  // todo útfæra
  const sb = document.getElementsByClassName("start");
  startButton = sb[0];// document.querySelector('start');
  startButton.addEventListener("click",start);
}
