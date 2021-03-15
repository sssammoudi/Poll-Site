import React, {useState} from 'react';
import { Button, FormControl, Input, InputLabel, Grid } from "@material-ui/core";
import { Alert } from '@material-ui/lab';
import db from "./firebase";
import Poll from "./Poll";
import Add from "./Add"
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#fdd835',
        },
        secondary: {
            main: '#ffc400',
        },
    },
});

function Search() {
    const [input, setInput] = useState("");
    const [result, setResult] = useState("")
    function getResult(e) {
        e.preventDefault();
        if(input !== null || input!==""){
            db.collection("polls").doc(input)
            .get()
            .then((doc) => {
                if(doc.exists) {
                    setResult("exists")
                } else {
                    setResult("inexisting")
                    setInput("");
                }
            })
        }
    }
    function AddFunc(){
        setResult("Add")
    }
    return (
        <ThemeProvider theme={theme}>
            {!result || result==="inexisting" ? (
                <ThemeProvider theme={theme}>
                    <Grid
                        justify="space-between"
                        container 
                        spacing={24}
                    >
                        <Grid item>
                            <Button
                                variant="contained"
                                color="primary"
                                type="submit"
                                name="Add"
                                onClick={(e) => AddFunc(e)}
                            >
                                +
                            </Button>
                        </Grid>
                    </Grid>
                    <form className="__form">
                        <FormControl className="__formControl">
                            <InputLabel>Search...</InputLabel>
                            <Input
                                className="__input"
                                value={input}
                                onChange={(event) => setInput(event.target.value)}
                            /> 
                            <Button
                                variant="contained"
                                color="primary"
                                type="submit"
                                onClick={(e) => getResult(e)}
                            >
                            search
                            </Button>
                        </FormControl>
                        {result==="inexisting" && 
                        <Alert severity="error">
                            This Poll doesn't exist
                        </Alert>}
                    </form>
                </ThemeProvider>) :
                result==="exists" ? (<Poll name={input} result={setResult}/>) : 
                result==="Add" && (<Add result={setResult} name={setInput}/>)
            } 
        </ThemeProvider>
    )
}

export default Search
