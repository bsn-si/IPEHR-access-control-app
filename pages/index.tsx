import { unstable_getServerSession } from "next-auth/next";
import { options } from "./api/auth/[...nextauth]";
import { getCsrfToken } from "next-auth/react";

export async function getServerSideProps(context: any) {
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    options
  );
  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  } else {
    return {
      redirect: {
        destination: "/doctors",
        permanent: false,
      },
    };
  }
  return {
    props: {
      csrfToken: await getCsrfToken(context),
      session,
    },
  };
}

export default function Home() {
  return <></>;
}
