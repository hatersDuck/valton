import { address, toNano } from 'ton-core';
import { Insurance } from '../wrappers/Insurance';
import { NetworkProvider } from '@ton-community/blueprint';

export async function run(provider: NetworkProvider) {
    const insurance = provider.open(await Insurance.fromInit(address("EQAOQdwdw8kGftJCSFgOErM1mBjYPe4DBPq8-AhF6vr9si5N")));

    await insurance.send(
        provider.sender(),
        {
            value: toNano('0.05'),
        },
        {
            $$type: 'Deploy',
            queryId: 0n,
        }
    );

    await provider.waitForDeploy(insurance.address);

    // run methods on `insurance`
}
