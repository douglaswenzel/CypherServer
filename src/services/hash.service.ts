import { generateHash } from '../utils/generateHash';

export function createUniqueHash(): string {
  return generateHash();
}