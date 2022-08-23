import { Store, TypeormDatabase } from "@subsquid/typeorm-store";
import {
  BatchContext,
  BatchProcessorItem,
  SubstrateBatchProcessor,
  toHex,
} from "@subsquid/substrate-processor";
import { lookupArchive } from "@subsquid/archive-registry";
import { Transfer, AssetStatus } from "./model";
import {
  AssetsIssuedEvent,
  AssetsBurnedEvent,
  AssetsTransferredEvent,
} from "./types/events";

const processor = new SubstrateBatchProcessor()
  .setBatchSize(500)
  .setDataSource({
    archive: lookupArchive("moonriver", { release: "FireSquid" }),
  })
  .setBlockRange({ from: 950000 })
  .addEvent("Assets.Issued")
  .addEvent("Assets.Transferred")
  .addEvent("Assets.Burned");

processor.run(new TypeormDatabase(), async (ctx) => {
  const assetTransfers = getTransfers(ctx);

  await ctx.store.insert(assetTransfers);
});

type Item = BatchProcessorItem<typeof processor>;
type Ctx = BatchContext<Store, Item>;

function getTransfers(ctx: Ctx): Transfer[] {
  const assetTransfers: Transfer[] = [];

  for (const block of ctx.blocks) {
    for (const item of block.items) {
      if (item.name === "Assets.Transferred") {
        const event = getTransferredEvent(ctx, item.event);

        const transferred = new Transfer();
        transferred.id = item.event.id;
        transferred.assetId = event.assetId.toString();
        transferred.balance = event.amount;
        transferred.from = toHex(event.from);
        transferred.to = toHex(event.to);
        transferred.status = AssetStatus.TRANSFERRED;

        assetTransfers.push(transferred);
      }
      if (item.name === "Assets.Issued") {
        const event = getIssuedEvent(ctx, item.event);

        const transferred = new Transfer();
        transferred.id = item.event.id;
        transferred.assetId = event.assetId.toString();
        transferred.to = toHex(event.owner);
        transferred.from = "";
        transferred.balance = event.totalSupply;
        transferred.status = AssetStatus.ISSUED;

        assetTransfers.push(transferred);
      }
      if (item.name === "Assets.Burned") {
        const event = getBurnedEvent(ctx, item.event);

        const transferred = new Transfer();
        transferred.id = item.event.id;
        transferred.assetId = event.assetId.toString();
        transferred.balance = event.balance;
        transferred.from = toHex(event.owner);
        transferred.to = "";
        transferred.status = AssetStatus.BURNED;

        assetTransfers.push(transferred);
      }
    }
  }

  return assetTransfers;
}

function getTransferredEvent(ctx: Ctx, ev: any) {
  const event = new AssetsTransferredEvent(ctx, ev);

  if (event.isV1101) {
    const [assetId, from, to, amount] = event.asV1101;
    return { assetId, from, to, amount };
  }
  return event.asV1201;
}

function getIssuedEvent(ctx: Ctx, ev: any) {
  const event = new AssetsIssuedEvent(ctx, ev);

  if (event.isV1101) {
    const [assetId, owner, totalSupply] = event.asV1101;
    return { assetId, owner, totalSupply };
  }
  return event.asV1201;
}

function getBurnedEvent(ctx: Ctx, ev: any) {
  const event = new AssetsBurnedEvent(ctx, ev);

  if (event.isV1101) {
    const [assetId, owner, balance] = event.asV1101;
    return { assetId, owner, balance };
  }

  return event.asV1201;
}
