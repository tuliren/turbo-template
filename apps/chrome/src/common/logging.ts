import { GlobalConfig } from './globalConfig';

export const devLog = (level: 'info' | 'debug' | 'warn' | 'error', ...data: any[]) => {
  if (GlobalConfig.environment !== 'development') {
    return;
  }

  switch (level) {
    case 'info':
      console.info(...data);
      break;
    case 'debug':
      console.debug(...data);
      break;
    case 'warn':
      console.warn(...data);
      break;
    case 'error':
      console.error(...data);
      break;
  }
};
