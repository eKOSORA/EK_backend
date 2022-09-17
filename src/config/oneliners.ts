import { exec } from 'child_process';
import { isArray } from 'class-validator';

// eslint-disable-next-line @typescript-eslint/no-var-requires
export const chalk = require('chalk');

export const red = chalk.red;
export const green = chalk.green;
export const yellow = chalk.yellow;
export const checkEmoji = '🔄';
export const infoEmoji = '❕';
export const errorEmoji = '❌';

// export const checkEmoji = '🔴';
export const obj_without = (obj: object, ...remove: string[]) => {
  const newObject = {};
  for (const key of Object.keys(obj)) {
    newObject[key] = remove.includes(key) ? undefined : obj[key];
  }
  return newObject;
};

export const deep_stringify = (obj: object) => JSON.parse(JSON.stringify(obj));
export const isProd = () => process.env.NODE_ENV === 'production';

export const sys_notification = async (title = 'nestjs', message = '') => {
  try {
    exec(`notify-send "${title}" "${message}"`);
  } catch (e) {
    console.log(red(errorEmoji, 'Failed to send notification'));
  }
};

export const arr_to_obj = (arr: Array<any>, fill?: any) => {
  if (!arr.map) return {};
  return arr.reduce((p, c) => {
    const key = isArray(c) ? c[0] : c;
    const val = isArray(c)
      ? arr_to_obj(isArray(c[1]) ? c[1] : [c[1]], fill)
      : fill ?? c;
    return { ...p, [key]: val };
  }, {});
};
