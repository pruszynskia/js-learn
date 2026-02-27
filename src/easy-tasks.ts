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
// ## 8️⃣ Arrow vs function

const obj = {
  name: "Andrzej",
  normal() {
    console.log(this.name);
  },
  arrow: () => {
    console.log(this.name);
  },
};

obj.normal();
obj.arrow();

// ### 🎯

// 1. Dlaczego arrow nie działa? arrow dont has its own this
// 2. Kiedy arrow jest lepszy? // when we dont need this
// 3. Dlaczego w klasowych komponentach Reacta był problem z this?

// ---
// ---

// ## 9️⃣ useEffect / useMemo / useCallback (symulacja)

// ### 📁 Zadanie — drogie obliczenie

function expensiveCalculation(n) {
  console.log("Calculating...");
  return n * 2;
}

// ### 🎯

// 1. Kiedy wywoływać to tylko raz?
// 2. Jak zaimplementować prostą memoizację?
function memoize(fn) {
  const cache = {};
  return function (arg) {
    if (cache[arg]) return cache[arg];
    const result = fn(arg);
    cache[arg] = result;
    return result;
  };
}
// 3. Dlaczego useCallback pomaga przy child komponentach?

// ---

// ## 🔟 Prop Drilling vs Context

// ### 📁 Symulacja

function App() {
  const user = { name: "Andrzej" };
  return ComponentA(user);
}

function ComponentA(user) {
  return ComponentB(user);
}

function ComponentB(user) {
  console.log(user.name);
}

// ### 🎯

// 1. Dlaczego to jest problem?
// 2. Jak byś zrobił globalny store w czystym JS?
// 3. Jakie są wady globalnego obiektu?

// ---

// # 🧠 Algorytmiczne

// ---

// ## 11️⃣ Memoizacja

// ### 📁 Zadanie

function slowSquare(n) {
  console.log("computing...");
  return n * n;
}

// ### 🎯

// 1. Jak zapamiętać wynik?
function memize(fn) {
  const cache = {}; // here we push result
  return function (n) {
    if (n in cache) {
      return cache[n]; // here we get value from memory
    }
    const result = fn(n);
    cache[n] = result; // here we assign result
    return result;
  };
}
// 2. Co jeśli argumentów jest wiele?
function memoize(fn) {
  const cache = new Map();
  return function (...args) {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      return cache.get(key);
    }
    const result = fn(...args);
    cache.set(key, result);
    return result;
  };
}
// 3. Jak rozwiązać problem z obiektami jako argument?
memoizedFn({ a: 1 });
memoizedFn({ a: 1 });
// 2 separate objects
// 👉 Napisz `memoize(fn)`.
function memoize(fn) {
  const cache = {};
  return function (arg) {
    if (cache[arg] !== undefined) {
      return cache[arg];
    }
    const result = fn(arg);
    result = cache[arg];
    return result;
  };
}

// ---

// ## 12️⃣ Implementacja sleep

// ### 📁 Zadanie

// Zaimplementuj:

sleep(1000).then(() => console.log("Done"));

// ### 🎯

// 1. Czym jest Promise?

// 2. Jak użyć setTimeout w środku?
function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
// 3. Jak obsłużyć async/await?
async function example() {
  console.log("start");
  await sleep(2000);
  console.log("after 2 sec");
}
example();
// ---

// Zrób mini system cache API w jednym pliku:

function createApiCache({ ttl = 5000 } = {}) {
  const cache = new Map();

  return async function fetchData(url) {
    const now = Date.now();
    const cached = cache.get(url);

    // 🔹 1. Jeśli mamy cache i nie wygasł → zwracamy ten sam Promise
    if (cached && now - cached.timestamp < ttl) {
      return cached.promise;
    }

    // 🔹 2. Tworzymy nowy request
    const promise = fetch(url)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Request failed");
        }
        return res.json();
      })
      .then((data) => {
        return data;
      })
      .catch((err) => {
        // 🔹 3. Jeśli request się nie uda → usuwamy z cache
        cache.delete(url);
        throw err;
      });

    // 🔹 4. Zapisujemy Promise OD RAZU (ważne dla równoległych requestów)
    cache.set(url, {
      promise,
      timestamp: now,
    });

    return promise;
  };
}

// ========================
// 🔥 Użycie
// ========================

const fetchData = createApiCache({ ttl: 5000 });

fetchData("/users").then(console.log);
fetchData("/users").then(console.log);

// Wymagania:

// * drugie wywołanie nie może robić requestu
// * cache ma wygasać po 5 sekundach
// * obsłuż równoległe requesty

// To łączy:

// * closure
// * memoizację
// * Promise
// * event loop
// * praktyczne myślenie frontendowe
