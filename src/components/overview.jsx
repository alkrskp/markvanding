import React, { useEffect, useState } from 'react';
import Overviewstillgoing from './overviewstillgoing';
import Overviewexpired from './overviewexpired';

function Overview({setSubmitted, expiredMachines, stillgoingMachines}) {
  const [activePumps, setActivePumps] = useState([])


  function sendStopSMS(pumpnumber, pumpStopcode){
    fetch("http://10.10.51.36:5000/sendsms", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ 
        number: pumpnumber,
        message: pumpStopcode
      })
    })
  }

  function StopPump(pump){

    // Set date of machine to selected date
     var tempPump = {...pump}
     
     tempPump.active = 0;
     

    fetch("http://10.10.51.36:5000/updatepump", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(tempPump)
    })
  }

  
  function StopMachine(machine){
    // Set date of machine to selected date
     var tempMachine = {...machine}
    
     tempMachine.pumpname = null
     tempMachine.time = null
     tempMachine.active = 0
     

    fetch("http://10.10.51.36:5000/updatemachine", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(tempMachine)
    })
  }

  useEffect(function() 
  { 
    fetch("http://10.10.51.36:5000/activepumps")
    .then(function(data) {
      return data.json();
    })
    .then(function(json) {
      setActivePumps(json)     
    }).catch((error) => {
      console.log(error);
    });
  }, [])

  if (expiredMachines != 0) {
    return (
      <div>
        <Overviewexpired expiredMachines = {expiredMachines} activePumps = {activePumps} StopMachine = {StopMachine} StopPump = {StopPump}/>
        <Overviewstillgoing stillgoingMachines = {stillgoingMachines} activePumps = {activePumps} StopMachine = {StopMachine} StopPump = {StopPump} sendStopSMS={sendStopSMS}/>
      </div>
    )
  }

  return (
    <Overviewstillgoing stillgoingMachines = {stillgoingMachines} activePumps = {activePumps} StopMachine = {StopMachine} StopPump = {StopPump} sendStopSMS={sendStopSMS}/>
  )
}

export default Overview;
