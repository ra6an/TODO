import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialTaskState = {
  tasks: [],
  allTasks: [],
  newTaskText: "",
  newTODO: {
    title: "",
    tasks: [],
  },
  newTodoTask: "",
  activeEdit: null,
  activeDelete: null,
  error: "",
};

const taskSlice = createSlice({
  name: "task",
  initialState: initialTaskState,
  reducers: {
    setError(state, action) {
      state.error = action.payload.value;
    },
    setTasks(state, action) {
      state.tasks = action.payload.data;
    },
    setNewTaskText(state, action) {
      if (
        action.payload.value.length < 200 &&
        action.payload.value.length > -1
      ) {
        state.newTaskText = action.payload.value;
      }
    },
    setAllTasks(state, action) {
      state.allTasks = action.payload.data;
    },
    setActiveEdit(state, action) {
      state.activeEdit = action.payload.value;
    },
    removeTodoFromNewTODO(state, action) {
      state.newTODO.tasks = state.newTODO.tasks.filter(
        (t) => t !== action.payload.value
      );
    },
    setTODOTitle(state, action) {
      if (
        action.payload.value.length < 40 &&
        action.payload.value.length > -1
      ) {
        state.newTODO.title = action.payload.value;
      }
    },
    resetTODO(state) {
      state.newTODO = { title: "", tasks: [] };
    },
    setTODOTask(state, action) {
      if (
        action.payload.value.length < 200 &&
        action.payload.value.length > 0
      ) {
        state.newTODO.tasks.push(action.payload.value);
      }
    },
    setNewTodoTask(state, action) {
      if (
        action.payload.value.length < 200 &&
        action.payload.value.length > -1
      ) {
        state.newTodoTask = action.payload.value;
      }
    },
    setActiveDelete(state, action) {
      state.activeDelete = action.payload.value;
    },
    // addToAllTasks(state, action) {
    //   state.allTasks = [...state.allTasks, ...action.payload.data];
    // },
    updateAllTasks(state) {
      let tasksLS = JSON.parse(localStorage.getItem("tasks"));
      let copyOfAllTasks = [...state.allTasks];

      tasksLS.forEach((task) => {
        const contains =
          copyOfAllTasks.filter((taskC) => taskC.id === task.id).length > 0;

        if (!contains) {
          copyOfAllTasks.push(task);
        } else {
          copyOfAllTasks.forEach((taskSecond, i, arr) => {
            if (taskSecond.id === task.id) {
              arr[i] = task;
            }
          });
        }
      });

      state.allTasks = copyOfAllTasks;
    },
    // updateAllTasks(state, action) {
    //   let tasksLS = JSON.parse(localStorage.getItem("tasks"));

    //   state.allTasks.forEach((task, i, arr) => {
    //     if (task.id === action.payload.data.id) {
    //       arr[i] = action.payload.data;
    //     }
    //   });

    //   if (tasksLS) {
    //     tasksLS.forEach((task, i, arr) => {
    //       if (task.id === action.payload.data.id) {
    //         arr[i] = action.payload.data;
    //       } else {
    //         arr.push(action.payload.data);
    //       }
    //     });
    //   }

    //   localStorage.setItem("tasks", JSON.stringify(tasksLS));
    // },
    deleteTaskFromAllTasks(state, action) {
      let tasksLS = JSON.parse(localStorage.getItem("tasks"));

      state.allTasks.forEach((task, i, arr) => {
        if (task.id === action.payload.data.id) {
          const newT = { ...action.payload.data, active: false };
          arr[i] = newT;
        }
      });

      if (tasksLS && tasksLS.length > 0) {
        tasksLS.forEach((task, i, arr) => {
          if (task.id === action.payload.data.id) {
            console.log(action.payload.data);
            const newT = { ...action.payload.data, active: false };

            arr[i] = newT;
          } else {
            if (
              tasksLS.filter((task) => task.id === action.payload.data.id)
                .length > 0
            )
              return;

            const newT = { ...action.payload.data, active: false };
            arr.push(newT);
            console.log("radi");
          }
        });
      }

      if (tasksLS.length === 0) {
        const newT = { ...action.payload.data, active: false };
        tasksLS = [newT];
      }

      localStorage.setItem("tasks", JSON.stringify(tasksLS));
    },
  },
});

export const getTasks = (url) => {
  return async (dispatch) => {
    try {
      const response = await axios({
        method: "GET",
        url,
      });

      let fetchedData = response.data.slice(0, 20);
      dispatch(taskSlice.actions.setTasks({ data: fetchedData }));
      let LSData;
      if (!localStorage.getItem("tasks")) {
        localStorage.setItem("tasks", JSON.stringify([]));
      } else {
        LSData = JSON.parse(localStorage.getItem("tasks"));
      }
      let allData = [...fetchedData];

      console.log(LSData);

      LSData.forEach((task) => {
        const contains =
          fetchedData.filter((taskF) => taskF.id === task.id).length > 0;

        console.log("i ovo je ok");
        if (!contains) {
          allData.push(task);
        } else {
          allData.forEach((taskSecond, i, arr) => {
            if (taskSecond.id === task.id) {
              arr[i] = task;
            }
          });
        }
      });

      dispatch(taskSlice.actions.setAllTasks({ data: allData }));
      console.log(allData);
    } catch (err) {
      console.log(err);
    }
  };
};

export default taskSlice;
