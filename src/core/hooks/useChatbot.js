const ROUND = 100;
const generations = [];
const tokens = ["hello", "hi", "how", "are", "you"];
const KEYWORD = "hello";
const rates = {
  hello: 1.0,
  hi: 0.8,
  how: 0.5,
  are: 0.3,
  you: 0.7,
};

export function generateBrain() {
  const brain = {};
  for (let j = 0; j < tokens.length; j++) {
    const token = tokens[j];
    const score = Math.random();
    brain[token] = score;
  }
  for (let i = 0; i < ROUND; i++) {
    generations.push(brain);
  }
}

export function training() {
  let highestScore = 0;
  let best = -1;
  let second = -1;
  for (let i = 0; i < generations.length; i++) {
    const generation = generations[i];
    if (generation[KEYWORD] > highestScore) {
      second = best;
      highestScore = generation[KEYWORD];
      best = i;
    }
  }

  if (best !== -1) {
    const a = generations[best];
    console.log({ a });
    // const b = generations[best];
  }
}

export function run() {
  generateBrain();
  training();
}
