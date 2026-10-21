import LiveBlockComponent from "../WebTV/LiveBlockComponent";
import CollectionBlockComponent from "../WebTV/CollectionBlockComponent";
import VideoGridBlockComponent from "../WebTV/VideoGridBlockComponent";
import CustomTextBlock from "./CustomTextBlock";

import { getLiveBlockManifest } from "./manifests/LiveBlock.manifest";
import { getCollectionBlockManifest } from "./manifests/CollectionBlock.manifest";
import { getVideoGridBlockManifest } from "./manifests/VideoGridBlock.manifest";
import { getCustomTextBlockManifest } from "./manifests/CustomTextBlock.manifest";
import type { SupportedLocale } from "@/src/locales";

export interface BlockRegistration {
  component: React.ComponentType<any>;
  manifest: Record<string, any>;
}

export const blockRegistry: Record<string, BlockRegistration> = {
  "webtv-hero-direct": {
    component: LiveBlockComponent,
    manifest: getLiveBlockManifest("fr"),
  },
  "live-block": {
    component: LiveBlockComponent,
    manifest: getLiveBlockManifest("fr"),
  },
  "collection-block": {
    component: CollectionBlockComponent,
    manifest: getCollectionBlockManifest("fr"),
  },
  "video-grid-block": {
    component: VideoGridBlockComponent,
    manifest: getVideoGridBlockManifest("fr"),
  },
  "custom-text-block": {
    component: CustomTextBlock,
    manifest: getCustomTextBlockManifest("fr"),
  },
};

export function getLocalizedBlockRegistry(
  locale: SupportedLocale,
): Record<string, BlockRegistration> {
  return {
    "webtv-hero-direct": {
      component: LiveBlockComponent,
      manifest: getLiveBlockManifest(locale),
    },
    "live-block": {
      component: LiveBlockComponent,
      manifest: getLiveBlockManifest(locale),
    },
    "collection-block": {
      component: CollectionBlockComponent,
      manifest: getCollectionBlockManifest(locale),
    },
    "video-grid-block": {
      component: VideoGridBlockComponent,
      manifest: getVideoGridBlockManifest(locale),
    },
    "custom-text-block": {
      component: CustomTextBlock,
      manifest: getCustomTextBlockManifest(locale),
    },
  };
}

/**
 * Resolves the matching React component for a given frontend_id key.
 * Falls back to fuzzy matching pattern rules if explicit key is not found.
 */
export function resolveBlockComponent(
  frontendId: string,
): React.ComponentType<any> {
  if (blockRegistry[frontendId]) {
    return blockRegistry[frontendId].component;
  }

  const lowerId = frontendId.toLowerCase();
  if (lowerId.includes("live") || lowerId.includes("direct")) {
    return LiveBlockComponent;
  }
  if (
    lowerId.includes("collection") ||
    lowerId.includes("channel") ||
    lowerId.includes("theme") ||
    lowerId.includes("playlist")
  ) {
    return CollectionBlockComponent;
  }
  if (
    lowerId.includes("text") ||
    lowerId.includes("custom") ||
    lowerId.includes("html")
  ) {
    return CustomTextBlock;
  }

  return VideoGridBlockComponent;
}
