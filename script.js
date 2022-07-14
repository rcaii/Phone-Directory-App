/* ~~~~~~~~~~~~~~~~~~~~~~~~ Model ~~~~~~~~~~~~~~~~~~~~~~~~ */
const data = [];

/* ~~~~~~~~~~~~~~~~~~~~~~~~ View ~~~~~~~~~~~~~~~~~~~~~~~~ */
const View = (() => {
  const createTmp = (arr) => {
    for (var i = 0; i < arr.length; i++) {
      var tr = document.createElement('tr');
      tbody.appendChild(tr);
      for (var k in arr[i]) {
        var td = document.createElement('td');
        td.innerHTML = arr[i][k];
        tr.appendChild(td);
      }
    }
  };

  const errorMessage = (func, state, index) => {
    switch (func) {
      case 'add':
        if (state === 'error') {
          document.getElementById('error' + index).style.display = 'block';
        } else {
          document.getElementById('error' + index).style.display = 'none';
        }
        break;
      case 'search':
        if (state === 'error') {
          document.getElementById('noResult').style.display = 'block';
        } else {
          document.getElementById('noResult').style.display = 'none';
        }
        break;
    }
  };

  return {
    createTmp,
    errorMessage,
  };
})();

/* ~~~~~~~~~~~~~~~~~~~~~~~~ Controller ~~~~~~~~~~~~~~~~~~~~~~~~ */
const Controller = ((view) => {
  /* -------------------------------------------- */
  /* ----- Function 1: Add Contract Feature ----- */
  /* -------------------------------------------- */
  const addData = () => {
    var tbody = document.querySelector('tbody');
    tbody.innerHTML = '';
    var name = document.getElementById('name').value;
    var mobile = document.getElementById('mobile').value;
    var email = document.getElementById('email').value;

    // All Error Message, else situation with no error message
    // Error Message Cleaning
    (() => {
      for (let i = 1; i < 8; i++) {
        view.errorMessage('add', 'noError', i);
      }
    })();

    if (!name || !mobile || !email) {
      view.errorMessage('add', 'error', 1);
    } else if (!/^[A-Za-z ]+$/.test(name)) {
      view.errorMessage('add', 'error', 2);
    } else if (name.length > 20) {
      view.errorMessage('add', 'error', 3);
    } else if (!(mobile.length === 10)) {
      view.errorMessage('add', 'error', 4);
    } else if (!/^[0-9]+$/.test(mobile)) {
      view.errorMessage('add', 'error', 5);
    } else if (email.indexOf('@') < 0) {
      view.errorMessage('add', 'error', 6);
    } else if (email.length > 39) {
      view.errorMessage('add', 'error', 7);
    } else {
      var obj = {
        name: name,
        mobile: mobile,
        email: email,
      };
      data.push(obj);
    }

    view.createTmp(data);

    // empty the input box value
    document.getElementById('name').value = '';
    document.getElementById('mobile').value = '';
    document.getElementById('email').value = '';
  };

  /* -------------------------------------------- */
  /* ----- Function 2: Mobile Filter Search ----- */
  /* -------------------------------------------- */
  const mobileSearch = (e) => {
    const search = document.getElementById('search').value;
    const tbody = document.querySelector('tbody');
    tbody.innerHTML = '';

    // error cleaning
    view.errorMessage('search', 'noError');
    // contains value
    if (search) {
      let _arr = [];
      for (var i = 0; i < data.length; i++) {
        if (data[i].mobile.indexOf(search) >= 0) {
          _arr.push(data[i]);
        }
      }
      // No Result Found
      if (_arr.length == 0) {
        view.errorMessage('search', 'error');
      }
      view.createTmp(_arr);
    } else {
      view.createTmp(data);
    }
  };

  /* -------------------------------------------- */
  /* ----- Function 3: TwoWay Table Sorting ----- */
  /* -------------------------------------------- */
  const sortTable = (n) => {
    const table = document.getElementById('summaryTable');

    let rows,
      switching,
      i,
      x,
      y,
      shouldSwitch,
      dir,
      switchcount = 0;

    switching = true;
    dir = 'asc';

    while (switching) {
      switching = false;
      rows = table.rows;
      // loop through all rows (skipping the header row)
      for (i = 1; i < rows.length - 1; i++) {
        //No switching at the beginning
        shouldSwitch = false;
        // get comparing elements
        x = rows[i].getElementsByTagName('td')[n];
        y = rows[i + 1].getElementsByTagName('td')[n];
        // asc and desc conditions for switching
        if (dir == 'asc') {
          if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
            shouldSwitch = true;
            break;
          }
        } else if (dir == 'desc') {
          if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
            shouldSwitch = true;
            break;
          }
        }
      }
      // switch and continue the loop
      if (shouldSwitch) {
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
        //Each time a switch is done, increase this count by 1:
        switchcount++;
      } else {
        // set desc and loop again
        if (switchcount == 0 && dir == 'asc') {
          dir = 'desc';
          switching = true;
        }
      }
    }
  };

  return {
    addData,
    mobileSearch,
    sortTable,
  };
})(View);
