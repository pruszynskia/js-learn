// Task 1
// `==` vs `===`
const values = [0, "0", false, "", null, undefined, [], {}];

for (let i = 0; i < values.length; i++) {
  for (let j = 0; j < values.length; j++) {
    if (values[i] == values[j]) {
      console.log("==", values[i], values[j]);
    }
    if (values[i] === values[j]) {
      console.log("===", values[i], values[j]);
    }
  }
}

// ### 🎯 Twoje zadania

// 1. Wypisz przypadki, które Cię zaskoczyły.
// 2. Dlaczego `"" == false` daje taki wynik?
// 3. Dlaczego `[] == false` też jest `true`?
// 4. W jakiej realnej sytuacji `==` może wygenerować bug w formularzu?

// 👉 Spróbuj napisać prostą funkcję walidującą input z formularza i zobacz, co się stanie przy `==`.
function isValid(value) {
  return value === false;
}

// Task2
// `null` vs `undefined`

function getUserAge(user) {
  return user.age;
}

const user1 = {};
const user2 = { age: null };

console.log(getUserAge(user1));
console.log(getUserAge(user2));

// ### 🎯 Pytania

// 1. Która wartość oznacza „nie ustawiono”? undefined
// 2. Która oznacza „celowo brak wartości”? null
// 3. Jak API powinno zwracać brak danych?
// 4. Jak odróżnić je w bezpieczny sposób?

// 👉 Zaimplementuj funkcję `isValueMissing(value)`.
function isValueMissing(value) {
  return value === null || value === undefined; // value == null
}

// Task 3
// (`bind`, `call`, `apply`);

const user = {
  name: "Andrzej",
  greet() {
    console.log("Hello " + this.name);
  },
};

const greet = user.greet;

greet(); // ?

// ### 🎯 Zadania

// 1. Dlaczego to nie działa? this === undefined
// 2. Jak to naprawić używając:

//    * call
// greet.call(user)
//    * apply
// greet.apply(user)
//    * bind
// const bound = greet.bind(user)
// bound()
// 3. Które z nich zmienia `this` natychmiast, a które zwraca nową funkcję?
// bind is giving new function

// 👉 Dodaj `setTimeout(user.greet, 1000)` i napraw kontekst.
setTimeout(user.greet.bind(user), 1000);

// ---

// ## 4️⃣ Closure

// ### 📁 Zadanie — prywatny licznik

function createCounter() {
  let count = 0;

  return {
    increment() {
      count++;
    },
    getValue() {
      return count;
    },
  };
}

const counter = createCounter();
counter.increment();
counter.increment();
console.log(counter.getValue());

// ### 🎯 Pytania

// 1. Dlaczego `count` nie jest dostępny z zewnątrz? because of scope of createCounter function

// 2. Co się stanie, gdy stworzysz dwa liczniki?
const c1 = createCounter();
const c2 = createCounter();
// now we have 2 separate counters
// 3. Gdzie w React używasz closure (hint: useEffect, event handlers)?

// 👉 Spróbuj zepsuć closure w pętli `for` z `var`.
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0);
}
// 3 3 3
// ---

// ---

// ## 5️⃣ Event Loop

// ### 📁 Zadanie

console.log("1");

setTimeout(() => console.log("2"), 0);

Promise.resolve().then(() => console.log("3"));

console.log("4");

// ### 🎯

// 1. W jakiej kolejności się wykona?
// 1, 4, 3, 2
// 2. Dlaczego Promise wykonuje się przed setTimeout? Promise = microtask, setTimeout = macrotask, event loop
// 3. Co to jest microtask queue?

// 👉 Dodaj kilka Promise i setTimeout i narysuj kolejność wykonania.

// ---

// ## 6️⃣ React.Fragment — po co?

// ### 📁 Symulacja

// Napisz funkcję:

function render() {
  return ["<div>Header</div>", "<div>Content</div>"];
}

// ### 🎯

// 1. Dlaczego React kiedyś wymagał wrappera?
// 2. Jakie problemy w DOM powoduje dodatkowy div?
// another node
// 3. Kiedy Fragment poprawia strukturę HTML?

// ---
