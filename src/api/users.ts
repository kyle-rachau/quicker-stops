import { Amplify, type ResourcesConfig } from 'aws-amplify';
// import amplifyconfig from './src/amplifyconfiguration.json';
import { post } from 'aws-amplify/api';

const resConfig = {
  endpoint: 'https://6nfie7awye.execute-api.us-east-1.amazonaws.com/dev',
};

const apiConfig: ResourcesConfig['API'] = {
  REST: {
    'quicker-stops': resConfig,
  },
};

Amplify.configure({
  API: apiConfig,
});

export async function createUser(body: any) {
  try {
    const restOperation = post({
      apiName: 'quicker-stops',
      path: `/users`,
      options: {
        body: {
          body,
        },
      },
    });
    const response = await restOperation.response;
    const json = await response.body.json();
    return json;
  } catch (e) {
    console.log(e);
  }
}
