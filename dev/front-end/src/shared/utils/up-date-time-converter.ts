// import dayjs from "dayjs";
// import utc from "dayjs/plugin/utc";

// dayjs.extend(utc);

// declare global {
//   interface String {
//     toUpLocalDate(): string;
//     toUpLocalTime(showSeconds?: boolean): string;
//     toUpLocalDateTime(showSeconds?: boolean): string;
//   }

//   interface Date {
//     toUpLocalDate(): string;
//     toUpLocalTime(showSeconds?: boolean): string;
//     toUpLocalDateTime(showSeconds?: boolean): string;
//   }
// }

// const _fromUtc = (date: String | number | Date) => {
//   return dayjs.utc(date as any).local();
// };

// String.prototype.toUpLocalDate = function (): string {
//   return _fromUtc(this).format("DD/MM/YYYY");
// };

// Date.prototype.toUpLocalDate = function (): string {
//   return _fromUtc(this).format("DD/MM/YYYY");
// };

// String.prototype.toUpLocalTime = function (
//   showSeconds: boolean = false,
// ): string {
//   const format = showSeconds ? "HH:mm:ss" : "HH:mm";
//   return _fromUtc(this).format(format);
// };

// Date.prototype.toUpLocalTime = function (showSeconds: boolean = false): string {
//   const format = showSeconds ? "HH:mm:ss" : "HH:mm";
//   return _fromUtc(this).format(format);
// };

// String.prototype.toUpLocalDateTime = function (
//   showSeconds: boolean = false,
// ): string {
//   const format = showSeconds ? "DD/MM/YYYY HH:mm:ss" : "DD/MM/YYYY HH:mm";
//   return _fromUtc(this).format(format);
// };

// Date.prototype.toUpLocalDateTime = function (
//   showSeconds: boolean = false,
// ): string {
//   const format = showSeconds ? "DD/MM/YYYY HH:mm:ss" : "DD/MM/YYYY HH:mm";
//   return _fromUtc(this).format(format);
// };

// export {};

// // export const toUpLocalDate = (date: string | number | Date): string => {
// //     return _fromUtc(date).format("DD/MM/YYYY");
// // }

// // export const toUpLocalTime = (date: string | number | Date, showSeconds: boolean = false): string => {
// //     const format = showSeconds ? "HH:mm:ss" : "HH:mm";
// //     return _fromUtc(date).format(format);
// // }

// // export const toUpLocalDateTime = (date: string | number | Date, showSeconds: boolean = false): string => {
// //     const format = showSeconds ? "DD/MM/YYYY HH:mm:ss" : "DD/MM/YYYY HH:mm";
// //     return _fromUtc(date).format(format);
// // }
