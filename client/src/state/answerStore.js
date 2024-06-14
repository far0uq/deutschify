import * as Redux from "redux";

// Define your Redux actions
const SET_ANSWER = "SET_ANSWER";

// Define your action creators
const setAnswer = (answer) => ({
  type: SET_ANSWER,
  payload: answer,
});

// Define your initial state
const initialState = {
  answer: null,
};

// Define your reducer function
const answerReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ANSWER:
      return {
        ...state,
        answer: action.payload,
      };
    default:
      return state;
  }
};

// Create your Redux store
const { createStore } = Redux;
const store = createStore(answerReducer);

// Export your action creators and the store
export { setAnswer, store };
