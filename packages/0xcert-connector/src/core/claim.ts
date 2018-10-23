/**
 * 
 */
export enum ClaimKind {
  MINTER_CREATE_ASSET = 6001,
  EXCHANGE_SWAP = 6002,
}

/**
 * 
 */
export interface MinterCreateAssetClaim {
  generate(): this;
  sign(): this;
  serialize(): MinterCreateAssetResult;
}

/**
 * 
 */
export interface ExchangeSwapClaim {
  generate(): this;
  sign(): this;
  serialize(): ExchangeSwapResult;
}

/**
 * 
 */
export interface AssetTransfer {
  folderId: string;
  assetId: string;
  senderId: string;
  receiverId: string;
}

/**
 * 
 */
export interface CoinTransfer {
  vaultId: string;
  amount: number;
  senderId: string;
  receiverId: string;
}

/**
 * 
 */
export interface MinterCreateAssetRecipe {
  claimKind: ClaimKind.MINTER_CREATE_ASSET;
  makerId: string;
  takerId: string;
  asset: {
    folderId: string;
    assetId: string;
    publicProof: string;
  },
  transfers: (AssetTransfer | CoinTransfer)[];
  seed?: number;
  expiration: number;
}

/**
 * 
 */
export interface ExchangeSwapRecipe {
  claimKind: ClaimKind.EXCHANGE_SWAP;
  makerId: string;
  takerId: string;
  transfers: (AssetTransfer | CoinTransfer)[];
  seed?: number;
  expiration: number;
}

/**
 * 
 */
export interface MinterCreateAssetResult {
  data: string;
  signature: string;
}

/**
 * 
 */
export interface ExchangeSwapResult {
  data: string;
  signature: string;
}
