export default function getRouteType() {
  const {
    location: { pathname },
  } = window;

  if (/\/manager\/school\//gi.test(pathname) || /\/manager\//gi.test(pathname))
    return "manager";
  else if (/\/school\//gi.test(pathname) && !/\/manager\//gi.test(pathname))
    return "school";
}
