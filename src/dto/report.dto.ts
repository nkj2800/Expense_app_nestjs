import { IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString} from "class-validator"



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