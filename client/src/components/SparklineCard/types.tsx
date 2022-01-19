import { CoinMetadata } from '../../types';

export type { CoinMetadata };
export type CardProps = React.HTMLAttributes<unknown> & { item: CoinMetadata };
