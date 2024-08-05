import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileResolver } from './profile.resolver';
import { PrismaModule } from './prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [ProfileService, ProfileResolver],
})
export class ProfileModule {}
