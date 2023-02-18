export const accessTokenSelector = (state) => state.token.access_token

export const refreshTokenSelector = (state) => state.token.refresh_token

export const tokensSelector = (state) => {
  return state.token
}
