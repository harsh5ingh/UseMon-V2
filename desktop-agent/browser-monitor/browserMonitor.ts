import type { WindowSample } from "../src/types.js";

const browserNames = /chrome|arc|safari|firefox|edge|brave/i;

export function getBrowserMetadata(sample: WindowSample) {
  if (!browserNames.test(sample.appName)) {
    return {};
  }

  const titleParts = sample.title.split(" - ");
  const tabTitle = titleParts[0] || sample.title;
  const probableUrl = sample.title.match(/https?:\/\/\S+/)?.[0];

  return {
    browserTabTitle: tabTitle,
    browserUrl: probableUrl
  };
}
