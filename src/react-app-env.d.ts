/// <reference types="react-scripts" />

declare module "*.scss" {
  const content: string;
  export default content;
}

declare module "*.module.scss" {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module "*.module.css" {
  const classes: { readonly [key: string]: string };
  export default classes;
}
