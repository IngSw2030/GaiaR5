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
