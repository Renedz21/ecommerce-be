import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateAuthDto } from './dto/create-auth.dto';

import { InjectRepository } from '@nestjs/typeorm';

import * as bcrypt from 'bcrypt';

import { User } from './entities/auth.entity';
import { Repository } from 'typeorm';
import { LoginDto } from './dto/login-auth.dto';
import { UnauthorizedException } from '@nestjs/common/exceptions';
import { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    private readonly jwtService: JwtService,
  ) { }

  async create(createAuthDto: CreateAuthDto) {
    try {

      const { password, ...data } = createAuthDto;

      if (await this.userRepository.findOne({ where: { email: data.email } })) {
        throw new Error('Email already exists');
      }

      if (await this.userRepository.findOne({ where: { dni: data.dni } })) {
        throw new Error('DNI already exists');
      }

      if (password.length < 6) {
        throw new Error('Password must be at least 6 characters');
      }

      const user = this.userRepository.create({
        ...data,
        password: bcrypt.hashSync(password, 10),
      });

      await this.userRepository.save(user);

      const { password: _, ...result } = user;

      return result;

    } catch (error) {
      throw new Error(error.message);
    }
  }


  async login(createAuthDto: LoginDto) {

    try {

      const { email, password } = createAuthDto;

      const user = await this.userRepository.findOne({
        where: {
          email,
        },
        select: { email: true, password: true, name: true, id: true, isAdmin: true }
      });

      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      const isMatch = bcrypt.compareSync(password, user.password);

      if (!isMatch) {
        throw new Error('Password is incorrect');
      }

      const { password: _, ...data } = user;

      return {
        user: data,
        token: this.getJwtToken({ id: user.id, isAdmin: user.isAdmin }),
      };

    } catch (error) {
      console.log(error);
    }

  }

  async findAll() {
    return await this.userRepository.find();
  }


  private getJwtToken(payload: JwtPayload) {
    const token = this.jwtService.sign(payload);
    return token;
  }
}
