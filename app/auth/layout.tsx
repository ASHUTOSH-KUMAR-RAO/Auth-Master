const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative h-full min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 p-4 overflow-hidden">
      {/* Animated background elements - Same as layout */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent"></div>

      {/* Subtle grid pattern - Same as layout */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

      {/* Children with relative positioning */}
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default AuthLayout;
