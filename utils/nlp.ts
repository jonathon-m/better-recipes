import { Duration } from '../models/duration';
import { Quantity } from '../models/quantity';
import {
  NO_DEPS_ACTIONS,
  EXTENDED_WORD_TYPES,
  CONCURRENT_INDICATORS,
  REPLACEMENTS,
} from './nlpExtensions';

const nlp = require('compromise');
nlp.extend(require('compromise-numbers'));
nlp.extend(require('compromise-dates'));

nlp.extend((Doc: any, world: any) => {
  /** post-process tagger */
  world.postProcess((doc: any) => {
    for (const [word, tag] of Object.entries(EXTENDED_WORD_TYPES)) {
      doc.match(word).tag(tag);
    }
    for (const [word, replacement] of Object.entries(REPLACEMENTS)) {
      doc.match(word).replaceWith(replacement);
    }
  });
});

export function getIngedientNoun(ingredient: string): string {
  const ingredientDetail = nlp(ingredient);
  return ingredientDetail.nouns().not('#Unit').normalize().text();
}

export function getDependencyNouns(instructionClause: string): Array<string> {
  if (hasNoDeps(instructionClause)) return [];
  const clauseDetail = nlp(instructionClause);
  return clauseDetail.nouns().normalize().out('array');
}

export function getInstructionVerb(instructionClause: string): string {
  const instructionDetail = nlp(instructionClause);
  const specialVerb: string = instructionDetail
    .match(`(${NO_DEPS_ACTIONS.join('|')})`)
    .not('#Gerund')
    .normalize()
    .text();
  if (specialVerb) return specialVerb;
  return instructionDetail.verbs().if('#Infinitive').text();
}

export function getInstructionTime(instructionClause: string): number {
  let duration = { hour: 0, minute: 0, second: 0 };
  const instructionDetail: Duration[] = nlp(instructionClause)
    .durations()
    .get();
  duration = {
    ...duration,
    ...(instructionDetail.length > 0 ? instructionDetail[0] : {}),
  };
  let durationNumber =
    duration.second + duration.minute * 60 + duration.hour * 60 * 60;
  return durationNumber;
}

export function getIngredientQuantity(ingredientText: string): Quantity {
  let quantity = { amount: 1, units: '' };
  const quantityDetail = nlp(ingredientText).numbers();
  const quantities = quantityDetail.json();
  if (quantities.length > 0) {
    quantity.amount = quantities[0].number;
    quantity.units = quantityDetail.units().json()[0].terms[0].text;
  }
  return quantity;
}

export function getInstructionUnits(instructionClause: string): number {
  let duration = { hour: 0, minute: 0, second: 0 };
  const instructionDetail: Duration[] = nlp(instructionClause)
    .durations()
    .get();
  duration = {
    ...duration,
    ...(instructionDetail.length > 0 ? instructionDetail[0] : {}),
  };
  let durationNumber =
    duration.second + duration.minute * 60 + duration.hour * 60 * 60;
  return durationNumber;
}

export function getInstructionClauses(instruction: string): Array<string> {
  const instructionDetail = nlp(instruction);
  return instructionDetail.clauses().if('#Infinitive').out('array');
}

function hasNoDeps(instructionClause: string): boolean {
  return NO_DEPS_ACTIONS.reduce((prev, curr) => {
    const clauseDetail = nlp(instructionClause);
    return clauseDetail.has(curr) || prev;
  }, false);
}
