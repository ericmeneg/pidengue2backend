import { createUserDTO } from '../dtos/user.dto'
import User from '../entities/user.entity'

export const  createUser = async (data: createUserDTO) => {
    const newUser = await User.create({ data })
    return { ...newUser, password: undefined}
}

export const findAllUsers = async () => {
    return User.findMany()
}

export const findUserByEmail = async (email: string) => {
    return User.findFirst({ where: { email } })
}

export const deleteUser = async (id: number) => {
    return User.delete({where: {id} })
}

export const findUserById = async (id: number) => {
    return User.findFirst({where: {id}})
}