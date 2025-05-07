import React from "react";
import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import * as Path from "./path/mod.ts";

export default function App() {
  return (
    <div className="app">
      <h1 className="maintitle">Bombardiro Crocodilo, un fottuto alligatore volante, che vola e bombarda i bambini a Gaza, e in Palestina. Non crede in Allah e ama le bombe.Él apoya la mierda de zionis. Si nutre dello spirito di tua madre. E se hai tradotto tutto questo, allora sei uno stronzo. Non rompere la battuta, prostituta</h1>
      <h1 className="maintitle">Bombardier Crocodilo, a flying alligator, flies and bombs in Gaza, and in Palestine. Don't believe in Allah and love the bomb. He supports the shit of zionis. If you nourish the spirit of your mother. And if there is anything to do with this question, I still know one big thing. Don't break the battuta, whore</h1>
      <h1 className="maintitle">Bombardier Crocodilo, fljúgandi alligator, flýgur og sprengir í Gaza og í Palestínu. Trúðu ekki á Allah og elskaðu sprengjuna. Hann styður skítinn hjá Síónistum. Ef þú nærir anda móður þinnar. Og ef það er eitthvað sem tengist þessari spurningu, þá veit ég samt eitt stórt. Ekki brjóta battutuna, hóra</h1>
      <h1 className="maintitle">U Bombardier Crocodilo, u khnai uba her, u her bad u bom ha Gaza, bad ha Palestine. Wat ngeit ia u Allah bad ieid ia ka bom. U kyrshan ia ka shit jong ki zion. Lada phi pyndap pynbiang ia ka mynsiem jong ka kmie jong phi. Bad lada don eiei kaba iadei bad kane ka jingkylli, nga dang tip ia kawei ka jingkylli kaba khraw. Wat pynpra ia ka battatu, ka nongkhaii .</h1>
      <h1 className="maintitle">Bombardier Crocodilo, ein fliegender Alligator, fliegt und bombardiert in Gaza und in Palästina. Glaube nicht an Allah und liebe die Bombe. Er unterstützt den Mist von Zionis. Wenn du den Geist deiner Mutter nährst. Und wenn diese Frage irgendetwas zu tun hat, dann weiß ich noch eine wichtige Sache. Mach die Battuta nicht kaputt, Hure</h1>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Path.Root />} />
          <Route path="/notice" element={<Path.Notice />} />
          <Route path="/member" element={<Path.Member />} />
          <Route path="/history" element={<Path.History />} />
          <Route path="/activity" element={<Path.Activity />} />
          <Route path="/design" element={<Path.Design />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
