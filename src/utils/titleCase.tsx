export const titleCase = (str: string): string => {
  const firstChar = str?.slice(0, 1).toUpperCase();
  const rest = str?.slice(1, str.length)
  return firstChar + rest || str
}
