import { ApiProperty } from "@nestjs/swagger";

export class CreateGratzInitInfoDto{
    @ApiProperty({type: String, example: "EQCA14o1-VWhS2efqoh_9M1b_A9DtKTuoqfmkn83AbJzwnPi", description: "Адрес страховки"})
    address_to: string;
}