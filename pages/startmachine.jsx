import React, { useEffect, useState } from 'react';
import Header from "./../components/Header";
import { useRouter } from 'next/router';
import cookie from "cookie-cutter"

import ChooseTime from "."

function Startmachine() {
  const [checked, setChecked] = useState(false)
  const [waterCheck, setWaterCheck] = useState(false)
  const [currentMachine, setCurrentMachine] = useState("")
  const [currentPump, setCurrentPump] = useState("")
  const [pumps, setPumps] = useState([])
  const [machines, setMachines] = useState([])
  const [showChoose, setShowChoose] = useState(false)

  const router = useRouter();

  // function sendStartSMS(pumpnumber, pumpstartcode){
  //   fetch("http://remote.kkpartner.dk:3001/sendsms", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json"
  //     },
  //     body: JSON.stringify({ 
  //       number: pumpnumber,
  //       message: pumpstartcode
  //     })
  //   })
  // }  


  useEffect(() => {    
    var bool = cookie.get("loggedin")
    if (bool && bool == "true") {
      return
    } else {
      router.push("/")
    }
    fetch("/api/machines").then(res => res.json()).then(json => setMachines(json))
    fetch("/api/pumps").then(res => res.json()).then(json => setPumps(json))
  }, [])

  return(
    <React.Fragment>
      {showChoose && currentMachine ? <ChooseTime machine={currentMachine} /> : <>
       
        <Header />

        <form className="select" id="formstartmachine" onSubmit={(event) => {
          // Prevents default behavior (Getting put at another site)
          event.preventDefault();

          // Check if Checkbox is true or false
          if(!checked) return;

          // Check if a machine and pump is selected
          if(currentMachine && currentPump){

            if(!waterCheck) {
              fetch("/api/machines/start/" + currentMachine.id, {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json"
                },
                body: JSON.stringify(currentPump)
              }).then(res => res).then(() => {
                router.push("/overview")
              })
            } 
            else {
              fetch("/api/machines/start/" + currentMachine.id, {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json"
                },
                body: JSON.stringify(currentPump)
              }).then(res => res.json()).then(json => {
                setMachines(json)
                router.push("/choosetime/" + currentMachine.id)
              })
            }

                        
          };
        }}>
        <div id="choosemachine">
          <label htmlFor="chosenmachine">Vælg en maskine</label>
          <br></br>
          <select name="chosenmachine" id="chosenmachine" defaultValue="blank" onChange={function(event){
            var correctMachine = machines.find((machine) => {
              return machine.id == event.target.value
            })
            setCurrentMachine(correctMachine);
          }}>
            <option value="blank" disabled hidden></option>
            {machines ? machines.filter(machine => !machine.active).map((element) => <option key={element.id} value={element.id}>{element.id}</option>) : <></>}
          </select>
        </div>

        <br></br>

        <div id="choosepump">
          <label htmlFor="">Vælg en pumpe</label>
          <br></br>
          <select name="chosenpump" id="chosenpump" defaultValue="blank" onChange={function(event){
            var options = event.target.children;
            var option = options[event.target.selectedIndex];

            var correctPump = pumps.find((pump) => {
              return pump.id == option.dataset.id && pump.active == 0
            })
            setCurrentPump(correctPump);
          }}>
            <option value="blank" disabled hidden></option>
            {pumps ? pumps.filter(pump => !pump.active).map(function(element) {
              return <option key={element.id} data-id={element.id}>{element.name}</option>
            }) : <></>}
          </select>
        </div>

        <br></br>

        <div id="checkboxtext">
          <h2>Tjek følgende</h2>
          </div>
          <h5 id="checks">1. Hydrant åben <br></br>2. Maskine er sat i gear <br></br>3. Slange korrekt placeret <br></br>4. Aflæs tiden <br></br>5. Dyse valg korrekt</h5>
          <label className="container">Jeg har tjekket overstående
            <input onChange={() => setChecked(!checked)} type="checkbox"></input>
            <span className="checkmark"></span>
          </label>
          <label className="container">Vælg tid med det samme
            <input onChange={() => setWaterCheck(!waterCheck)} type="checkbox"></input>
            <span className="checkmark"></span>
          </label>
          

        <button type="submit" id="buttonstartmachine">START VANDING</button>

        </form>
       </>}

    </React.Fragment>
  );

}

export default Startmachine;