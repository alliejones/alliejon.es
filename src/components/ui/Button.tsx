import type { JSX, ComponentChildren, Component } from "preact";
import classNames from "classnames";

interface ButtonProps extends JSX.HTMLAttributes<HTMLButtonElement> {
  children: ComponentChildren;
  iconOnly?: boolean;
  transparent?: boolean;
}
const Button = ({
  children,
  class: className,
  iconOnly,
  transparent,
  ...buttonProps
}: ButtonProps) => (
  <button
    {...buttonProps}
    class={classNames(
      className,
      "p-1 hover:bg-ink-100 dark:hover:bg-ink-800 transition-colors duration-200 ease-in-out",
      {
        "bg-ink-200 dark:bg-ink-900": !transparent,
        "rounded-full": iconOnly,
        rounded: !iconOnly,
      }
    )}
  >
    {children}
  </button>
);
export default Button;
