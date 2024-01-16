import { Controller, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiProperty, ApiTags } from '@nestjs/swagger';
import { Cell } from '@ton/core';

@ApiTags("Контракты")
@Controller('contracts')
export class ContractsController {

    @ApiOperation({summary: "Просто тест функция всегда даёт рандомный ответ"})
    @Get("/test/:str")
    async testing(@Param("str") str: string){
        const cs = Cell.fromBase64(str).beginParse()
        return cs.loadUint(32);
    }
}
