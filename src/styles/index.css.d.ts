// CSS Module Declaration for index.css
declare module '*.css' {
  const content: { [className: string]: string };
  export default content;
}

// Side-effect import declaration
declare module '../src/styles/index.css' {
  const content: void;
  export default content;
}
