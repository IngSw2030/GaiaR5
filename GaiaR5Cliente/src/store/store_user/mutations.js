/*
export function someMutation (state) {
}
*/

export const updateAutentificado = (state, opened) => {
  state.autentificado =opened
}

export const toggleAutentificado = (state) => {
  state.autentificado =! state.autentificado
}

export const updateUser = (state, opened) => {
  state.user =opened
}
