import { Request, Response } from 'express'
import { createUserService, deleteUserService, findAllUsersService } from '../services/user.service'

export const createUser = async (req: Request, res: Response) => {
    try {
        const user = await createUserService(req.body)
        return res.status(201).json(user)
    } catch {
        return res.status(400).json( { message: Error } )
    }
} 

export const findAllUsers = async (req: Request, res: Response) => {
    const users = await findAllUsersService()
    return res.status(200).json(users)
}

export const deleteUser = async (req: Request, res: Response) => {
    try {
        await deleteUserService(Number(req.params.id))
        return res.status(204).send()
    } catch (error) {
        return res.status(400).json({message: error})
    }
}