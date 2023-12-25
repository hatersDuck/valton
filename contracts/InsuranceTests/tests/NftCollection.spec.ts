import { Blockchain, SandboxContract, SmartContract, TreasuryContract, } from '@ton-community/sandbox';
import { toNano, beginCell, Address, Cell, contractAddress, SenderArguments, Slice } from 'ton-core';


import { NftCollection, InsuranceData, Transfer } from '../wrappers/NftCollection';
import { Insurance } from '../wrappers/Insurance';
import { NftItem } from '../wrappers/NftItem';

import '@ton-community/test-utils';

describe('NftCollection', () => {
    const OFFCHAIN_CONTENT_PREFIX = 0x01;
    const COUNT_USERS: number = 10;
    const string_first = "https://meta.valton.fun/nft_collections/test_collection/meta_data.json";
    let blockchain: Blockchain;


    let newContent = beginCell().storeInt(OFFCHAIN_CONTENT_PREFIX, 8).storeStringRefTail(string_first).endCell();

    let nftCollection: SandboxContract<NftCollection>;
    let insurance: SandboxContract<Insurance>;
    let deployer: SandboxContract<TreasuryContract>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();
        deployer = await blockchain.treasury('deployer');

        nftCollection = blockchain.openContract(
            await NftCollection.fromInit(deployer.address, newContent, {
                $$type: "RoyaltyParams",
                numerator: 350n,
                denominator: 1000n,
                destination: deployer.address,
            })
        );
        // Шаг 1
        let deployResult = await nftCollection.send(
            deployer.getSender(),
            {
                value: toNano('0.05'),
            },
            {
                $$type: 'Deploy',
                queryId: 0n,
            }
        );
        // Шаг 2
        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: nftCollection.address,
            deploy: true,
            success: true,
        });

        insurance = blockchain.openContract(
            await Insurance.fromInit(nftCollection.address)
        );
        // Шаг 3
        deployResult = await insurance.send(
            deployer.getSender(),
            {
                value: toNano('0.05'),
            },
            {
                $$type: 'Deploy',
                queryId: 0n,
            }
        );
        // Шаг 4
        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: insurance.address,
            deploy: true,
            success: true,
        });
        // Шаг 5
        expect((await nftCollection.getInsuranceAddress()).toString()).toEqual(insurance.address.toString())
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and nftCollection are ready to use
    });


    it("First", async () => {
        console.log("Insurance address: " + (insurance.address));
        console.log("Insurance data: " + (await insurance.getInsuranceData()))
        // Шаг 5
        expect((await nftCollection.getInsuranceAddress()).toString()).toEqual(insurance.address.toString())
    });

    it("should Mint", async () => {
        const user = await blockchain.treasury("first");
        const deploy_result = await nftCollection.send(user.getSender(),
            {
                value: toNano("1")
            },
            "Mint"
        );
        expect(deploy_result.transactions).toHaveTransaction({
            from: user.address,
            to: nftCollection.address,
            success: true
        });
        expect((await nftCollection.getRoyaltyParams()).numerator).toEqual(350n);
    });

    it("should prohibit others from voting", async () => {
        const user = await blockchain.treasury("0");
        const another_user = await blockchain.treasury("1");

        await nftCollection.send(
            user.getSender(),
            {
                value: toNano("1")
            },
            "Mint"
        );
        const address_mint_nft = contractAddress(0, await nftCollection.getGetNftItemInit(0n));
        const mint_nft = blockchain.openContract(NftItem.fromAddress(address_mint_nft));

        const before = await mint_nft.getVoted();
        await mint_nft.send(
            another_user.getSender(),
            {
                value: toNano("1")
            },
            "Vote"
        );
        const after = await mint_nft.getVoted();
        expect(before).toEqual(after)
    });

    it("should vote scam confirmed", async () => {
        const user = await blockchain.treasury("confirmed");
        // Шаг 1
        await nftCollection.send(
            user.getSender(),
            {
                value: toNano("1")
            },
            "Mint"
        );
        const address_mint_nft = contractAddress(0, await nftCollection.getGetNftItemInit(0n));
        const mint_nft = blockchain.openContract(NftItem.fromAddress(address_mint_nft));
        // Шаг 2
        let before_info = await nftCollection.getScamInfo()
        // Шаг 3
        await mint_nft.send(
            user.getSender(),
            {
                value: toNano("0.08")
            },
            "Vote"
        );
        // Шаг 4
        let after_info = await nftCollection.getScamInfo();
        expect(before_info.count_votes + 1n).toEqual(after_info.count_votes);
        expect(after_info.per_fill).toBeGreaterThan(before_info.per_fill);
        // Шаг 5
        before_info = after_info;
        // Шаг 6
        await mint_nft.send(
            user.getSender(),
            {
                value: toNano("1")
            },
            "Vote"
        );
        // Шаг 7
        after_info = await nftCollection.getScamInfo();
        expect(before_info.count_votes - 1n).toEqual(after_info.count_votes);
        expect(after_info.per_fill).toBeLessThan(before_info.per_fill);
    });

    it("should collection scam confirmed", async () => {
        const user = await blockchain.treasury("confirmed");

        for (let i = 0; i < COUNT_USERS; i++) {
            // Шаг 1
            const user = await blockchain.treasury("confirmed" + i.toString());
            await nftCollection.send(
                user.getSender(),
                {
                    value: toNano("1")
                },
                "Mint"
            );

            const address_mint_nft = contractAddress(0, await nftCollection.getGetNftItemInit(BigInt(i)));
            const mint_nft = blockchain.openContract(NftItem.fromAddress(address_mint_nft))
            // Шаг 2
            const transact = await mint_nft.send(
                user.getSender(),
                {
                    value: toNano("0.1")
                },
                "Vote"
            );
        }
        // Шаг 3
        expect((await nftCollection.getScamInfo()).scam).toEqual(true)
    });

    it("should insurance pay", async () => {
        const user = await blockchain.treasury("confirmed");

        await insurance.send(deployer.getSender(), {
            value: toNano("100")
        }, null)

        for (let i = 0; i < COUNT_USERS; i++) {
            await nftCollection.send(
                user.getSender(),
                {
                    value: toNano("0.2")
                },
                "Mint"
            );
        }

        for (let i = 0; i < COUNT_USERS; i++) {
            const address_mint_nft = contractAddress(0, await nftCollection.getGetNftItemInit(BigInt(i)));
            const mint_nft = blockchain.openContract(NftItem.fromAddress(address_mint_nft))

            await mint_nft.send(
                user.getSender(),
                {
                    value: toNano("0.2")
                },
                "Vote"
            );
        }

        for (let i = 0; i < COUNT_USERS; i++) {
            const address_mint_nft = contractAddress(0, await nftCollection.getGetNftItemInit(BigInt(i)));
            const mint_nft = blockchain.openContract(NftItem.fromAddress(address_mint_nft));
            // Шаг 2
            const transact = await mint_nft.send(
                user.getSender(), {
                value: toNano("0.2")
            },
                {
                    $$type: "Transfer",
                    query_id: 0n,
                    new_owner: nftCollection.address,
                    response_destination: user.address,
                    forward_amount: toNano("0.05"),
                    forward_payload: beginCell().storeInt(BigInt(i), 255).endCell(),
                    custom_payload: null
                });
        }
        // Шаг 3
        expect(await insurance.getBalance()).toEqual(0n)
    });

    it("should withdraw all coins", async () => {
        await insurance.send(deployer.getSender(), {
            value: toNano("999999")
        }, null);
        expect(await insurance.getBalance()).toBeGreaterThan(0n);
        // Шаг 1
        while (await insurance.getTimeLeft() >= 0) {
            await new Promise(resolve => setTimeout(resolve, 5000));
        }

        const before_balance_deployer = await deployer.getBalance();
        // Шаг 2
        const transact = await insurance.send(
            deployer.getSender(),
            { value: toNano("0.05") },
            "withdraw all"
        )
        const after_balance_deployer = await deployer.getBalance();

        // Шаг 3
        expect(before_balance_deployer).toBeLessThan(after_balance_deployer);
        expect(await insurance.getBalance()).toEqual(0n);
        expect((await nftCollection.getScamInfo()).contract_end).toEqual(true);
    }, 60 * 1000);
});
