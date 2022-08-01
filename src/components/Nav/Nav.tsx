import Link from "next/link";
import Script from "next/script";
import Head from "next/head";
import { useTheme } from "next-themes";
import { MoonIcon } from "@heroicons/react/solid";
import { SunIcon } from "@heroicons/react/outline";

const renderThemeChanger = ({
  systemTheme,
  theme,
  setTheme,
  mounted,
}: {
  systemTheme: "light" | "dark" | undefined;
  theme: string | undefined;
  setTheme: (theme: string) => void;
  mounted: boolean;
}) => {
  if (!mounted) return null;

  const currentTheme = theme === "system" ? systemTheme : theme;
  const buttonStyles =
    "p-2 rounded-md hover:ring-2 hover:ring-gray-300 dark:hover:ring-gray-700";

  if (currentTheme === "dark") {
    return (
      <SunIcon
        className={`w-11 h-11 ${buttonStyles}`}
        role="button"
        onClick={() => setTheme("light")}
      />
    );
  } else {
    return (
      <MoonIcon
        className={`w-11 h-11 ${buttonStyles}`}
        role="button"
        onClick={() => setTheme("dark")}
      />
    );
  }
};

export default function Nav({ mounted }: { mounted: boolean }) {
  const { systemTheme, theme, setTheme } = useTheme();
  return (
    <>
      <Script src="./src/toggle.js" strategy="beforeInteractive"></Script>
      <div
        style={{ width: "80%", marginLeft: "auto", marginRight: "auto" }}
        className="items-center flex flex-row pt-3"
      >
        <Link href="/" passHref>
          <p
            style={{ cursor: "pointer" }}
            className="uppercase font-semibold pr-4 border-indigo-300 flex-1"
          >
            Aayaan Sahu
          </p>
        </Link>
        <Link href="/search" passHref>
          <p
            style={{ cursor: "pointer" }}
            className="uppercase font-semibold pr-4 border-indigo-300"
          >
            SEARCH
          </p>
        </Link>
        <Link href="/tags" passHref>
          <p
            style={{ cursor: "pointer" }}
            className="uppercase font-semibold pr-4 border-indigo-300"
          >
            Tags
          </p>
        </Link>
        <Link href="/links" passHref>
          <p
            style={{ cursor: "pointer" }}
            className="uppercase font-semibold pr-4 border-indigo-300"
          >
            LINKS
          </p>
        </Link>
        {renderThemeChanger({ systemTheme, theme, setTheme, mounted })}
      </div>
    </>
  );
}
