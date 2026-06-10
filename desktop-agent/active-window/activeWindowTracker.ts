import type { WindowSample } from "../src/types.js";

type ActiveWindowModule = {
  activeWindow?: () => Promise<{ title?: string; owner?: { name?: string; processId?: number; bundleId?: string } } | undefined>;
};

export async function getActiveWindowSample(): Promise<WindowSample> {
  try {
    const mod = (await import("get-windows")) as ActiveWindowModule;
    const active = await mod.activeWindow?.();
    return {
      appName: active?.owner?.name ?? "Unknown App",
      title: active?.title ?? "Untitled Window",
      bundleId: active?.owner?.bundleId,
      pid: active?.owner?.processId
    };
  } catch {
    return {
      appName: "VS Code",
      title: "Digital Wellbeing Dashboard",
      bundleId: "com.microsoft.VSCode"
    };
  }
}
