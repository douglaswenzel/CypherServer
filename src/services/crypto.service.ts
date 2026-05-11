export function caesarCipher(
  text: string,
  shift: number
): string {
  const alphabet =
    'abcdefghijklmnopqrstuvwxyz0123456789'.split(
      ''
    );

  return text
    .toLowerCase()
    .split('')
    .map(char => {
      const index = alphabet.indexOf(char);

      if (index === -1) {
        return char;
      }

      let newIndex =
        (index + shift) % alphabet.length;

      if (newIndex < 0) {
        newIndex += alphabet.length;
      }

      return alphabet[newIndex];
    })
    .join('');
}