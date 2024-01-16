import { 
    Cell,
    Slice, 
    Address, 
    Builder, 
    beginCell, 
    ComputeError, 
    TupleItem, 
    TupleReader, 
    Dictionary, 
    contractAddress, 
    ContractProvider, 
    Sender, 
    Contract, 
    ContractABI, 
    ABIType,
    ABIGetter,
    ABIReceiver,
    TupleBuilder,
    DictionaryValue
} from '@ton/core';

export type StateInit = {
    $$type: 'StateInit';
    code: Cell;
    data: Cell;
}

export function storeStateInit(src: StateInit) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeRef(src.code);
        b_0.storeRef(src.data);
    };
}

export function loadStateInit(slice: Slice) {
    let sc_0 = slice;
    let _code = sc_0.loadRef();
    let _data = sc_0.loadRef();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function loadTupleStateInit(source: TupleReader) {
    let _code = source.readCell();
    let _data = source.readCell();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function storeTupleStateInit(source: StateInit) {
    let builder = new TupleBuilder();
    builder.writeCell(source.code);
    builder.writeCell(source.data);
    return builder.build();
}

function dictValueParserStateInit(): DictionaryValue<StateInit> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeStateInit(src)).endCell());
        },
        parse: (src) => {
            return loadStateInit(src.loadRef().beginParse());
        }
    }
}

export type Context = {
    $$type: 'Context';
    bounced: boolean;
    sender: Address;
    value: bigint;
    raw: Cell;
}

export function storeContext(src: Context) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeBit(src.bounced);
        b_0.storeAddress(src.sender);
        b_0.storeInt(src.value, 257);
        b_0.storeRef(src.raw);
    };
}

export function loadContext(slice: Slice) {
    let sc_0 = slice;
    let _bounced = sc_0.loadBit();
    let _sender = sc_0.loadAddress();
    let _value = sc_0.loadIntBig(257);
    let _raw = sc_0.loadRef();
    return { $$type: 'Context' as const, bounced: _bounced, sender: _sender, value: _value, raw: _raw };
}

function loadTupleContext(source: TupleReader) {
    let _bounced = source.readBoolean();
    let _sender = source.readAddress();
    let _value = source.readBigNumber();
    let _raw = source.readCell();
    return { $$type: 'Context' as const, bounced: _bounced, sender: _sender, value: _value, raw: _raw };
}

function storeTupleContext(source: Context) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.bounced);
    builder.writeAddress(source.sender);
    builder.writeNumber(source.value);
    builder.writeSlice(source.raw);
    return builder.build();
}

function dictValueParserContext(): DictionaryValue<Context> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeContext(src)).endCell());
        },
        parse: (src) => {
            return loadContext(src.loadRef().beginParse());
        }
    }
}

export type SendParameters = {
    $$type: 'SendParameters';
    bounce: boolean;
    to: Address;
    value: bigint;
    mode: bigint;
    body: Cell | null;
    code: Cell | null;
    data: Cell | null;
}

export function storeSendParameters(src: SendParameters) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeBit(src.bounce);
        b_0.storeAddress(src.to);
        b_0.storeInt(src.value, 257);
        b_0.storeInt(src.mode, 257);
        if (src.body !== null && src.body !== undefined) { b_0.storeBit(true).storeRef(src.body); } else { b_0.storeBit(false); }
        if (src.code !== null && src.code !== undefined) { b_0.storeBit(true).storeRef(src.code); } else { b_0.storeBit(false); }
        if (src.data !== null && src.data !== undefined) { b_0.storeBit(true).storeRef(src.data); } else { b_0.storeBit(false); }
    };
}

export function loadSendParameters(slice: Slice) {
    let sc_0 = slice;
    let _bounce = sc_0.loadBit();
    let _to = sc_0.loadAddress();
    let _value = sc_0.loadIntBig(257);
    let _mode = sc_0.loadIntBig(257);
    let _body = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _code = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _data = sc_0.loadBit() ? sc_0.loadRef() : null;
    return { $$type: 'SendParameters' as const, bounce: _bounce, to: _to, value: _value, mode: _mode, body: _body, code: _code, data: _data };
}

function loadTupleSendParameters(source: TupleReader) {
    let _bounce = source.readBoolean();
    let _to = source.readAddress();
    let _value = source.readBigNumber();
    let _mode = source.readBigNumber();
    let _body = source.readCellOpt();
    let _code = source.readCellOpt();
    let _data = source.readCellOpt();
    return { $$type: 'SendParameters' as const, bounce: _bounce, to: _to, value: _value, mode: _mode, body: _body, code: _code, data: _data };
}

function storeTupleSendParameters(source: SendParameters) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.bounce);
    builder.writeAddress(source.to);
    builder.writeNumber(source.value);
    builder.writeNumber(source.mode);
    builder.writeCell(source.body);
    builder.writeCell(source.code);
    builder.writeCell(source.data);
    return builder.build();
}

function dictValueParserSendParameters(): DictionaryValue<SendParameters> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeSendParameters(src)).endCell());
        },
        parse: (src) => {
            return loadSendParameters(src.loadRef().beginParse());
        }
    }
}

export type Deploy = {
    $$type: 'Deploy';
    queryId: bigint;
}

export function storeDeploy(src: Deploy) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2490013878, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadDeploy(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2490013878) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    return { $$type: 'Deploy' as const, queryId: _queryId };
}

function loadTupleDeploy(source: TupleReader) {
    let _queryId = source.readBigNumber();
    return { $$type: 'Deploy' as const, queryId: _queryId };
}

function storeTupleDeploy(source: Deploy) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

function dictValueParserDeploy(): DictionaryValue<Deploy> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeDeploy(src)).endCell());
        },
        parse: (src) => {
            return loadDeploy(src.loadRef().beginParse());
        }
    }
}

export type DeployOk = {
    $$type: 'DeployOk';
    queryId: bigint;
}

export function storeDeployOk(src: DeployOk) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2952335191, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadDeployOk(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2952335191) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    return { $$type: 'DeployOk' as const, queryId: _queryId };
}

function loadTupleDeployOk(source: TupleReader) {
    let _queryId = source.readBigNumber();
    return { $$type: 'DeployOk' as const, queryId: _queryId };
}

function storeTupleDeployOk(source: DeployOk) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

function dictValueParserDeployOk(): DictionaryValue<DeployOk> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeDeployOk(src)).endCell());
        },
        parse: (src) => {
            return loadDeployOk(src.loadRef().beginParse());
        }
    }
}

export type FactoryDeploy = {
    $$type: 'FactoryDeploy';
    queryId: bigint;
    cashback: Address;
}

export function storeFactoryDeploy(src: FactoryDeploy) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1829761339, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.cashback);
    };
}

export function loadFactoryDeploy(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1829761339) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _cashback = sc_0.loadAddress();
    return { $$type: 'FactoryDeploy' as const, queryId: _queryId, cashback: _cashback };
}

function loadTupleFactoryDeploy(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _cashback = source.readAddress();
    return { $$type: 'FactoryDeploy' as const, queryId: _queryId, cashback: _cashback };
}

function storeTupleFactoryDeploy(source: FactoryDeploy) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.cashback);
    return builder.build();
}

function dictValueParserFactoryDeploy(): DictionaryValue<FactoryDeploy> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeFactoryDeploy(src)).endCell());
        },
        parse: (src) => {
            return loadFactoryDeploy(src.loadRef().beginParse());
        }
    }
}

export type ChangeOwner = {
    $$type: 'ChangeOwner';
    queryId: bigint;
    newOwner: Address;
}

export function storeChangeOwner(src: ChangeOwner) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2174598809, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.newOwner);
    };
}

export function loadChangeOwner(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2174598809) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _newOwner = sc_0.loadAddress();
    return { $$type: 'ChangeOwner' as const, queryId: _queryId, newOwner: _newOwner };
}

function loadTupleChangeOwner(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _newOwner = source.readAddress();
    return { $$type: 'ChangeOwner' as const, queryId: _queryId, newOwner: _newOwner };
}

function storeTupleChangeOwner(source: ChangeOwner) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.newOwner);
    return builder.build();
}

function dictValueParserChangeOwner(): DictionaryValue<ChangeOwner> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeChangeOwner(src)).endCell());
        },
        parse: (src) => {
            return loadChangeOwner(src.loadRef().beginParse());
        }
    }
}

export type ChangeOwnerOk = {
    $$type: 'ChangeOwnerOk';
    queryId: bigint;
    newOwner: Address;
}

export function storeChangeOwnerOk(src: ChangeOwnerOk) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(846932810, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.newOwner);
    };
}

export function loadChangeOwnerOk(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 846932810) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _newOwner = sc_0.loadAddress();
    return { $$type: 'ChangeOwnerOk' as const, queryId: _queryId, newOwner: _newOwner };
}

function loadTupleChangeOwnerOk(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _newOwner = source.readAddress();
    return { $$type: 'ChangeOwnerOk' as const, queryId: _queryId, newOwner: _newOwner };
}

function storeTupleChangeOwnerOk(source: ChangeOwnerOk) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.newOwner);
    return builder.build();
}

function dictValueParserChangeOwnerOk(): DictionaryValue<ChangeOwnerOk> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeChangeOwnerOk(src)).endCell());
        },
        parse: (src) => {
            return loadChangeOwnerOk(src.loadRef().beginParse());
        }
    }
}

export type Transfer = {
    $$type: 'Transfer';
    query_id: bigint;
    new_owner: Address;
    response_destination: Address;
    custom_payload: Cell | null;
    forward_amount: bigint;
    forward_payload: Cell;
}

export function storeTransfer(src: Transfer) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1607220500, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeAddress(src.new_owner);
        b_0.storeAddress(src.response_destination);
        if (src.custom_payload !== null && src.custom_payload !== undefined) { b_0.storeBit(true).storeRef(src.custom_payload); } else { b_0.storeBit(false); }
        b_0.storeCoins(src.forward_amount);
        b_0.storeBuilder(src.forward_payload.asBuilder());
    };
}

export function loadTransfer(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1607220500) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    let _new_owner = sc_0.loadAddress();
    let _response_destination = sc_0.loadAddress();
    let _custom_payload = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _forward_amount = sc_0.loadCoins();
    let _forward_payload = sc_0.asCell();
    return { $$type: 'Transfer' as const, query_id: _query_id, new_owner: _new_owner, response_destination: _response_destination, custom_payload: _custom_payload, forward_amount: _forward_amount, forward_payload: _forward_payload };
}

function loadTupleTransfer(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _new_owner = source.readAddress();
    let _response_destination = source.readAddress();
    let _custom_payload = source.readCellOpt();
    let _forward_amount = source.readBigNumber();
    let _forward_payload = source.readCell();
    return { $$type: 'Transfer' as const, query_id: _query_id, new_owner: _new_owner, response_destination: _response_destination, custom_payload: _custom_payload, forward_amount: _forward_amount, forward_payload: _forward_payload };
}

function storeTupleTransfer(source: Transfer) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeAddress(source.new_owner);
    builder.writeAddress(source.response_destination);
    builder.writeCell(source.custom_payload);
    builder.writeNumber(source.forward_amount);
    builder.writeSlice(source.forward_payload);
    return builder.build();
}

function dictValueParserTransfer(): DictionaryValue<Transfer> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeTransfer(src)).endCell());
        },
        parse: (src) => {
            return loadTransfer(src.loadRef().beginParse());
        }
    }
}

export type OwnershipAssigned = {
    $$type: 'OwnershipAssigned';
    query_id: bigint;
    prev_owner: Address;
    forward_payload: Cell;
}

export function storeOwnershipAssigned(src: OwnershipAssigned) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(85167505, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeAddress(src.prev_owner);
        b_0.storeBuilder(src.forward_payload.asBuilder());
    };
}

export function loadOwnershipAssigned(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 85167505) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    let _prev_owner = sc_0.loadAddress();
    let _forward_payload = sc_0.asCell();
    return { $$type: 'OwnershipAssigned' as const, query_id: _query_id, prev_owner: _prev_owner, forward_payload: _forward_payload };
}

function loadTupleOwnershipAssigned(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _prev_owner = source.readAddress();
    let _forward_payload = source.readCell();
    return { $$type: 'OwnershipAssigned' as const, query_id: _query_id, prev_owner: _prev_owner, forward_payload: _forward_payload };
}

function storeTupleOwnershipAssigned(source: OwnershipAssigned) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeAddress(source.prev_owner);
    builder.writeSlice(source.forward_payload);
    return builder.build();
}

function dictValueParserOwnershipAssigned(): DictionaryValue<OwnershipAssigned> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeOwnershipAssigned(src)).endCell());
        },
        parse: (src) => {
            return loadOwnershipAssigned(src.loadRef().beginParse());
        }
    }
}

export type Excesses = {
    $$type: 'Excesses';
    query_id: bigint;
}

export function storeExcesses(src: Excesses) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3576854235, 32);
        b_0.storeUint(src.query_id, 64);
    };
}

export function loadExcesses(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3576854235) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    return { $$type: 'Excesses' as const, query_id: _query_id };
}

function loadTupleExcesses(source: TupleReader) {
    let _query_id = source.readBigNumber();
    return { $$type: 'Excesses' as const, query_id: _query_id };
}

function storeTupleExcesses(source: Excesses) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    return builder.build();
}

function dictValueParserExcesses(): DictionaryValue<Excesses> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeExcesses(src)).endCell());
        },
        parse: (src) => {
            return loadExcesses(src.loadRef().beginParse());
        }
    }
}

export type GetStaticData = {
    $$type: 'GetStaticData';
    query_id: bigint;
}

export function storeGetStaticData(src: GetStaticData) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(801842850, 32);
        b_0.storeUint(src.query_id, 64);
    };
}

export function loadGetStaticData(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 801842850) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    return { $$type: 'GetStaticData' as const, query_id: _query_id };
}

function loadTupleGetStaticData(source: TupleReader) {
    let _query_id = source.readBigNumber();
    return { $$type: 'GetStaticData' as const, query_id: _query_id };
}

function storeTupleGetStaticData(source: GetStaticData) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    return builder.build();
}

function dictValueParserGetStaticData(): DictionaryValue<GetStaticData> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeGetStaticData(src)).endCell());
        },
        parse: (src) => {
            return loadGetStaticData(src.loadRef().beginParse());
        }
    }
}

export type TransferEditorship = {
    $$type: 'TransferEditorship';
    query_id: bigint;
    new_editor: Address;
    response_destination: Address;
    forward_amount: bigint;
    forward_payload: Cell;
}

export function storeTransferEditorship(src: TransferEditorship) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(4065598770, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeAddress(src.new_editor);
        b_0.storeAddress(src.response_destination);
        b_0.storeCoins(src.forward_amount);
        b_0.storeBuilder(src.forward_payload.asBuilder());
    };
}

export function loadTransferEditorship(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 4065598770) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    let _new_editor = sc_0.loadAddress();
    let _response_destination = sc_0.loadAddress();
    let _forward_amount = sc_0.loadCoins();
    let _forward_payload = sc_0.asCell();
    return { $$type: 'TransferEditorship' as const, query_id: _query_id, new_editor: _new_editor, response_destination: _response_destination, forward_amount: _forward_amount, forward_payload: _forward_payload };
}

function loadTupleTransferEditorship(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _new_editor = source.readAddress();
    let _response_destination = source.readAddress();
    let _forward_amount = source.readBigNumber();
    let _forward_payload = source.readCell();
    return { $$type: 'TransferEditorship' as const, query_id: _query_id, new_editor: _new_editor, response_destination: _response_destination, forward_amount: _forward_amount, forward_payload: _forward_payload };
}

function storeTupleTransferEditorship(source: TransferEditorship) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeAddress(source.new_editor);
    builder.writeAddress(source.response_destination);
    builder.writeNumber(source.forward_amount);
    builder.writeSlice(source.forward_payload);
    return builder.build();
}

function dictValueParserTransferEditorship(): DictionaryValue<TransferEditorship> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeTransferEditorship(src)).endCell());
        },
        parse: (src) => {
            return loadTransferEditorship(src.loadRef().beginParse());
        }
    }
}

export type EditorshipAssigned = {
    $$type: 'EditorshipAssigned';
    query_id: bigint;
    prev_editor: Address;
    forward_payload: Cell;
}

export function storeEditorshipAssigned(src: EditorshipAssigned) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(406669254, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeAddress(src.prev_editor);
        b_0.storeBuilder(src.forward_payload.asBuilder());
    };
}

export function loadEditorshipAssigned(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 406669254) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    let _prev_editor = sc_0.loadAddress();
    let _forward_payload = sc_0.asCell();
    return { $$type: 'EditorshipAssigned' as const, query_id: _query_id, prev_editor: _prev_editor, forward_payload: _forward_payload };
}

function loadTupleEditorshipAssigned(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _prev_editor = source.readAddress();
    let _forward_payload = source.readCell();
    return { $$type: 'EditorshipAssigned' as const, query_id: _query_id, prev_editor: _prev_editor, forward_payload: _forward_payload };
}

function storeTupleEditorshipAssigned(source: EditorshipAssigned) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeAddress(source.prev_editor);
    builder.writeSlice(source.forward_payload);
    return builder.build();
}

function dictValueParserEditorshipAssigned(): DictionaryValue<EditorshipAssigned> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeEditorshipAssigned(src)).endCell());
        },
        parse: (src) => {
            return loadEditorshipAssigned(src.loadRef().beginParse());
        }
    }
}

export type UpdateNftContent = {
    $$type: 'UpdateNftContent';
    query_id: bigint;
    new_content: Cell;
}

export function storeUpdateNftContent(src: UpdateNftContent) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3748441372, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeRef(src.new_content);
    };
}

export function loadUpdateNftContent(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3748441372) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    let _new_content = sc_0.loadRef();
    return { $$type: 'UpdateNftContent' as const, query_id: _query_id, new_content: _new_content };
}

function loadTupleUpdateNftContent(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _new_content = source.readCell();
    return { $$type: 'UpdateNftContent' as const, query_id: _query_id, new_content: _new_content };
}

function storeTupleUpdateNftContent(source: UpdateNftContent) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeCell(source.new_content);
    return builder.build();
}

function dictValueParserUpdateNftContent(): DictionaryValue<UpdateNftContent> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeUpdateNftContent(src)).endCell());
        },
        parse: (src) => {
            return loadUpdateNftContent(src.loadRef().beginParse());
        }
    }
}

export type UpdateCollectionContent = {
    $$type: 'UpdateCollectionContent';
    query_id: bigint;
    new_content: Cell;
    numerator: bigint;
    denominator: bigint;
    destination: Address;
}

export function storeUpdateCollectionContent(src: UpdateCollectionContent) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(4071324482, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeRef(src.new_content);
        b_0.storeUint(src.numerator, 16);
        b_0.storeUint(src.denominator, 16);
        b_0.storeAddress(src.destination);
    };
}

export function loadUpdateCollectionContent(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 4071324482) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    let _new_content = sc_0.loadRef();
    let _numerator = sc_0.loadUintBig(16);
    let _denominator = sc_0.loadUintBig(16);
    let _destination = sc_0.loadAddress();
    return { $$type: 'UpdateCollectionContent' as const, query_id: _query_id, new_content: _new_content, numerator: _numerator, denominator: _denominator, destination: _destination };
}

function loadTupleUpdateCollectionContent(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _new_content = source.readCell();
    let _numerator = source.readBigNumber();
    let _denominator = source.readBigNumber();
    let _destination = source.readAddress();
    return { $$type: 'UpdateCollectionContent' as const, query_id: _query_id, new_content: _new_content, numerator: _numerator, denominator: _denominator, destination: _destination };
}

function storeTupleUpdateCollectionContent(source: UpdateCollectionContent) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeCell(source.new_content);
    builder.writeNumber(source.numerator);
    builder.writeNumber(source.denominator);
    builder.writeAddress(source.destination);
    return builder.build();
}

function dictValueParserUpdateCollectionContent(): DictionaryValue<UpdateCollectionContent> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeUpdateCollectionContent(src)).endCell());
        },
        parse: (src) => {
            return loadUpdateCollectionContent(src.loadRef().beginParse());
        }
    }
}

export type ReportStaticData = {
    $$type: 'ReportStaticData';
    query_id: bigint;
    index_id: bigint;
    collection: Address;
}

export function storeReportStaticData(src: ReportStaticData) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2339837749, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeUint(src.index_id, 32);
        b_0.storeAddress(src.collection);
    };
}

export function loadReportStaticData(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2339837749) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    let _index_id = sc_0.loadUintBig(32);
    let _collection = sc_0.loadAddress();
    return { $$type: 'ReportStaticData' as const, query_id: _query_id, index_id: _index_id, collection: _collection };
}

function loadTupleReportStaticData(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _index_id = source.readBigNumber();
    let _collection = source.readAddress();
    return { $$type: 'ReportStaticData' as const, query_id: _query_id, index_id: _index_id, collection: _collection };
}

function storeTupleReportStaticData(source: ReportStaticData) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeNumber(source.index_id);
    builder.writeAddress(source.collection);
    return builder.build();
}

function dictValueParserReportStaticData(): DictionaryValue<ReportStaticData> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeReportStaticData(src)).endCell());
        },
        parse: (src) => {
            return loadReportStaticData(src.loadRef().beginParse());
        }
    }
}

export type GetRoyaltyParams = {
    $$type: 'GetRoyaltyParams';
    query_id: bigint;
}

export function storeGetRoyaltyParams(src: GetRoyaltyParams) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1765620048, 32);
        b_0.storeUint(src.query_id, 64);
    };
}

export function loadGetRoyaltyParams(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1765620048) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    return { $$type: 'GetRoyaltyParams' as const, query_id: _query_id };
}

function loadTupleGetRoyaltyParams(source: TupleReader) {
    let _query_id = source.readBigNumber();
    return { $$type: 'GetRoyaltyParams' as const, query_id: _query_id };
}

function storeTupleGetRoyaltyParams(source: GetRoyaltyParams) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    return builder.build();
}

function dictValueParserGetRoyaltyParams(): DictionaryValue<GetRoyaltyParams> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeGetRoyaltyParams(src)).endCell());
        },
        parse: (src) => {
            return loadGetRoyaltyParams(src.loadRef().beginParse());
        }
    }
}

export type ReportRoyaltyParams = {
    $$type: 'ReportRoyaltyParams';
    query_id: bigint;
    numerator: bigint;
    denominator: bigint;
    destination: Address;
}

export function storeReportRoyaltyParams(src: ReportRoyaltyParams) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2831876269, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeUint(src.numerator, 16);
        b_0.storeUint(src.denominator, 16);
        b_0.storeAddress(src.destination);
    };
}

export function loadReportRoyaltyParams(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2831876269) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    let _numerator = sc_0.loadUintBig(16);
    let _denominator = sc_0.loadUintBig(16);
    let _destination = sc_0.loadAddress();
    return { $$type: 'ReportRoyaltyParams' as const, query_id: _query_id, numerator: _numerator, denominator: _denominator, destination: _destination };
}

function loadTupleReportRoyaltyParams(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _numerator = source.readBigNumber();
    let _denominator = source.readBigNumber();
    let _destination = source.readAddress();
    return { $$type: 'ReportRoyaltyParams' as const, query_id: _query_id, numerator: _numerator, denominator: _denominator, destination: _destination };
}

function storeTupleReportRoyaltyParams(source: ReportRoyaltyParams) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeNumber(source.numerator);
    builder.writeNumber(source.denominator);
    builder.writeAddress(source.destination);
    return builder.build();
}

function dictValueParserReportRoyaltyParams(): DictionaryValue<ReportRoyaltyParams> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeReportRoyaltyParams(src)).endCell());
        },
        parse: (src) => {
            return loadReportRoyaltyParams(src.loadRef().beginParse());
        }
    }
}

export type GetNftData = {
    $$type: 'GetNftData';
    is_initialized: boolean;
    index: bigint;
    collection_address: Address;
    owner: Address;
    individual_content: Cell;
    editor: Address;
}

export function storeGetNftData(src: GetNftData) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeBit(src.is_initialized);
        b_0.storeUint(src.index, 32);
        b_0.storeAddress(src.collection_address);
        b_0.storeAddress(src.owner);
        b_0.storeRef(src.individual_content);
        b_0.storeAddress(src.editor);
    };
}

export function loadGetNftData(slice: Slice) {
    let sc_0 = slice;
    let _is_initialized = sc_0.loadBit();
    let _index = sc_0.loadUintBig(32);
    let _collection_address = sc_0.loadAddress();
    let _owner = sc_0.loadAddress();
    let _individual_content = sc_0.loadRef();
    let _editor = sc_0.loadAddress();
    return { $$type: 'GetNftData' as const, is_initialized: _is_initialized, index: _index, collection_address: _collection_address, owner: _owner, individual_content: _individual_content, editor: _editor };
}

function loadTupleGetNftData(source: TupleReader) {
    let _is_initialized = source.readBoolean();
    let _index = source.readBigNumber();
    let _collection_address = source.readAddress();
    let _owner = source.readAddress();
    let _individual_content = source.readCell();
    let _editor = source.readAddress();
    return { $$type: 'GetNftData' as const, is_initialized: _is_initialized, index: _index, collection_address: _collection_address, owner: _owner, individual_content: _individual_content, editor: _editor };
}

function storeTupleGetNftData(source: GetNftData) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.is_initialized);
    builder.writeNumber(source.index);
    builder.writeAddress(source.collection_address);
    builder.writeAddress(source.owner);
    builder.writeCell(source.individual_content);
    builder.writeAddress(source.editor);
    return builder.build();
}

function dictValueParserGetNftData(): DictionaryValue<GetNftData> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeGetNftData(src)).endCell());
        },
        parse: (src) => {
            return loadGetNftData(src.loadRef().beginParse());
        }
    }
}

export type ScamInfo = {
    $$type: 'ScamInfo';
    scam: boolean;
    contract_end: boolean;
    count_votes: bigint;
    per_fill: bigint;
}

export function storeScamInfo(src: ScamInfo) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeBit(src.scam);
        b_0.storeBit(src.contract_end);
        b_0.storeUint(src.count_votes, 32);
        b_0.storeUint(src.per_fill, 16);
    };
}

export function loadScamInfo(slice: Slice) {
    let sc_0 = slice;
    let _scam = sc_0.loadBit();
    let _contract_end = sc_0.loadBit();
    let _count_votes = sc_0.loadUintBig(32);
    let _per_fill = sc_0.loadUintBig(16);
    return { $$type: 'ScamInfo' as const, scam: _scam, contract_end: _contract_end, count_votes: _count_votes, per_fill: _per_fill };
}

function loadTupleScamInfo(source: TupleReader) {
    let _scam = source.readBoolean();
    let _contract_end = source.readBoolean();
    let _count_votes = source.readBigNumber();
    let _per_fill = source.readBigNumber();
    return { $$type: 'ScamInfo' as const, scam: _scam, contract_end: _contract_end, count_votes: _count_votes, per_fill: _per_fill };
}

function storeTupleScamInfo(source: ScamInfo) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.scam);
    builder.writeBoolean(source.contract_end);
    builder.writeNumber(source.count_votes);
    builder.writeNumber(source.per_fill);
    return builder.build();
}

function dictValueParserScamInfo(): DictionaryValue<ScamInfo> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeScamInfo(src)).endCell());
        },
        parse: (src) => {
            return loadScamInfo(src.loadRef().beginParse());
        }
    }
}

export type InternalVoteScam = {
    $$type: 'InternalVoteScam';
    query_id: bigint;
    item_index: bigint;
    voted: boolean;
    owner: Address;
}

export function storeInternalVoteScam(src: InternalVoteScam) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3694860029, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeUint(src.item_index, 64);
        b_0.storeBit(src.voted);
        b_0.storeAddress(src.owner);
    };
}

export function loadInternalVoteScam(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3694860029) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    let _item_index = sc_0.loadUintBig(64);
    let _voted = sc_0.loadBit();
    let _owner = sc_0.loadAddress();
    return { $$type: 'InternalVoteScam' as const, query_id: _query_id, item_index: _item_index, voted: _voted, owner: _owner };
}

function loadTupleInternalVoteScam(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _item_index = source.readBigNumber();
    let _voted = source.readBoolean();
    let _owner = source.readAddress();
    return { $$type: 'InternalVoteScam' as const, query_id: _query_id, item_index: _item_index, voted: _voted, owner: _owner };
}

function storeTupleInternalVoteScam(source: InternalVoteScam) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeNumber(source.item_index);
    builder.writeBoolean(source.voted);
    builder.writeAddress(source.owner);
    return builder.build();
}

function dictValueParserInternalVoteScam(): DictionaryValue<InternalVoteScam> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeInternalVoteScam(src)).endCell());
        },
        parse: (src) => {
            return loadInternalVoteScam(src.loadRef().beginParse());
        }
    }
}

export type InternalScam = {
    $$type: 'InternalScam';
    query_id: bigint;
    count_mint: bigint;
    count_votes: bigint;
}

export function storeInternalScam(src: InternalScam) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3239608065, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeUint(src.count_mint, 32);
        b_0.storeUint(src.count_votes, 32);
    };
}

export function loadInternalScam(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3239608065) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    let _count_mint = sc_0.loadUintBig(32);
    let _count_votes = sc_0.loadUintBig(32);
    return { $$type: 'InternalScam' as const, query_id: _query_id, count_mint: _count_mint, count_votes: _count_votes };
}

function loadTupleInternalScam(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _count_mint = source.readBigNumber();
    let _count_votes = source.readBigNumber();
    return { $$type: 'InternalScam' as const, query_id: _query_id, count_mint: _count_mint, count_votes: _count_votes };
}

function storeTupleInternalScam(source: InternalScam) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeNumber(source.count_mint);
    builder.writeNumber(source.count_votes);
    return builder.build();
}

function dictValueParserInternalScam(): DictionaryValue<InternalScam> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeInternalScam(src)).endCell());
        },
        parse: (src) => {
            return loadInternalScam(src.loadRef().beginParse());
        }
    }
}

export type InternalNewPer = {
    $$type: 'InternalNewPer';
    query_id: bigint;
    new_per_to_break: bigint;
}

export function storeInternalNewPer(src: InternalNewPer) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(241184145, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeUint(src.new_per_to_break, 32);
    };
}

export function loadInternalNewPer(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 241184145) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    let _new_per_to_break = sc_0.loadUintBig(32);
    return { $$type: 'InternalNewPer' as const, query_id: _query_id, new_per_to_break: _new_per_to_break };
}

function loadTupleInternalNewPer(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _new_per_to_break = source.readBigNumber();
    return { $$type: 'InternalNewPer' as const, query_id: _query_id, new_per_to_break: _new_per_to_break };
}

function storeTupleInternalNewPer(source: InternalNewPer) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeNumber(source.new_per_to_break);
    return builder.build();
}

function dictValueParserInternalNewPer(): DictionaryValue<InternalNewPer> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeInternalNewPer(src)).endCell());
        },
        parse: (src) => {
            return loadInternalNewPer(src.loadRef().beginParse());
        }
    }
}

export type InternalPay = {
    $$type: 'InternalPay';
    query_id: bigint;
    prev_owner: Address;
}

export function storeInternalPay(src: InternalPay) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(4181564411, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeAddress(src.prev_owner);
    };
}

export function loadInternalPay(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 4181564411) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    let _prev_owner = sc_0.loadAddress();
    return { $$type: 'InternalPay' as const, query_id: _query_id, prev_owner: _prev_owner };
}

function loadTupleInternalPay(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _prev_owner = source.readAddress();
    return { $$type: 'InternalPay' as const, query_id: _query_id, prev_owner: _prev_owner };
}

function storeTupleInternalPay(source: InternalPay) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeAddress(source.prev_owner);
    return builder.build();
}

function dictValueParserInternalPay(): DictionaryValue<InternalPay> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeInternalPay(src)).endCell());
        },
        parse: (src) => {
            return loadInternalPay(src.loadRef().beginParse());
        }
    }
}

export type VoteScamClient = {
    $$type: 'VoteScamClient';
    query_id: bigint;
}

export function storeVoteScamClient(src: VoteScamClient) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1628042263, 32);
        b_0.storeUint(src.query_id, 64);
    };
}

export function loadVoteScamClient(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1628042263) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    return { $$type: 'VoteScamClient' as const, query_id: _query_id };
}

function loadTupleVoteScamClient(source: TupleReader) {
    let _query_id = source.readBigNumber();
    return { $$type: 'VoteScamClient' as const, query_id: _query_id };
}

function storeTupleVoteScamClient(source: VoteScamClient) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    return builder.build();
}

function dictValueParserVoteScamClient(): DictionaryValue<VoteScamClient> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeVoteScamClient(src)).endCell());
        },
        parse: (src) => {
            return loadVoteScamClient(src.loadRef().beginParse());
        }
    }
}

export type GratzWithdrawAll = {
    $$type: 'GratzWithdrawAll';
    query_id: bigint;
}

export function storeGratzWithdrawAll(src: GratzWithdrawAll) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2737621747, 32);
        b_0.storeUint(src.query_id, 64);
    };
}

export function loadGratzWithdrawAll(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2737621747) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    return { $$type: 'GratzWithdrawAll' as const, query_id: _query_id };
}

function loadTupleGratzWithdrawAll(source: TupleReader) {
    let _query_id = source.readBigNumber();
    return { $$type: 'GratzWithdrawAll' as const, query_id: _query_id };
}

function storeTupleGratzWithdrawAll(source: GratzWithdrawAll) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    return builder.build();
}

function dictValueParserGratzWithdrawAll(): DictionaryValue<GratzWithdrawAll> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeGratzWithdrawAll(src)).endCell());
        },
        parse: (src) => {
            return loadGratzWithdrawAll(src.loadRef().beginParse());
        }
    }
}

export type InsuranceData = {
    $$type: 'InsuranceData';
    nft_collection: Address;
    timestamp_end: bigint;
    per_to_break: bigint;
    frozen_coins: bigint;
    count_pays: bigint;
    scam: boolean;
}

export function storeInsuranceData(src: InsuranceData) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeAddress(src.nft_collection);
        b_0.storeUint(src.timestamp_end, 64);
        b_0.storeUint(src.per_to_break, 16);
        b_0.storeInt(src.frozen_coins, 257);
        b_0.storeInt(src.count_pays, 257);
        b_0.storeBit(src.scam);
    };
}

export function loadInsuranceData(slice: Slice) {
    let sc_0 = slice;
    let _nft_collection = sc_0.loadAddress();
    let _timestamp_end = sc_0.loadUintBig(64);
    let _per_to_break = sc_0.loadUintBig(16);
    let _frozen_coins = sc_0.loadIntBig(257);
    let _count_pays = sc_0.loadIntBig(257);
    let _scam = sc_0.loadBit();
    return { $$type: 'InsuranceData' as const, nft_collection: _nft_collection, timestamp_end: _timestamp_end, per_to_break: _per_to_break, frozen_coins: _frozen_coins, count_pays: _count_pays, scam: _scam };
}

function loadTupleInsuranceData(source: TupleReader) {
    let _nft_collection = source.readAddress();
    let _timestamp_end = source.readBigNumber();
    let _per_to_break = source.readBigNumber();
    let _frozen_coins = source.readBigNumber();
    let _count_pays = source.readBigNumber();
    let _scam = source.readBoolean();
    return { $$type: 'InsuranceData' as const, nft_collection: _nft_collection, timestamp_end: _timestamp_end, per_to_break: _per_to_break, frozen_coins: _frozen_coins, count_pays: _count_pays, scam: _scam };
}

function storeTupleInsuranceData(source: InsuranceData) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.nft_collection);
    builder.writeNumber(source.timestamp_end);
    builder.writeNumber(source.per_to_break);
    builder.writeNumber(source.frozen_coins);
    builder.writeNumber(source.count_pays);
    builder.writeBoolean(source.scam);
    return builder.build();
}

function dictValueParserInsuranceData(): DictionaryValue<InsuranceData> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeInsuranceData(src)).endCell());
        },
        parse: (src) => {
            return loadInsuranceData(src.loadRef().beginParse());
        }
    }
}

export type CollectionData = {
    $$type: 'CollectionData';
    next_item_index: bigint;
    collection_content: Cell;
    owner: Address;
}

export function storeCollectionData(src: CollectionData) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(src.next_item_index, 32);
        b_0.storeRef(src.collection_content);
        b_0.storeAddress(src.owner);
    };
}

export function loadCollectionData(slice: Slice) {
    let sc_0 = slice;
    let _next_item_index = sc_0.loadUintBig(32);
    let _collection_content = sc_0.loadRef();
    let _owner = sc_0.loadAddress();
    return { $$type: 'CollectionData' as const, next_item_index: _next_item_index, collection_content: _collection_content, owner: _owner };
}

function loadTupleCollectionData(source: TupleReader) {
    let _next_item_index = source.readBigNumber();
    let _collection_content = source.readCell();
    let _owner = source.readAddress();
    return { $$type: 'CollectionData' as const, next_item_index: _next_item_index, collection_content: _collection_content, owner: _owner };
}

function storeTupleCollectionData(source: CollectionData) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.next_item_index);
    builder.writeCell(source.collection_content);
    builder.writeAddress(source.owner);
    return builder.build();
}

function dictValueParserCollectionData(): DictionaryValue<CollectionData> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeCollectionData(src)).endCell());
        },
        parse: (src) => {
            return loadCollectionData(src.loadRef().beginParse());
        }
    }
}

export type RoyaltyParams = {
    $$type: 'RoyaltyParams';
    numerator: bigint;
    denominator: bigint;
    destination: Address;
}

export function storeRoyaltyParams(src: RoyaltyParams) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(src.numerator, 16);
        b_0.storeUint(src.denominator, 16);
        b_0.storeAddress(src.destination);
    };
}

export function loadRoyaltyParams(slice: Slice) {
    let sc_0 = slice;
    let _numerator = sc_0.loadUintBig(16);
    let _denominator = sc_0.loadUintBig(16);
    let _destination = sc_0.loadAddress();
    return { $$type: 'RoyaltyParams' as const, numerator: _numerator, denominator: _denominator, destination: _destination };
}

function loadTupleRoyaltyParams(source: TupleReader) {
    let _numerator = source.readBigNumber();
    let _denominator = source.readBigNumber();
    let _destination = source.readAddress();
    return { $$type: 'RoyaltyParams' as const, numerator: _numerator, denominator: _denominator, destination: _destination };
}

function storeTupleRoyaltyParams(source: RoyaltyParams) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.numerator);
    builder.writeNumber(source.denominator);
    builder.writeAddress(source.destination);
    return builder.build();
}

function dictValueParserRoyaltyParams(): DictionaryValue<RoyaltyParams> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeRoyaltyParams(src)).endCell());
        },
        parse: (src) => {
            return loadRoyaltyParams(src.loadRef().beginParse());
        }
    }
}

 type NftCollection_init_args = {
    $$type: 'NftCollection_init_args';
    owner: Address;
    collection_content: Cell;
    royalty_params: RoyaltyParams;
}

function initNftCollection_init_args(src: NftCollection_init_args) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeAddress(src.owner);
        b_0.storeRef(src.collection_content);
        b_0.store(storeRoyaltyParams(src.royalty_params));
    };
}

async function NftCollection_init(owner: Address, collection_content: Cell, royalty_params: RoyaltyParams) {
    const __code = Cell.fromBase64('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');
    const __system = Cell.fromBase64('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');
    let builder = beginCell();
    builder.storeRef(__system);
    builder.storeUint(0, 1);
    initNftCollection_init_args({ $$type: 'NftCollection_init_args', owner, collection_content, royalty_params })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}

const NftCollection_errors: { [key: number]: { message: string } } = {
    2: { message: `Stack undeflow` },
    3: { message: `Stack overflow` },
    4: { message: `Integer overflow` },
    5: { message: `Integer out of expected range` },
    6: { message: `Invalid opcode` },
    7: { message: `Type check error` },
    8: { message: `Cell overflow` },
    9: { message: `Cell underflow` },
    10: { message: `Dictionary error` },
    13: { message: `Out of gas error` },
    32: { message: `Method ID not found` },
    34: { message: `Action is invalid or not supported` },
    37: { message: `Not enough TON` },
    38: { message: `Not enough extra-currencies` },
    128: { message: `Null reference exception` },
    129: { message: `Invalid serialization prefix` },
    130: { message: `Invalid incoming message` },
    131: { message: `Constraints error` },
    132: { message: `Access denied` },
    133: { message: `Contract stopped` },
    134: { message: `Invalid argument` },
    135: { message: `Code of a contract was not found` },
    136: { message: `Invalid address` },
    137: { message: `Masterchain support is not enabled for this contract` },
    13808: { message: `Collection scam!` },
    14384: { message: `Only The Owner can vote` },
    38310: { message: `Only for NFT from collection` },
    44199: { message: `Time hasn't ended` },
    45947: { message: `Only for NFT collection` },
    46450: { message: `Only for Insurance contract` },
    54178: { message: `invalid amount` },
    61686: { message: `access denied` },
    62742: { message: `non-sequential NFTs` },
}

const NftCollection_types: ABIType[] = [
    {"name":"StateInit","header":null,"fields":[{"name":"code","type":{"kind":"simple","type":"cell","optional":false}},{"name":"data","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"Context","header":null,"fields":[{"name":"bounced","type":{"kind":"simple","type":"bool","optional":false}},{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"raw","type":{"kind":"simple","type":"slice","optional":false}}]},
    {"name":"SendParameters","header":null,"fields":[{"name":"bounce","type":{"kind":"simple","type":"bool","optional":false}},{"name":"to","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"mode","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"body","type":{"kind":"simple","type":"cell","optional":true}},{"name":"code","type":{"kind":"simple","type":"cell","optional":true}},{"name":"data","type":{"kind":"simple","type":"cell","optional":true}}]},
    {"name":"Deploy","header":2490013878,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"DeployOk","header":2952335191,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"FactoryDeploy","header":1829761339,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"cashback","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"ChangeOwner","header":2174598809,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"newOwner","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"ChangeOwnerOk","header":846932810,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"newOwner","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"Transfer","header":1607220500,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"new_owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"response_destination","type":{"kind":"simple","type":"address","optional":false}},{"name":"custom_payload","type":{"kind":"simple","type":"cell","optional":true}},{"name":"forward_amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"forward_payload","type":{"kind":"simple","type":"slice","optional":false,"format":"remainder"}}]},
    {"name":"OwnershipAssigned","header":85167505,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"prev_owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"forward_payload","type":{"kind":"simple","type":"slice","optional":false,"format":"remainder"}}]},
    {"name":"Excesses","header":3576854235,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"GetStaticData","header":801842850,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"TransferEditorship","header":4065598770,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"new_editor","type":{"kind":"simple","type":"address","optional":false}},{"name":"response_destination","type":{"kind":"simple","type":"address","optional":false}},{"name":"forward_amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"forward_payload","type":{"kind":"simple","type":"slice","optional":false,"format":"remainder"}}]},
    {"name":"EditorshipAssigned","header":406669254,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"prev_editor","type":{"kind":"simple","type":"address","optional":false}},{"name":"forward_payload","type":{"kind":"simple","type":"slice","optional":false,"format":"remainder"}}]},
    {"name":"UpdateNftContent","header":3748441372,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"new_content","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"UpdateCollectionContent","header":4071324482,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"new_content","type":{"kind":"simple","type":"cell","optional":false}},{"name":"numerator","type":{"kind":"simple","type":"uint","optional":false,"format":16}},{"name":"denominator","type":{"kind":"simple","type":"uint","optional":false,"format":16}},{"name":"destination","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"ReportStaticData","header":2339837749,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"index_id","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"collection","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"GetRoyaltyParams","header":1765620048,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"ReportRoyaltyParams","header":2831876269,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"numerator","type":{"kind":"simple","type":"uint","optional":false,"format":16}},{"name":"denominator","type":{"kind":"simple","type":"uint","optional":false,"format":16}},{"name":"destination","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"GetNftData","header":null,"fields":[{"name":"is_initialized","type":{"kind":"simple","type":"bool","optional":false}},{"name":"index","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"collection_address","type":{"kind":"simple","type":"address","optional":false}},{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"individual_content","type":{"kind":"simple","type":"cell","optional":false}},{"name":"editor","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"ScamInfo","header":null,"fields":[{"name":"scam","type":{"kind":"simple","type":"bool","optional":false}},{"name":"contract_end","type":{"kind":"simple","type":"bool","optional":false}},{"name":"count_votes","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"per_fill","type":{"kind":"simple","type":"uint","optional":false,"format":16}}]},
    {"name":"InternalVoteScam","header":3694860029,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"item_index","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"voted","type":{"kind":"simple","type":"bool","optional":false}},{"name":"owner","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"InternalScam","header":3239608065,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"count_mint","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"count_votes","type":{"kind":"simple","type":"uint","optional":false,"format":32}}]},
    {"name":"InternalNewPer","header":241184145,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"new_per_to_break","type":{"kind":"simple","type":"uint","optional":false,"format":32}}]},
    {"name":"InternalPay","header":4181564411,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"prev_owner","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"VoteScamClient","header":1628042263,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"GratzWithdrawAll","header":2737621747,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"InsuranceData","header":null,"fields":[{"name":"nft_collection","type":{"kind":"simple","type":"address","optional":false}},{"name":"timestamp_end","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"per_to_break","type":{"kind":"simple","type":"uint","optional":false,"format":16}},{"name":"frozen_coins","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"count_pays","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"scam","type":{"kind":"simple","type":"bool","optional":false}}]},
    {"name":"CollectionData","header":null,"fields":[{"name":"next_item_index","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"collection_content","type":{"kind":"simple","type":"cell","optional":false}},{"name":"owner","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"RoyaltyParams","header":null,"fields":[{"name":"numerator","type":{"kind":"simple","type":"uint","optional":false,"format":16}},{"name":"denominator","type":{"kind":"simple","type":"uint","optional":false,"format":16}},{"name":"destination","type":{"kind":"simple","type":"address","optional":false}}]},
]

const NftCollection_getters: ABIGetter[] = [
    {"name":"getNftItemInit","arguments":[{"name":"item_index","type":{"kind":"simple","type":"int","optional":false,"format":257}}],"returnType":{"kind":"simple","type":"StateInit","optional":false}},
    {"name":"get_collection_data","arguments":[],"returnType":{"kind":"simple","type":"CollectionData","optional":false}},
    {"name":"get_nft_address_by_index","arguments":[{"name":"item_index","type":{"kind":"simple","type":"int","optional":false,"format":257}}],"returnType":{"kind":"simple","type":"address","optional":true}},
    {"name":"get_nft_content","arguments":[{"name":"index","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"individual_content","type":{"kind":"simple","type":"cell","optional":false}}],"returnType":{"kind":"simple","type":"cell","optional":false}},
    {"name":"royalty_params","arguments":[],"returnType":{"kind":"simple","type":"RoyaltyParams","optional":false}},
    {"name":"owner","arguments":[],"returnType":{"kind":"simple","type":"address","optional":false}},
    {"name":"insurance_address","arguments":[],"returnType":{"kind":"simple","type":"address","optional":false}},
    {"name":"scam_info","arguments":[],"returnType":{"kind":"simple","type":"ScamInfo","optional":false}},
]

const NftCollection_receivers: ABIReceiver[] = [
    {"receiver":"internal","message":{"kind":"text","text":"Mint"}},
    {"receiver":"internal","message":{"kind":"typed","type":"GetRoyaltyParams"}},
    {"receiver":"internal","message":{"kind":"typed","type":"UpdateCollectionContent"}},
    {"receiver":"internal","message":{"kind":"typed","type":"Deploy"}},
    {"receiver":"internal","message":{"kind":"typed","type":"ChangeOwner"}},
    {"receiver":"internal","message":{"kind":"text","text":"InternalGratz"}},
    {"receiver":"internal","message":{"kind":"text","text":"Internal Scam"}},
    {"receiver":"internal","message":{"kind":"typed","type":"InternalVoteScam"}},
    {"receiver":"internal","message":{"kind":"typed","type":"InternalNewPer"}},
    {"receiver":"internal","message":{"kind":"typed","type":"OwnershipAssigned"}},
]

export class NftCollection implements Contract {
    
    static async init(owner: Address, collection_content: Cell, royalty_params: RoyaltyParams) {
        return await NftCollection_init(owner, collection_content, royalty_params);
    }
    
    static async fromInit(owner: Address, collection_content: Cell, royalty_params: RoyaltyParams) {
        const init = await NftCollection_init(owner, collection_content, royalty_params);
        const address = contractAddress(0, init);
        return new NftCollection(address, init);
    }
    
    static fromAddress(address: Address) {
        return new NftCollection(address);
    }
    
    readonly address: Address; 
    readonly init?: { code: Cell, data: Cell };
    readonly abi: ContractABI = {
        types:  NftCollection_types,
        getters: NftCollection_getters,
        receivers: NftCollection_receivers,
        errors: NftCollection_errors,
    };
    
    private constructor(address: Address, init?: { code: Cell, data: Cell }) {
        this.address = address;
        this.init = init;
    }
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: 'Mint' | GetRoyaltyParams | UpdateCollectionContent | Deploy | ChangeOwner | 'InternalGratz' | 'Internal Scam' | InternalVoteScam | InternalNewPer | OwnershipAssigned) {
        
        let body: Cell | null = null;
        if (message === 'Mint') {
            body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'GetRoyaltyParams') {
            body = beginCell().store(storeGetRoyaltyParams(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'UpdateCollectionContent') {
            body = beginCell().store(storeUpdateCollectionContent(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Deploy') {
            body = beginCell().store(storeDeploy(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'ChangeOwner') {
            body = beginCell().store(storeChangeOwner(message)).endCell();
        }
        if (message === 'InternalGratz') {
            body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
        }
        if (message === 'Internal Scam') {
            body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'InternalVoteScam') {
            body = beginCell().store(storeInternalVoteScam(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'InternalNewPer') {
            body = beginCell().store(storeInternalNewPer(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'OwnershipAssigned') {
            body = beginCell().store(storeOwnershipAssigned(message)).endCell();
        }
        if (body === null) { throw new Error('Invalid message type'); }
        
        await provider.internal(via, { ...args, body: body });
        
    }
    
    async getGetNftItemInit(provider: ContractProvider, item_index: bigint) {
        let builder = new TupleBuilder();
        builder.writeNumber(item_index);
        let source = (await provider.get('getNftItemInit', builder.build())).stack;
        const result = loadTupleStateInit(source);
        return result;
    }
    
    async getGetCollectionData(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('get_collection_data', builder.build())).stack;
        const result = loadTupleCollectionData(source);
        return result;
    }
    
    async getGetNftAddressByIndex(provider: ContractProvider, item_index: bigint) {
        let builder = new TupleBuilder();
        builder.writeNumber(item_index);
        let source = (await provider.get('get_nft_address_by_index', builder.build())).stack;
        let result = source.readAddressOpt();
        return result;
    }
    
    async getGetNftContent(provider: ContractProvider, index: bigint, individual_content: Cell) {
        let builder = new TupleBuilder();
        builder.writeNumber(index);
        builder.writeCell(individual_content);
        let source = (await provider.get('get_nft_content', builder.build())).stack;
        let result = source.readCell();
        return result;
    }
    
    async getRoyaltyParams(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('royalty_params', builder.build())).stack;
        const result = loadTupleRoyaltyParams(source);
        return result;
    }
    
    async getOwner(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('owner', builder.build())).stack;
        let result = source.readAddress();
        return result;
    }
    
    async getInsuranceAddress(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('insurance_address', builder.build())).stack;
        let result = source.readAddress();
        return result;
    }
    
    async getScamInfo(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('scam_info', builder.build())).stack;
        const result = loadTupleScamInfo(source);
        return result;
    }
    
}