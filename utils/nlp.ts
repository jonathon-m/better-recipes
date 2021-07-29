import { 
    NO_DEPS_ACTIONS, 
    EXTENDED_WORD_TYPES, 
    CONCURRENT_INDICATORS} from "./nlpExtensions";

const nlp = require('compromise').extend((Doc: any, world: any) => {
    /** post-process tagger */
    world.postProcess((doc: any) => {
        for (const [word, tag] of Object.entries(EXTENDED_WORD_TYPES)) {
            doc.match(word).tag(tag)
        }
    })
  });

export function getIngedientNoun(ingredient: string): string {
    const ingredientDetail = nlp(ingredient)
    return ingredientDetail.nouns().not('#Unit').normalize().text()
}

export function getDependencyNouns(instructionClause: string): Array<string> {
    if (hasNoDeps(instructionClause)) return [];
    const clauseDetail = nlp(instructionClause)
    return clauseDetail.nouns().normalize().out('array')
}

export function getInstructionVerb(instructionClause: string): string {
    const instructionDetail = nlp(instructionClause)
    const specialVerb: string = instructionDetail.match(`(${NO_DEPS_ACTIONS.join('|')})`).not('#Gerund').normalize().text()
    if (specialVerb) return specialVerb
    return instructionDetail.verbs().if('#Infinitive').text()
}

export function getInstructionClauses(instruction: string): Array<string> {
    const instructionDetail = nlp(instruction)
    return instructionDetail.clauses().if('#Infinitive').out('array')
}

export function indicatesConcurrentAction(text: string) {
    const actionDetail = nlp(text)
    return actionDetail.has(`(${CONCURRENT_INDICATORS.join('|')})`)
}

function hasNoDeps(instructionClause: string): boolean {
    return NO_DEPS_ACTIONS.reduce((prev, curr) => {
        const clauseDetail = nlp(instructionClause)
        return clauseDetail.has(curr) || prev
    }, false);
}