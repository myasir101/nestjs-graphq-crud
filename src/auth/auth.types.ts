import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field(() => ID)
  id: string;

  @Field()
  email: string;

  @Field()
  name: string;
}

@ObjectType()
export class AuthResponse {
  @Field()
  access_token: string;
}
