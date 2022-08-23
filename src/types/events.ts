import assert from 'assert'
import {Chain, ChainContext, EventContext, Event, Result} from './support'

export class AssetsBurnedEvent {
  private readonly _chain: Chain
  private readonly event: Event

  constructor(ctx: EventContext)
  constructor(ctx: ChainContext, event: Event)
  constructor(ctx: EventContext, event?: Event) {
    event = event || ctx.event
    assert(event.name === 'Assets.Burned')
    this._chain = ctx._chain
    this.event = event
  }

  /**
   * Some assets were destroyed. \[asset_id, owner, balance\]
   */
  get isV1101(): boolean {
    return this._chain.getEventHash('Assets.Burned') === '6af5d1bf4b3418a7ca0383f4cc463f83e54eeee335be7c8c2ddadb7e58a924dc'
  }

  /**
   * Some assets were destroyed. \[asset_id, owner, balance\]
   */
  get asV1101(): [bigint, Uint8Array, bigint] {
    assert(this.isV1101)
    return this._chain.decodeEvent(this.event)
  }

  /**
   * Some assets were destroyed.
   */
  get isV1201(): boolean {
    return this._chain.getEventHash('Assets.Burned') === '7b313023dcadc0790714779ac69e85195d0b94fbfc5c5b1c65234ca592e0d3f7'
  }

  /**
   * Some assets were destroyed.
   */
  get asV1201(): {assetId: bigint, owner: Uint8Array, balance: bigint} {
    assert(this.isV1201)
    return this._chain.decodeEvent(this.event)
  }
}

export class AssetsIssuedEvent {
  private readonly _chain: Chain
  private readonly event: Event

  constructor(ctx: EventContext)
  constructor(ctx: ChainContext, event: Event)
  constructor(ctx: EventContext, event?: Event) {
    event = event || ctx.event
    assert(event.name === 'Assets.Issued')
    this._chain = ctx._chain
    this.event = event
  }

  /**
   * Some assets were issued. \[asset_id, owner, total_supply\]
   */
  get isV1101(): boolean {
    return this._chain.getEventHash('Assets.Issued') === '6af5d1bf4b3418a7ca0383f4cc463f83e54eeee335be7c8c2ddadb7e58a924dc'
  }

  /**
   * Some assets were issued. \[asset_id, owner, total_supply\]
   */
  get asV1101(): [bigint, Uint8Array, bigint] {
    assert(this.isV1101)
    return this._chain.decodeEvent(this.event)
  }

  /**
   * Some assets were issued.
   */
  get isV1201(): boolean {
    return this._chain.getEventHash('Assets.Issued') === '00b4e83fd8a2b78206f9e4f83e5841b01b15461279b6952b593fddd97bfa57f8'
  }

  /**
   * Some assets were issued.
   */
  get asV1201(): {assetId: bigint, owner: Uint8Array, totalSupply: bigint} {
    assert(this.isV1201)
    return this._chain.decodeEvent(this.event)
  }
}

export class AssetsTransferredEvent {
  private readonly _chain: Chain
  private readonly event: Event

  constructor(ctx: EventContext)
  constructor(ctx: ChainContext, event: Event)
  constructor(ctx: EventContext, event?: Event) {
    event = event || ctx.event
    assert(event.name === 'Assets.Transferred')
    this._chain = ctx._chain
    this.event = event
  }

  /**
   * Some assets were transferred. \[asset_id, from, to, amount\]
   */
  get isV1101(): boolean {
    return this._chain.getEventHash('Assets.Transferred') === 'abbbc10bc7346d8c9b28e542437398fdb02f602123d38cd8b28c364093fc9ddf'
  }

  /**
   * Some assets were transferred. \[asset_id, from, to, amount\]
   */
  get asV1101(): [bigint, Uint8Array, Uint8Array, bigint] {
    assert(this.isV1101)
    return this._chain.decodeEvent(this.event)
  }

  /**
   * Some assets were transferred.
   */
  get isV1201(): boolean {
    return this._chain.getEventHash('Assets.Transferred') === 'f65815f0a2516ce398b9e72fe858b92dc308f7815d5ec2c9ca9344c57874f4c2'
  }

  /**
   * Some assets were transferred.
   */
  get asV1201(): {assetId: bigint, from: Uint8Array, to: Uint8Array, amount: bigint} {
    assert(this.isV1201)
    return this._chain.decodeEvent(this.event)
  }
}
