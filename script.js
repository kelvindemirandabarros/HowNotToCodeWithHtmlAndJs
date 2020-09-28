async function getUfs () {
    console.log( 'Função \'getUfs\'.' );
    
    // Wrong Way Section
    const statesWWS = document.getElementById( 'statesWWS' );
    const citiesWWS = document.getElementById( 'citiesWWS' );

    // Right Way Section
    const statesRWS = document.getElementById( 'statesRWS' );
    const citiesRWS = document.getElementById( 'citiesRWS' );

    const states = await axios.get( 'https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome' )
        .then( res => res.data )
        .then( states => states )
        .catch( error => console.log( error ) );
        
    let options = '';
    for ( const state of states ) {
        options += `<option value='${ state.id }'>${ state.nome }</option>`;
    }
    
    statesWWS.innerHTML = '<option>Escolha um estado</option>' + options;
    statesRWS.innerHTML = '<option>Escolha um estado</option>' + options;

    statesWWS.disabled = false;
    statesRWS.disabled = false;
}

async function getCitiesWrongWay ( event ) {
    console.log( 'Função \'getCitiesWrongWay\'.' );

    const citiesWWS = document.getElementById( 'citiesWWS' );
    citiesWWS.disabled = true;

    const selectedIndex = event.target.selectedIndex;
    const selectedOption = event.target.options[ selectedIndex ];

    const uf = selectedOption.value;
    const cities = await axios.get( `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ uf }/municipios` )
        .then( res => res.data )
        .then( cities => cities )
        .catch( error => console.log( error ) );

    citiesWWS.innerHTML = '<option>Escolha uma cidade</option>';

    for ( const city of cities ) {
        citiesWWS.innerHTML += `<option value='${ city.nome }'>${ city.nome }</option>`;
    }

    citiesWWS.disabled = false;
}

document.getElementById( 'statesWWS' )
    .addEventListener( 'change', getCitiesWrongWay );


async function getCitiesRightWay ( event ) {
    console.log( 'Função \'getCitiesRightWay\'.' );

    const citiesRWS = document.getElementById( 'citiesRWS' );
    citiesRWS.disabled = true;

    const selectedIndex = event.target.selectedIndex;
    const selectedOption = event.target.options[ selectedIndex ];

    const uf = selectedOption.value;
    const cities = await axios.get( `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios` )
        .then( res => res.data )
        .then( cities => cities )
        .catch( error => console.log( error ) );
    
    let options = '<option>Escolha uma cidade</option>';

    for ( const city of cities ) {
        options += `<option value='${ city.nome }'>${ city.nome }</option>`;
    }

    citiesRWS.innerHTML = options;

    citiesRWS.disabled = false;
}

document.getElementById( 'statesRWS' )
    .addEventListener( 'change', getCitiesRightWay );
