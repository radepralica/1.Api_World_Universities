'use strict';

const btnPretrazi = document.getElementById('pretrazi');
const inpPretrazi = document.getElementById('inpPretrazi');
let divContainer = document.getElementById('divCont');
const secClear = document.getElementById('secClear');
const renderDiv = function (data) {
  for (let i = 0; i < data.length; i++) {
    const divEl = document.createElement('div');
    divEl.setAttribute('class', 'col-4');

    divEl.innerHTML = `
<div class=" bg-success rounded">

                    <h3 class="h2 text-white">${data[i].country}</h3>
                    <label for="" class="form-label">Domeni</label>
                    <p class="form-control">${data[i].domains}</p>
                    <label for="" class="form-label">Naziv:</label>
                    <p class="form-control">${data[i].name}</p>
                    <label for="" class="form-label">Web:</label>
                    <p class="form-control text-wrap"><a class="text-wrap" style="width: 4rem" style="width: 4rem" href="${data[i].web_pages}">${data[i].web_pages}</a></p>
                </div>
<br>
<div class="container bg-warning">
                 .
</div>
<br>
`;
    divContainer.appendChild(divEl);
  }
};

async function universyties(drzava) {
  await fetch(`http://universities.hipolabs.com/search?country=${drzava}`)
    .then(res => res.json())
    .then(data => {
      document.getElementById('ukupno').innerHTML =
        'Ukupno: ' + data.length + ' Univerzitet(a)';
      return renderDiv(data);
    });
}

btnPretrazi.addEventListener('click', enterData);
inpPretrazi.addEventListener('keyup', function (e) {
  e.preventDefault();
  if (e.key === 'Enter') {
    enterData();
  }
});

function enterData() {
  if (inpPretrazi.value === '') {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Upišite ili odaberite državu !',
    });
    return;
  }
  divContainer.innerHTML = '';
  universyties(inpPretrazi.value);
  inpPretrazi.value = '';
  inpPretrazi.focus();
}
