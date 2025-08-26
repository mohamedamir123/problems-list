import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import CheckIcon from '@mui/icons-material/Check';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { useContext, useState } from 'react';
import { TodoContext } from '../Contexts/Todocontext.jsx';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';




const Todo = ({todo}) => {

    const {todos, setTodos} = useContext(TodoContext);
    const [open, setOpen] = useState(false);
    const [edit, setEdit] = useState(false);
    const [upddatedTodo, setUpddatedTodo] = useState({title: todo.title, details: todo.details});

    function handelCheck(){
        const updatedTodos = todos.map((t)=>{
            return t.id == todo.id ? {...t, isCompleted: !t.isCompleted} : t;
        })
        setTodos(updatedTodos);
        localStorage.setItem("todos", JSON.stringify(updatedTodos));
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleClickEdit = () => {
        setEdit(true);
    };

    const handleCloseEdit = () => {
        setEdit(false);
    };



    function handelDelete(){
        const updatedTodos = todos.filter((t)=>{
            return t.id != todo.id
        })
        setTodos(updatedTodos);
        localStorage.setItem("todos", JSON.stringify(updatedTodos));
    };

    const handleSubmit = () => {
        const updatedTodos = todos.map((t)=>{
            return t.id == todo.id ? {...t, title: upddatedTodo.title, details: upddatedTodo.details} : t;
        });
        setTodos(updatedTodos);
        localStorage.setItem("todos", JSON.stringify(updatedTodos));
        handleCloseEdit();
    };

    return (
        <>
            {/* Delete Modal */}

            <Dialog

            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            >

                <DialogTitle id="alert-dialog-title">
                    {"Are You Sure You Want To Delete The Problem?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        You cannot undo the deletion once it is completed.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={handleClose}>Don't Delete</Button>
                <Button onClick={handelDelete} autoFocus>
                    OK
                </Button>
                </DialogActions>
            </Dialog>

            {/* Delete Modal */}

            {/* Edit Modal */}

            <Dialog
            open={edit}
            onClose={handleCloseEdit}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            >

                <DialogTitle id="alert-dialog-title">
                    {"Are You Sure You Want To Delete The Problem?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Edit Your Problem Title and Details
                    </DialogContentText>

                    <TextField
                    autoFocus
                    margin="dense"
                    label="Title"
                    fullWidth
                    variant="standard"
                    value={upddatedTodo.title}
                    onChange={(e) => setUpddatedTodo({...upddatedTodo, title: e.target.value})}
                    />
                    <TextField
                    autoFocus
                    margin="dense"
                    label="Details"
                    fullWidth
                    variant="standard"
                    value={upddatedTodo.details}
                    onChange={(e) => setUpddatedTodo({...upddatedTodo, details: e.target.value})}
                    />

                </DialogContent>
                <DialogActions>
                <Button onClick={handleCloseEdit}>Cancel</Button>
                <Button onClick={handleSubmit}>
                    Edit
                </Button>
                </DialogActions>
            </Dialog>

            {/* Edit Modal */}

            <Card className='problem-card' sx={{ minWidth: 275, background: '#283593' ,color: 'white', margin: '10px 0'}}>
                <CardContent>
                    <Grid container spacing={2}>
                        <Grid size={8}>
                            <Typography variant='h5' sx={{ textAlign:'left', textDecoration: todo.isCompleted ? 'line-through' : 'none'}}>{todo.title}</Typography>
                            <Typography variant='h6' sx={{ textAlign:'left', textDecoration: todo.isCompleted ? 'line-through' : 'none',fontWeight: '100 !important'}}>{todo.details}</Typography>
                        </Grid>
                        <Grid size={4} display="flex" justifyContent="space-around" alignItems="center">
                            
                            {/* Checked Icon */}
                            <IconButton onClick={()=>{handelCheck()}} className='iconBtn' aria-label="delete" style={{
                                color:todo.isCompleted ? 'white' :'#8bc34a', 
                                background:todo.isCompleted ? '#8bc34a' : 'white', 
                                border: 'solid #8bc34a 3px'
                                }}>
                                <CheckIcon/>
                            </IconButton>
                            {/* Checked Icon */}

                            {/* Edit Icon */}
                            <IconButton onClick={()=>{handleClickEdit()}} className='iconBtn' aria-label="delete" style={{color: '#1769aa', background: 'white', border: 'solid #1769aa 3px'}}>
                                <ModeEditOutlineOutlinedIcon/>
                            </IconButton>
                            {/* Edit Icon */}

                            {/* Delete Icon */}
                            <IconButton onClick={()=>{handleClickOpen()}} className='iconBtn' aria-label="delete" style={{color: '#b23c17', background: 'white', border: 'solid #b23c17 3px'}}>
                                <DeleteOutlineOutlinedIcon/>
                            </IconButton>
                            {/* Delete Icon */}
                        </Grid>
                    </Grid>
                    
            </CardContent>
            </Card>
        </>
    )
}

export default Todo