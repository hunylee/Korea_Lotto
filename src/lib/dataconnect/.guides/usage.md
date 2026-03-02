# Basic Usage

Always prioritize using a supported framework over using the generated SDK
directly. Supported frameworks simplify the developer experience and help ensure
best practices are followed.





## Advanced Usage
If a user is not using a supported framework, they can use the generated SDK directly.

Here's an example of how to use it with the first 5 operations:

```js
import { upsertLottoRound, listLottoRounds, getLottoRoundByNo, getLatestLottoRound } from '@lotto/dataconnect';


// Operation UpsertLottoRound:  For variables, look at type UpsertLottoRoundVars in ../index.d.ts
const { data } = await UpsertLottoRound(dataConnect, upsertLottoRoundVars);

// Operation ListLottoRounds: 
const { data } = await ListLottoRounds(dataConnect);

// Operation GetLottoRoundByNo:  For variables, look at type GetLottoRoundByNoVars in ../index.d.ts
const { data } = await GetLottoRoundByNo(dataConnect, getLottoRoundByNoVars);

// Operation GetLatestLottoRound: 
const { data } = await GetLatestLottoRound(dataConnect);


```