import { Controller, Get, Res } from '@nestjs/common';
import { join } from 'path';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  @Get('/*')
  showMenu(@Res() res: Response) {
    res.sendFile(join(__dirname, '../..', 'public/index.html')),
      function (err) {
        if (err) {
          res.status(500).send(err);
        }
      };
  }
}
