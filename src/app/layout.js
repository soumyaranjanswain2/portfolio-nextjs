import { ThemeProvider } from "../components/ThemeContext";
import "./globals.css";

export const metadata = {
  title: "Soumya Ranjan | Portfolio",
  description: "Frontend Developer — React, Next.js, Tailwind",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}