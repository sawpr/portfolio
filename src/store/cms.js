export const state = () => ({
  counter: 0
})

export const mutations = {
  countUp(state) { // countUp: function(state) {}
    state.counter++
  },
  reset(state) {
    state.counter = 0
  }
}

// mutations = commit
// actions = dispatch
