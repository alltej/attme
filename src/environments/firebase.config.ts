/**
 * Created by Allan Tejano on 2/11/2017.
 */
import {AuthMethods, AuthProviders} from "angularfire2";

export const firebaseConfig = {
  apiKey: "FDFDFDFDFDFDFDFDFDF",
  authDomain: "attme-8d4f7.firebaseapp.com",
  databaseURL: "https://attme-8d4f7.firebaseio.com",
  storageBucket: "attme-8d4f7.appspot.com",
  messagingSenderId: "122392523636"
};



export const authConfig = {
  provider: AuthProviders.Password,
  method: AuthMethods.Password
};
