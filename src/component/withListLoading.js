import React from 'react';
import { View, Text } from 'react-native'

function withListLoading(Component) {
  return function Comp({ isLoading, ...props }) {
    if (!isLoading) return <Component {...props} />;
    return (
      <View >
        <Text style={{paddingTop:100}}>Hold on, fetching data may take some time :)</Text>
      </View>
    );
  };
}
export default withListLoading;