import { createRandomMatrix } from "./random.js";
import { evolvePopulation } from "./evolution.js";
import { fitness, pickBest } from "./operations.js";
import { same } from "./tools.js";

let population = createRandomMatrix(5000, 20);
let bestFitnessAchieved = false;
let previousBest = null;

while (!bestFitnessAchieved) {
  population = evolvePopulation(population, 0.4);

  const best = pickBest(...population);
  const bestFitness = fitness(best);

  if (bestFitness.toFixed(2) == 0.0) bestFitnessAchieved = true;

  if (!same(previousBest, best)) {
    previousBest = best;
    postMessage(best);
  }
}
