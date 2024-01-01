import { useCallback, useLayoutEffect, useState } from "preact/hooks";
import classnames from "classnames";
import { SunIcon, MoonIcon } from "@components/ui/icons";
import Button from "@components/ui/Button";

const ThemeToggle = (props: { class?: string }) => {
  const [mounted, setMounted] = useState(false);

  // themeSetting records the user's preference if set, or "system" if not
  const [themeSetting, setThemeSetting] = useState<"system" | "light" | "dark">(
    "system"
  );
  // currentTheme is the current theme that is applied
  const [currentTheme, setCurrentTheme] = useState<"light" | "dark">("light");

  // get the current theme state on first render
  useLayoutEffect(() => {
    const storedTheme = window?.localStorage?.getItem("theme");

    if (storedTheme && (storedTheme === "light" || storedTheme === "dark")) {
      setThemeSetting(storedTheme);
    } else {
      setThemeSetting("system");
    }

    // the theme query parameter overrides other settings
    const paramTheme = new URLSearchParams(window.location.search).get("theme");
    if (paramTheme && (paramTheme === "light" || paramTheme === "dark")) {
      setCurrentTheme(paramTheme);
    } else {
      setCurrentTheme(
        document.documentElement.classList.contains("dark") ? "dark" : "light"
      );
    }

    if (!mounted) {
      setMounted(true);
    }
  }, []);

  // update currentTheme when themeSetting changes
  useLayoutEffect(() => {
    // the theme query parameter overrides other settings
    const paramTheme = new URLSearchParams(window.location.search).get("theme");
    if (paramTheme && (paramTheme === "light" || paramTheme === "dark")) {
      setCurrentTheme(paramTheme);
    } else if (themeSetting === "system") {
      const newTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
      setCurrentTheme(newTheme);
      window.localStorage.removeItem("theme");
    } else {
      setCurrentTheme(themeSetting);
      window.localStorage.setItem("theme", themeSetting);
    }
  }, [themeSetting]);

  // update CSS classes when currentTheme changes
  useLayoutEffect(() => {
    if (currentTheme === "light") {
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
    }
  }, [currentTheme]);

  const handleThemeToggle = useCallback(() => {
    setThemeSetting(currentTheme === "light" ? "dark" : "light");
  }, [currentTheme]);

  return (
    <Button
      transparent
      iconOnly
      onClick={handleThemeToggle}
      class={classnames(props.class, "size-7")}
      title={
        currentTheme === "light"
          ? "Switch to dark theme"
          : "Switch to light theme"
      }
    >
      {mounted &&
        (currentTheme === "light" ? (
          <>
            <MoonIcon class="width-full" />
            <span class="sr-only">Switch to dark theme</span>
          </>
        ) : (
          <>
            <SunIcon class="width-full" />
            <span class="sr-only">Switch to light theme</span>
          </>
        ))}
    </Button>
  );
};
export default ThemeToggle;
