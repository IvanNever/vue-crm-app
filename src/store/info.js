import firebase from "firebase/app";

export default {
  state: {
    info: {}
  },
  mutations: {
    setInfo(state, info) {
      state.info = info;
    },
    clearInfo(state) {
      state.info = {};
    }
  },
  actions: {
    async fetchInfo({ commit, dispatch }) {
      try {
        const userId = await dispatch("getUserId");
        const info = await (
          await firebase
            .database()
            .ref(`/users/${userId}/info`)
            .once("value")
        ).val();
        commit("setInfo", info);
      } catch (err) {
        commit("setError", err);
        throw new Error(err);
      }
    },
    async updateInfo({ commit, dispatch, getters }, toUpdate) {
      try {
        const uid = await dispatch("getUserId");
        const updateData = { ...getters.info, ...toUpdate };
        await firebase
          .database()
          .ref(`/users/${uid}/info`)
          .update(updateData);
        commit("setInfo", updateData);
      } catch (err) {
        commit("setError", err);
        throw new Error(err);
      }
    }
  },
  getters: {
    info: state => state.info
  }
};
