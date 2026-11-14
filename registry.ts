import type React from "react";
import type {ViewKey} from "../data/timing";
import type {ShotProps} from "./common";
import {GreetingShot, MarketShot} from "./OpeningScenes";
import {TripleShot} from "./TripleShot";
import {TopicIntroShot, TopicSolutionShot} from "./TopicShots";
import {PartnerStory, RibaStory} from "./RibaScenes";
import {MaysirStory, TradeStory} from "./MaysirScenes";
import {SymbolStory} from "./SymbolStory";
import {BribeStory, FairStory} from "./RisywahScenes";
import {ClosingShot, ConclusionShot} from "./EndScenes";

/** Peta nama view (di timing.ts) -> komponen adegan. */
export const VIEWS: Record<ViewKey, React.FC<ShotProps>> = {
  greeting: GreetingShot,
  market: MarketShot,
  triple: TripleShot,
  topicIntro: TopicIntroShot,
  topicSolution: TopicSolutionShot,
  ribaStory: RibaStory,
  partnerStory: PartnerStory,
  maysirStory: MaysirStory,
  symbolStory: SymbolStory,
  tradeStory: TradeStory,
  bribeStory: BribeStory,
  fairStory: FairStory,
  conclusion: ConclusionShot,
  closing: ClosingShot,
};
