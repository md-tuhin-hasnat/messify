import "@/app/globals.css";
import { Poppins } from "next/font/google";
import { ThemeProviders } from "@/app/providers";
import Header from "@/components/custom/header/Header";
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["500", "900"],
});
export const metadata = {
  title: "Create Next App",
  description:
    "Log in to your Mess Management System account to manage expenses, meals, and members efficiently. Secure access for mess managers, assistant managers, and members. Simplify mess operations with a single login.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${poppins.className} bg-background`}>
        <ThemeProviders>
          <Header />
          <main className="flex">
            <section>{children}</section>
          </main>
        </ThemeProviders>
      </body>
    </html>
  );
}
