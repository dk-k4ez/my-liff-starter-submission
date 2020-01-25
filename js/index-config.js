function muatData() {
    if (localStorage.list_data && localStorage.id_data) {
        list_data = JSON.parse(localStorage.getItem('list_data'));
        var data_app = "";
        if (list_data.length > 0) {
            data_app = '<table class="table table-striped table-dark">';
            data_app += '<thead>' +
                '<th>ID</th>' +
                '<th>Alamat URL</th>' +
                '<th>Lihat Data</th>' +
                '<th>Edit Data</th>' +
                '<th>Hapus Data</th>' +
                '</thead> <tbody>';

            for (i in list_data) {
                data_app += '<tr>';
                data_app +=
                    '<td>' + list_data[i].id_data + ' </td>' +
                    '<td>' + list_data[i].alamatUrl + ' </td>' +
                    '<td><a class="btn btn-danger btn-small" href="javascript:void(0)" onclick="lihatData(\'' + list_data[i].id_data + '\')">Lihat</a></td>' +
                    '<td><a class="btn btn-success btn-small" href="javascript:void(0)" onclick="editData(\'' + list_data[i].id_data + '\')">Edit</a></td>'+
                    '<td><a class="btn btn-warning btn-small" href="javascript:void(0)" onclick="hapusData(\'' + list_data[i].id_data + '\')">Hapus</a></td>';
                data_app += '</tr>';
            }

            data_app += '</tbody></table>';

        }
        else {
            data_app = "Data masih kosong nih";
        }


        $('#list-data').html(data_app);
        $('#list-data').hide();
        $('#list-data').fadeIn(100);
    }
}

function editData(id) {

    if (localStorage.list_data && localStorage.id_data) {
        list_data = JSON.parse(localStorage.getItem('list_data'));
        idx_data = 0;
        for (i in list_data) {
            if (list_data[i].id_data == id) {
                $("#eid_data").val(list_data[i].id_data);
                $("#ealamatUrl").val(list_data[i].alamatUrl);
                $("#eusername").val(list_data[i].username);
                $("#epassword").val(list_data[i].password);
                list_data.splice(idx_data, 1);
            }
            idx_data++;
        }
        gantiMenu('edit-data');

    }

}

function lihatData(id) {
    if (localStorage.list_data && localStorage.id_data) {
        list_data = JSON.parse(localStorage.getItem('list_data'));
        idx_data = 0;
        for (i in list_data) {
            if (list_data[i].id_data == id) {
                $("#lid_data").val(list_data[i].id_data);
                $("#lalamatUrl").val(list_data[i].alamatUrl);
                $("#lusername").val(list_data[i].username);
                $("#lpassword").val(list_data[i].password);
                list_data.splice(idx_data, 1);
            }
            idx_data++;
        }
        gantiMenu('lihat-data');

    }
}


function simpanData() {

    if (!liff.isInClient()) {
        sendAlertIfNotInClient();
    } else {
        liff.sendMessages([{
            'type': 'text',
            'text': "Data baru berhasil disimpan"
        }]).then(function() {
            alert('Data Tersimpan');
        }).catch(function(error) {
            alert('Aduh kok error ya...');
        });
    }

    alamatUrl = $('#alamatUrl').val();
    username = $('#username').val();
    password = $('#password').val();

    if (localStorage.list_data && localStorage.id_data) {
        list_data = JSON.parse(localStorage.getItem('list_data'));
        id_data = parseInt(localStorage.getItem('id_data'));
    }
    else {
        list_data = [];
        id_data = 0;
    }

    id_data++;
    list_data.push({ 'id_data': id_data, 'alamatUrl': alamatUrl, 'username': username, 'password': password });
    localStorage.setItem('list_data', JSON.stringify(list_data));
    localStorage.setItem('id_data', id_data);
    document.getElementById('form-data').reset();
    gantiMenu('list-data');

    return false;
}

function simpanEditData() {

    if (!liff.isInClient()) {
        sendAlertIfNotInClient();
    } else {
        liff.sendMessages([{
            'type': 'text',
            'text': "Data yang diedit sudah tersimpan"
        }]).then(function() {
            alert('Data tersimpan');
        }).catch(function(error) {
            alert('Aduh kok error ya...');
        });
    }

    id_data = $('#eid_data').val();
    alamatUrl = $('#ealamatUrl').val();
    username = $('#eusername').val();
    password = $('#epassword').val();

    list_data.push({ 'id_data': id_data, 'alamatUrl': alamatUrl, 'username': username, 'password': password });
    localStorage.setItem('list_data', JSON.stringify(list_data));
    document.getElementById('eform-data').reset();
    gantiMenu('list-data');

    return false;
}

function hapusData(id) {

    if (!liff.isInClient()) {
        sendAlertIfNotInClient();
    } else {
        liff.sendMessages([{
            'type': 'text',
            'text': "Data sudah terhapus"
        }]).then(function() {
            alert('Data sudah dihapus');
        }).catch(function(error) {
            alert('Aduh kok nggak bisa');
        });
    }

    if (localStorage.list_data && localStorage.id_data) {
        list_data = JSON.parse(localStorage.getItem('list_data'));

        idx_data = 0;
        for (i in list_data) {
            if (list_data[i].id_data == id) {
                list_data.splice(idx_data, 1);
            }
            idx_data++;
        }

        localStorage.setItem('list_data', JSON.stringify(list_data));
        muatData();
    }
}


function gantiMenu(menu) {
    if (menu == "list-data") {
        muatData();
        $('#tambah-data').hide();
        $('#list-data').fadeIn();
        $('#edit-data').hide();
        $('#lihat-data').hide();
    }
    else if (menu == "tambah-data") {
        $('#tambah-data').fadeIn();
        $('#list-data').hide();
        $('#edit-data').hide();
        $('#lihat-data').hide();
    } else if (menu == "edit-data") {
        $('#edit-data').fadeIn();
        $('#tambah-data').hide();
        $('#list-data').hide();
        $('#lihat-data').hide();
    } else if (menu == "lihat-data") {
        $('#lihat-data').fadeIn();
        $('#edit-data').hide();
        $('#tambah-data').hide();
        $('#list-data').hide();
    }
}

function showPassword()
    {
        if(document.getElementById("lpassword").value!="")
        {
            document.getElementById("lpassword").type="text";
            document.getElementById("show").style.display="none";
            document.getElementById("hide").style.display="block";
        }
    }

function hidePassword()
    {
        if(document.getElementById("lpassword").type == "text")
        {
            document.getElementById("lpassword").type="password"
            document.getElementById("show").style.display="block";
            document.getElementById("hide").style.display="none";
        }
    }