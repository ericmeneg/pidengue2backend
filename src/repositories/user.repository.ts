import User from '../entities/user.entity'
import createUserDTO from '../DTOs/createUserDTO'

export const  createUser = async (data: createUserDTO) => {
    return User.create({data})
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