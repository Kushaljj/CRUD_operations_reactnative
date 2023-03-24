import { ADD_EMPLOYEE, DELETE_EMPLOYEE, UPDATE_EMPLOYEE } from './actions';

const initialState = {
  employees: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_EMPLOYEE:
      return {
        ...state,
        employees: [...state.employees, action.payload],
      };
    case DELETE_EMPLOYEE:
      return {
        ...state,
        employees: state.employees.filter((employee) => employee.id !== action.payload),
      };
    case UPDATE_EMPLOYEE:
      const updatedEmployees = state.employees.map((employee) => {
        if (employee.id === action.payload.id) {
          return action.payload;
        }
        return employee;
      });
      return {
        ...state,
        employees: updatedEmployees,
      };
    default:
      return state;
  }
};

export default reducer;
