import { describe, it, expect } from 'vitest';
import { filterRecords } from './filterRecords';

describe('filterRecords — Search Function', () => {
  const sampleRecords = [
    { id: 1, name: 'Keyboard' },
    { id: 2, name: 'Monitor' },
    { id: 3, name: 'Mouse' }
  ];

  it('returns matching records when keyword matches', () => {
    const result = filterRecords(sampleRecords, 'key');
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('Keyboard');
  });

  it('ignores letter case and trims spaces', () => {
    const result = filterRecords(sampleRecords, '  MONITOR  ');
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('Monitor');
  });
});