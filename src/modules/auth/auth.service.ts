import { Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InputLogin } from 'src/graphql.schema';
import { verifyPassword } from '../../utils/bcrypt';
import { UsersRepository } from '../../repository/users.repository';

@Injectable()
export class AuthService {
    private logger: Logger = new Logger(AuthService.name);

    constructor(
        @InjectRepository(UsersRepository) private usersRepository: UsersRepository,
    ) { }

    async login(params: InputLogin): Promise<any> {
        try {
            this.logger.debug(`login with params= ${JSON.stringify(params)}`);
            const { rut, password } = params;

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

            const user = await this.usersRepository.findOne({
                where: { rut: rut }
            })

            if (!user) {
                throw new HttpException(
                    `Users with rut=${rut} not exists`,
                    HttpStatus.BAD_REQUEST,
                );
            }

            const matchPassword = await verifyPassword(password, user.password);

            if (matchPassword) {
                delete user.password;
                delete user.passwordSalt;
                return user;
            } else {
                throw new HttpException(
                    `Rut or password incorrect`,
                    HttpStatus.BAD_REQUEST,
                );
            }
        } catch (error) {
            throw error;
        }
    }
}
