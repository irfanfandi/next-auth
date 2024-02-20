import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

type Props = {};

const page = async (props: Props) => {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  return (
    <main className="flex min-h-screen flex-col  p-24">
      <p className="max-w-8">{JSON.stringify(user)}</p>
    </main>
  );
};

export default page;
