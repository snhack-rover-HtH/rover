import * as React from "react";
import clsx from "clsx"; // For conditional classNames

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "link" | "outline";
  size?: "sm" | "md" | "lg" | "icon";
  className?: string;                             
}

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}) => {
  const baseStyles = "inline-flex items-center justify-center rounded-md font-medium transition";
  const variantStyles = {
    primary: "bg-indigo-600 text-white hover:bg-indigo-700",
    secondary: "bg-gray-600 text-white hover:bg-gray-700",
    ghost: "bg-transparent text-gray-600 hover:bg-gray-100",
    link: "text-indigo-600 hover:underline",
    outline: "border border-gray-300 text-gray-700 hover:bg-gray-100"
  };

  const sizeStyles = {
    sm: "px-3 py-1 text-sm",
    md: "px-4 py-2 text-md",
    lg: "px-6 py-3 text-lg",
    icon: "p-2" // For icons only
  };

  return (
    <button
      className={clsx(baseStyles, variantStyles[variant], sizeStyles[size], className)}
      {...props}
    >
      {children}
    </button>
  );
};
