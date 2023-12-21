import { ApiProperty } from "@nestjs/swagger";

export class jsonRoyaltyParams {
    @ApiProperty({type: Number, example: "11", description: "Процент роялти (11*100 / denominator(1000) = 1.1%)"})
    numerator: number;

    @ApiProperty({type: Number, example: "1000", description: "Количество знаков после запятой для сохранения, Например 1000 сохраняет 1 знак"})
    denominator: number;

    @ApiProperty({type: String, example: "EQCA14o1-VWhS2efqoh_9M1b_A9DtKTuoqfmkn83AbJzwnPi", description: "Адрес получателя роялти"})
    destination: string;
}

export class jsonNftCollectionDataDto {
    @ApiProperty({type: String, example: "Valton Collection", description: "Название НФТ коллекции (на английском)"})
    name: string;

    @ApiProperty({type: String, example: "Best collection on TON", description: "Описание НФТ коллекции (на английском)"})
    description: string;

    @ApiProperty({type: String, example: "https://valton.fun/imgs/coolection/Valton_Collection.png", description: "Веб путь до аватара"})
    image: string;

    @ApiProperty({required: false, nullable: true, type: String, example: "https://valton.fun/imgs/coolection/Valton_Collection_banner.png", description: "Веб путь до баннера"})
    cover_image: string | null;

    @ApiProperty({required: false, nullable: true, type: String, example: "https://valton.fun/", description: "Основная сыллка"})
    external_link: string | null;
    @ApiProperty({required: false, nullable: true, type: String, example: "https://t.me/valton_nft", description: "Основная сыллка?"})
    external_url : string | null;

    @ApiProperty({required: false, nullable: true, type: [String], example: "[https://t.me/valton_nft, https://t.me/yaebaldocki]", description: "Основная сыллка?"})
    social_links: string[] | null;

    @ApiProperty({required: false, nullable: true, type: String, example: "valton", description: "Место создание коллекции"})
    marketplace: string | null;
    
    marketplace_info: any | null;
}

export class CreateNftCollectionInitInfoDto {
    @ApiProperty({type: jsonRoyaltyParams, description: "Параметры роялти"})
    royalty: jsonRoyaltyParams;

    @ApiProperty({type: jsonNftCollectionDataDto, description: "Информация о коллекции"})
    content: jsonNftCollectionDataDto;

    @ApiProperty({type: String, example: "default", description: "Тип коллекции", default: "default"})
    type: string;
    
    @ApiProperty({type: String,  example: "EQCA14o1-VWhS2efqoh_9M1b_A9DtKTuoqfmkn83AbJzwnPi", description: "Адрес владельца"})
    address_owner: string;

    @ApiProperty({type: String, required: false, description: "Свой json для content пользователя"})
    content_url: string | null;
}