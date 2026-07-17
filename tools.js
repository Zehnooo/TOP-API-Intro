const   key = '01mHy4bGKtEe6m74xG5NYKdgGaUutWXh',
        baseUrl = 'https://api.giphy.com/v1/gifs/translate';

let inputDelay = null;

export function getUserInput() {
    const input = document.querySelector('input');
    const button = document.querySelector('button');
    const val = input.value.trim();
    if (val === ''){
        button.disabled = true;
        return undefined;
    } else {
        button.disabled = false;
        return val;
    }
}

export async function findGif(refresh = false){
    try {
        const val = getUserInput();

        if (val === undefined) {
            clearGif();
            document.querySelector('figure').className = 'hide';
            if (inputDelay !== null){
                clearTimeout(inputDelay);
                inputDelay = null;
            }
        } else {
            if (inputDelay !== null) {
                clearTimeout(inputDelay);
            }

            if (refresh === true) {
                await loadGif(val);
                document.querySelector('figure').className = '';
            }
            else if (refresh === false) {
                inputDelay = setTimeout(async () => {
                    inputDelay = null;
                    await loadGif(val);
                    document.querySelector('figure').className = '';
                }, 1000);
            }
        }

    } catch (err) {
        console.error(err);
    }
}

async function loadGif(val){
    if (val === undefined) {return;}
    const url = `${baseUrl}?api_key=${key}&s='${String(val)}'`;
    const res = await fetch(url);
    if (!res.ok) {
        console.error(`HTTP ${res.status}`);
        return;
    }
    const data = await res.json();
    updateGif(data.data.images.original.url);
}

export function updateGif(newGif) {
    document.querySelector('#gif-slot').src = newGif;
}

function clearGif() {
    document.querySelector('#gif-slot').removeAttribute('src');
}