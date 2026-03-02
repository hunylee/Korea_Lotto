import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, MutationRef, MutationPromise } from 'firebase/data-connect';

export const connectorConfig: ConnectorConfig;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;




export interface GetLatestLottoRoundData {
  lottoRounds: ({
    drwNo: number;
    drwNoDate: string;
    totSellamnt: number;
    firstWinamnt: number;
    firstPrzwnerCo: number;
    drwtNo1: number;
    drwtNo2: number;
    drwtNo3: number;
    drwtNo4: number;
    drwtNo5: number;
    drwtNo6: number;
    bnusNo: number;
    returnValue: string;
    createdAt: DateString;
  } & LottoRound_Key)[];
}

export interface GetLottoRoundByNoData {
  lottoRound?: {
    drwNo: number;
    drwNoDate: string;
    totSellamnt: number;
    firstWinamnt: number;
    firstPrzwnerCo: number;
    drwtNo1: number;
    drwtNo2: number;
    drwtNo3: number;
    drwtNo4: number;
    drwtNo5: number;
    drwtNo6: number;
    bnusNo: number;
    returnValue: string;
    createdAt: DateString;
  } & LottoRound_Key;
}

export interface GetLottoRoundByNoVariables {
  drwNo: number;
}

export interface ListLottoRoundsData {
  lottoRounds: ({
    drwNo: number;
    drwNoDate: string;
    totSellamnt: number;
    firstWinamnt: number;
    firstPrzwnerCo: number;
    drwtNo1: number;
    drwtNo2: number;
    drwtNo3: number;
    drwtNo4: number;
    drwtNo5: number;
    drwtNo6: number;
    bnusNo: number;
    returnValue: string;
    createdAt: DateString;
  } & LottoRound_Key)[];
}

export interface LottoRound_Key {
  drwNo: number;
  __typename?: 'LottoRound_Key';
}

export interface UpsertLottoRoundData {
  lottoRound_upsert: LottoRound_Key;
}

export interface UpsertLottoRoundVariables {
  drwNo: number;
  drwNoDate: string;
  totSellamnt: number;
  firstWinamnt: number;
  firstPrzwnerCo: number;
  drwtNo1: number;
  drwtNo2: number;
  drwtNo3: number;
  drwtNo4: number;
  drwtNo5: number;
  drwtNo6: number;
  bnusNo: number;
  returnValue: string;
}

interface UpsertLottoRoundRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpsertLottoRoundVariables): MutationRef<UpsertLottoRoundData, UpsertLottoRoundVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpsertLottoRoundVariables): MutationRef<UpsertLottoRoundData, UpsertLottoRoundVariables>;
  operationName: string;
}
export const upsertLottoRoundRef: UpsertLottoRoundRef;

export function upsertLottoRound(vars: UpsertLottoRoundVariables): MutationPromise<UpsertLottoRoundData, UpsertLottoRoundVariables>;
export function upsertLottoRound(dc: DataConnect, vars: UpsertLottoRoundVariables): MutationPromise<UpsertLottoRoundData, UpsertLottoRoundVariables>;

interface ListLottoRoundsRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListLottoRoundsData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListLottoRoundsData, undefined>;
  operationName: string;
}
export const listLottoRoundsRef: ListLottoRoundsRef;

export function listLottoRounds(): QueryPromise<ListLottoRoundsData, undefined>;
export function listLottoRounds(dc: DataConnect): QueryPromise<ListLottoRoundsData, undefined>;

interface GetLottoRoundByNoRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetLottoRoundByNoVariables): QueryRef<GetLottoRoundByNoData, GetLottoRoundByNoVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetLottoRoundByNoVariables): QueryRef<GetLottoRoundByNoData, GetLottoRoundByNoVariables>;
  operationName: string;
}
export const getLottoRoundByNoRef: GetLottoRoundByNoRef;

export function getLottoRoundByNo(vars: GetLottoRoundByNoVariables): QueryPromise<GetLottoRoundByNoData, GetLottoRoundByNoVariables>;
export function getLottoRoundByNo(dc: DataConnect, vars: GetLottoRoundByNoVariables): QueryPromise<GetLottoRoundByNoData, GetLottoRoundByNoVariables>;

interface GetLatestLottoRoundRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetLatestLottoRoundData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<GetLatestLottoRoundData, undefined>;
  operationName: string;
}
export const getLatestLottoRoundRef: GetLatestLottoRoundRef;

export function getLatestLottoRound(): QueryPromise<GetLatestLottoRoundData, undefined>;
export function getLatestLottoRound(dc: DataConnect): QueryPromise<GetLatestLottoRoundData, undefined>;

