// fake database
const data = [];

/* ~~~~~~~~~~~~ Function 1: Add Contract Feature ~~~~~~~~~~~~ */
function addData() {
  var tbody = document.querySelector('tbody');
  tbody.innerHTML = '';
  var name = document.getElementById('name').value;
  var mobile = document.getElementById('mobile').value;
  var email = document.getElementById('email').value;

  // All Error Message, else situation with no error message
  // Error Message Cleaning
  (() => {
    document.getElementById('error1').style.display = 'none';
    document.getElementById('error2').style.display = 'none';
    document.getElementById('error3').style.display = 'none';
    document.getElementById('error4').style.display = 'none';
    document.getElementById('error5').style.display = 'none';
    document.getElementById('error6').style.display = 'none';
    document.getElementById('error7').style.display = 'none';
  })();

  if (!name || !mobile || !email) {
    document.getElementById('error1').style.display = 'block';
  } else if (!/^[A-Za-z ]+$/.test(name)) {
    document.getElementById('error2').style.display = 'block';
  } else if (name.length > 20) {
    document.getElementById('error3').style.display = 'block';
  } else if (!(mobile.length === 10)) {
    document.getElementById('error4').style.display = 'block';
  } else if (!/^[0-9]+$/.test(mobile)) {
    document.getElementById('error5').style.display = 'block';
  } else if (email.indexOf('@') < 0) {
    document.getElementById('error6').style.display = 'block';
  } else if (email.length > 39) {
    document.getElementById('error7').style.display = 'block';
  } else {
    var obj = {
      name: name,
      mobile: mobile,
      email: email,
    };
    data.push(obj);
  }

  // add updated database into tmp
  for (var i = 0; i < data.length; i++) {
    var tr = document.createElement('tr');
    tbody.appendChild(tr);
    for (var k in data[i]) {
      var td = document.createElement('td');
      td.innerHTML = data[i][k];
      tr.appendChild(td);
    }
  }

  // empty the input box value
  document.getElementById('name').value = '';
  document.getElementById('mobile').value = '';
  document.getElementById('email').value = '';
}

/* ~~~~~~~~~~~~ Function 2: Mobile Filter Bar ~~~~~~~~~~~~ */
const mobileInput = function (e) {
  const search = document.getElementById('search').value;
  const tbody = document.querySelector('tbody');
  tbody.innerHTML = '';

  document.getElementById('noResult').style.display = 'none';
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
      document.getElementById('noResult').style.display = 'block';
    }
    for (var i = 0; i < _arr.length; i++) {
      const tr = document.createElement('tr');
      tbody.appendChild(tr);
      for (var k in _arr[i]) {
        const td = document.createElement('td');
        td.innerHTML = _arr[i][k];
        tr.appendChild(td);
      }
    }
  } else {
    for (var i = 0; i < data.length; i++) {
      const tr = document.createElement('tr');
      tbody.appendChild(tr);
      for (var k in data[i]) {
        const td = document.createElement('td');
        td.innerHTML = data[i][k];
        tr.appendChild(td);
      }
    }
  }
};

/* ~~~~~~~~~~~~ Function 3: Add Contract Feature ~~~~~~~~~~~~ */
function sortTable(n) {
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
}
