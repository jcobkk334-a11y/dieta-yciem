// Adres zakupu e-booka — wspólny dla wszystkich przycisków.
const CHECKOUT_URL = 'https://www.naffy.io/brajan-kaczmarek/dieta-jed';
document.querySelectorAll('[data-buy], #buy').forEach((button) => {
  button.setAttribute('href', CHECKOUT_URL);
  button.removeAttribute('target');
  button.setAttribute('rel', 'noopener noreferrer');
});
const year = document.querySelector('#year');
if (year) year.textContent = new Date().getFullYear();

// Kalkulator: Mifflin–St Jeor. Wyniki mają charakter orientacyjny.
const calorieForm = document.querySelector('#calorie-form');
if (calorieForm) calorieForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const sex = document.querySelector('#calc-sex').value;
  const age = Number(document.querySelector('#calc-age').value);
  const height = Number(document.querySelector('#calc-height').value);
  const weight = Number(document.querySelector('#calc-weight').value);
  const activity = Number(document.querySelector('#calc-activity').value);
  const goal = document.querySelector('#calc-goal').value;
  const output = document.querySelector('#calorie-result');
  if (!Number.isFinite(age + height + weight + activity) || age < 18 || age > 100 || height < 130 || height > 220 || weight < 35 || weight > 300) {
    output.textContent = 'Sprawdź dane. Kalkulator jest przeznaczony dla osób dorosłych (18+) i podanych zakresów parametrów.';
    return;
  }
  const bmr = 10 * weight + 6.25 * height - 5 * age + (sex === 'male' ? 5 : -161);
  const maintenance = bmr * activity;
  const target = maintenance + (goal === 'loss' ? -300 : goal === 'gain' ? 200 : 0);
  const protein = Math.round(weight * 1.4);
  const fat = Math.round(weight * 0.8);
  const carbs = Math.max(0, Math.round((target - protein * 4 - fat * 9) / 4));
  const fmt = n => Math.round(n).toLocaleString('pl-PL');
  output.innerHTML = '<b>Twoje orientacyjne wyniki</b><span class="bigcal">' + fmt(target) + ' kcal / dzień</span>' +
    'PPM: <b>' + fmt(bmr) + ' kcal</b> · CPM przy wybranej aktywności: <b>' + fmt(maintenance) + ' kcal</b>' +
    '<div class="macrogrid"><span><b>' + protein + ' g</b>Białko</span><span><b>' + fat + ' g</b>Tłuszcze</span><span><b>' + carbs + ' g</b>Węglowodany</span></div>' +
    '<p>Makroskładniki to orientacyjny przykład wyliczony z przyjętych proporcji, a nie indywidualna recepta żywieniowa.</p>';
});

// Mała, lokalna baza produktów. Wartości uśrednione na 100 g jadalnej części.
const foods = [
 {id:'apple',name:'Jabłko surowe',kcal:52,p:0.3,c:13.8,f:0.2,fiber:2.4},
 {id:'banana',name:'Banan surowy',kcal:89,p:1.1,c:22.8,f:0.3,fiber:2.6},
 {id:'strawberry',name:'Truskawki surowe',kcal:32,p:0.7,c:7.7,f:0.3,fiber:2},
 {id:'blueberry',name:'Borówki',kcal:57,p:0.7,c:14.5,f:0.3,fiber:2.4},
 {id:'avocado',name:'Awokado',kcal:160,p:2,c:8.5,f:14.7,fiber:6.7},
 {id:'tomato',name:'Pomidor surowy',kcal:18,p:0.9,c:3.9,f:0.2,fiber:1.2},
 {id:'cucumber',name:'Ogórek surowy',kcal:15,p:0.7,c:3.6,f:0.1,fiber:0.5},
 {id:'broccoli',name:'Brokuł surowy',kcal:34,p:2.8,c:6.6,f:0.4,fiber:2.6},
 {id:'carrot',name:'Marchew surowa',kcal:41,p:0.9,c:9.6,f:0.2,fiber:2.8},
 {id:'potato',name:'Ziemniaki gotowane',kcal:87,p:1.9,c:20.1,f:0.1,fiber:1.8},
 {id:'rice',name:'Ryż biały gotowany',kcal:130,p:2.7,c:28.2,f:0.3,fiber:0.4},
 {id:'buckwheat',name:'Kasza gryczana gotowana',kcal:92,p:3.4,c:19.9,f:0.6,fiber:2.7},
 {id:'oats',name:'Płatki owsiane suche',kcal:379,p:13.2,c:67.7,f:6.5,fiber:10.1},
 {id:'bread',name:'Chleb pełnoziarnisty',kcal:247,p:13,c:41,f:4.2,fiber:7},
 {id:'pasta',name:'Makaron pszenny gotowany',kcal:158,p:5.8,c:30.9,f:0.9,fiber:1.8},
 {id:'chicken',name:'Pierś kurczaka surowa, bez skóry',kcal:120,p:22.5,c:0,f:2.6,fiber:0},
 {id:'turkey',name:'Pierś indyka surowa',kcal:114,p:23.7,c:0,f:1.5,fiber:0},
 {id:'salmon',name:'Łosoś surowy',kcal:208,p:20.4,c:0,f:13.4,fiber:0},
 {id:'egg',name:'Jajko całe',kcal:143,p:12.6,c:0.7,f:9.5,fiber:0},
 {id:'skyr',name:'Skyr naturalny',kcal:63,p:11,c:4,f:0.2,fiber:0},
 {id:'yogurt',name:'Jogurt naturalny 2%',kcal:60,p:4.3,c:6.2,f:2,fiber:0},
 {id:'cottage',name:'Twaróg półtłusty',kcal:133,p:18.7,c:3.7,f:4.7,fiber:0},
 {id:'milk',name:'Mleko 2%',kcal:50,p:3.4,c:4.8,f:2,fiber:0},
 {id:'lentils',name:'Soczewica gotowana',kcal:116,p:9,c:20.1,f:0.4,fiber:7.9},
 {id:'chickpeas',name:'Ciecierzyca gotowana',kcal:164,p:8.9,c:27.4,f:2.6,fiber:7.6},
 {id:'almonds',name:'Migdały',kcal:579,p:21.2,c:21.6,f:49.9,fiber:12.5},
 {id:'walnuts',name:'Orzechy włoskie',kcal:654,p:15.2,c:13.7,f:65.2,fiber:6.7},
 {id:'oliveoil',name:'Oliwa z oliwek',kcal:884,p:0,c:0,f:100,fiber:0},
 {id:'butter',name:'Masło',kcal:717,p:0.9,c:0.1,f:81.1,fiber:0}
];
const search = document.querySelector('#food-search');
const results = document.querySelector('#food-results');
const detail = document.querySelector('#food-detail');
const mealItems = document.querySelector('#meal-items');
const mealTotal = document.querySelector('#meal-total');
let selectedFood = null;
let meal = [];
const round1 = n => Math.round(n * 10) / 10;
const pl = n => round1(n).toLocaleString('pl-PL', {maximumFractionDigits:1});
const safe = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function renderFoods(query='') {
  if (!results) return;
  const q = query.trim().toLocaleLowerCase('pl');
  const found = foods.filter(food => food.name.toLocaleLowerCase('pl').includes(q));
  results.innerHTML = found.length ? found.map(food => '<button type="button" class="foodpick" data-food="' + food.id + '" role="option" aria-selected="' + (selectedFood?.id === food.id) + '">' + safe(food.name) + '<small>' + food.kcal + ' kcal / 100 g</small></button>').join('') : '<p class="emptyhint">Nie znaleziono produktu. Spróbuj innej nazwy.</p>';
}
function showFood(food) {
  selectedFood = food;
  renderFoods(search.value);
  detail.innerHTML = '<h4>' + safe(food.name) + '</h4><div class="foodstats"><span><b>' + food.kcal + '</b>kcal</span><span><b>' + pl(food.p) + ' g</b>Białko</span><span><b>' + pl(food.c) + ' g</b>Węglowodany</span><span><b>' + pl(food.f) + ' g</b>Tłuszcze</span><span><b>' + pl(food.fiber) + ' g</b>Błonnik</span></div><div class="portionrow"><label>Ilość w gramach<input id="food-grams" type="number" min="1" max="3000" value="100"></label><button type="button" id="add-food">Dodaj do posiłku</button></div><div id="portion-result" class="toolhint">Wartości dla 100 g produktu.</div>';
  document.querySelector('#food-grams').addEventListener('input', updatePortion);
  document.querySelector('#add-food').addEventListener('click', addFood);
  updatePortion();
}
function portionValues(food, grams) { const factor=grams/100; return {kcal:food.kcal*factor,p:food.p*factor,c:food.c*factor,f:food.f*factor,fiber:food.fiber*factor}; }
function updatePortion() {
  if (!selectedFood) return;
  const grams=Number(document.querySelector('#food-grams').value);
  const out=document.querySelector('#portion-result');
  if (!Number.isFinite(grams)||grams<=0||grams>3000) { out.textContent='Podaj ilość od 1 do 3000 g.'; return; }
  const v=portionValues(selectedFood,grams);
  out.textContent=pl(v.kcal)+' kcal · B: '+pl(v.p)+' g · W: '+pl(v.c)+' g · T: '+pl(v.f)+' g · błonnik: '+pl(v.fiber)+' g';
}
function addFood() {
  const grams=Number(document.querySelector('#food-grams').value);
  if (!selectedFood||!Number.isFinite(grams)||grams<=0||grams>3000) return;
  meal.push({id:Date.now()+Math.random(),food:selectedFood,grams,values:portionValues(selectedFood,grams)});
  renderMeal();
}
function renderMeal() {
  if (!meal.length) { mealItems.innerHTML='<p class="emptyhint">Dodaj produkty, aby zsumować posiłek.</p>'; mealTotal.textContent=''; return; }
  mealItems.innerHTML=meal.map(item=>'<div class="mealrow"><span>'+safe(item.food.name)+' · '+pl(item.grams)+' g</span><span>'+pl(item.values.kcal)+' kcal <button type="button" data-remove="'+item.id+'" aria-label="Usuń '+safe(item.food.name)+'">Usuń</button></span></div>').join('');
  const total=meal.reduce((a,item)=>({kcal:a.kcal+item.values.kcal,p:a.p+item.values.p,c:a.c+item.values.c,f:a.f+item.values.f,fiber:a.fiber+item.values.fiber}),{kcal:0,p:0,c:0,f:0,fiber:0});
  mealTotal.innerHTML='<strong>'+pl(total.kcal)+' kcal</strong><br>Białko: '+pl(total.p)+' g · Węglowodany: '+pl(total.c)+' g · Tłuszcze: '+pl(total.f)+' g · Błonnik: '+pl(total.fiber)+' g';
}
if (search) { search.addEventListener('input',()=>renderFoods(search.value)); results.addEventListener('click',event=>{const button=event.target.closest('[data-food]');if(button){const food=foods.find(item=>item.id===button.dataset.food);if(food)showFood(food);}}); mealItems.addEventListener('click',event=>{const button=event.target.closest('[data-remove]');if(button){meal=meal.filter(item=>String(item.id)!==button.dataset.remove);renderMeal();}}); document.querySelector('#clear-meal').addEventListener('click',()=>{meal=[];renderMeal();}); renderFoods(); }
const revealItems = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const observer = new IntersectionObserver(entries => entries.forEach(entry => { if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target);} }), {threshold:0.12});
  revealItems.forEach(item=>observer.observe(item));
} else revealItems.forEach(item=>item.classList.add('visible'));
