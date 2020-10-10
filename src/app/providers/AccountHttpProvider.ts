import { AccountHttp } from 'nem-library';

// https://pretestnet1.nem.ninja:7891/node/extended-info
export function AccountHttpProvider(): AccountHttp {
    return new AccountHttp([{
        protocol: "http",
        domain: "95.216.73.243",
        port: 7890
    }]);
}
