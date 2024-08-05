import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsString, MinLength } from 'class-validator';

@InputType()
export class RegisterDto {
  @Field()
  @IsEmail()
  email: string;

  @Field()
  @IsString()
  @MinLength(6)
  password: string;

  @Field()
  @IsString()
  name: string;
}

@InputType()
export class LoginDto {
  @Field()
  @IsEmail()
  email: string;

  @Field()
  @IsString()
  password: string;
}
