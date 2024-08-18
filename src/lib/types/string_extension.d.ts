export function hasValue(): boolean {
  return this?.trim().length > 0 && this !== null && this !== undefined;
}

declare global {
  interface String {
    hasValue: boolean;
  }
}

String.prototype.hasValue = hasValue;
