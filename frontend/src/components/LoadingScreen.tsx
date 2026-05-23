export function LoadingScreen() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-night-950">
      <div className="relative h-32 w-32">
        <div className="absolute inset-0 rounded-full border border-neon-cyan/30" />
        <div className="absolute inset-2 rounded-full border border-neon-blue/40 animate-orbit" />
        <div className="absolute inset-6 rounded-full border border-neon-purple/40 animate-orbit" />
        <div className="absolute inset-0 flex items-center justify-center text-sm text-neon-cyan">
          Booting
        </div>
      </div>
    </div>
  );
}
