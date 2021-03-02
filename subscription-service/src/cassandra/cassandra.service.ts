import { Injectable } from '@nestjs/common';
import { Client, mapping, auth } from 'cassandra-driver';

@Injectable()
export class CassandraService {
  CASSANDRA_ENDPOINT =
    process.env.NODE_ENV !== 'production' ? '0.0.0.0' : 'cassandra';
  client: Client;
  mapper: mapping.Mapper;
  private createClient() {
    this.client = new Client({
      contactPoints: [this.CASSANDRA_ENDPOINT],
      keyspace: 'adidas',
      localDataCenter: 'datacenter1',
      authProvider: new auth.PlainTextAuthProvider('cassandra', 'cassandra'),
    });
  }

  createMapper(mappingOptions: mapping.MappingOptions) {
    if (this.client == undefined) {
      this.createClient();
    }
    return new mapping.Mapper(this.client, mappingOptions);
  }
}
