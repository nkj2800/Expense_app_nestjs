import { Body, Controller, Delete, Get, HttpCode, Param, ParseEnumPipe, ParseUUIDPipe, Post, Put } from "@nestjs/common"
import { ReportType } from "../data"
import { ReportService } from "./report.service"
import { CreateReportDto, ReportResponseDto, UpdateReportDto } from "../dto/report.dto"


@Controller('report/:type')
export class ReportController {
  constructor(private readonly reportService: ReportService) { }
  @Get()
  getAllReports(@Param('type', new ParseEnumPipe(ReportType)) type: string): ReportResponseDto[] {
    const reportType = type === 'income' ? ReportType.INCOME : ReportType.EXPENSE

    return this.reportService.getAllReports(reportType)
  }

  @Get(':id')
  getAReport(
    @Param('type', new ParseEnumPipe(ReportType)) type: string,
    @Param('id', ParseUUIDPipe) id: string
  ): ReportResponseDto {
    const reportType = type === 'income' ? ReportType.INCOME : ReportType.EXPENSE

    return this.reportService.getReportById(reportType, id)
  }

  @Post()
  createReport(
    @Body() { amount, source }: CreateReportDto,
    @Param('type', new ParseEnumPipe(ReportType)) type: string
  ): ReportResponseDto {
    const reportType = type === 'income' ? ReportType.INCOME : ReportType.EXPENSE

    return this.reportService.createReport(reportType, { amount, source })
  }

  @Put(':id')
  updateReport(
    @Param('type', new ParseEnumPipe(ReportType)) type: string,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: UpdateReportDto
  ): ReportResponseDto {
    const reportType = type === 'income' ? ReportType.INCOME : ReportType.EXPENSE

    return this.reportService.updateReport(reportType, id, body)
  }

  @HttpCode(204)
  @Delete(':id')
  removeReport(@Param('type', new ParseEnumPipe(ReportType)) type: string, @Param('id', ParseUUIDPipe) id: string) {
    const reportType = type === 'income' ? ReportType.INCOME : ReportType.EXPENSE

    return this.reportService.removeReport(reportType, id)
  }
}