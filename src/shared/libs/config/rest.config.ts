import { DotenvParseOutput, config } from 'dotenv';
import { Logger } from '../logger/index.js';
import { Config } from './config.interface.js';


export class RestConfig implements Config {
  private readonly config: NodeJS.ProcessEnv;

  constructor(
    private readonly logger: Logger
  ) {
    const pardesOutput = config();

    if (pardesOutput.error) {
      throw new Error('Can\'t read .env file. Perhaps the file does not exists.');
    }

    this.config = <DotenvParseOutput>pardesOutput.parsed;
    this.logger.info('.env file found and successfully parsed!');
  }

  public get(key: string): string | undefined {
    return this.config[key];
  }
}
