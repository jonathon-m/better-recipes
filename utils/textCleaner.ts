const badStartWords = ['and', 'then'];
const badEndWords = ['and'];
const regex = /[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g;

export function cleanLabel(text: string): string {
  const stripped = text.trim();
  const cleanString = stripped.replace(regex, '');
  return cleanString.charAt(0).toUpperCase() + cleanString.slice(1);
}

export function cleanInstructionText(text: string): string {
  const stripped = text.trim();
  const cleanString =
    stripped.slice(0, stripped.length - 1) +
    stripped.charAt(stripped.length - 1).replace(regex, '');
  const words = cleanString.split(' ');
  if (words.length > 0) {
    while (badStartWords.includes(words[0])) {
      words.shift();
    }
    while (badEndWords.includes(words[0])) {
      words.shift();
    }
  }

  let finalString = words.join(' ');
  finalString =
    finalString.charAt(0).toUpperCase() + finalString.slice(1) + '.';

  return finalString;
}
