import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { AuthPrismaService } from './prisma.service';
import { JwtService } from '@nestjs/jwt';

describe('AuthService', () => {
  let service: AuthService;
  let prismaService: AuthPrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: AuthPrismaService,
          useValue: {
            user: {
              findUnique: jest.fn(),
              create: jest.fn(),
              update: jest.fn(),
              delete: jest.fn(),
            },
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    prismaService = module.get<AuthPrismaService>(AuthPrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // Add more test cases for each method in AuthService
});
