import { create } from "zustand";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "@/firebase/firebaseconfig";
import { doc, getDoc, onSnapshot } from "firebase/firestore";

const elfStore = create((set) => ({
  user: null,
  profile: null,
  error: null,

  getAuthedUser: () => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const uid = user.uid;
        console.log(user);
        set((store) => ({ user: user }));

        const docRef = doc(db, "users", user.uid);
        onSnapshot(docRef, (doc) => {
          // const docSnap = await getDoc(docRef);
          set((store) => ({ profile: doc.data() }));
        });
      } else {
        console.log("signedOut");
        set((store) => ({ error: "signedOut" }));
      }
    });
  },
}));

export default elfStore;
