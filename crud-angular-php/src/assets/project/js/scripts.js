function setMask() {

    var date = new Date();

    $(function () {
        $('#salary').maskMoney({
            thousands: '',
            decimal: '.',
            precision: 2,
            allowZero: true,
            allowNegative: false,
            allowEmpty: false
        });


        date.setFullYear(date.getFullYear() - 18),

            $('#birthday').datetimepicker({
                format: "MM/DD/YYYY"
            });

        $('#birthday').val(date);

        $('#birthday').data("DateTimePicker").maxDate(date);
    });
}

function showModal(id) {
    $(`${id}`).modal('show');
}

function closeModal(id) {
    $(`${id}`).modal('toggle');
}

function setPagination(data) {
    $('#tablePeople').DataTable({
        "data": data
    });
}