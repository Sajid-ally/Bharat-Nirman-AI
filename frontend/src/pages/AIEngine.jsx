import { useState } from "react";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

export default function AIEngine(){

    const [sidebar,setSidebar] =
    useState(true);

    const [prompt,setPrompt] =
    useState("");

    const [loading,setLoading] =
    useState(false);

    const [response,setResponse] =
    useState("");

    async function askAI(){

        if(!prompt){

            setResponse(
                "Please enter a query."
            );

            return;
        }

        setLoading(true);

        try{

            const response =

            await fetch(

                "http://localhost:5000/api/ai",

                {

                    method:"POST",

                    headers:{
                        "Content-Type":
                        "application/json"
                    },

                    body:
                    JSON.stringify({

                        prompt

                    })

                }

            );

            console.log(
                "STATUS:",
                response.status
            );

            const text =
            await response.text();

            console.log(
                "RAW:",
                text
            );

            try{

                const data =
                JSON.parse(text);

                setResponse(

                    data.answer ||

                    data.error ||

                    "No AI response"

                );

            }

            catch{

                setResponse(
                    text
                );
            }

        }

        catch(err){

            console.log(
                err
            );

            setResponse(

                "AI Server Error"

            );
        }

        setLoading(false);
    }

    return(

        <>

            <Navbar
                sidebar={sidebar}
                setSidebar={setSidebar}
            />

            <div className="dashboard">

                <Sidebar
                    sidebar={sidebar}
                />

                <div
                    style={{
                        flex:1,
                        padding:"20px"
                    }}
                >

                    <h1>
                        BharatNirman AI Engine
                    </h1>

                    <div
                        className="panel"
                        style={{
                            padding:"20px"
                        }}
                    >

                        <textarea

                            value={prompt}

                            onChange={
                                e=>
                                setPrompt(
                                    e.target.value
                                )
                            }

                            placeholder=
                            "Ask BharatNirman AI anything..."

                            style={{

                                width:"100%",

                                height:"150px",

                                padding:"15px",

                                borderRadius:"10px",

                                fontSize:"16px"

                            }}

                        />

                        <br/>
                        <br/>

                        <button

                            onClick={
                                askAI
                            }

                            disabled={
                                loading
                            }

                            style={{

                                padding:
                                "12px 30px",

                                cursor:
                                "pointer"

                            }}

                        >

                            {

                                loading

                                ?

                                "Analyzing..."

                                :

                                "Run AI"

                            }

                        </button>

                    </div>

                    <br/>

                    <div
                        className="panel"
                        style={{
                            padding:"20px"
                        }}
                    >

                        <h2>
                            AI Response
                        </h2>

                        <pre
                            style={{

                                whiteSpace:
                                "pre-wrap",

                                fontSize:
                                "15px"

                            }}
                        >

                            {

                                response ||

                                "No response yet"

                            }

                        </pre>

                    </div>

                </div>

            </div>

        </>

    );

}