import AccessDenied from "@/components/AccessDenied";

const page = ({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) => {
  if (searchParams?.error == "AccessDenied") {
    return <AccessDenied />;
  }

  return <div>{searchParams?.error}</div>;
};

export default page;
