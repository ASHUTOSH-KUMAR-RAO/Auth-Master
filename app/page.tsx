import { LoginButton } from "@/components/auth/login-button";
import { Button } from "@/components/ui/button";

const Page = () => {
  return (
    <main className="relative flex h-full min-h-screen flex-col items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 overflow-hidden">
      {/* Animated background elements - Same as layout */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent"></div>

      {/* Subtle grid pattern - Same as layout */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

      {/* Main content card */}
      <div className="relative z-10 space-y-8 text-center px-6">
        {/* Clean light sea green card with subtle shadow */}
        <div className="relative group">
          {/* Subtle outer glow on hover */}
          <div className="absolute -inset-0.5 bg-teal-400/30 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition duration-500"></div>

          {/* Main card - Light Sea Green */}
          <div className="relative backdrop-blur-sm bg-gradient-to-br from-teal-50/95 via-cyan-50/95 to-teal-100/95 border border-teal-200/50 rounded-3xl p-12 shadow-2xl transition-all duration-300 group-hover:shadow-teal-500/20">
            {/* Content wrapper */}
            <div className="relative z-10">
              {/* Icon with subtle scale on hover */}
              <div className="inline-block mb-6 transition-transform duration-300 hover:scale-110">
                <div className="text-8xl">🔐</div>
              </div>

              {/* Heading with gradient */}
              <h1 className="text-6xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-teal-600 via-cyan-600 to-blue-600 bg-clip-text text-transparent">
                SecureAuth
              </h1>

              {/* Subheading */}
              <p className="text-slate-700 text-xl md:text-2xl font-medium mb-8 max-w-2xl mx-auto leading-relaxed">
                Enterprise-Grade Two-Factor Authentication
              </p>

              {/* Simple Feature badges */}
              <div className="flex flex-wrap gap-3 justify-center mb-8">
                <span className="px-5 py-2.5 bg-white/80 border border-teal-200 rounded-full text-slate-700 text-sm font-medium shadow-sm hover:shadow-md hover:border-teal-400 hover:bg-teal-50/50 transition-all duration-200">
                  🛡️ Secure
                </span>
                <span className="px-5 py-2.5 bg-white/80 border border-cyan-200 rounded-full text-slate-700 text-sm font-medium shadow-sm hover:shadow-md hover:border-cyan-400 hover:bg-cyan-50/50 transition-all duration-200">
                  ⚡ Fast
                </span>
                <span className="px-5 py-2.5 bg-white/80 border border-blue-200 rounded-full text-slate-700 text-sm font-medium shadow-sm hover:shadow-md hover:border-blue-400 hover:bg-blue-50/50 transition-all duration-200">
                  ✨ Simple
                </span>
              </div>

              {/* Glassy Gray CTA Button */}
              {/* Glassy Gray CTA Button */}
              <div className="mb-8">
                <LoginButton>
                  <Button
                    size="lg"
                    className="font-semibold text-lg px-10 py-6 backdrop-blur-md bg-gray-900/10 hover:bg-gray-900/20 text-slate-700 border border-gray-900/20 hover:border-gray-900/30 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-200 rounded-xl cursor-pointer"
                  >
                    Get Started →
                  </Button>
                </LoginButton>
              </div>

              {/* Trust indicators */}
              <div className="flex items-center justify-center gap-2">
                <svg
                  className="w-4 h-4 text-teal-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <p className="text-slate-600 text-sm">
                  Trusted by 10,000+ users worldwide
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Page;
