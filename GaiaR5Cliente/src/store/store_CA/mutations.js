/*
export function someMutation (state) {
}
*/

export const updateVariable = (state, opened) => {
  state.variable =opened
}

export const updateCoordenadas = (state, opened) => {
  state.coordendas = opened
}

export const updateUbicacion = (state, opened) => {
  state.ubicacionActual = opened
}

export const updateCentroElegido = (state, opened) => {
  state.centroElegido = opened
}

export const updateTags = (state, opened) => {
  state.tags = opened
}

export const updateCentrosCA = (state, opened) => {
  state.centrosCA = opened
}

export const updateHistorialSem = (state, opened) => {
  state.historialSemillas = opened
}

export const updateSemillas = (state, opened) => {
  state.acumSemillas += opened
}
