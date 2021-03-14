import firebase from "firebase/app";

export default {
  actions: {
    async addCategory({ commit, dispatch }, { name, limit }) {
      try {
        const uid = await dispatch("getUserId");
        const category = await firebase
          .database()
          .ref(`/users/${uid}/categories`)
          .push({ name, limit });
        return { name, limit, id: category.key };
      } catch (e) {
        commit("setError", e);
        throw new Error(e);
      }
    }
  },

  getUserId() {
    const user = firebase.auth().currentUser;
    return user ? user.uid : null;
  }
};
