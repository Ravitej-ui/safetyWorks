import { TransactionHttp } from 'nem-library';

export function TransactionHttpProvider(): TransactionHttp {
  return new TransactionHttp([{
    protocol: "http",
    domain: "95.216.73.243",
    port: 7890
  }]);
}
