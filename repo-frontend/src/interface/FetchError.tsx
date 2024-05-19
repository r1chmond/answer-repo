type FetchError = Error | null;

export default FetchError;

export const fetchErrorMessage = (id: string | undefined, resource: string) => {
  return `Error occured while fetching ${resource} ${id}`;
};
