import createUserDTO from '../DTOs/createUserDTO'
import { createUser, findAllUsers, findUserByEmail, findUserById, deleteUser } from '../repositories/user.repository'

export const createUserService = async (data: createUserDTO) => {
    const user = await findUserByEmail(data.email)

    if (user) {
        throw new Error('Usuário já existe')
    }

    return createUser(data)
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