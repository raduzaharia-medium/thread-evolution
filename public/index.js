import { roundAll } from "./tools.js";
import { fitness } from "./operations.js";

const worker = new Worker("worker.js", { type: "module" });

worker.addEventListener("message", (e) => {
  const result = e.data;
  const rounded = roundAll(result);

  const item = document.createElement("p");
  const values = document.createElement("span");
  const meter = document.createElement("meter");

  meter.min = 0;
  meter.max = 50;
  meter.value = (50 - fitness(result)).toFixed(2);
  meter.style.width = "100%";
  meter.style.height = "100%";
  values.innerText = `${rounded.join(" ")}: ${(50 - fitness(result)).toFixed(
    2
  )}`;

  item.style.display = "grid";
  item.style.gridTemplateColumns = "5em 1fr";
  item.style.columnGap = "1em";

  item.appendChild(meter);
  item.appendChild(values);
  document.querySelector("main").appendChild(item);
});
