declare module '*.css' {
  const content: { [className: string]: string };
  export default content;
}

declare module '../src/styles/index.scss' {
  const content: void;
  export default content;
}
