import {
  EventHandlerContext,
  SubstrateProcessor,
} from "@subsquid/substrate-processor";
import { lookupArchive } from "@subsquid/archive-registry";
import { Transfer, AssetStatus } from "./model";
import { AssetsBurnedEvent, AssetsIssuedEvent, AssetsTransferredEvent } from "./types/events";

const processor = new SubstrateProcessor("moonbeam-asset-transfers");

processor.setBatchSize(500);
processor.setDataSource({
  archive: lookupArchive("moonriver")[0].url,
  chain: "wss://moonriver.api.onfinality.io/public-ws",
});
processor.setBlockRange({from: 950000})

processor.addEventHandler("assets.Transferred", async (ctx: EventHandlerContext) => {
  const event = new AssetsTransferredEvent(ctx).asV1201;

  const transferred = new Transfer();
  transferred.id = ctx.event.id;
  transferred.assetId = event.assetId.toString();
  transferred.balance = ctx.event.params[3].value as bigint;
  transferred.from = ctx.event.params[1].value as string;
  transferred.to = ctx.event.params[2].value as string;
  transferred.status = AssetStatus.TRANSFERRED;

  await ctx.store.save(transferred);
});

processor.addEventHandler("assets.Issued", async (ctx: EventHandlerContext) => {
  const event = new AssetsIssuedEvent(ctx).asV1201;

  const transferred = new Transfer();
  transferred.id = ctx.event.id;
  transferred.assetId = event.assetId.toString();
  transferred.to = ctx.event.params[1].value as string;
  transferred.from = "";
  transferred.balance = ctx.event.params[2].value as bigint;
  transferred.status = AssetStatus.ISSUED;

  await ctx.store.save(transferred);
});

processor.addEventHandler("assets.Burned", async (ctx: EventHandlerContext) => {
  const event = new AssetsBurnedEvent(ctx).asV1201;

  const transferred = new Transfer();
  transferred.id = ctx.event.id;
  transferred.assetId = event.assetId.toString();
  transferred.balance =  ctx.event.params[2].value as bigint;
  transferred.from = ctx.event.params[1].value as string;
  transferred.to = "";
  transferred.status = AssetStatus.BURNED;

  await ctx.store.save(transferred);
});

processor.run();
