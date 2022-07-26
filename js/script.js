
const studentList = document.querySelector('.student-list');
const linkList = document.querySelector('.link-list');
const pageHeader = document.querySelector('.header');


let searchBar = `
  <label for="search" class="student-search">
    <span>Search by name</span>
    <input id="search" placeholder="Search by name...">
    <button type="button" class="search-button"><img src="img/icn-search.svg" alt="Search icon"></button>
  </label>
`;
pageHeader.insertAdjacentHTML('beforeend', searchBar);


function showPage(list, page) {
  const startIndex = (page * 9) - 9;
  const endIndex = page * 9;
  studentList.innerHTML = '';

  for ( let i = 0; i < list.length; i++ ) {
    if ( i >= startIndex && i < endIndex ) {
      let studentProfile = `
        <li class="student-item cf">
          <div class="student-details">
            <img class="avatar" src="${list[i].picture.thumbnail}" alt="${list[i].name}'s Profile Picture">
            <h3>${list[i].name.first} ${list[i].name.last}</h3>
            <span class="email">${list[i].email}</span>
          </div>
          <div class="joined-details">
            <span class="date">Joined ${list[i].registered.date}</span>
          </div>
        </li>
      `;

      studentList.insertAdjacentHTML('beforeend', studentProfile);
    }
  }
}


function addPagination(list) {
  let pagesLength = Math.ceil(list.length / 9);
  linkList.innerHTML = '';

  for ( let i = 1; i <= pagesLength; i++ ) {
    let pageCode = `
      <li>
        <button type="button">${i}</button>
      </li>
    `;

    linkList.insertAdjacentHTML('beforeend', pageCode);
  }

  let pageOne = linkList.firstElementChild;

  if (pageOne) {
    pageOne.firstElementChild.classList.add('active');
  } else {
      studentList.innerHTML = `<li>There are no profiles matching your search</li>`;
  }

  linkList.addEventListener('click', (e) => {
    const targetPage = e.target;

    if (targetPage.tagName === 'BUTTON') {
      let activePage = document.querySelector('.active');
      activePage.classList.remove('active');
      targetPage.classList.add('active');
      showPage(list, targetPage.textContent);
    }
  });
}

const userSearch = document.getElementById('search');

const searchProfiles = (searchValue, studentList) => {
  let namesArr = [];

  for ( let i = 0; i < studentList.length; i++ ) {
    if ( studentList[i].name.first.toUpperCase().includes(searchValue) || studentList[i].name.last.toUpperCase().includes(searchValue) ) {
      namesArr.push(studentList[i]);
    }
  }
    showPage(namesArr,1);
    addPagination(namesArr);
};


userSearch.addEventListener('keyup', (e) => {
  let searchInput = e.target.value.toUpperCase();
  searchProfiles(searchInput, data);
});


showPage(data, 1);
addPagination(data);
