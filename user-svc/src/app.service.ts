import { Model } from 'mongoose';
import { Inject,Injectable, NotFoundException } from '@nestjs/common';
import { User } from './interfaces/user.interface';

@Injectable()
export class AppService {
  constructor(@Inject('USER_MODEL') private userModel: Model<User>) {}

  async getList(): Promise<User[]> {
    return this.userModel.find().exec();
}

  async get(userId: string): Promise<User> {
    const user = await this.userModel
    .findById({ _id: userId })
    .exec()

    if(!user){
        throw new NotFoundException('User #${userId} not found');
    }

    return user;
}

async create(user: User): Promise<User> {
    const newUser = new this.userModel(user);
    return newUser.save();
}

async update(userId: string, user: User): Promise<User> {
    const currentUser = await this.userModel.findByIdAndUpdate({
        _id: userId
    },user);

    if(!currentUser)
        throw new NotFoundException('User #${userId} not found');

    return currentUser;
}

async delete(userId: string): Promise<User> {
    const deleteUser = await this.userModel
    .findByIdAndDelete({ _id: userId })
    .exec()

    if(!deleteUser){
        throw new NotFoundException('User #${userId} not found');
    }

    return deleteUser;
}
}
