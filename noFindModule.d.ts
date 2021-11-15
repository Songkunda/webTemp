// use css in js ,so add module content for less
declare module "*.less" {
  const content: any;
  export default content;
}
