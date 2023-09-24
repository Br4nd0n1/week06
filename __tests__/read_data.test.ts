import {describe, expect, test} from '@jest/globals';
import { getIdList} from '../lib/read_data';
const JSON_FILE = "lieutenant.json";

describe('Check People', () => {
  test('There are 8 People', () => {
    expect(getIdList(JSON_FILE).length).toBe(8);
  });
});