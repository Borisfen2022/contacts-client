const fetchContacts = async () => {
  const response = await fetch(
    'https://contacts-api-learn.herokuapp.com/api/contacts'
  );
  return response.json();
};

const sendNewContact = async (params) => {
  const response = await fetch(
    'https://contacts-api-learn.herokuapp.com/api/contacts',
    {
      method: 'post',
      body: params,
    }
  );
  return response.json();
};

const addNewContactToContacts = (cont) => {
  const contact = document.createElement('li');
  contact.classList.add('contact');
  contact.innerHTML = `<h2 class='contact__title'>
      ${cont.name}
    </h2>
    <a href=${cont.number}>${cont.number}</a>
    `;
  const contactsList = document.querySelector('.contacts');
  contactsList.appendChild(contact);
};

const renderAllContacts = async () => {
  const response = await fetchContacts();
  const contacts = Object.values(response);

  contacts.forEach((contact) => {
    addNewContactToContacts(contact);
  });
};

const handleNewContact = async () => {
  const name = document.querySelector('.input__input[name="name"]');
  const phone = document.querySelector('.input__input[name="number"]');
  const submitBtn = document.querySelector('button[type="submit"]');

  const messages = document.querySelectorAll('.input__message');
  name.addEventListener('input', (e) => {
    const { value } = e.target;
    if (value.length < 4 || value.length > 20) {
      console.log(messages);
      messages[0].innerText =
        'Name length must be longer then 4 and shorter then 20 ';
    } else {
      messages[0].innerText = '';
    }
  });
  phone.addEventListener('input', (e) => {
    const { value } = e.target;
    if (value.length < 12 || value.length > 20) {
      console.log(messages);
      messages[1].innerText =
        'Number length must be longer then 12 and shorter then 20 ';
    } else {
      messages[1].innerText = '';
    }
  });

  submitBtn.addEventListener('click', (e) => {
    e.preventDefault();

    if (
      name.value.length < 4 ||
      name.value.length > 20 ||
      phone.value.length < 12 ||
      phone.value.length > 20
    ) {
      alert('Wrong data!');
    } else {
      const params = new FormData();
      params.append('name', name.value);
      params.append('number', phone.value);

      sendNewContact(params);

      const newContact = {
        name: name.value,
        number: phone.value,
      };
      addNewContactToContacts(newContact);
      const form = document.querySelector('.form');
      if (form) form.reset();
    }
  });
};

document.addEventListener('DOMContentLoaded', async function (event) {
  await renderAllContacts();
  await handleNewContact();
});
