export interface GlobalConfigType {
  environment: 'production' | 'development';
  version: string;
}

export const GlobalConfig: GlobalConfigType = {
  environment: process.env.ENVIRONMENT as 'production' | 'development',
  version: process.env.VERSION as string,
};
