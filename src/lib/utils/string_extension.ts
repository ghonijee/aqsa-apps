function hasValue(this: string): boolean {
  return this?.trim().length > 0 || this !== null;
}
