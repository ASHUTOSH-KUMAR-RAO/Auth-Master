import { cn } from "@/lib/utils";

export const Header = ({ label }: { label: string }) => {
  return (
    <div className="w-full flex flex-col items-center justify-center gap-y-4 backdrop-blur-2xl bg-gradient-to-br from-teal-500/10 via-cyan-500/5 to-teal-600/10 border border-teal-300/30 rounded-2xl p-6 shadow-2xl">
      {/* Icon with teal glow */}
      <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-teal-400/20 to-cyan-400/20 backdrop-blur-sm border border-teal-300/40 shadow-lg">
        <span className="text-3xl">🔐</span>
      </div>

      <h1
        className={cn(
          "text-3xl font-bold bg-gradient-to-r from-teal-300 via-cyan-300 to-emerald-300 bg-clip-text text-transparent"
        )}
      >
        Auth
      </h1>

      <p className="text-gray-100 text-sm font-medium">{label}</p>

      {/* Subtle divider with sea green tint */}
      <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-teal-400/50 to-transparent rounded-full"></div>
    </div>
  );
};
