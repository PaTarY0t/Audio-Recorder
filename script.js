let PaTarY0t;
let PaTarY0tChunks = [];

const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");
const audioPlayback = document.getElementById("audioPlayback");

startBtn.addEventListener("click", async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

    PaTarY0t = new MediaRecorder(stream);
    PaTarY0tChunks = [];

    PaTarY0t.ondataavailable = (event) => {
      PaTarY0tChunks.push(event.data);
    };

    PaTarY0t.onstop = () => {
      const audioBlob = new Blob(PaTarY0tChunks, { type: "audio/mp3" });
      const audioUrl = URL.createObjectURL(audioBlob);
      audioPlayback.src = audioUrl;

      const a = document.createElement("a");
      a.href = audioUrl;
      a.download = "PaTarY0t.mp3"; //recording.mp3
      a.click();
    };

    PaTarY0t.start();
    startBtn.disabled = true;
    stopBtn.disabled = false;
  } catch (err) {
    alert("Failed to access microphone: " + err);
  }
});

stopBtn.addEventListener("click", () => {
  PaTarY0t.stop();
  startBtn.disabled = false;
  stopBtn.disabled = true;
});
