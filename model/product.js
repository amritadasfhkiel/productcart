var con=require("./DB_Connector");
con=con.dbConnection();

exports.add = function (params, socket) {

    con.query("INSERT into tbl_product SET ?",params, function (err, rows) {
        var added = false;
        var insertId = null;
        if (err != null) {
            console.log(err);
        } else {
            added = rows['affectedRows'] == 1;
            if(added) {
                insertId = rows['insertId'];
            }
        }

        socket.emit("product_add_response",{
            added: added,
            insertId : insertId
        });
    });

};
exports.update = function (params, socket) {

};
exports.delete = function (params, socket) {
    var deleted = false;

    con.query("DELETE FROM tbl_product  WHERE ?", params, function (err, rows) {
        if (err != null) {
            console.log(err);
        } else {
            deleted = rows['affectedRows'] == 1;

        }

        socket.emit("product_delete_response",{
            deleted: deleted,
            product_id: params.product_id
        });
    });
};
exports.getAll = function (callbackFunc) {

    con.query("SELECT * FROM tbl_product", function (err, rows) {
        if (err != null) {
            console.log(err);
        } else {
            callbackFunc(rows);

        }
    });
};
