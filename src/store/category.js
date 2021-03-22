import firebase from "firebase/app";

export default {
  actions: {
    async fetchCategories({ commit, dispatch }) {
      try {
        const uid = await dispatch("getUserId");
        const categories =
          (
            await firebase
              .database()
              .ref(`/users/${uid}/categories`)
              .once("value")
          ).val() || {};
        return Object.keys(categories).map(key => ({
          ...categories[key],
          id: key
        }));
      } catch (e) {
        commit("setError", e);
        throw new Error(e);
      }
    },

    async fetchCategoryById({ commit, dispatch }, id) {
      try {
        const uid = await dispatch("getUserId");
        const category =
          (
            await firebase
              .database()
              .ref(`/users/${uid}/categories`)
              .child(id)
              .once("value")
          ).val() || {};
        return { ...category, id };
      } catch (e) {
        commit("setError", e);
        throw new Error(e);
      }
    },

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
    },

    async updateCategory({ commit, dispatch }, { name, limit, id }) {
      try {
        const uid = await dispatch("getUserId");
        await firebase
          .database()
          .ref(`/users/${uid}/categories`)
          .child(id)
          .update({ name, limit });
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
