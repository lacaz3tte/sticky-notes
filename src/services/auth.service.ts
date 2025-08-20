import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/user.model';
import { LoginDto, RegisterDto } from '../dtos/auth.dto';
import { BadRequestException, UnauthorizedException } from '../exceptions';

class AuthService {
  private readonly jwtSecret: string;
  private readonly jwtExpiresIn: string;

  constructor() {
    this.jwtSecret = process.env.JWT_SECRET || 'secret';
    this.jwtExpiresIn = process.env.JWT_EXPIRES_IN || '24h';
  }

  async register(data: RegisterDto) {
    const existingUser = await User.findOne({ where: { email: data.email } });
    if (existingUser) {
      throw new BadRequestException('Email already in use');
    }

    const user = await User.create(data);
    return this.generateToken(user.id, user.email);
  }

  async login(data: LoginDto) {
    const user = await User.scope('withPassword').findOne({ where: { email: data.email } });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isMatch = await user.comparePassword(data.password);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return this.generateToken(user.id, user.email);
  }

  private generateToken(userId: string, email?: string) {
    const payload = { id: userId, email };
    
    return {
      token: jwt.sign(payload, this.jwtSecret, {
        expiresIn: this.jwtExpiresIn,
      }),
      user: {
        id: userId,
        email: email
      }
    };
  }

  verifyToken(token: string) {
    return jwt.verify(token, this.jwtSecret) as { id: string; email?: string };
  }
}

export default new AuthService();