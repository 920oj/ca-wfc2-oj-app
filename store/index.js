export const state = () => ({
  viewer_direction_horizontal: true,
})

export const mutations = {
  switch_to_horizontal(state) {
    state.viewer_direction_horizontal = true;
  },
  switch_to_vertical(state) {
    state.viewer_direction_horizontal = false;
  }
}