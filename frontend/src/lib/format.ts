export function shortHash(hash?: string, length = 6) {
  if (!hash) {
    return "";
  }
  return `${hash.slice(0, length)}...${hash.slice(-length)}`;
}

export function formatDateTime(value: string | number | Date) {
  const date = new Date(value);
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}
