import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { getFeeds } from '../../services/slices/feedSlice';
import { RootState } from '../../services/store';

export const selectOrders = (state: RootState) => state.feed.orders;

export const Feed: FC = () => {
  const orders: TOrder[] = useSelector(selectOrders);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFeeds());
  }, [dispatch]);

  if (!orders.length) return <Preloader />;

  return <FeedUI orders={orders} handleGetFeeds={() => dispatch(getFeeds())} />;
};
