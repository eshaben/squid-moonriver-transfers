import assert from 'assert'
import {EventContext, Result, deprecateLatest} from './support'
import * as v1101 from './v1101'
import * as v1201 from './v1201'

export class AssetsBurnedEvent {
  constructor(private ctx: EventContext) {
    assert(this.ctx.event.name === 'assets.Burned')
  }

  /**
   * Some assets were destroyed. \[asset_id, owner, balance\]
   */
  get isV1101(): boolean {
    return this.ctx._chain.getEventHash('assets.Burned') === '6af5d1bf4b3418a7ca0383f4cc463f83e54eeee335be7c8c2ddadb7e58a924dc'
  }

  /**
   * Some assets were destroyed. \[asset_id, owner, balance\]
   */
  get asV1101(): [bigint, v1101.AccountId20, bigint] {
    assert(this.isV1101)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  /**
   * Some assets were destroyed.
   */
  get isV1201(): boolean {
    return this.ctx._chain.getEventHash('assets.Burned') === '7b313023dcadc0790714779ac69e85195d0b94fbfc5c5b1c65234ca592e0d3f7'
  }

  /**
   * Some assets were destroyed.
   */
  get asV1201(): {assetId: bigint, owner: v1201.AccountId20, balance: bigint} {
    assert(this.isV1201)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV1201
  }

  get asLatest(): {assetId: bigint, owner: v1201.AccountId20, balance: bigint} {
    deprecateLatest()
    return this.asV1201
  }
}

export class AssetsIssuedEvent {
  constructor(private ctx: EventContext) {
    assert(this.ctx.event.name === 'assets.Issued')
  }

  /**
   * Some assets were issued. \[asset_id, owner, total_supply\]
   */
  get isV1101(): boolean {
    return this.ctx._chain.getEventHash('assets.Issued') === '6af5d1bf4b3418a7ca0383f4cc463f83e54eeee335be7c8c2ddadb7e58a924dc'
  }

  /**
   * Some assets were issued. \[asset_id, owner, total_supply\]
   */
  get asV1101(): [bigint, v1101.AccountId20, bigint] {
    assert(this.isV1101)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  /**
   * Some assets were issued.
   */
  get isV1201(): boolean {
    return this.ctx._chain.getEventHash('assets.Issued') === '00b4e83fd8a2b78206f9e4f83e5841b01b15461279b6952b593fddd97bfa57f8'
  }

  /**
   * Some assets were issued.
   */
  get asV1201(): {assetId: bigint, owner: v1201.AccountId20, totalSupply: bigint} {
    assert(this.isV1201)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV1201
  }

  get asLatest(): {assetId: bigint, owner: v1201.AccountId20, totalSupply: bigint} {
    deprecateLatest()
    return this.asV1201
  }
}

export class AssetsTransferredEvent {
  constructor(private ctx: EventContext) {
    assert(this.ctx.event.name === 'assets.Transferred')
  }

  /**
   * Some assets were transferred. \[asset_id, from, to, amount\]
   */
  get isV1101(): boolean {
    return this.ctx._chain.getEventHash('assets.Transferred') === 'abbbc10bc7346d8c9b28e542437398fdb02f602123d38cd8b28c364093fc9ddf'
  }

  /**
   * Some assets were transferred. \[asset_id, from, to, amount\]
   */
  get asV1101(): [bigint, v1101.AccountId20, v1101.AccountId20, bigint] {
    assert(this.isV1101)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  /**
   * Some assets were transferred.
   */
  get isV1201(): boolean {
    return this.ctx._chain.getEventHash('assets.Transferred') === 'f65815f0a2516ce398b9e72fe858b92dc308f7815d5ec2c9ca9344c57874f4c2'
  }

  /**
   * Some assets were transferred.
   */
  get asV1201(): {assetId: bigint, from: v1201.AccountId20, to: v1201.AccountId20, amount: bigint} {
    assert(this.isV1201)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV1201
  }

  get asLatest(): {assetId: bigint, from: v1201.AccountId20, to: v1201.AccountId20, amount: bigint} {
    deprecateLatest()
    return this.asV1201
  }
}
