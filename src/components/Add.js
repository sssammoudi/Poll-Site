import React, {useState} from 'react'
import { Button, FormControl, Input, InputLabel, Grid } from "@material-ui/core";
import { Alert } from '@material-ui/lab';
import db from "./firebase";

function Add({result, name}) {
  const [input, setInput] = useState("");
  const [addResult, setAddResult] = useState("")
  function getResult(e) {
    e.preventDefault();
    if(input !== null || input!==""){
        db.collection("polls").doc(input)
        .get()
        .then((doc) => {
            if(doc.exists) {
              setAddResult("exist")
            } else {
              setAddResult("inexist")
              db.collection("polls").doc(input).set({
                pour: 0,
                contre: 0
              })
              name(input)
              result("exists")
            }
        })
    }
  }
  return (
    <div>
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
                      name="Home"
                      onClick={(e)=>result("")}
                  >
                      Home
                  </Button>
              </Grid>
          </Grid>
          <form className="__form2">
              <FormControl className="__formControl2">
                  <InputLabel>Title of the Poll</InputLabel>
                  <Input
                      className="__input"
                      value={input}
                      onChange={(event) => setInput(event.target.value)}
                  />
                  <br/>
                  <Button
                      variant="contained"
                      color="primary"
                      type="submit"
                      className="__btn"
                      onClick={(e) => getResult(e)}
                  >
                  Add
                  </Button>
              </FormControl>
              {addResult==="exist" &&  
              (<Alert severity="error">
                  This Poll exists
              </Alert>)}
              {addResult==="inexist" &&  
              (<Alert severity="success">
                  Created successfully
              </Alert>)}
          </form>
    </div>
  )
}

export default Add
