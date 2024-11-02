import "@/app/globals.css";
import { Poppins } from "next/font/google";
import {
  AllMessProvider,
  MessProvider,
  RenderProvider,
  ThemeProviders,
} from "@/app/providers";
import Header from "@/components/custom/header/Header";
import { Toaster } from "@/components/ui/toaster";
// import MainSection from "@/components/custom/main-section/main-section";
import Loading from "@/components/custom/loader/loading";
import dynamic from "next/dynamic";
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["500", "900"],
});
export const metadata = {
  title: "Create Next App",
  description:
    "Effortlessly manage your mess with our all-in-one Mess Management System. Track expenses, manage meals, and coordinate members with ease. Perfect for mess managers, assistant managers, and members. Simplify mess operations today!",
};

const LazyComponent = dynamic(
  () => import("@/components/custom/main-section/main-section"),
  {
    loading: () => <Loading />,
    ssr: false,
  }
);

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${poppins.className} bg-background`}>
        <ThemeProviders>
          {/* <MainSection/> */}
          <RenderProvider>
            <AllMessProvider>
              <Header />
              <MessProvider>
                <LazyComponent child={children} />
                <Toaster />
              </MessProvider>
            </AllMessProvider>
          </RenderProvider>
        </ThemeProviders>
      </body>
    </html>
  );
}
