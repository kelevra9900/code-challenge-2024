export const isValidObjectId = (value: unknown): boolean => {
  if (typeof value !== 'string') return false;
  return /^[0-9a-fA-F]{24}$/.test(value);
};
