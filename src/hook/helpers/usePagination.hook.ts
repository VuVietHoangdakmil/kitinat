import { useCallback, useState } from "react";
import useSWR from "swr";

// interface PaginationResult {
//   data: any;
//   isLoading: boolean;
//   isValidating: boolean;
//   isError: boolean;
//   isLoadMore: boolean;
//   loadMore: (queryOptions: any) => Promise<void>;
//   refresh: () => Promise<void>;
//   reload: () => Promise<void>;
// }
type Fetcher = (query: any) => Promise<any>;

/**
 *
 * @param key The key of the fetcher SWR
 * @param query The object of QueryOptions (page, limit, offset,...)
 * @param fetcher The callback to fetch data from API
 * @param inverted If true, data return will be reverted
 * @returns {Object} The list data with pagination
 *  @property {boolean} isLoading: true if the api is fetching
 *  @property {boolean} isValidating: true if the api is validating
 *  @property {Object} data: The list data with pagination
 *  @property {boolean} isError: true if the api is error
 *  @property {boolean} isLoadMore: true if the api is load more
 *  @property {function} loadMore: This callback will be load more data
 *  @property {function} refresh: This callback will be refresh data
 *  @property {function} reload: This callback will be reload data
 */
export function usePagination(
  key: string | null,
  query: any,
  fetcher: Fetcher,
  inverted?: boolean
  // swrConfig?: SWRConfiguration<SWRResponse<ResponsePagination<T>>>,
): any {
  const [isLoadMore, setIsLoadMore] = useState(false);

  const callback = useCallback(() => {
    return fetcher({ ...query });
  }, [JSON.stringify({ ...query })]);

  const { data, error, isValidating, isLoading, mutate } = useSWR(
    key,
    callback,
    {
      revalidateIfStale: true,
      revalidateOnFocus: false,
    }
  );

  /**
   * @remarks
   * This callback will be load more data
   * @see {@link http://example.com/@internal | the @internal tag}
   */
  const loadMore = useCallback(async () => {
    if (data) {
      setIsLoadMore(true);
      // const updateData = await fetcher({
      //   ...{ ...query, ...queryOptions },
      // });

      // mutate(
      //   (prevData: ResponsePagination<T> | undefined) => {
      //     if (!prevData) {
      //       return undefined;
      //     }
      //     return {
      //       ...updateData,
      //     };
      //   },
      //   { revalidate: false }
      // );
      setIsLoadMore(false);
    }
  }, [data, query, mutate, fetcher, inverted]);

  /**
   * This callback wile be refresh data
   */
  const refresh = useCallback(async () => {
    const updateData = await fetcher({
      ...query,
    });
    mutate(updateData, { revalidate: false });
  }, [fetcher, mutate, JSON.stringify(query)]);

  /**
   * This callback wile be reload data
   */
  const reload = useCallback(async () => {
    // const updateData = await fetcher({ ...query });

    mutate();
  }, [fetcher, mutate, { ...query }]);

  return {
    data,
    isLoading: isLoading,
    isError: !!error,
    loadMore,
    isLoadMore,
    refresh,
    reload,
    isValidating,
  };
}
