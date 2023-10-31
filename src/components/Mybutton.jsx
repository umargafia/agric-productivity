import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import React from 'react';

import { Theme } from '../constants/Theme';
import MyIcon from './MyIcon';

const theme = Theme();
const MyButton = ({
  text,
  onPress,
  style,
  background,
  color,
  iconButton,
  iconColor,
  isLoading,
  transparent,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.container,
        transparent && styles.bottomButton,
        background && { backgroundColor: background },

        style,
      ]}
    >
      {!iconButton && (
        <Text style={[styles.text, color && { color }]}>{text}</Text>
      )}
      {iconButton && (
        <MyIcon
          name={iconButton}
          color={iconColor ? iconColor : theme.palette.white}
        />
      )}
    </TouchableOpacity>
  );
};

export default MyButton;

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.palette.primary,
    padding: 10,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    ...theme.shadow,
    borderRadius: 8,
    paddingVertical: 20,
    margin: 10,
    transform: [{ translateX: -10 }],
  },
  text: {
    color: theme.palette.white,
    textAlign: 'center',
    textTransform: 'uppercase',
    fontWeight: 'bold',
    fontSize: 18,
  },
  loading: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    ...theme.shadow,
    borderRadius: 8,
    paddingVertical: 20,
    margin: 10,
    transform: [{ translateX: -10 }],
    backgroundColor: theme.palette.gray,
    height: 50,
  },
  bottomButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: theme.palette.gray,
    elevation: 0,
  },
});
