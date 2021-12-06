const cafeList = document.querySelector('#cafe-list');
const form = document.querySeleDctor('#add-cafe-form');
//
function renderCafe(doc){
    let li = document.createElement('li');
    let name = document.createElement('spanDD
    let city = document.createElement('span');
    let tel = document.createElement('span');
    let cross = document.createElement('div');

    li.setAttribute('data-id', doc.id);
    name.textContent = doc.data().name;
    city.textContent = doc.data().city;
    tel.textContent = doc.data().tel;
    // cross.textContent = 'x';

    li.appendChild(name);
    li.appendChild(city);
    li.appendChild(tel);
    li.appendChild(cross);

    cafeList.appendChild(li);

    cross.addEventListener('click', (e) => {
        e.stopPropagation();
        let id = e.target.parentElement.getAttribute('data-id');
        db.collection('docts').doc(id).delete();
    });
}


form.addEventListener('submit', (e) => {
    e.preventDefault();
    db.collection('News').add({ 
        name: form.name.value,
        city: form.city.value,
        tel: form.tel.value,
    });
    form.name.value = '';
    form.city.value = '';
    form.tel.value = '';
});

db.collection('News').orderBy('city').onSnapshot(snapshot => {
    let changes = snapshot.docChanges();
    changes.forEach(change => {
        console.log(change.doc.data());
        if(change.type == 'added'){
            renderCafe(change.doc);
        } else if (change.type == 'removed'){
            let li = cafeList.querySelector('[data-id=' + change.doc.id + ']');
            cafeList.removeChild(li);
        }
    });
});

