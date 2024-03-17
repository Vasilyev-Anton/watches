import { useState } from "react";
import Clock from "./Clock";
import moment, { Moment } from "moment";
import { v4 } from "uuid";

export default function Bord() {
  const [watches, setWatches] = useState([
    { name: "Moscow", time: moment(), id: v4() },
  ]);

  const timeValidate = (time: string) => {
    return /^[+-]?([0-1]?[0-9]|2[0-3])(:[0-5][0-9])?$/.test(time);
  };

  const [timezone, setTimezone] = useState("");

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const timeDif = timezone;
    if (!timeValidate(timeDif)) {
      alert("Неверно заполнено поле. Введите в формате +-hh или +-hh:mm");
      setWatches(watches);
      (event.target as HTMLFormElement).reset()
      return;
    }
  
    const nameInput = (event.target as HTMLFormElement).querySelector('input[id="name"]') as HTMLInputElement;
    if (!nameInput) {
      alert("Введите название часового пояса");
      return;
    }
  
    const newWatch: { name: string; time: Moment; id: string } = { 
      name: nameInput.value,
      time: moment().utc().add(parseInt(timeDif), 'h'), 
      id: v4() 
    };
  
    setWatches([...watches, newWatch]);
    setTimezone("");
  };
  

  return (
    <div className="time__wrapper">
      <form className="time" onSubmit={onSubmit}>
        <div className="btn-block">
          <label htmlFor="name">Название</label>
          <input type="text" id="name" placeholder="Введите название" required />
        </div>
        <div className="btn-block">
          <label htmlFor="gmt">Временная зона</label>
          <input type="text" id="gmt" placeholder="+-00:00" required onChange={(e) => setTimezone(e.target.value)} />
        </div>
        <button>Добавить</button>
      </form>

      <Clock watches={watches} setWatches={setWatches} />
    </div>
  );
}
