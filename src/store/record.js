import firebase from "firebase/app";

export default {
  actions: {
    async createRecord({ commit, dispatch }, record) {
      try {
        const uid = await dispatch("getUserId");
        return await firebase
          .database()
          .ref(`/users/${uid}/records`)
          .push(record);
      } catch (err) {
        commit("setError", err);
        throw new Error(err);
      }
    }
  }
};
