import React from 'react';
import MainStackNavigator from './MainStackNavigator';
import aws_config from './aws-exports';
import AWSAppSyncClient, { AUTH_TYPE } from 'aws-appsync';
import { ApolloProvider } from 'react-apollo'

const client = new AWSAppSyncClient({
  url: aws_config.aws_appsync_graphqlEndpoint,
  region: aws_config.aws_appsync_region,
  auth: {
      type: AUTH_TYPE.API_KEY,
      apiKey: aws_config.aws_appsync_apiKey,
  }
});


export default function App() {
    
  return (
      <ApolloProvider client={client}>
        <MainStackNavigator />
      </ApolloProvider>
  )
  
  
}