
// class Connection {
//   constructor(value: any);
// }


// export namespace WebIM {
//   const VERSION: string;
//   const config: any;

//   const connection: typeof Connection;
//   const utils: any;

//   // function connection(value: any): void;
//   function encode(s: string, uriSafe?: boolean): string;
//   function encodeURI(s: string): string;

// }

// // Helper to allow referencing Base64 from inside the global declaration without creating a self reference
// export type WebIM_ = typeof WebIM;



// declare const WebIM: {
//   config: any;
//   utils: any;
//   connection: typeof Connection;
// };
// declare global {
//   const WebIM: WebIM;
// }

declare const WebIM: any;