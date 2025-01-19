import { nanoid } from 'nanoid';

export function generateUUID(size: number = 21): string {
  return nanoid(size);
}

export function generateShortUUID(): string {
  return nanoid(10);
}
