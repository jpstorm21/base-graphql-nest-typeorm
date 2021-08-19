import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { UserData, User, UserDataEdit } from 'src/graphql.schema';
import { Repository, EntityRepository } from 'typeorm';
import { Users } from '../entities/users.entity';
import { encryptPassword } from '../utils/bcrypt';

@Injectable()
@EntityRepository(Users)
export class UsersRepository extends Repository<Users> {
    public async getUsers(): Promise<User[]> {
        try {
            return this.find({
                where: { deletedAt: null }
            });
        } catch (error) {
            throw error;
        }
    }

    public async insertUser(userData: UserData): Promise<User> {
        try {
            const { name, rut, password, email, phone } = userData;

            const [passwordHash, passworSalt] = await encryptPassword(password);

            const user = new Users();
            user.name = name;
            user.email = email;
            user.phone = phone;
            user.rut = rut;
            user.password = passwordHash;
            user.passwordSalt = passworSalt;
            user.state = true;

            return await user.save();
        } catch (error) {
            throw error;
        }
    }

    public async getUserById(id: string): Promise<User> {
        try {
            return await this.findOne({
                where: { id: id, deletedAt: null },
            });
        } catch (error) {
            throw error;
        }
    }

    public async deleteUser(id: string): Promise<User> {
        const user = await this.getUserById(id);

        if (!user) {
            throw new HttpException(`Usuario con id=${id} no existe`, HttpStatus.BAD_REQUEST);
        }

        user.deletedAt = new Date();
        await this.save(user);
        return user;
    }

    public async editUser(id: string, userData: UserDataEdit): Promise<User> {
        const user = await this.getUserById(id);

        if (!user) {
            throw new HttpException(`Usuario con id=${id} no existe`, HttpStatus.BAD_REQUEST);
        }

        const { name, rut, email, phone } = userData;

        user.name = name;
        user.email = email;
        user.phone = phone;
        user.rut = rut;

        await this.save(user);

        return user;
    }

}
