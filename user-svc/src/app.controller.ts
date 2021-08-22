import { Body, Controller, Get, HttpStatus, Param, Post, Res, Patch, Delete, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { User } from './interfaces/user.interface';

@Controller('user')
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
        @Param('id') userId: string
    ) {
        this.appService.get(userId).then((data)=>{
            return res.status(HttpStatus.OK).json(data);
        })
        .catch((error)=>{
            return res.json(error);
        })
    }

    @Post()
    createUser(
        @Res() res,
        @Body() user: User
    ){
        this.appService.create(user).then((data)=>{
            return res.status(HttpStatus.OK).json(data);
        })
        .catch((error)=>{
            return res.json(error);
        })
    }

    @Patch('/:id')
    updateUser(
        @Res() res, 
        @Param('id') userId: string,
        @Body() user: User
    ){
        this.appService.update(userId,user).then((data)=>{
            return res.status(HttpStatus.OK).json(data);
        })
        .catch((error)=>{
            return res.json(error);
        })
    }

    @Delete('/:id')
    deleteUser(
        @Res() res,
        @Param('id') userId: string
    ) {
        this.appService.delete(userId).then((data)=>{
            return res.status(HttpStatus.OK).json(data);
        })
        .catch((error)=>{
            return res.json(error);
        })
    }
}
