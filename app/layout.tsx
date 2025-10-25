import type { Metadata } from "next";
import { Montserrat, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/providers/theme-provider";
import LenisProvider from "@/components/LenisProvider";
import { Toaster } from "sonner";
import { QuotesProvider } from "@/providers/quotes-provider";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Quote Generator | Lyrise",
  description: "Generate inspiring quotes with AI-powered automation",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="overflow-x-hidden">
      <body
        className={`${montserrat.variable} ${spaceGrotesk.variable} w-full relative bg-image bg-[#111111] antialiased`}
      >
        <LenisProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <QuotesProvider>
              {children}
              <Toaster
                position="top-center"
                richColors
                closeButton
                theme="dark"
              />
            </QuotesProvider>
          </ThemeProvider>
        </LenisProvider>
      </body>
    </html>
  );
}
