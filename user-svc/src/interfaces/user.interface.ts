import { Document } from 'mongoose';
import { IsEmail, IsNotEmpty, ValidateNested, IsNumberString, IsPhoneNumber, IsString, IsArray } from 'class-validator';
import { Type } from 'class-transformer';

class Phone{
    @IsNumberString()
    callingCode: string;

    @IsPhoneNumber()
    @IsNotEmpty()
    number: string;
}

export interface User extends Document {
    //@IsNotEmpty()
    username: string;

    //@IsEmail()
    //@IsNotEmpty()
    email: string;
    
    //@ValidateNested({ each: true })
    //@Type(() => Phone)
    phone: Object;

    //@IsString()
    //@IsArray()
    skills: string[];

   // @IsString()
    hobby: string;
}
