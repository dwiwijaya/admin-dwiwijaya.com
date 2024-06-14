import Overlay from "@/components/layout/Overlay";
import Sidebar from "@/components/layout/Sidebar";
import { AuthStateChangeProvicer } from "@/context/auth";
import { UserProvider } from "@/context/user";
import "@/styles/globals.css";
import "@/styles/css/fa.min.css";
import { ThemeProvider } from "next-themes";
import dynamic from "next/dynamic";
import { Onest } from 'next/font/google'
import { Toaster } from "react-hot-toast";
import { getLastCommitDate } from "@/services/GithubServices";
import { Button, Modal } from "flowbite-react";
import { useState } from "react";

const onest = Onest({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
})
const ProgressBar = dynamic(
  () => import('../components/elements/ProgressBar'),
  { ssr: false }
);

export default function App({ Component, pageProps, lastCommitDate }) {

  return <>
    <ThemeProvider attribute='class' enableSystem={false} disableTransitionOnChange={true}>
      <UserProvider>
        <AuthStateChangeProvicer>
          <ProgressBar />
          <Toaster
            toastOptions={{
              style: {
                background: "rgb(var(--container-color))",
                color: "var(--text-color)",
              },
            }}
            position="top-right"
          />

          <Sidebar lastUpdate={lastCommitDate} />

          <main className={`${onest.className} group/main lg:ml-64  ml-0 min-h-[100vh]`}>
            <Overlay />
            <Component {...pageProps} />
          </main>
        </AuthStateChangeProvicer>
      </UserProvider>
    </ThemeProvider>
  </>
}
App.getInitialProps = async () => {
  const lastCommitDate = await getLastCommitDate();
  return { lastCommitDate };
};