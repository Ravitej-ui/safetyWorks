import {UnconfirmedTransactionListener} from 'nem-library';

// https://pretestnet1.nem.ninja:7891/node/extended-info
// https://nis2.wnsl.biz:7779/
export function UnconfirmedTransactionListenerProvider(): UnconfirmedTransactionListener {
  return new UnconfirmedTransactionListener([{
    protocol: "http",
    domain: "95.216.73.243",
    port: 7890
  }]);
}
