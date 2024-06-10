import type {ComponentProps, FC, ReactNode} from "react";

export type IconProps = Omit<ComponentProps<"svg">, "size" | "color" | "children"> & {
    size?: "small" | "medium" | "large" | "extra-large" | number;
    color?: string;
    spin?: boolean;
    children?: ReactNode;
};

export const AbstractIcon: FC<IconProps> = ({className, size, spin, color, ...props}) => {
    return (
        <svg
            className={`aerelon-icon ${spin === true ? "animate-spin" : ""} ${className ?? ""}`}
            style={{
                ...(color == null ? {} : {color}),
                ...(typeof size === "number" ? {fontSize: size} : {}),
            }}
            width="1em"
            height="1em"
            viewBox="0 0 8 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        />
    );
};

AbstractIcon.displayName = "AbstractIcon";
