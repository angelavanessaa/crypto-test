import { TextStyle } from 'react-native';

const CrypTypography: Record<
  | 'display1'
  | 'display2'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'bodyXL'
  | 'bodyL'
  | 'bodyM'
  | 'bodyS'
  | 'labelXL'
  | 'labelL'
  | 'labelM'
  | 'labelS'
  | 'labelXS',
  TextStyle
> = {
  display1: {
    fontWeight: '600',
    fontSize: 32,
    lineHeight: 44,
  },
  display2: {
    fontWeight: '600',
    fontSize: 24,
    lineHeight: 32,
  },
  h1: {
    fontWeight: '600',
    fontSize: 21,
    lineHeight: 28,
  },
  h2: {
    fontWeight: '600',
    fontSize: 18,
    lineHeight: 24,
  },
  h3: {
    fontWeight: '700',
    fontSize: 14,
    lineHeight: 18,
  },
  bodyXL: {
    fontWeight: '500',
    fontSize: 16,
    lineHeight: 24,
  },
  bodyL: {
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 22,
  },
  bodyM: {
    fontWeight: '500',
    fontSize: 12,
    lineHeight: 18,
  },
  bodyS: {
    fontWeight: '500',
    fontSize: 11,
    lineHeight: 16,
  },
};

export default CrypTypography;
