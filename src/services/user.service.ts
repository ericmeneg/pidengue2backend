import { createUserDTO } from '../dtos/user.dto'
import { createUser, findAllUsers, findUserByEmail, findUserById, deleteUser } from '../repositories/user.repository'
import bcrypt from 'bcrypt'
import * as jose from 'jose'

export const createUserService = async (data: createUserDTO) => {
    const user = await findUserByEmail(data.email)

    if (user) {
        throw new Error('Usuário já existe')
    }

    const password = await bcrypt.hash(data.password, 10)

    return createUser(data)
}

export const authenticateUserService = async (email: string, password: string) => {
    const user = await findUserByEmail(email)

    if (!user) {
        throw new Error('Usuário não encontrado')
    }

    const isValid = await bcrypt.compare(password,user.password)

    if (!isValid) {
        throw new Error('Senha inválida')
    }

    const payload = {id: user.id, email: user.email}
    const secret = new TextEncoder().encode(process.env.JWT_SECRET)
    const alg = 'HS256'

    const token = await new jose.SignJWT(payload)
        .setProtectedHeader({alg})
        .setIssuedAt()
        .setIssuer('http://localhost:3001')
        .setSubject('users')
        .setExpirationTime('1h')
        .sign(secret)

        return token
}

export const findAllUsersService = async () => {
    return findAllUsers()
}

export const deleteUserService = async (id: number) {
    const user = await findUserById(id)

    if (!user) {
        throw new Error('Usuário não encontrado')
    }

    return deleteUser(id)
}