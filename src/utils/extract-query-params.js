export function extractQueryParams(query) {
  return query.substr.split("&").reduce((queryParams, param) => {
    const [key, value] = param.split("=");

    queryParams[key] = value;
  }, {});
}
