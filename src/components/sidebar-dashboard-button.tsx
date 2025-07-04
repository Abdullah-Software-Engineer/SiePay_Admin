import { cva } from "class-variance-authority";

export const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-base ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 rounded-full space-x-3",
  {
    variants: {
      variant: {
        "default-sidebar-button":
          "text-white bg-gradient-to-r from-[#cecece80] to-[#00193900] ",
        ghost: "text-white ",
      },
      size: {
        default: "h-8 px-4",
        sm: "h-7 px-3 text-sm space-x-2",
        lg: "h-11 px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default-sidebar-button",
      size: "default",
    },
  }
);
