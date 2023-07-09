import { compareSync } from 'bcryptjs'
import { NextFunction, Request, Response } from 'express'

export function AuthMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { user, password } = req.headers

  if (!user || !password) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  if (user !== process.env.ADMIN_USER) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  const correctPass = process.env.ADMIN_PASSWORD as string

  if (!compareSync(password as string, correctPass)) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  return next()
}
