// https://api.lyrics.ovh/suggest/nirvana

//i have to bring my elements
const inputSearch = document.querySelector(".input_search");
const btnSearch = document.querySelector(".btn_search");
const result = document.querySelector(".results");

btnSearch.addEventListener("click", function () {
  console.log("i am clicked");
  fetchAPI();

  result.innerHTML = "";
});

async function fetchAPI() {
  const req = await fetch(
    `https://api.lyrics.ovh/suggest/${inputSearch.value}`
  );
  const res = await req.json();
  displayData(res.data);
  //console.log(res.data);
}

function displayData(songs) {
  const allElements = document.createElement("ul");
  songs.forEach((song) => {
    const elementLi = document.createElement("li");
    const elementA = document.createElement("a");
    const lyricButton = document.createElement("button");
    elementA.innerHTML = `${song.title}`;
    lyricButton.innerText = "See the lyrics";
    elementLi.appendChild(elementA);
    elementLi.appendChild(lyricButton);
    allElements.appendChild(elementLi);
    result.appendChild(allElements);

    lyricButton.addEventListener("click", function () {
      getlyrics(song.title, song.artist.name);
    });
  });
}

async function getlyrics(nameOfTheSong, artist) {
  const req = await fetch(
    `https://api.lyrics.ovh/v1/${artist}/${nameOfTheSong}`
  );
  const res = await req.json();
  result.innerHTML = "";
  result.innerText = res.lyrics;
}
