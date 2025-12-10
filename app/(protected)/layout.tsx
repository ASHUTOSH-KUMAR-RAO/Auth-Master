import { Navbar } from "./_components/navbar";

const ProtectedLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative h-full w-full flex flex-col bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent"></div>

      {/* Subtle grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

      {/* Content */}
      <div className="relative z-10 w-full h-full flex flex-col">
        {/* Navbar at top */}
        <div className="w-full flex justify-center pt-6 pb-4">
          <Navbar />
        </div>

        {/* Main content centered */}
        <main className="flex-1 flex items-center justify-center p-6">
          <div className="w-full max-w-7xl">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default ProtectedLayout;
