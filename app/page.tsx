import { LoginButton } from "@/components/auth/login-button";
import { Button } from "@/components/ui/button";

const Page = () => {
  return (
    <main className="flex h-full min-h-screen flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Animated background circles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>

      {/* Main content card */}
      <div className="relative z-10 space-y-8 text-center px-6">
        {/* Glass morphism card with Light Sea Green tint */}
        <div className="backdrop-blur-xl bg-gradient-to-br from-teal-500/20 via-cyan-500/15 to-teal-600/20 border border-teal-300/30 rounded-3xl p-12 shadow-2xl">
          {/* Icon with gradient */}
          <div className="inline-block mb-6">
            <div className="text-8xl bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent font-black">
              🔐
            </div>
          </div>

          {/* Heading */}
          <h1 className="text-6xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent drop-shadow-lg">
            SecureAuth
          </h1>

          {/* Subheading */}
          <p className="text-gray-100 text-xl md:text-2xl font-medium mb-8 max-w-2xl mx-auto leading-relaxed">
            Enterprise-Grade Two-Factor Authentication
          </p>

          {/* Feature badges */}
          <div className="flex flex-wrap gap-3 justify-center mb-8">
            <span className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-gray-100 text-sm font-medium backdrop-blur-sm">
              🛡️ Secure
            </span>
            <span className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-gray-100 text-sm font-medium backdrop-blur-sm">
              ⚡ Fast
            </span>
            <span className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-gray-100 text-sm font-medium backdrop-blur-sm">
              ✨ Simple
            </span>
          </div>

          {/* CTA Button - Glassy Gray with Pointer */}
          <div>
            <LoginButton>
              <Button
                size="lg"
                className="font-semibold text-lg px-8 py-6 backdrop-blur-md bg-white/10 hover:bg-white/20 text-white border border-white/30 hover:border-white/40 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-200 rounded-xl cursor-pointer"
              >
                Get Started →
              </Button>
            </LoginButton>
          </div>

          {/* Trust indicators */}
          <p className="text-gray-200 text-sm mt-8">
            Trusted by 10,000+ users worldwide
          </p>
        </div>
      </div>
    </main>
  );
};

export default Page;
