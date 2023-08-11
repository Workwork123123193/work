export function removeUrlPrefix(url) {
  if (url.startsWith('https://')) url = url.replace('https://', '');

  if (url.startsWith('http://')) url = url.replace('http://', '');

  if (url.includes('/')) url = url.replace('/', '');

  return url;
}
