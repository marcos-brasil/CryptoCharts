import type {
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleProp,
  ViewStyle,
} from 'react-native';

import type { Emitter } from '../../utils';

export type SimpleFlatlistProps<T> = {
  data: T[];

  maxNumColumn?: number;
  itemHeight: number;
  itemWidth: number;
  showsVerticalScrollIndicator?: boolean;
  showsHorizontalScrollIndicator?: boolean;
  scrollEventThrottle?: number;
  renderItem: (item: T, index: number) => JSX.Element;
  onScroll?: (e: NativeSyntheticEvent<NativeScrollEvent>) => void;
  contentContainerStyle?: StyleProp<ViewStyle>;
  onEndReachedThreshold?: number;
  onEndReached?: (n: number) => void;
};

export type Evt = {
  scroll: number;
};

export type RenderItemsPros<T> = {
  data: T[];
  event: Emitter<Evt>;
  itemHeight: number;
  winSize?: number;
  maxNumColumn?: number;
  itemWidth: number;
  onEndReachedThreshold?: number;
  renderItem: (item: T, idx: number) => JSX.Element;
  onEndReached?: (n: number) => void;
  // renderBlankItem: (item: T, idx: number) => JSX.Element;
};
