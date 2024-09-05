import { FC } from 'react';
import { useSelector, RootState } from '../../services/store';
import { TOrder } from '@utils-types';
import { FeedInfoUI } from '../ui/feed-info';
import {
  getOrdersFeeds,
  getTotalFeeds,
  getTotalTodayFeeds
} from '../../services/slices/feedSlice';

const getOrders = (orders: TOrder[], status: string): number[] =>
  orders
    .filter((item) => item.status === status)
    .map((item) => item.number)
    .slice(0, 20);

export const FeedInfo: FC = () => {
  const orders = useSelector(getOrdersFeeds);
  const readyOrders = getOrders(orders, 'done');
  const pendingOrders = getOrders(orders, 'pending');
  const totalFeeds = useSelector((state: RootState) => getTotalFeeds(state));
  const totalToday = useSelector((state: RootState) =>
    getTotalTodayFeeds(state)
  );

  return (
    <FeedInfoUI
      readyOrders={readyOrders}
      pendingOrders={pendingOrders}
      feed={{
        total: totalFeeds,
        totalToday: totalToday
      }}
    />
  );
};
