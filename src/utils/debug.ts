/* eslint-disable no-console */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const debug = (title: string, msg: string, body: Record<string, any>) => {
  console.groupCollapsed(`${title}::[${msg}]`);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Object.keys(body).forEach(key => {
    console.debug(key, body[key]);
  });
  console.groupEnd();
};

export default debug;
