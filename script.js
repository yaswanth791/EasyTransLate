const head_bottom = document.querySelector(".head-bottom");
const optionsRender1 = document.querySelector(".option-drop1");
const optionsRender2 = document.querySelector(".option-drop2");
const internet_popup = document.querySelector(".internet--Popup");
const popupWarn = document.querySelector(".internet--Popup--page");
const inputText = document.querySelector(".input");
const outputText = document.querySelector(".output");
const swap_btn = document.querySelector(".swap--btn");

for (let i = 0; i < 12; i++) {
  head_bottom.insertAdjacentHTML(
    "afterbegin",
    `<div class="color--style"></div>`
  );
}

/////////////////// Languages select //////////////////////
class LanguageFetch {
  #langs = [];
  srcLng;
  trgLng;
  constructor() {
    this._fetchLang();
  }

  async _fetchLang() {
    try {
      const url = "https://text-translator2.p.rapidapi.com/getLanguages";
      const options = {
        method: "GET",
        headers: {
          "X-RapidAPI-Key":
            "9a383f41abmsha124bd645bf2b54p1adc10jsn8fde1d04941a",
          "X-RapidAPI-Host": "text-translator2.p.rapidapi.com",
        },
      };
      const response = await fetch(url, options);
      const {
        data: { languages: jsonResponse },
      } = await response.json();
      this.#langs = [...jsonResponse];
      this._renderHTML();
      return;
    } catch (err) {
      console.log(popupWarn);
      popupWarn.style.display = "block";
    }
  }

  _generateHTML(lang) {
    return `<option>${lang}</option>`;
  }

  _renderHTML() {
    const htmlLang = this.#langs.map((ele) => {
      return this._generateHTML(ele.name);
    });
    htmlLang.forEach((ele) => {
      optionsRender1.insertAdjacentHTML("beforeend", ele);
      optionsRender2.insertAdjacentHTML("beforeend", ele);
    });
  }

  _convertToCode(code) {
    let lng;
    this.#langs.forEach((ele) => {
      if (ele.name.toLowerCase() === code.toLowerCase()) lng = ele.code;
    });
    return lng;
  }

  async translate(msg) {
    try {
      this.srcLng = this._convertToCode(optionsRender1.value);
      this.trgLng = this._convertToCode(optionsRender2.value);
      const url = "https://text-translator2.p.rapidapi.com/translate";
      const options = {
        method: "POST",
        headers: {
          "content-type": "application/x-www-form-urlencoded",
          "X-RapidAPI-Key":
            "9a383f41abmsha124bd645bf2b54p1adc10jsn8fde1d04941a",
          "X-RapidAPI-Host": "text-translator2.p.rapidapi.com",
        },
        body: new URLSearchParams({
          source_language: `${this.srcLng}`,
          target_language: `${this.trgLng}`,
          text: `${msg}`,
        }),
      };
      const langObj = await fetch(url, options);
      const jsonLangObj = await langObj.json();
      outputText.innerHTML = jsonLangObj.data.translatedText;
    } catch (err) {
      outputText.innerHTML = msg;
    }
  }
}
const obj = new LanguageFetch();
inputText.addEventListener("input", () => {
  obj.translate(inputText.value);
});

swap_btn.addEventListener("click", () => {
  const swap = optionsRender1.value;
  optionsRender1.value = optionsRender2.value;
  optionsRender2.value = swap;
  obj.translate(inputText.value);
});
