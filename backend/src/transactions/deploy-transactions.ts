import { Contract, beginCell, storeStateInit, toNano } from "@ton/core";
import { storeDeploy } from "src/contracts/build/NftCollection/tact_Insurance";
import { TransactionMessageDto } from "./dto/transaction-message.dto";


export async function deployContract(id: bigint, contract: Contract) : Promise<TransactionMessageDto> {
    const payload = beginCell().store(storeDeploy({
        $$type: "Deploy",
        queryId: id,
    })).endCell()

    const stateInit = beginCell().store(storeStateInit(
        contract.init)
    ).endCell()

    return {
        messages: [{
            // Предсказанный адрес смарт-контракта
            address: contract.address.toString(), 
            // Количество валюты для оплаты газа (коммисии) траназкции 
            amount: toNano("0.03").toString(),  
            // Преобразование в формат base64           
            payload: payload.toBoc().toString("base64"),   
            // Преобразование в формат base64
            stateInit: stateInit.toBoc().toString("base64")
        }]
    }
}