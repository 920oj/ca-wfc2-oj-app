export const state = () => ({
  viewer_direction_horizontal: true,
})

export const mutations = {
  switch(state) {
    if(state.viewer_direction_horizontal){
      state.viewer_direction_horizontal = false;
    } else {
      state.viewer_direction_horizontal = true;
    }
  },
}