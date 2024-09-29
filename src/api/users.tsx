import { Amplify } from 'aws-amplify';
//import amplifyconfig from './src/amplifyconfiguration.json';
import { post } from 'aws-amplify/api';

const awsconfig = {
  aws_project_region: 'us-east-1',
};

Amplify.configure(awsconfig);

const existingConfig = Amplify.getConfig();

// Add existing resource to the existing configuration.
Amplify.configure({
  ...existingConfig,
  API: {
    ...existingConfig.API,
    REST: {
      ...existingConfig.API?.REST,
      api: {
        endpoint: 'https://6nfie7awye.execute-api.us-east-1.amazonaws.com/dev',
        region: 'us-east-1',
      },
    },
  },
});

export async function createUser(body: any) {
  console.log(body);
  try {
    const restOperation = post({
      apiName: 'api',
      path: `/users`,
      options: {
        body: {
          body,
        },
      },
    });

    console.log(restOperation);
    const response = await restOperation.response;
    const json = await response.body.json();
    return json;
  } catch (e) {
    console.log(e);
  }
}
