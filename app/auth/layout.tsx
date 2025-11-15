const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-4">
      {/* Animated background circles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>

      {/* Children with relative positioning */}
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default AuthLayout;
