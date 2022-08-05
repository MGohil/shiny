shinyBle = {
    SCAN_OPTIONS = {
        acceptAllAdvertisements: true,
        keepRepeatedDevices: true
    },
    scan: null,

    isBleSupported: function () {
        return navigator.bluetooth !== undefined;
    },

    startScan: async function (dotNetRef) {
        const me = this;
        navigator.bluetooth.addEventListener('advertisementreceived', me.processScan);
        this.scan = await navigator.bluetooth.requestLEScan(SCAN_OPTIONS);
    },

    stopScan: function () {
        this.scan.stop();
        this.scan = null;
        const me = this;
        navigator.bluetooth.removeEventListener('advertisementreceived', me.processScan);
    },

    processScan: function (e) {
        console.log('Advertisement received', e);
        //log('  Device Name: ' + event.device.name);
        //log('  Device ID: ' + event.device.id);
        //log('  RSSI: ' + event.rssi);
        //log('  TX Power: ' + event.txPower);
        //log('  UUIDs: ' + event.uuids);
        //event.manufacturerData.forEach((valueDataView, key) => {
        //    logDataView('Manufacturer', key, valueDataView);
        //});
        //event.serviceData.forEach((valueDataView, key) => {
        //    logDataView('Service', key, valueDataView);
        //});
    }
}

export { shinyBle };


////https://learn-blazor.com/architecture/interop/
////https://googlechrome.github.io/samples/web-bluetooth/automatic-reconnect.html
////https://developers.google.com/web/updates/2015/07/interact-with-ble-devices-on-the-web

//navigator.bluetooth.requestDevice({ filters: [{ services: ['battery_service'] }] })
//    .then(device => device.gatt.connect())
//    .then(server => {
//        // Getting Battery Service...
//        return server.getPrimaryService('battery_service');
//    })
//    .then(service => {
//        // Getting Battery Level Characteristic...
//        return service.getCharacteristic('battery_level');
//    })
//    .then(characteristic => {
//        // Reading Battery Level...
//        return characteristic.readValue();
//    })
//    .then(value => {
//        console.log('Battery percentage is ' + value.getUint8(0));
//    })
//    .catch(error => { console.log(error); });




//.then(characteristic => {
//        // Set up event listener for when characteristic value changes.
//        characteristic.addEventListener('characteristicvaluechanged',
//            handleBatteryLevelChanged);
//        // Reading Battery Level...
//        return characteristic.readValue();
//    })
//    .catch(error => { console.log(error); });

//function handleBatteryLevelChanged(event) {
//    let batteryLevel = event.target.value.getUint8(0);
//    console.log('Battery percentage is ' + batteryLevel);
//}






//navigator.bluetooth.requestDevice({ filters: [{ services: ['heart_rate'] }] })
//    .then(device => device.gatt.connect())
//    .then(server => server.getPrimaryService('heart_rate'))
//    .then(service => service.getCharacteristic('heart_rate_control_point'))
//    .then(characteristic => {
//        // Writing 1 is the signal to reset energy expended.
//        var resetEnergyExpended = Uint8Array.of(1);
//        return characteristic.writeValue(resetEnergyExpended);
//    })
//    .then(_ => {
//        console.log('Energy expended has been reset.');
//    })
//    .catch(error => { console.log(error); });



//navigator.bluetooth.requestDevice({ filters: [{ services: ['heart_rate'] }] })
//    .then(device => device.gatt.connect())
//    .then(server => server.getPrimaryService('heart_rate'))
//    .then(service => service.getCharacteristic('heart_rate_measurement'))
//    .then(characteristic => characteristic.startNotifications())
//    .then(characteristic => {
//        characteristic.addEventListener('characteristicvaluechanged',
//            handleCharacteristicValueChanged);
//        console.log('Notifications have been started.');
//    })
//    .catch(error => { console.log(error); });

//function handleCharacteristicValueChanged(event) {
//    var value = event.target.value;
//    console.log('Received ' + value);
//    // TODO: Parse Heart Rate Measurement value.
//    // See https://github.com/WebBluetoothCG/demos/blob/gh-pages/heart-rate-sensor/heartRateSensor.js
//}




//Get disconnected from a Bluetooth Device
//To provide a better user experience, you may want to show a warning message if the BluetoothDevice gets disconnected to invite the user to reconnect.

//    navigator.bluetooth.requestDevice({ filters: [{ name: 'Francois robot' }] })
//    .then(device => {
//        // Set up event listener for when device gets disconnected.
//        device.addEventListener('gattserverdisconnected', onDisconnected);

//        // Attempts to connect to remote GATT Server.
//        return device.gatt.connect();
//    })
//    .then(server => { /* ... */ })
//    .catch(error => { console.log(error); });


//    Warning: Bluetooth GATT attributes, services, characteristics, etc.are invalidated when a device disconnects.This means your code should always retrieve(through getPrimaryService(s), getCharacteristic(s), etc.) these attributes after reconnecting.
//Read and write to Bluetooth descriptors
//Bluetooth GATT descriptors are attributes that describe a characteristic value.You can read and write them to in a similar way to Bluetooth GATT characteristics.

//    Let's see for instance how to read the user description of the measurement interval of the device's health thermometer.

//In the example below, health_thermometer is the Health Thermometer service, measurement_interval the Measurement Interval characteristic, and gatt.characteristic_user_description the Characteristic User Description descriptor.

//    navigator.bluetooth.requestDevice({ filters: [{ services: ['health_thermometer'] }] })
//    .then(device => device.gatt.connect())
//    .then(server => server.getPrimaryService('health_thermometer'))
//    .then(service => service.getCharacteristic('measurement_interval'))
//    .then(characteristic => characteristic.getDescriptor('gatt.characteristic_user_description'))
//    .then(descriptor => descriptor.readValue())
//    .then(value => {
//        let decoder = new TextDecoder('utf-8');
//        console.log('User Description: ' + decoder.decode(value));
//    })
//    .catch(error => { console.log(error); });
//Now that we've read the user description of the measurement interval of the device's health thermometer, let's see how to update it and write a custom value.

//navigator.bluetooth.requestDevice({ filters: [{ services: ['health_thermometer'] }] })
//    .then(device => device.gatt.connect())
//    .then(server => server.getPrimaryService('health_thermometer'))
//    .then(service => service.getCharacteristic('measurement_interval'))
//    .then(characteristic => characteristic.getDescriptor('gatt.characteristic_user_description'))
//    .then(descriptor => {
//        let encoder = new TextEncoder('utf-8');
//        let userDescription = encoder.encode('Defines the time between measurements.');
//        return descriptor.writeValue(userDescription);
//    })
//    .catch(error => { console.log(error); });