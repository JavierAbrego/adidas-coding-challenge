import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  // KEYS
  // TODO: retrieve api keys from database, configmap, k8s secrets, ...
  private apiKeys: string[] = ['test'];
  validateApiKey(apiKey: string) {
    return this.apiKeys.find((key) => apiKey === key);
  }
}
