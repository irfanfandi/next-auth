import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

type Props = {};

const page = async (props: Props) => {
  const session = await getServerSession(authOptions);
  const user = session?.user || {};
  const objectArray = Object.entries(user);

  return (
    <main className="flex min-h-screen flex-col  p-24">
      {objectArray.map((e, idx) => (
        <p key={idx}>{`${e[0]} : ${e[1]}`}</p>
      ))}
    </main>
  );
};

export default page;
