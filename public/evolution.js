import { pickRandomNumber } from "./random.js";
import { mutate, crossover, pickBest } from "./operations.js";
import { same } from "./tools.js";

export const createChild = (parent1, parent2, mutationProbability) => {
  if (same(parent1, parent2)) return null;

  const crossPoint = pickRandomNumber(parent1.length);
  const child = crossover(parent1, parent2, crossPoint);
  const mutant = mutate(child, mutationProbability);

  return pickBest(parent1, parent2, child, mutant);
};

export const evolvePopulation = (population, mutationProbability) => {
  const result = [];

  const currentBest = pickBest(...population);
  const mutant = mutate(currentBest, mutationProbability);
  result.push(pickBest(currentBest, mutant));

  for (const element of population) {
    const other = population[pickRandomNumber(population.length - 1)];
    const child = createChild(element, other);

    if (child) result.push(child);
  }

  return result;
};
