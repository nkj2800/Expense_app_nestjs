import { Injectable } from '@nestjs/common'
import { v4 as uuid } from 'uuid'
import { data, ReportType } from './data'

interface Report {
  amount: number
  source: string
}

interface UpdateReport {
  amount?: number
  source?: string
}

@Injectable()
export class AppService {
  getAllReports(type: ReportType) {
    return data.report.filter(report => report.type === type)
  }

  getReportById(type: ReportType, id: string) {
    return data.report
      .filter(report => report.type === type)
      .find(report => report.id === id)
  }

  createReport(type: ReportType, { amount, source }: Report) {
    const newReport = {
      id: uuid(),
      amount,
      source,
      created_at: new Date(),
      updated_at: new Date(),
      type
    }

    data.report.push(newReport)

    return data.report
  }

  updateReport(type: ReportType, id: string, body: UpdateReport) {
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

    return data.report[index]
  }

  removeReport(type: ReportType, id: string) {
    const report = data.report
      .filter(report => report.type === type)
      .find(report => report.id === id)

    if (!report) return

    const index = data.report.indexOf(report)
    return data.report.splice(index, 1)
  }
}