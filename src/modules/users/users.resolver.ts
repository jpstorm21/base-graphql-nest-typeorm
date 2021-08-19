import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { User, UserData, UserDataEdit } from '../../graphql.schema';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../../security/guards/jwt-auth.guard';

@Resolver('Users')
export class UsersResolver {
    constructor(
        private readonly userService: UsersService
    ) {}
    
    @UseGuards(JwtAuthGuard)
    @Query('getUsers')
    async getUsers(): Promise<User[]> {
        return await this.userService.getUsers();
    }

    @Mutation('createUser')
    async createUser(@Args('input') args: UserData): Promise<User> {
        return await this.userService.createUser(args);
    }

    @Mutation('deleteUser')
    async deleteUser(@Args('id') id: string): Promise<User> {
        return await this.userService.deleteUser(id);
    }

    @Mutation('editUser')
    async editUser(@Args('id') id: string, @Args('input') args: UserDataEdit): Promise<User> {
        return await this.userService.editUser(id, args);
    }
}