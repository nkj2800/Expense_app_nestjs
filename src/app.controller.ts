import { Controller, Delete, Get, Post, Put } from "@nestjs/common"

@Controller('report/:type')
export class AppController {
  @Get()
  getAllReports() {
    return []
  }

  @Get(':id')
  getAReport() {
    return {}
  }

  @Post()
  createReport() {
    return "Created"
  }

  @Put(':id')
  updateReport() {
    return "Updated"
  }

  @Delete(':id') 
  removeReport() {
    return "Deleted"
  }
}