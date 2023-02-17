import { JWT_SECRET } from '../config/config';
import { GenerateKeyPair } from '../service/tokens';
import jwt from 'jsonwebtoken';

test('jwt generation', () => {
    const pair = GenerateKeyPair("test")

    expect(pair.access).not.toBeUndefined()
    expect(pair.refresh).not.toBeUndefined()

    expect(pair.access).not.toBeNull()
    expect(pair.refresh).not.toBeNull()

    expect(pair.access).not.toEqual("")
    expect(pair.refresh).not.toEqual("")

    const decoded_access = jwt.verify(pair.access, JWT_SECRET) as any

    expect(decoded_access).not.toBeUndefined()
    expect(decoded_access).not.toBeNull()
    expect(decoded_access).not.toEqual("")
    expect(decoded_access).toHaveProperty("username")
    expect(decoded_access).toHaveProperty("exp")
    expect(decoded_access).toHaveProperty("iat")
    expect(decoded_access).toHaveProperty("type")
    expect(decoded_access.username).toEqual("test")

    const decoded_refresh = jwt.verify(pair.refresh, JWT_SECRET) as any

    expect(decoded_refresh).not.toBeUndefined()
    expect(decoded_refresh).not.toBeNull()
    expect(decoded_refresh).not.toEqual("")
    expect(decoded_refresh).toHaveProperty("username")
    expect(decoded_refresh).toHaveProperty("exp")
    expect(decoded_refresh).toHaveProperty("iat")
    expect(decoded_refresh).toHaveProperty("type")
    expect(decoded_refresh.username).toEqual("test")
})