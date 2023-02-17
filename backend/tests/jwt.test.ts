import { GenerateKeyPair } from '../service/tokens';

test('jwt generation', () => {
    const jwt = GenerateKeyPair("test")
    expect(jwt.access).not.toBeUndefined()
})