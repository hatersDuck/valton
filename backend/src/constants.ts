import * as dotenv from 'dotenv';
dotenv.config({ path: `.${process.env.NODE_ENV}.env` });

export const SEQUELIZE_PROVIDE:string = "SEQUALIZE"

export const USER_PROVIDE           :string = "USERS_TABLE"
export const INSURANCE_PROVIDE      :string = "INSURANCES_TABLE"
export const NFT_PROVIDE            :string = "NFTS_TABLE"
export const NFT_COLLECTION_PROVIDE :string = "NFT_COLLECTIONS_TABLE"

export const PATH_TO_DOCS:string = "/docs"

export const PATH_TO_TON_MANIFEST:string = "https://valton.fun/tonconnect-manifest.json"

export const TONPROOF_PAYLOAD_SIGNATURE_KEY :string = process.env.TONPROOF_PAYLOAD_SIGNATURE_KEY;
export const TONPROOF_PAYLOAD_LIFETIME_SEC  :number = +process.env.TONPROOF_PAYLOAD_LIFETIME_SEC;
export const TONPROOF_PROOF_LIFETIME_SEC    :number = +process.env.TONPROOF_PROOF_LIFETIME_SEC;
export const TONPROOF_EXAMPLE_DOMAIN        :string = process.env.TONPROOF_EXAMPLE_DOMAIN;

export const STATUS_PAYLOAD:string[]=[
    "Успешно", 
    "Попытка обмана", 
    "Попытка обмана или проблема с секретным словом", 
    "Время полезной нагрузки закончилось"
]

export const AUTH_SECRET:string = process.env.AUTH_SECRET;
export const EXPIRES_IN: string = '24h';