import React, { useEffect, useState } from 'react'
import ParticlesBg from 'particles-bg'
import icon from "./icon";


export default function ParticlePage() {
  let config = {
    num: [4, 7],
    rps: 0.1,
    radius: [5, 40],
    life: [1.5, 3],
    v: [2, 3],
    tha: [-50, 50],
    alpha: [0.6, 0],
    scale: [.1, 0.9],
    body: icon,
    position: "all",
    //color: ["random", "#ff0000"],
    cross: "dead",
    random: 10
  };


  return (
    <ParticlesBg type="custom" config={config} bg={true}/>
  )
}
