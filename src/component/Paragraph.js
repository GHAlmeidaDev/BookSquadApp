import React from 'react'
import { StyleSheet } from 'react-native'
import { Text } from 'react-native-paper'

const Paragraph = (props) => <Text style={styles.text} {...props} />

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    lineHeight: 21,
    textAlign: 'center',
    marginBottom: 22,
    fontWeight:'bold',
    color: '#808080'
  },
})

export default Paragraph
