export const filteredAdsSelector = (state) => {
  const ads = state.ads
  const query = state.query.trim().toLowerCase()

  return ads.filter((ad) => ad.title.trim().toLowerCase().includes(query))
}
