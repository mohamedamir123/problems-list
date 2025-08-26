import { useState } from 'react';
import './App.css'
import TodoList from './Components/TodoList.jsx'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { TodoContext } from './Contexts/Todocontext.jsx';

const theme = createTheme({
  typography: {
    fontFamily: ["Raleway"],
  },
  palette:{
    primary: {
      main: '#b71c1c'
    },
    secondary: {
      main: '#2e7d32'
    }
  }
})




function App() {
  const [todos, setTodos] = useState([]);

  return (
    <ThemeProvider theme={theme}>
      <div className="App" style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#101114', fontFamily: 'Raleway'}}>
        <TodoContext.Provider value={{todos, setTodos}} >
          <TodoList />
        </TodoContext.Provider>
      </div>
    </ThemeProvider>
  )
}

export default App
