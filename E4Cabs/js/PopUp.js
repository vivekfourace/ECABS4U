$(document).ready(function () {
            $('#popupBoxClose').click(function () {
                unloadPopupBox();
            });
        });
        function unloadPopupBox() {
            $('#popup_box').fadeOut("slow");
        }
        window.setInterval(function () {
            var fp = "560078";
            var tp = "560102";
            var source = {
                type: "GET",
                url: "http://115.115.159.126/ECabs/ECabs4U.asmx/GetData?FP1=" + fp + "&FP2=" + tp,
                data: {},
                datatype: "json",
                datafields: [
                    { name: 'DriverID', type: 'long' },
                    { name: 'DriverName', type: 'string' },
                    { name: 'Postcode', type: 'string' },
                    { name: 'MobileNumber', type: 'string' }
                ],
                cache: false,
                root: 'data',
                async: false
            };
            $('#jqxgrid').bind('bindingcomplete', function (){});            
            var dataAdapter = new $.jqx.dataAdapter(source, {
                contentType: 'application/json; charset=utf-8',
                downloadComplete: function (data, textStatus, jqXHR)
                {
                    return data.d;
                }
            });
            var cellsrenderer = function (row, column, value)
            {
                return '<div style="text-align: center;">' + value + '</div>';
            }
            var columnrenderer = function (value)
            {
                return '<div style="text-align: center;">' + value + '</div>';
            }
            $("#jqxgrid").jqxGrid({
                width: '500',
                source: dataAdapter,
                autoheight: true,
                theme: 'energyblue',
                pageable: true,                
                columns: [
                    { text: 'DriverID', dataField: 'DriverID', renderer: columnrenderer, cellsrenderer: cellsrenderer, width: 100, hidden: true },
                    { text: 'DriverName', dataField: 'DriverName', renderer: columnrenderer, cellsrenderer: cellsrenderer, width: 100 },
                    { text: 'Postcode', dataField: 'Postcode', renderer: columnrenderer, cellsrenderer: cellsrenderer, width: 100 },
                    { text: 'MobileNumber', dataField: 'MobileNumber', renderer: columnrenderer, cellsrenderer: cellsrenderer, width: 100 },
                    {
                        text: '', datafield: 'DriverID', columntype: 'button', renderer: columnrenderer, cellsrenderer: cellsrenderer, width: 100,
                        cellsrenderer: function ()
                        {
                            return "Accept";
                        },
                        buttonclick: function (row)
                        {
                            editrowindex = row;
                            var id = $("#jqxgrid").jqxGrid('getcellvalue', row, "DriverID");
                            alert(id);
                            alert("accepting");
                        }
                    },
                    {
                        text: '', datafield: 'DriverID', columntype: 'button', renderer: columnrenderer, cellsrenderer: cellsrenderer, width: 100,
                        cellsrenderer: function ()
                        {
                            return "Reject";
                        },
                        buttonclick: function (row)
                        {
                            editrowindex = row;
                            var id = $("#jqxgrid").jqxGrid('getcellvalue', row, "DriverID");
                            alert(id);
                            alert("rejecting");
                        }
                    }
                ]
            });
            var renderer = function (id)
            {
                return "<input type='button' onClick='buttonclick(event)' class='gridButton' id='btn" + id + "' value='Accept'/>"
            };
            $('#popup_box').fadeIn("slow");
        }, 10000);