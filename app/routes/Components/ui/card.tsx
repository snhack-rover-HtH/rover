import * as React from "react";
import clsx from "clsx";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export const Card: React.FC<CardProps> = ({ className, children, ...props }) => {
  return (
    <div
      className={clsx(
        "bg-white rounded-lg shadow-md p-4",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export const CardHeader: React.FC<CardHeaderProps> = ({ className, children, ...props }) => {
  return (
    <div className={clsx("pb-2", className)} {...props}>
      {children}
    </div>
  );
};

interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  className?: string;
}

export const CardTitle: React.FC<CardTitleProps> = ({ className, children, ...props }) => {
  return (
    <h2 className={clsx("text-lg font-semibold", className)} {...props}>
      {children}
    </h2>
  );
};

interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export const CardContent: React.FC<CardContentProps> = ({ className, children, ...props }) => {
  return (
    <div className={clsx("mt-4", className)} {...props}>
      {children}
    </div>
  );
};
