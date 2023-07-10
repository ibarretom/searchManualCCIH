import { Request, Response } from 'express'

export class Holter {
  public handle(req: Request, res: Response) {
    return res.status(200).json({
      message:
        'I am alive - ' +
        new Intl.DateTimeFormat('pt-br', {
          year: 'numeric',
          month: 'numeric',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
          second: 'numeric',
          hour12: false,
          timeZone: 'America/Sao_Paulo',
        }).format(new Date()),
    })
  }
}
