import { Provider } from "react-redux";
import { store } from "redux/store";

import Phonebook from "./modules/Phonebook/Phonebook";

function App() {
  return (
    <Provider store={store}>
      <>
        <Phonebook />
      </>
    </Provider>
  );
};

export default App;