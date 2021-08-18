import { Body, Controller, Get, HttpStatus, Param, Post, Res, Patch, Delete, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { User } from './interfaces/user.interface';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/list')
    getUserList(@Res() res) {
        return this.appService.getList().then((data)=>{
            return res.status(HttpStatus.OK).json(data);
        })
        .catch((error)=>{
            return res.json(error);
        });
    }

    @Get('/:id')
    getUser(
        @Res() res,
        @Param('id') orderId: string
    ) {
        this.appService.get(orderId).then((data)=>{
            return res.status(HttpStatus.OK).json(data);
        })
        .catch((error)=>{
            return res.json(error);
        })
    }

    @Post()
    createUser(
        @Res() res,
        @Body() order: User
    ){
        this.appService.create(order).then((data)=>{
            return res.status(HttpStatus.OK).json(data);
        })
        .catch((error)=>{
            return res.json(error);
        })
    }

    @Patch('/:id')
    updateUser(
        @Res() res, 
        @Param('id') orderId: string,
        @Body() order: User
    ){
        this.appService.update(orderId,order).then((data)=>{
            return res.status(HttpStatus.OK).json(data);
        })
        .catch((error)=>{
            return res.json(error);
        })
    }

    @Delete('/:id')
    deleteUser(
        @Res() res,
        @Param('id') orderId: string
    ) {
        this.appService.delete(orderId).then((data)=>{
            return res.status(HttpStatus.OK).json(data);
        })
        .catch((error)=>{
            return res.json(error);
        })
    }
}
