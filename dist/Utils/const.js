export var ServiceStatus;
(function (ServiceStatus) {
    ServiceStatus[ServiceStatus["Ok"] = 0] = "Ok";
    ServiceStatus[ServiceStatus["Maintenance"] = 1] = "Maintenance";
    ServiceStatus[ServiceStatus["Down"] = 2] = "Down";
})(ServiceStatus = ServiceStatus || (ServiceStatus = {}));
