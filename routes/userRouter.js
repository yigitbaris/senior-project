import { Router } from 'express'
import {
  getApplicationStats,
  getCurrentUser,
  updateUser,
  nobetAta,
} from '../controllers/userController.js'
import { validateUpdateUserInput } from '../middleware/validationMiddleware.js'
import {
  authorizePermissions,
  checkForTestUser,
} from '../middleware/authMiddleware.js'
import upload from '../middleware/multerMiddleware.js'
const router = Router()

router.get('/current-user', getCurrentUser)
router.get('/admin/app-stats', [
  authorizePermissions('admin'),
  getApplicationStats,
])
//nöbet atamalık route
router.get('/admin/nobet-ata', [authorizePermissions('admin'), nobetAta])

router.patch(
  '/update-user',
  checkForTestUser,
  upload.single('avatar'),
  validateUpdateUserInput,
  updateUser
)

export default router
