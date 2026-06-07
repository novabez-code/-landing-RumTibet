export function HTMLTravelCard(obj) {
  const html = `
      <li class="splide__slide travel__slide">
                    <img
                      class="travel__slide--img"
                      src="${obj.img}"
                      alt="${obj.name}"
                    />
                    <div class="travel__slide--rat">
                      <img
                        class="travel__slide--icon"
                        src="img/icon/star.svg"
                        alt="" 
                        aria-hidden="true"
                      />
                      <p class="travel__slide--rating">${obj.rating}</p>
                    </div>
                    <div class="travel__slide--content">
                      <div class="travel__slide--header">
                        <div class="travel__slide--title">
                          <h3 class="travel__slide--h3">${obj.name}</h3>
                          <p class="travel__slide--subtitle">   
                           ${obj.subtitle}
                          </p>
                        </div>
                        <p class="travel__slide--price">${obj.price}</p>
                      </div>
                      <p class="travel__slide--text">
                        ${obj.text}
                      </p>
                      <div class="travel__slide--btn">
                        <button type="button" class="btn" >Программа тура</button>
                      </div>
                    </div>
                  </li>
    `;

  return html;
}

export function HTMLJourneyCard(obj) {
  const html = `
   <li class="splide__slide journey__slide">
                    <img
                      class="journey__slide--img"
                      src="${obj.img}"
                      alt="${obj.name}"
                    />
                    <div class="journey__slide--content">
                      <a href="#" class="journey__slide--title"
                        >${obj.name}</a
                      >
                      <p class="journey__slide--text">
                       ${obj.text}
                      </p>
                      <div class="journey__slide--footer">
                        <p class="journey__slide--data">${obj.data}</p>
                        <a class="journey__slide--link" href="#" aria-label="Читать статью: ${obj.name}""
                          >читать статью</a
                        >
                      </div>
                    </div>
                  </li>
  `;

  return html;
}

export function renderCards(containerSelector, cardGenerator, dataArray) {
  const container = document.querySelector(containerSelector);
  if (!container) return;

  container.innerHTML = dataArray.map((item) => cardGenerator(item)).join("");
}

export const travelCardsData = [
  {
    img: "img/card_img_1.webp",
    name: "Озеро возле гор",
    rating: "4.9",
    subtitle: "романтическое приключение",
    price: "480 $",
    text: "Его корни уходят в один фрагмент классической латыни...",
  },
  {
    img: "img/card_img_2.webp",
    name: "Ночь в горах",
    rating: "4.9",
    subtitle: "в компании друзей",
    price: "500 $",
    text: "Его корни уходят в один фрагмент классической латыни...",
  },
  {
    img: "img/card_img_3.webp",
    name: "Йога в горах",
    rating: "4.9",
    subtitle: "для тех, кто заботится о себе",
    price: "230 $",
    text: "Его корни уходят в один фрагмент классической латыни...",
  },
];

export const journeyCardsData = [
  {
    img: "img/blog_img_1.webp",
    name: "Красивая Италия, какая она в реальности?",
    text: "Для современного мира базовый вектор развития...",
    data: "01/04/2023",
  },
  {
    img: "img/blog_img_2.webp",
    name: "Долой сомнения! Весь мир открыт для вас!",
    text: "Для современного мира базовый вектор развития...",
    data: "01/04/2023",
  },
  {
    img: "img/blog_img_3.webp",
    name: "Как подготовиться к путешествию в одиночку?",
    text: "Для современного мира базовый вектор развития...",
    data: "01/04/2023",
  },
  {
    img: "img/blog_img_4.webp",
    name: "Индия ... летим?",
    text: "Для современного мира базовый вектор развития...",
    data: "01/04/2023",
  },
];
