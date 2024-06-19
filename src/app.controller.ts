import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put } from "@nestjs/common"
import { data, ReportType } from "./data"
import { AppService } from "./app.service"

@Controller('report/:type')
export class AppController {
  constructor(private readonly appService: AppService) { }
  @Get()
  getAllReports(@Param('type') type: string) {
    const reportType = type === 'income' ? ReportType.INCOME : ReportType.EXPENSE

    return this.appService.getAllReports(reportType)
  }

  @Get(':id')
  getAReport(
    @Param('type') type: string,
    @Param('id') id: string
  ) {
    const reportType = type === 'income' ? ReportType.INCOME : ReportType.EXPENSE

    return this.appService.getReportById(reportType, id)
  }

  @Post()
  createReport(
    @Body() { amount, source }: { amount: number, source: string },
    @Param('type') type: string
  ) {
    const reportType = type === 'income' ? ReportType.INCOME : ReportType.EXPENSE

    return this.appService.createReport(reportType, { amount, source })
  }

  @Put(':id')
  updateReport(
    @Param('type') type: string,
    @Param('id') id: string,
    @Body() body: { amount: number, source: string }
  ) {
    const reportType = type === 'income' ? ReportType.INCOME : ReportType.EXPENSE

    return this.appService.updateReport(reportType, id, body)
  }

  @HttpCode(204)
  @Delete(':id')
  removeReport(@Param('type') type: string, @Param('id') id: string) {
    const reportType = type === 'income' ? ReportType.INCOME : ReportType.EXPENSE
    
    return this.appService.removeReport(reportType, id)
  }
}