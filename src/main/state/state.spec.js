const { encrypt, decrypt } = require('./index');

const payload = {
  a: 1,
  b: 2,
};

const key = 'this is my key';

const encrypted = '/4i5YVt2YANISN9kTRYz9A==';

describe('State encryption', () => {
  it('encrypts the state', () => {
    expect(encrypt(payload, key)).toBe(encrypted);
  });

  it('decrypts the state', () => {
    expect(decrypt(encrypted, key)).toEqual(payload);
  });

  it('throws an error if the key is invalid', () => {
    expect(() => decrypt(encrypted, 'this is an invalid key'))
      .toThrowError('error:06065064:digital envelope routines:EVP_DecryptFinal_ex:bad decrypt');
  });
});
