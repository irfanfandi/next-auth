import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import ButtonLogout from "./components/ButtonLogout";

type Props = {};

const page = async (props: Props) => {
  const session = await getServerSession(authOptions);
  const user = session?.user;
  console.log(user, "user");

  return (
    <>
      <header className="text-gray-600 body-font border-b-[1px]">
        <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
          <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
            <span className="ml-3 text-xl">Tailblocks</span>
          </a>
          <div className="md:ml-auto flex flex-wrap items-center text-base justify-center gap-6">
            <p>{user?.email}</p>
            <ButtonLogout />
          </div>
        </div>
      </header>
      <main className="flex min-h-screen flex-col items-center justify-between p-24"></main>
    </>
  );
};

export default page;
