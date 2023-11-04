import { Blockchain, SandboxContract } from '@ton-community/sandbox';
import { toNano } from 'ton-core';
import { Insurance } from '../wrappers/Insurance';
import '@ton-community/test-utils';
import { sleep } from '@ton-community/blueprint';

describe('Insurance', () => {
    let blockchain: Blockchain;
    let insurance: SandboxContract<Insurance>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();
        const deployer = await blockchain.treasury('deployer');

        insurance = blockchain.openContract(await Insurance.fromInit(deployer.address));

    
        const deployResult = await insurance.send(
            deployer.getSender(),
            {
                value: toNano('0.05'),
            },
            {
                $$type: 'Deploy',
                queryId: 0n,
            }
        );

        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: insurance.address,
            deploy: true,
            success: true,
        });
        
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and insurance are ready to use
    });
});
