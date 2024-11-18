import { Request, Response } from 'express'
import { createUserService, deleteUserService, findAllUsersService, authenticateUserService } from '../services/user.service'

export const createUser = async (req: Request, res: Response) => {
    try {
        const user = await createUserService(req.body)
        return res.status(201).json(user)
    } catch {
        return res.status(400).json({ message: Error })
    }
}

export const authenticateUser = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(400).json({ message: 'Email e senha são obrigatórios' })
        }
        const token = await authenticateUserService(email, password)
        return res.status(200).json({ token })
    } catch (error) {
        return res.status(400).json({ message: error })
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
        return res.status(400).json({ message: error })
    }
}