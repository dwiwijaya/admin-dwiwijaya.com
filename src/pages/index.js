import Image from "next/image";
import { Inter } from "next/font/google";
import LoginForm from "@/components/form/LoginForm";
import { useUser } from "@/context/user";
import Container from "@/components/layout/Container";
import Dashboard from "@/components/views/dashboard/Dashboard";
import { NextSeo } from "next-seo";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const user = useUser();
  return (
    <>
      <NextSeo title='Dashboard - Dwi Wijaya' />
      <Container>
        <Dashboard />
      </Container>
    </>
  );
}
export const getStaticProps = async () => {

  return {
    props: {
    },
  };
};