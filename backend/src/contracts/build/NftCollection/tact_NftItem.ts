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

 type NftItem_init_args = {
    $$type: 'NftItem_init_args';
    collection_address: Address;
    item_index: bigint;
    owner: Address;
    individual_content: Cell;
    editor: Address;
}

function initNftItem_init_args(src: NftItem_init_args) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeAddress(src.collection_address);
        b_0.storeInt(src.item_index, 257);
        b_0.storeAddress(src.owner);
        b_0.storeRef(src.individual_content);
        let b_1 = new Builder();
        b_1.storeAddress(src.editor);
        b_0.storeRef(b_1.endCell());
    };
}

async function NftItem_init(collection_address: Address, item_index: bigint, owner: Address, individual_content: Cell, editor: Address) {
    const __code = Cell.fromBase64('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');
    const __system = Cell.fromBase64('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');
    let builder = beginCell();
    builder.storeRef(__system);
    builder.storeUint(0, 1);
    initNftItem_init_args({ $$type: 'NftItem_init_args', collection_address, item_index, owner, individual_content, editor })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}

const NftItem_errors: { [key: number]: { message: string } } = {
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

const NftItem_types: ABIType[] = [
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

const NftItem_getters: ABIGetter[] = [
    {"name":"get_nft_data","arguments":[],"returnType":{"kind":"simple","type":"GetNftData","optional":false}},
    {"name":"voted","arguments":[],"returnType":{"kind":"simple","type":"bool","optional":false}},
    {"name":"owner","arguments":[],"returnType":{"kind":"simple","type":"address","optional":false}},
]

const NftItem_receivers: ABIReceiver[] = [
    {"receiver":"internal","message":{"kind":"typed","type":"Transfer"}},
    {"receiver":"internal","message":{"kind":"typed","type":"GetStaticData"}},
    {"receiver":"internal","message":{"kind":"typed","type":"TransferEditorship"}},
    {"receiver":"internal","message":{"kind":"typed","type":"UpdateNftContent"}},
    {"receiver":"internal","message":{"kind":"typed","type":"Deploy"}},
    {"receiver":"internal","message":{"kind":"text","text":"Vote"}},
    {"receiver":"internal","message":{"kind":"typed","type":"VoteScamClient"}},
]

export class NftItem implements Contract {
    
    static async init(collection_address: Address, item_index: bigint, owner: Address, individual_content: Cell, editor: Address) {
        return await NftItem_init(collection_address, item_index, owner, individual_content, editor);
    }
    
    static async fromInit(collection_address: Address, item_index: bigint, owner: Address, individual_content: Cell, editor: Address) {
        const init = await NftItem_init(collection_address, item_index, owner, individual_content, editor);
        const address = contractAddress(0, init);
        return new NftItem(address, init);
    }
    
    static fromAddress(address: Address) {
        return new NftItem(address);
    }
    
    readonly address: Address; 
    readonly init?: { code: Cell, data: Cell };
    readonly abi: ContractABI = {
        types:  NftItem_types,
        getters: NftItem_getters,
        receivers: NftItem_receivers,
        errors: NftItem_errors,
    };
    
    private constructor(address: Address, init?: { code: Cell, data: Cell }) {
        this.address = address;
        this.init = init;
    }
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: Transfer | GetStaticData | TransferEditorship | UpdateNftContent | Deploy | 'Vote' | VoteScamClient) {
        
        let body: Cell | null = null;
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Transfer') {
            body = beginCell().store(storeTransfer(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'GetStaticData') {
            body = beginCell().store(storeGetStaticData(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'TransferEditorship') {
            body = beginCell().store(storeTransferEditorship(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'UpdateNftContent') {
            body = beginCell().store(storeUpdateNftContent(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Deploy') {
            body = beginCell().store(storeDeploy(message)).endCell();
        }
        if (message === 'Vote') {
            body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'VoteScamClient') {
            body = beginCell().store(storeVoteScamClient(message)).endCell();
        }
        if (body === null) { throw new Error('Invalid message type'); }
        
        await provider.internal(via, { ...args, body: body });
        
    }
    
    async getGetNftData(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('get_nft_data', builder.build())).stack;
        const result = loadTupleGetNftData(source);
        return result;
    }
    
    async getVoted(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('voted', builder.build())).stack;
        let result = source.readBoolean();
        return result;
    }
    
    async getOwner(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('owner', builder.build())).stack;
        let result = source.readAddress();
        return result;
    }
    
}