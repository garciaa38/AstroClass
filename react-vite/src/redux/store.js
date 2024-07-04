import {
  legacy_createStore as createStore,
  applyMiddleware,
  compose,
  combineReducers,
} from "redux";
import thunk from "redux-thunk";
import sessionReducer from "./session";
import classesReducer from "./classes";
import studentsReducer from "./students";
import rewardsReducer from "./rewards";
import feedbackReducer from "./feedback";
import msgBoardReducer from "./messageBoard";
import studentClassesReducer from "./studentClasses";

const rootReducer = combineReducers({
  session: sessionReducer,
  classes: classesReducer,
  students: studentsReducer,
  rewards: rewardsReducer,
  feedback: feedbackReducer, 
  messageBoard: msgBoardReducer,
  studentClasses: studentClassesReducer
});

let enhancer;
if (import.meta.env.MODE === "production") {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = (await import("redux-logger")).default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
