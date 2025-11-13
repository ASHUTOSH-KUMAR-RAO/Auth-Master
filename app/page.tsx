import { LoginButton } from "@/components/auth/login-button";
import { Button } from "@/components/ui/button";

const Page = () => {
  return (
    <main className="flex h-full flex-col items-center justify-center bg-amber-100">
      <div className="space-y-6 text-center">
        <h1 className="text-7xl font-semibold text-[lightseagreen] drop-shadow-md ">
          🔏Auth
        </h1>
        <p className="text-black text-4xl font-bold">
          A Simple Two Factor Authentication Services
        </p>
        <div>
          <LoginButton>
            <Button
              variant="secondary"
              className="font-bold cursor-pointer"
              size="lg"
            >
              Sign In
            </Button>
          </LoginButton>
        </div>
      </div>
    </main>
  );
};

export default Page;
