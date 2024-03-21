export const removeNonNumericAndSplit = (input: string, size: number): string[] => {
  const numericOnly = input.replace(/\D/g, '');

  const chunks: string[] = [];
  for (let i = 0; i < numericOnly.length; i += size) {
      chunks.push(numericOnly.substring(i, i + size));
  }

  return chunks;
}