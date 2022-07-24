// "use strict"
const song = [
  {
    name: "Cradle MP.3",
  },
  {
    name: "Shape Of You MP.3",
  },
  {
    name: "My Last Made MP.3",
  },
  {
    name: "Hate Me MP.3",
  },
  {
    name: "Joker MP.3",
  },
  {
    name: "Sugar MP.3",
  },
  {
    name: "Stay Alive MP.3",
  },
];
let checkAddVolume = false;
let fav = document.getElementById("fav");
let volumeDisplay = document.getElementById("volumeDisplay");
let volumePlayer = document.getElementById("volume");
let volumeControl = document.getElementById("volumeControl");
let expendOrDisable = document.getElementById("expendOrDisable");
let upDown = document.getElementById("upDown");
let download = document.getElementById("download");
// to displau or hide volume opction.
const inc = () => {
  const displayVolume = () => {
    checkAddVolume = true;
    volumePlayer.style.display = "flex";
    volumeDisplay.style.color = "red";
    volumeDisplay.style.color = "red";
    expendOrDisable.style.height = "0px";
    download.style.zIndex = "-1";
  };
  const disableVolume = () => {
    checkAddVolume = false;
    volumePlayer.style.display = "none";
    volumeDisplay.style.color = "white";
    download.style.zIndex = "1";
  };
  checkAddVolume ? disableVolume() : displayVolume();
};
// to manage volume
const decreseFull = () => {
  volumeControl.value = volumeControl.value - 10;
  music.volume = volumeControl.value / 100;
};
const increaseFull = () => {
  if (volumeControl.value < 100) {
    volumeControl.value = volumeControl.value + 10;
    music.volume = volumeControl.value / 100;
  } else {
    null;
  }
};
let songIndex = 1;
let music = new Audio(`audio/${songIndex}.mp3`);
volumeControl.addEventListener("change", () => {
  let setMusic = document.getElementById("volumeControl");
  music.volume = setMusic.value / 100;
});
// this is to show content
let defult = true;
const showcontentNow = () => {
  const show = () => {
    expendOrDisable.style.height = "375px";
    defult = false;
    upDown.classList.remove("fa-angle-down");
    upDown.classList.add("fa-angle-up");
    volumePlayer.style.display = "none";
  };
  const hide = () => {
    defult = true;
    expendOrDisable.style.height = "0px";
    upDown.classList.remove("fa-angle-up");
    upDown.classList.add("fa-angle-down");
  };
  defult ? show() : hide();
};

// Play sound part
let playpauseTrack = document.getElementById("playpauseTrack");
let mainRange = document.getElementById("mainRange");
let songItems = Array.from(document.getElementsByClassName("songItems"));
playpauseTrack.addEventListener("click", () => {
  if (music.pause && music.currentTime <= 0) {
    music.play();
    playpauseTrack.classList.remove("fa-play-circle");
    playpauseTrack.classList.add("fa-pause-circle");
    music.volume = volumeControl.value / 100;

    newArr[songIndex - 1].classList.remove("fa-play-circle");
    newArr[songIndex - 1].classList.add("fa-pause-circle");
  } else {
    music.pause();
    music.currentTime = 0;
    playpauseTrack.classList.remove("fa-pause-circle");
    playpauseTrack.classList.add("fa-play-circle");
    stop();
  }
});

music.addEventListener("timeupdate", () => {
  // Update Seekbar
  progress = parseInt((music.currentTime / music.duration) * 100);
  mainRange.value = progress;

  let totalDuraction = parseInt(music.duration);

  const min = Math.floor(totalDuraction / 60);
  const sec = totalDuraction % 60;
  function mintSec(num) {
    return num.toString().padStart(2, "0");
  }
  const result = `${mintSec(min)}:${mintSec(sec)}`;
  document.getElementById("total_time").innerText = result;

  // curent time
  let curentTime = parseInt(music.currentTime);
  const curentMin = Math.floor(curentTime / 60);
  const curentSec = curentTime % 60;
  function curmintSec(num) {
    return num.toString().padStart(2, "0");
  }

  const curentresult = `${parseInt(mintSec(curentMin))}:${mintSec(curentSec)}`;
  document.getElementById("curent_time").innerText = curentresult;
});

mainRange.addEventListener("change", () => {
  music.currentTime = (mainRange.value * music.duration) / 100;
});

// Minuplate song title
songItems.forEach((elemt, i) => {
  elemt.getElementsByTagName("span")[0].innerHTML = song[i].name;
});

// to make all plays
const makeAllPlays = () => {
  Array.from(document.getElementsByClassName("playItem")).forEach((element) => {
    element.classList.remove("fa-pause-circle");
    element.classList.add("fa-play-circle");
  });
};
// this is for title

let title = (document.querySelector(".title").innerHTML = song[0].name);
document.getElementById("downloadtitle").download = `${title}`;
document.getElementById("downloadtitle").href = "audio/1.mp3";

const titleOfSong = (name) => {
  
  let newSongName = (document.querySelector(".title").innerHTML =
    song[name].name);
  document.getElementById("downloadtitle").download = `${newSongName}`;
  document.getElementById("downloadtitle").href = `audio/${name + 1}.mp3`;
};
// dynamic song paths
let setNew = true;
let newArr = Array.from(document.getElementsByClassName("playItem"));
newArr.forEach((element, index) => {
  element.addEventListener("click", (e) => {
    makeAllPlays();
    if (setNew) {
      setNew = false;
      e.target.classList.remove("fa-play-circle");
      e.target.classList.add("fa-pause-circle");
      titleOfSong(index);
      music.src = `audio/${index + 1}.mp3`;
      music.play();
      playpauseTrack.classList.remove("fa-play-circle");
      playpauseTrack.classList.add("fa-pause-circle");
    } else {
      setNew = true;
      music.pause();
      e.target.classList.remove("fa-pause-circle");
      e.target.classList.add("fa-play-circle");
      mainRange.value = 0;
      playpauseTrack.classList.remove("fa-pause-circle");
      playpauseTrack.classList.add("fa-play-circle");
    }
  });
});
// next track
const nextTrack = () => {
  ++songIndex;
  songIndex > song.length
    ? (songIndex = songIndex - 1)
    : (songIndex = songIndex);
  if (songIndex <= song.length && songIndex >= 1) {
    music.src = `audio/${songIndex}.mp3`;
    music.play();
    document.querySelector(".title").innerText = song[songIndex - 1].name;
    playpauseTrack.classList.remove("fa-play-circle");
    playpauseTrack.classList.add("fa-pause-circle");

    for (let i = 0; i < song.length; i++) {
      if (songIndex - 1 === i) {
        newArr[i].classList.remove("fa-play-circle");
        newArr[i].classList.add("fa-pause-circle");
      } else {
        newArr[i].classList.remove("fa-pause-circle");
        newArr[i].classList.add("fa-play-circle");
      }
    }
  } else {
    null;
  }
};
const prevTrack = () => {
  --songIndex;
  songIndex < 1 ? (songIndex = 1) : (songIndex = songIndex);
  if (songIndex >= 1) {
    music.src = `audio/${songIndex}.mp3`;
    music.play();
   
    document.querySelector(".title").innerText = song[songIndex - 1].name;
    playpauseTrack.classList.remove("fa-play-circle");
    playpauseTrack.classList.add("fa-pause-circle");
    for (let i = 0; i < song.length; i++) {
      if (songIndex - 1 === i) {
        newArr[i].classList.remove("fa-play-circle");
        newArr[i].classList.add("fa-pause-circle");
      } else {
        newArr[i].classList.remove("fa-pause-circle");
        newArr[i].classList.add("fa-play-circle");
      }
    }
  } else {
    null;
  }
};

// loop of song
const repeatTrack = (condtion) => {
  if (condtion === true) {
    
    document.getElementById("close").style.display = "none";
    document.getElementById("open").style.display = "flex";
    const conditionChecking=() => {
      
      if (music.currentTime <= 0) {
        null;
      } else {
        if (music.currentTime === music.duration) {
          music.play();
        } 
        else {
          null;
        }
      }
    }
    setInterval(conditionChecking, 1000);
   
  } 
  else if(condtion === false) {
    document.getElementById("close").style.display = "flex";
    document.getElementById("open").style.display = "none";
   
    
  }
};