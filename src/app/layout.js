import { ThemeProvider } from "../components/ThemeContext";
import "./globals.css";

export const metadata = {
  title: "Soumya Ranjan Swain | Frontend Developer",
  description:
    "Frontend Developer skilled in React.js, Next.js, Tailwind CSS and JavaScript.",
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