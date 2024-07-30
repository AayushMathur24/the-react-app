import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
<style>
  @import
  url('https://fonts.googleapis.com/css2?family=Kanit:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
  @import
  url('https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,opsz,wght@0,6..12,200..1000;1,6..12,200..1000&display=swap');
</style>;

let friends = [
  { name: "Ravi", img: "https://i.pravatar.cc/150?img=59" },
  {
    name: "Tim",
    img: "https://i.pravatar.cc/150?img=4",
  },
];
let values = [];
let lim = 2;
// let anyother = -1;
function Main() {
  return (
    <div>
      <div className="outline">
        <h2 className="heading">📃SPLITTING BILL WITH FRIENDS</h2>
      </div>
      <div className="Element1">
        <Display />
      </div>
    </div>
  );
}
let flag = false;
let anyother = 0;
function Display() {
  const [clicked_addmem, setclicked_addmem] = useState(false);
  function xyz() {
    flag = false;
    setclicked_addmem((e) => !e);
  }
  return (
    <div className="extra-space">
      <div className="comp1">
        {friends.map(function (info, i) {
          if (values.length < friends.length) {
            values.push([0, 0, 0, ""]);
          }
          return <Comp1 nm={info.name} num={i} />;
        })}
      </div>
      <div className="AddmemEl">
        {lim == 8 &&
          clicked_addmem &&
          alert("Reached Maximum friend addition limit...")}
        <button
          className={`${lim < 8 ? "add-friend" : "memlim"}`}
          onClick={xyz}
        >
          {!clicked_addmem || lim == 8 ? "ADD MEMBER" : "BACK"}
        </button>
        <div className="addmem1">
          {clicked_addmem && lim < 8 && <Addingmember />}
        </div>
      </div>
    </div>
  );
}

function Addingmember() {
  const [newname, setnewname] = useState("");
  const [url, seturl] = useState("https://i.pravatar.cc/48");
  let ind = Math.floor(Math.random() * 69);
  function UpdateArr() {
    seturl((url) => `${url}?=${ind}`);
    let obj = { name: `${newname}`, img: `${url}` };
    if (newname) {
      if (!flag) {
        friends.push(obj);
        flag = true;
        alert("Data saved successfully!");
        lim++;
      }
    }
  }
  return (
    <div className="addmem2">
      <div className="lb1">
        <label className="frnmlb">Friend Name : </label>
        <input
          type="text"
          className="frname"
          value={newname}
          onChange={(e) => setnewname(e.target.value)}
        />
      </div>
      <div className="lb2">
        <label className="imgurllb">Image URL : </label>
        <input
          type="text"
          className="img-linksp"
          value={url}
          autoComplete="on"
        />
      </div>

      <button className={flag ? "c1" : "c2"} onClick={UpdateArr}>
        {flag ? "Changes-Saved" : "SUBMIT"}
      </button>
    </div>
  );
}
function Comp1({ num, nm }) {
  let signal = true;
  const [isopen, setopen] = useState(false);
  function handleIsopen() {
    if (!signal && anyother == 1) {
      alert(`Please close the ongoing transaction first...`);
    }
    if (!signal && anyother == 0) {
      setopen((isopen) => (isopen = true));
      anyother++;
    } else if (signal && anyother == 1) {
      setopen((isopen) => (isopen = false));
      anyother--;
    }
  }
  return (
    <div className={`display ${isopen ? "op" : ""}`}>
      <div className="per-details">
        <div className="img-container">
          <img
            className="fr-img"
            src={`${friends[num].img}`}
            alt="No-image"
            height={48}
            width={48}
          />
        </div>
        <div className="combined">
          <div className="display-name">{nm}</div>
          <button
            className={isopen ? "cl-btn" : "op-btn"}
            onClick={handleIsopen}
          >
            {isopen ? "CLOSE" : "SELECT"}
            {isopen ? (signal = true) : (signal = false)}
          </button>
          {!isopen && (
            <Update
              payer={values[num][3]}
              name={nm}
              fexp={values[num][2]}
              myexp={values[num][1]}
              billamt={values[num][0]}
              signal={isopen}
            />
          )}
        </div>
      </div>
      <div>
        {isopen && (
          <Profile
            name={nm}
            num={num}
            signal={isopen}
            upper={nm.toUpperCase()}
          />
        )}
      </div>
    </div>
  );
}
function Profile({ name, num, signal, upper }) {
  const [bill, setbill] = useState(values[num][0]);
  const [myexp, setmyexp] = useState(values[num][1]);
  const [payer, setpayer] = useState(values[num][3]);
  const [spbill, setspbill] = useState(false);
  values[num][3] = payer;
  values[num][1] = myexp;
  values[num][2] = bill - myexp;
  values[num][0] = bill;
  function callspbill() {
    if (!payer || payer == "Select One") {
      alert("Select bill payer!");
      setpayer((e) => "");
    } else {
      setspbill((spbill) => !spbill);
    }
  }
  function clickclear() {
    setbill((e) => 0);
    setmyexp((e) => 0);
    setpayer((e) => "");
  }
  return (
    <div className="El2">
      <div className="Element2">
        <h2 className="heading_p2">SPLIT A BILL WITH {upper}</h2>
        <div className="field1 fd">
          <label className="lab">💰 Bill Amount : </label>
          <input
            className="inp1"
            autoComplete="on"
            value={bill}
            type="Number"
            onChange={(e) => setbill(e.target.value)}
          />
        </div>
        <div className="field2 fd">
          <label className="lab">🧑‍🦰 Your Expense : </label>
          <input
            className="inp2"
            autoComplete="on"
            value={myexp}
            type="Number"
            onChange={(e) => setmyexp(e.target.value)}
          />
        </div>
        <div className="field-3 fd">
          <aside className="lab">🧑‍🤝‍🧑 {name}'s Expense : </aside>
          <aside className="friend-expense">{bill - myexp}</aside>
        </div>
        <div className="field4 fd">
          <label className="lab">💵 Bill Payer :</label>
          <select
            className="inp4"
            value={payer}
            onChange={(e) => setpayer(e.target.value)}
          >
            <option>Select One</option>
            <option>Me</option>
            <option>{name}</option>
          </select>
        </div>
        <div className="both-btns">
          <button className="print-details" onClick={callspbill}>
            SPLIT BILL
          </button>
          <button className="clr" onClick={clickclear}>
            CLEAR-RECORD
          </button>
        </div>
      </div>
      {spbill && (
        <Update
          num={num}
          name={name}
          fexp={values[num][2]}
          myexp={values[num][1]}
          payer={values[num][3]}
          billamt={values[num][0]}
          signal={signal}
        />
      )}
    </div>
  );
}
function Update({ num, name, fexp, myexp, payer, billamt, signal }) {
  return (
    <div className={signal ? "curr-cont" : "stored-cont"}>
      {(payer === "" ||
        !billamt ||
        (billamt == myexp && payer == "Me") ||
        (billamt == fexp && payer == `${name}`)) && (
        <div className="cont-even">You and {name} are even</div>
      )}
      {(billamt < 0 || myexp < 0 || fexp < 0) && alert("Invalid Values!")}
      {(fexp < 0 || myexp < 0 || billamt < 0) && (
        <div>Invalid Data Entered</div>
      )}
      {payer === `${name}` && billamt > 0 && myexp > 0 && fexp >= 0 && (
        <div className={signal ? "oweRc" : "oweR"}>
          You owe {name} Rs. {myexp}
        </div>
      )}
      {payer === "Me" && billamt > 0 && myexp >= 0 && fexp > 0 && (
        <div className={!signal ? "oweGc" : "oweG"}>
          {name} owes you Rs. {fexp}
        </div>
      )}
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Main />);
