import { ValueLedgerBase } from '@0xcert/scaffold';
import { Context } from '@0xcert/web3-context';
import getInfo from '../queries/get-info';
import getSupply from '../queries/get-supply';
import * as env from '../config/env';

/**
 * 
 */
export class ValueLedger implements ValueLedgerBase {
  readonly platform: string = 'web3';
  readonly context: Context;
  readonly contract: any;

  /**
   * 
   */
  public constructor(context: Context, ledgerId?: string) {
    this.context = context;
    this.contract = this.getValueLedger(ledgerId);
  }

  /**
   * 
   */
  public async getInfo() {
    return getInfo(this);
  }

  /**
   * 
   */
  public async getSupply() {
    return getSupply(this);
  }

  /**
   * 
   */
  protected getValueLedger(ledgerId: string) {
    return new this.context.web3.eth.Contract(env.tokenAbi, ledgerId, { gas: 6000000 });
  }

}