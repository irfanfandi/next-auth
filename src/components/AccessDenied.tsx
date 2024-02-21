import Link from "next/link";

type Props = {};

const AccessDenied = (props: Props) => {
  return (
    <main className="flex min-h-screen flex-col  p-24">
      Email belum terdaftar,{" "}
      <Link className="text-blue-500" href={"/register"}>
        Silahkan Daftar
      </Link>
    </main>
  );
};

export default AccessDenied;
