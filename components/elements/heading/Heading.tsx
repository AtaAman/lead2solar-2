import cx from "clsx";
import React from "react";

interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  as: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

const Heading = ({ as = "h2", children, className }: HeadingProps) => {
  const sizeClasses = {
    h1: "text-4xl sm:text-5xl",
    h2: "text-3xl sm:text-4xl",
    h3: "text-2xl sm:text-3xl",
    h4: "text-xl sm:text-2xl",
    h5: "text-lg sm:text-xl",
    h6: "text-base sm:text-lg",
  };

  const getFontSizeClass = () => {
    return sizeClasses[as];
  };

  const HeadingElement = ({
    ...props
  }: React.HTMLAttributes<HTMLHeadingElement>) =>
    React.createElement(as, props, children);

  return (
    <HeadingElement className={cx(className, getFontSizeClass())}>
      {children}
    </HeadingElement>
  );
};

export { Heading };
