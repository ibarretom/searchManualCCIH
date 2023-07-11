import { NextFunction, Request, Response } from 'express'

export function PrismicSecretVerify(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { secret } = req.body

  if (secret !== process.env.PRISMIC_WEBHOOK_SECRET) {
    return res.status(401).json({ message: 'Invalid secret' })
  }

  next()
}
