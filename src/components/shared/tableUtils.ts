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
      if (payload.reversed) {
        return b[sortBy]?.toString().localeCompare(a[sortBy]?.toString());
      }
      return a[sortBy]?.toString().localeCompare(b[sortBy]?.toString());
    }),
    payload.search
  );
} 