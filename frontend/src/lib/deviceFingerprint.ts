export function getOrCreateDeviceFingerprint(): string {
  if (typeof window === "undefined") {
    return "server";
  }

  const existing = window.localStorage.getItem("qvx_device_fp");
  if (existing) {
    return existing;
  }

  const seed = `${navigator.userAgent}|${navigator.language}|${screen.width}x${screen.height}|${Date.now()}`;
  const hash = simpleHash(seed);
  const fingerprint = `qvx-${hash}`;
  window.localStorage.setItem("qvx_device_fp", fingerprint);
  return fingerprint;
}

function simpleHash(input: string): string {
  let hash = 0;
  for (let i = 0; i < input.length; i += 1) {
    hash = (hash << 5) - hash + input.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash).toString(16).padStart(8, "0");
}
