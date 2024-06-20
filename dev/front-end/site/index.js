const sections = [
    {
        title: "Bebidas",
        items: [
            {
                name: "Coca-Cola",
                image: "https://oportorestaurante.com.br/site2/wp-content/uploads/2021/12/Coca-Cola_Lata_750x600px.png",
                description: "Diet 300ml - Diet 300ml - Diet 300ml - Diet 300ml",
                price: 5
            },
            {
                name: "Café Pelé",
                image: "https://uploads.metropoles.com/wp-content/uploads/2023/01/03150942/WhatsApp-Image-2023-01-03-at-15.09.13.jpeg",
                description: "Café Pelé é um café de alta qualidade, feito com grãos de café.",
                price: 2.3
            }
        ]
    },
    {
        title: "Lanches",
        items: [
            {
                name: "Hamburguer Gourmet",
                image: "https://static.itdg.com.br/images/auto-auto/0c1407131d1b50c786ddcd86f0496bf1/shutterstock-259773713.jpg",
                description: "Hamburgão top.",
                price: 32.14
            }
        ]
    },
];

// Exemplo de requisição back-end
// fetch("url", { method: 'GET' }).then((result) =>{

// })

const currencyFormater = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });

const renderItem = (rowDiv, item) => {
    const md4Div = document.createElement("div");
    md4Div.className = "col-md-4";

    const article = document.createElement("article");
    article.className = "card d-flex h-100";

    const img = document.createElement("img");
    img.src = item.image;
    img.alt = item.name;
    img.className = "card-img-top";
    article.appendChild(img);

    const cardBody = document.createElement("div");
    cardBody.className = "card-body d-flex flex-column justify-content-between";

    const titleDiv = document.createElement("div");
    titleDiv.className = "mb-3";

    const titleEl = document.createElement("h5");
    titleEl.textContent = item.name;
    titleDiv.appendChild(titleEl);

    const descriptionEl = document.createElement("p");
    descriptionEl.textContent = item.description;
    titleDiv.appendChild(descriptionEl);

    cardBody.appendChild(titleDiv);

    const priceDiv = document.createElement("div");

    const priceEl = document.createElement("p");
    priceEl.textContent = currencyFormater.format(item.price);
    priceDiv.appendChild(priceEl);

    const purchaseButton = document.createElement("a");
    purchaseButton.className = "btn btn-primary";
    purchaseButton.href = "#";
    purchaseButton.text = "Comprar";
    priceDiv.appendChild(purchaseButton);

    cardBody.appendChild(priceDiv);

    article.appendChild(cardBody);

    md4Div.appendChild(article);

    rowDiv.appendChild(md4Div);
}

const renderItems = (rowDiv, items) => {
    if (!items?.length) {
        const p = document.createElement("p");
        p.textContent = ":( Nenhum item adicionado ainda."
        rowDiv.appendChild(p);
        return;
    }

    items.map((item) => {
        renderItem(rowDiv, item);
    });
}

const renderSections = () => {
    const sectionsEl = document.getElementById("secoes");

    sections.map((currentSection) => {
        const sectionTitle = document.createElement("h2");
        sectionTitle.textContent = currentSection.title;
        sectionTitle.className = "mt-5";
        sectionsEl.appendChild(sectionTitle);

        const hr = document.createElement("hr");
        sectionsEl.appendChild(hr);

        const rowDiv = document.createElement("div");
        rowDiv.className = "row";
        renderItems(rowDiv, currentSection.items);
        sectionsEl.appendChild(rowDiv);
    });
}

renderSections();