import React, { useEffect, useState } from 'react';

function Startmachine({setSubmitted, setStartmachine, activeMachines, inactivePumps, inactiveMachines}){
  const [data, setData] = useState([]);
  const [checked, setChecked] = useState(false)
  const [machine, setMachine] = useState("")
  const [pump, setPump] = useState("")

  useEffect(function() 
  {
  }, [])

  return(
      <form className="select" id="formstartmachine" onSubmit={function(event){

        // Prevents default behavior (Getting put at another site)
        event.preventDefault();
        // Check if Checkbox is true or false
        if(!checked) return;

        // Checks if a machine and pump is selected
        if(machine && pump){
          // MAKE MACHINE OBJECT
          var newMachine = {
            id: machine,
            pumpname: pump,
            time: "2000-01-01 00:00:00",
            active: 1
          }
          
          // Sets "Startmachine" hook to values of "newMachine"
          setStartmachine(newMachine);
          
          
          // SEND QUERY AND AWAIT SUCCESS
          

          
          // Sets "Submitted" hook to true
          setSubmitted(true)
        };
      }}>
        <div id="choosemachine">
          <label htmlFor="chosenmachine">Vælg en maskine</label>
          <br></br>
          <select name="chosenmachine" id="chosenmachine" onChange={function(event){
            setMachine(event.target.value);
          }}>
            <option selected disabled hidden></option>
            {
            inactiveMachines.map(function(element) {
              return <option key={element.id}>{element.id}</option>
            })}
          </select>
        </div>
  
        <br></br>
  
        <div id="choosepump">
          <label htmlFor="">Vælg en pumpe</label>
          <br></br>
          <select name="chosenpump" id="chosenpump" onChange={function(event){
            setPump(event.target.value);
          }}>
            <option selected disabled hidden></option>
            {inactivePumps.map(function(element) {
              return <option key={element.id} >{element.name}</option>
            })}
          </select>
        </div>
  
        <br></br>
  
      <div id="checkboxtext">
        <h2>Tjek følgene</h2>
        </div>
        <p id="checks">1. Hydrant åben <br></br>2. Maskine er sat i gear <br></br>3. Slange korrekt placeret <br></br>4. Aflæs tiden <br></br>5. Dyse valg korrekt</p>
        <label className="container">Jeg har tjekket overstående
          <input onChange={function(){
            //Set Checked Hook to "Checked" = true/false
            setChecked(!checked)
          }} type="checkbox"></input>
          <span className="checkmark"></span>
        </label>
  
      <button type="submit" id="buttonstartmachine">START VANDING</button>

      </form>
  );

}

export default Startmachine;