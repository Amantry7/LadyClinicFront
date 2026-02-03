import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ConfigProvider } from "antd";
import customTheme, { cssVariables } from "@/theme/theme";
import ruRU from 'antd/locale/ru_RU';

// Импорт стилей
import 'antd/dist/reset.css'; // Сброс стилей Ant Design
import { gothamPro, sfProText } from "./fonts";
import StoreProvider from "./StoreProvider";
import Script from "next/script";
import NotifyToaster from "@/features/notification/UI/NotifyToaster";
import { LanguageProvider } from "@/shared/contexts/LanguageContext";



export const metadata: Metadata = {
  title: "lady Clinic ",
  description: "Наша клиника имеет все необходимые лицензии и международные сертификаты качества",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${gothamPro.variable} ${sfProText.variable}`}
      >
        {/* <Script src="/bigbee-auth-widget.js" strategy="afterInteractive" /> */}

        <StoreProvider>
          <LanguageProvider>
            <ConfigProvider
              theme={customTheme}
              locale={ruRU}
              button={{
                style: {
                  fontWeight: 500,
                }
              }}
              input={{
                style: {
                  borderRadius: 8,
                }
              }}
            > <style dangerouslySetInnerHTML={{ __html: cssVariables }} />
              <NotifyToaster />

              {children}

            </ConfigProvider>
          </LanguageProvider>
        </StoreProvider>

      </body>
    </html>
  );
}
