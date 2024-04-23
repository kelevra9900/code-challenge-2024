import { OpenApiGeneratorV3, OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';

import { authRegistry } from '@/api/auth/authRouter';
import { categoryRegistry } from '@/api/category/categoryRouter';
import { contentRegistry } from '@/api/content/contentRouter';
import { healthCheckRegistry } from '@/api/healthCheck/healthCheckRouter';
import { themeRegistry } from '@/api/theme/themeRouter';
import { userRegistry } from '@/api/user/userRouter';

export function generateOpenAPIDocument() {
  const registry = new OpenAPIRegistry([
    healthCheckRegistry,
    userRegistry,
    categoryRegistry,
    themeRegistry,
    contentRegistry,
    authRegistry,
  ]);
  const generator = new OpenApiGeneratorV3(registry.definitions);

  return generator.generateDocument({
    openapi: '3.0.0',
    info: {
      version: '1.0.0',
      title: 'Disruptive challenge API',
    },
    externalDocs: {
      description: 'View the raw OpenAPI Specification in JSON format',
      url: '/swagger.json',
    },
  });
}
