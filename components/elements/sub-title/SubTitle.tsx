import cx from "clsx";
import { cn } from "../utils";

type SubTitle = {
  subTitle: string;
  className?: string;
  dark?: boolean;
};

export const SubTitle = ({ subTitle, className, dark = false }: SubTitle) => {
  return (
    <div
      className={cn(
        "flex text-white w-full items-center gap-2 border-b  mb-12 sm:mb-14 pb-4",
        !dark ? "border-neutral-300" : "border-secondary-950"
      )}
    >
      <span
        className={cn(
          "h-3 w-3  block rounded-full",
          !dark ? "bg-primary-300" : "bg-secondary-950"
        )}
      />
      <span className={cx(className)}>{subTitle}</span>
    </div>
  );
};
