const cafeList = document.querySelector('#cafe-list');
const form = document.querySelector('#add-cafe-form');

function renderCafe(doc){
    let li = document.createElement('li');
    let name = document.createElement('span');
    let lname = document.createElement('span');
    let Gender = document.createElement('span');
    let Doctor = document.createElement('span');
    let Specialty = document.createElement('span');
    let email = document.createElement('span');
    let message = document.createElement('span');
    let tel = document.createElement('span');
    let cross = document.createElement('div');

    li.setAttribute('data-id', doc.id);
    name.textContent = doc.data().name;
    lname.textContent = doc.data().lname;
    Gender.textContent = doc.data().Gender;
    Doctor.textContent = doc.data().Doctor;
    Specialty.textContent = doc.data().Specialty;
    email.textContent = doc.data().email;
    message.textContent = doc.data().message;
    tel.textContent = doc.data().tel;
    cross.textContent = 'x';

    li.appendChild(name);
    li.appendChild(lname);
    li.appendChild(Gender);
    li.appendChild(Doctor);
    li.appendChild(Specialty);
    li.appendChild(email);
    li.appendChild(message);
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
    db.collection('Patient').add({
        name: form.name.value,
        lname: form.lname.value,
        Gender: form.Gender.value,
        Doctor: form.Doctor.value,
        Specialty: form.Specialty.value,
        email: form.email.value,
        message: form.message.value,
        tel: form.tel.value,
    });
    form.name.value = '';
    form.Gender.value = '';
    form.Doctor.value = '';
    form.Specialty.value = '';
    form.email.value = '';
    form.message.value = '';
    form.tel.value = '';
});

db.collection('Patient').orderBy('email').onSnapshot(snapshot => {
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

