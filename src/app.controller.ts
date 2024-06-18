import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put } from "@nestjs/common"
import { data, ReportType } from "./data"
import { v4 as uuid } from 'uuid'

@Controller('report/:type')
export class AppController {
  @Get()
  getAllReports(@Param('type') type: string) {
    const reportType = type === 'income' ? ReportType.INCOME : ReportType.EXPENSE

    return data.report.filter(report => report.type === reportType)
  }

  @Get(':id')
  getAReport(
    @Param('type') type: string,
    @Param('id') id: string
  ) {
    const reportType = type === 'income' ? ReportType.INCOME : ReportType.EXPENSE

    return data.report
      .filter(report => report.type === reportType)
      .find(report => report.id === id)
  }

  @Post()
  createReport(@Body() { amount, source }: { amount: number, source: string }, @Param('type') type: string) {
    const newReport = {
      id: uuid(),
      amount,
      source,
      created_at: new Date(),
      updated_at: new Date(),
      type: type === 'income' ? ReportType.INCOME : ReportType.EXPENSE
    }

    data.report.push(newReport)

    return data.report
  }

  @Put(':id')
  updateReport(
    @Param('type') type: string,
    @Param('id') id: string,
    @Body() body: { amount: number, source: string }) {
    const reportType = type === 'income' ? ReportType.INCOME : ReportType.EXPENSE

    const report = data.report
      .filter(report => report.type === reportType)
      .find(report => report.id === id)

    if (report) {
      const index = data.report.indexOf(report)

      data.report[index] = {
        ...data.report[index]
        , ...body
      }

      data.report[index].updated_at = new Date()

      return data.report[index]
    }

    return
  }

  @HttpCode(204)
  @Delete(':id')
  removeReport(@Param('type') type: string, @Param('id') id: string) {
    const reportType = type === 'income' ? ReportType.INCOME : ReportType.EXPENSE

    const report = data.report
      .filter(report => report.type === reportType)
      .find(report => report.id === id)

    if (report) {
      const index = data.report.indexOf(report)
      return data.report.splice(index, 1)
    }
 
    return
  }
}