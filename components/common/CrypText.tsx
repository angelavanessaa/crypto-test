import { Text, TextProps } from 'react-native';
import React from 'react';
import CrypColors from './CrypColors';
import CrypTypography from './CrypTypography';

type Props = {
  type: keyof typeof CrypTypography;
  color: keyof typeof CrypColors;
} & TextProps;

export default function CrypText(props: Props) {
  const { color, type, children, style, ...rest } = props;
  const textStyle = {
    ...(CrypTypography[type] as object),
    color: CrypColors[color],
    ...(style as object),
  };
  return (
    <Text style={textStyle} {...rest}>
      {children}
    </Text>
  );
}
