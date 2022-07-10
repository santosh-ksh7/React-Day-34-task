import './App.css';
import {useState} from "react";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import {Routes, Route, navigate, useNavigate, useParams} from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {useFormik} from "formik";
import * as yup from "yup";




function App() {

  let stud_in_li = [
    {
     "name": "name 1",
     "email": "email 1",
     "batch": "batch 1",
    },
    {
     "name": "name 2",
     "email": "email 2",
     "batch": "batch 2",
    },
    {
     "name": "name 3",
     "email": "email 3",
     "batch": "batch 3",
    },
    {
     "name": "name 4",
     "email": "email 4",
     "batch": "batch 4",
    },
    {
     "name": "name 5",
     "email": "email 5",
     "batch": "batch 5",
    }
  ]

  const[stud, setStud] = useState(stud_in_li);

  let teach_in_li=[
    {
     "name": "name 1",
     "email": "email 1",
     "batch": "batch 1",
    },
    {
     "name": "name 2",
     "email": "email 2",
     "batch": "batch 2",
    },
    {
     "name": "name 3",
     "email": "email 3",
     "batch": "batch 3",
    },
    {
     "name": "name 4",
     "email": "email 4",
     "batch": "batch 4",
    },
    {
     "name": "name 5",
     "email": "email 5",
     "batch": "batch 5",
    }
  ]
   
  const[teach, setTeach] = useState(teach_in_li);

  const navigate = useNavigate();

  return (
    <div className="App">
      <AppBar position="static" style={{display: "flex", flexDirection: "row", justifyContent: "space-around"}}>
          <h2>Student-Teacher Manager</h2>
          <Button onClick={()=>navigate("/records")} color="inherit">Home</Button>
          <Button onClick={()=>navigate("/add-teach")} color="inherit">Add Teacher</Button>
          <Button onClick={()=>navigate("/add-stud")} color="inherit">Add Students</Button>
          <Button onClick={()=>navigate("/about")} color="inherit">About</Button>
      </AppBar>
      <h2>Welcome to StudentTeacher management</h2>
      <Routes>
        <Route path='/add-stud' element={<AddStud setStud={setStud} stud={stud} />} />
        <Route path='/add-teach' element={<AddTeach setTeach={setTeach} teach={teach} />} />
        <Route path='/about' element={<About/>} />
        <Route path='/home/teacher/edit/:id' element={<Getteacherprefilleddata setTeach={setTeach} teach={teach} />} />
        <Route path='/home/student/edit/:id' element={<Getstudentprefilleddata setStud={setStud} stud={stud}  />} />
        <Route path='/records' element={<Home stud={stud} teach={teach} setTeach={setTeach} setStud={setStud} />} />
      </Routes>
    </div>
  );
}

export default App;







export function Home({stud, teach, setStud, setTeach}){

  return(
    <div className="alltab">
      <div className="studcont">
          <h2>Students record table</h2>
          <StudTable stud={stud} setStud={setStud} />
      </div>
      <div className="teachcont">
          <h2>Teachers record table</h2>
          <TeachTable teach={teach} setTeach={setTeach} />
      </div>
    </div>
  )
}



export function StudTable({stud, setStud}) {

  const navigate = useNavigate();

  return (
    <TableContainer component={Paper}>
      <Table sx={{ maxWidth: 1000, margin: "auto" }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell >UID</TableCell>
            <TableCell align="right">Name</TableCell>
            <TableCell align="right">E-mail</TableCell>
            <TableCell align="right">Batch</TableCell>
            <TableCell align="right">Edit</TableCell>
            <TableCell align="right">Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {stud.map((ele,index) => (
            <TableRow key={index} index={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row">{index}</TableCell>
              <TableCell align="right">{ele.name}</TableCell>
              <TableCell align="right">{ele.email}</TableCell>
              <TableCell align="right">{ele.batch}</TableCell>
              <TableCell align="right">
                <Button onClick={()=>{navigate(`/home/student/edit/${index}`)}}>
                  <IconButton color="primary" aria-label="delete">
                    <EditIcon />
                  </IconButton>
                </Button>
              </TableCell>
              <TableCell align="right">
                <Button onClick={()=>{
                  let n1 = ele.name;
                  let res = stud.filter((ele)=> ele.name!=n1);
                  setStud([...res]);
                }}>
                  <IconButton color="error" aria-label="delete">
                    <DeleteIcon />
                  </IconButton>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}


function Getstudentprefilleddata({setStud, stud}){
  const {id} = useParams();

  const obj = stud[id];

  return(
    <div>
      <h2>Update student record</h2>
      {obj === undefined ? "Loading" : <Fillvaluestudent obj={obj} stud ={stud} setStud={setStud} />}
    </div>
  )
}
function Fillvaluestudent({obj, stud, setStud}){
  const {id} = useParams();

  const[name,setName] =useState(obj.name);
  const[email,setEmail] =useState(obj.email);
  const[batch,setBatch] =useState(obj.batch);

  const navigate = useNavigate();

  return(
    <div className="addstudform" style={{display: "flex", flexDirection: "column", gap:"20px", maxWidth: "700px", margin: "auto"}}>
      <TextField onChange={(event) => setName(event.target.value)} id="standard-basic" label="Add Name" variant="standard" value={name} />
      <TextField onChange={(event) => setEmail(event.target.value)} id="standard-basic" label="Add E-mail" variant="standard" value={email} />
      <TextField onChange={(event) => setBatch(event.target.value)} id="standard-basic" label="Add Batch" variant="standard" value={batch} />
      <Button onClick={()=>{
        let updatedstud={
          name,
          email,
          batch
        };
        let arrr = stud.map((ele, index) => index==id ? {...ele,name:name,email:email,batch:batch} : ele);
        setStud([...arrr]);
        navigate("/records");
      }} variant="outlined">Update student</Button>
    </div>
  )
}


export function TeachTable({teach,setTeach}) {

const navigate = useNavigate();
  
  return (
    <TableContainer component={Paper}>
      <Table sx={{ maxWidth: 1000, margin: "auto" }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>UID</TableCell>
            <TableCell align="right">Name</TableCell>
            <TableCell align="right">E-mail</TableCell>
            <TableCell align="right">Batch</TableCell>
            <TableCell align="right">Edit</TableCell>
            <TableCell align="right">Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {teach.map((ele,index) => (
            <TableRow key={index} index={index} sx={{ '&:last-child td, &:last-child th': { border: 0 }, textAlign: "center" }}>
              <TableCell component="th" scope="row">{index}</TableCell>
              <TableCell align="right">{ele.name}</TableCell>
              <TableCell align="right">{ele.email}</TableCell>
              <TableCell align="right">{ele.batch}</TableCell>
              <TableCell align="right">
                <Button onClick={()=>{navigate(`/home/teacher/edit/${index}`)}}>
                  <IconButton color="primary" aria-label="delete">
                    <EditIcon />
                  </IconButton>
                </Button>
              </TableCell>
              <TableCell align="right">
                <Button onClick={()=>{
                  let n1 = ele.name;
                  let res = teach.filter((ele)=> ele.name!=n1);
                  setTeach([...res]);
                }}>
                  <IconButton color="error" aria-label="delete">
                    <DeleteIcon />
                  </IconButton>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}


function Getteacherprefilleddata({setTeach, teach}){

  const {id} = useParams();

  const obj = teach[id];

  return(
    <div>
      <h2>Update teacher record</h2>
      {obj === undefined ? "Loading" : <Fillvalueteacher obj={obj} teach ={teach} setTeach={setTeach} />}
    </div>
  )
}
function Fillvalueteacher({obj, teach, setTeach}){

  const {id} = useParams();

  const[name,setName] =useState(obj.name);
  const[email,setEmail] =useState(obj.email);
  const[batch,setBatch] =useState(obj.batch);

  const navigate = useNavigate();

  return(
    <div className="addteachform" style={{display: "flex", flexDirection: "column", gap:"20px", maxWidth: "700px", margin: "auto"}}>
      <TextField onChange={(event) => setName(event.target.value)} id="standard-basic" label="Add Name" variant="standard" value={name} />
      <TextField onChange={(event) => setEmail(event.target.value)} id="standard-basic" label="Add E-mail" variant="standard" value={email} />
      <TextField onChange={(event) => setBatch(event.target.value)} id="standard-basic" label="Add Batch" variant="standard" value={batch} />
      <Button onClick={()=>{
        let updatedteach={
          name,
          email,
          batch
        };
        let arrr = teach.map((ele, index) => index==id ? {...ele,name:name,email:email,batch:batch} : ele);
        setTeach([...arrr]);
        navigate("/records");
      }} variant="outlined">Update teacher</Button>
    </div>
  )
}



function AddStud({stud, setStud}){

  const addstudformschema = yup.object({
    name: yup.string().required().min(2),
    email: yup.string().email().required().min(5),
    batch: yup.string().required().min(2)
  })

  const formik = useFormik({
    initialValues : {name: "", email: "", batch: ""},
    validationSchema: addstudformschema,
    onSubmit: (values) => {
      setStud([...stud, values]);
      navigate("/records");
    }
  });

  // const[name,setName] =useState("");
  // const[email,setEmail] =useState("");
  // const[batch,setBatch] =useState("");

  const navigate = useNavigate();

  return(
    <form onSubmit={formik.handleSubmit} className="addstudform" style={{display: "flex", flexDirection: "column", gap:"20px", maxWidth: "700px", margin: "auto"}}>
      <h2>Add new student to the record</h2>
      <TextField helperText={formik.touched.name && formik.errors.name ? formik.errors.name: null} error={formik.touched.name && formik.errors.name ? true: false} onBlur={formik.handleBlur} onChange={formik.handleChange} id="standard-error-helper-text" label="Add Name" variant="standard" name="name" />
      {/* {formik.touched.name && formik.errors.name ? formik.errors.name: null} */}
      <TextField helperText={formik.touched.email && formik.errors.email ? formik.errors.email: null} error={formik.touched.email && formik.errors.email ? true: false} onBlur={formik.handleBlur} onChange={formik.handleChange} id="standard-error-helper-text" label="Add E-mail" variant="standard" name="email"/>
      {/* {formik.touched.email && formik.errors.email ? formik.errors.email: null} */}
      <TextField helperText={formik.touched.batch && formik.errors.batch ? formik.errors.batch: null} error={formik.touched.batch && formik.errors.batch ? true: false} onBlur={formik.handleBlur} onChange={formik.handleChange} id="standard-error-helper-text" label="Add Batch" variant="standard" name="batch" />
      {/* {formik.touched.batch && formik.errors.batch ? formik.errors.batch: null} */}
      <Button type="submit"  
      // onClick={()=>{
      //   let newstud={
      //     name,
      //     email,
      //     batch
      //   };
      //   setStud([...stud, newstud]);
      //   navigate("/records");
      // }}
      variant="outlined">Add students</Button>
    </form>
  )
}



function AddTeach({teach, setTeach}){

  const addteachformschema = yup.object({
    name: yup.string().required().min(2),
    email: yup.string().email().required().min(5),
    batch: yup.string().required().min(2)
  })

  const formik = useFormik({
    initialValues : {name: "", email: "", batch: ""},
    validationSchema: addteachformschema,
    onSubmit: (values) => {
      setTeach([...teach, values]);
      navigate("/records");
    }
  });

  // const[name,setName] =useState("");
  // const[email,setEmail] =useState("");
  // const[batch,setBatch] =useState("");

  const navigate = useNavigate();

  return(
    <form onSubmit={formik.handleSubmit} className="addteachform" style={{display: "flex", flexDirection: "column", gap:"20px", maxWidth: "700px", margin: "auto"}}>
      <h2>Add new teacher to the record</h2>
      <TextField helperText={formik.touched.name && formik.errors.name ? formik.errors.name: null} error={formik.touched.name && formik.errors.name ? true: false} onBlur={formik.handleBlur} onChange={formik.handleChange} id="standard-error-helper-text" label="Add Name" variant="standard" name="name" />
      {/* {formik.touched.name && formik.errors.name ? formik.errors.name: null} */}
      <TextField helperText={formik.touched.email && formik.errors.email ? formik.errors.email: null} error={formik.touched.email && formik.errors.email ? true: false} onBlur={formik.handleBlur} onChange={formik.handleChange} id="standard-error-helper-text" label="Add E-mail" variant="standard" name="email" />
      {/* {formik.touched.email && formik.errors.email ? formik.errors.email: null} */}
      <TextField helperText={formik.touched.batch && formik.errors.batch ? formik.errors.batch: null} error={formik.touched.batch && formik.errors.batch ? true: false} onBlur={formik.handleBlur} onChange={formik.handleChange} id="standard-error-helper-text" label="Add Batch" variant="standard" name="batch" />
      {/* {formik.touched.batch && formik.errors.batch ? formik.errors.batch: null} */}
      <Button type="submit"
      // onClick={()=>{
      //   let newteach={
      //     name,
      //     email,
      //     batch
      //   };
      //   setTeach([...teach, newteach]);
      //   navigate("/records");
      // }} 
      variant="outlined">Add teachers</Button>
    </form>
  )
}




function About(){
  return(
    <div className="about" style={{maxWidth: "700px", textAlign: "center", margin: "auto"}}>
      <p>Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur. Quis aute iure reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint obcaecat cupiditat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur. Quis aute iure reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint obcaecat cupiditat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur. Quis aute iure reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint obcaecat cupiditat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
    </div>
  )
}