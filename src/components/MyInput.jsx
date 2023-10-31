import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';

import { Theme } from '../constants/Theme';
import MyIcon from './MyIcon';

const theme = Theme();
const MyInput = ({
  text,
  style,
  icon,
  password,
  error,
  props,
  type,
  onChangeText,
  value,
  material,
}) => {
  const [showPassword, setShowPassword] = useState(true);
  return (
    <View style={[styles.container, style]}>
      <MyIcon name={icon} style={styles.icon} material={material} />
      <TextInput
        style={[styles.input, error && { borderColor: theme.palette.red }]}
        placeholder={text}
        secureTextEntry={password && showPassword ? true : false}
        keyboardType={type}
        value={value}
        onChangeText={onChangeText}
        {...props}
      />
      {password && (
        <TouchableOpacity
          style={styles.iconRight}
          onPress={() => setShowPassword((prev) => !prev)}
        >
          <MyIcon name={showPassword ? 'eye' : 'eye-off'} size={30} />
        </TouchableOpacity>
      )}
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

export default MyInput;

const styles = StyleSheet.create({
  container: {
    marginVertical: -3,
  },
  input: {
    padding: 10,
    borderRadius: 10,
    fontSize: 20,
    borderWidth: 2,
    borderColor: 'gray',
    paddingLeft: 45,
  },
  icon: {
    transform: [{ translateY: 43 }, { translateX: 10 }],
    opacity: 0.8,
  },
  errorText: {
    marginLeft: 10,
    color: theme.palette.red,
  },
  iconRight: {
    position: 'absolute',
    right: 20,
    top: 40,
  },
});
