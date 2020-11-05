import Vue from 'vue'
import Vuex from 'vuex'

// we first import the module
import store_CA from './store_CA'

Vue.use(Vuex)

export interface StateInterface {
  // Define your own store structure, using submodules if needed
  // example: ExampleStateInterface;
  // Declared as unknown to avoid linting issue. Best to strongly type as per the line above.
  example: unknown;
}

export default function (/* { ssrContext } */) {
  return new Vuex.Store({
    modules: {
      // then we reference it
      store_CA
    }
  })
}
