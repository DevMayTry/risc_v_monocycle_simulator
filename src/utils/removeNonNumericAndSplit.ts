export const removeNonNumericAndSplit = (input: string, size: number): string[] => {
  // Remove all non-numeric characters
  const numericOnly = input.replace(/\D/g, '');

  // Split the string into chunks of size characters
  const chunks: string[] = [];
  for (let i = 0; i < numericOnly.length; i += size) {
      chunks.push(numericOnly.substring(i, i + size));
  }

  return chunks;
}