import {FC} from "react";

import {AbstractIcon, IconProps} from "@/components/Icon";

export const Seat: FC<IconProps> = props => {
    return (
        <AbstractIcon {...props} viewBox={"0 0 1024 1024"}>
            <path
                d="M921.809455 928.395636h-102.423273v18.059637c0 30.045091-22.970182 54.272-51.2 54.272-28.253091 0-51.223273-24.343273-51.223273-54.272v-18.059637H307.269818v18.059637c0 30.045091-22.970182 54.272-51.2 54.272-28.253091 0-51.223273-24.343273-51.223273-54.272v-18.059637H102.423273C64.721455 928.395636 0 859.810909 0 819.758545v-398.196363c0-39.936 30.510545-72.424727 68.235636-72.424727h68.258909c37.701818 0 68.235636 32.349091 68.235637 72.424727V711.214545h614.539636V421.562182c0-39.936 30.510545-72.424727 68.235637-72.424727h68.258909c37.701818 0 68.235636 32.349091 68.235636 72.424727V819.898182c0.232727 39.936-64.465455 108.520727-102.190545 108.520727zM853.550545 276.712727c-56.552727 0-102.4 48.686545-102.4 108.660364v253.416727H273.058909V385.349818c0-59.973818-45.847273-108.660364-102.4-108.660363-12.008727 0-23.458909-4.072727-34.210909 0V131.956364C136.494545 71.959273 182.341818 23.272727 238.941091 23.272727h546.280727c56.599273 0 102.423273 48.686545 102.423273 108.660364v144.872727c-10.752-4.189091-22.062545-0.116364-34.071273-0.116363z"
                fill="currentColor"
            />
        </AbstractIcon>
    );
};