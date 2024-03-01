"use client";
import 'regenerator-runtime/runtime';
import Header from "./Components/Header/Header"
import Footer from "./Components/Footer/Footer";
import Body from "./Components/Body/Body";
import Comments from "./Components/Comments/Comments";
import { Playfair } from "next/font/google";
import React, { useState, useEffect } from "react";
import { QueryClient, QueryClientProvider,useQuery } from 'react-query'

const queryClient = new QueryClient()

const playfair = Playfair(
{
  subsets:['latin']
});

export default function Home() {
  const [myBool, setmyBool] = useState(true);

  function toggleBool() {
    setmyBool(!myBool)
  }
  return (
    <main className="justify-center items-center">
      <div className={playfair.className}>
      <Header Login={toggleBool} isLogin={myBool}/>
      <QueryClientProvider client={queryClient}>
      {myBool ? <Body/> : <Comments logOut={toggleBool}/> }
      </QueryClientProvider>
      <Footer/>
      </div>
    </main>
  );
}
