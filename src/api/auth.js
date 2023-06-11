
// save user in database(mongodb)
export const saveUserInDd = user => {
    const currentUser = {
        email: user.email,
        name: user.displayName,
        photoURL: user.photoURL,
    }
    fetch(`http://localhost:5000/users/${user?.email}`, {
        method: 'PUT',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(currentUser)
    }).then(res => res.json()).then(data => console.log(data));
}


const token = localStorage.getItem('access-token');

export const saveClassesInDd = (item, email) => {
  const selectedList = {
    className: item.className,
    name: item.name,
    seats: item.seats,
    price: item.price,
    instructorEmail: item.email,
    email: email,
  };

  const queryString = new URLSearchParams(selectedList).toString();

  fetch(`http://localhost:5000/selectedClass?${queryString}`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      authorization: `bearer ${token}`,
    },
    body: JSON.stringify(selectedList),
  })
    .then((res) => res.json())
    .then((data) => console.log(data));
};
