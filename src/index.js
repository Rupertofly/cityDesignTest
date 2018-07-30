import * as sketchHooks from './sketch/main';

(w =>
  Object.keys(sketchHooks).forEach(hook => {
    w[hook] = sketchHooks[hook];
  }))(window);
