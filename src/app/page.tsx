"use client";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();
  const callbackUrl = "/dashboard";

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    const target = e.target as typeof e.target & {
      username: { value: string };
      password: { value: string };
    };
    const username = target.username.value;
    const password = target.password.value;

    try {
      const res = await signIn("credentials", {
        redirect: false,
        usernameOrEmail: username,
        password: password,
        callbackUrl,
      });
      if (!res?.error) {
        router.push(callbackUrl);
      } else {
        alert("invalid email or password");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleLoginGoogle = async () => {
    try {
      await signIn("google", { callbackUrl });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <header className="text-gray-600 body-font border-b-[1px]">
        <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
          <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
            <span className="ml-3 text-xl">Tailblocks</span>
          </a>
          <div className="md:ml-auto flex flex-wrap items-center text-base justify-center"></div>
          <button
            onClick={() => setShowModal(true)}
            className="inline-flex items-center bg-blue-500 border-0 py-1 px-3 focus:outline-none  rounded text-base text-white mt-4 md:mt-0"
          >
            Login
            <svg
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="w-4 h-4 ml-1"
              viewBox="0 0 24 24"
            >
              <path d="M5 12h14M12 5l7 7-7 7"></path>
            </svg>
          </button>
        </div>
      </header>
      <main className="flex min-h-screen flex-col items-center justify-between p-24"></main>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">Login</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black  float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <form
                    id="login-form"
                    className="space-y-6"
                    onSubmit={handleSubmit}
                  >
                    <input
                      id="username"
                      className="w-full border border-solid border-[#919EAB52] px-2 pb-2 pt-4 rounded-lg  placeholder:text-[#919EAB]"
                      placeholder="Username"
                    />
                    <input
                      id="password"
                      className="w-full border border-solid border-[#919EAB52] px-2 pb-2 pt-4 rounded-lg  placeholder:text-[#919EAB]"
                      placeholder="Password"
                    />
                  </form>
                  <div className="flex-col items-center justify-center space-y-4 mt-6">
                    <button
                      form="login-form"
                      className="flex w-full bg-blue-500 border-0 py-1 px-3 focus:outline-none  rounded text-base text-white mt-4 md:mt-0"
                      type="submit"
                    >
                      Login
                    </button>
                    <button
                      className="flex w-full  bg-blue-500 border-0 py-1 px-3 focus:outline-none  rounded text-base text-white mt-4 md:mt-0"
                      onClick={handleLoginGoogle}
                    >
                      Sign in with Google
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}
