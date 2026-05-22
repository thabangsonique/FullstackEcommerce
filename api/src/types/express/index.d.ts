export {}; //turning file into typescript module

declare global {
  //tells typescript to expand and add the following declarations.
  namespace Express {
    export interface Request {
      //Declaration merging
      userId?: number;
      cleanBody?: any;
    }
  }
}
