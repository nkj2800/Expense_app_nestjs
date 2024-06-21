import { Module } from '@nestjs/common';
import { SummaryController } from './summary.controller';
import { SummaryService } from './summary.service';
import { ReportModule } from 'src/report/report.module';

@Module({
  imports: [ReportModule], // everything that is exported from the reportmodule will be accessible, we dont have to manually import every single services.
  controllers: [SummaryController],
  providers: [SummaryService]
})
export class SummaryModule {}
