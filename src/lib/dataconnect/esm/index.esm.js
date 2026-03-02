import { queryRef, executeQuery, mutationRef, executeMutation, validateArgs } from 'firebase/data-connect';

export const connectorConfig = {
  connector: 'korealotto-connector',
  service: 'korealotto',
  location: 'us-east4'
};

export const upsertLottoRoundRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpsertLottoRound', inputVars);
}
upsertLottoRoundRef.operationName = 'UpsertLottoRound';

export function upsertLottoRound(dcOrVars, vars) {
  return executeMutation(upsertLottoRoundRef(dcOrVars, vars));
}

export const listLottoRoundsRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListLottoRounds');
}
listLottoRoundsRef.operationName = 'ListLottoRounds';

export function listLottoRounds(dc) {
  return executeQuery(listLottoRoundsRef(dc));
}

export const getLottoRoundByNoRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetLottoRoundByNo', inputVars);
}
getLottoRoundByNoRef.operationName = 'GetLottoRoundByNo';

export function getLottoRoundByNo(dcOrVars, vars) {
  return executeQuery(getLottoRoundByNoRef(dcOrVars, vars));
}

export const getLatestLottoRoundRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetLatestLottoRound');
}
getLatestLottoRoundRef.operationName = 'GetLatestLottoRound';

export function getLatestLottoRound(dc) {
  return executeQuery(getLatestLottoRoundRef(dc));
}

