import React from 'react';

import BaseCard from '../Card';

import { useAppBarStyle } from './hooks';

type Props = {
  leftSide: () => JSX.Element;
  rightSide: () => JSX.Element;
};

export default function AppBar(props: Props) {
  let appBarStyle = useAppBarStyle();

  let LeftSide = props.leftSide;
  let RightSide = props.rightSide;

  return (
    <BaseCard
      containerStyle={appBarStyle.container}
      contentStyle={appBarStyle.content}>
      <LeftSide />
      <RightSide />
    </BaseCard>
  );
}
