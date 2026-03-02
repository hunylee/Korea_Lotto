# Generated TypeScript README
This README will guide you through the process of using the generated JavaScript SDK package for the connector `korealotto-connector`. It will also provide examples on how to use your generated SDK to call your Data Connect queries and mutations.

***NOTE:** This README is generated alongside the generated SDK. If you make changes to this file, they will be overwritten when the SDK is regenerated.*

# Table of Contents
- [**Overview**](#generated-javascript-readme)
- [**Accessing the connector**](#accessing-the-connector)
  - [*Connecting to the local Emulator*](#connecting-to-the-local-emulator)
- [**Queries**](#queries)
  - [*ListLottoRounds*](#listlottorounds)
  - [*GetLottoRoundByNo*](#getlottoroundbyno)
  - [*GetLatestLottoRound*](#getlatestlottoround)
- [**Mutations**](#mutations)
  - [*UpsertLottoRound*](#upsertlottoround)

# Accessing the connector
A connector is a collection of Queries and Mutations. One SDK is generated for each connector - this SDK is generated for the connector `korealotto-connector`. You can find more information about connectors in the [Data Connect documentation](https://firebase.google.com/docs/data-connect#how-does).

You can use this generated SDK by importing from the package `@lotto/dataconnect` as shown below. Both CommonJS and ESM imports are supported.

You can also follow the instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#set-client).

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@lotto/dataconnect';

const dataConnect = getDataConnect(connectorConfig);
```

## Connecting to the local Emulator
By default, the connector will connect to the production service.

To connect to the emulator, you can use the following code.
You can also follow the emulator instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#instrument-clients).

```typescript
import { connectDataConnectEmulator, getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@lotto/dataconnect';

const dataConnect = getDataConnect(connectorConfig);
connectDataConnectEmulator(dataConnect, 'localhost', 9399);
```

After it's initialized, you can call your Data Connect [queries](#queries) and [mutations](#mutations) from your generated SDK.

# Queries

There are two ways to execute a Data Connect Query using the generated Web SDK:
- Using a Query Reference function, which returns a `QueryRef`
  - The `QueryRef` can be used as an argument to `executeQuery()`, which will execute the Query and return a `QueryPromise`
- Using an action shortcut function, which returns a `QueryPromise`
  - Calling the action shortcut function will execute the Query and return a `QueryPromise`

The following is true for both the action shortcut function and the `QueryRef` function:
- The `QueryPromise` returned will resolve to the result of the Query once it has finished executing
- If the Query accepts arguments, both the action shortcut function and the `QueryRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Query
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `korealotto-connector` connector's generated functions to execute each query. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-queries).

## ListLottoRounds
You can execute the `ListLottoRounds` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
listLottoRounds(): QueryPromise<ListLottoRoundsData, undefined>;

interface ListLottoRoundsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListLottoRoundsData, undefined>;
}
export const listLottoRoundsRef: ListLottoRoundsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listLottoRounds(dc: DataConnect): QueryPromise<ListLottoRoundsData, undefined>;

interface ListLottoRoundsRef {
  ...
  (dc: DataConnect): QueryRef<ListLottoRoundsData, undefined>;
}
export const listLottoRoundsRef: ListLottoRoundsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listLottoRoundsRef:
```typescript
const name = listLottoRoundsRef.operationName;
console.log(name);
```

### Variables
The `ListLottoRounds` query has no variables.
### Return Type
Recall that executing the `ListLottoRounds` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListLottoRoundsData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `ListLottoRounds`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listLottoRounds } from '@lotto/dataconnect';


// Call the `listLottoRounds()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listLottoRounds();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listLottoRounds(dataConnect);

console.log(data.lottoRounds);

// Or, you can use the `Promise` API.
listLottoRounds().then((response) => {
  const data = response.data;
  console.log(data.lottoRounds);
});
```

### Using `ListLottoRounds`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listLottoRoundsRef } from '@lotto/dataconnect';


// Call the `listLottoRoundsRef()` function to get a reference to the query.
const ref = listLottoRoundsRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listLottoRoundsRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.lottoRounds);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.lottoRounds);
});
```

## GetLottoRoundByNo
You can execute the `GetLottoRoundByNo` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
getLottoRoundByNo(vars: GetLottoRoundByNoVariables): QueryPromise<GetLottoRoundByNoData, GetLottoRoundByNoVariables>;

interface GetLottoRoundByNoRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetLottoRoundByNoVariables): QueryRef<GetLottoRoundByNoData, GetLottoRoundByNoVariables>;
}
export const getLottoRoundByNoRef: GetLottoRoundByNoRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getLottoRoundByNo(dc: DataConnect, vars: GetLottoRoundByNoVariables): QueryPromise<GetLottoRoundByNoData, GetLottoRoundByNoVariables>;

interface GetLottoRoundByNoRef {
  ...
  (dc: DataConnect, vars: GetLottoRoundByNoVariables): QueryRef<GetLottoRoundByNoData, GetLottoRoundByNoVariables>;
}
export const getLottoRoundByNoRef: GetLottoRoundByNoRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getLottoRoundByNoRef:
```typescript
const name = getLottoRoundByNoRef.operationName;
console.log(name);
```

### Variables
The `GetLottoRoundByNo` query requires an argument of type `GetLottoRoundByNoVariables`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetLottoRoundByNoVariables {
  drwNo: number;
}
```
### Return Type
Recall that executing the `GetLottoRoundByNo` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetLottoRoundByNoData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `GetLottoRoundByNo`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getLottoRoundByNo, GetLottoRoundByNoVariables } from '@lotto/dataconnect';

// The `GetLottoRoundByNo` query requires an argument of type `GetLottoRoundByNoVariables`:
const getLottoRoundByNoVars: GetLottoRoundByNoVariables = {
  drwNo: ..., 
};

// Call the `getLottoRoundByNo()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getLottoRoundByNo(getLottoRoundByNoVars);
// Variables can be defined inline as well.
const { data } = await getLottoRoundByNo({ drwNo: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getLottoRoundByNo(dataConnect, getLottoRoundByNoVars);

console.log(data.lottoRound);

// Or, you can use the `Promise` API.
getLottoRoundByNo(getLottoRoundByNoVars).then((response) => {
  const data = response.data;
  console.log(data.lottoRound);
});
```

### Using `GetLottoRoundByNo`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getLottoRoundByNoRef, GetLottoRoundByNoVariables } from '@lotto/dataconnect';

// The `GetLottoRoundByNo` query requires an argument of type `GetLottoRoundByNoVariables`:
const getLottoRoundByNoVars: GetLottoRoundByNoVariables = {
  drwNo: ..., 
};

// Call the `getLottoRoundByNoRef()` function to get a reference to the query.
const ref = getLottoRoundByNoRef(getLottoRoundByNoVars);
// Variables can be defined inline as well.
const ref = getLottoRoundByNoRef({ drwNo: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getLottoRoundByNoRef(dataConnect, getLottoRoundByNoVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.lottoRound);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.lottoRound);
});
```

## GetLatestLottoRound
You can execute the `GetLatestLottoRound` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
getLatestLottoRound(): QueryPromise<GetLatestLottoRoundData, undefined>;

interface GetLatestLottoRoundRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetLatestLottoRoundData, undefined>;
}
export const getLatestLottoRoundRef: GetLatestLottoRoundRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getLatestLottoRound(dc: DataConnect): QueryPromise<GetLatestLottoRoundData, undefined>;

interface GetLatestLottoRoundRef {
  ...
  (dc: DataConnect): QueryRef<GetLatestLottoRoundData, undefined>;
}
export const getLatestLottoRoundRef: GetLatestLottoRoundRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getLatestLottoRoundRef:
```typescript
const name = getLatestLottoRoundRef.operationName;
console.log(name);
```

### Variables
The `GetLatestLottoRound` query has no variables.
### Return Type
Recall that executing the `GetLatestLottoRound` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetLatestLottoRoundData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `GetLatestLottoRound`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getLatestLottoRound } from '@lotto/dataconnect';


// Call the `getLatestLottoRound()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getLatestLottoRound();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getLatestLottoRound(dataConnect);

console.log(data.lottoRounds);

// Or, you can use the `Promise` API.
getLatestLottoRound().then((response) => {
  const data = response.data;
  console.log(data.lottoRounds);
});
```

### Using `GetLatestLottoRound`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getLatestLottoRoundRef } from '@lotto/dataconnect';


// Call the `getLatestLottoRoundRef()` function to get a reference to the query.
const ref = getLatestLottoRoundRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getLatestLottoRoundRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.lottoRounds);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.lottoRounds);
});
```

# Mutations

There are two ways to execute a Data Connect Mutation using the generated Web SDK:
- Using a Mutation Reference function, which returns a `MutationRef`
  - The `MutationRef` can be used as an argument to `executeMutation()`, which will execute the Mutation and return a `MutationPromise`
- Using an action shortcut function, which returns a `MutationPromise`
  - Calling the action shortcut function will execute the Mutation and return a `MutationPromise`

The following is true for both the action shortcut function and the `MutationRef` function:
- The `MutationPromise` returned will resolve to the result of the Mutation once it has finished executing
- If the Mutation accepts arguments, both the action shortcut function and the `MutationRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Mutation
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `korealotto-connector` connector's generated functions to execute each mutation. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-mutations).

## UpsertLottoRound
You can execute the `UpsertLottoRound` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
upsertLottoRound(vars: UpsertLottoRoundVariables): MutationPromise<UpsertLottoRoundData, UpsertLottoRoundVariables>;

interface UpsertLottoRoundRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpsertLottoRoundVariables): MutationRef<UpsertLottoRoundData, UpsertLottoRoundVariables>;
}
export const upsertLottoRoundRef: UpsertLottoRoundRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
upsertLottoRound(dc: DataConnect, vars: UpsertLottoRoundVariables): MutationPromise<UpsertLottoRoundData, UpsertLottoRoundVariables>;

interface UpsertLottoRoundRef {
  ...
  (dc: DataConnect, vars: UpsertLottoRoundVariables): MutationRef<UpsertLottoRoundData, UpsertLottoRoundVariables>;
}
export const upsertLottoRoundRef: UpsertLottoRoundRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the upsertLottoRoundRef:
```typescript
const name = upsertLottoRoundRef.operationName;
console.log(name);
```

### Variables
The `UpsertLottoRound` mutation requires an argument of type `UpsertLottoRoundVariables`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
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
```
### Return Type
Recall that executing the `UpsertLottoRound` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpsertLottoRoundData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpsertLottoRoundData {
  lottoRound_upsert: LottoRound_Key;
}
```
### Using `UpsertLottoRound`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, upsertLottoRound, UpsertLottoRoundVariables } from '@lotto/dataconnect';

// The `UpsertLottoRound` mutation requires an argument of type `UpsertLottoRoundVariables`:
const upsertLottoRoundVars: UpsertLottoRoundVariables = {
  drwNo: ..., 
  drwNoDate: ..., 
  totSellamnt: ..., 
  firstWinamnt: ..., 
  firstPrzwnerCo: ..., 
  drwtNo1: ..., 
  drwtNo2: ..., 
  drwtNo3: ..., 
  drwtNo4: ..., 
  drwtNo5: ..., 
  drwtNo6: ..., 
  bnusNo: ..., 
  returnValue: ..., 
};

// Call the `upsertLottoRound()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await upsertLottoRound(upsertLottoRoundVars);
// Variables can be defined inline as well.
const { data } = await upsertLottoRound({ drwNo: ..., drwNoDate: ..., totSellamnt: ..., firstWinamnt: ..., firstPrzwnerCo: ..., drwtNo1: ..., drwtNo2: ..., drwtNo3: ..., drwtNo4: ..., drwtNo5: ..., drwtNo6: ..., bnusNo: ..., returnValue: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await upsertLottoRound(dataConnect, upsertLottoRoundVars);

console.log(data.lottoRound_upsert);

// Or, you can use the `Promise` API.
upsertLottoRound(upsertLottoRoundVars).then((response) => {
  const data = response.data;
  console.log(data.lottoRound_upsert);
});
```

### Using `UpsertLottoRound`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, upsertLottoRoundRef, UpsertLottoRoundVariables } from '@lotto/dataconnect';

// The `UpsertLottoRound` mutation requires an argument of type `UpsertLottoRoundVariables`:
const upsertLottoRoundVars: UpsertLottoRoundVariables = {
  drwNo: ..., 
  drwNoDate: ..., 
  totSellamnt: ..., 
  firstWinamnt: ..., 
  firstPrzwnerCo: ..., 
  drwtNo1: ..., 
  drwtNo2: ..., 
  drwtNo3: ..., 
  drwtNo4: ..., 
  drwtNo5: ..., 
  drwtNo6: ..., 
  bnusNo: ..., 
  returnValue: ..., 
};

// Call the `upsertLottoRoundRef()` function to get a reference to the mutation.
const ref = upsertLottoRoundRef(upsertLottoRoundVars);
// Variables can be defined inline as well.
const ref = upsertLottoRoundRef({ drwNo: ..., drwNoDate: ..., totSellamnt: ..., firstWinamnt: ..., firstPrzwnerCo: ..., drwtNo1: ..., drwtNo2: ..., drwtNo3: ..., drwtNo4: ..., drwtNo5: ..., drwtNo6: ..., bnusNo: ..., returnValue: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = upsertLottoRoundRef(dataConnect, upsertLottoRoundVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.lottoRound_upsert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.lottoRound_upsert);
});
```

