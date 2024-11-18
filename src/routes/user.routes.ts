import { validate } from '../middlewares/validate.middleware'
import { createUserDTO } from '../dtos/user.dto'

import { Router } from 'express'
import { authenticateUser, createUser, findAllUsers } from '../controllers/user.controller'

const router = Router()

router.post('/', validate(CreateUserDTO), createUser)
router.get('/', findAllUsers)
router.patch('/:id', updateUser)
router.delete('/:id', deleteUser)
router.post('/authenticate', authenticateUser)

export default router
