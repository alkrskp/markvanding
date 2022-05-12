import React, { useEffect, useState } from "react";
import { useRouter } from 'next/router'

import Header from "./../components/Header";

function Home() {
  const [email, setEmail] = useState("")
  const [pass, setPassword] = useState("")
  const [machines, setMachines] = useState([])

  const router = useRouter();

  const HandleLogin = (e) => {
      e.preventDefault();

      // fetch("http://remote.kkpartner.dk:3001/auth", {
      //     method: "POST",
      //     headers: {
      //         "Content-type": "application/json",
      //         "Accept" : "application/json"
      //     },
      //     credentials: 'include',
      //     body: JSON.stringify({
      //         email: email,
      //         password: pass
      //     })
      // })
      // .then(res => {
      // })
      
      router.push("/overview")
  }




  useEffect(function() 
  {    
    var hasstarted = localStorage.getItem("hasstarted")
    if (hasstarted === "true") {
      setSubmitted(true)
    }
  }, [])


  return (
      <React.Fragment>
        <Header />
        <main>
          <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
              <div>
                <img
                  className="mx-auto h-12 w-auto"
                  src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                  alt="Workflow"
                />
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Log ind i Markvanding</h2>
              </div>
              <form className="mt-8 space-y-6" onSubmit={HandleLogin}>
                <input type="hidden" name="remember" defaultValue="true" />
                <div className="rounded-md shadow-sm -space-y-px">
                  <div>
                    <label htmlFor="email-address" className="sr-only">
                      Email
                    </label>
                    <input
                      onChange={(e) => { setEmail(e.target.value) }} 
                      id="email-address"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      placeholder="Email"
                    />
                  </div>
                  <div>
                    <label htmlFor="password" className="sr-only">
                      Kode
                    </label>
                    <input
                      onChange={(e) => { setPassword(e.target.value) }}
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      required
                      className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      placeholder="Kode"
                    />
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Log Ind
                  </button>
                </div>
              </form>
            </div>
          </div>
        </main>    
      </React.Fragment>
  );
}

export default Home;