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
    },

    async fetchRecords({ commit, dispatch }) {
      try {
        const uid = await dispatch("getUserId");
        const records =
          (
            await firebase
              .database()
              .ref(`/users/${uid}/records`)
              .once("value")
          ).val() || {};
        return Object.keys(records).map(key => ({
          ...records[key],
          id: key
        }));
      } catch (e) {
        commit("setError", e);
        throw new Error(e);
      }
    },

    async fetchRecordById({ commit, dispatch }, id) {
      try {
        const uid = await dispatch("getUserId");
        const record =
          (
            await firebase
              .database()
              .ref(`/users/${uid}/records`)
              .child(id)
              .once("value")
          ).val() || {};
        return { ...record, id };
      } catch (e) {
        commit("setError", e);
        throw new Error(e);
      }
    }
  }
};
