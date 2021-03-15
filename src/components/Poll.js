import React, {useEffect, useState} from 'react'
import db from "./firebase";
import Chart from "react-google-charts";
import { RadioGroup, FormControl, FormControlLabel, Radio, Button, Grid } from "@material-ui/core";

function Poll({name, result}) {
  const [voted, setVoted] = useState(localStorage.getItem(name) || null)
  const [data_, setData_] = useState(null)
  const [value, setValue] = useState("pour")
  useEffect(() => {
    db.collection("polls")
    .doc(name)
    .onSnapshot((doc) => {
      setData_(doc.data())
      console.log(data_)
    });
  }, []);
  function HandleChange(e){
    setValue(e.target.value);
  }
  function SubmitResult(e){
    e.preventDefault();
    localStorage.setItem(name, name)
    setVoted(name)
    console.log(data_.pour, data_.contre)
    let addedPour = data_.pour
    let addedContre = data_.contre
    if(value==="pour"){
      addedPour++
    } else if(value==="contre"){
      addedContre++
    }
    db.collection("polls")
    .doc(name)
    .set({
      pour: addedPour,
      contre: addedContre
    })
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
      {data_ && 
        <div>
          <Grid
            justify="space-between"
            container 
            spacing={10}
          >
          <Grid item>
              <Chart
                width={'500px'}
                height={'300px'}
                chartType="PieChart"
                loader={<div>Loading...</div>}
                data={[
                  ['Vote', 'Vote'],
                  ['pour', data_.pour],
                  ['contre', data_.contre]
                ]}
                options={{
                  title: name,
                  slices: {
                    0: { color: '#f9dc1f' },
                    1: { color: '#ffbb8a' },
                  },
                }}
                rootProps={{ 'data-testid': '1' }}
              />
              <FormControl component="fieldset">
                <RadioGroup aria-label="gender" name="gender1" value={value} onChange={(e)=>HandleChange(e)}>
                  <FormControlLabel value="pour" control={<Radio />} label="pour" />
                  <FormControlLabel value="contre" control={<Radio />} label="contre" />
                </RadioGroup>
                {voted!==name ?
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  onClick={(e)=>SubmitResult(e)}
                  > 
                  Submit
                </Button> : 
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  onClick={(e)=>SubmitResult(e)}
                  disabled={true}
                  >
                  Submit
                </Button>}
              </FormControl>
            </Grid>
          </Grid>
        </div>
      }
    </div>
  )
}

export default Poll
