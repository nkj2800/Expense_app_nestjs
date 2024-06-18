
export enum ReportType {
  INCOME = 'income',
  EXPENSE = 'expense'
}

export const data: Data = {
  report: [
    {
      id: 'id1',
      source: 'salary',
      amount: 15000,
      created_at: new Date(),
      updated_at: new Date(),
      type: ReportType.INCOME
    },
    {
      id: 'id2',
      source: 'tax',
      amount: 1000,
      created_at: new Date(),
      updated_at: new Date(),
      type: ReportType.EXPENSE
    },
    {
      id: 'id3',
      source: 'tutoring',
      amount: 5000,
      created_at: new Date(),
      updated_at: new Date(),
      type: ReportType.INCOME
    },
    {
      id: 'id4',
      source: 'food',
      amount: 5000,
      created_at: new Date(),
      updated_at: new Date(),
      type: ReportType.EXPENSE
    }
  ]
}

interface Data {
  report: {
    id: string
    source: string
    amount: number
    created_at: Date
    updated_at: Date
    type: ReportType
  }[]
}

