import { useState } from "react";
import { db } from "../firebase/firebase.config";
import { addDoc, collection } from "firebase/firestore";

const useSendMessageToDb = () => {
  const [error, setError] = useState(null);

  const sendMessage = async (data) => {
    const { firstName, lastName, email, message, number } = data;
    try {
      const docData = {
        firstName,
        lastName,
        email,
        message,
      };
      if (number) {
        docData.number = number;
      }
      await addDoc(collection(db, "messages"), docData);
    } catch (err) {
      console.log(err);
      setError(err);
    }
  };

  return [sendMessage, error];
};

export default useSendMessageToDb;
