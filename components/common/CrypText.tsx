import { Text, TextProps } from 'react-native';
import React from 'react';
import CrypColors from './CrypColors';

type Props = {
  color: keyof typeof CrypColors;
} & TextProps;

export default function CrypText(props: Props) {
  const { color, children, style, ...rest } = props;
  const textStyle = {
    color: CrypColors[color],
    ...(style as object),
  };
  return (
    <Text style={textStyle} {...rest}>
      {children}
    </Text>
  );
}
