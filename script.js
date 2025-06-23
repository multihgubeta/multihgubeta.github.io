import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

const firebaseConfig = {
  databaseURL: "https://multihguv1-default-rtdb.europe-west1.firebasedatabase.app/"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const dispositivosRef = ref(db, "wifi/detectados");

const lista = document.getElementById("lista");

onValue(dispositivosRef, (snapshot) => {
  lista.innerHTML = "";
  snapshot.forEach((child) => {
    const mac = child.key;
    const data = child.val();
    const fabricante = data.fabricante || "desconocido";
    const tramas = data.tramas || 0;
    const li = document.createElement("li");
    li.textContent = `${mac} → ${fabricante} (${tramas} tramas)`;
    lista.appendChild(li);
  });
});
