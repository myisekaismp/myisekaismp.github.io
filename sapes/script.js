const inputSapes = document.getElementById('sapes');
const divHumanes = document.getElementById('humanes');
const mainElement = document.querySelector('main');

// DICIONÁRIO: "Sapês": "Português"
const dicionarioSapes = {
    "wawo": "tudo bem",
    "wi-wi!": "com certeza",
    "wawi bibi": "até logo",
    "uaiuow": "aprenderam agora",
    "wowibo": "não ligo",
    "wi i wo": "mais ou menos",
    "wi-wo": "tanto faz",
    "aw wo": "ah não",
    "wa-bi": "amanhã", // Colocado antes de 'wa' para não dar conflito
    "wa-bo": "ontem",
    "wa-a": "hoje",
    "wa": "oi",
    "wi": "sim",
    "wo": "não",
    "wai": "por que",
    "wobiwobi": "obrigado",
    "i": "e",
    "a": "a",
    "bai": "tchau",
    "web": "eu",
    "webe": "você",
    "we": "nós",
    "wewe": "eles",
    "wawe": "querer",
    "wowo": "fazer",
    "wiwi": "ir",
    "wawa": "falar",
    "wawu": "gostar",
    "waia": "entender",
    "uai": "ué",
    "wo-wo-wo": "calma",
    "wai-wai": "socorro",
    "webiwebi": "CCDQTL",
    "webbet": "sapês"
};

function renderizarAccordionTermos() {
    if (!mainElement) {
        return;
    }

    const accordion = document.createElement('details');
    accordion.id = 'termos-accordion';
    accordion.open = true;

    const summary = document.createElement('summary');
    summary.textContent = 'Termos de Sapês';
    accordion.appendChild(summary);

    const listaContainer = document.createElement('div');
    listaContainer.className = 'termos-lista';

    const termosOrdenados = Object.entries(dicionarioSapes).sort((a, b) =>
        a[1].localeCompare(b[1], 'pt-BR')
    );

    termosOrdenados.forEach(([sapes, portugues]) => {
        const item = document.createElement('p');
        item.className = 'termo-item';
        item.textContent = `${portugues}: ${sapes}`;
        listaContainer.appendChild(item);
    });

    accordion.appendChild(listaContainer);
    mainElement.appendChild(accordion);
}

renderizarAccordionTermos();

inputSapes.addEventListener('input', () => {
    let textoOriginal = inputSapes.value;
    let textoTraduzido = textoOriginal;

    const termos = Object.keys(dicionarioSapes).sort((a, b) => b.length - a.length);

    termos.forEach(sape => {
        const termoEscapado = sape.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
        const regex = new RegExp(`\\b${termoEscapado}\\b`, 'gi');
        textoTraduzido = textoTraduzido.replace(regex, dicionarioSapes[sape]);
    });

    divHumanes.innerText = textoTraduzido;
});