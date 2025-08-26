import { useContext, useState, useEffect } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Grid from '@mui/material/Grid';
import Todo from './Todo';
import TextField from '@mui/material/TextField';
import { v4 as uuidv4 } from 'uuid';
import { TodoContext } from '../Contexts/Todocontext.jsx';

export default function TodoList() {
    const {todos,setTodos} = useContext(TodoContext);
    const [title, setTitle] = useState('');
    const [details, setDetails] = useState('');
    const [alignment, setAlignment] = useState('all');

    const handleAlignment = (event, newAlignment) => {
        setAlignment(newAlignment);
    };

    function handelAddClick(){
        const muTodo = {
            id: uuidv4(),
            title: title,
            details: details,
            isCompleted: false
        };

        const updatedTodos = [...todos, muTodo];
        setTodos(updatedTodos);
        localStorage.setItem("todos", JSON.stringify(updatedTodos));
        setTitle('');
        setDetails('');
    }

    const completedTodos = todos.filter((t)=>{return t.isCompleted});
    const uncompletedTodos = todos.filter((t)=>{return !t.isCompleted});

    let renderedTodos = todos

    if(alignment == 'completed'){
        renderedTodos = completedTodos;
    }
    else if(alignment == 'uncompleted'){
        renderedTodos = uncompletedTodos;
    }
    else{
        renderedTodos = todos;
    }

    const tdos = renderedTodos.map((t) => {
        return <Todo key={t.id} todo={t}/>
    })

    useEffect(() =>{
        console.log('useEffect');
        const storageTodos = JSON.parse(localStorage.getItem("todos")) ?? [];
        setTodos(storageTodos);
    },[setTodos]);


    
    
    return (
        <>
        <CssBaseline />
        <Container maxWidth="sm">
            <Card sx={{ minWidth: 275 }} style={{maxHeight: '100vh',overflow:'scroll'}}>
                <CardContent style={{ textAlign: 'center'}}>
                    <Typography variant='h2' sx={{fontWeight: 'bold'}}>My Problems List</Typography>
                    <Divider/>
                    {/* Filter Buttons */}

                    <ToggleButtonGroup
                    style={{ margin: '10px 0' }}
                    value={alignment}
                    exclusive
                    onChange={handleAlignment}
                    aria-label="text alignment"
                    
                    >
                        <ToggleButton value="all">all</ToggleButton>
                        <ToggleButton color = 'secondary' value="completed">completed</ToggleButton>
                        <ToggleButton color = 'primary' value="uncompleted">uncompleted</ToggleButton>
                    </ToggleButtonGroup>

                    {/* Filter Buttons */}

                    {/* Todos */}

                    {tdos}

                    {/* Todos */}

                    {/* Input + Add Button*/}

                    <Grid container style={{marginTop: '20px'}} spacing={1}>
                        {/* Titile */}
                        <Grid size={8} display="flex" justifyContent="space-around" alignItems="center" >
                            <TextField value={title} onChange={(e)=>{setTitle(e.target.value)}} id="outlined-basic" label="Problem Title" variant="outlined" style={{width: '100%'}} />
                        </Grid>
                        {/* Titile */}

                        {/* Add Button */}
                        <Grid size={4} display="flex" justifyContent="space-around" alignItems="center" >
                            <Button 
                            style={{width: '100%', height: '100%'}} 
                            variant="contained" 
                            onClick={() => {
                                handelAddClick();
                            }}
                            disabled = {title.length == 0 || details.length == 0}
                            >
                                Add
                            </Button>
                        </Grid>
                        {/* Add Button */}

                        {/* Details */}
                        <Grid size={12}>
                            <TextField value={details} onChange={(e)=>{setDetails(e.target.value)}} id="outlined-basic" label="Problem Details" variant="outlined" style={{width: '100%'}} />
                        </Grid>
                        {/* Details */}
                    </Grid>

                    {/* Input + Add Button*/}

            </CardContent>
            </Card>
        </Container>
        </>
    );
}