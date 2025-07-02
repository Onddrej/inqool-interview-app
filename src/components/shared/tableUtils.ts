export function filterData<T extends Record<string, any>>(data: T[], search: string) {
  if (!data.length) return [];
  const query = search.toLowerCase().trim();
  return data.filter((item) =>
    Object.keys(data[0]).some((key) => item[key]?.toString().toLowerCase().includes(query))
  );
}

export function sortData<T extends Record<string, any>>(
  data: T[],
  payload: { sortBy: keyof T | null; reversed: boolean; search: string }
) {
  const { sortBy } = payload;
  if (!data.length) return [];
  if (!sortBy) {
    return filterData(data, payload.search);
  }
  return filterData(
    [...data].sort((a, b) => {
      const aValue = a[sortBy];
      const bValue = b[sortBy];
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return payload.reversed ? bValue - aValue : aValue - bValue;
      }
      const aStr = aValue?.toString() ?? '';
      const bStr = bValue?.toString() ?? '';
      return payload.reversed
        ? bStr.localeCompare(aStr)
        : aStr.localeCompare(bStr);
    }),
    payload.search
  );
} 