/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    wikitudePlugin: undefined,
    // The features your augmented reality experience requires, only define the ones you really need
    requiredFeatures: [ "2d_tracking" ],
    // Url/Path to the augmented reality experience you would like to load
    arExperienceUrl: "www/world/index.html",
    // Represents the device capability of launching augmented reality experiences with specific features
    isDeviceSupported: false,
    // Additional startup settings, for now the only setting available is camera_position (back|front)
    startupConfiguration:
    {
        "camera_position": "back"
    },
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
       
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var loadingElement = parentElement.querySelector('.preloader');
        var topContainer = document.getElementById('topContainer');

        loadingElement.setAttribute('style', 'display:none;');
        
        topContainer.setAttribute('style', 'display:block;');
        topContainer.setAttribute('class','animated slideInDown top-container');

        document.getElementById('poster').setAttribute('style','display:block;');
        document.getElementById('poster').setAttribute('class','animated slideInUp');
     
        document.getElementById('button').setAttribute('class','animated slideInUpButton');

        document.getElementById("button").addEventListener("click", app.checkSupport);
    },
    checkSupport: function(){
        app.wikitudePlugin = cordova.require("com.wikitude.phonegap.WikitudePlugin.WikitudePlugin");
        app.wikitudePlugin.isDeviceSupported(app.onDeviceSupported, app.onDeviceNotSupported, app.requiredFeatures);
    },
    // Callback if the device supports all required features
    onDeviceSupported: function() {
        // ... code that is executed if the device is supported ...
        app.wikitudePlugin.loadARchitectWorld(
            app.onARExperienceLoadedSuccessful,
            app.onARExperienceLoadError,
            app.arExperienceUrl,
            app.requiredFeatures,
            app.startupConfiguration
        );
    },
    onDeviceNotSupported: function(errorMessage) {
        // ... code that is executed if the device is not supported ...
        //alert("not supported");
        swal({
                title: "din telefon understøttes ikke",
                type: "warning",
                showCancelButton: true,
                cancelButtonText: "TILBAGE",
                confirmButtonColor: "#076279",
                confirmButtonText: "VIS BILLEDER",
                animation: "slide-from-top",
                closeOnConfirm: true },
            function(){
                //code to show pictures
                app.showPhotos();
            });
    },
    showPhotos: function(){
        document.getElementById('photos').setAttribute('style', 'display:block');
        document.getElementById('photos').setAttribute('class','animated-short slideInLeft photos');
        document.getElementById('photo1').setAttribute('class','animated fadeInUp renovation delay1');
        document.getElementById('photo2').setAttribute('class','animated fadeInUp renovation delay2');
        document.getElementById('photo3').setAttribute('class','animated fadeInUp renovation delay3');
        document.getElementById("button2").addEventListener("click", this.hidePhotos);
    },
    hidePhotos: function(){
        document.getElementById('photos').setAttribute('class','animated-short slideOutLeft photos');
    },
    onARExperienceLoadedSuccessful: function(loadedURL) {
        // ... do something when the augmented reality experience finished loading
        //alert("AR loaded");
    },
    onARExperienceLoadError: function(errorMessage) {
        // ... react on failures. That could be happen when the local path is wrong or the remote url returned an error code
        alert('Loading AR web view failed: ' + errorMessage);
    }
};

app.initialize();