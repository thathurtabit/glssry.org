import { signIn, signOut, useSession } from "next-auth/react";
import { SharedHead } from "~/components/molecules/shared-head/shared-head";
import { EURLS, appDescription, appTitle } from "~/settings/constants";

export default function Home() {
  return (
    <>
      <SharedHead />
      <main className=" flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            <span className="text-[hsl(280,100%,70%)]">{appTitle}</span>
          </h1>
          <p className="text-[hsl(280,100%,70%)]">{appDescription}</p>

          <div className="flex flex-col items-center gap-2">
            <AuthShowcase />
          </div>
        </div>
      </main>
    </>
  );
}

function AuthShowcase() {
  const { data: sessionData } = useSession();

  const handleSignInOrOut = () => {
    if (sessionData) {
      (async () => {
        await signOut({ callbackUrl: EURLS.SignedOut });
      })().catch((error) => {
        // eslint-disable-next-line no-console
        console.error(error);
      });
    }

    (async () => {
      await signIn("sign-in-button", { callbackUrl: EURLS.SignInSuccess });
    })().catch((error) => {
      // eslint-disable-next-line no-console
      console.error(error);
    });
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-center text-2xl text-white">
        {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
      </p>
      <button
        type="button"
        className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
        onClick={handleSignInOrOut}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
}
