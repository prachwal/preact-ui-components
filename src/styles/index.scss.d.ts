declare module '*.css' {
  const content: Record<string, string>;
  export default content;
}

declare module '../src/styles/index.scss' {
  const content: void;
  export default content;
}
