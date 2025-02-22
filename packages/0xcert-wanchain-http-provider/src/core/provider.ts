import { fetchJson } from '@0xcert/utils';
import { GatewayConfig, GenericProvider, SignMethod } from '@0xcert/wanchain-generic-provider';

/**
 * HTTP RPC client options interface.
 */
export interface HttpProviderOptions {

  /**
   * Default account from which all mutations are made.
   */
  accountId?: string;

  /**
   * Http call cache options.
   */
  cache?: 'default' | 'no-cache' | 'reload' | 'force-cache' | 'only-if-cached' | string;

  /**
   * Http call credentials.
   */
  credentials?: 'include' | 'same-origin' | 'omit' | string;

  /**
   * Http call headers.
   */
  headers?: {[key: string]: string};

  /**
   * Http call mode.
   */
  mode?: 'no-cors' | 'cors' | 'same-origin' | string;

  /**
   * Http call redirect.
   */
  redirect?: 'manual' | 'follow' | 'error' | string;

  /**
   * Type of signature that will be used in making claims etc.
   */
  signMethod?: SignMethod;

  /**
   * List of addresses where normal transfer not safeTransfer smart contract methods will be used.
   */
  unsafeRecipientIds?: string[];

  /**
   * Source where assetLedger compiled smart contract is located.
   */
  assetLedgerSource?: string;

  /**
   * Source where valueLedger compiled smart contract is located.
   */
  valueLedgerSource?: string;

  /**
   * Number of confirmations (blocks in blockchain after mutation is accepted) are necessary to mark a mutation complete.
   */
  requiredConfirmations?: number;

  /**
   * Gateway configuration.
   */
  gatewayConfig?: GatewayConfig;

  /**
   * The number of milliseconds in which a mutation times out.
   */
  mutationTimeout?: number;

  /**
   * Url to JSON RPC endpoint.
   */
  url: string;

  /**
   * Gas price multiplier. Defaults to 1.1.
   */
  gasPriceMultiplier?: number;

  /**
   * Retry gas price multiplier. Defaults to 2.
   */
  retryGasPriceMultiplier?: number;

  /**
   * Sandbox mode. False by default.
   */
  sandbox?: Boolean;

  /**
   * Verbose mode. False by default.
   */
  verbose?: Boolean;
}

/**
 * HTTP RPC client.
 */
export class HttpProvider extends GenericProvider {

  /**
   * Default options set from constructor.
   */
  protected _options: HttpProviderOptions;

  /**
   * Returns a new provider instance.
   * @param options HTTP provider options.
   */
  public static getInstance(options: HttpProviderOptions): HttpProvider {
    return new this(options);
  }

  /**
   * Class constructor.
   */
  public constructor(options: HttpProviderOptions) {
    super(options);

    this._options = options;
    this._client = this;
  }

  /**
   * Is provider supported.
   */
  public isSupported() {
    return !!this._client.fetch;
  }

  /**
   * Sends the RPC call.
   */
  public send(data: any, callback: (err, data) => any) {

    const { url, ...options } = {
      url: 'http://localhost:8545',
      ...this._options,
    };

    return fetchJson(url, {
      ...options,
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' },
    }).then((res) => {
      return res;
    }).then((res) => {
      return callback(null, res);
    }).catch((err) => {
      return callback(err, null);
    });
  }

}
