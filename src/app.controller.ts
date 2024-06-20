import { Body, Controller, Delete, Get, HttpCode, Param, ParseEnumPipe, ParseUUIDPipe, Post, Put } from "@nestjs/common"
import { ReportType } from "./data"
import { AppService } from "./app.service"
import { CreateReportDto, ReportResponseDto, UpdateReportDto } from "./dto/report.dto"


@Controller('report/:type')
export class AppController {
  constructor(private readonly appService: AppService) { }
  @Get()
  getAllReports(@Param('type', new ParseEnumPipe(ReportType)) type: string): ReportResponseDto[] {
    const reportType = type === 'income' ? ReportType.INCOME : ReportType.EXPENSE

    return this.appService.getAllReports(reportType)
  }

  @Get(':id')
  getAReport(
    @Param('type', new ParseEnumPipe(ReportType)) type: string,
    @Param('id', ParseUUIDPipe) id: string
  ): ReportResponseDto {
    const reportType = type === 'income' ? ReportType.INCOME : ReportType.EXPENSE

    return this.appService.getReportById(reportType, id)
  }

  @Post()
  createReport(
    @Body() { amount, source }: CreateReportDto,
    @Param('type', new ParseEnumPipe(ReportType)) type: string
  ): ReportResponseDto {
    const reportType = type === 'income' ? ReportType.INCOME : ReportType.EXPENSE

    return this.appService.createReport(reportType, { amount, source })
  }

  @Put(':id')
  updateReport(
    @Param('type', new ParseEnumPipe(ReportType)) type: string,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: UpdateReportDto
  ): ReportResponseDto {
    const reportType = type === 'income' ? ReportType.INCOME : ReportType.EXPENSE

    return this.appService.updateReport(reportType, id, body)
  }

  @HttpCode(204)
  @Delete(':id')
  removeReport(@Param('type', new ParseEnumPipe(ReportType)) type: string, @Param('id', ParseUUIDPipe) id: string) {
    const reportType = type === 'income' ? ReportType.INCOME : ReportType.EXPENSE

    return this.appService.removeReport(reportType, id)
  }
}