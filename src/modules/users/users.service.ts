import { Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersRepository } from '../../repository/users.repository';
import { User, UserData, UserDataEdit } from '../../graphql.schema';

@Injectable()
export class UsersService {
    private logger: Logger = new Logger(UsersService.name);

    constructor(
        @InjectRepository(UsersRepository) private usersRepository: UsersRepository,
    ) { }

    async getUsers(): Promise<User[]> {
        try {
            this.logger.debug(`getting users`);
            return await this.usersRepository.getUsers();
        } catch (error) {
            throw error;
        }
    }

    async createUser(userData: UserData): Promise<User> {
        try {
            this.logger.debug(`creating user with data=${JSON.stringify(userData)}`);
            const { name, rut, password, email, phone } = userData;

            if (!name) {
                throw new HttpException(
                    'Param name is undefined',
                    HttpStatus.BAD_REQUEST,
                );
            }

            if (!rut) {
                throw new HttpException(
                    'Param rut is undefined',
                    HttpStatus.BAD_REQUEST,
                );
            }

            if (!password) {
                throw new HttpException(
                    'Param password is undefined',
                    HttpStatus.BAD_REQUEST,
                );
            }

            if (!email) {
                throw new HttpException(
                    'Param email is undefined',
                    HttpStatus.BAD_REQUEST,
                );
            }

            if (!phone) {
                throw new HttpException(
                    'Param phone is undefined',
                    HttpStatus.BAD_REQUEST,
                );
            }

            const userByRut = await this.usersRepository.findOne({
                where: { rut: rut }
            });

            if (userByRut) {
                throw new HttpException(
                    `Users with rut ${rut} exists`,
                    HttpStatus.BAD_REQUEST,
                );
            }

            return await this.usersRepository.insertUser(userData);
        } catch (error) {
            throw error;
        }
    }

    async deleteUser(id: string): Promise<User> {
        try {
            this.logger.debug(`deleting user with id=${id}`);

            if (!id) {
                throw new HttpException(
                    'Param id is undefined',
                    HttpStatus.BAD_REQUEST,
                );
            }

            const user = await this.usersRepository.deleteUser(id);

            return user;
        } catch (error) {
            throw error;
        }
    }

    async editUser(id: string, userData: UserDataEdit): Promise<User> {
        try {
            this.logger.debug(`updating user with data=${JSON.stringify(userData)}`);
            const { name, rut, email, phone } = userData;

            if (!id) {
                throw new HttpException(
                    'Param id is undefined',
                    HttpStatus.BAD_REQUEST,
                );
            }

            if (!name) {
                throw new HttpException(
                    'Param name is undefined',
                    HttpStatus.BAD_REQUEST,
                );
            }

            if (!rut) {
                throw new HttpException(
                    'Param rut is undefined',
                    HttpStatus.BAD_REQUEST,
                );
            }

            if (!email) {
                throw new HttpException(
                    'Param email is undefined',
                    HttpStatus.BAD_REQUEST,
                );
            }

            if (!phone) {
                throw new HttpException(
                    'Param phone is undefined',
                    HttpStatus.BAD_REQUEST,
                );
            }

            const userById = await this.usersRepository.getUserById(id);

            if (!userById) {
                throw new HttpException(
                    `Usuario con id ${id} no existe`,
                    HttpStatus.BAD_REQUEST,
                );
            }

            return await this.usersRepository.editUser(id, userData);

        } catch (error) {
            throw error;
        }
    }
}
