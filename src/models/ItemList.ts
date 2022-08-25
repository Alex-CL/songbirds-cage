export type ItemList<T> = {
	items: T[],
	count: number
}

export function emptyItemList<T>(): ItemList<T> {
	return {
		items: [],
		count: 0,
	}
}
