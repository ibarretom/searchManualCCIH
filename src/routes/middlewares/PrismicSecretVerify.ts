import { compareSync } from 'bcryptjs'
import { NextFunction, Request, Response } from 'express'

export function PrismicSecretVerify(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { secret } = req.body

  if (
    !compareSync(
      `${secret}${process.env.PRISMIC_WEBHOOK_PRIVATE_KEY}`,
      `${process.env.PRISMIC_WEBHOOK_SECRET}`
    )
  ) {
    return res.status(401).json({ message: 'Unauthorized' })
  }

  next()
}
