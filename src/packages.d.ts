declare module '*.less' {
    const map: Record<string, string>;
    export = map;
}

declare module '@editorjs/*' {
    const Plugin: import('react').ComponentClass;
    export default Plugin;
}
declare module "*.module.less" {
    const less: { readonly [key: string]: string };
    export default less;
}
declare module "*.module.css" {
    const css: { [key: string]: string };
    export default css;
}
declare module "*.module.scss" {
    const scss: { [key: string]: string };
    export default scss;
}
declare module "jsx:*.svg" {
    import { ComponentType, SVGProps } from "react";
    const SVGComponent: ComponentType<SVGProps<SVGSVGElement>>;
    export default SVGComponent;
  }


declare module '*.svg'
declare module '*.png'
declare module '*.jpg'
declare module '*.jpeg'
declare module '*.gif'
declare module '*.webp'
declare module '*.zip'
declare module 'qrcode.react'

