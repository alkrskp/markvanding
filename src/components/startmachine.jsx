import React, { useEffect, useState } from 'react';

function Startmachine({setSubmitted, inactivePumps, inactiveMachines}){
  const [data, setData] = useState([]);
  const [checked, setChecked] = useState(false)
  const [machine, setMachine] = useState("")
  const [pump, setPump] = useState("")

  function sendStartSMS(pumpnumber, pumpstartcode){
    fetch("http://remote.kkpartner.dk:3001/sendsms", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ 
        number: pumpnumber,
        message: pumpstartcode
      })
    })
  }  

  function UpdatePump(pump){

    // Set date of machine to selected date
     var tempPump = {...pump}
     
     tempPump.active = 1;
     

    fetch("http://10.10.51.36:5000/updatepump", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(tempPump)
    })
  }

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
          UpdatePump(pump)
          
          
          // UDFYLD RIGTIG DATA TIL SMS
          var pumpnumber = "45" + pump.number
          var pumpstartcode = pump.startcode
          sendStartSMS(pumpnumber, pumpstartcode)
          
          // Sets "Submitted" hook to true
          localStorage.setItem("machine", machine)
          localStorage.setItem("pump", pump.name)
          localStorage.setItem("hasstarted", "true")
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
            {inactiveMachines.map((element) => <option key={element.id}>{element.id}</option>)}
          </select>
        </div>
  
        <br></br>
  
        <div id="choosepump">
          <label htmlFor="">Vælg en pumpe</label>
          <br></br>
          <select name="chosenpump" id="chosenpump" onChange={function(event){
            var options = event.target.children;
            var option = options[event.target.selectedIndex];

            var correctPump = inactivePumps.find((pump) => pump.id == option.dataset.id)

            setPump(correctPump);
          }}>
            <option selected disabled hidden></option>
            {inactivePumps.map(function(element) {
              return <option key={element.id} data-id={element.id}>{element.name}</option>
            })}
          </select>
        </div>
  
        <br></br>
    
        <div id="checkboxtext">
          <h2>Tjek følgene</h2>
          </div>
          <p id="checks">1. Hydrant åben <br></br>2. Maskine er sat i gear <br></br>3. Slange korrekt placeret <br></br>4. Aflæs tiden <br></br>5. Dyse valg korrekt</p>
          <label className="container">Jeg har tjekket overstående
            <input onChange={() => setChecked(!checked)} type="checkbox"></input>
            <span className="checkmark"></span>
          </label>
    
        <button type="submit" id="buttonstartmachine">START VANDING</button>

      </form>
  );

}

export default Startmachine;