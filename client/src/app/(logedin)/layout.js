import "@/app/globals.css";
import { Poppins } from "next/font/google";
import { ThemeProviders } from "@/app/providers";
import Header from "@/components/custom/header/Header";
import Sidebar from "@/components/custom/sidebar/sidebar";
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["500", "900"],
});
export const metadata = {
  title: "Create Next App",
  description:
    "Effortlessly manage your mess with our all-in-one Mess Management System. Track expenses, manage meals, and coordinate members with ease. Perfect for mess managers, assistant managers, and members. Simplify mess operations today!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${poppins.className} bg-background`}>
        <ThemeProviders>
          <Header />
          <main className="flex ">
            <Sidebar />
            <section>{children}</section>
          </main>
        </ThemeProviders>
      </body>
    </html>
  );
}
