import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { User, AuthResponse } from './auth.types';
import { RegisterDto, LoginDto } from './dto/auth.dto';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => User)
  async register(@Args('input') input: RegisterDto) {
    return this.authService.register(input);
  }

  @Mutation(() => AuthResponse)
  async login(@Args('input') input: LoginDto) {
    return this.authService.login(input);
  }
  @Query(() => [User])
  async users() {
    return this.authService.findAllUsers();
  }
}
