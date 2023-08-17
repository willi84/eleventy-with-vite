
import { foo } from './sample';

describe('sample module', () => {
    test('sample()', () => {
      expect(foo).toEqual('ich bins');
    });
  });