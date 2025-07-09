const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let tool = 'brush';
let color = 'black';
let drawing = false;
let startX, startY;

// Activar herramienta
document.querySelectorAll("button").forEach(btn => {
  btn.onclick = () => {
    tool = btn.id;
    document.querySelectorAll("button").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    canvas.style.cursor = (tool === 'eraser') ? 'not-allowed' : 'crosshair';
  };
});

// Cambiar color
document.querySelectorAll(".color").forEach(c => {
  c.onclick = () => {
    color = c.dataset.color;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
  };
});

// Limpiar
document.getElementById("clear").onclick = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
};

// Guardar
document.getElementById("save").onclick = () => {
  const link = document.createElement("a");
  link.download = "dibujo.png";
  link.href = canvas.toDataURL();
  link.click();
};

// Dibujo
canvas.onmousedown = (e) => {
  drawing = true;
  startX = e.offsetX;
  startY = e.offsetY;
  if (tool === "brush" || tool === "eraser") {
    ctx.beginPath();
    ctx.moveTo(startX, startY);
  }
};

canvas.onmousemove = (e) => {
  if (!drawing) return;
  if (tool === "brush") {
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
  } else if (tool === "eraser") {
    ctx.strokeStyle = "white";
    ctx.lineWidth = 10;
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
  }
};

canvas.onmouseup = (e) => {
  drawing = false;
  if (tool === "line") {
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
  } else if (tool === "rectangle") {
    let w = e.offsetX - startX;
    let h = e.offsetY - startY;
    ctx.strokeRect(startX, startY, w, h);
  } else if (tool === "circle") {
    let r = Math.sqrt(Math.pow(e.offsetX - startX, 2) + Math.pow(e.offsetY - startY, 2));
    ctx.beginPath();
    ctx.arc(startX, startY, r, 0, 2 * Math.PI);
    ctx.stroke();
  }
};

