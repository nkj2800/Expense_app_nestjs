import { Injectable } from '@nestjs/common'
import { v4 as uuid } from 'uuid'
import { data, ReportType } from '../data'
import { ReportResponseDto } from '../dto/report.dto'

interface Report {
  amount: number
  source: string
}

interface UpdateReport {
  amount?: number
  source?: string
}

@Injectable()
export class ReportService {
  getAllReports(type: ReportType): ReportResponseDto[] {
    return data.report
      .filter(report => report.type === type)
      .map(report=> new ReportResponseDto(report))
  }

  getReportById(type: ReportType, id: string): ReportResponseDto {
    const report = data.report
      .filter(report => report.type === type)
      .find(report => report.id === id)

    if (!report) return

    return new ReportResponseDto(report)
  }

  createReport(type: ReportType, { amount, source }: Report): ReportResponseDto {
    const newReport = {
      id: uuid(),
      amount,
      source,
      created_at: new Date(),
      updated_at: new Date(),
      type
    }

    data.report.push(newReport)

    return new ReportResponseDto(newReport)
  }

  updateReport(type: ReportType, id: string, body: UpdateReport): ReportResponseDto {
    const report = data.report
      .filter(report => report.type === type)
      .find(report => report.id === id)

    if (!report) return

    const index = data.report.indexOf(report)

    data.report[index] = {
      ...data.report[index]
      , ...body,
      updated_at: new Date()
    }

    return new ReportResponseDto(data.report[index])
  }

  removeReport(type: ReportType, id: string) {
    const report = data.report
      .filter(report => report.type === type)
      .find(report => report.id === id)

    if (!report) return

    const index = data.report.indexOf(report)
    data.report.splice(index, 1)
  }
}