import { FitonAddress } from "src/fiton/fiton.address";
import { TransactionCreateMessageDto } from "./dto/transaction-create-message.dto";



export function validTransactionCreateMessageDto(dto: TransactionCreateMessageDto){
    // Throw Неверный адрес
    dto.address = FitonAddress.validStringAddress(dto.address);
    
    return dto
}