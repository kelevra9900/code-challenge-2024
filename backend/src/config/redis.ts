import { createClient, RedisClientType } from 'redis';
import winston from 'winston';

class Redis {
  private static instance: Redis;

  private readonly redisUri: string;

  public client: RedisClientType | undefined;

  constructor(redisUri: string) {
    this.redisUri = redisUri;

    this.createClient();
  }

  private createClient() {
    try {
      this.client = createClient({
        url: this.redisUri,
      });
    } catch (error) {
      winston.error(error);
    }
  }

  public async run() {
    try {
      if (!this.client) {
        this.createClient();
      }
    } catch (error) {
      winston.error(error);
    }
  }

  public async stop() {
    try {
      if (this.client) {
        this.client.quit();
      }
    } catch (error) {
      winston.error(error);
    }
  }

  public static getInstance(): Redis {
    if (!Redis.instance) {
      Redis.instance = new Redis(process.env.REDIS_URI!);
    }

    return Redis.instance;
  }
}

export const redis = Redis.getInstance();
