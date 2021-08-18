import * as mongoose from 'mongoose';
import * as config from 'config';

export const DatabaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: (): Promise<typeof mongoose> =>
      mongoose.connect(config.db.connectionString),
  },
];