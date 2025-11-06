import type { Metadata } from "next";
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '../shared/context/ThemeContext';
import { UserProvider } from '../shared/context/UserContext';
import { DashboardProvider } from '../features/dashboard';
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "NextJS Dashboard",
  description: "NextJS Dashboard using MUI and Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          <UserProvider>
            <DashboardProvider>
              <CssBaseline />
              {children}
            </DashboardProvider>
          </UserProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
