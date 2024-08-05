import { Injectable, BadRequestException, NotFoundException, UnauthorizedException, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthPrismaService } from './prisma.service';
import { RegisterDto, LoginDto } from './dto/auth.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private prisma: AuthPrismaService,
    private jwtService: JwtService
  ) {}

  async register(userData: RegisterDto) {
    this.logger.log(`Attempting to register user: ${userData.email}`);
    const existingUser = await this.prisma.user.findUnique({ where: { email: userData.email } });
    if (existingUser) {
      this.logger.warn(`Registration failed: Email ${userData.email} already in use`);
      throw new BadRequestException('Email already in use');
    }

    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const user = await this.prisma.user.create({
      data: {
        ...userData,
        password: hashedPassword,
      },
    });

    this.logger.log(`Successfully registered user: ${user.email}`);
    return { id: user.id, email: user.email, name: user.name };
  }

  async login(credentials: LoginDto) {
    this.logger.log(`Login attempt for user: ${credentials.email}`);
    const user = await this.prisma.user.findUnique({ where: { email: credentials.email } });
    if (!user) {
      this.logger.warn(`Login failed: User not found for email ${credentials.email}`);
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(credentials.password, user.password);
    if (!isPasswordValid) {
      this.logger.warn(`Login failed: Invalid password for user ${credentials.email}`);
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { sub: user.id, email: user.email };
    this.logger.log(`Successful login for user: ${user.email}`);
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async validateUser(userId: string): Promise<any> {
    this.logger.log(`Validating user with ID: ${userId}`);
    return this.prisma.user.findUnique({ where: { id: userId } });
  }

  async getUser(id: string) {
    this.logger.log(`Fetching user with ID: ${id}`);
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      this.logger.warn(`User not found for ID: ${id}`);
      throw new NotFoundException('User not found');
    }
    return { id: user.id, email: user.email, name: user.name };
  }

  async updateUser(id: string, userData: Partial<RegisterDto>) {
    this.logger.log(`Updating user with ID: ${id}`);
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      this.logger.warn(`Update failed: User not found for ID: ${id}`);
      throw new NotFoundException('User not found');
    }

    if (userData.password) {
      userData.password = await bcrypt.hash(userData.password, 10);
    }

    const updatedUser = await this.prisma.user.update({ where: { id }, data: userData });
    this.logger.log(`Successfully updated user with ID: ${id}`);
    return { id: updatedUser.id, email: updatedUser.email, name: updatedUser.name };
  }

  async deleteUser(id: string) {
    this.logger.log(`Attempting to delete user with ID: ${id}`);
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      this.logger.warn(`Delete failed: User not found for ID: ${id}`);
      throw new NotFoundException('User not found');
    }

    await this.prisma.user.delete({ where: { id } });
    this.logger.log(`Successfully deleted user with ID: ${id}`);
    return { message: 'User deleted successfully' };
  }
}
