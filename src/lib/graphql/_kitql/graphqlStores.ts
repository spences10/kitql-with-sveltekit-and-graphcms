import { browser } from '$app/env';
import * as Types from '$lib/graphql/_kitql/graphqlTypes';
import { defaultStoreValue, RequestStatus, type RequestParameters, type RequestQueryParameters, type RequestResult } from '@kitql/client';
import { get, writable } from 'svelte/store';
import { kitQLClient } from '../kitQLClient';
 
function KQL_AllPagesStore() {
	// prettier-ignore
	const { subscribe, set, update } = writable<RequestResult<Types.AllPagesQuery, Types.AllPagesQueryVariables>>(defaultStoreValue);

	const cacheKey = 'KQL_AllPages';

	return {
		subscribe,
		/**
		 * For SSR, you need to provide 'fetch' from the load function
		 * @returns the latest operation and fill this store
		 */
		query: async (
			params?: RequestQueryParameters<Types.AllPagesQueryVariables>
		): Promise<RequestResult<Types.AllPagesQuery, Types.AllPagesQueryVariables>> => {
			let { fetch, variables, settings } = params ?? {};
			let { cacheMs, policy } = settings ?? {};

			const storedVariables = get(KQL_AllPages).variables;
			variables = variables ?? storedVariables;
			policy = policy ?? kitQLClient.policy;

			// Cache only in the browser for now. In SSR, we will need session identif to not mix peoples data
			if (browser) {
				if (policy !== 'network-only') {
					// prettier-ignore
					const cachedData = kitQLClient.requestCache<Types.AllPagesQuery, Types.AllPagesQueryVariables>({
						variables, cacheKey, cacheMs,	browser
					});
					if (cachedData) {
						const result = { ...cachedData, isFetching: false, status: RequestStatus.DONE };
						if (policy === 'cache-first') {
							set(result);
							if (!result.isOutdated) {
								return result;
							}
						} else if (policy === 'cache-only') {
							set(result);
							return result;
						} else if (policy === 'cache-and-network') {
							set(result);
						}
					}
				}
			}

			update((c) => {
				return { ...c, isFetching: true, status: RequestStatus.LOADING };
			});

			// prettier-ignore
			const res = await kitQLClient.request<Types.AllPagesQuery, Types.AllPagesQueryVariables>({
				skFetch: fetch,
				document: Types.AllPagesDocument,
				variables, 
				cacheKey, 
				browser
			});
			const result = { ...res, isFetching: false, status: RequestStatus.DONE, variables };
			set(result);
			return result;
		},
		/**
		 * Reset Cache
		 */
		resetCache(
			variables: Types.AllPagesQueryVariables | null = null,
			allOperationKey: boolean = true,
			withResetStore: boolean = true
		) {
			kitQLClient.cacheRemove(cacheKey, { variables, allOperationKey });
			if (withResetStore) {
				set(defaultStoreValue);
			}
		},
		/**
		 * Patch the store with a new object at the dedicated xPath location
		 */
		patch(newData: Object, xPath: string | null = null) {
			// prettier-ignore
			const updatedStore = kitQLClient.patch<Types.AllPagesQuery, Types.AllPagesQueryVariables>(cacheKey, get(KQL_AllPages), newData, xPath);
			set(updatedStore);
			return updatedStore;
		}
	};
}
/**
 * KitQL Svelte Store with the latest `AllPages` Operation
 */
export const KQL_AllPages = KQL_AllPagesStore();

function KQL_AllPostsStore() {
	// prettier-ignore
	const { subscribe, set, update } = writable<RequestResult<Types.AllPostsQuery, Types.AllPostsQueryVariables>>(defaultStoreValue);

	const cacheKey = 'KQL_AllPosts';

	return {
		subscribe,
		/**
		 * For SSR, you need to provide 'fetch' from the load function
		 * @returns the latest operation and fill this store
		 */
		query: async (
			params?: RequestQueryParameters<Types.AllPostsQueryVariables>
		): Promise<RequestResult<Types.AllPostsQuery, Types.AllPostsQueryVariables>> => {
			let { fetch, variables, settings } = params ?? {};
			let { cacheMs, policy } = settings ?? {};

			const storedVariables = get(KQL_AllPosts).variables;
			variables = variables ?? storedVariables;
			policy = policy ?? kitQLClient.policy;

			// Cache only in the browser for now. In SSR, we will need session identif to not mix peoples data
			if (browser) {
				if (policy !== 'network-only') {
					// prettier-ignore
					const cachedData = kitQLClient.requestCache<Types.AllPostsQuery, Types.AllPostsQueryVariables>({
						variables, cacheKey, cacheMs,	browser
					});
					if (cachedData) {
						const result = { ...cachedData, isFetching: false, status: RequestStatus.DONE };
						if (policy === 'cache-first') {
							set(result);
							if (!result.isOutdated) {
								return result;
							}
						} else if (policy === 'cache-only') {
							set(result);
							return result;
						} else if (policy === 'cache-and-network') {
							set(result);
						}
					}
				}
			}

			update((c) => {
				return { ...c, isFetching: true, status: RequestStatus.LOADING };
			});

			// prettier-ignore
			const res = await kitQLClient.request<Types.AllPostsQuery, Types.AllPostsQueryVariables>({
				skFetch: fetch,
				document: Types.AllPostsDocument,
				variables, 
				cacheKey, 
				browser
			});
			const result = { ...res, isFetching: false, status: RequestStatus.DONE, variables };
			set(result);
			return result;
		},
		/**
		 * Reset Cache
		 */
		resetCache(
			variables: Types.AllPostsQueryVariables | null = null,
			allOperationKey: boolean = true,
			withResetStore: boolean = true
		) {
			kitQLClient.cacheRemove(cacheKey, { variables, allOperationKey });
			if (withResetStore) {
				set(defaultStoreValue);
			}
		},
		/**
		 * Patch the store with a new object at the dedicated xPath location
		 */
		patch(newData: Object, xPath: string | null = null) {
			// prettier-ignore
			const updatedStore = kitQLClient.patch<Types.AllPostsQuery, Types.AllPostsQueryVariables>(cacheKey, get(KQL_AllPosts), newData, xPath);
			set(updatedStore);
			return updatedStore;
		}
	};
}
/**
 * KitQL Svelte Store with the latest `AllPosts` Operation
 */
export const KQL_AllPosts = KQL_AllPostsStore();

function KQL_GetPageStore() {
	// prettier-ignore
	const { subscribe, set, update } = writable<RequestResult<Types.GetPageQuery, Types.GetPageQueryVariables>>(defaultStoreValue);

	const cacheKey = 'KQL_GetPage';

	return {
		subscribe,
		/**
		 * For SSR, you need to provide 'fetch' from the load function
		 * @returns the latest operation and fill this store
		 */
		query: async (
			params?: RequestQueryParameters<Types.GetPageQueryVariables>
		): Promise<RequestResult<Types.GetPageQuery, Types.GetPageQueryVariables>> => {
			let { fetch, variables, settings } = params ?? {};
			let { cacheMs, policy } = settings ?? {};

			const storedVariables = get(KQL_GetPage).variables;
			variables = variables ?? storedVariables;
			policy = policy ?? kitQLClient.policy;

			// Cache only in the browser for now. In SSR, we will need session identif to not mix peoples data
			if (browser) {
				if (policy !== 'network-only') {
					// prettier-ignore
					const cachedData = kitQLClient.requestCache<Types.GetPageQuery, Types.GetPageQueryVariables>({
						variables, cacheKey, cacheMs,	browser
					});
					if (cachedData) {
						const result = { ...cachedData, isFetching: false, status: RequestStatus.DONE };
						if (policy === 'cache-first') {
							set(result);
							if (!result.isOutdated) {
								return result;
							}
						} else if (policy === 'cache-only') {
							set(result);
							return result;
						} else if (policy === 'cache-and-network') {
							set(result);
						}
					}
				}
			}

			update((c) => {
				return { ...c, isFetching: true, status: RequestStatus.LOADING };
			});

			// prettier-ignore
			const res = await kitQLClient.request<Types.GetPageQuery, Types.GetPageQueryVariables>({
				skFetch: fetch,
				document: Types.GetPageDocument,
				variables, 
				cacheKey, 
				browser
			});
			const result = { ...res, isFetching: false, status: RequestStatus.DONE, variables };
			set(result);
			return result;
		},
		/**
		 * Reset Cache
		 */
		resetCache(
			variables: Types.GetPageQueryVariables | null = null,
			allOperationKey: boolean = true,
			withResetStore: boolean = true
		) {
			kitQLClient.cacheRemove(cacheKey, { variables, allOperationKey });
			if (withResetStore) {
				set(defaultStoreValue);
			}
		},
		/**
		 * Patch the store with a new object at the dedicated xPath location
		 */
		patch(newData: Object, xPath: string | null = null) {
			// prettier-ignore
			const updatedStore = kitQLClient.patch<Types.GetPageQuery, Types.GetPageQueryVariables>(cacheKey, get(KQL_GetPage), newData, xPath);
			set(updatedStore);
			return updatedStore;
		}
	};
}
/**
 * KitQL Svelte Store with the latest `GetPage` Operation
 */
export const KQL_GetPage = KQL_GetPageStore();

function KQL_GetPostStore() {
	// prettier-ignore
	const { subscribe, set, update } = writable<RequestResult<Types.GetPostQuery, Types.GetPostQueryVariables>>(defaultStoreValue);

	const cacheKey = 'KQL_GetPost';

	return {
		subscribe,
		/**
		 * For SSR, you need to provide 'fetch' from the load function
		 * @returns the latest operation and fill this store
		 */
		query: async (
			params?: RequestQueryParameters<Types.GetPostQueryVariables>
		): Promise<RequestResult<Types.GetPostQuery, Types.GetPostQueryVariables>> => {
			let { fetch, variables, settings } = params ?? {};
			let { cacheMs, policy } = settings ?? {};

			const storedVariables = get(KQL_GetPost).variables;
			variables = variables ?? storedVariables;
			policy = policy ?? kitQLClient.policy;

			// Cache only in the browser for now. In SSR, we will need session identif to not mix peoples data
			if (browser) {
				if (policy !== 'network-only') {
					// prettier-ignore
					const cachedData = kitQLClient.requestCache<Types.GetPostQuery, Types.GetPostQueryVariables>({
						variables, cacheKey, cacheMs,	browser
					});
					if (cachedData) {
						const result = { ...cachedData, isFetching: false, status: RequestStatus.DONE };
						if (policy === 'cache-first') {
							set(result);
							if (!result.isOutdated) {
								return result;
							}
						} else if (policy === 'cache-only') {
							set(result);
							return result;
						} else if (policy === 'cache-and-network') {
							set(result);
						}
					}
				}
			}

			update((c) => {
				return { ...c, isFetching: true, status: RequestStatus.LOADING };
			});

			// prettier-ignore
			const res = await kitQLClient.request<Types.GetPostQuery, Types.GetPostQueryVariables>({
				skFetch: fetch,
				document: Types.GetPostDocument,
				variables, 
				cacheKey, 
				browser
			});
			const result = { ...res, isFetching: false, status: RequestStatus.DONE, variables };
			set(result);
			return result;
		},
		/**
		 * Reset Cache
		 */
		resetCache(
			variables: Types.GetPostQueryVariables | null = null,
			allOperationKey: boolean = true,
			withResetStore: boolean = true
		) {
			kitQLClient.cacheRemove(cacheKey, { variables, allOperationKey });
			if (withResetStore) {
				set(defaultStoreValue);
			}
		},
		/**
		 * Patch the store with a new object at the dedicated xPath location
		 */
		patch(newData: Object, xPath: string | null = null) {
			// prettier-ignore
			const updatedStore = kitQLClient.patch<Types.GetPostQuery, Types.GetPostQueryVariables>(cacheKey, get(KQL_GetPost), newData, xPath);
			set(updatedStore);
			return updatedStore;
		}
	};
}
/**
 * KitQL Svelte Store with the latest `GetPost` Operation
 */
export const KQL_GetPost = KQL_GetPostStore();
