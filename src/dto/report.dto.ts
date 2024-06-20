import { Exclude, Expose } from "class-transformer"
import { IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString} from "class-validator"
import { ReportType } from "src/data"



export class CreateReportDto {
  @IsNumber()
  @IsPositive()
  amount: number

  @IsNotEmpty()
  @IsString()
  source: string
}


export class UpdateReportDto {
  @IsNumber()
  @IsPositive()
  @IsOptional()
  amount: number

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  source: string
}


export class ReportResponseDto {
  id: string
  source: string
  amount: number

  @Exclude()
  created_at: Date

  @Expose({name: "createdAt"})
  transformCreatedAt() {
    return this.created_at
  }

  @Exclude()
  updated_at: Date

  type: ReportType

  constructor(partial: Partial<ReportResponseDto>) {
    Object.assign(this, partial)
  }
}