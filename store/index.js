export const state = () => ({
  viewer_direction: 'horizontal',
})

export const mutations = {
  setDirection(state, set) {
    console.log(set);
    state.viewer_direction = set;
    localStorage.viewer_direction = set;
  }

}