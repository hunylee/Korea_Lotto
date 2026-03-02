const { queryRef, executeQuery, mutationRef, executeMutation, validateArgs } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'korealotto-connector',
  service: 'korealotto',
  location: 'us-east4'
};
exports.connectorConfig = connectorConfig;

const upsertLottoRoundRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpsertLottoRound', inputVars);
}
upsertLottoRoundRef.operationName = 'UpsertLottoRound';
exports.upsertLottoRoundRef = upsertLottoRoundRef;

exports.upsertLottoRound = function upsertLottoRound(dcOrVars, vars) {
  return executeMutation(upsertLottoRoundRef(dcOrVars, vars));
};

const listLottoRoundsRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListLottoRounds');
}
listLottoRoundsRef.operationName = 'ListLottoRounds';
exports.listLottoRoundsRef = listLottoRoundsRef;

exports.listLottoRounds = function listLottoRounds(dc) {
  return executeQuery(listLottoRoundsRef(dc));
};

const getLottoRoundByNoRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetLottoRoundByNo', inputVars);
}
getLottoRoundByNoRef.operationName = 'GetLottoRoundByNo';
exports.getLottoRoundByNoRef = getLottoRoundByNoRef;

exports.getLottoRoundByNo = function getLottoRoundByNo(dcOrVars, vars) {
  return executeQuery(getLottoRoundByNoRef(dcOrVars, vars));
};

const getLatestLottoRoundRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetLatestLottoRound');
}
getLatestLottoRoundRef.operationName = 'GetLatestLottoRound';
exports.getLatestLottoRoundRef = getLatestLottoRoundRef;

exports.getLatestLottoRound = function getLatestLottoRound(dc) {
  return executeQuery(getLatestLottoRoundRef(dc));
};
